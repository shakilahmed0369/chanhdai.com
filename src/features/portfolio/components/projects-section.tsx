import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/base/ui/button"
import { ProjectItem } from "@/features/projects/components/project-item"
import { getAllProjects } from "@/features/projects/data/projects"

import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "./panel"

export function ProjectsSection() {
  const allProjects = getAllProjects()

  return (
    <Panel id="projects">
      <PanelHeader>
        <PanelTitle>
          Projects
          <PanelTitleSup>({allProjects.length})</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      <div className="relative py-4">
        <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
          <div className="border-r border-line"></div>
          <div className="border-l border-line"></div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {allProjects.slice(0, 4).map((project) => (
            <ProjectItem
              key={project.slug}
              project={project}
              imageLoading="lazy"
            />
          ))}
        </div>
      </div>

      <div className="screen-line-top flex justify-center py-2">
        <Button
          className="gap-2 border-none pr-2.5 pl-3"
          size="sm"
          nativeButton={false}
          render={<Link href="/projects" />}
        >
          All Projects
          <ArrowRightIcon />
        </Button>
      </div>
    </Panel>
  )
}
