"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
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
}

export default function PlaygroundTimeline({ items, className }: PlaygroundTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const [currentIndex, setCurrentIndex] = useState(0)
  const totalItems = items.length

  // Swipe support
  useEffect(() => {
    if (!containerRef.current || !isMobile) return

    const container = containerRef.current
    let startX = 0

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX
      const delta = startX - endX

      if (delta > 50 && currentIndex < totalItems - 1) {
        setCurrentIndex((i) => i + 1)
      } else if (delta < -50 && currentIndex > 0) {
        setCurrentIndex((i) => i - 1)
      }
    }

    container.addEventListener("touchstart", handleTouchStart)
    container.addEventListener("touchend", handleTouchEnd)

    return () => {
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchend", handleTouchEnd)
    }
  }, [currentIndex, isMobile, totalItems])

  const goToIndex = (index: number) => {
    if (index >= 0 && index < totalItems) {
      setCurrentIndex(index)
    }
  }

  const prev = () => goToIndex(currentIndex - 1)
  const next = () => goToIndex(currentIndex + 1)

  return (
    <section
      ref={containerRef}
      className={`relative h-[100vh] flex flex-col items-center justify-center ${className || ""}`}
    >
      <div className="relative w-full px-6 md:px-12 flex items-center justify-center">
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
        <div className="relative overflow-hidden w-full max-w-5xl h-[75vh] flex items-center justify-center">
          <motion.div
            className="flex transition-transform ease-in-out duration-500 w-full"
            animate={{ x: `-${currentIndex * 100}%` }}
            style={{ display: "flex", width: `${totalItems * 100}%` }}
          >
            {items.map((item, index) => (
              <div
                key={index}
                className="w-full px-4 md:px-8 shrink-0 flex items-center justify-center"
                style={{ width: "100%" }}
              >
                <div className="bg-gray-900 bg-opacity-70 backdrop-blur-md p-6 rounded-lg border border-gray-800 w-full shadow-xl min-h-[250px] max-w-2xl">
                  <div
                    className={`inline-block text-xs md:text-sm font-semibold px-3 py-1 rounded-full mb-3 ${
                      item.color || "bg-purple-600 bg-opacity-30 text-purple-300"
                    }`}
                  >
                    {item.date}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-1">{item.title}</h3>
                  <p className="text-sm md:text-base text-gray-400 mb-3">{item.company}</p>
                  <p className="text-xs md:text-sm text-gray-300 leading-relaxed">{item.description}</p>
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

      {/* Dots */}
      <div className="mt-6 flex gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentIndex === index ? "bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  )
}