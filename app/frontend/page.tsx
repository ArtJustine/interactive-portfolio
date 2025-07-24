"use client"

import { useRef } from "react"
import Image from "next/image"
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
      title: "Tech News Website",
      description: "Fully responsive online store with cart functionality and payment integration",
      image: "/images/Tech News.png",
      category: "React & Next.js",
      externalUrl: "https://fewmacslatr-phi.vercel.app/",
    },
    {
      id: 2,
      title: "SaaS Order POS",
      description: "Interactive admin dashboard with data visualization and real-time updates",
      image: "/images/saas.png",
      category: "React & TypeScript",
      externalUrl: "https://order-pos.vercel.app/",
    },
    {
      id: 3,
      title: "Blog Website",
      description: "Creative portfolio with advanced animations and interactive elements",
      image: "/images/blog.png",
      category: "Next.js & Framer Motion",
      externalUrl: "https://youtube-indol-two.vercel.app/",
    },
    {
      id: 4,
      title: "Social Media Scheduling Tool",
      description: "Progressive web app with offline capabilities and native-like experience",
      image: "/images/socialscheduler.png",
      category: "Next JS & Vercel",
      externalUrl: "https://v0-social-media-scheduler-zeta-woad.vercel.app/",
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
          title="Web Development"
          subtitle="I develop dynamic, high-quality websites that adapt to any device and deliver seamless user experiences."
        />
        {/* Icon row */}
        <div className="flex flex-wrap items-center justify-center gap-6 py-8">
          <Image 
            src="/images/icons8-nextjs.svg" 
            alt="NextJS" 
            width={40} 
            height={40} 
            className="h-10 w-10" 
          />
          <Image 
            src="/images/icons8-typescript.svg" 
            alt="TypeScript" 
            width={40} 
            height={40} 
            className="h-10 w-10" 
          />
          <Image 
            src="/images/icons8-tailwind-css.svg" 
            alt="Tailwind CSS" 
            width={40} 
            height={40} 
            className="h-10 w-10" 
          />
          <Image 
            src="/images/icons8-javascript.svg" 
            alt="JavaScript" 
            width={40} 
            height={40} 
            className="h-10 w-10" 
          />
          <Image 
            src="/images/icons8-shopify (1).svg" 
            alt="Shopify" 
            width={40} 
            height={40} 
            className="h-10 w-10" 
          />
          <Image 
            src="/images/icons8-wordpress (1).svg" 
            alt="WordPress" 
            width={40} 
            height={40} 
            className="h-10 w-10" 
          />
          <Image 
            src="/images/icons8-webflow.svg" 
            alt="Webflow" 
            width={40} 
            height={40} 
            className="h-10 w-10" 
          />
          <Image 
            src="/images/icons8-wix.svg" 
            alt="Wix" 
            width={40} 
            height={40} 
            className="h-10 w-10" 
          />
        </div>

        <ProjectsGrid projects={frontendProjects} />
      </div>
    </div>
  )
}
