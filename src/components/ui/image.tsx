"use client"

import NextImage, { type ImageProps } from "next/image"
import { useCallback, useRef, useState } from "react"

import { cn } from "@/lib/utils"

const BLUR_UP_MIN_LOAD_TIME_MS = 150

type ImageStatus = "loading" | "loaded" | "error"

function useImageLoadingStatus() {
  const [status, setStatus] = useState<ImageStatus>("loading")
  const [shouldBlurUp, setShouldBlurUp] = useState(false)
  const loadingStartedAtRef = useRef(0)

  const ref = useCallback((element: HTMLImageElement | null) => {
    if (!element) return

    loadingStartedAtRef.current = performance.now()

    // The image may already be complete when restored from the browser cache
    // before hydration or during client-side navigation.
    if (element.complete) {
      setStatus(element.naturalWidth > 0 ? "loaded" : "error")
    }
  }, [])

  const markLoaded = () => {
    // Only replay the blur-up when the image loaded from the network, not when
    // it was served instantly from the browser cache.
    setShouldBlurUp(
      performance.now() - loadingStartedAtRef.current > BLUR_UP_MIN_LOAD_TIME_MS
    )
    setStatus("loaded")
  }

  const markError = () => setStatus("error")

  return { status, shouldBlurUp, ref, markLoaded, markError }
}

export function Image({ className, onLoad, onError, ...props }: ImageProps) {
  const { status, shouldBlurUp, ref, markLoaded, markError } =
    useImageLoadingStatus()

  return (
    <NextImage
      {...props}
      ref={ref}
      data-slot="image"
      data-image-status={status}
      className={cn(
        "data-[image-status=loading]:image-shimmer",
        shouldBlurUp && "data-[image-status=loaded]:animate-image-blur-up",
        className
      )}
      onLoad={(event) => {
        markLoaded()
        onLoad?.(event)
      }}
      onError={(event) => {
        markError()
        onError?.(event)
      }}
    />
  )
}

export function Img({
  className,
  onLoad,
  onError,
  ...props
}: React.ComponentProps<"img">) {
  const { status, shouldBlurUp, ref, markLoaded, markError } =
    useImageLoadingStatus()

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
      {...props}
      ref={ref}
      data-slot="img"
      data-image-status={status}
      className={cn(
        "data-[image-status=loading]:image-shimmer",
        shouldBlurUp && "data-[image-status=loaded]:animate-image-blur-up",
        className
      )}
      onLoad={(event) => {
        markLoaded()
        onLoad?.(event)
      }}
      onError={(event) => {
        markError()
        onError?.(event)
      }}
    />
  )
}
