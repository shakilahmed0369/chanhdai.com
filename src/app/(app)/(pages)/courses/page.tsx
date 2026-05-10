import type { Metadata } from "next"

import {
  PageHeading,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"
import { CourseList } from "@/features/courses/components/course-list"
import { COURSES } from "@/features/courses/data/courses"

const title = "Courses"
const description = "Courses and workshops I have taught."

const ogImage = `/og/simple?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/courses",
  },
  openGraph: {
    url: "/courses",
    type: "website",
    images: {
      url: ogImage,
      width: 1200,
      height: 630,
      alt: title,
    },
  },
}

export default function CoursesPage() {
  return (
    <div className="min-h-svh">
      <PageHeading>
        <PageHeadingTagline>Courses</PageHeadingTagline>
        <PageHeadingTitle>
          Courses and workshops I have taught.
        </PageHeadingTitle>
      </PageHeading>

      <div className="h-4" />

      <CourseList courses={COURSES} />

      <div className="h-4" />
    </div>
  )
}
