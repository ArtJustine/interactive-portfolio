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
  const footerSensorRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const [isInView, setIsInView] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isFooterVisible, setIsFooterVisible] = useState(false)
  
  // Keep all items in the original order from newest to oldest
  const timelineItems = [...items]
  
  // Calculate total section height based on items
  const itemHeight = 300 // pixels per item
  const totalHeight = itemHeight * timelineItems.length
  
  // Calculate how much space we need for scrolling - reduced height to minimize empty space
  const calculatedSectionHeight = `${totalHeight + (window.innerHeight * 0.3)}px`
  
  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })
  
  // Calculate scroll indices for which items to show
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(value => {
      // Convert scroll position to an index value
      const maxIndex = timelineItems.length - 1
      const calculatedIndex = Math.min(maxIndex, Math.max(0, Math.floor(value * (maxIndex + 2))))
      setScrollPosition(calculatedIndex)
    })
    
    return () => unsubscribe()
  }, [scrollYProgress, timelineItems.length])
  
  // Track when section is in view
  useEffect(() => {
    if (!sectionRef.current) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting && !!titleInView)
      },
      { threshold: 0.01 }
    )
    
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [titleInView])
  
  // Track when footer is visible to fade out the last card
  useEffect(() => {
    if (!footerSensorRef.current) return
    
    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )
    
    footerObserver.observe(footerSensorRef.current)
    return () => footerObserver.disconnect()
  }, [])
  
  return (
    <section
      ref={sectionRef}
      className={`relative ${className || ""}`}
      style={{
        height: calculatedSectionHeight,
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      {/* Fixed container for positioning */}
      <div
        ref={containerRef}
        className={`${
          isInView ? "fixed left-0 right-0 z-20" : "absolute"
        } h-screen flex items-center justify-center`}
        style={{
          top: titleInView ? (isMobile ? "80px" : "120px") : "0px",
          visibility: isInView && !isFooterVisible ? "visible" : "hidden",
          opacity: isInView && !isFooterVisible ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        {/* Container for current and next cards - added padding for the first card */}
        <div className="relative w-full px-8 md:px-14 flex flex-col md:flex-row gap-6 justify-center items-center">
          {/* Render items based on scroll position */}
          {timelineItems.map((item, index) => {
            // Calculate how far this item is from current scroll position
            const distanceFromCurrent = Math.abs(index - scrollPosition)
            
            // Only show items close to current scroll position
            if (distanceFromCurrent > 3) return null
            
            // Calculate visibility - fade out items that are further away
            const opacity = 1 - (distanceFromCurrent * 0.3)
            
            // Calculate position for each card with added padding for the first card
            const xPosition = isMobile
              ? (index - scrollPosition) * 100 // Move 100vw for each item on mobile
              : (index - scrollPosition) * 60  // Move 60vw for each item on desktop
            
            // If this is the last card and footer is visible, hide it
            const isLastCard = index === timelineItems.length - 1
            const cardOpacity = isLastCard && isFooterVisible ? 0 : opacity
            
            return (
              <motion.div
                key={index}
                className="absolute top-0 left-0 flex items-center justify-center"
                animate={{
                  x: `${xPosition}vw`,
                  opacity: cardOpacity,
                  scale: 1 - (distanceFromCurrent * 0.1),
                }}
                initial={{
                  x: `${xPosition}vw`,
                  opacity: 0,
                  scale: 0.9,
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
                style={{
                  width: isMobile ? "85vw" : "45vw",
                  marginLeft: index === 0 ? (isMobile ? "5vw" : "8vw") : 0, // Add margin for first card
                  visibility: cardOpacity > 0.1 ? "visible" : "hidden",
                }}
              >
                {/* Card Content */}
                <div className="bg-gray-900 bg-opacity-70 backdrop-blur-md p-5 md:p-6 rounded-lg border border-gray-800 w-full shadow-xl min-h-[250px] md:min-h-[280px]">
                  {/* Date Badge */}
                  <div
                    className={`inline-block text-xs md:text-sm font-semibold px-3 py-1 rounded-full mb-3 ${
                      item.color || "bg-purple-600 bg-opacity-30 text-purple-300"
                    }`}
                  >
                    {item.date}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-bold mb-1">{item.title}</h3>
                  
                  {/* Company */}
                  <p className="text-sm md:text-base text-gray-400 mb-3">{item.company}</p>
                  
                  {/* Description */}
                  <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
        
        {/* Navigation indicator */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <div className="flex gap-1">
            {timelineItems.map((_, index) => (
              <div 
                key={index}
                className="w-2 h-2 rounded-full transition-colors duration-300"
                style={{
                  backgroundColor: Math.abs(index - scrollPosition) < 0.5 
                    ? "rgba(255,255,255,0.8)" 
                    : "rgba(255,255,255,0.3)"
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer sensor - Used to detect when the footer comes into view */}
      <div 
        ref={footerSensorRef} 
        className="absolute bottom-0 left-0 w-full h-[30vh] pointer-events-none opacity-0"
      />
    </section>
  )
}