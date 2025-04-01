"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowDown, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SkillSection from "@/components/skill-section"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
  })

  // Parallax effect for hero section
  const heroTextY = useTransform(smoothProgress, [0, 0.2], [0, -100])
  const heroImageScale = useTransform(smoothProgress, [0, 0.2], [1, 1.1])

  // Background grid opacity based on scroll
  const gridOpacity = useTransform(smoothProgress, [0, 0.3, 0.6, 1], [0.3, 0.15, 0.1, 0.05])

  // Skills section animation
  const skillsY = useTransform(smoothProgress, [0.2, 0.4], [100, 0])
  const skillsOpacity = useTransform(smoothProgress, [0.2, 0.3], [0, 1])

  // Contact section animation
  const contactY = useTransform(smoothProgress, [0.6, 0.8], [100, 0])
  const contactOpacity = useTransform(smoothProgress, [0.6, 0.7], [0, 1])

  const skills = [
    {
      title: "Video Editing",
      description:
        "Creating compelling visual narratives through expert editing techniques, color grading, and motion graphics.",
      icon: "🎬",
      color: "from-red-500 to-orange-500",
      link: "/video-editing",
    },
    {
      title: "Front-end Development",
      description: "Building responsive, interactive websites with modern frameworks and clean, efficient code.",
      icon: "💻",
      color: "from-blue-500 to-cyan-500",
      link: "/frontend",
    },
    {
      title: "UI/UX Design",
      description: "Crafting intuitive user experiences and visually stunning interfaces that engage and delight.",
      icon: "🎨",
      color: "from-purple-500 to-pink-500",
      link: "/design",
    },
    {
      title: "Digital Marketing",
      description: "Developing strategic campaigns that connect with audiences and drive measurable results.",
      icon: "📊",
      color: "from-green-500 to-emerald-500",
      link: "/marketing",
    },
  ]

  return (
    <div ref={containerRef} className="relative min-h-[400vh] bg-black text-white overflow-hidden">
      {/* Background grid */}
      <motion.div className="fixed inset-0 w-full h-full z-0 pointer-events-none" style={{ opacity: gridOpacity }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:40px_40px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,_rgba(255,255,255,0.1)_1px,_transparent_1px),_linear-gradient(to_bottom,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[size:40px_40px]"></div>
      </motion.div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div className="relative z-10 text-center px-6" style={{ y: heroTextY }}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            BUILDING BRANDS
            <br />
            ONE PIXEL AT A TIME
          </h1>
          <p className="text-lg md:text-xl max-w-md mx-auto text-gray-300 mb-8">
            From marketing campaigns to sleek web interfaces, I design, develop, and create digital experiences that make an impact.
          </p>
          <a href="#skills">
            <Button
            variant="outline"
            className="rounded-full border-white text-white hover:bg-white hover:text-black transition-all"
          >
            Explore My Work <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </motion.div>

        <motion.div className="absolute inset-0 z-0" style={{ scale: heroImageScale }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
          <Image src="/images/heroimage.JPG" alt="Hero Background" fill className="object-cover opacity-40" priority />
        </motion.div>
      </section>

      {/* Skills Section */}
      <motion.section
        id="skills"
        className="relative min-h-screen flex flex-col justify-center px-6 py-20"
        style={{
          y: skillsY,
          opacity: skillsOpacity,
        }}
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl md:text-5xl font-bold mb-16">MY EXPERTISE</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <Link href={skill.link} key={index} className="block group">
                <SkillSection
                  title={skill.title}
                  description={skill.description}
                  icon={skill.icon}
                  colorClass={skill.color}
                  delay={index * 0.1}
                />
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="relative min-h-screen flex flex-col justify-center px-6 py-20"
        style={{
          y: contactY,
          opacity: contactOpacity,
        }}
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl md:text-5xl font-bold mb-16">GET IN TOUCH</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-xl mb-8">
                Interested in working together? Let's discuss your project and bring your vision to life.
              </p>
              <div className="space-y-4">
                <p className="flex items-center">
                  <span className="w-24 text-gray-400">Email:</span>
                  <a href="mailto:your.email@example.com" className="hover:text-white transition-colors">
                    artjustine.gonzales@gmail.com
                  </a>
                </p>
                <p className="flex items-center">
                  <span className="w-24 text-gray-400">Location:</span>
                  <span>Pampanga, Philippines</span>
                </p>
              </div>
            </div>
            <div className="bg-gray-900 bg-opacity-50 p-6 rounded-lg backdrop-blur-sm">
              <div className="flex mb-6">
                <Input
                  type="email"
                  placeholder="Got an idea for a project? Send your e-mail"
                  className="bg-transparent border-gray-700 focus:border-white rounded-r-none"
                />
                <Button className="rounded-l-none">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-400">
                I'll get back to you as soon as possible. Let's create something amazing together.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

