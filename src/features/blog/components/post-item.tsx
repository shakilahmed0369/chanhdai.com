import { format } from "date-fns"
import type { ImageProps } from "next/image"
import Image from "next/image"
import Link from "next/link"

import type { Doc } from "@/features/doc/types/document"
import { cn } from "@/lib/utils"

export function PostItem({
  post,
  imageLoading = "lazy",
}: {
  post: Doc
  imageLoading?: ImageProps["loading"]
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex flex-col gap-2 p-2 transition-[background-color] ease-out hover:bg-accent-muted",
        "max-sm:screen-line-top max-sm:screen-line-bottom",
        "sm:nth-[2n+1]:screen-line-top sm:nth-[2n+1]:screen-line-bottom"
      )}
    >
      {post.metadata.image && (
        <div className="relative h-[70px] w-[124px] shrink-0 overflow-hidden rounded-lg bg-muted select-none [&_img]:h-full [&_img]:w-full [&_img]:object-cover">
          <Image
            src={post.metadata.image}
            alt={post.metadata.title}
            width={124}
            height={70}
            quality={100}
            loading={imageLoading}
            unoptimized
          />

          <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-black/10 ring-inset dark:ring-white/10" />
        </div>
      )}

      <div className="flex flex-col gap-1 p-2">
        <h3 className="text-lg leading-snug font-medium text-balance">
          {post.metadata.title}
          {post.metadata.new && (
            <span
              className="ml-2 inline-block size-2 -translate-y-px rounded-full bg-info"
              aria-label="New"
            />
          )}
        </h3>

        <dl>
          <dt className="sr-only">Published on</dt>
          <dd className="text-sm text-muted-foreground">
            <time dateTime={new Date(post.metadata.createdAt).toISOString()}>
              {format(new Date(post.metadata.createdAt), "dd.MM.yyyy")}
            </time>
          </dd>
        </dl>
      </div>
    </Link>
  )
}
