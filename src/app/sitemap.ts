import type { MetadataRoute } from "next"

import { SITE_INFO } from "@/config/site"
import { getAllDocs } from "@/features/doc/data/documents"
import { getAllProjects } from "@/features/projects/data/projects"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date()

  const routes: MetadataRoute.Sitemap = [
    {
      url: SITE_INFO.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_INFO.url}/projects`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_INFO.url}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_INFO.url}/courses`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ]

  const posts: MetadataRoute.Sitemap = getAllDocs()
    .filter((doc) => doc.metadata.category !== "projects")
    .map((doc) => ({
      url: `${SITE_INFO.url}${doc.metadata.category === "components" ? "/components" : "/blog"}/${doc.slug}`,
      lastModified: new Date(doc.metadata.updatedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    }))

  const projects: MetadataRoute.Sitemap = getAllProjects().map((project) => ({
    url: `${SITE_INFO.url}/projects/${project.slug}`,
    lastModified: new Date(project.metadata.updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [...routes, ...posts, ...projects]
}
