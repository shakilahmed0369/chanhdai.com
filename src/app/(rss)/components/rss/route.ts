import { SITE_INFO } from "@/config/site"
import { getDocsByCategory } from "@/features/doc/data/documents"

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export const revalidate = false
export const dynamic = "force-static"

export function GET() {
  const allPosts = getDocsByCategory("components")

  const itemsXml = allPosts
    .map(
      (post) =>
        `<item>
          <title>${escapeXml(post.metadata.title)}</title>
          <link>${SITE_INFO.url}/components/${post.slug}</link>
          <description>${escapeXml(post.metadata.description || "")}</description>
          <pubDate>${new Date(post.metadata.createdAt).toISOString()}</pubDate>
        </item>`
    )
    .join("\n")

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>${escapeXml(`Components | ${SITE_INFO.name}`)}</title>
      <link>${SITE_INFO.url}</link>
      <description>${escapeXml("A collection of reusable components.")}</description>
      ${itemsXml}
    </channel>
  </rss>`

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "text/xml",
    },
  })
}
