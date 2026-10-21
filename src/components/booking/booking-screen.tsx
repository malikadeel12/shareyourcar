"use client"

/**
 * What changed: the phone booking sheet sits above the bottom nav.
 * Why: the nav was covering Continue, so the next step could not be tapped.
 * Related: src/components/layout/bottom-nav.tsx
 * Note: MCP Context 7 — one layout fix, the booking steps stay the same.
 */

/**
 * What: three-step booking. On a phone the steps sit in a bottom sheet.
 *       On a desktop they sit beside the car.
 * Why: a renter should see the car, the length of the trip, the protection
 *      choice, and the total before they confirm.
 * Related: src/lib/pricing.ts, src/components/trips/trips-screen.tsx
 * Business rule: total = daily rate × days + protection × days + 10% service fee.
 */

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import { ViewTransition } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ShieldCheck } from "lucide-react"

import { useMarketplace } from "@/components/providers/marketplace-provider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { getVehicle, sampleTrip } from "@/data/vehicles"
import { formatDayLong, formatMoney } from "@/lib/format"
import {
  protectionPlans,
  quoteTrip,
  type ProtectionPlanId,
} from "@/lib/pricing"
import { cn } from "cn"

const steps = ["Vehicle", "Protection", "Checkout"] as const

export function BookingScreen() {
  const route = useParams<{ vehicleId: string }>()
  const vehicleId = route.vehicleId
  const params = useSearchParams()
  const vehicle = vehicleId ? getVehicle(vehicleId) : undefined
  const { addTrip } = useMarketplace()
  const reduce = useReducedMotion()
  const [step, setStep] = useState(0)
  const [from, setFrom] = useState(params.get("from") || sampleTrip.from)
  const [to, setTo] = useState(params.get("to") || sampleTrip.to)
  const [planId, setPlanId] = useState<ProtectionPlanId>("bonzah-basic")
  const [cardName, setCardName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvc, setCvc] = useState("")
  const [zip, setZip] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [tripId, setTripId] = useState<string | null>(null)

  const quote = useMemo(() => {
    if (!vehicle) return null
    if (to < from) return null
    return quoteTrip({
      pricePerDay: vehicle.pricePerDay,
      from,
      to,
      protectionId: planId,
    })
  }, [from, planId, to, vehicle])

  if (!vehicleId) {
    return <section className="px-4 py-16" aria-busy="true" />
  }

  if (!vehicle) {
    return (
      <section className="mx-auto max-w-xl px-4 py-20">
        <h1 className="font-serif text-5xl">That car is not listed.</h1>
        <Button nativeButton={false} render={<Link href="/search" />} className="mt-6">
          Back to search
        </Button>
      </section>
    )
  }

  function confirm() {
    const nextErrors: Record<string, string> = {}
    if (cardName.trim().length < 2) nextErrors.cardName = "Enter the name on the card."
    if (cardNumber.replace(/\s/g, "").length < 16) {
      nextErrors.cardNumber = "Enter a 16-digit card number."
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) nextErrors.expiry = "Use MM/YY."
    if (cvc.length < 3) nextErrors.cvc = "Enter the security code."
    if (zip.length < 5) nextErrors.zip = "Enter a 5-digit ZIP code."
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0 || !quote) return

    const trip = addTrip({
      vehicleId: vehicle!.id,
      from,
      to,
      protectionId: planId,
    })
    setCardNumber("")
    setCvc("")
    setTripId(trip.id)
  }

  const panel = tripId ? (
    <div className="flex flex-col items-start gap-4 py-6">
      <SuccessMark reduce={Boolean(reduce)} />
      <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
        Trip confirmed
      </p>
      <h2 className="font-serif text-5xl leading-none tracking-[-0.04em]">
        You are booked.
      </h2>
      <p className="max-w-sm text-sm text-muted-foreground">
        {vehicle.title} · {formatDayLong(from)} to {formatDayLong(to)}. Your
        reference is {tripId}. Identity verification via Stripe / Persona is
        marked complete for this prototype.
      </p>
      <Button nativeButton={false} render={<Link href="/trips" />} size="lg">
        View your trips
      </Button>
    </div>
  ) : (
    <div className="flex flex-col gap-6">
      <ol aria-label="Booking steps" className="flex gap-4">
        {steps.map((label, index) => (
          <li key={label} className="flex flex-col gap-1">
            <span
              className={cn(
                "text-xs tracking-[0.16em] uppercase",
                index === step ? "text-foreground" : "text-muted-foreground"
              )}
            >
              0{index + 1} {label}
            </span>
            <span
              className={cn(
                "h-0.5 w-14",
                index === step ? "bg-primary" : "bg-border"
              )}
            />
          </li>
        ))}
      </ol>

      {step === 0 ? (
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="font-serif text-4xl tracking-[-0.03em]">{vehicle.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{vehicle.location}</p>
          </div>
          <FieldGroup>
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="trip-start">Start date</FieldLabel>
                <Input
                  id="trip-start"
                  type="date"
                  className="h-11"
                  value={from}
                  onChange={(event) => setFrom(event.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="trip-end">End date</FieldLabel>
                <Input
                  id="trip-end"
                  type="date"
                  className="h-11"
                  value={to}
                  min={from}
                  onChange={(event) => setTo(event.target.value)}
                />
              </Field>
            </div>
          </FieldGroup>
          <p className="font-serif text-3xl">
            {quote ? `${quote.days} day${quote.days === 1 ? "" : "s"}` : "Choose an end date after the start."}
          </p>
          <Button size="lg" disabled={!quote} onClick={() => setStep(1)}>
            Continue to protection
          </Button>
        </div>
      ) : null}

      {step === 1 ? (
        <fieldset className="flex flex-col gap-3">
          <legend className="mb-2 font-serif text-4xl tracking-[-0.03em]">
            Trip protection
          </legend>
          {protectionPlans.map((plan) => {
            const selected = plan.id === planId
            return (
              <label
                key={plan.id}
                className={cn(
                  "cursor-pointer rounded-3xl border border-border bg-card p-4 transition-transform active:scale-[0.97]",
                  selected && "border-primary bg-accent"
                )}
              >
                <input
                  type="radio"
                  name="protection"
                  className="sr-only"
                  checked={selected}
                  onChange={() => setPlanId(plan.id)}
                />
                <span className="flex items-start justify-between gap-3">
                  <span>
                    <span className="block text-base font-semibold tracking-tight">
                      {plan.name}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {plan.summary}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm font-semibold">
                    {formatMoney(plan.pricePerDay)}/day
                  </span>
                </span>
              </label>
            )
          })}
          <p className="text-xs text-muted-foreground">
            Share Your Car is not an insurance company. Bonzah is the licensed
            broker of record for trip protection offered at checkout.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setStep(0)}>
              Back
            </Button>
            <Button onClick={() => setStep(2)}>Continue to checkout</Button>
          </div>
        </fieldset>
      ) : null}

      {step === 2 && quote ? (
        <div className="flex flex-col gap-5">
          <h2 className="font-serif text-4xl tracking-[-0.03em]">Checkout</h2>
          <dl className="flex flex-col gap-2 text-sm" aria-live="polite">
            <div className="flex justify-between gap-4">
              <dt>Daily rate · {formatMoney(vehicle.pricePerDay)} × {quote.days}</dt>
              <dd>{formatMoney(quote.daily)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>{quote.protectionName}</dt>
              <dd>{formatMoney(quote.protection)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Service fee</dt>
              <dd>{formatMoney(quote.serviceFee)}</dd>
            </div>
            <Separator />
            <div className="flex justify-between gap-4 text-base font-semibold">
              <dt>Total</dt>
              <dd>{formatMoney(quote.total)}</dd>
            </div>
          </dl>

          <FieldGroup>
            <Field data-invalid={Boolean(errors.cardName) || undefined}>
              <FieldLabel htmlFor="card-name">Name on card</FieldLabel>
              <Input
                id="card-name"
                autoComplete="cc-name"
                aria-invalid={Boolean(errors.cardName)}
                className="h-11"
                value={cardName}
                onChange={(event) => setCardName(event.target.value)}
              />
              <FieldError>{errors.cardName}</FieldError>
            </Field>
            <Field data-invalid={Boolean(errors.cardNumber) || undefined}>
              <FieldLabel htmlFor="card-number">Card number</FieldLabel>
              <Input
                id="card-number"
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="1234 1234 1234 1234"
                aria-invalid={Boolean(errors.cardNumber)}
                className="h-11"
                value={cardNumber}
                onChange={(event) => {
                  const digits = event.target.value.replace(/\D/g, "").slice(0, 16)
                  setCardNumber(digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim())
                }}
              />
              <FieldError>{errors.cardNumber}</FieldError>
            </Field>
            <div className="grid grid-cols-3 gap-3">
              <Field data-invalid={Boolean(errors.expiry) || undefined}>
                <FieldLabel htmlFor="card-expiry">Expiry</FieldLabel>
                <Input
                  id="card-expiry"
                  autoComplete="cc-exp"
                  placeholder="MM/YY"
                  aria-invalid={Boolean(errors.expiry)}
                  className="h-11"
                  value={expiry}
                  onChange={(event) => {
                    const digits = event.target.value.replace(/\D/g, "").slice(0, 4)
                    setExpiry(
                      digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
                    )
                  }}
                />
                <FieldError>{errors.expiry}</FieldError>
              </Field>
              <Field data-invalid={Boolean(errors.cvc) || undefined}>
                <FieldLabel htmlFor="card-cvc">CVC</FieldLabel>
                <Input
                  id="card-cvc"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  aria-invalid={Boolean(errors.cvc)}
                  className="h-11"
                  value={cvc}
                  onChange={(event) =>
                    setCvc(event.target.value.replace(/\D/g, "").slice(0, 4))
                  }
                />
                <FieldError>{errors.cvc}</FieldError>
              </Field>
              <Field data-invalid={Boolean(errors.zip) || undefined}>
                <FieldLabel htmlFor="card-zip">ZIP</FieldLabel>
                <Input
                  id="card-zip"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  aria-invalid={Boolean(errors.zip)}
                  className="h-11"
                  value={zip}
                  onChange={(event) =>
                    setZip(event.target.value.replace(/\D/g, "").slice(0, 5))
                  }
                />
                <FieldError>{errors.zip}</FieldError>
              </Field>
            </div>
          </FieldGroup>

          <Badge variant="outline" className="h-auto px-3 py-1">
            <ShieldCheck data-icon="inline-start" />
            Identity verification via Stripe / Persona
          </Badge>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button size="lg" onClick={confirm}>
              Confirm {formatMoney(quote.total)}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )

  return (
    <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 md:grid-cols-12 md:px-8 md:py-10">
      <div className="md:col-span-5">
        <ViewTransition name={`car-${vehicle.id}`}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-muted md:aspect-[4/5]">
            <Image
              src={vehicle.images[0]}
              alt={vehicle.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </ViewTransition>
        <p className="mt-4 text-sm text-muted-foreground">
          {vehicle.host.name} · Verified host · {vehicle.host.responseRate}% response rate
        </p>
      </div>
      <div className="max-md:fixed max-md:inset-x-0 max-md:bottom-[4.5rem] max-md:z-30 max-md:max-h-[70dvh] max-md:overflow-y-auto max-md:rounded-t-3xl max-md:border max-md:border-border max-md:bg-card max-md:p-4 max-md:pb-4 md:col-span-7 md:px-4">
        <div aria-hidden className="mx-auto mb-3 h-1 w-10 rounded-full bg-border md:hidden" />
        {panel}
      </div>
    </section>
  )
}

function SuccessMark({ reduce }: { reduce: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 72 72"
      className="size-16 text-secondary"
      aria-hidden
      initial={reduce ? false : { scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <motion.circle
        cx="36"
        cy="36"
        r="28"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.35 }}
      />
      <motion.path
        d="M23 37.5 L32 46 L49 27"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      />
    </motion.svg>
  )
}
