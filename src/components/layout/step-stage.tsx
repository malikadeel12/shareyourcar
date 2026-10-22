/**
 * What: a catalog photo beside a numbered path.
 * Why: four short paragraphs in a row looked like a template.
 *      Premium rental sites put the car on one side and the steps
 *      on the other, so the path has a picture to belong to.
 * Related: src/app/how-it-works/page.tsx, src/components/home/story-sections.tsx
 * Note: MCP Context 7 — one layout, existing catalog photos, Lucide at one size.
 *       The photo only scales a little on hover. No blur, no pinned scroll.
 */

import Image from "next/image"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type Step = {
  title: string
  body: string
}

export function StepStage({
  kicker,
  image,
  imageAlt,
  caption,
  steps,
  icons,
  flip = false,
}: {
  kicker?: string
  image: string
  imageAlt: string
  caption: string
  steps: Step[]
  icons: LucideIcon[]
  flip?: boolean
}) {
  return (
    <div className="grid items-start gap-8 lg:grid-cols-12">
      {/* --- The car the steps belong to --- */}
      <figure className={cn("lg:sticky lg:top-24 lg:col-span-5", flip && "lg:order-2")}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-muted lg:aspect-[4/5]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover transition-transform duration-500 hover:scale-[1.06]"
          />
        </div>
        <figcaption className="mt-3 text-sm text-muted-foreground">{caption}</figcaption>
      </figure>

      {/* --- The path, one step per row --- */}
      <div className="lg:col-span-7">
        {kicker ? (
          <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">{kicker}</p>
        ) : null}
        <ol className={cn("flex flex-col", kicker && "mt-6")}>
          {steps.map((step, index) => {
            const Icon = icons[index]
            return (
              <li
                key={step.title}
                className="grid grid-cols-[4.5rem_1fr] gap-4 border-t border-border py-6"
              >
                <span className="font-serif text-4xl tracking-tight">0{index + 1}</span>
                <div>
                  {Icon ? (
                    <Icon className="size-5" strokeWidth={1.5} aria-hidden />
                  ) : null}
                  <h3 className="mt-2 font-serif text-3xl tracking-[-0.03em]">{step.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
