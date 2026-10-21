"use client"

/**
 * What changed: the current trip is a full photo, and the other trips are a quiet list.
 * Why: three identical cards did not feel like a personal trip. The car you are in should lead.
 * Related: src/data/bookings.ts, src/components/providers/marketplace-provider.tsx
 * Note: MCP Context 7 — same tabs, key, and host note. Only the layout changed.
 * Business rule: the note is stored on this screen only. This prototype does not message the host.
 */

/**
 * What: renter dashboard with upcoming, active, and past trips.
 * Why: after booking, the renter needs the pickup details, the host, and a
 *      digital key without leaving the prototype.
 * Related: src/data/bookings.ts
 */

import { useState } from "react"
import Image from "next/image"
import { KeyRound, MessageSquare } from "lucide-react"

import { useMarketplace } from "@/components/providers/marketplace-provider"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { renterName, type Trip } from "@/data/bookings"
import { getVehicle } from "@/data/vehicles"
import { formatDayLong, formatMoney } from "@/lib/format"
import { quoteTrip } from "@/lib/pricing"

type TabId = "upcoming" | "active" | "past"

export function TripsScreen() {
  const { trips } = useMarketplace()
  const [tab, setTab] = useState<TabId>("active")
  const [keyTrip, setKeyTrip] = useState<Trip | null>(null)
  const [noteTrip, setNoteTrip] = useState<Trip | null>(null)
  const [note, setNote] = useState("")
  const [sent, setSent] = useState(false)

  const groups: Record<TabId, Trip[]> = {
    upcoming: trips.filter((trip) => trip.status === "Confirmed"),
    active: trips.filter((trip) => trip.status === "In Progress"),
    past: trips.filter((trip) => trip.status === "Completed"),
  }

  function openNote(trip: Trip) {
    setNoteTrip(trip)
    setSent(false)
    setNote("")
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 pb-28 md:px-8 md:py-16">
      <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">
        Your trips
      </p>
      <h1 className="mt-3 font-serif text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl">
        Welcome back, Renter
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">{renterName}</p>

      <Tabs
        value={tab}
        onValueChange={(value) => setTab(value as TabId)}
        className="mt-10"
      >
        <TabsList variant="line">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        {(Object.keys(groups) as TabId[]).map((key) => {
          const [lead, ...rest] = groups[key]
          const showStage = key !== "past"
          return (
            <TabsContent key={key} value={key} className="mt-8 flex flex-col gap-8">
              {groups[key].length === 0 ? (
                <EmptyTrips label={key} />
              ) : (
                <>
                  {showStage && lead ? (
                    <TripStage trip={lead} onKey={() => setKeyTrip(lead)} onNote={() => openNote(lead)} />
                  ) : null}
                  <div>
                    {(showStage ? rest : groups[key]).map((trip) => (
                      <TripRow
                        key={trip.id}
                        trip={trip}
                        onKey={() => setKeyTrip(trip)}
                        onNote={() => openNote(trip)}
                      />
                    ))}
                  </div>
                </>
              )}
            </TabsContent>
          )
        })}
      </Tabs>

      <Drawer open={Boolean(keyTrip)} onOpenChange={(open) => !open && setKeyTrip(null)}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Digital key and receipt</DrawerTitle>
            <DrawerDescription>
              {keyTrip
                ? `${getVehicle(keyTrip.vehicleId)?.title ?? "Vehicle"} · ${keyTrip.id}`
                : "Trip record"}
            </DrawerDescription>
          </DrawerHeader>
          <div className="max-h-[70dvh] overflow-y-auto">
            {keyTrip ? <KeyPanel trip={keyTrip} /> : null}
          </div>
        </DrawerContent>
      </Drawer>

      <Drawer open={Boolean(noteTrip)} onOpenChange={(open) => !open && setNoteTrip(null)}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Contact host</DrawerTitle>
            <DrawerDescription>
              {noteTrip
                ? `A note to ${getVehicle(noteTrip.vehicleId)?.host.name ?? "your host"}. Trip support answers most inquiries within 24 hours.`
                : "Message your host"}
            </DrawerDescription>
          </DrawerHeader>
          <form
            className="flex flex-col gap-3 px-4 pb-6"
            onSubmit={(event) => {
              event.preventDefault()
              if (note.trim().length < 2) return
              setSent(true)
            }}
          >
            <Textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Where should we meet, and is the car ready?"
              aria-label="Message to host"
            />
            <Button type="submit">Send note</Button>
            {sent ? (
              <p role="status" className="text-sm text-muted-foreground">
                Your note is queued for the host. This prototype does not send it.
              </p>
            ) : null}
          </form>
        </DrawerContent>
      </Drawer>
    </section>
  )
}

function EmptyTrips({ label }: { label: TabId }) {
  const line =
    label === "active"
      ? "No trip is on the road right now."
      : label === "upcoming"
        ? "Nothing is booked ahead."
        : "Completed trips will sit here."
  return (
    <div className="border-t border-border py-16">
      <p className="font-serif text-4xl tracking-[-0.03em]">{line}</p>
    </div>
  )
}

function TripStage({
  trip,
  onKey,
  onNote,
}: {
  trip: Trip
  onKey: () => void
  onNote: () => void
}) {
  const vehicle = getVehicle(trip.vehicleId)
  if (!vehicle) return null

  return (
    <article className="relative min-h-[24rem] overflow-hidden rounded-3xl bg-ink text-paper md:min-h-[32rem]">
      <Image
        src={vehicle.images[0]}
        alt=""
        fill
        sizes="(max-width: 1280px) 100vw, 1200px"
        className="object-cover"
        priority
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(11,15,20,0.88) 0%, rgba(11,15,20,0.25) 48%, rgba(11,15,20,0.15) 100%)",
        }}
      />
      <div className="relative flex min-h-[24rem] flex-col justify-end p-6 md:min-h-[32rem] md:p-10">
        <p className="text-xs tracking-[0.22em] text-paper/70 uppercase">
          {trip.status} · {trip.id}
        </p>
        <h2 className="mt-3 max-w-3xl font-serif text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl">
          {vehicle.title}
        </h2>
        <p className="mt-4 text-sm text-paper/80">
          {vehicle.location} · {formatDayLong(trip.from)} – {formatDayLong(trip.to)} · {vehicle.host.name}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button type="button" onClick={onNote} className="border-paper/30 bg-transparent text-paper hover:bg-paper/10">
            <MessageSquare data-icon="inline-start" />
            Contact Host
          </Button>
          <Button type="button" onClick={onKey} className="bg-paper text-ink hover:bg-paper/90">
            <KeyRound data-icon="inline-start" />
            View Digital Key / Receipt
          </Button>
        </div>
      </div>
    </article>
  )
}

function TripRow({
  trip,
  onKey,
  onNote,
}: {
  trip: Trip
  onKey: () => void
  onNote: () => void
}) {
  const vehicle = getVehicle(trip.vehicleId)
  if (!vehicle) return null
  const quiet = trip.status === "Completed"

  return (
    <article className="grid items-center gap-4 border-t border-border py-6 md:grid-cols-[9rem_1fr_auto]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
        <Image src={vehicle.images[0]} alt="" fill sizes="144px" className="object-cover" />
      </div>
      <div>
        <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
          {trip.status} · {trip.id}
        </p>
        <h2 className="mt-1 font-serif text-3xl tracking-[-0.03em]">{vehicle.title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {vehicle.location}
          <br />
          {formatDayLong(trip.from)} – {formatDayLong(trip.to)}
        </p>
      </div>
      {quiet ? null : (
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={onNote}>
            <MessageSquare data-icon="inline-start" />
            Contact Host
          </Button>
          <Button onClick={onKey}>
            <KeyRound data-icon="inline-start" />
            View Digital Key / Receipt
          </Button>
        </div>
      )}
    </article>
  )
}

function KeyPanel({ trip }: { trip: Trip }) {
  const vehicle = getVehicle(trip.vehicleId)
  if (!vehicle) return null
  const quote = quoteTrip({
    pricePerDay: vehicle.pricePerDay,
    from: trip.from,
    to: trip.to,
    protectionId: trip.protectionId,
  })

  return (
    <div className="grid gap-8 px-4 pb-8 md:grid-cols-2">
      <div className="flex flex-col items-start gap-3">
        <p className="font-serif text-4xl tracking-tight">{trip.id}</p>
        <KeyMark seed={trip.id} />
        <p className="text-sm text-muted-foreground">
          Show this code at pickup. It is a mock key for {trip.id}, not a live lock.
        </p>
      </div>
      <CardContent className="px-0">
        <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">Receipt</p>
        <dl className="mt-4 flex flex-col gap-3 text-sm">
          <div className="flex justify-between border-b border-border pb-3"><dt>Daily rate</dt><dd>{formatMoney(quote.daily)}</dd></div>
          <div className="flex justify-between border-b border-border pb-3"><dt>Protection</dt><dd>{formatMoney(quote.protection)}</dd></div>
          <div className="flex justify-between border-b border-border pb-3"><dt>Service fee</dt><dd>{formatMoney(quote.serviceFee)}</dd></div>
          <div className="flex justify-between font-serif text-3xl"><dt>Total</dt><dd>{formatMoney(quote.total)}</dd></div>
        </dl>
      </CardContent>
    </div>
  )
}

function KeyMark({ seed }: { seed: string }) {
  let hash = 7
  const cells: boolean[] = []
  for (let index = 0; index < 121; index += 1) {
    hash = (hash * 33 + seed.charCodeAt(index % seed.length)) >>> 0
    const col = index % 11
    const row = Math.floor(index / 11)
    const finder =
      (row < 3 && col < 3) || (row < 3 && col > 7) || (row > 7 && col < 3)
    cells.push(finder || hash % 3 !== 0)
  }

  return (
    <svg viewBox="0 0 11 11" className="size-40 rounded-2xl bg-card p-2 text-foreground" role="img" aria-label={`Digital key pattern for ${seed}`}>
      {cells.map((on, index) =>
        on ? (
          <rect
            key={index}
            x={index % 11}
            y={Math.floor(index / 11)}
            width="0.85"
            height="0.85"
            fill="currentColor"
          />
        ) : null
      )}
    </svg>
  )
}
