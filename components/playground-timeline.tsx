import { useState, useRef, useEffect } from "react"
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
  titleInView?: boolean // Added prop for optimization
}

export default function PlaygroundTimeline({ items, className, titleInView }: PlaygroundTimelineProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const prev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0))
  const next = () => setCurrentIndex((prev) => Math.min(prev + 1, items.length - 1))

  const currentItem = items[currentIndex]
  
  // Handle touch events for swiping on mobile
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX
    }
    
    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX.current = e.changedTouches[0].clientX
      const diffX = touchStartX.current - touchEndX.current
      
      // Add threshold to prevent accidental swipes
      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          next() // Swipe left to go next
        } else {
          prev() // Swipe right to go prev
        }
      }
    }
    
    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })
    
    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [items.length])

  return (
    <section 
      ref={containerRef}
      className={`w-full py-12 flex flex-col items-center ${className || ""}`}
      // Add hardware acceleration to prevent flickering
      style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
    >
      <div className="relative w-full max-w-4xl px-4">
        {/* Arrows */}
        <div className="absolute top-1/2 left-2 -translate-y-1/2 z-10">
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="text-white text-3xl bg-black bg-opacity-30 p-2 rounded-full hover:bg-opacity-50 transition disabled:opacity-30"
            aria-label="Previous item"
          >
            ‹
          </button>
        </div>

        <div className="absolute top-1/2 right-2 -translate-y-1/2 z-10">
          <button
            onClick={next}
            disabled={currentIndex === items.length - 1}
            className="text-white text-3xl bg-black bg-opacity-30 p-2 rounded-full hover:bg-opacity-50 transition disabled:opacity-30"
            aria-label="Next item"
          >
            ›
          </button>
        </div>

        {/* Card Container */}
        <div className="w-full h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }} // Reduced motion distance
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }} // Reduced motion distance
              transition={{ duration: 0.2, ease: "easeOut" }} // Faster, simpler animation
              className="w-full"
              // Add hardware acceleration
              style={{ 
                willChange: 'opacity, transform',
                transform: 'translateZ(0)'
              }}
            >
              <div 
                className="bg-gray-900 bg-opacity-80 backdrop-blur-md p-6 md:p-8 rounded-lg border border-gray-800 shadow-xl w-full max-w-full"
                // Minimize repaints with hardware acceleration
                style={{ 
                  backfaceVisibility: 'hidden',
                  willChange: 'transform'
                }}
              >
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
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  {currentItem.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Pagination indicators */}
      <div className="flex justify-center mt-6 space-x-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex ? "w-4 bg-white" : "bg-gray-500"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
