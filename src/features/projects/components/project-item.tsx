import { InfinityIcon } from "lucide-react"
import type { ImageProps } from "next/image"
import Image from "next/image"
import Link from "next/link"

import type { ProjectDoc } from "@/features/projects/types/projects"
import { cn } from "@/lib/utils"

export function ProjectItem({
  project,
  imageLoading = "lazy",
}: {
  project: ProjectDoc
  imageLoading?: ImageProps["loading"]
}) {
  const { periodStart, periodEnd } = project.metadata
  const isOngoing = !periodEnd
  const isSinglePeriod = periodEnd === periodStart

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group flex flex-col gap-2 p-2 transition-[background-color] ease-out hover:bg-accent-muted",
        "max-sm:screen-line-top max-sm:screen-line-bottom",
        "sm:nth-[2n+1]:screen-line-top sm:nth-[2n+1]:screen-line-bottom"
      )}
    >
      {project.metadata.image && (
        <div className="relative h-[244px] rounded-xl bg-muted select-none [&_img]:rounded-xl [&_img]:object-contain">
          <Image
            src={project.metadata.image}
            alt={project.metadata.title}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            loading={imageLoading}
            unoptimized
          />

          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/10 ring-inset dark:ring-white/10" />
        </div>
      )}

      <div className="flex flex-col gap-1 p-2">
        <h3 className="text-lg leading-snug font-medium text-balance">
          {project.metadata.title}
          {project.metadata.new && (
            <span
              className="ml-2 inline-block size-2 -translate-y-px rounded-full bg-info"
              aria-label="New"
            />
          )}
        </h3>

        <dl>
          <dt className="sr-only">Period</dt>
          <dd className="flex items-center gap-0.5 text-sm text-muted-foreground">
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
    </Link>
  )
}
