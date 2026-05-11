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
        <div className="relative h-[244px] rounded-xl bg-muted select-none [&_img]:rounded-xl [&_img]:object-cover">
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

          {course.students && (
            <p className="text-sm text-muted-foreground">
              {course.students} students
            </p>
          )}
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
