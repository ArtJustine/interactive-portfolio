"use client"

import { motion } from "framer-motion"
import { Lightbulb, Code, Pen, Film, BarChart3 } from 'lucide-react'
import { cn } from "@/lib/utils"
import React from 'react'

interface BentoItemProps {
  title: string
  description: string
  icon: React.ReactNode
  className?: string
  delay?: number
  style?: React.CSSProperties
  iconColor?: string
}

// Adjusted BentoItem: Removed default h-full from base styles
const BentoItem = ({ title, description, icon, className, delay = 0, style, iconColor }: BentoItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        // Base styles - height is now auto unless specified in className (like h-full or min-h-*)
        "group relative overflow-hidden rounded-xl p-6 bg-card border border-border hover:border-primary/20 transition-all duration-300 shadow-sm flex flex-col", // Added flex flex-col here
        className
      )}
      style={style}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--chart-1))] via-[hsl(var(--chart-4))] to-[hsl(var(--chart-5))] opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-xl"></div>

      {/* Content part */}
      <div className="flex-shrink-0"> {/* Header part doesn't grow/shrink */}
        <div
          className={`p-2 rounded-lg w-10 h-10 flex items-center justify-center mb-4`}
          style={{ backgroundColor: iconColor || "#2d2d2d" }}
        >
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 flex-shrink-0">{title}</h3>
      </div>
      <div className="flex-grow"> {/* Description part takes remaining space if parent has height */}
         <p className="text-muted-foreground">{description}</p>
      </div>

    </motion.div>
  )
}

export default function BentoGrid() {
  const bentoItems = [
    {
      title: "Problem Solver",
      description:
        "I thrive on turning chaos into clarity. Whether it's streamlining workflows, fixing bugs, or creating something from nothing, I use logic, creativity, and a deep love for learning to solve problems in meaningful ways.",
      icon: <Lightbulb className="h-5 w-5" />,
      iconColor: "#5468FF",
    },
    {
      title: "Developer",
      description:
        "I bring ideas to life with code. I use HTML, CSS, JavaScript, and React to build clean, responsive, and user-friendly interfaces that just make sense.",
      icon: <Code className="h-5 w-5" />,
      iconColor: "#6366F1",
    },
    {
      title: "Designer",
      description:
        "Design isn't just how it looks — it's how it works. I use Figma to craft thoughtful user journeys, wireframes, and prototypes that prioritize both beauty and usability.",
      icon: <Pen className="h-5 w-5" />,
      iconColor: "#8B5CF6",
    },
    {
      title: "Video Editor",
      description:
        "Stories told in frames. From snappy edits to smooth transitions and sound design, I use tools like Adobe Premiere Pro and CapCut to create engaging content for YouTube, social media, or brands.",
      icon: <Film className="h-5 w-5" />,
      iconColor: "#8B5CF6",
    },
    {
      title: "Content Strategist",
      description:
        "Good content needs great strategy. I understand how to position brands, write SEO-optimized content, and craft campaigns that connect with the right audience at the right time.",
      icon: <BarChart3 className="h-5 w-5" />,
      iconColor: "#EC4899",
    },
  ]

  // Get current date information
  const currentDate = new Date();
  const location = "Mabalacat, Central Luzon, Philippines";

  // --- Define Min Heights (Adjust these values to change proportions) ---
  // Middle Column: Top > Bottom
  const middleTopMinHeight = "min-h-[300px]"; // Example: Larger min-height for Card 2
  const middleBottomMinHeight = "min-h-[200px]"; // Example: Smaller min-height for Card 3
  // Right Column: Top < Bottom
  const rightTopMinHeight = "min-h-[200px]"; // Example: Smaller min-height for Card 4
  const rightBottomMinHeight = "min-h-[300px]"; // Example: Larger min-height for Card 5
  // --- End Define Min Heights ---


  return (
    <section className="relative py-20 px-6 bg-black">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:24px_24px]"></div>
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          MY SKILLS
        </motion.h2>

        {/* --- Mobile layout (stacked) --- */}
        <div className="grid grid-cols-1 gap-6 md:hidden">
          {bentoItems.map((item, index) => (
            <BentoItem
              key={`mobile-${index}`}
              title={item.title}
              description={item.description}
              icon={item.icon}
              iconColor={item.iconColor}
              delay={index * 0.1}
              // No specific height control needed, let content flow
            />
          ))}
        </div>

        {/* --- Desktop layout: No fixed height, uses grid and min-heights --- */}
        <div className="hidden md:grid md:grid-cols-3 md:grid-rows-2 gap-4">
          {/* Item 1: Spans 2 rows, fills height determined by auto rows */}
          <BentoItem
            title={bentoItems[0].title}
            description={bentoItems[0].description}
            icon={bentoItems[0].icon}
            iconColor={bentoItems[0].iconColor}
            delay={0.1}
            className="md:row-span-2 h-full" // Spans rows & fills the calculated height
          />

          {/* Item 2: Middle Top (Taller) */}
          <BentoItem
            title={bentoItems[1].title}
            description={bentoItems[1].description}
            icon={bentoItems[1].icon}
            iconColor={bentoItems[1].iconColor}
            delay={0.2}
            // Placed in Col 2, Row 1. Applies larger min-height.
            className={`md:col-start-2 md:row-start-1 ${middleTopMinHeight}`}
          />

          {/* Item 3: Middle Bottom (Shorter) */}
          <BentoItem
            title={bentoItems[2].title}
            description={bentoItems[2].description}
            icon={bentoItems[2].icon}
            iconColor={bentoItems[2].iconColor}
            delay={0.3}
             // Placed in Col 2, Row 2. Applies smaller min-height.
            className={`md:col-start-2 md:row-start-2 ${middleBottomMinHeight}`}
          />

          {/* Item 4: Right Top (Shorter) */}
          <BentoItem
            title={bentoItems[3].title}
            description={bentoItems[3].description}
            icon={bentoItems[3].icon}
            iconColor={bentoItems[3].iconColor}
            delay={0.4}
             // Placed in Col 3, Row 1. Applies smaller min-height.
            className={`md:col-start-3 md:row-start-1 ${rightTopMinHeight}`}
           />

          {/* Item 5: Right Bottom (Taller) */}
          <BentoItem
            title={bentoItems[4].title}
            description={bentoItems[4].description}
            icon={bentoItems[4].icon}
            iconColor={bentoItems[4].iconColor}
            delay={0.5}
             // Placed in Col 3, Row 2. Applies larger min-height.
            className={`md:col-start-3 md:row-start-2 ${rightBottomMinHeight}`}
          />
        </div>
      </div>
    </section>
  )
}