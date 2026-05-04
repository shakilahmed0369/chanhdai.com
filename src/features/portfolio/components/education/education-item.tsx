import type { Experience } from "@/features/portfolio/types/experiences"

import { ExperiencePositionItem } from "../experiences/experience-position-item"

export function EducationItem({ education }: { education: Experience }) {
  return (
    <div
      id={`education-${education.id}`}
      className="screen-line-bottom scroll-mt-14 space-y-4 py-4"
    >
      <h3 className="flex items-center gap-3 px-1 text-lg leading-snug font-semibold">
        {education.companyName}
      </h3>

      <div className="relative space-y-4 before:absolute before:left-3 before:h-full before:w-px before:bg-border">
        {education.positions.map((position) => (
          <ExperiencePositionItem key={position.id} position={position} />
        ))}
      </div>
    </div>
  )
}
