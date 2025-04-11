"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useIsMobile } from "@/hooks/use-mobile"

interface TimelineItem {
  date: string
  title: string
  company: string
  description: string
  color?: string
}

interface PlaygroundTimelineProps {
  items: TimelineItem[]
  className?: string
  titleInView?: boolean
}

export default function PlaygroundTimeline({ items, className, titleInView }: PlaygroundTimelineProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const [isInView, setIsInView] = useState(false)

  // Determine how many items are visible
  const visibleItems = isMobile ? 1 : 2

  // Calculate how many items need to scroll past
  const totalItemsToScrollPast = Math.max(0, items.length - visibleItems)

  // Scroll factor to control the scroll distance - reduced to minimize empty space
  const scrollSpeedFactor = 250

  // Calculate section height - enough for the animation with no extra space
  const calculatedSectionHeight = `calc(100vh + ${totalItemsToScrollPast * scrollSpeedFactor}px)`

  // Track scroll progress within the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  // Create a derived scroll progress that only starts after the title is in view
  // and has a delay before starting horizontal movement
  const delayedScrollProgress = useTransform(scrollYProgress, (value) => {
    // Only start scrolling horizontally after the cards are centered (20% of scroll)
    return Math.max(0, (value - 0.2) / 0.8)
  })

  // Vertical movement: Start from bottom of screen, move to center
  const translateY = useTransform(
    scrollYProgress,
    [0, 0.2], // First 20% of scroll is vertical movement
    ["100vh", "0vh"], // Start from bottom of viewport, move to center
  )

  // Calculate the exact distance needed to scroll through all cards
  // Card width + margin in vw units
  const cardWidthWithMargin = isMobile ? 95 : 50 // 90vw + 5vw margin on mobile, 45vw + 5vw margin on desktop

  // Calculate the total scroll distance needed to show all cards
  // Subtract visible cards (1 or 2) and multiply by card width+margin
  const totalScrollDistance = (items.length - visibleItems) * cardWidthWithMargin

  // Horizontal movement: Only start after cards are centered
  // Start with the first card visible, then scroll to show all cards
  const translateX = useTransform(
    delayedScrollProgress,
    [0, 1], // Use the full delayed progress for horizontal movement
    ["0vw", `-${totalScrollDistance}vw`], // Start at 0, scroll exactly the distance needed
  )

  // Track when the section is in view to apply fixed positioning
  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only set to true if the title is already in view
        setIsInView(entry.isIntersecting && titleInView)
      },
      { threshold: 0.1 },
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [titleInView])

  // Update isInView when titleInView changes
  useEffect(() => {
    if (sectionRef.current && sectionRef.current.getBoundingClientRect().top < window.innerHeight) {
      setIsInView(titleInView)
    }
  }, [titleInView])

  // Calculate top position for fixed container
  const topPosition = titleInView ? "120px" : "0px"

  return (
    <section
      ref={sectionRef}
      className={`relative ${className || ""}`}
      style={{
        height: calculatedSectionHeight,
        margin: 0,
        padding: 0,
        overflowX: "hidden",
      }}
    >
      {/* Fixed container for vertical positioning */}
      <div
        ref={containerRef}
        className={`${
          isInView ? "fixed left-0 right-0 z-20" : "absolute opacity-0 pointer-events-none"
        } h-screen flex items-center justify-center overflow-hidden`}
        style={{
          top: topPosition,
          willChange: "transform",
          perspective: "1000px",
          backfaceVisibility: "hidden",
        }}
      >
        {/* Container to center the cards */}
        <div className="w-full max-w-[95vw] flex justify-center">
          {/* Motion div handles both vertical and horizontal movement */}
          <motion.div
            className="flex flex-row items-center"
            style={{
              x: translateX,
              y: translateY,
              willChange: "transform",
              translateZ: 0, // Force GPU acceleration
            }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 100,
            }}
          >
            {/* Render items in reverse order to show oldest first */}
            {[...items].map((item, index) => (
              <div
                key={index}
                className="w-[90vw] md:w-[45vw] lg:w-[40vw] flex-shrink-0 mr-[5vw] flex items-center justify-center"
                style={{
                  willChange: "transform",
                  transform: "translateZ(0)", // Force GPU acceleration
                }}
              >
                {/* Card Content */}
                <div className="bg-gray-900 bg-opacity-70 backdrop-blur-md p-6 md:p-8 rounded-lg border border-gray-800 w-full shadow-xl min-h-[300px]">
                  {/* Date Badge */}
                  <div
                    className={`inline-block text-xs md:text-sm font-semibold px-3 py-1 md:px-4 md:py-1.5 rounded-full mb-3 md:mb-4 ${
                      item.color || "bg-purple-600 bg-opacity-30 text-purple-300"
                    }`}
                  >
                    {item.date}
                  </div>
                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">{item.title}</h3>
                  {/* Company */}
                  <p className="text-base md:text-lg text-gray-400 mb-3 md:mb-4">{item.company}</p>
                  {/* Description */}
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
