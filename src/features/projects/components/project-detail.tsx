import { InfinityIcon, LinkIcon } from "lucide-react"
import Image from "next/image"

import { MDX } from "@/components/mdx"
import { Button } from "@/components/ui/button"
import { Tag } from "@/components/ui/tag"
import { Prose } from "@/components/ui/typography"
import { UTM_PARAMS } from "@/config/site"
import type { ProjectDoc } from "@/features/projects/types/projects"
import { addQueryParams } from "@/utils/url"

export function ProjectDetail({ project }: { project: ProjectDoc }) {
  const { periodStart, periodEnd, link, skills } = project.metadata
  const isOngoing = !periodEnd
  const isSinglePeriod = periodEnd === periodStart

  return (
    <div className="border-x border-line">
      <div className="screen-line-bottom flex items-center gap-3 p-4">
        {project.metadata.image && (
          <Image
            src={project.metadata.image}
            alt={project.metadata.title}
            width={48}
            height={48}
            quality={100}
            className="size-12 shrink-0 rounded-xl select-none"
            unoptimized
          />
        )}

        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            {project.metadata.title}
          </h1>

          <dl className="text-sm text-muted-foreground">
            <dt className="sr-only">Period</dt>
            <dd className="flex items-center gap-0.5">
              <span>{periodStart}</span>
              {!isSinglePeriod && (
                <>
                  <span className="font-mono">&mdash;</span>
                  {isOngoing ? (
                    <InfinityIcon
                      className="size-4.5 translate-y-[0.5px]"
                      aria-label="Present"
                    />
                  ) : (
                    <span>{periodEnd}</span>
                  )}
                </>
              )}
            </dd>
          </dl>
        </div>

        <Button variant="secondary" size="sm" asChild>
          <a
            href={addQueryParams(link, UTM_PARAMS)}
            target="_blank"
            rel="noopener"
          >
            <LinkIcon />
            Visit
          </a>
        </Button>
      </div>

      <Prose className="px-4 pt-8">
        <MDX code={project.content} />
      </Prose>

      {skills.length > 0 && (
        <div className="screen-line-top flex flex-wrap gap-1.5 p-4">
          {skills.map((skill) => (
            <Tag key={skill}>{skill}</Tag>
          ))}
        </div>
      )}
    </div>
  )
}
