import { USER } from "@/features/portfolio/data/user"
import type { NavItem } from "@/types/nav"

export const SITE_INFO = {
  name: USER.displayName,
  url: process.env.APP_URL || "https://shakilahmed.dev",
  ogImage: USER.ogImage,
  description:
    "Shakil Ahmed is a software engineer from Dhaka, Bangladesh, building scalable web applications with Laravel, PHP, and modern JavaScript. Explore his projects, blog, and experience.",
  keywords: USER.keywords,
}

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}

export const MAIN_NAV: NavItem[] = [
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "Courses",
    href: "/courses",
  },
  {
    title: "Blog",
    href: "/blog",
  },
]

export const MOBILE_NAV: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  ...MAIN_NAV,
]

export const X_HANDLE = "@dev_shakil01"
export const GITHUB_USERNAME = "shakilahmed0369"
export const SOURCE_CODE_GITHUB_REPO = "shakilahmed0369/chanhdai.com"
export const SOURCE_CODE_GITHUB_URL =
  "https://github.com/shakilahmed0369/chanhdai.com"

export const SPONSORSHIP_URL = "https://github.com/sponsors/shakilahmed0369"

export const UTM_PARAMS = {
  utm_source: "shakilahmed.dev",
}
