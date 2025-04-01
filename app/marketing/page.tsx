"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import PageHeader from "@/components/page-header"
import ProjectsGrid from "@/components/projects-grid"
import type { Project } from "@/components/projects-grid"

export default function MarketingPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  const marketingProjects: Project[] = [
    {
      id: 1,
      title: "Social Media Campaign",
      description: "Integrated social media strategy that increased engagement by 200%",
      image: "/images/marketing-project.jpg",
      category: "Social Media",
      externalUrl: "https://linkedin.com/in/yourusername/detail/project/1",
    },
    {
      id: 2,
      title: "Email Marketing Series",
      description: "Automated email sequence with 45% open rate and 12% conversion",
      image: "/images/marketing-project2.jpg",
      category: "Email Marketing",
      externalUrl: "https://linkedin.com/in/yourusername/detail/project/2",
    },
    {
      id: 3,
      title: "Content Marketing Strategy",
      description: "Comprehensive content plan that doubled organic traffic in 6 months",
      image: "/images/marketing-project3.jpg",
      category: "Content Marketing",
      externalUrl: "https://linkedin.com/in/yourusername/detail/project/3",
    },
    {
      id: 4,
      title: "PPC Campaign",
      description: "Google Ads campaign with 320% ROI and reduced cost per acquisition",
      image: "/images/marketing-project4.jpg",
      category: "Paid Advertising",
      externalUrl: "https://linkedin.com/in/yourusername/detail/project/4",
    },/*
    {
      id: 5,
      title: "SEO Optimization",
      description: "Technical and content SEO that achieved 5 featured snippets and top rankings",
      image: "/images/marketing-project5.jpg",
      category: "SEO",
      externalUrl: "https://linkedin.com/in/yourusername/detail/project/5",
    },
    {
      id: 6,
      title: "Marketing Analytics Dashboard",
      description: "Custom reporting solution that unified data from multiple marketing channels",
      image: "/images/marketing-project6.jpg",
      category: "Analytics",
      externalUrl: "https://linkedin.com/in/yourusername/detail/project/6",
    },*/
  ]

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-white">
      <motion.div className="fixed inset-0 z-0 opacity-50 pointer-events-none" style={{ y: backgroundY }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/100"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_theme(colors.green.500/30)_0,_transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_theme(colors.emerald.500/20)_0,_transparent_50%)]"></div>
      </motion.div>

      <div className="relative z-10 pt-24">
        <PageHeader
          title="Digital Marketing"
          subtitle="Develop marketing strategies that don’t just sell but create lasting relationships between brands and consumers."
        />
        <ProjectsGrid projects={marketingProjects} />
      </div>
    </div>
  )
}

