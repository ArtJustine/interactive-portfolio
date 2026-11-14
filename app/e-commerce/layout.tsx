import type React from "react"
import JsonLd from "@/components/json-ld"
import { SECTION_PAGES, sectionJsonLd, sectionMetadata } from "@/lib/seo"

const page = SECTION_PAGES.find((p) => p.path === "/e-commerce")!

export const metadata = sectionMetadata(page)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={sectionJsonLd(page)} />
      {children}
    </>
  )
}
