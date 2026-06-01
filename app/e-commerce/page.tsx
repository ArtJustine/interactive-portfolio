"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import PageHeader from "@/components/page-header"
import ProjectsGrid from "@/components/projects-grid"
import type { Project } from "@/components/projects-grid"

export default function EcommercePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  const ecommerceExperiences: Project[] = [
    {
      id: 1,
      title: "MaisonPets NL",
      description: "Shopify Developer: Build and maintain Shopify stores for NL and DE marketplaces. Ensure site is SEO/GEO ready, and update collections and product pages for seasonal EU changes.",
      image: "/images/ecommerce.png",
      category: "Shopify Developer",
      externalUrl: "https://maisonpets.nl/",
    },
    {
      id: 2,
      title: "PetCareLand",
      description: "Shopify Developer & General VA: Build, optimize, and update Shopify storefront. Manage product listings, pricing, variants, and social media scheduling. Build and optimize Meta ad campaigns.",
      image: "/petcare.webp",
      category: "Shopify & Marketing VA",
      externalUrl: "https://petcareland.com/",
    },
    {
      id: 3,
      title: "Pawfect House",
      description: "Freelance Copywriter & SEO Specialist: Monitor and analyze website performance and sales data using Google Analytics. Conduct keyword and competitor research for on-page SEO. Write high-converting product descriptions.",
      image: "/images/seo.png",
      category: "E-Commerce Copywriter & SEO",
      externalUrl: "https://pawfecthouse.com/",
    },
    {
      id: 4,
      title: "JNO E-commerce US",
      description: "Freelance E-Commerce Specialist: Coordinate supply chain operations to ensure inventory availability and timely restocking. Create and optimize Amazon FBA storefront product listings with high-quality descriptions and pricing.",
      image: "/images/ad.png",
      category: "Amazon FBA Specialist",
      externalUrl: "https://www.junoecommerce.com/",
    },
    {
      id: 5,
      title: "Lauren Digital Studio",
      description: "Freelance Virtual Assistant: Oversee Etsy store day-to-day operations to ensure seamless user experiences and order fulfillment. Manage customer relationships and support to drive retention.",
      image: "/images/focus-help-app.png",
      category: "Etsy Operations VA",
      externalUrl: "https://www.etsy.com",
    },
    {
      id: 6,
      title: "Bomstom",
      description: "Freelance Website Developer: Adapt development strategies to stay ahead of the dropshipping market. Build and scale online store website using WordPress, HTML, CSS, and JavaScript.",
      image: "/images/businesslanding.png",
      category: "Dropshipping Web Developer",
      externalUrl: "https://wordpress.org",
    },
  ]

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-white">
      <motion.div className="fixed inset-0 z-0 opacity-50 pointer-events-none" style={{ y: backgroundY }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/100"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_theme(colors.amber.500/30)_0,_transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_theme(colors.orange.500/20)_0,_transparent_50%)]"></div>
      </motion.div>

      <div className="relative z-10 pt-24">
        <PageHeader
          title="E-Commerce Storefronts"
          subtitle="I build, optimize, and manage e-commerce storefronts that drive conversions, streamline operations, and boost sales."
        />

        {/* Icon row */}
        <div className="flex flex-wrap items-center justify-center gap-6 py-8">
          <Image
            src="/images/icons8-shopify (1).svg"
            alt="Shopify"
            width={40}
            height={40}
            className="h-10 w-10 hover:scale-110 transition-transform"
          />
          <Image
            src="/images/icons8-wordpress (1).svg"
            alt="WordPress"
            width={40}
            height={40}
            className="h-10 w-10 hover:scale-110 transition-transform"
          />
          <Image
            src="/images/icons8-meta (2).svg"
            alt="Meta/Facebook"
            width={40}
            height={40}
            className="h-10 w-10 hover:scale-110 transition-transform"
          />
          <Image
            src="/images/icons8-google-ads (1).svg"
            alt="Google Ads"
            width={40}
            height={40}
            className="h-10 w-10 hover:scale-110 transition-transform"
          />
          <Image
            src="/images/klaviyo.svg"
            alt="Klaviyo"
            width={40}
            height={40}
            className="h-10 w-10 hover:scale-110 transition-transform"
          />
        </div>

        <ProjectsGrid projects={ecommerceExperiences} />
      </div>
    </div>
  )
}
