"use client"

import Matter from "matter-js"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

import { TECH_STACK } from "../data/tech-stack"

const ICON_SIZE = 44
const BODY_SIZE = 46

function PhysicsIconImage({ tech }: { tech: (typeof TECH_STACK)[number] }) {
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
          width={ICON_SIZE}
          height={ICON_SIZE}
          unoptimized
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
          width={ICON_SIZE}
          height={ICON_SIZE}
          unoptimized
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
      width={ICON_SIZE}
      height={ICON_SIZE}
      unoptimized
      onError={() => setUseCdn(true)}
    />
  )
}

export function TechStackPhysics() {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const bodiesRef = useRef<Matter.Body[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter

    const engine = Engine.create({ gravity: { y: 1 } })
    const { width, height } = container.getBoundingClientRect()

    const wallOptions = { isStatic: true, render: { visible: false } }
    const ground = Bodies.rectangle(
      width / 2,
      height + 25,
      width * 2,
      50,
      wallOptions
    )
    const leftWall = Bodies.rectangle(
      -25,
      height / 2,
      50,
      height * 3,
      wallOptions
    )
    const rightWall = Bodies.rectangle(
      width + 25,
      height / 2,
      50,
      height * 3,
      wallOptions
    )

    Composite.add(engine.world, [ground, leftWall, rightWall])

    const mouse = Mouse.create(container)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.4,
        render: { visible: false },
      },
    })
    Composite.add(engine.world, mouseConstraint)

    const mousewheel = (mouse as unknown as { mousewheel?: EventListener })
      .mousewheel
    if (mousewheel) {
      mouse.element.removeEventListener("mousewheel", mousewheel)
      mouse.element.removeEventListener("DOMMouseScroll", mousewheel)
    }

    let isDragging = false

    const onStartDrag = () => {
      isDragging = true
      container.style.cursor = "grabbing"
    }
    const onEndDrag = () => {
      isDragging = false
      container.style.cursor = ""
    }

    Matter.Events.on(mouseConstraint, "startdrag", onStartDrag)
    Matter.Events.on(mouseConstraint, "enddrag", onEndDrag)

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) return
      const rect = container.getBoundingClientRect()
      const point = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      const activeBodies = bodiesRef.current.filter(Boolean)
      const found = Matter.Query.point(activeBodies, point)
      container.style.cursor = found.length > 0 ? "grab" : ""
    }

    const onMouseLeave = (e: MouseEvent) => {
      if (isDragging) {
        container.dispatchEvent(
          new MouseEvent("mouseup", {
            bubbles: true,
            clientX: e.clientX,
            clientY: e.clientY,
          })
        )
      }
      container.style.cursor = ""
    }

    container.addEventListener("mousemove", onMouseMove)
    container.addEventListener("mouseleave", onMouseLeave)

    const indices = TECH_STACK.map((_, i) => i).sort(() => Math.random() - 0.5)
    const timeoutIds: number[] = []

    indices.forEach((originalIndex, i) => {
      const timeoutId = window.setTimeout(() => {
        if (!container) return
        const rect = container.getBoundingClientRect()
        const x = Math.random() * (rect.width - 60) + 30
        const body = Bodies.rectangle(x, -20, BODY_SIZE, BODY_SIZE, {
          restitution: 0.3,
          friction: 0.5,
          frictionAir: 0.01,
          chamfer: { radius: 6 },
        })
        Composite.add(engine.world, body)
        bodiesRef.current[originalIndex] = body

        const el = itemRefs.current[originalIndex]
        if (el) {
          el.style.opacity = "1"
        }
      }, i * 120)
      timeoutIds.push(timeoutId)
    })

    const sync = () => {
      bodiesRef.current.forEach((body, i) => {
        const el = itemRefs.current[i]
        if (body && el) {
          el.style.transform = `translate3d(${body.position.x - ICON_SIZE / 2}px, ${body.position.y - ICON_SIZE / 2}px, 0) rotate(${body.angle}rad)`
        }
      })
      rafRef.current = requestAnimationFrame(sync)
    }
    rafRef.current = requestAnimationFrame(sync)

    const runner = Runner.create()
    Runner.run(runner, engine)

    const ro = new ResizeObserver(() => {
      if (!container) return
      const rect = container.getBoundingClientRect()
      Matter.Body.setPosition(ground, {
        x: rect.width / 2,
        y: rect.height + 25,
      })
      Matter.Body.setPosition(leftWall, {
        x: -25,
        y: rect.height / 2,
      })
      Matter.Body.setPosition(rightWall, {
        x: rect.width + 25,
        y: rect.height / 2,
      })
    })
    ro.observe(container)

    return () => {
      ro.disconnect()
      timeoutIds.forEach(clearTimeout)
      cancelAnimationFrame(rafRef.current)
      Runner.stop(runner)
      Engine.clear(engine)
      container.removeEventListener("mousemove", onMouseMove)
      container.removeEventListener("mouseleave", onMouseLeave)
      Matter.Events.off(mouseConstraint, "startdrag", onStartDrag)
      Matter.Events.off(mouseConstraint, "enddrag", onEndDrag)
      bodiesRef.current = []
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 touch-none overflow-hidden"
    >
      {TECH_STACK.map((tech, i) => (
        <div
          key={tech.key}
          ref={(el) => {
            itemRefs.current[i] = el
          }}
          className="pointer-events-none absolute top-0 left-0 opacity-0 will-change-transform"
          style={{ width: ICON_SIZE, height: ICON_SIZE }}
        >
          <PhysicsIconImage tech={tech} />
        </div>
      ))}
    </div>
  )
}
