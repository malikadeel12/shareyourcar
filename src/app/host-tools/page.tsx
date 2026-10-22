/**
 * What: the Host tools page as a mixed photo grid.
 * Why: eight identical cards read as a template. A bento gives one tool
 *      the photo and lets the rest sit at different sizes.
 * Related: src/app/host/page.tsx, src/data/site-pages.ts
 * Note: percentage and "3x bookings" claims from the live page are left out.
 * MCP Context 7 — spans follow the Magic UI bento grid. Lucide, one size.
 *       The fleet page stays the place with the real switches.
 */

import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  BadgeDollarSign,
  CalendarRange,
  Camera,
  ChartColumn,
  Images,
  MessageSquare,
  ShieldCheck,
  Wallet,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { hostTools } from "@/data/site-pages"
import { getVehicle } from "@/data/vehicles"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Host tools",
}

const fleetCar = getVehicle("tesla-model-s-2024")

const toolIcons: LucideIcon[] = [
  Images,
  BadgeDollarSign,
  CalendarRange,
  ChartColumn,
  Camera,
  MessageSquare,
  Wallet,
  ShieldCheck,
]

// Six columns. The listing tile is the wide photo. The rest fill around it.
const toolSpan = [
  "md:col-span-4 md:row-span-2",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-4",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-2",
]

export default function HostToolsPage() {
  return (
    <article>
      <header className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-16 md:px-8 md:py-24">
        <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">For hosts</p>
        <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl">
          Host tools
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Price, calendar, photos, and payouts for one car or a small fleet. Listing is free.
        </p>
      </header>

      {/* --- Eight tools, one photo tile, not eight copies --- */}
      <section className="mx-auto grid w-full max-w-7xl gap-3 px-4 pb-16 md:grid-cols-6 md:px-8">
        {hostTools.map((tool, index) => {
          const Icon = toolIcons[index]
          const photo = index === 0
          const quiet = index === 3
          return (
            <article
              key={tool.title}
              className={cn(
                "group relative flex min-h-56 flex-col justify-end overflow-hidden rounded-[28px] border border-border bg-card p-6",
                toolSpan[index],
                photo && "min-h-[28rem] border-0 p-0 text-paper",
                quiet && "bg-primary text-primary-foreground border-transparent",
              )}
            >
              {photo && fleetCar ? (
                <>
                  <Image
                    src={fleetCar.images[0]}
                    alt={fleetCar.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-transparent" />
                </>
              ) : null}
              <div className={cn("relative flex flex-col gap-3", photo && "p-6")}>
                {Icon ? <Icon className="size-5" strokeWidth={1.5} aria-hidden /> : null}
                <h2 className="font-serif text-3xl tracking-[-0.03em]">{tool.title}</h2>
                <p className={cn("text-sm leading-relaxed", photo || quiet ? "text-current/75" : "text-muted-foreground")}>
                  {tool.body}
                </p>
                <ul className="mt-2 flex flex-col gap-1.5 text-sm">
                  {tool.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          )
        })}
      </section>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-20 md:flex-row md:items-end md:justify-between md:px-8">
        <div className="max-w-xl">
          <h2 className="font-serif text-4xl leading-[0.95] tracking-[-0.03em] md:text-6xl">
            The fleet page is where the switches are.
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Earnings, the calendar block, and the next payout sit on Your fleet. This page is the list of tools.
          </p>
        </div>
        <div className="flex gap-3">
          <Button nativeButton={false} render={<Link href="/host" />} size="lg">
            Your fleet
          </Button>
          <Button nativeButton={false} render={<Link href="/become-host" />} variant="outline" size="lg">
            List your car
          </Button>
        </div>
      </section>
    </article>
  )
}
