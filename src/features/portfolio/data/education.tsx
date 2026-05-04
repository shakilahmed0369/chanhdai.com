import { GraduationCapIcon } from "lucide-react"

import type { Experience } from "../types/experiences"

export const EDUCATION: Experience[] = [
  {
    id: "education",
    companyName: "",
    positions: [
      {
        id: "3",
        title:
          "BSc in Computer Science and Engineering — Bangladesh University (BU)",
        employmentPeriod: {
          start: "2023",
          end: "current",
        },
        icon: <GraduationCapIcon />,
        isExpanded: true,
        skills: [
          "Data Structures",
          "Algorithms",
          "OOP",
          "Database Management Systems",
          "Computer Networks",
          "Operating Systems",
          "Software Engineering",
          "Artificial Intelligence",
        ],
      },
      {
        id: "2",
        title:
          "Diploma in Computer Science — Shyamoli Ideal Polytechnic Institute, Dhaka",
        employmentPeriod: {
          start: "07.2018",
          end: "06.2023",
        },
        icon: <GraduationCapIcon />,
        isExpanded: true,
        skills: [
          "Programming Fundamentals",
          "Web Development",
          "Database Management",
          "Networking",
          "Digital Electronics",
          "Mathematics",
        ],
      },
      {
        id: "1",
        title: "HSC — Dhaka Uddan Public School",
        employmentPeriod: {
          start: "2016",
          end: "2017",
        },
        icon: <GraduationCapIcon />,
        description: "2 years",
      },
    ],
  },
]
