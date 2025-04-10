"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface TimelineItem {
  date: string;
  title: string;
  company: string;
  description: string;
  color?: string;
}

interface PlaygroundTimelineProps {
  items: TimelineItem[];
  className?: string;
}

export default function PlaygroundTimeline({
  items,
  className,
}: PlaygroundTimelineProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout;
    const checkMobile = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (typeof window !== "undefined") {
          setIsMobile(window.innerWidth < 768);
        }
      }, 100);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Determine how many items are visible (affects scroll end point)
  const visibleItems = isMobile ? 1 : 2;
  // Calculate how many items need to scroll past
  const totalItemsToScrollPast = Math.max(0, items.length - visibleItems);

  // --- PRIMARY SPEED CONTROL: Section Height ---
  // INCREASE THIS VALUE SIGNIFICANTLY until the speed is slow enough for reading.
  // This is the most critical adjustment. Try 1500, 2000, 2500, 3000+
  const scrollSpeedFactor = 1500; // <<--- START HERE & INCREASE AS NEEDED
  const extraBufferVh = 200; // Extra scroll room
  const calculatedSectionHeight = items.length * scrollSpeedFactor + extraBufferVh;
  // --- End Speed Control ---


  // --- useScroll: Trigger animation at center ---
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // Start animation when center of section hits center of viewport
    // End animation when bottom of section hits top of viewport
    // This offset brings back the center-triggered snap point.
    offset: ["center center", "end start"],
  });
  // --- End useScroll ---


  // --- Introduce Pause (Dead Zone) & Map Scroll ---
  // Map scrollYProgress to translateX with a pause at the beginning.
  // deadZoneEnd: The fraction of scroll progress (0 to 1) during which
  // translateX remains at 0%. Adjust between 0.0 (no pause) and ~0.15.
  const deadZoneEnd = 0.05; // Pause for the first 5% of the scroll progress after center snap

  const rawTranslateX = useTransform(
    scrollYProgress,
    // Input range: [start, pause_end, animation_end]
    [0, deadZoneEnd, 1],
    // Output range: [start_pos, pos_during_pause, end_pos]
    // Stays at 0% during the dead zone, then animates to the final position.
    ["0%", "0%", `-${totalItemsToScrollPast * 100}%`]
  );
  // --- End Pause & Mapping ---


  // --- Spring Animation Settings ---
  // Use settings that promote a slower, heavier, less reactive feel.
  const translateX = useSpring(rawTranslateX, {
    stiffness: 50,    // Lower: Softer spring, slower reaction
    damping: 40,    // Higher: More resistance to motion, less bounce
    mass: 1.5,        // Higher: Feels "heavier", takes longer to accelerate/decelerate
    restDelta: 0.005  // Threshold for stopping animation
  });
  // --- End Spring Settings ---

  return (
    <section
      ref={sectionRef}
      // Apply the calculated height - CRITICAL for speed
      className={`relative h-[${calculatedSectionHeight}vh] ${className || ""}`}
      style={{ willChange: 'transform' }} // Performance hint
    >
      {/* Sticky container ensures vertical positioning */}
      <div
        className="sticky top-0 h-screen flex items-center overflow-hidden"
      >
        {/* Motion div handles the horizontal movement */}
        <motion.div
          className="flex flex-row items-center pl-[5vw]" // Flex layout for cards
          style={{
            x: translateX, // Apply calculated horizontal position
            willChange: 'transform' // Performance hint
          }}
        >
          {items.map((item, index) => (
            // Card wrapper controls spacing and prevents shrinking
            <div
              key={index}
              className="w-[90vw] md:w-[45vw] lg:w-[40vw] flex-shrink-0 mr-[5vw] flex items-center justify-center"
            >
              {/* Card Content */}
              <div className="bg-gray-900 bg-opacity-70 backdrop-blur-md p-6 md:p-8 rounded-lg border border-gray-800 w-full shadow-xl min-h-[300px]"> {/* Adjust min-height if needed */}
                {/* Date Badge */}
                <div
                  className={`inline-block text-xs md:text-sm font-semibold px-3 py-1 md:px-4 md:py-1.5 rounded-full mb-3 md:mb-4 ${
                    item.color || "bg-purple-600 bg-opacity-30 text-purple-300"
                  }`}
                >
                  {item.date}
                </div>
                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">
                  {item.title}
                </h3>
                {/* Company */}
                <p className="text-base md:text-lg text-gray-400 mb-3 md:mb-4">
                  {item.company}
                </p>
                {/* Description */}
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
