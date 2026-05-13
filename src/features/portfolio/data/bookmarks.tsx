import { Icons } from "@/components/icons"

import type { Bookmark } from "../types/bookmarks"

export const BOOKMARKS: Bookmark[] = [
  {
    title: "",
    url: "",
    author: "",
    icon: <Icons.vercel />,
    bookmarkedAt: "",
  },
]

function Circle() {
  return (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="currentColor" />
    </svg>
  )
}
