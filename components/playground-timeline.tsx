"use client"

import { useRef, useEffect, useState } from "react"
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
  const trackRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { amount: 0.2, once: true })
  const [hasBeenVisible, setHasBeenVisible] = useState(false)

  useEffect(() => {
    if (isInView) {
      setHasBeenVisible(true)
    }
  }, [isInView])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const translateX = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(items.length - 1) * 100}%`]
  )

  return (
    <div ref={containerRef} className={cn("relative w-full py-20", className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hasBeenVisible ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto px-6 mb-12"
      >
        <h3 className="text-2xl md:text-3xl font-bold mb-4">Career Highlights</h3>
        <p className="text-gray-300">
          Scroll down to explore my professional journey through the years. Each stage represents growth, learning,
          and new challenges.
        </p>
      </motion.div>

      <div className="relative h-[100vh] overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex h-full will-change-transform"
          style={{ translateX }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="min-w-full h-full flex items-center justify-center px-6"
            >
              <div className="max-w-3xl bg-gray-900 bg-opacity-50 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <span
                    className={`text-base md:text-xl font-bold px-4 py-2 rounded-full ${
                      item.color || "bg-purple-500 bg-opacity-20 text-purple-300"
                    }`}
                  >
                    {item.date}
                  </span>
                  <div>
                    <h4 className="text-2xl font-bold">{item.title}</h4>
                    <p className="text-gray-400">{item.company}</p>
                  </div>
                </div>
                <p className="text-gray-300">{item.description}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}