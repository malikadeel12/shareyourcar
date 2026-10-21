"use client"

/**
 * What: location field plus a date-range card used on Home and Search.
 * Why: renters start every trip by answering where and when.
 * Related: src/data/vehicles.ts, src/lib/search.ts
 */

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarDays, MapPin, Search } from "lucide-react"
import { type DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { pickupLocations, sampleTrip } from "@/data/vehicles"
import { formatDay, parseISODate, toISODate } from "@/lib/format"
import { searchHref } from "@/lib/search"
import { cn } from "@/lib/utils"

type SearchCardProps = {
  initialWhere?: string
  initialFrom?: string
  initialTo?: string
  className?: string
}

export function SearchCard({
  initialWhere = "New York, New York",
  initialFrom = sampleTrip.from,
  initialTo = sampleTrip.to,
  className,
}: SearchCardProps) {
  const router = useRouter()
  const [where, setWhere] = useState(initialWhere)
  const [openList, setOpenList] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [range, setRange] = useState<DateRange>({
    from: parseISODate(initialFrom),
    to: parseISODate(initialTo),
  })

  const matches = useMemo(() => {
    const query = where.trim().toLowerCase()
    return pickupLocations.filter((place) =>
      place.toLowerCase().includes(query)
    )
  }, [where])

  const from = range.from ? toISODate(range.from) : ""
  const to = range.to ? toISODate(range.to) : ""
  const dateLabel =
    from && to ? `${formatDay(from)} – ${formatDay(to)}` : "Choose dates"

  function go() {
    router.push(searchHref({ where, from, to }))
  }

  return (
    <form
      role="search"
      className={cn(
        "rounded-3xl border border-border bg-card p-2 text-foreground md:flex md:items-center md:rounded-full md:p-1.5",
        className
      )}
      onSubmit={(event) => {
        event.preventDefault()
        go()
      }}
    >
      <FieldGroup className="gap-1 md:flex-1 md:flex-row md:items-center md:gap-0">
        <Field className="min-w-0 flex-1 gap-0 px-3 py-1.5">
          <FieldLabel htmlFor="pickup-location" className="text-xs text-muted-foreground">
            Location
          </FieldLabel>
          <div className="relative">
            <MapPin
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-0 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              id="pickup-location"
              value={where}
              role="combobox"
              aria-expanded={openList}
              aria-controls="pickup-suggestions"
              aria-autocomplete="list"
              autoComplete="off"
              className="h-8 rounded-none border-0 bg-transparent px-0 pl-6 shadow-none focus-visible:ring-0"
              placeholder="City or airport"
              onChange={(event) => {
                setWhere(event.target.value)
                setOpenList(true)
                setActiveIndex(0)
              }}
              onFocus={() => setOpenList(true)}
              onBlur={() => {
                window.setTimeout(() => setOpenList(false), 120)
              }}
              onKeyDown={(event) => {
                if (!openList || matches.length === 0) return
                if (event.key === "ArrowDown") {
                  event.preventDefault()
                  setActiveIndex((index) => (index + 1) % matches.length)
                }
                if (event.key === "ArrowUp") {
                  event.preventDefault()
                  setActiveIndex(
                    (index) => (index - 1 + matches.length) % matches.length
                  )
                }
                if (event.key === "Enter" && matches[activeIndex]) {
                  event.preventDefault()
                  setWhere(matches[activeIndex])
                  setOpenList(false)
                }
              }}
            />
            {openList && matches.length > 0 ? (
              <ul
                id="pickup-suggestions"
                role="listbox"
                className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-border bg-popover py-1"
              >
                {matches.map((place, index) => (
                  <li key={place} role="option" aria-selected={index === activeIndex}>
                    <button
                      type="button"
                      className="w-full px-4 py-2 text-left text-sm hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                      onMouseDown={(event) => {
                        event.preventDefault()
                        setWhere(place)
                        setOpenList(false)
                      }}
                    >
                      {place}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </Field>

        <Separator orientation="vertical" className="mx-1 hidden h-10 md:block" />
        <Field className="min-w-0 flex-1 gap-0 px-3 py-1.5">
          <FieldLabel className="text-xs text-muted-foreground">Dates</FieldLabel>
          <Popover>
            <PopoverTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  className="h-8 w-full justify-start px-0"
                />
              }
            >
              <CalendarDays data-icon="inline-start" />
              {dateLabel}
            </PopoverTrigger>
            <PopoverContent className="w-auto rounded-2xl p-2" align="start">
              <Calendar
                mode="range"
                selected={range}
                onSelect={(next) => next && setRange(next)}
                numberOfMonths={1}
                disabled={{ before: new Date(2026, 9, 20) }}
              />
            </PopoverContent>
          </Popover>
        </Field>

        <Button type="submit" size="lg" className="mt-1 w-full shrink-0 md:mt-0 md:w-auto">
          <Search data-icon="inline-start" />
          Search
        </Button>
      </FieldGroup>
    </form>
  )
}
