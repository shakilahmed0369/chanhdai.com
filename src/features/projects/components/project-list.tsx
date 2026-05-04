import type { ProjectDoc } from "@/features/projects/types/projects"

import { ProjectItem } from "./project-item"

export function ProjectList({ projects }: { projects: ProjectDoc[] }) {
  return (
    <div className="relative pt-4">
      <div className="absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
        <div className="border-r border-line" />
        <div className="border-l border-line" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectItem
            key={project.slug}
            project={project}
            imageLoading={index <= 3 ? "eager" : "lazy"}
          />
        ))}

        {projects.length === 0 && (
          <div className="screen-line-top screen-line-bottom p-4">
            <p className="font-mono text-sm">No projects found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
