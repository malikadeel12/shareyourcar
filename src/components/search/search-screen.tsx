"use client"

/**
 * What changed: the filters sit in one panel and the count is written in the headline.
 * Why: the page read as a form dumped on a grid. It should read as a catalog.
 * Related: src/components/home/vehicle-grid.tsx, src/components/home/search-card.tsx
 * Note: MCP Context 7 — same filters, clearer grouping. No new fake inventory.
 */

/**
 * What: search results for a location, date range, and vehicle type.
 * Why: the bottom-nav Search tab and the home form land in the same catalog.
 *      Price, seats, fuel, and pickup time stay on this page so the home
 *      search bar can stay short.
 * Related: src/components/home/search-card.tsx
 * Business rule: every listed car can be picked up at the chosen hour, so
 *                the time does not remove cars from the results.
 */

import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"

import { SearchCard } from "@/components/home/search-card"
import { Reveal } from "@/components/motion/reveal"
import { VehicleGrid } from "@/components/home/vehicle-grid"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  categories,
  filterVehicles,
  sampleTrip,
  type CategoryFilter,
} from "@/data/vehicles"

const prices = [
  { label: "Any price", value: "" },
  { label: "$50 a day", value: "50" },
  { label: "$105 a day", value: "105" },
] as const

const seatChoices = [
  { label: "Any seats", value: "" },
  { label: "5 seats", value: "5" },
] as const

const fuels = [
  { label: "Any fuel", value: "" },
  { label: "Electric", value: "Electric" },
  { label: "Gasoline", value: "gasoline" },
] as const

const pickupTimes = ["8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"]

export function SearchScreen() {
  const params = useSearchParams()
  const where = params.get("where") || "Nearby"
  const from = params.get("from") || sampleTrip.from
  const to = params.get("to") || sampleTrip.to
  const initialType = params.get("type") || "All"
  const [category, setCategory] = useState<CategoryFilter>(
    categories.includes(initialType as CategoryFilter)
      ? (initialType as CategoryFilter)
      : "All"
  )
  const [price, setPrice] = useState("")
  const [seats, setSeats] = useState("")
  const [fuel, setFuel] = useState("")
  const [time, setTime] = useState("10:00 AM")
  const [sort, setSort] = useState("recommended")

  const heading = useMemo(() => {
    if (!where || where === "Nearby") return "Cars near you"
    return `Cars in ${where}`
  }, [where])

  const matchCount = filterVehicles({
    location: where,
    category,
    price: price ? Number(price) : undefined,
    seats: seats ? Number(seats) : undefined,
    fuel: fuel || undefined,
  }).length

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-10 pb-28 md:px-8 md:py-16">
      {/* --- Catalog title --- */}
      <div className="max-w-3xl">
        <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">
          Inventory
        </p>
        <Reveal>
          <h1 className="mt-3 font-serif text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl">
            {heading}
          </h1>
        </Reveal>
        <p className="mt-4 text-sm text-muted-foreground">
          {matchCount} {matchCount === 1 ? "car" : "cars"} listed · Pickup at {time}
        </p>
      </div>

      {/* --- One search panel: place, dates, then the finer filters --- */}
      <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-3 md:p-4">
        <SearchCard initialWhere={where} initialFrom={from} initialTo={to} />
        {/* Two columns on a phone so the last filter is not trapped under the bottom nav. */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <FilterSelect label="Price" value={price} options={prices} onChange={setPrice} />
          <FilterSelect label="Seats" value={seats} options={seatChoices} onChange={setSeats} />
          <FilterSelect label="Fuel" value={fuel} options={fuels} onChange={setFuel} />
          <FilterSelect
            label="Sort"
            value={sort}
            options={[
              { label: "Recommended", value: "recommended" },
              { label: "Price: low to high", value: "price-asc" },
              { label: "Price: high to low", value: "price-desc" },
              { label: "Highest rated", value: "rating" },
            ]}
            onChange={setSort}
          />
          <FilterSelect
            label="Pickup time"
            value={time}
            options={pickupTimes.map((item) => ({ label: item, value: item }))}
            onChange={setTime}
          />
        </div>
        <ToggleGroup
          aria-label="Vehicle type"
          value={[category]}
          onValueChange={(next) => {
            const picked = next[0] as CategoryFilter | undefined
            if (picked) setCategory(picked)
          }}
          spacing={2}
          className="flex-wrap"
        >
          {categories.map((item) => (
            <ToggleGroupItem key={item} value={item} className="px-4">
              {item}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <VehicleGrid
        key={`${where}-${category}-${price}-${seats}-${fuel}`}
        location={where}
        category={category}
        price={price ? Number(price) : undefined}
        seats={seats ? Number(seats) : undefined}
        fuel={fuel || undefined}
        from={from}
        to={to}
        sort={sort as "recommended" | "price-asc" | "price-desc" | "rating"}
        pause
      />
    </section>
  )
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: readonly { label: string; value: string }[]
  onChange: (value: string) => void
}) {
  return (
    <label className="flex flex-col gap-1 text-xs tracking-[0.16em] text-muted-foreground uppercase">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-full border border-border bg-card px-4 text-sm tracking-normal text-foreground normal-case"
      >
        {options.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
