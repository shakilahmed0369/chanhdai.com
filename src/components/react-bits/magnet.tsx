"use client"

import type { HTMLAttributes, ReactNode } from "react"
import React, { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

interface MagnetProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  padding?: number
  disabled?: boolean
  magnetStrength?: number
  activeTransition?: string
  inactiveTransition?: string
  wrapperClassName?: string
  innerClassName?: string
  containerRef?: React.RefObject<HTMLElement | null>
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 64,
  disabled = false,
  magnetStrength = 2,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.5s ease-in-out",
  wrapperClassName = "",
  innerClassName = "",
  containerRef,
  ...props
}) => {
  const [isActive, setIsActive] = useState<boolean>(false)
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  const magnetRef = useRef<HTMLDivElement>(null)
  const pendingRaf = useRef<number>(0)
  const latestEvent = useRef<{ clientX: number; clientY: number } | null>(null)

  useEffect(() => {
    if (disabled) return

    const targetElement = containerRef?.current ?? window
    const handleMouseMove = (e: Event) => {
      if (!magnetRef.current) return
      if (!(e instanceof MouseEvent)) return

      latestEvent.current = { clientX: e.clientX, clientY: e.clientY }
      if (pendingRaf.current) return

      pendingRaf.current = requestAnimationFrame(() => {
        pendingRaf.current = 0
        const coords = latestEvent.current
        latestEvent.current = null
        if (!coords || !magnetRef.current) return

        const { left, top, width, height } =
          magnetRef.current.getBoundingClientRect()

        const centerX = left + width / 2
        const centerY = top + height / 2

        const distX = Math.abs(centerX - coords.clientX)
        const distY = Math.abs(centerY - coords.clientY)

        if (distX < width / 2 + padding && distY < height / 2 + padding) {
          setIsActive(true)
          const offsetX = (coords.clientX - centerX) / magnetStrength
          const offsetY = (coords.clientY - centerY) / magnetStrength
          setPosition({ x: offsetX, y: offsetY })
        } else {
          setIsActive(false)
          setPosition({ x: 0, y: 0 })
        }
      })
    }

    targetElement.addEventListener("mousemove", handleMouseMove)

    return () => {
      targetElement.removeEventListener("mousemove", handleMouseMove)
      if (pendingRaf.current) {
        cancelAnimationFrame(pendingRaf.current)
        pendingRaf.current = 0
      }
    }
  }, [padding, disabled, magnetStrength, containerRef])

  const finalPosition = disabled ? { x: 0, y: 0 } : position
  const transitionStyle = isActive ? activeTransition : inactiveTransition

  return (
    <div
      ref={magnetRef}
      className={cn("relative inline-block", wrapperClassName)}
      {...props}
    >
      <div
        className={cn("will-change-transform", innerClassName)}
        style={{
          transform: `translate3d(${finalPosition.x}px, ${finalPosition.y}px, 0)`,
          transition: transitionStyle,
        }}
      >
        {children}
      </div>
    </div>
  )
}
