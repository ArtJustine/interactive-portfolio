"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowDown, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SkillSection from "@/components/skill-section"
import PlaygroundTimeline from "@/components/playground-timeline"
import { useIsMobile } from "@/hooks/use-mobile" // Use the hook you provided

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineSectionRef = useRef<HTMLDivElement>(null)
  const timelineTitleRef = useRef<HTMLDivElement>(null)
  const [isTitleAtTop, setIsTitleAtTop] = useState(false)
  const [isInTimelineSection, setIsInTimelineSection] = useState(false)
  const expertiseTitleRef = useRef<HTMLHeadingElement>(null)
  const [email, setEmail] = useState("")
  const isMobile = useIsMobile()
  
  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    if (!timelineTitleRef.current || !timelineSectionRef.current) return;
    
    const titleRect = timelineTitleRef.current.getBoundingClientRect()
    const sectionRect = timelineSectionRef.current.getBoundingClientRect()

    // Check if we're in the timeline section
    const inSection = sectionRect.top <= 0 && sectionRect.bottom >= 0
    
    // Only update state if there's a change to prevent unnecessary re-renders
    if (isInTimelineSection !== inSection) {
      setIsInTimelineSection(inSection)
    }

    // Only set title at top if we're in the section and the title has reached the top 
    const shouldBeAtTop = inSection && titleRect.top <= 0
    if (isTitleAtTop !== shouldBeAtTop) {
      setIsTitleAtTop(shouldBeAtTop)
    }
  }, [isTitleAtTop, isInTimelineSection])

  // Use RAF for smooth scrolling effects instead of direct event listener
  useEffect(() => {
    let rafId: number
    let lastScrollY = window.scrollY
    
    const onScroll = () => {
      // Skip if scrollY hasn't changed
      if (lastScrollY === window.scrollY) {
        rafId = requestAnimationFrame(onScroll)
        return
      }
      
      lastScrollY = window.scrollY
      handleScroll()
      rafId = requestAnimationFrame(onScroll)
    }
    
    rafId = requestAnimationFrame(onScroll)
    
    return () => cancelAnimationFrame(rafId)
  }, [handleScroll])

  // Main scroll animations - simplified for mobile
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Use simpler springs with less stiffness for mobile
  const smoothProgress = useSpring(scrollYProgress, {
    damping: isMobile ? 30 : 20, 
    stiffness: isMobile ? 80 : 100,
    restDelta: isMobile ? 0.01 : 0.001
  })

  // Reduce animation complexity on mobile
  const heroTextY = useTransform(smoothProgress, [0, 0.2], [0, isMobile ? -50 : -100])
  const heroImageScale = useTransform(smoothProgress, [0, 0.2], [1, isMobile ? 1.05 : 1.1])
  const gridOpacity = useTransform(smoothProgress, [0, 0.3, 0.6, 1], [0.3, 0.15, 0.1, 0.05])
  
  // Skills section animation - simplified for mobile
  const skillsY = useTransform(smoothProgress, [0.2, 0.4], [isMobile ? 50 : 100, 0])
  const skillsOpacity = useTransform(smoothProgress, [0.2, 0.3], [0, 1])
  
  // Contact section animation - simplified for mobile
  const contactY = useTransform(smoothProgress, [0.7, 0.9], [isMobile ? 50 : 100, 0])
  const contactOpacity = useTransform(smoothProgress, [0.7, 0.8], [0, 1])

  const handleSendClick = () => {
    if (email) {
      window.location.href = `mailto:${email}`
    } else {
      alert("Please enter an email address.")
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
      title: "UI/UX Design",
      description: "Crafting intuitive user experiences and visually stunning interfaces that engage and delight.",
      icon: "🎨",
      color: "from-purple-500 to-pink-500",
      link: "/design",
    },
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
      className="relative min-h-[500vh] bg-black text-white overflow-hidden"
      // Add performance optimizations for mobile
      style={{ 
        willChange: isMobile ? 'auto' : 'transform',
        transform: 'translateZ(0)'
      }}
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

      {/* Hero Section - optimized animations for mobile */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="relative z-10 text-center px-6" 
          style={{ y: heroTextY }}
          // Optimize for mobile
          initial={false}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            BUILDING BRANDS
            <br />
            ONE{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
              PIXEL
            </span>{" "}
            AT A TIME
          </h1>
          <p className="text-lg md:text-xl max-w-md mx-auto text-gray-300 mb-8">
            From marketing campaigns to sleek web interfaces, I design, develop, and create digital experiences that
            make an impact.
          </p>
          <a href="#skills">
            <Button
              variant="outline"
              className="relative rounded-full border-2 border-white text-white hover:text-white hover:bg-transparent 
              transition-all transform hover:scale-105 group"
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
          style={{ scale: heroImageScale }}
          // Optimize for mobile
          initial={false}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
          <Image 
            src="/images/heroimage.JPG" 
            alt="Hero Background" 
            fill 
            className="object-cover opacity-40" 
            priority
            sizes="100vw"
            // Add image optimization
            loading="eager"
            quality={isMobile ? 75 : 85}
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

      {/* Timeline Section - optimized sticky behavior */}
      <section id="timeline" className="relative z-10" ref={timelineSectionRef}>
        {/* Title that will stick to the top only when in the timeline section */}
        <div
          ref={timelineTitleRef}
          className={`${
            isTitleAtTop ? "fixed top-0 left-0 right-0 pt-4 pb-3 sm:pt-6 sm:pb-4" : "pt-6 pb-4"
          } bg-black z-30 safe-area-inset-top`}
          style={{
            paddingTop: isTitleAtTop ? "max(env(safe-area-inset-top), 1rem)" : "1.5rem",
            paddingBottom: isTitleAtTop ? "0.75rem" : "1rem",
            // Add hardware acceleration to prevent flickering when fixed
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            willChange: isTitleAtTop ? 'transform' : 'auto'
          }}
        >
          <div className="max-w-4xl mx-auto px-6">
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              style={{ opacity: isExpertiseTitleInView ? 1 : 0 }}
            >
              MY JOURNEY
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ opacity: isExpertiseTitleInView ? 1 : 0 }}
            >
              From junior designer to leading creative teams, my career has been defined by a passion for creating
              exceptional digital experiences that solve real problems.
            </motion.p>
          </div>
        </div>

        {/* Spacer to prevent content jump when title becomes fixed */}
        {isTitleAtTop && <div className="h-[120px]"></div>}

        {/* Career highlights section with horizontal scrolling cards */}
        <div 
          className="sticky top-[120px] sm:top-[140px] pt-4 pb-3 sm:pt-6 sm:pb-4 bg-black z-20"
          style={{
            // Add hardware acceleration to prevent flickering
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
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
        <PlaygroundTimeline 
          items={timelineItems} 
          titleInView={isTitleAtTop} 
        />
      </section>

      {/* Contact Section - optimized for mobile */}
      <motion.section
        id="contact"
        className="relative min-h-screen flex flex-col justify-center px-6 py-20 mt-[20vh]"
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
            </div>
            <div 
              className="bg-gray-900 bg-opacity-50 p-6 rounded-lg backdrop-blur-sm"
              style={{ transform: 'translateZ(0)' }} // Hardware acceleration
            >
              <div className="flex mb-6">
                <Input
                  type="email"
                  placeholder="Got an idea for a project? Send your e-mail"
                  className="bg-transparent border-gray-700 focus:border-white rounded-r-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button className="rounded-l-none" onClick={handleSendClick}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
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
