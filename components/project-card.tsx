"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  category: string
  index: number
}

export default function ProjectCard({ title, description, image, category, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Mouse position for parallax effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth out the mouse movement
  const springConfig = { damping: 25, stiffness: 300 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  // Transform values for parallax effect
  const rotateX = useTransform(smoothMouseY, [-100, 100], [5, -5])
  const rotateY = useTransform(smoothMouseX, [-100, 100], [-5, 5])
  const translateX = useTransform(smoothMouseX, [-100, 100], [5, -5])
  const translateY = useTransform(smoothMouseY, [-100, 100], [5, -5])

  // Handle mouse move for parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  // Reset mouse position when mouse leaves
  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative overflow-hidden rounded-lg cursor-pointer group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            x: translateX,
            y: translateY,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-6 z-10"
          style={{
            z: 1,
            transformStyle: "preserve-3d",
            transform: "translateZ(20px)",
          }}
        >
          <motion.span
            className="text-sm font-medium px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm w-fit mb-2"
            initial={{ opacity: 0.7 }}
            animate={{ opacity: isHovered ? 1 : 0.7 }}
          >
            {category}
          </motion.span>
          <motion.h3
            className="text-xl font-bold mb-1"
            animate={{ y: isHovered ? -5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>
          <motion.p
            className="text-sm text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20,
            }}
            transition={{ duration: 0.3 }}
          >
            {description}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  )
}

