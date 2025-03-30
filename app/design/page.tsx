"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import PageHeader from "@/components/page-header"
import ProjectsGrid from "@/components/projects-grid"
import type { Project } from "@/components/projects-grid"

export default function DesignPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  const designProjects: Project[] = [
    {
      id: 1,
      title: "Mobile App UI Design",
      description: "Complete user interface design for a fitness tracking mobile application",
      image: "/images/design-project.jpg",
      category: "UI Design",
      externalUrl: "https://dribbble.com/shots/example1",
    },
    {
      id: 2,
      title: "Website Redesign",
      description: "Modern redesign of an e-commerce platform focusing on user experience",
      image: "/images/design-project2.jpg",
      category: "UX Design",
      externalUrl: "https://dribbble.com/shots/example2",
    },
    {
      id: 3,
      title: "Brand Identity System",
      description: "Comprehensive brand identity including logo, color palette, and guidelines",
      image: "/images/design-project3.jpg",
      category: "Branding",
      externalUrl: "https://dribbble.com/shots/example3",
    },
    {
      id: 4,
      title: "Dashboard Interface",
      description: "Data visualization dashboard with intuitive controls and clear information hierarchy",
      image: "/images/design-project4.jpg",
      category: "UI Design",
      externalUrl: "https://dribbble.com/shots/example4",
    },
    {
      id: 5,
      title: "User Experience Research",
      description: "In-depth UX research and user journey mapping for a financial service",
      image: "/images/design-project5.jpg",
      category: "UX Research",
      externalUrl: "https://dribbble.com/shots/example5",
    },
    {
      id: 6,
      title: "Design System",
      description: "Scalable design system with component library and documentation",
      image: "/images/design-project6.jpg",
      category: "Design Systems",
      externalUrl: "https://dribbble.com/shots/example6",
    },
  ]

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-white">
      <motion.div className="fixed inset-0 z-0 opacity-50 pointer-events-none" style={{ y: backgroundY }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/100"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_theme(colors.purple.500/30)_0,_transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_theme(colors.pink.500/20)_0,_transparent_50%)]"></div>
      </motion.div>

      <div className="relative z-10 pt-24">
        <PageHeader
          title="UI/UX Design"
          subtitle="Crafting intuitive user experiences and visually stunning interfaces that engage and delight."
        />
        <ProjectsGrid projects={designProjects} />
      </div>
    </div>
  )
}

