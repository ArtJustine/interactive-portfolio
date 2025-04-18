"use client"

import { motion } from "framer-motion"
import ProjectCard from "@/components/project-card"
import VideoPlayer from "./video-player"

export interface Project {
  id: number
  title: string
  description: string
  image: string
  category: string
  externalUrl: string
}

interface ProjectsGridProps {
  projects: Project[]
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              category={project.category}
              index={index}
              externalUrl={project.externalUrl}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

