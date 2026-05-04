import { GraduationCapIcon } from "lucide-react"

import type { Experience } from "../types/experiences"

export const EDUCATION: Experience[] = [
  {
    id: "education",
    companyName: "Education",
    positions: [
      {
        id: "3",
        title: "University of Science — VNUHCM",
        employmentPeriod: {
          start: "08.2018",
          end: "10.2026",
        },
        icon: <GraduationCapIcon />,
        description: `- Currently studying for a Bachelor's degree in Information Systems.
- Language Proficiency: B1 level in English (CEFR).
- Achieved several awards, including:
  - Bronze Medal — 10th Design, Manufacturing, and Application Award 2022
  - 2nd Prize — Business Startup Competition 2019`,
        skills: [
          "C++",
          "Java",
          "Python",
          "PHP",
          "DSA",
          "Advanced Databases",
          "Systems Design",
          "Distributed Systems",
          "Software Engineering",
          "Teamwork",
        ],
      },
      {
        id: "2",
        title: "Ly Tu Trong High School for the Gifted — Can Tho City",
        employmentPeriod: {
          start: "08.2015",
          end: "06.2018",
        },
        icon: <GraduationCapIcon />,
        description: `- Student of the Specialized Computer Science Program.
- Granted direct admission to university due to achieving 3rd Prize at the national level.
- [Achieved numerous awards](https://baocantho.com.vn/nguyen-chanh-dai-17-tuoi-va-19-giai-thuong-a97348.html) at city and national levels, including:
  - [3rd Prize](https://muctim.tuoitre.vn/cong-cu-ho-tro-viec-day-va-hoc-55107.htm) — National Science and Engineering Fair 2018 (ViSEF)
  - 1st Prize — Can Tho City Science and Engineering Fair 2018
  - Creativity Award — Binh Duong Hackathon 2017
  - Consolation Prize — National Youth and Children's Creativity Contest 2016
  - [1st Prize](https://www.youtube.com/watch?v=OYgugvjqU4A) — Can Tho City Youth and Children's Creativity Contest 2016
  - 3rd Prize — National Young Informatics Contest 2016
- Achieved the title of Outstanding Student from Grade 10-12.
- Selected for the National Excellent Student Contest in Informatics for two consecutive years during high school.
- Honored on the school's "Hall of Fame" for academic achievements.
- Developed a feature using Node.js and Pandoc to recognize multiple-choice questions from .docx files and upload them to an [online quiz platform](https://youtu.be/QjR99wdmTyo) I created.
- Developed websites based on Laravel framework.
- Built websites with PHP and MySQL, following the MVC architecture.`,
        skills: [
          "Algorithms",
          "C++",
          "PHP",
          "MySQL",
          "Laravel",
          "Node.js",
          "Pandoc",
        ],
      },
      {
        id: "1",
        title: "Thuan Hung Secondary School",
        employmentPeriod: {
          start: "08.2011",
          end: "06.2015",
        },
        icon: <GraduationCapIcon />,
        description: `- Recognized as the most outstanding student of the district.
- Achieved numerous awards at city and national levels:
  - Consolation Prize — National Young Informatics Contest 2015
  - Consolation Prize — National Young Informatics Contest 2014
  - 1st Prize — Can Tho City Young Informatics Contest 2014
- Achieved the title of Outstanding Student from Grade 6-9.
- Developed websites using the open-source NukeViet CMS.`,
        skills: ["Pascal", "NukeViet", "HTML", "CSS", "JavaScript"],
      },
    ],
  },
]
