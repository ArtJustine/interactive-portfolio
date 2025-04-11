"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

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
  const [currentIndex, setCurrentIndex] = useState(0)

  const prev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0))
  const next = () => setCurrentIndex((prev) => Math.min(prev + 1, items.length - 1))

  const currentItem = items[currentIndex]

  return (
    <section className={`w-full py-12 flex flex-col items-center ${className || ""}`}>
      <div className="relative w-full max-w-4xl px-4">
        {/* Arrows */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 z-10">
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="text-white text-3xl bg-black bg-opacity-30 p-2 rounded-full hover:bg-opacity-50 transition disabled:opacity-30"
          >
            ‹
          </button>
        </div>

        <div className="absolute top-1/2 right-0 -translate-y-1/2 z-10">
          <button
            onClick={next}
            disabled={currentIndex === items.length - 1}
            className="text-white text-3xl bg-black bg-opacity-30 p-2 rounded-full hover:bg-opacity-50 transition disabled:opacity-30"
          >
            ›
          </button>
        </div>

        {/* Card Container */}
        <div className="w-full h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="bg-gray-900 bg-opacity-80 backdrop-blur-md p-6 md:p-8 rounded-lg border border-gray-800 shadow-xl w-full max-w-full">
                {/* Date */}
                <div
                  className={`inline-block text-xs md:text-sm font-semibold px-3 py-1 rounded-full mb-3 ${
                    currentItem.color || "bg-purple-600 bg-opacity-30 text-purple-300"
                  }`}
                >
                  {currentItem.date}
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold mb-1 text-white">
                  {currentItem.title}
                </h3>

                {/* Company */}
                <p className="text-sm md:text-base text-gray-400 mb-3">
                  {currentItem.company}
                </p>

                {/* Description */}
                <p className="text-sm md:text-base text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {currentItem.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}