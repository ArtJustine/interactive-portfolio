"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface SkillSectionProps {
  title: string
  description: string
  icon: string
  colorClass: string
  delay?: number
}

export default function SkillSection({ title, description, icon, colorClass, delay = 0 }: SkillSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      className="relative p-6 rounded-lg border border-gray-800 overflow-hidden group"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <div
        className={`absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${colorClass}`}
        style={{ filter: "blur(30px)" }}
      />

      <div className="relative z-10">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>

      <motion.div
        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${colorClass}`}
        initial={{ width: "0%" }}
        animate={isInView ? { width: "100%" } : {}}
        transition={{ duration: 1, delay: delay + 0.3 }}
      />
    </motion.div>
  )
}
