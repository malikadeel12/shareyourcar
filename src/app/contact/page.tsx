/**
 * What: the contact page from the live support screen.
 * Why: email, the message form, and the short questions belong on their own page.
 * Related: src/components/contact/contact-form.tsx
 */

import type { Metadata } from "next"

import { ContactForm } from "@/components/contact/contact-form"
import { contactFaqs } from "@/data/site-pages"

export const metadata: Metadata = {
  title: "Contact",
}

export default function ContactPage() {
  return (
    <article className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">Support</p>
      <h1 className="mt-3 max-w-4xl font-serif text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl">
        Contact support
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Need help? Email us or send a message below. Most inquiries are answered within 24 hours. Trip support is open daily, 8 AM–8 PM ET, and urgent issues are prioritized.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-3xl border border-border p-6 md:p-8">
          <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">Email support</p>
          <h2 className="font-serif text-4xl tracking-[-0.03em]">Get in touch</h2>
          <p className="text-sm text-muted-foreground">
            Send a detailed message and the team writes back.
          </p>
          <a href="mailto:support@shareyourcar.us" className="text-lg">
            support@shareyourcar.us
          </a>
        </div>
        <ContactForm />
      </div>

      <section className="mt-16">
        <h2 className="font-serif text-4xl tracking-[-0.03em]">Questions</h2>
        <div className="mt-6 border-b border-border">
          {contactFaqs.map((item) => (
            <details key={item.question} className="group border-t border-border py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg [&::-webkit-details-marker]:hidden">
                {item.question}
                <span aria-hidden className="font-serif text-3xl leading-none group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </article>
  )
}
