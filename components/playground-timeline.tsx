"use client"

import { useState } from "react"
import { motion } from "framer-motion"

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
  const totalItems = items.length

  const goToIndex = (index: number) => {
    if (index >= 0 && index < totalItems) {
      setCurrentIndex(index)
    }
  }

  const prev = () => goToIndex(currentIndex - 1)
  const next = () => goToIndex(currentIndex + 1)

  return (
    <section className={`relative w-full py-12 flex flex-col items-center ${className || ""}`}>
      <div className="relative w-full max-w-5xl px-4 flex items-center justify-center">
        {/* Left arrow */}
        {currentIndex > 0 && (
          <button
            onClick={prev}
            className="absolute left-0 z-10 text-white text-3xl bg-black bg-opacity-30 p-2 rounded-full hover:bg-opacity-50 transition"
          >
            ‹
          </button>
        )}

        {/* Slide container */}
        <div className="relative overflow-hidden w-full h-full flex items-center justify-center">
          <motion.div
            className="flex transition-transform ease-in-out duration-500 w-full"
            animate={{ x: `-${currentIndex * 100}%` }}
            style={{ width: `${totalItems * 100}%` }}
          >
            {items.map((item, index) => (
              <div
                key={index}
                className="w-full px-4 shrink-0 flex items-center justify-center"
                style={{ width: "100%" }}
              >
                <div className="bg-gray-900 bg-opacity-70 backdrop-blur-md p-6 md:p-8 rounded-lg border border-gray-800 w-full shadow-xl max-w-2xl">
                  <div
                    className={`inline-block text-xs md:text-sm font-semibold px-3 py-1 rounded-full mb-3 ${
                      item.color || "bg-purple-600 bg-opacity-30 text-purple-300"
                    }`}
                  >
                    {item.date}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-1">{item.title}</h3>
                  <p className="text-sm md:text-base text-gray-400 mb-3">{item.company}</p>
                  <p className="text-xs md:text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right arrow */}
        {currentIndex < totalItems - 1 && (
          <button
            onClick={next}
            className="absolute right-0 z-10 text-white text-3xl bg-black bg-opacity-30 p-2 rounded-full hover:bg-opacity-50 transition"
          >
            ›
          </button>
        )}
      </div>
    </section>
  )
}