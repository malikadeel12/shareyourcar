"use client"

/**
 * What: the footer email line from the live site.
 * Why: the sentence was there, with nowhere to type an address.
 * Related: src/components/layout/site-footer.tsx
 * Note: this prototype does not send the address anywhere.
 */

import { useState } from "react"

import { Button } from "@/components/ui/button"

export function LoopForm() {
  const [joined, setJoined] = useState(false)

  if (joined) {
    return (
      <p className="text-sm leading-relaxed">
        Saved on this page only. Nothing was emailed.
      </p>
    )
  }

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(event) => {
        event.preventDefault()
        setJoined(true)
      }}
    >
      <label className="flex flex-col gap-1 text-xs tracking-[0.16em] text-muted-foreground uppercase">
        Email address
        <input
          required
          type="email"
          name="email"
          autoComplete="email"
          className="h-11 rounded-full border border-border bg-card px-4 text-sm tracking-normal text-foreground normal-case"
        />
      </label>
      <Button type="submit" className="w-fit">
        Subscribe
      </Button>
    </form>
  )
}
