"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

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
  titleInView?: boolean // Add support for the titleInView prop
}

export default function PlaygroundTimeline({ items, className, titleInView }: PlaygroundTimelineProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout
    const checkMobile = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        if (typeof window !== "undefined") {
          setIsMobile(window.innerWidth < 768)
        }
      }, 100)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => {
      clearTimeout(resizeTimeout)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Determine how many items are visible (affects scroll end point)
  const visibleItems = isMobile ? 1 : 2

  // Calculate how many items need to scroll past
  const totalItemsToScrollPast = Math.max(0, items.length - visibleItems)

  // Minimal scroll factor to reduce empty space
  const scrollSpeedFactor = 300

  // Very minimal height calculation - just enough for the animation with no extra space
  // The 100vh ensures we have exactly one viewport height, plus a small amount per card
  const calculatedSectionHeight = `calc(100vh + ${totalItemsToScrollPast * scrollSpeedFactor}px)`

  // Track scroll progress within the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  // Transform scroll progress to horizontal translation
  const translateX = useTransform(
    scrollYProgress,
    [0, 0.95], // Complete animation slightly before the end for smoother transition
    ["0%", `-${totalItemsToScrollPast * 100}%`],
  )

  return (
    <section
      ref={sectionRef}
      className={`relative ${className || ""}`}
      style={{
        height: calculatedSectionHeight,
        willChange: "transform",
        margin: 0,
        padding: 0,
      }}
    >
      {/* Sticky container ensures vertical positioning */}
      <div
        className="sticky h-screen flex items-center overflow-hidden"
        // Adjust top position based on whether the title is in view
        style={{ top: titleInView ? "120px" : "0px" }}
      >
        {/* Motion div handles the horizontal movement */}
        <motion.div
          className="flex flex-row items-center pl-[5vw]"
          style={{
            x: translateX,
            willChange: "transform",
          }}
        >
          {items.map((item, index) => (
            // Card wrapper controls spacing and prevents shrinking
            <div
              key={index}
              className="w-[90vw] md:w-[45vw] lg:w-[40vw] flex-shrink-0 mr-[5vw] flex items-center justify-center"
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
    </section>
  )
}
