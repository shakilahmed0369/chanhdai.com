import { format } from "date-fns"
import { ArrowRightIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/base/ui/button"
import { getAllDocs } from "@/features/doc/data/documents"

import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "./panel"

export function Blog() {
  const allPosts = getAllDocs().filter(
    (doc) => doc.metadata.category !== "projects"
  )

  return (
    <Panel id="blog">
      <PanelHeader>
        <PanelTitle>
          Blog
          <PanelTitleSup>({allPosts.length})</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      <div className="py-2">
        {allPosts.slice(0, 6).map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="screen-line-bottom flex items-center gap-4 px-4 py-3 transition-[background-color] ease-out hover:bg-accent-muted"
          >
            {post.metadata.image && (
              <div className="relative shrink-0 overflow-hidden rounded-lg select-none [&_img]:h-[70px] [&_img]:w-auto [&_img]:object-cover">
                <Image
                  src={post.metadata.image}
                  alt={post.metadata.title}
                  width={112}
                  height={63}
                  quality={80}
                  loading="lazy"
                  unoptimized
                />
              </div>
            )}

            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="line-clamp-2 leading-snug font-medium">
                {post.metadata.title}
                {post.metadata.new && (
                  <span
                    className="ml-2 inline-block size-2 -translate-y-px rounded-full bg-info"
                    aria-label="New"
                  />
                )}
              </span>

              <time
                dateTime={new Date(post.metadata.createdAt).toISOString()}
                className="text-sm text-muted-foreground"
              >
                {format(new Date(post.metadata.createdAt), "dd.MM.yyyy")}
              </time>
            </div>
          </Link>
        ))}
      </div>

      <div className="screen-line-top flex justify-center py-2">
        <Button
          className="gap-2 border-none pr-2.5 pl-3"
          size="sm"
          nativeButton={false}
          render={<Link href="/blog" />}
        >
          All Posts
          <ArrowRightIcon />
        </Button>
      </div>
    </Panel>
  )
}
