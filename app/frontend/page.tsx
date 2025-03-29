"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import PageHeader from "@/components/page-header"
import ProjectsGrid from "@/components/projects-grid"
import type { Project } from "@/components/projects-grid"

export default function FrontendPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  const frontendProjects: Project[] = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "Fully responsive online store with cart functionality and payment integration",
      image: "/images/web-project.jpg",
      category: "React & Next.js",
    },
    {
      id: 2,
      title: "SaaS Dashboard",
      description: "Interactive admin dashboard with data visualization and real-time updates",
      image: "/images/web-project2.jpg",
      category: "React & TypeScript",
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "Creative portfolio with advanced animations and interactive elements",
      image: "/images/web-project3.jpg",
      category: "Next.js & Framer Motion",
    },
    {
      id: 4,
      title: "Mobile Web App",
      description: "Progressive web app with offline capabilities and native-like experience",
      image: "/images/web-project4.jpg",
      category: "PWA",
    },
    {
      id: 5,
      title: "Interactive Landing Page",
      description: "High-conversion landing page with engaging animations and micro-interactions",
      image: "/images/web-project5.jpg",
      category: "HTML, CSS & JavaScript",
    },
    {
      id: 6,
      title: "3D Product Configurator",
      description: "Interactive 3D product visualization tool with customization options",
      image: "/images/web-project6.jpg",
      category: "Three.js & React",
    },
  ]

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-white">
      <motion.div className="fixed inset-0 z-0 opacity-50 pointer-events-none" style={{ y: backgroundY }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/100"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,_rgba(255,255,255,0.05)_1px,_transparent_1px),_linear-gradient(to_bottom,_rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_theme(colors.blue.500/30)_0,_transparent_70%)]"></div>
      </motion.div>

      <div className="relative z-10 pt-24">
        <PageHeader
          title="Front-end Development"
          subtitle="Building responsive, interactive websites with modern frameworks and clean, efficient code."
        />
        <ProjectsGrid projects={frontendProjects} />
      </div>
    </div>
  )
}

