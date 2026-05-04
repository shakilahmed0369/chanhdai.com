import type { Doc, DocMetadata } from "@/features/doc/types/document"

export type ProjectMetadata = DocMetadata & {
  link: string
  skills: string[]
  periodStart: string
  periodEnd?: string
}

export type ProjectDoc = Omit<Doc, "metadata"> & {
  metadata: ProjectMetadata
}
