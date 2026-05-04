import { CodeXmlIcon, DraftingCompassIcon } from "lucide-react"

import type { Experience } from "../types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "websolutionus",
    companyName: "WebSolutionUS",
    positions: [
      {
        id: "1",
        title: "Senior Software Engineer (Remote)",
        employmentPeriod: {
          start: "2020",
        },
        employmentType: "Full-time",
        icon: <CodeXmlIcon />,
        isExpanded: true,
        description: `- Design and maintain scalable backend systems, lead development teams, and deliver high-performance web applications.
- Architect and develop scalable server-side applications using Laravel, ensuring performance, security, and maintainability.
- Design and implement RESTful APIs for seamless integration with web and mobile platforms.
- Lead and mentor a team of developers, improving code quality through reviews, best practices, and structured workflows.
- Collaborate with cross-functional teams to deliver robust and user-focused solutions.`,
        skills: [
          "Laravel",
          "RESTful APIs",
          "Software Architecture",
          "Team Leadership",
          "Mentoring",
          "JavaScript",
          "MySQL",
        ],
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "lskit",
    companyName: "LSKIT",
    positions: [
      {
        id: "1",
        title: "Senior Software Engineer",
        employmentPeriod: {
          start: "2021",
          end: "2022",
        },
        employmentType: "Freelance",
        icon: <CodeXmlIcon />,
        isExpanded: true,
        description: `- Responsible for developing end-to-end web application features, bridging frontend and backend systems, and delivering scalable solutions across multiple business domains.
- Delivered end-to-end features across e-commerce, ERP, and SaaS platforms, handling both backend (Laravel) and frontend development.
- Developed and consumed RESTful APIs to connect frontend interfaces with backend services and third-party systems.
- Built interactive, responsive user interfaces using modern JavaScript frameworks, improving usability and user experience.
- Translated business requirements into functional features, ensuring seamless integration across the application stack.`,
        skills: [
          "Laravel",
          "RESTful APIs",
          "Team Leadership",
          "Software Architecture",
          "JavaScript",
          "MySQL",
        ],
      },
    ],
  },
  {
    id: "freelance",
    companyName: "Freelance",
    positions: [
      {
        id: "2",
        title: "Full-stack Developer",
        employmentPeriod: {
          start: "2020",
          end: "2021",
        },
        employmentType: "Full-time",
        description: `- Responsible for developing backend features and supporting client projects
        by translating business needs into functional solutions.`,
        icon: <CodeXmlIcon />,
        skills: ["PHP", "Laravel", "Bootstrap", "JavaScript"],
      },
      {
        id: "1",
        title: "Web Designer",
        employmentPeriod: {
          start: "2018",
          end: "2019",
        },
        employmentType: "Part-time",
        description: "Designed logos, posters, ads, and UI.",
        icon: <DraftingCompassIcon />,
        skills: [
          "HTML",
          "CSS",
          "JavaScript",
          "Bootstrap",
          "Sketch",
          "Adobe Photoshop",
          "Adobe Illustrator",
        ],
      },
    ],
  },
]
