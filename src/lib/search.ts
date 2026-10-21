/**
 * What: builds the search URL the home form and listing cards share.
 * Why: dates chosen on the home screen have to survive into booking.
 * Related: src/components/home/search-card.tsx
 */

export function searchHref(input: {
  where?: string
  from?: string
  to?: string
  type?: string
}) {
  const params = new URLSearchParams()
  if (input.where) params.set("where", input.where)
  if (input.from) params.set("from", input.from)
  if (input.to) params.set("to", input.to)
  if (input.type && input.type !== "All") params.set("type", input.type)
  const query = params.toString()
  return query ? `/search?${query}` : "/search"
}

export function bookHref(id: string, from?: string, to?: string) {
  const params = new URLSearchParams()
  if (from) params.set("from", from)
  if (to) params.set("to", to)
  const query = params.toString()
  return query ? `/book/${id}?${query}` : `/book/${id}`
}
