"use client"

import { useRef, useState, useEffect } from "react"
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

  // Mouse tracking state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-[400vh] bg-black text-white overflow-hidden">
      {/* Mouse hover light effect */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.1), transparent 70%)`,
          transition: "background 0.1s linear",
        }}
      />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-opacity-90">
        <motion.div className="relative z-20 text-center px-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            BUILDING BRANDS
            <br />
            ONE <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">PIXEL</span> AT A TIME
          </h1>
          <p className="text-lg md:text-xl max-w-md mx-auto text-gray-300 mb-8">
            From marketing campaigns to sleek web interfaces, I design, develop, and create digital experiences that make an impact.
          </p>
          <a href="#skills">
            <Button variant="outline" className="rounded-full border-2 border-white text-white hover:bg-transparent transition-all transform hover:scale-105">
              Explore My Work
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </motion.div>
      </section>

      {/* Other Sections (Skills, Contact, etc.) */}
      {/* ... Rest of your sections remain unchanged ... */}
      


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
                Have a project in mind? Let’s chat and make it happen.
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update state with the email input
                />
                <Button className="rounded-l-none" onClick={handleSendClick}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-400">
                I’ll reach out ASAP! Looking forward to creating something great with you.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
