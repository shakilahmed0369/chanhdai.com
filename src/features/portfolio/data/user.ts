import type { User } from "@/features/portfolio/types/user"

export const USER: User = {
  firstName: "Shakil",
  lastName: "Ahmed",
  displayName: "Shakil Ahmed",
  username: "shakilahmed",
  gender: "male",
  pronouns: "he/him",
  bio: "Creating with code. Small details matter.",
  flipSentences: [
    "Creating with code. Small details matter.",
    "Software Engineer",
    "Open Source Contributor",
  ],
  address: "Mohammedpur, Dhaka, Bangladesh",
  phoneNumber: "MDE1Njg0OTUwNDU=", // E.164 format, base64 encoded (https://t.io.vn/base64-string-converter)
  email: "c2FraWxob3NzYWluMDE5NjlAZ21haWwuY29t", // base64 encoded
  website: "https://shakilahmed.dev",
  jobTitle: "Software Engineer",
  jobs: [
    {
      title: "Lead Software Engineer",
      company: "WebSolutionUs",
      website: "https://websolutionus.com",
      experienceId: "websolutionus",
    },
    {
      title: "Founder",
      company: "Algovar",
      website: "https://algovar.com",
      experienceId: "algovar",
    },
  ],
  about: `
  - Software Engineer with 5+ years of experience building scalable web applications using Laravel, RESTful APIs, and modern JavaScript frameworks.
  - Strong focus on backend development, with hands-on experience integrating dynamic frontend interfaces.
  - Experienced across the full SDLC, working with legacy systems, and delivering reliable, production-ready solutions.
  `,
  avatar: "https://avatars.githubusercontent.com/u/51516043?v=4",
  ogImage: "/og-image.png",
  namePronunciationUrl: "",
  timeZone: "Asia/Dhaka",
  keywords: [
    "shakilahmed",
    "shakil ahmed",
    "developer shakil",
    "shakilah",
    "developer shakil ahmed",
    "shakil ahmed dev",
    "websolutionus",
    "algovar",
    "best developer in bangladesh",
    "best software engineer in bangladesh",
  ],
  dateCreated: "2023-10-20", // YYYY-MM-DD
}
