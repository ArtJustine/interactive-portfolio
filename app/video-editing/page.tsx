"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import PageHeader from "@/components/page-header"
import ProjectsGrid from "@/components/projects-grid"
import type { Project } from "@/components/projects-grid"

export default function VideoEditingPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  const videoProjects: Project[] = [
    {
      id: 1,
      title: "Cinematic Brand Story",
      description: "Emotional storytelling through cinematic visuals for a luxury brand",
      image: "/images/video-project.jpg",
      category: "Commercial",
      externalUrl: "https://youtube.com/watch?v=example1",
    },
    {
      id: 2,
      title: "Music Video Production",
      description: "Creative direction and editing for an indie artist's music video",
      image: "/images/video-project2.jpg",
      category: "Music Video",
      externalUrl: "https://youtube.com/watch?v=example2",
    },
    {
      id: 3,
      title: "Documentary Short",
      description: "Compelling visual narrative exploring environmental conservation",
      image: "/images/video-project3.jpg",
      category: "Documentary",
      externalUrl: "https://youtube.com/watch?v=example3",
    },
    {
      id: 4,
      title: "Product Launch Video",
      description: "Dynamic product showcase with motion graphics and visual effects",
      image: "/images/video-project4.jpg",
      category: "Commercial",
      externalUrl: "https://youtube.com/watch?v=example4",
    },
    {
      id: 5,
      title: "Event Highlight Reel",
      description: "Fast-paced editing capturing the energy of a major corporate event",
      image: "/images/video-project5.jpg",
      category: "Event",
      externalUrl: "https://youtube.com/watch?v=example5",
    },
    {
      id: 6,
      title: "Social Media Campaign",
      description: "Series of short-form videos optimized for social media engagement",
      image: "/images/video-project6.jpg",
      category: "Social Media",
      externalUrl: "https://youtube.com/watch?v=example6",
    },
  ]

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-white">
      <motion.div className="fixed inset-0 z-0 opacity-50 pointer-events-none" style={{ y: backgroundY }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/100"></div>
        <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-30">
          <source src="/videos/video-bg.mp4" type="video/mp4" />
        </video>
      </motion.div>

      <div className="relative z-10 pt-24">
        <PageHeader
          title="Video Editing"
          subtitle="CreatingI blend visuals, sound, and motion to create compelling narratives that leave a lasting impression."
        />
        <ProjectsGrid projects={videoProjects} />
      </div>
    </div>
  )
}

