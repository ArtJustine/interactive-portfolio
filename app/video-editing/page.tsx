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
      title: "Ecommerce Product Video",
      description: "Professional product showcase designed to drive sales and engagement with high-conversion visuals.",
      image: "/images/ecommerce.png",
      category: "E-commerce",
      externalUrl: "https://drive.google.com/file/d/1u-R51ZwLyhccnx6Syns9vDmIN7vMMqAQ/view?usp=sharing",
    },
    {
      id: 2,
      title: "Corporate Video",
      description: "High-quality corporate storytelling and brand presentation for professional business narratives.",
      image: "/images/creative.png",
      category: "Corporate",
      externalUrl: "https://drive.google.com/file/d/1-aPEj01A7YcaQ9yAPZErmChb7gd24AvS/view?usp=sharing",
    },
    {
      id: 3,
      title: "AI Generated Ad",
      description: "Innovative advertisement created using cutting-edge AI video generation tools and techniques.",
      image: "/images/ad.png",
      category: "AI Production",
      externalUrl: "https://drive.google.com/file/d/1VFyXGCsvcuaMEf4qhrKfKKUoV9zfuBop/view?usp=sharing",
    },
    {
      id: 4,
      title: "Social Media Vertical Video",
      description: "Engaging vertical content optimized for TikTok, Reels, and Shorts to capture mobile audiences.",
      image: "/images/social.png",
      category: "Social Media",
      externalUrl: "https://drive.google.com/file/d/1HzlVvgFdFHLGVvYilp5vhr-BBiCUy2ea/view?usp=sharing",
    },
  ]

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-white">
      <motion.div className="fixed inset-0 z-0 opacity-50 pointer-events-none" style={{ y: backgroundY }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(50,50,255,0.1),rgba(0,0,0,1))]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/50 to-black/100"></div>
      </motion.div>

      <div className="relative z-10 pt-24">
        <PageHeader
          title="Video Editing"
          subtitle="I blend visuals, sound, and motion to create compelling narratives that leave a lasting impression."
        />
        <ProjectsGrid projects={videoProjects} />
      </div>
    </div>
  )
}
