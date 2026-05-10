import { InfinityIcon } from "lucide-react"
import type { ImageProps } from "next/image"
import Image from "next/image"

import type { Course } from "@/features/courses/types/courses"
import { cn } from "@/lib/utils"

export function CourseItem({
  course,
  imageLoading = "lazy",
}: {
  course: Course
  imageLoading?: ImageProps["loading"]
}) {
  const { start, end } = course.period
  const isOngoing = !end
  const isSinglePeriod = end === start

  return (
    <a
      href={course.link}
      target="_blank"
      rel="noopener"
      className={cn(
        "group flex flex-col gap-2 p-2 transition-[background-color] ease-out hover:bg-accent-muted",
        "max-sm:screen-line-top max-sm:screen-line-bottom",
        "sm:nth-[2n+1]:screen-line-top sm:nth-[2n+1]:screen-line-bottom"
      )}
    >
      {course.image && (
        <div className="relative h-[244px] rounded-xl bg-muted select-none [&_img]:rounded-xl [&_img]:object-contain">
          <Image
            src={course.image}
            alt={course.title}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            loading={imageLoading}
            unoptimized
          />

          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/10 ring-inset dark:ring-white/10" />
        </div>
      )}

      <div className="flex flex-col gap-1 p-2">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{course.platform}</p>

          <dl>
            <dt className="sr-only">Period</dt>
            <dd className="flex items-center gap-0.5 text-sm text-muted-foreground">
              <span>{start}</span>
              {!isSinglePeriod && (
                <>
                  <span className="font-mono">&mdash;</span>
                  {isOngoing ? (
                    <InfinityIcon
                      className="size-4.5 translate-y-[0.5px]"
                      aria-label="Present"
                    />
                  ) : (
                    <span>{end}</span>
                  )}
                </>
              )}
            </dd>
          </dl>
        </div>

        <h3 className="text-lg leading-snug font-medium text-balance">
          {course.title}
        </h3>

        {course.description && (
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {course.description}
          </p>
        )}
      </div>
    </a>
  )
}
