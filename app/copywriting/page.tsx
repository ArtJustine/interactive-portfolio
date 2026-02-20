"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import PageHeader from "@/components/page-header"
import ProjectsGrid from "@/components/projects-grid"
import type { Project } from "@/components/projects-grid"

export default function CopywritingPage() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

    const copywritingProjects: Project[] = [
        {
            id: 1,
            title: "High-Conversion VSL",
            description: "A persuasive Video Sales Letter script crafted to hook audiences and drive direct-response sales.",
            image: "/vsl.webp",
            category: "VSL",
            externalUrl: "https://docs.google.com/document/d/1nuPgXY8hcb0naLmtc6Ri8kzAswZM4wlFheoUPUoBhb8/edit?usp=sharing",
        },
        {
            id: 2,
            title: "Founder FAQs - Startup Articles",
            description: "In-depth, strategic content aimed at empowering startup founders with actionable insights and growth tactics.",
            image: "/saas.webp",
            category: "Article Writing",
            externalUrl: "https://founderfaqs.com/",
        },
        {
            id: 3,
            title: "Growth Lab Inc - LinkedIn Articles",
            description: "Thought leadership pieces and professional articles designed to build brand authority on LinkedIn.",
            image: "/linkedin.webp",
            category: "LinkedIn Content",
            externalUrl: "https://www.linkedin.com/company/growth-lab-inc/posts/?feedView=articles",
        },
        {
            id: 4,
            title: "PetCareLand - Ecommerce Copy",
            description: "Sales-driven product descriptions and website copy for a leading pet care e-commerce platform.",
            image: "/petcare.webp",
            category: "E-commerce",
            externalUrl: "https://petcareland.com/",
        },
    ]

    return (
        <div ref={containerRef} className="relative min-h-screen bg-black text-white">
            <motion.div className="fixed inset-0 z-0 opacity-50 pointer-events-none" style={{ y: backgroundY }}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(50,255,150,0.1),rgba(0,0,0,1))]"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/50 to-black/100"></div>
            </motion.div>

            <div className="relative z-10 pt-24">
                <PageHeader
                    title="Copywriting"
                    subtitle="I craft words that resonate, persuade, and convert, turning readers into loyal fans and customers."
                />
                <ProjectsGrid projects={copywritingProjects} />
            </div>
        </div>
    )
}
