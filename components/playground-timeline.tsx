"use client"

import { useRef } from "react"
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
}

export default function PlaygroundTimeline({ items, className }: PlaygroundTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Transform the vertical scroll into horizontal movement
  const translateX = useTransform(scrollYProgress, [0, 1], ["0%", `-${(items.length - 1) * 90}%`])

  return (
    <section className={`relative min-h-[150vh] ${className}`} ref={containerRef}>
      {/* This is the sticky container that stays in view */}
      <div className="sticky top-[20vh] h-[60vh] overflow-hidden flex items-center">
        {/* This is the horizontally scrolling content */}
        <motion.div className="flex flex-row items-start pl-[5vw]" style={{ x: translateX }}>
          {items.map((item, index) => (
            <div
              key={index}
              className="w-[80vw] md:w-[60vw] lg:w-[40vw] flex-shrink-0 mr-[5vw] bg-gray-900 bg-opacity-50 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-gray-800"
            >
              <div
                className={`inline-block text-base md:text-lg font-bold px-3 py-1 md:px-4 md:py-2 rounded-full mb-4 ${
                  item.color || "bg-purple-500 bg-opacity-20 text-purple-300"
                }`}
              >
                {item.date}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">{item.title}</h3>
              <p className="text-lg text-gray-400 mb-4">{item.company}</p>
              <p className="text-base md:text-lg text-gray-300">{item.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
