"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Lightbulb, Code, Pen, Film, BarChart3, Type } from "lucide-react"
import { cn } from "@/lib/utils"
import type React from "react"
import { useState } from "react"

interface BentoItemProps {
  title: string
  description: string
  icon: React.ReactNode
  className?: string
  delay?: number
  style?: React.CSSProperties
  iconColor?: string
  backgroundImage: string
  onHover: () => void
  href?: string
}

// Adjusted BentoItem: Added onHover callback
const BentoItem = ({
  title,
  description,
  icon,
  className,
  delay = 0,
  style,
  iconColor,
  backgroundImage,
  onHover,
  href,
}: BentoItemProps) => {
  const content = (
    <>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--chart-1))] via-[hsl(var(--chart-4))] to-[hsl(var(--chart-5))] opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-xl"></div>

      {/* Content part */}
      <div className="flex-shrink-0">
        <div
          className={`p-2 rounded-lg w-10 h-10 flex items-center justify-center mb-4`}
          style={{ backgroundColor: iconColor || "#2d2d2d" }}
        >
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 flex-shrink-0">{title}</h3>
      </div>
      <div className="flex-grow">
        <p className="text-muted-foreground">{description}</p>
      </div>
    </>
  )

  if (href) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true, margin: "-100px" }}
        className={cn(
          "group relative overflow-hidden rounded-xl p-6 bg-card border border-border hover:border-primary/20 transition-all duration-300 shadow-sm flex flex-col cursor-pointer",
          className,
        )}
        style={style}
        onMouseEnter={onHover}
      >
        <Link href={href} className="flex flex-col h-full">
          {content}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        "group relative overflow-hidden rounded-xl p-6 bg-card border border-border hover:border-primary/20 transition-all duration-300 shadow-sm flex flex-col",
        className,
      )}
      style={style}
      onMouseEnter={onHover}
    >
      {content}
    </motion.div>
  )
}

export default function BentoGrid() {
  const [activeBackground, setActiveBackground] = useState(0)

  const bentoItems = [
    {
      title: "Problem Solver",
      description:
        "I thrive on turning chaos into clarity. Whether it's streamlining workflows, fixing bugs, or creating something from nothing, I use logic, creativity, and a deep love for learning to solve problems in meaningful ways.",
      icon: <Lightbulb className="h-5 w-5" />,
      iconColor: "#5468FF",
      backgroundImage: "/problem.jpg?height=1080&width=1920&text=Problem+Solver",
    },
    {
      title: "Developer",
      description:
        "I bring ideas to life with code. I use HTML, CSS, JavaScript, and React to build clean, responsive, and user-friendly interfaces that just make sense.",
      icon: <Code className="h-5 w-5" />,
      iconColor: "#6366F1",
      backgroundImage: "/dev.jpg?height=1080&width=1920&text=Developer",
      href: "/frontend",
    },
    {
      title: "Designer",
      description:
        "Design isn't just how it looks — it's how it works. I use Figma to craft thoughtful user journeys, wireframes, and prototypes that prioritize both beauty and usability.",
      icon: <Pen className="h-5 w-5" />,
      iconColor: "#8B5CF6",
      backgroundImage: "/design.jpg?height=1080&width=1920&text=Designer",
      href: "/design",
    },
    {
      title: "Video Editor",
      description:
        "Stories told in frames. From snappy edits to smooth transitions and sound design, I use tools like Adobe Premiere Pro and CapCut to create engaging content for YouTube, social media, or brands.",
      icon: <Film className="h-5 w-5" />,
      iconColor: "#8B5CF6",
      backgroundImage: "/video.jpg?height=1080&width=1920&text=Video+Editor",
      href: "/video-editing",
    },
    {
      title: "Content Strategist",
      description:
        "Good content needs great strategy. I understand how to position brands, write SEO-optimized content, and craft campaigns that connect with the right audience at the right time.",
      icon: <BarChart3 className="h-5 w-5" />,
      iconColor: "#EC4899",
      backgroundImage: "/market.jpg?height=1080&width=1920&text=Content+Strategist",
      href: "/marketing",
    },
    {
      title: "Copywriter",
      description:
        "Words that sell. I craft persuasive copy for VSLs, articles, and e-commerce that speaks directly to your audience's needs and drives them to action.",
      icon: <Type className="h-5 w-5" />,
      iconColor: "#10B981",
      backgroundImage: "/market.jpg?height=1080&width=1920&text=Copywriter",
      href: "/copywriting",
    },
  ]

  // Get current date information
  const currentDate = new Date()
  const location = "Mabalacat, Central Luzon, Philippines"

  // --- Define Min Heights (Adjust these values to change proportions) ---
  // Middle Column: Top > Bottom
  const middleTopMinHeight = "min-h-[300px]" // Example: Larger min-height for Card 2
  const middleBottomMinHeight = "min-h-[200px]" // Example: Smaller min-height for Card 3
  // Right Column: Top < Bottom
  const rightTopMinHeight = "min-h-[200px]" // Example: Smaller min-height for Card 4
  const rightBottomMinHeight = "min-h-[300px]" // Example: Larger min-height for Card 5
  // --- End Define Min Heights ---

  return (
    <section className="relative py-20 px-6 bg-black overflow-hidden">
      {/* Background images container */}
      <div className="absolute inset-0 w-full h-full">
        {bentoItems.map((item, index) => (
          <div
            key={`bg-${index}`}
            className="absolute inset-0 w-full h-full transition-opacity duration-700 bg-cover bg-center"
            style={{
              backgroundImage: `url(${item.backgroundImage})`,
              opacity: activeBackground === index ? 0.3 : 0,
              zIndex: 0,
            }}
          />
        ))}
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none z-[1]">
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
              backgroundImage={item.backgroundImage}
              onHover={() => setActiveBackground(index)}
              href={item.href}
            />
          ))}
        </div>

        {/* --- Desktop layout: No fixed height, uses grid and min-heights --- */}
        <div className="hidden md:grid md:grid-cols-3 md:grid-rows-2 gap-4">
          {/* Item 1: Col 1, Row 1 */}
          <BentoItem
            title={bentoItems[0].title}
            description={bentoItems[0].description}
            icon={bentoItems[0].icon}
            iconColor={bentoItems[0].iconColor}
            delay={0.1}
            className={`md:col-start-1 md:row-start-1 ${middleTopMinHeight}`}
            backgroundImage={bentoItems[0].backgroundImage}
            onHover={() => setActiveBackground(0)}
            href={bentoItems[0].href}
          />

          {/* Item 2: Col 1, Row 2 */}
          <BentoItem
            title={bentoItems[5].title}
            description={bentoItems[5].description}
            icon={bentoItems[5].icon}
            iconColor={bentoItems[5].iconColor}
            delay={0.6}
            className={`md:col-start-1 md:row-start-2 ${middleBottomMinHeight}`}
            backgroundImage={bentoItems[5].backgroundImage}
            onHover={() => setActiveBackground(5)}
            href={bentoItems[5].href}
          />

          {/* Item 3: Col 2, Row 1 */}
          <BentoItem
            title={bentoItems[1].title}
            description={bentoItems[1].description}
            icon={bentoItems[1].icon}
            iconColor={bentoItems[1].iconColor}
            delay={0.2}
            className={`md:col-start-2 md:row-start-1 ${middleTopMinHeight}`}
            backgroundImage={bentoItems[1].backgroundImage}
            onHover={() => setActiveBackground(1)}
            href={bentoItems[1].href}
          />

          {/* Item 4: Col 2, Row 2 */}
          <BentoItem
            title={bentoItems[2].title}
            description={bentoItems[2].description}
            icon={bentoItems[2].icon}
            iconColor={bentoItems[2].iconColor}
            delay={0.3}
            className={`md:col-start-2 md:row-start-2 ${middleBottomMinHeight}`}
            backgroundImage={bentoItems[2].backgroundImage}
            onHover={() => setActiveBackground(2)}
            href={bentoItems[2].href}
          />

          {/* Item 5: Col 3, Row 1 */}
          <BentoItem
            title={bentoItems[3].title}
            description={bentoItems[3].description}
            icon={bentoItems[3].icon}
            iconColor={bentoItems[3].iconColor}
            delay={0.4}
            className={`md:col-start-3 md:row-start-1 ${rightTopMinHeight}`}
            backgroundImage={bentoItems[3].backgroundImage}
            onHover={() => setActiveBackground(3)}
            href={bentoItems[3].href}
          />

          {/* Item 6: Col 3, Row 2 */}
          <BentoItem
            title={bentoItems[4].title}
            description={bentoItems[4].description}
            icon={bentoItems[4].icon}
            iconColor={bentoItems[4].iconColor}
            delay={0.5}
            className={`md:col-start-3 md:row-start-2 ${rightBottomMinHeight}`}
            backgroundImage={bentoItems[4].backgroundImage}
            onHover={() => setActiveBackground(4)}
            href={bentoItems[4].href}
          />
        </div>
      </div>
    </section>
  )
}
