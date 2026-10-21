"use client"

/**
 * What: the contact form from the live support page.
 * Why: visitors should see the same fields. This prototype does not email anyone.
 * Related: src/app/contact/page.tsx, src/data/site-pages.ts
 */

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { contactCategories } from "@/data/site-pages"

export function ContactForm() {
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <p className="rounded-3xl border border-border px-6 py-8 text-sm leading-relaxed">
        This prototype does not send the message. Email support@shareyourcar.us and you will get a reply within 24 hours.
      </p>
    )
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault()
        setSent(true)
      }}
    >
      <label className="flex flex-col gap-1 text-xs tracking-[0.16em] text-muted-foreground uppercase">
        Email
        <input
          required
          type="email"
          name="email"
          className="h-11 rounded-full border border-border bg-card px-4 text-sm tracking-normal text-foreground normal-case"
        />
      </label>
      <label className="flex flex-col gap-1 text-xs tracking-[0.16em] text-muted-foreground uppercase">
        Category
        <select
          name="category"
          className="h-11 rounded-full border border-border bg-card px-4 text-sm tracking-normal text-foreground normal-case"
        >
          {contactCategories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-xs tracking-[0.16em] text-muted-foreground uppercase">
        Subject
        <input
          required
          type="text"
          name="subject"
          className="h-11 rounded-full border border-border bg-card px-4 text-sm tracking-normal text-foreground normal-case"
        />
      </label>
      <label className="flex flex-col gap-1 text-xs tracking-[0.16em] text-muted-foreground uppercase">
        Message
        <textarea
          required
          name="message"
          rows={5}
          className="rounded-3xl border border-border bg-card px-4 py-3 text-sm tracking-normal text-foreground normal-case"
        />
      </label>
      <Button type="submit" size="lg" className="w-fit">
        Send message
      </Button>
    </form>
  )
}
