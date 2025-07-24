"use client"
import { useRef } from "react"
import Image from "next/image"
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
      title: "SEO Optimization",
      description: "Technical and content SEO that achieved 5 featured snippets and top rankings in competitive niches.",
      image: "/images/seo.png",
      category: "SEO",
      externalUrl: "https://pawfecthouse.com/",
    },
    {
      id: 2,
      title: "Content Marketing Strategy",
      description: "Comprehensive blog and video content strategy that doubled organic traffic in just 6 months.",
      image: "/images/creative.png",
      category: "Content Marketing",
      externalUrl: "https://hiltondentalcq.com.au/",
    },
    {
      id: 3,
      title: "Social Media Campaign",
      description: "Strategic multi-platform campaign that increased brand engagement by 200% in 3 months.",
      image: "/images/social.png",
      category: "Social Media",
      externalUrl: "https://www.shore360.com/",
    },
    {
      id: 4,
      title: "PPC Campaign",
      description: "Google Ads campaign with 320% ROI, reduced cost-per-click by 40%, and expanded reach.",
      image: "/images/ad.png",
      category: "PPC",
      externalUrl: "https://www.junoecommerce.com/",  
    },
    {
      id: 5,
      title: "Affiliate & Influencer Marketing",
      description: "Built a profitable affiliate program and partnered with niche influencers to drive brand trust and conversions.",
      image: "/images/affiliate.png",
      category: "Affiliate Marketing",
      externalUrl: "https://impact.com/", 
    },
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
          subtitle="Develop marketing strategies that don't just sell but create lasting relationships between brands and consumers."
        />
        
        {/* Icon row */}
        <div className="flex flex-wrap items-center justify-center gap-6 py-8">
          <Image 
            src="/images/icons8-google-ads (1).svg" 
            alt="Google Ads" 
            width={40} 
            height={40} 
            className="h-10 w-10" 
          />
          <Image 
            src="/images/icons8-meta (2).svg" 
            alt="Meta/Facebook" 
            width={40} 
            height={40} 
            className="h-10 w-10" 
          />
          <Image 
            src="/images/icons8-canva.svg" 
            alt="Canva" 
            width={40} 
            height={40} 
            className="h-10 w-10" 
          />
          <Image 
            src="/images/klaviyo1.svg" 
            alt="Klaviyo" 
            width={40} 
            height={40} 
            className="h-10 w-10" 
          />
        </div>
        
        <ProjectsGrid projects={marketingProjects} />
      </div>
    </div>
  )
}
