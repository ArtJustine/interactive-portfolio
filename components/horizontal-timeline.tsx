"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface TimelineItem {
  date: string
  title: string
  company: string
  description: string
  color?: string
}

interface HorizontalTimelineProps {
  items: TimelineItem[]
  className?: string
}

export default function HorizontalTimeline({ items, className }: HorizontalTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [hasBeenVisible, setHasBeenVisible] = useState(false)

  useEffect(() => {
    if (isInView && !hasBeenVisible) {
      setHasBeenVisible(true)
    }
  }, [isInView, hasBeenVisible])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const translateX = useTransform(
    scrollYProgress,
    [0.1, 0.9],
    ["0%", `-${(items.length - 1) * 85}%`]
  )

  return (
    <div ref={sectionRef} className={cn("relative", className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hasBeenVisible ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Career Highlights</h3>
          <p className="text-gray-300">
            Scroll down to explore my professional journey through the years. Each stage represents growth, learning,
            and new challenges.
          </p>
        </div>
      </motion.div>

      <div ref={containerRef} className="relative h-[80vh] overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full flex items-center will-change-transform"
          style={{ translateX }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="w-screen h-full flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-24"
            >
              <div className="max-w-4xl mx-auto bg-gray-900 bg-opacity-50 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-lg border border-gray-800">
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-4 md:mb-6">
                  <div
                    className={`text-base sm:text-lg md:text-xl font-bold px-3 py-1 sm:px-4 sm:py-2 rounded-full ${
                      item.color || "bg-purple-500 bg-opacity-20 text-purple-300"
                    }`}
                  >
                    {item.date}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">{item.title}</h3>
                    <p className="text-base sm:text-lg text-gray-400">{item.company}</p>
                  </div>
                </div>
                <p className="text-sm sm:text-base md:text-lg text-gray-300">{item.description}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}