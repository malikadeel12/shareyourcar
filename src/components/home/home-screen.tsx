"use client"

/**
 * What changed: the hero car's headlights soften off, then come back on.
 * Why: the photograph already has the lamps lit, so a dark cover on those
 *      spots is what makes them look switched off.
 * Related: src/app/globals.css (syc-lamps), src/components/home/search-card.tsx
 * Note: MCP Context 7 — the photo stays still, like a rental homepage.
 *       Only the headlights rest for a moment. Reduced motion leaves them on.
 */

/**
 * What: the Share Your Car homepage, rebuilt around a booking-first layout.
 * Why: the search bar was overlapping the car photo and hiding the price,
 *      so the first screen looked broken. The car is now the full first
 *      screen, and the words and search sit on the dark lower area.
 * Related: src/components/home/search-card.tsx, src/components/home/story-sections.tsx
 */

import { useLayoutEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"

import { SearchCard } from "@/components/home/search-card"
import { TextSettle } from "@/components/motion/text-settle"
import {
  Audiences,
  CityStops,
  EarningsBoard,
  Faq,
  HostClose,
  MoreWays,
  OfferMosaic,
  ProtectionBand,
  QuoteStage,
  TripSteps,
  TrustReady,
  TrustRow,
} from "@/components/home/story-sections"
import { vehicles } from "@/data/vehicles"
import { formatMoney } from "@/lib/format"

const hero = vehicles[0]

export function HomeScreen() {
  const reduce = useReducedMotion()

  return (
    <>
      {/* --- Hero: one photograph, type and search on the dark lower area --- */}
      {/* overflow-hidden keeps the slow photo zoom inside the first screen.
          Without it the zoom spills past the edge and a sideways scrollbar appears. */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="absolute inset-0 overflow-hidden">
          {/* The photo eases closer on its own. The hero frame clips it, so the page does not scroll sideways. */}
          <div className="syc-drift absolute inset-0 motion-safe:animate-[syc-drift_18s_ease-in-out_infinite_alternate]">
            <Image
              src={hero.images[0]}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_62%]"
            />
            <Headlamps />
          </div>
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(11,15,20,0.92) 0%, rgba(11,15,20,0.55) 42%, rgba(11,15,20,0.18) 100%)",
            }}
          />
        </div>
        {/* Two beats you can watch: the headline rises, then the search follows.
            They stay sharp. Nothing here is tied to the scroll wheel. */}
        <div className="relative mx-auto flex min-h-[calc(100svh-7.5rem)] w-full max-w-7xl flex-col justify-end gap-4 px-4 pt-4 pb-24 md:min-h-[92svh] md:gap-5 md:px-8 md:pt-28 md:pb-12">
          <motion.div
            className="flex flex-col gap-4"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs tracking-[0.22em] text-paper/75 uppercase">
              Peer-to-peer · United States
            </p>
            <TextSettle
              text="Rent the Perfect Car from Local Hosts"
              className="max-w-5xl font-serif text-[2.55rem] leading-[0.9] tracking-[-0.045em] text-paper md:text-[6.2rem]"
            />
          </motion.div>
          <motion.div
            className="flex flex-col gap-4"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.65, delay: reduce ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <p className="max-w-md text-sm leading-relaxed text-paper/85">
                We connect vehicle owners and renters through a secure, flexible platform built for everyday travel, work trips, and long-term mobility.
              </p>
              <p className="font-serif text-3xl tracking-tight text-paper md:text-4xl">
                {formatMoney(hero.pricePerDay)}
                <span className="ml-2 font-sans text-sm text-paper/75">/ day · {hero.location}</span>
              </p>
            </div>
            <SearchCard className="shadow-[0_18px_50px_rgba(11,15,20,0.28)]" />
          </motion.div>
        </div>
      </section>

      <div>
        <section className="bg-ink text-paper">
          <p className="mx-auto max-w-7xl px-4 py-5 font-serif text-2xl leading-tight tracking-[-0.03em] md:px-8 md:py-7 md:text-4xl">
            The exact car. A local host. Most trips approved within 8 hours.
          </p>
        </section>

        <TrustRow />
        <OfferMosaic />

        <CityStops />

        <MoreWays />
        <QuoteStage />
        <Audiences />
        <TripSteps />
        <TrustReady />
        <EarningsBoard />
        <ProtectionBand />
        <Faq />
        <HostClose />
      </div>
    </>
  )
}

/** Spots on the Model S photo, as fractions of the picture itself. */
const headlamps = [
  { id: "near", x: 0.45, y: 0.572, w: 0.17, h: 0.08 },
  { id: "far", x: 0.668, y: 0.555, w: 0.075, h: 0.065 },
  { id: "fog", x: 0.423, y: 0.659, w: 0.045, h: 0.04 },
] as const

type LampSpot = {
  id: string
  left: number
  top: number
  width: number
  height: number
}

function Headlamps() {
  const frame = useRef<HTMLDivElement>(null)
  const [spots, setSpots] = useState<LampSpot[]>([])

  useLayoutEffect(() => {
    const box = frame.current?.parentElement
    if (!box) return

    // The photo is cropped with object-fit: cover and object-position: center 62%.
    // These numbers follow that same crop, so the covers stay on the lamps
    // when the window changes size.
    function place() {
      if (!box) return
      const width = box.clientWidth
      const height = box.clientHeight
      if (width === 0 || height === 0) return
      const imageWidth = 3
      const imageHeight = 2
      const scale = Math.max(width / imageWidth, height / imageHeight)
      const drawnWidth = imageWidth * scale
      const drawnHeight = imageHeight * scale
      const offsetX = 0.5 * (width - drawnWidth)
      const offsetY = 0.62 * (height - drawnHeight)

      setSpots(
        headlamps.map((lamp) => ({
          id: lamp.id,
          left: offsetX + lamp.x * drawnWidth,
          top: offsetY + lamp.y * drawnHeight,
          width: lamp.w * drawnWidth,
          height: lamp.h * drawnHeight,
        }))
      )
    }

    place()
    const observer = new ResizeObserver(place)
    observer.observe(box)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={frame} aria-hidden className="pointer-events-none absolute inset-0">
      {spots.map((spot) => (
        <span
          key={spot.id}
          className="syc-lamps absolute rounded-full motion-safe:animate-[syc-lamps_5s_ease-in-out_infinite]"
          style={{
            left: spot.left,
            top: spot.top,
            width: spot.width,
            height: spot.height,
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(ellipse at center, rgba(6,8,10,0.96) 0%, rgba(6,8,10,0.82) 46%, rgba(6,8,10,0) 74%)",
          }}
        />
      ))}
    </div>
  )
}
