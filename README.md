# Share Your Car prototype

A front-end prototype of [Share Your Car](https://shareyourcar.us), a peer-to-peer car marketplace. Cars, cities, daily rates, and protection language come from the live site. Payments, identity checks, and digital keys are simulated.

## Run it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Screens

| Route | What you can do |
| --- | --- |
| `/` | Search by city and dates, filter by vehicle type, save a car, open a listing |
| `/search` | The same catalog, with the search you just made |
| `/book/[id]` | Three steps: trip length, Bonzah or Roamly protection, card-style checkout |
| `/trips` | Upcoming, active, and past trips, plus a digital key and a note to the host |
| `/host` | Earnings, fleet availability, and a pending Stripe payout |
| `/profile` | Renter identity and the light / dark switch |

Try a booking with card `4242 4242 4242 4242`, any future `MM/YY`, and any 3-digit CVC. The new trip shows under Upcoming.

## Design tokens

| Token | Value | Use |
| --- | --- | --- |
| Ink | `#0B0F14` | Text, buttons, and the active nav pill |
| Paper | `#F5F2EC` | Page background, and dark-mode text |
| Surface | `#FFFFFF` | Cards |
| Espresso | `#1A1612` | Support bar and dark story panels |
| Stone | `#3E4650` | Confirmed and verified states |
| Amber | `#F59E0B` | Pending states |

Display type is Instrument Serif. Interface type is Geist. Radii are 16px for controls, 24px for sheets, and a full pill for buttons. The same values live in `src/data/tokens.ts` and `src/app/globals.css`.

## Notes

Share Your Car is not an insurance company. Bonzah is the licensed broker named on the live site. The Roamly plan is the second checkout option in this prototype, priced at $25 per day. Nothing here charges a card or unlocks a car.
