import { ArrowLeftIcon } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { CreativeWork, WithContext } from "schema-dts"

import { Button } from "@/components/ui/button"
import { SITE_INFO, X_HANDLE } from "@/config/site"
import {
  DocContainer,
  DocContentCol,
  DocGrid,
  DocLeftCol,
  DocRightCol,
} from "@/features/doc/components/doc-layout"
import { DocPageRoot } from "@/features/doc/components/doc-page-root"
import { ProjectDetail } from "@/features/projects/components/project-detail"
import {
  getAllProjects,
  getProjectBySlug,
} from "@/features/projects/data/projects"
import type { ProjectDoc } from "@/features/projects/types/projects"
import { getPersonSchema, toAbsoluteUrl } from "@/lib/seo"
import { cn } from "@/lib/utils"

export const revalidate = false
export const dynamic = "force-static"
export const dynamicParams = false

export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const slug = (await params).slug
  const project = getProjectBySlug(slug)

  if (!project) {
    return notFound()
  }

  const { title, description, skills } = project.metadata

  const ogImage = getOgImage(project)

  return {
    title,
    description,
    keywords: skills,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      url: `/projects/${slug}`,
      type: "article",
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
}

function getOgImage(project: ProjectDoc) {
  return (
    project.metadata.image ||
    `/og/simple?title=${encodeURIComponent(project.metadata.title)}&description=${encodeURIComponent(project.metadata.description)}`
  )
}

function getPageJsonLd(project: ProjectDoc): WithContext<CreativeWork> {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.metadata.title,
    description: project.metadata.description,
    image: toAbsoluteUrl(getOgImage(project)),
    url: `${SITE_INFO.url}/projects/${project.slug}`,
    dateCreated: new Date(project.metadata.createdAt).toISOString(),
    dateModified: new Date(project.metadata.updatedAt).toISOString(),
    inLanguage: "en",
    author: getPersonSchema(),
    keywords: project.metadata.skills.join(", "),
  }
}

export default async function Page({ params }: PageProps<"/projects/[slug]">) {
  const slug = (await params).slug
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd(project)).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      <DocPageRoot>
        <DocContainer>
          <div className="screen-line-bottom h-px" />

          <div className="flex items-center justify-between p-2 pl-4">
            <Button
              className="h-7 gap-2 border-none px-0 text-muted-foreground hover:text-foreground hover:no-underline"
              variant="link"
              size="sm"
              asChild
            >
              <Link href="/projects">
                <ArrowLeftIcon />
                Projects
              </Link>
            </Button>
          </div>

          <div className="screen-line-top screen-line-bottom">
            <div
              className={cn(
                "h-8",
                "before:absolute before:left-[-100vw] before:-z-1 before:h-full before:w-[200vw]",
                "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-line)]/56"
              )}
            />
          </div>
        </DocContainer>

        <DocGrid>
          <DocLeftCol />

          <DocContentCol>
            <ProjectDetail project={project} />

            <div className="screen-line-top h-4" />
          </DocContentCol>

          <DocRightCol />
        </DocGrid>
      </DocPageRoot>
    </>
  )
}
