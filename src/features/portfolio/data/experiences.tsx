import { CodeXmlIcon, DraftingCompassIcon } from "lucide-react"

import type { Experience } from "../types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "websolutionus",
    companyName: "WebSolutionUS",
    positions: [
      {
        id: "2",
        title: "Senior Software Engineer (Remote)",
        employmentPeriod: {
          start: "2023",
          end: "current",
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
          "Docker",
          "AWS",
          "CI/CD",
        ],
      },
      {
        id: "1",
        title: "Software Engineer (Remote)",
        employmentPeriod: {
          start: "2022",
          end: "2023",
        },
        employmentType: "Full-time",
        icon: <CodeXmlIcon />,
        isExpanded: true,
        description: `- Built and maintained backend features using Laravel and PHP.
- Created RESTful APIs for internal and external client integrations.
- Wrote clean, maintainable code and participated in peer code reviews.
- Assisted in debugging and resolving production issues.
- Worked closely with senior developers to implement new features.`,
        skills: [
          "Laravel",
          "PHP",
          "RESTful APIs",
          "JavaScript",
          "MySQL",
          "Git",
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
        title: "Full Stack Developer",
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
          start: "2019",
          end: "2022",
        },
        employmentType: "Freelance",
        description: `- Delivered custom web solutions for clients across Fiverr, Upwork, and direct local clients.
- Built diverse projects including e-commerce platforms, business websites, CMS systems, and RESTful API services.
- Gained hands-on experience with various technologies by adapting to different project requirements.
- Managed client communication, understood requirements, and delivered projects on time.
- Developed strong problem-solving skills by handling end-to-end development independently.`,
        icon: <CodeXmlIcon />,
        skills: [
          "PHP",
          "Laravel",
          "WordPress",
          "Bootstrap",
          "JavaScript",
          "MySQL",
          "HTML",
          "CSS",
        ],
      },
      {
        id: "1",
        title: "Web Designer",
        employmentPeriod: {
          start: "2018",
          end: "2019",
        },
        employmentType: "Part-time",
        description: `- Created logos, posters, banners, and social media advertisements for local businesses and individuals.
- Designed user interfaces for web pages and mobile apps.
- Worked with clients to understand their brand identity and translate it into visual designs.
- Used design tools to produce high-quality print and digital assets.
- Gained foundational knowledge of UI/UX principles and responsive design.`,
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
