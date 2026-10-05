"use client"

import { type RefObject, useEffect } from "react"

const NEKO_SCRIPT_URL = "https://louisabraham.github.io/nekojs/neko.js"

const NEKO_SIZE = 32
const NEKO_FPS = 60
const NEKO_SPEED = 20
const NEKO_BEHAVIOR_WANDER = 2
const NEKO_STATE_WASH = 1
const NEKO_STATE_SLEEP = 4
const NEKO_STATE_AWAKE = 5
const NEKO_SPRITE_SIT = 28
const NEKO_IDLE_THRESHOLD = 2
const NEKO_NEW_HEIGHT_CHANCE = 0.25
const NEKO_MIN_RUN_DISTANCE_RATIO = 0.3
const NEKO_FOLLOW_IDLE_MS = 4000

type NekoInstance = {
  element: HTMLDivElement
  boundsWidth: number
  boundsHeight: number
  logicX: number
  logicY: number
  prevLogicX: number
  prevLogicY: number
  targetX: number
  targetY: number
  x: number
  y: number
  state: number
  actionCount?: number
  idleThreshold: number
  moveDX: number
  moveDY: number
  animationTable: [number, number][]
  calcDirection: (dx: number, dy: number) => void
  setState: (state: number) => void
  runTowards: (targetX: number, targetY: number) => void
  runRandomly: () => void
  updatePosition: () => void
  start: () => void
  stop: () => void
  destroy: () => void
}

type NekoOptions = {
  speed?: number
  fps?: number
  behaviorMode?: number
  idleThreshold?: number
  allowBehaviorChange?: boolean
}

declare global {
  interface Window {
    createNeko?: (options?: NekoOptions) => NekoInstance
  }
}

let nekoScriptPromise: Promise<void> | null = null

function loadNekoScript() {
  if (typeof window === "undefined" || window.createNeko) {
    return Promise.resolve()
  }

  nekoScriptPromise ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script")
    script.src = NEKO_SCRIPT_URL
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => {
      nekoScriptPromise = null
      reject(new Error("Failed to load Neko.js"))
    }
    document.head.appendChild(script)
  })

  return nekoScriptPromise
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export function ProfileCoverNeko({
  containerRef,
}: {
  containerRef: RefObject<HTMLDivElement | null>
}) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Decorative animation: skip it for users who prefer reduced motion.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let cancelled = false
    let neko: NekoInstance | null = null
    let observer: IntersectionObserver | null = null
    let onMouseMove: ((event: MouseEvent) => void) | null = null
    let onCatPointerDown: ((event: MouseEvent) => void) | null = null
    let followPoint: { x: number; y: number } | null = null
    let followArrived = false
    let lastFollowedAt = 0

    const setup = () => {
      if (cancelled || !window.createNeko) return

      const instance = window.createNeko({
        speed: NEKO_SPEED,
        fps: NEKO_FPS,
        behaviorMode: NEKO_BEHAVIOR_WANDER,
        idleThreshold: NEKO_IDLE_THRESHOLD,
        allowBehaviorChange: false,
      })
      neko = instance

      // Neko.js is built for the viewport: move the cat into the cover and
      // keep its bounds and rendering relative to the container.
      container.appendChild(instance.element)
      instance.element.style.position = "absolute"
      instance.element.style.zIndex = "10"
      instance.element.setAttribute("aria-hidden", "true")
      instance.element.querySelector("img")?.setAttribute("alt", "")

      // The wash animation (paw waving over the head) reads as dancing;
      // keep the cat sitting still during that state instead.
      instance.animationTable[NEKO_STATE_WASH] = [
        NEKO_SPRITE_SIT,
        NEKO_SPRITE_SIT,
      ]

      instance.updatePosition = () => {
        const boundsWidth = Math.max(0, container.clientWidth - NEKO_SIZE)
        const boundsHeight = Math.max(0, container.clientHeight - NEKO_SIZE)

        // Re-assert bounds every frame so layout changes can never let the
        // cat escape the cover (the library resets them on window resize).
        if (
          instance.boundsWidth !== boundsWidth ||
          instance.boundsHeight !== boundsHeight
        ) {
          instance.boundsWidth = boundsWidth
          instance.boundsHeight = boundsHeight
          instance.logicX = clamp(instance.logicX, 0, boundsWidth)
          instance.logicY = clamp(instance.logicY, 0, boundsHeight)
          instance.prevLogicX = clamp(instance.prevLogicX, 0, boundsWidth)
          instance.prevLogicY = clamp(instance.prevLogicY, 0, boundsHeight)
          instance.x = clamp(instance.x, 0, boundsWidth)
          instance.y = clamp(instance.y, 0, boundsHeight)
        }

        instance.element.style.left = `${Math.round(instance.x)}px`
        instance.element.style.top = `${Math.round(instance.y)}px`
      }

      // Neko.js bug: RUN_AROUND_RANDOMLY assigns targetX/targetY before calling
      // runTowards, so the moved target is never detected and the cat naps
      // forever. Run a natural version instead: horizontal trips at the
      // current height, occasionally settling at a new one.
      instance.runRandomly = () => {
        if (followPoint !== null) {
          // Follow until the cat reaches the cursor; once it has arrived and
          // the cursor has been still for a while, it resumes its own routine.
          const stopX = clamp(
            followPoint.x - NEKO_SIZE / 2,
            0,
            instance.boundsWidth
          )
          const stopY = clamp(
            followPoint.y - NEKO_SIZE + 1,
            0,
            instance.boundsHeight
          )
          if (
            Math.abs(stopX - instance.logicX) <= 2 &&
            Math.abs(stopY - instance.logicY) <= 2
          ) {
            followArrived = true
          }

          if (
            performance.now() - lastFollowedAt < NEKO_FOLLOW_IDLE_MS ||
            !followArrived
          ) {
            instance.runTowards(followPoint.x, followPoint.y)

            // Skip the awake pause while following so the cat reacts as soon
            // as the cursor moves, instead of waiting out its wake-up delay.
            if (
              instance.state === NEKO_STATE_AWAKE &&
              (instance.moveDX !== 0 || instance.moveDY !== 0)
            ) {
              instance.calcDirection(instance.moveDX, instance.moveDY)
            }
            return
          }
        }

        if (instance.state === NEKO_STATE_SLEEP) {
          instance.actionCount = (instance.actionCount ?? 0) + 1
        }

        if ((instance.actionCount ?? 0) > instance.idleThreshold * 10) {
          instance.actionCount = 0

          let destinationX = Math.random() * instance.boundsWidth
          if (
            Math.abs(destinationX - instance.logicX) <
            instance.boundsWidth * NEKO_MIN_RUN_DISTANCE_RATIO
          ) {
            destinationX =
              (destinationX + instance.boundsWidth / 2) % instance.boundsWidth
          }

          const destinationY =
            Math.random() < NEKO_NEW_HEIGHT_CHANCE
              ? Math.random() * instance.boundsHeight
              : instance.logicY

          instance.runTowards(
            destinationX + NEKO_SIZE / 2,
            destinationY + NEKO_SIZE - 1
          )
        } else {
          instance.runTowards(instance.targetX, instance.targetY)
        }
      }

      // Start at a random spot inside the cover instead of the library's
      // viewport-wide position.
      const boundsWidth = Math.max(0, container.clientWidth - NEKO_SIZE)
      const boundsHeight = Math.max(0, container.clientHeight - NEKO_SIZE)
      instance.boundsWidth = boundsWidth
      instance.boundsHeight = boundsHeight
      instance.logicX = Math.random() * boundsWidth
      instance.logicY = Math.random() * boundsHeight
      instance.prevLogicX = instance.logicX
      instance.prevLogicY = instance.logicY
      instance.x = instance.logicX
      instance.y = instance.logicY
      instance.targetX = instance.logicX + NEKO_SIZE / 2
      instance.targetY = instance.logicY + NEKO_SIZE - 1
      instance.updatePosition()

      // Follow the cursor while it moves across the hero; an idle cursor
      // releases the cat back to its own routine.
      onMouseMove = (event) => {
        const rect = container.getBoundingClientRect()
        followPoint = {
          x: clamp(event.clientX - rect.left, 0, container.clientWidth),
          y: clamp(event.clientY - rect.top, 0, container.clientHeight),
        }
        lastFollowedAt = performance.now()
        followArrived = false
        instance.actionCount = 0
      }
      container.addEventListener("mousemove", onMouseMove)

      instance.element.style.pointerEvents = "auto"
      instance.element.style.cursor = "pointer"

      onCatPointerDown = (event) => {
        if (event.button !== 0) return

        const rect = container.getBoundingClientRect()
        followPoint = {
          x: clamp(event.clientX - rect.left, 0, container.clientWidth),
          y: clamp(event.clientY - rect.top, 0, container.clientHeight),
        }
        lastFollowedAt = performance.now()
        followArrived = false
        instance.actionCount = 0
        instance.setState(NEKO_STATE_AWAKE)
      }
      instance.element.addEventListener("mousedown", onCatPointerDown)

      // Pause the cat while the cover is scrolled out of view.
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          instance.start()
        } else {
          instance.stop()
        }
      })
      observer.observe(container)
    }

    loadNekoScript()
      .then(setup)
      .catch(() => {})

    return () => {
      cancelled = true
      if (onMouseMove) {
        container.removeEventListener("mousemove", onMouseMove)
      }
      if (onCatPointerDown && neko?.element) {
        neko.element.removeEventListener("mousedown", onCatPointerDown)
      }
      observer?.disconnect()
      neko?.stop()
      neko?.destroy()
    }
  }, [containerRef])

  return null
}
