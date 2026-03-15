// @ts-nocheck
// This file uses Next.js and React 19 JSX runtime
"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowDown, Send, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SkillSection from "@/components/skill-section"
import PlaygroundTimeline from "@/components/playground-timeline"
import BentoGrid from "@/components/bento-grid"
import { useIsMobile } from "@/hooks/use-mobile"
import ScrollVideoAnimation from "@/components/scroll-video-animation"


export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineHeaderRef = useRef<HTMLDivElement>(null)
  const isTimelineHeaderInView = useInView(timelineHeaderRef, { once: true, margin: "-100px" })


  const expertiseTitleRef = useRef<HTMLHeadingElement>(null)
  const heroSectionRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState("")

  const [emailError, setEmailError] = useState("")
  const isMobile = useIsMobile()

  // Word flip animation state
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const flipWords = ["BRAND", "IDENTITY", "BUSINESS", "MESSAGE", "FLAVOR", "PRESENCE"]

  // Word flip animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % flipWords.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // No longer needed: manual scroll handling for sticky behavior replaced by CSS sticky


  // Scroll handler removed as CSS sticky is now used for headers


  // Main scroll animations - simplified for mobile
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Use simpler springs with less stiffness for mobile
  const smoothProgress = useSpring(scrollYProgress, {
    damping: isMobile ? 30 : 20,
    stiffness: isMobile ? 80 : 100,
    restDelta: isMobile ? 0.01 : 0.001,
  })

  // Reduce animation complexity on mobile
  const heroTextY = useTransform(smoothProgress, [0, 0.2], [0, isMobile ? -50 : -100])
  const heroImageScale = useTransform(smoothProgress, [0, 0.2], [1, isMobile ? 1.05 : 1.1])
  const heroOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0])

  const gridOpacity = useTransform(smoothProgress, [0, 0.3, 0.6, 1], [0.3, 0.15, 0.1, 0.05])

  // Skills section animation - simplified for mobile
  const skillsY = useTransform(smoothProgress, [0.08, 0.18], [isMobile ? 20 : 30, 0])
  const skillsOpacity = useTransform(smoothProgress, [0.08, 0.15], [0, 1])



  // Contact section animation - simplified for mobile
  const contactY = useTransform(smoothProgress, [0.7, 0.9], [isMobile ? 50 : 100, 0])
  const contactOpacity = useTransform(smoothProgress, [0.7, 0.8], [0, 1])
  
  // Map the main scroll progress to a normalized range for the animation
  // Starts immediately at hero, spans across the expertise section
  const animationProgress = useTransform(scrollYProgress, [0, 0.4], [0, 1])




  const handleSendClick = () => {
    if (email) {
      setEmailError("")
      window.location.href = `mailto:${email}`
    } else {
      setEmailError("Please enter an email address.")
    }
  }

  const isExpertiseTitleInView = useInView(expertiseTitleRef, { once: true })

  // Skills data
  const skills = [
    {
      title: "Front-end Development",
      description: "Building responsive, interactive websites with modern frameworks and clean, efficient code.",
      icon: "💻",
      color: "from-blue-500 to-cyan-500",
      link: "/frontend",
    },
    {
      title: "Digital Marketing",
      description: "Crafting intuitive user experiences and visually stunning interfaces that engage and delight.",
      icon: "💼",
      color: "from-purple-500 to-pink-500",
      link: "/marketing",
    },
    {
      title: "Copywriting",
      description: "Crafting persuasive, high-conversion copy for VSLs, articles, and ecommerce that resonates with audiences.",
      icon: "✍️",
      color: "from-green-500 to-emerald-500",
      link: "/copywriting",
    },
    {
      title: "Video Editing",
      description: "Creating engaging visual stories through professional editing, motion graphics, and sound design.",
      icon: "🎬",
      color: "from-orange-500 to-red-500",
      link: "/video-editing",
    },
    {
      title: "UI/UX Design",
      description: "Crafting intuitive user experiences and visually stunning interfaces that engage and delight.",
      icon: "🎨",
      color: "from-purple-500 to-pink-500",
      link: "/design",
    }
  ]

  // Career timeline data
  const timelineItems = [
    {
      date: "2024 - Present",
      title: "Digital Marketer",
      company: "Shore Marketing",
      description:
        "Conduct keyword research, perform on-page optimization, monitor SEO metrics and website performance using tools like Ahrefs, and create SEO-optimized content along with link-building strategies to improve search engine rankings and drive traffic",
      color: "bg-blue-500 bg-opacity-20 text-blue-300",
    },
    {
      date: "2023 - 2024",
      title: "Copy Writer & Video Editor",
      company: "Pawfect House",
      description:
        "Monitor and analyze website performance, sales data, and customer behavior using tools like Google Analytics, while crafting compelling product descriptions, website copy, and social media captions, and managing customer inquiries and feedback across email, chat, and social media platforms.",
      color: "bg-purple-500 bg-opacity-20 text-purple-300",
    },
    {
      date: "2022 - 2023",
      title: "E-Commerce Specialist",
      company: "JNO E-commerce US",
      description:
        "Coordinate with the supply chain team to maintain product availability and timely restocking, while creating and optimizing product listings with compelling descriptions, high-quality images, and accurate pricing to drive sales.",
      color: "bg-pink-500 bg-opacity-20 text-pink-300",
    },
    {
      date: "2021 - 2022",
      title: "UI Designer & Social Media Manager",
      company: "Hilton Dental Austalia",
      description:
        "Create, edit, and schedule engaging social media content for Facebook, Instagram, TikTok, and YouTube, while analyzing performance metrics to optimize future campaigns.",
      color: "bg-red-500 bg-opacity-20 text-red-300",
    },
    {
      date: "2020 - 2021",
      title: "Graphic Designer",
      company: "Lauren Digital Studio",
      description:
        "Manage the daily operations of Lauren Digital Studio by ensuring a smooth user experience, efficient delivery of design orders, and providing outstanding customer service to foster strong client relationships.",
      color: "bg-orange-500 bg-opacity-20 text-orange-300",
    },
    {
      date: "2019 - 2020",
      title: "Web Developer",
      company: "Bomstom",
      description:
        "Conduct market research to stay informed about web development trends, emerging technologies, competitor websites, and user behavior, and adapt development strategies to stay ahead and meet user needs.",
      color: "bg-amber-500 bg-opacity-20 text-amber-300",
    },
  ]

  return (
    <div
      ref={containerRef}
      className="relative min-h-[500vh] bg-black text-white overflow-clip"
    >


      {/* Background grid - simplified for mobile */}
      <motion.div
        className="fixed inset-0 w-full h-full z-0 pointer-events-none"
        style={{ opacity: gridOpacity }}
        // Reduce repaints on mobile
        initial={false}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:40px_40px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,_rgba(255,255,255,0.1)_1px,_transparent_1px),_linear-gradient(to_bottom,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[size:40px_40px]"></div>
      </motion.div>

      {/* Scroll Driven Image Sequence Animation */}
      <ScrollVideoAnimation frameCount={40} baseUrl="/animation" progress={animationProgress} />

      {/* Hero Section - optimized animations for mobile */}
      <section ref={heroSectionRef} className="relative h-screen flex items-center justify-center overflow-hidden">

        <motion.div
          className="relative z-10 text-center px-6"
          style={{ y: heroTextY }}
          // Optimize for mobile
          initial={false}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            BUILDING{" "}
            <span className="relative inline-block">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWordIndex}
                  className="absolute left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient text-[1.15em] font-extrabold"
                  initial={{ opacity: 0, rotateX: -90 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  exit={{ opacity: 0, rotateX: 90 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{ transformOrigin: "50% 50%" }}
                >
                  {flipWords[currentWordIndex]}
                </motion.span>
              </AnimatePresence>
              <span className="invisible bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient text-[1.15em] font-extrabold">
                {flipWords[0]}
              </span>
            </span>
            <br />
            ONE <span>PIXEL</span> AT A TIME
          </h1>
          <p className="text-lg md:text-xl max-w-md mx-auto text-gray-300 mb-8">
            From marketing campaigns to sleek web interfaces, I design, develop, and create digital experiences that
            make an impact.
          </p>
          <a href="#skills">
            <Button
              variant="outline"
              size="lg"
              className="relative rounded-full border-2 border-white text-white hover:text-white hover:bg-transparent 
              transition-all transform hover:scale-110 group px-10 py-7 text-lg"
            >
              <span className="relative z-10 flex items-center group-hover:text-white">
                Explore My Work{" "}
                <span className="ml-2 transition-transform duration-300 transform rotate-180 group-hover:rotate-0">
                  <ArrowDown className="h-4 w-4" />
                </span>
              </span>
              <span
                className="absolute inset-0 border-2 border-transparent rounded-full 
                   bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                   bg-clip-border animate-border opacity-0 group-hover:opacity-100"
              ></span>
            </Button>
          </a>
        </motion.div>

        <motion.div
          className="absolute inset-0 z-0"
          style={{ scale: heroImageScale, opacity: heroOpacity }}
          // Optimize for mobile
          initial={false}
        >

          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
          <Image
            src="/animation/ezgif-frame-001.jpg"
            alt="Hero Background"
            fill
            className="object-cover opacity-30"

            priority
            sizes="100vw"
            loading="eager"
            quality={isMobile ? 75 : 80}
          />

        </motion.div>
      </section>

      {/* Skills Section - optimized for mobile */}
      <motion.section
        id="skills"
        className="relative min-h-screen flex flex-col justify-center px-6 py-20"
        style={{
          y: skillsY,
          opacity: skillsOpacity,
        }}
        // Optimize for mobile
        initial={false}
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2 ref={expertiseTitleRef} className="text-3xl md:text-5xl font-bold mb-16">
            MY EXPERTISE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <Link href={skill.link} key={index} className="block">
                <SkillSection
                  title={skill.title}
                  description={skill.description}
                  icon={skill.icon}
                  colorClass={skill.color}
                  delay={isMobile ? 0 : index * 0.1} // No delay on mobile for better performance
                />
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      <section id="timeline" className="relative z-10 bg-[#0a0a0a]">
        <div
          ref={timelineHeaderRef}
          className="sticky top-0 sm:top-[80px] pt-6 pb-4 bg-[#0a0a0a] z-30 w-full"

          style={{
            // Add hardware acceleration to prevent flickering when sticky
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            willChange: "transform",
          }}
        >
          <div className="max-w-4xl mx-auto px-6">
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={isTimelineHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8 }}
            >
              MY JOURNEY
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isTimelineHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              From junior designer to leading creative teams, my career has been defined by a passion for creating
              exceptional digital experiences that solve real problems.
            </motion.p>
          </div>
        </div>


        {/* Career highlights section with horizontal scrolling cards */}
        <div
          className="sticky top-[120px] sm:top-[140px] pt-4 pb-3 sm:pt-6 sm:pb-4 bg-[#0a0a0a] z-20"

          style={{
            // Add hardware acceleration to prevent flickering
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
        >
          <div className="max-w-4xl mx-auto px-6">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Career Highlights</h3>
            <p className="text-gray-300">
              Scroll down to explore my professional journey through the years. Each stage represents growth, learning,
              and new challenges.
            </p>
          </div>
        </div>

        {/* Optimized timeline component */}
        <PlaygroundTimeline items={timelineItems} />
      </section>


      {/* Bento Grid Section - Added before contact section */}
      <BentoGrid />

      {/* Contact Section - optimized for mobile */}
      <motion.section
        id="contact"
        className="relative min-h-screen flex flex-col justify-center px-6 py-20"
        style={{
          y: contactY,
          opacity: contactOpacity,
        }}
        // Optimize for mobile
        initial={false}
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl md:text-5xl font-bold mb-16">GET IN TOUCH</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-xl mb-8">Have a project in mind? Let's chat and make it happen.</p>
              <div className="space-y-4">
                <p className="flex items-center">
                  <span className="w-24 text-gray-400">Email:</span>
                  <a href="mailto:artjustine.gonzales@gmail.com" className="hover:text-white transition-colors">
                    artjustine.gonzales@gmail.com
                  </a>
                </p>
                <p className="flex items-center">
                  <span className="w-24 text-gray-400">Location:</span>
                  <span>Pampanga, Philippines</span>
                </p>
              </div>
              {/* Download CV Button with animation */}
              <Button
                variant="outline"
                className="relative rounded-full border-2 border-white text-white hover:text-white hover:bg-transparent 
                transition-all transform hover:scale-105 group mt-4"
                onClick={() => window.open("/cv_art.pdf", "_blank")}
              >
                <span className="relative z-10 flex items-center group-hover:text-white">
                  Download CV{" "}
                  <span className="ml-2 transition-transform duration-300 transform group-hover:translate-y-1">
                    <Download className="h-4 w-4" />
                  </span>
                </span>
                <span
                  className="absolute inset-0 border-2 border-transparent rounded-full 
                     bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                     bg-clip-border animate-border opacity-0 group-hover:opacity-100"
                ></span>
              </Button>
            </div>
            <div
              className="bg-gray-900 bg-opacity-50 p-6 rounded-lg backdrop-blur-sm"
              style={{ transform: "translateZ(0)" }} // Hardware acceleration
            >
              <div className="flex mb-6">
                <Input
                  type="email"
                  placeholder="Got an idea for a project? Send your e-mail"
                  className="bg-transparent border-gray-700 focus:border-white rounded-r-none"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (emailError) setEmailError("")
                  }}
                />
                <Button className="rounded-l-none" onClick={handleSendClick}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              {emailError && (
                <p className="text-red-500 text-sm mt-2">{emailError}</p>
              )}
              <p className="text-sm text-gray-400">
                I'll reach out ASAP! Looking forward to creating something great with you.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
