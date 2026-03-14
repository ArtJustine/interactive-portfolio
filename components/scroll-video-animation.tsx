"use client"

import { useEffect, useRef, useState } from "react"
import { motion, MotionValue, useScroll, useTransform, useSpring } from "framer-motion"


interface ScrollVideoAnimationProps {
  frameCount: number
  baseUrl: string
  targetRef?: React.RefObject<HTMLElement>
  range?: [string, string]
  progress?: MotionValue<number>
}

export default function ScrollVideoAnimation({ 
  frameCount, 
  baseUrl, 
  targetRef, 
  range = ["start start", "end end"],
  progress 
}: ScrollVideoAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const images = useRef<HTMLImageElement[]>([])
  const [imagesLoaded, setImagesLoaded] = useState(false)

  const { scrollYProgress } = useScroll(targetRef?.current ? {
    target: targetRef,
    offset: range as any,
  } : {
    offset: range as any,
  })

  const activeProgress = progress || scrollYProgress


  // Use spring for smooth index transitions
  const smoothProgress = useSpring(activeProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const imageIndex = useTransform(smoothProgress, [0, 1], [1, frameCount])
  
  // also control opacity based on progress to fade in/out
  const opacity = useTransform(smoothProgress, [0, 0.05, 0.9, 1], [0, 0.8, 0.8, 0])



  // Preload images
  useEffect(() => {
    let loadedCount = 0
    const preloadImages = () => {
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image()
        img.src = `${baseUrl}/ezgif-frame-${i.toString().padStart(3, "0")}.jpg`
        img.onload = () => {
          loadedCount++
          if (loadedCount === frameCount) {
            setImagesLoaded(true)
          }
        }
        images.current[i] = img
      }
    }

    preloadImages()
  }, [frameCount, baseUrl])

  // Draw function
  const renderCanvas = (index: number) => {
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    const img = images.current[Math.round(index)]

    if (canvas && context && img) {
      const dpr = window.devicePixelRatio || 1
      const displayWidth = window.innerWidth
      const displayHeight = window.innerHeight
      
      // Set the canvas internal resolution
      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr
        canvas.height = displayHeight * dpr
        // Ensure the CSS size stays correct
        canvas.style.width = `${displayWidth}px`
        canvas.style.height = `${displayHeight}px`
      }

      // Calculate the image scale and position for "cover"
      const imgRatio = img.width / img.height
      const canvasRatio = canvas.width / canvas.height
      
      let drawWidth, drawHeight, x, y

      if (imgRatio > canvasRatio) {
        // Image is wider than canvas
        drawHeight = canvas.height
        drawWidth = canvas.height * imgRatio
        x = (canvas.width - drawWidth) / 2
        y = 0
      } else {
        // Image is taller than canvas
        drawWidth = canvas.width
        drawHeight = canvas.width / imgRatio
        x = 0
        y = (canvas.height - drawHeight) / 2
      }
      
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.imageSmoothingEnabled = true
      context.imageSmoothingQuality = "high"
      context.drawImage(img, x, y, drawWidth, drawHeight)
    }
  }

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      renderCanvas(imageIndex.get())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [imageIndex])

  // Listen for transform changes
  useEffect(() => {
    if (!imagesLoaded) return

    const unsubscribe = imageIndex.on("change", (latest) => {
      renderCanvas(latest)
    })
    
    // Initial draw
    renderCanvas(imageIndex.get())
    
    return () => unsubscribe()
  }, [imagesLoaded, imageIndex])

  return (
    <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none overflow-hidden bg-black">
      <motion.canvas
        ref={canvasRef}
        style={{ 
          opacity: imagesLoaded ? opacity : 0,
          position: "fixed",
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%"
        }}
        className="block"
      />
      {/* Cinematic Overlays */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-60 pointer-events-none z-10" />
    </div>
  )
}




