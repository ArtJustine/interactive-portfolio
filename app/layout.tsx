import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
// Import ThemeProvider only if it's properly set up
// import { ThemeProvider } from "@/components/theme-provider"
import MainNav from "@/components/main-nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Art Gonzales",
  description:
    "A creative portfolio showcasing video editing, front-end development, UI/UX design, digital marketing, and copywriting skills",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {/* Wrap with ThemeProvider only if it's properly set up */}
        {/* <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange> */}
        <MainNav />
        {children}
        {/* </ThemeProvider> */}
      </body>
    </html>
  )
}

