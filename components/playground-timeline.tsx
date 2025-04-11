"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll } from "framer-motion"
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
  const [sectionHeight, setSectionHeight] = useState("100vh")

  // Keep all items in the original order from newest to oldest
  const timelineItems = [...items]

  // Calculate total section height based on items
  const itemHeight = 300 // pixels per item
  const totalHeight = itemHeight * timelineItems.length

  // Set section height after mount to avoid SSR window access
  useEffect(() => {
    const height = totalHeight + window.innerHeight * 0.3
    setSectionHeight(`${height}px`)
  }, [totalHeight])

  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(value => {
      const maxIndex = timelineItems.length - 1
      const calculatedIndex = Math.min(maxIndex, Math.max(0, Math.floor(value * (maxIndex + 2))))
      setScrollPosition(calculatedIndex)
    })

    return () => unsubscribe()
  }, [scrollYProgress, timelineItems.length])

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
        height: sectionHeight,
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
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
        <div className="relative w-full px-8 md:px-14 flex flex-col md:flex-row gap-6 justify-center items-center">
          {timelineItems.map((item, index) => {
            const distanceFromCurrent = Math.abs(index - scrollPosition)
            if (distanceFromCurrent > 3) return null

            const opacity = 1 - distanceFromCurrent * 0.3
            const xPosition = isMobile
              ? (index - scrollPosition) * 100
              : (index - scrollPosition) * 60

            const isLastCard = index === timelineItems.length - 1
            const cardOpacity = isLastCard && isFooterVisible ? 0 : opacity

            return (
              <motion.div
                key={index}
                className="absolute top-0 left-0 flex items-center justify-center"
                animate={{
                  x: `${xPosition}vw`,
                  opacity: cardOpacity,
                  scale: 1 - distanceFromCurrent * 0.1,
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
                  marginLeft: index === 0 ? (isMobile ? "5vw" : "8vw") : 0,
                  visibility: cardOpacity > 0.1 ? "visible" : "hidden",
                }}
              >
                <div className="bg-gray-900 bg-opacity-70 backdrop-blur-md p-5 md:p-6 rounded-lg border border-gray-800 w-full shadow-xl min-h-[250px] md:min-h-[280px]">
                  <div
                    className={`inline-block text-xs md:text-sm font-semibold px-3 py-1 rounded-full mb-3 ${
                      item.color || "bg-purple-600 bg-opacity-30 text-purple-300"
                    }`}
                  >
                    {item.date}
                  </div>

                  <h3 className="text-lg md:text-xl font-bold mb-1">{item.title}</h3>

                  <p className="text-sm md:text-base text-gray-400 mb-3">{item.company}</p>

                  <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <div className="flex gap-1">
            {timelineItems.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full transition-colors duration-300"
                style={{
                  backgroundColor:
                    Math.abs(index - scrollPosition) < 0.5
                      ? "rgba(255,255,255,0.8)"
                      : "rgba(255,255,255,0.3)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        ref={footerSensorRef}
        className="absolute bottom-0 left-0 w-full h-[30vh] pointer-events-none opacity-0"
      />
    </section>
  )
}