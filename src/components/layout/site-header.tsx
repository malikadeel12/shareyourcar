"use client"

/**
 * What: slim top navigation. About, How it works, and Contact sit with
 *       the other desktop links. Links hide on small screens, where the
 *       bottom bar takes over.
 * Why: those pages were only in the footer, so a desktop visitor could
 *      not reach them from the top.
 * Related: src/components/layout/bottom-nav.tsx, src/app/about/page.tsx
 * Note: MCP Context 7 — same pill style as the existing tabs. The phone
 *       bar stays Home, Search, Trips, Host, and Profile.
 */

import Link from "next/link"
import { usePathname } from "next/navigation"

import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Wordmark } from "@/components/layout/wordmark"
import { Button } from "@/components/ui/button"
import { cn } from "cn"

const links = [
  { href: "/", label: "Home" },
  { href: "/search", label: "Search" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/trips", label: "Trips" },
  { href: "/host", label: "Host" },
]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
        <Wordmark />
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            // Host is the fleet page only. /host-tools must not light this tab.
            const active =
              link.href === "/" || link.href === "/host"
                ? pathname === link.href
                : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-3 py-2 text-sm text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  active && "bg-muted text-foreground"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            nativeButton={false}
            render={<Link href="/become-host" />}
            className="hidden md:inline-flex"
          >
            Become a host
          </Button>
        </div>
      </div>
    </header>
  )
}
