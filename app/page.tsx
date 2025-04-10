"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowDown, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SkillSection from "@/components/skill-section"
import PlaygroundTimeline from "@/components/playground-timeline"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineSectionRef = useRef<HTMLDivElement>(null)
  const timelineTitleRef = useRef<HTMLDivElement>(null)
  const [isTitleAtTop, setIsTitleAtTop] = useState(false)
  const [isInTimelineSection, setIsInTimelineSection] = useState(false)
  const expertiseTitleRef = useRef<HTMLHeadingElement>(null)

  // Check if the timeline title is at the top of the viewport and if we're in the timeline section
  useEffect(() => {
    const handleScroll = () => {
      if (timelineTitleRef.current && timelineSectionRef.current) {
        const titleRect = timelineTitleRef.current.getBoundingClientRect()
        const sectionRect = timelineSectionRef.current.getBoundingClientRect()

        // Check if we're in the timeline section
        const inSection = sectionRect.top <= 0 && sectionRect.bottom >= 0
        setIsInTimelineSection(inSection)

        // Only set title at top if we're in the section and the title has reached the top
        setIsTitleAtTop(inSection && titleRect.top <= 0)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
  const contactY = useTransform(smoothProgress, [0.7, 0.9], [100, 0])
  const contactOpacity = useTransform(smoothProgress, [0.7, 0.8], [0, 1])

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

  // Career timeline data with detailed examples and more entries
  const timelineItems = [
    {
      date: "2024 - Present",
      title: "Creative Director & Lead Developer",
      company: "Digital Fusion Studios",
      description:
        "Overseeing all creative and technical aspects of major digital projects for international clients. Leading a cross-functional team of 12 designers and developers to deliver cutting-edge web applications and digital experiences. Implemented AI-driven design systems that reduced production time by 50% while maintaining exceptional quality standards.",
      color: "bg-blue-500 bg-opacity-20 text-blue-300",
    },
    {
      date: "2023 - 2024",
      title: "Lead UI/UX Designer & Developer",
      company: "Pixel Perfect Studios",
      description:
        "Led a team of 5 designers and developers to create cutting-edge digital experiences for Fortune 500 clients. Implemented design systems that reduced development time by 40% and increased client satisfaction scores by 35%. Specialized in creating accessible interfaces that meet WCAG 2.1 AA standards while maintaining visual appeal.",
      color: "bg-purple-500 bg-opacity-20 text-purple-300",
    },
    {
      date: "2022 - 2023",
      title: "Senior Frontend Developer",
      company: "TechVision Innovations",
      description:
        "Architected and developed responsive web applications using React, Next.js, and TypeScript. Created a component library that was adopted company-wide, reducing inconsistencies and speeding up development cycles. Mentored junior developers and led the transition from legacy code to modern frameworks, resulting in a 60% performance improvement across all projects.",
      color: "bg-pink-500 bg-opacity-20 text-pink-300",
    },
    {
      date: "2021 - 2022",
      title: "Frontend Developer & UX Specialist",
      company: "Innovative Web Solutions",
      description:
        "Developed and optimized web applications with a focus on performance and user experience. Collaborated with UX researchers to implement data-driven design improvements that increased user engagement by 35%. Specialized in creating micro-interactions and animations that enhanced the overall user experience without compromising performance.",
      color: "bg-red-500 bg-opacity-20 text-red-300",
    },
    {
      date: "2020 - 2021",
      title: "UI/UX Designer",
      company: "Creative Digital Agency",
      description:
        "Designed user interfaces for mobile apps and websites that reached over 2 million users. Conducted user research and usability testing to inform design decisions, resulting in a 45% increase in user engagement. Created motion design specifications that enhanced the perceived quality of digital products while maintaining performance standards.",
      color: "bg-orange-500 bg-opacity-20 text-orange-300",
    },
    {
      date: "2019 - 2020",
      title: "Interactive Designer",
      company: "Future Forward Media",
      description:
        "Created interactive digital experiences for brands in the entertainment and technology sectors. Designed and prototyped innovative interfaces that pushed the boundaries of web technology while maintaining usability. Collaborated with marketing teams to ensure designs aligned with brand strategies and campaign objectives.",
      color: "bg-amber-500 bg-opacity-20 text-amber-300",
    },
    {
      date: "2018 - 2019",
      title: "Web Developer & Digital Designer",
      company: "Freelance",
      description:
        "Worked with startups and small businesses to establish their digital presence. Designed and developed over 30 websites across various industries, from e-commerce to professional services. Specialized in creating brand identities that translated effectively to digital platforms, helping clients increase their online visibility and customer acquisition.",
      color: "bg-cyan-500 bg-opacity-20 text-cyan-300",
    },
    {
      date: "2017 - 2018",
      title: "Junior Web Designer",
      company: "Digital Marketing Solutions",
      description:
        "Started my career creating website designs and marketing materials for local businesses. Learned the fundamentals of responsive design, user experience, and frontend development. Collaborated with marketing teams to create cohesive campaigns that drove measurable results for clients across multiple digital channels.",
      color: "bg-emerald-500 bg-opacity-20 text-emerald-300",
    },
  ]

  const [email, setEmail] = useState("") // State to capture the input email

  const handleSendClick = () => {
    if (email) {
      const mailtoLink = `mailto:${email}`
      window.location.href = mailtoLink // Open the email client with the user's email
    } else {
      alert("Please enter an email address.")
    }
  }

  const isExpertiseTitleInView = useInView(expertiseTitleRef, { once: true })

  return (
    <div ref={containerRef} className="relative min-h-[500vh] bg-black text-white overflow-hidden">
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
                  delay={index * 0.1}
                />
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Timeline Section */}
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
        <div className="sticky top-[120px] sm:top-[140px] pt-4 pb-3 sm:pt-6 sm:pb-4 bg-black z-20">
          <div className="max-w-4xl mx-auto px-6">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Career Highlights</h3>
            <p className="text-gray-300">
              Scroll down to explore my professional journey through the years. Each stage represents growth, learning,
              and new challenges.
            </p>
          </div>
        </div>

        <PlaygroundTimeline items={timelineItems} titleInView={isTitleAtTop} />
      </section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="relative min-h-screen flex flex-col justify-center px-6 py-20 mt-[20vh]"
        style={{
          y: contactY,
          opacity: contactOpacity,
        }}
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl md:text-5xl font-bold mb-16">GET IN TOUCH</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-xl mb-8">Have a project in mind? Let's chat and make it happen.</p>
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
