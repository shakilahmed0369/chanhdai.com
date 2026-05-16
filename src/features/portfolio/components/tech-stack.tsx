"use client"

import Image from "next/image"
import { useState } from "react"

import { TECH_STACK } from "../data/tech-stack"
import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel"

function TechIcon({ tech }: { tech: (typeof TECH_STACK)[number] }) {
  const [useCdn, setUseCdn] = useState(false)

  if (tech.theme) {
    return (
      <>
        <Image
          className="hidden [html.light_&]:block"
          src={
            useCdn
              ? `https://assets.chanhdai.com/images/tech-stack-icons/${tech.key}-light.svg`
              : `/tech-stack-icons/${tech.key}-light.svg`
          }
          alt={`${tech.title} light icon`}
          width={14}
          height={14}
          unoptimized={!useCdn}
          onError={() => setUseCdn(true)}
        />
        <Image
          className="hidden [html.dark_&]:block"
          src={
            useCdn
              ? `https://assets.chanhdai.com/images/tech-stack-icons/${tech.key}-dark.svg`
              : `/tech-stack-icons/${tech.key}-dark.svg`
          }
          alt={`${tech.title} dark icon`}
          width={14}
          height={14}
          unoptimized={!useCdn}
          onError={() => setUseCdn(true)}
        />
      </>
    )
  }

  return (
    <Image
      src={
        useCdn
          ? `https://assets.chanhdai.com/images/tech-stack-icons/${tech.key}.svg`
          : `/tech-stack-icons/${tech.key}.svg`
      }
      alt={`${tech.title} icon`}
      width={14}
      height={14}
      unoptimized={!useCdn}
      onError={() => setUseCdn(true)}
    />
  )
}

export function TechStack() {
  return (
    <Panel id="stack">
      <PanelHeader>
        <PanelTitle>Stack</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <ul className="flex flex-wrap gap-2">
          {TECH_STACK.map((tech) => {
            return (
              <li key={tech.key} className="flex">
                <a
                  href={tech.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={tech.title}
                  className="flex items-center gap-1.5 rounded-full border bg-zinc-50 px-1.5 py-0.5 text-xs tracking-wide text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 retina:border-[0.5px] [&_img]:size-3.5 [&_img]:select-none"
                >
                  <TechIcon tech={tech} />
                  {tech.title}
                </a>
              </li>
            )
          })}
        </ul>
      </PanelContent>
    </Panel>
  )
}
