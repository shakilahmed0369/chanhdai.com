import { format } from "date-fns"
import Image from "next/image"
import Link from "next/link"

import type { Doc } from "@/features/doc/types/document"
import { cn } from "@/lib/utils"

export function PostList({ posts }: { posts: Doc[] }) {
  return (
    <div className="pt-4">
      {posts.map((post, index) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className={cn(
            "flex items-center gap-4 px-4 py-3 transition-[background-color] ease-out hover:bg-accent-muted",
            index > 0 && "screen-line-top"
          )}
        >
          {post.metadata.image && (
            <div className="relative shrink-0 overflow-hidden rounded-lg select-none [&_img]:size-20 [&_img]:object-cover [&_img]:md:size-28">
              <Image
                src={post.metadata.image}
                alt={post.metadata.title}
                width={112}
                height={63}
                quality={80}
                loading={index <= 3 ? "eager" : "lazy"}
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

      {posts.length === 0 && (
        <div className="p-4">
          <p className="font-mono text-sm">No posts found.</p>
        </div>
      )}
    </div>
  )
}
