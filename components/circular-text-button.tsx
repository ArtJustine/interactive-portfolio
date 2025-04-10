"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface CircularTextButtonProps {
  text: string
  imageSrc: string
  imageAlt: string
  href: string
  className?: string
  imageSize?: number
  textSize?: string
  textColor?: string
  rotationDuration?: number
  textOpacity?: number
}

export default function CircularTextButton({
  text,
  imageSrc,
  imageAlt,
  href,
  className,
  imageSize = 64,
  textSize = "text-xs",
  textColor = "text-white",
  rotationDuration = 15,
  textOpacity = 0.8,
}: CircularTextButtonProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    // Add resize listener
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (!isMounted) return null

  // Adjust sizes for mobile - make even smaller (60% of original)
  const mobileImageSize = isMobile ? Math.floor(imageSize * 0.6) : imageSize
  const mobileTextSize = isMobile ? "text-[10px]" : textSize
  const paddingSize = isMobile ? 20 : 30

  return (
    <Link href={href} className={cn("relative block hover-spin-reverse", className)}>
      <div
        className="relative flex items-center justify-center"
        style={{
          width: `${mobileImageSize + paddingSize}px`,
          height: `${mobileImageSize + paddingSize}px`,
        }}
      >
        {/* Rotating ring with text */}
        <div
          className={`absolute inset-0 rounded-full circular-text-container flex items-center justify-center`}
          style={{
            width: `${mobileImageSize + paddingSize}px`,
            height: `${mobileImageSize + paddingSize}px`,
            opacity: textOpacity,
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
            </defs>
            <text fill="white" className={`${mobileTextSize} font-medium`}>
              <textPath xlinkHref="#circle" startOffset="0%" className="tracking-wider fill-white">
                {text}
              </textPath>
            </text>
          </svg>
        </div>

        {/* Image */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden z-10 transition-transform duration-300 hover:scale-95">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={imageAlt}
            width={mobileImageSize}
            height={mobileImageSize}
            className="rounded-full object-cover"
          />
        </div>
      </div>
    </Link>
  )
}
