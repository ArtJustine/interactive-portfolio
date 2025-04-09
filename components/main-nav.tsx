"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Youtube, Github, Instagram, Dribbble } from 'lucide-react'
import { Button } from "@/components/ui/button"
import CircularTextButton from "@/components/circular-text-button"

export default function MainNav() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 },
  }

  const navItems = [
    { name: "Home", href: "/", className: "hidden md:block" },
    { name: "UI/UX Design", href: "/design" },
    { name: "Web Development", href: "/frontend" } /*
    { name: "Video Editing", href: "/video-editing" },
    { name: "Digital Marketing", href: "/marketing" },*/,
    { name: "Contact", href: "/#contact" },
  ]

  const socialLinks = [
    { name: "YouTube", href: "https://www.youtube.com/@Art_Gonzales", icon: <Youtube className="h-5 w-5" /> },
    { name: "Dribbble", href: "https://dribbble.com/artgonzales", icon: <Dribbble className="h-5 w-5" /> },
    { name: "GitHub", href: "https://github.com/ArtJustine", icon: <Github className="h-5 w-5" /> },
    { name: "Instagram", href: "https://www.instagram.com/letscodewithart/", icon: <Instagram className="h-5 w-5" /> },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center">
        <div className="z-50">
          <CircularTextButton
            text="ART GONZALES  • ART GONZALES •"
            imageSrc="/images/logo.png"
            imageAlt="Art Gonzales"
            href="/"
            imageSize={80}
            textSize="text-xs"
            textColor="text-white"
            textOpacity={0.8}
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-white z-50 ml-auto"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-40 flex flex-col justify-center overflow-hidden mt-16 md:mt-0"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center h-full">
              <motion.nav className="flex flex-col space-y-8 py-8 md:py-0" variants={itemVariants}>
                <ul className="space-y-6">
                  {navItems.map((item) => (
                    <motion.li key={item.name} variants={itemVariants}>
                      <Link
                        href={item.href}
                        className={`text-3xl md:text-4xl font-bold text-white transition-transform duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-purple-400 hover:via-pink-500 hover:to-red-500 hover:bg-clip-text hover:text-transparent ${item.className}`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.nav>

              <motion.div className="flex flex-col space-y-8 py-8 md:py-0" variants={itemVariants}>
                <h2 className="text-xl text-gray-400 font-medium mb-4">Connect</h2>
                <ul className="space-y-6">
                  {socialLinks.map((link) => (
                    <motion.li key={link.name} variants={itemVariants}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 text-xl md:text-2xl font-medium hover:text-white transition-colors duration-300"
                      >
                        {link.icon}
                        <span>{link.name}</span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
