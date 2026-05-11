import type { MetadataRoute } from "next"

import { SITE_INFO } from "@/config/site"
import { getAllDocs } from "@/features/doc/data/documents"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = getAllDocs().map((post) => ({
    url: `${SITE_INFO.url}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.updatedAt).toISOString(),
  }))

  const routes = [""].map((route) => ({
    url: `${SITE_INFO.url}${route}`,
    lastModified: new Date().toISOString(),
  }))

  return [...routes, ...posts]
}
