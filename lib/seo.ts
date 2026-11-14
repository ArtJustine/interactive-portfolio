import type { Metadata } from "next"

export const SITE_URL = "https://artgonzales.dev"
export const SITE_NAME = "Art Gonzales"
export const DEFAULT_OG_IMAGE = "/images/heroimage.JPG"

export const SOCIAL_LINKS = [
  "https://github.com/ArtJustine",
  "https://www.youtube.com/@Art_Gonzales",
  "https://dribbble.com/artgonzales",
  "https://www.instagram.com/letscodewithart/",
  "https://www.tiktok.com/@codewithart2",
]

export interface SectionPage {
  path: string
  name: string
  title: string
  description: string
}

export const SECTION_PAGES: SectionPage[] = [
  {
    path: "/frontend",
    name: "Web Development",
    title: "Web Development Projects",
    description:
      "Responsive Next.js, React and Shopify websites built by Art Gonzales, from tech news sites and SaaS tools to local business websites.",
  },
  {
    path: "/e-commerce",
    name: "E-Commerce",
    title: "E-Commerce Store Development",
    description:
      "Shopify and WordPress online stores built and optimized for conversions, with Meta, Google Ads and Klaviyo marketing set up.",
  },
  {
    path: "/marketing",
    name: "Digital Marketing",
    title: "Digital Marketing and SEO",
    description:
      "SEO, content marketing, social media and PPC work by Art Gonzales, including local SEO for plumbing and service businesses.",
  },
  {
    path: "/copywriting",
    name: "Copywriting",
    title: "Copywriting and Article Writing",
    description:
      "Video sales letters, startup articles, LinkedIn content, ecommerce copy and blog writing that reads well and ranks.",
  },
  {
    path: "/video-editing",
    name: "Video Editing",
    title: "Video Editing Portfolio",
    description:
      "Video editing, motion graphics and sound design for YouTube, social media and brand videos by Art Gonzales.",
  },
  {
    path: "/design",
    name: "UI/UX Design",
    title: "UI/UX and Graphic Design",
    description:
      "UI/UX design, web mockups and graphic design projects by Art Gonzales, built around clear layouts and usable interfaces.",
  },
]

export function sectionMetadata(page: SectionPage): Metadata {
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: {
      type: "website",
      url: page.path,
      siteName: SITE_NAME,
      title: `${page.title} | ${SITE_NAME}`,
      description: page.description,
      images: [{ url: DEFAULT_OG_IMAGE, width: 2219, height: 1248, alt: `${page.name} by ${SITE_NAME}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.title} | ${SITE_NAME}`,
      description: page.description,
      images: [DEFAULT_OG_IMAGE],
    },
  }
}

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
  jobTitle: "Web Developer, UI/UX Designer and Digital Marketer",
  description:
    "Freelance web developer, UI/UX designer and digital marketer from Pampanga, Philippines, with over a decade of experience in storytelling and blog writing.",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Pampanga",
    addressCountry: "PH",
  },
  knowsAbout: [
    "Web development",
    "Next.js",
    "React",
    "Shopify",
    "UI/UX design",
    "SEO",
    "Digital marketing",
    "Copywriting",
    "Video editing",
  ],
  sameAs: SOCIAL_LINKS,
}

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: "Portfolio of Art Gonzales: web development, e-commerce, digital marketing, copywriting, video editing and UI/UX design.",
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#person` },
}

export function sectionJsonLd(page: SectionPage) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}${page.path}#page`,
        url: `${SITE_URL}${page.path}`,
        name: `${page.title} | ${SITE_NAME}`,
        description: page.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#person` },
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: page.name, item: `${SITE_URL}${page.path}` },
        ],
      },
    ],
  }
}
