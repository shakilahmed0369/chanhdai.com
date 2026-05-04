import fs from "fs"
import matter from "gray-matter"
import path from "path"
import { cache } from "react"

import type { ProjectDoc, ProjectMetadata } from "../types/projects"

function parseFrontmatter(fileContent: string) {
  const file = matter(fileContent)

  return {
    metadata: file.data as unknown as ProjectMetadata,
    content: file.content,
  }
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx")
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8")
  return parseFrontmatter(rawContent)
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir)

  return mdxFiles.map<ProjectDoc>((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file))

    const slug = path.basename(file, path.extname(file))

    return {
      metadata: {
        ...metadata,
        skills:
          typeof metadata.skills === "string"
            ? (metadata.skills as string).split(",").map((s) => s.trim())
            : metadata.skills || [],
      },
      slug,
      content,
    }
  })
}

export const getAllProjects = cache(() => {
  return getMDXData(
    path.join(process.cwd(), "src/features/doc/content/projects")
  ).sort((a, b) => {
    if (a.metadata.pinned && !b.metadata.pinned) return -1
    if (!a.metadata.pinned && b.metadata.pinned) return 1

    return (
      new Date(b.metadata.createdAt).getTime() -
      new Date(a.metadata.createdAt).getTime()
    )
  })
})

export function getProjectBySlug(slug: string) {
  return getAllProjects().find((project) => project.slug === slug)
}

export function findNeighbour(docs: ProjectDoc[], slug: string) {
  const len = docs.length

  for (let i = 0; i < len; ++i) {
    if (docs[i].slug === slug) {
      return {
        previous: i > 0 ? docs[i - 1] : null,
        next: i < len - 1 ? docs[i + 1] : null,
      }
    }
  }

  return { previous: null, next: null }
}
