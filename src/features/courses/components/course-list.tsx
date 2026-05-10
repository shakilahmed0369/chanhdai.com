import type { Course } from "@/features/courses/types/courses"

import { CourseItem } from "./course-item"

export function CourseList({ courses }: { courses: Course[] }) {
  return (
    <div className="relative pt-4">
      <div className="absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
        <div className="border-r border-line" />
        <div className="border-l border-line" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {courses.map((course, index) => (
          <CourseItem
            key={course.id}
            course={course}
            imageLoading={index <= 3 ? "eager" : "lazy"}
          />
        ))}

        {courses.length === 0 && (
          <div className="screen-line-top screen-line-bottom p-4">
            <p className="font-mono text-sm">No courses found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
