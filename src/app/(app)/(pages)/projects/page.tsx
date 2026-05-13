import type { Metadata } from "next"

import {
  PageHeading,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"
import { X_HANDLE } from "@/config/site"
import { ProjectList } from "@/features/projects/components/project-list"
import { getAllProjects } from "@/features/projects/data/projects"

const title = "Projects"
const description = "Open source, side projects, and everything I have built."

const ogImage = `/og/simple?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    url: "/projects",
    type: "website",
    images: {
      url: ogImage,
      width: 1200,
      height: 630,
      alt: title,
    },
  },
  twitter: {
    card: "summary_large_image",
    site: X_HANDLE,
    creator: X_HANDLE,
    images: [ogImage],
  },
}

export default function Page() {
  const allProjects = getAllProjects()

  return (
    <div className="min-h-svh">
      <PageHeading>
        <PageHeadingTagline>Projects</PageHeadingTagline>
        <PageHeadingTitle>
          Open source, side projects, and everything I have built.
        </PageHeadingTitle>
      </PageHeading>

      <div className="h-4" />

      <ProjectList projects={allProjects} />

      <div className="h-4" />
    </div>
  )
}
