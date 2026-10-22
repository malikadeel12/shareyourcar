"use client"

/**
 * What: fixed mobile navigation with a sliding black pill.
 * Why: the phone layout should feel like a product, while desktop
 *      keeps the slim header.
 * Related: src/components/layout/site-header.tsx
 */

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CalendarRange, House, Search, UserRound, Warehouse } from "lucide-react"
import { motion } from "framer-motion"

import { cn } from "cn"

const items = [
  { href: "/", label: "Home", icon: House },
  { href: "/search", label: "Search", icon: Search },
  { href: "/trips", label: "Trips", icon: CalendarRange },
  { href: "/host", label: "Host", icon: Warehouse },
  { href: "/profile", label: "Profile", icon: UserRound },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-3 bottom-3 z-40 rounded-full border border-border bg-card p-1 md:hidden"
    >
      <ul className="grid grid-cols-5">
        {items.map((item) => {
          // Host is the fleet page only. /host-tools must not light this tab.
          const active =
            item.href === "/" || item.href === "/host"
              ? pathname === item.href
              : pathname.startsWith(item.href)
          const Icon = item.icon
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex flex-col items-center gap-0.5 rounded-full px-1 py-2 text-[10px] tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  active ? "text-primary-foreground" : "text-muted-foreground"
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="mobile-nav-pill"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                ) : null}
                <Icon className="relative size-4" aria-hidden />
                <span className="relative">{item.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
