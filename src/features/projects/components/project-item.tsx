import { format } from "date-fns"
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
        <div className="relative rounded-xl bg-muted select-none [&_img]:aspect-1200/630 [&_img]:rounded-xl [&_img]:object-contain">
          <Image
            src={project.metadata.image}
            alt={project.metadata.title}
            width={1200}
            height={630}
            quality={100}
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
          <dt className="sr-only">Created on</dt>
          <dd className="text-sm text-muted-foreground">
            <time dateTime={new Date(project.metadata.createdAt).toISOString()}>
              {format(new Date(project.metadata.createdAt), "dd.MM.yyyy")}
            </time>
          </dd>
        </dl>
      </div>
    </Link>
  )
}
