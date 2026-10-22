"use client"

/**
 * What: the photos on a car, with dots, arrows, and a sideways swipe.
 * Why: every listed car has more than one photo. A renter should see the
 *      next picture without leaving the card.
 * Related: src/components/home/vehicle-card.tsx, src/components/booking/booking-screen.tsx
 * Note: MCP Context 7 — one control set, reused on the card and the car page.
 *       Reduced motion swaps the photo with no slide.
 */

import { useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "cn"

type PhotoCarouselProps = {
  images: string[]
  alt: string
  sizes: string
  className?: string
  priority?: boolean
  /** Tap on the photo itself. Arrows and swipes do not trigger this. */
  onOpen?: () => void
}

export function PhotoCarousel({
  images,
  alt,
  sizes,
  className,
  priority = false,
  onOpen,
}: PhotoCarouselProps) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const startX = useRef(0)
  const dragged = useRef(false)
  const many = images.length > 1
  const photo = images[index] ?? images[0]

  // --- Photo step ---
  // Wrap around so the last picture leads back to the first.
  function step(direction: number) {
    setIndex((current) => {
      const next = current + direction
      if (next < 0) return images.length - 1
      if (next >= images.length) return 0
      return next
    })
  }

  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      <div
        role={onOpen ? "button" : undefined}
        tabIndex={onOpen ? 0 : undefined}
        aria-label={onOpen ? `View ${alt}` : undefined}
        className="absolute inset-0"
        onPointerDown={(event) => {
          startX.current = event.clientX
          dragged.current = false
        }}
        onPointerUp={(event) => {
          const delta = event.clientX - startX.current
          if (many && Math.abs(delta) > 36) {
            dragged.current = true
            step(delta < 0 ? 1 : -1)
          }
        }}
        onClick={() => {
          if (dragged.current) {
            dragged.current = false
            return
          }
          onOpen?.()
        }}
        onKeyDown={(event) => {
          if (!onOpen) return
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            onOpen()
          }
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={photo}
            className="absolute inset-0"
            initial={reduce ? false : { opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0, x: -28 }}
            transition={{ duration: reduce ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={photo}
              alt={alt}
              fill
              priority={priority && index === 0}
              sizes={sizes}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {many ? (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            className="absolute top-1/2 left-2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-ink/80 text-paper"
            onClick={() => step(-1)}
          >
            <ChevronLeft className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            className="absolute top-1/2 right-2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-ink/80 text-paper"
            onClick={() => step(1)}
          >
            <ChevronRight className="size-4" aria-hidden />
          </button>
          <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1">
            {images.map((image, dot) => (
              <button
                key={image + dot}
                type="button"
                aria-label={`Photo ${dot + 1} of ${images.length}`}
                aria-current={dot === index ? "true" : undefined}
                className="flex size-4 items-center justify-center"
                onClick={() => setIndex(dot)}
              >
                <span
                  className={cn(
                    "block size-1.5 rounded-full bg-white/70",
                    dot === index && "w-4 bg-white"
                  )}
                />
              </button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}
