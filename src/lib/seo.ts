import type { Person } from "schema-dts"

import { SITE_INFO } from "@/config/site"
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links"
import { USER } from "@/features/portfolio/data/user"

export type PersonSchema = Exclude<Person, string>

export const PERSON_SCHEMA_ID = `${SITE_INFO.url}/#person`

export function getPersonSchema(): PersonSchema {
  return {
    "@type": "Person",
    "@id": PERSON_SCHEMA_ID,
    name: USER.displayName,
    alternateName: ["shakilahmed", "shakil ahmed developer"],
    url: SITE_INFO.url,
    image: toAbsoluteUrl(USER.avatar),
    jobTitle: USER.jobTitle,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "Bangladesh",
    },
    sameAs: SOCIAL_LINKS.map((link) => link.href),
    worksFor: USER.jobs.map((job) => ({
      "@type": "Organization" as const,
      name: job.company,
      url: job.website,
    })),
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Bangladesh University",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "Shyamoli Ideal Polytechnic Institute",
      },
    ],
    knowsAbout: [
      "Laravel",
      "PHP",
      "JavaScript",
      "React",
      "MySQL",
      "REST API",
      "Web Development",
      "Software Engineering",
    ],
  }
}

export function toAbsoluteUrl(url: string): string {
  return new URL(url, SITE_INFO.url).toString()
}
