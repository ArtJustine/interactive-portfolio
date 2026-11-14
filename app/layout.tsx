import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
// Import ThemeProvider only if it's properly set up
// import { ThemeProvider } from "@/components/theme-provider"
import MainNav from "@/components/main-nav"
import JsonLd from "@/components/json-ld"
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, personJsonLd, websiteJsonLd } from "@/lib/seo"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Art Gonzales | Web Developer, Digital Marketer & UI/UX Designer",
    template: "%s | Art Gonzales",
  },
  description:
    "Art Gonzales is a freelance web developer, UI/UX designer and digital marketer from the Philippines. See projects in web development, e-commerce, SEO, copywriting and video editing.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  keywords: [
    "Art Gonzales",
    "freelance web developer",
    "Next.js developer",
    "Shopify developer",
    "UI/UX designer",
    "SEO specialist",
    "digital marketer",
    "copywriter",
    "video editor",
    "Philippines",
  ],
  alternates: { canonical: "/" },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Art Gonzales | Web Developer, Digital Marketer & UI/UX Designer",
    description:
      "Freelance web developer, UI/UX designer and digital marketer. Browse projects in web development, e-commerce, SEO, copywriting and video editing.",
    images: [{ url: DEFAULT_OG_IMAGE, width: 2219, height: 1248, alt: "Art Gonzales portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Art Gonzales | Web Developer, Digital Marketer & UI/UX Designer",
    description:
      "Freelance web developer, UI/UX designer and digital marketer. Browse projects in web development, e-commerce, SEO, copywriting and video editing.",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
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
        <JsonLd data={personJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <MainNav />
        {children}
        {/* </ThemeProvider> */}
      </body>
    </html>
  )
}

