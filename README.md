# ZBrou Scripts Store

Official independent storefront for ZBrou PhraseKill, built on Nuxt 3, Vue and the Tebex Headless API, deployed to Cloudflare Pages.

## Included

- Dark-blue ZBrou branding and responsive product-first storefront.
- Scroll-controlled 3D PhraseKill section and interactive visual concept demo.
- A live price and purchase button ONLY if a PhraseKill package is published through Tebex.
- Video preview, documentation, FAQs and accessibility/reduced-motion alternatives.
- Aggregate live telemetry scaffold with safe disconnected state (never fake customers, server counts or sales).

## Cloudflare configuration

Production branch: main
Build command: npm run build
Build directory: dist
Framework: Nuxt.js

Environment variables:
- NITRO_PRESET = cloudflare_pages
- NUXT_PUBLIC_API_PUBLIC_KEY = Tebex public token

The demo-store fallback public token is removed from source.

Do not put any private key in the repository or a chat. To support operations requiring a private Tebex API key, regenerate the previously exposed key first, and enter the fresh one in Cloudflare Pages -> Settings -> Variables and Secrets as:
- Name: NUXT_API_PRIVATE_KEY
- Type: Secret
Never use a NUXT_PUBLIC_ name for this secret.

## PhraseKill

The storefront checks the actual published Tebex product list for PhraseKill (known product ID 7706999, with a name fallback). When absent, it labels the item as unpublished and disables purchases; it does not invent a commercial price. The live checkout must be verified before release.

## Real server usage metrics

The public /api/usage route displays ONLY verified aggregate statistics from a trusted HTTPS source.

By default the page shows no values, because no live server instrumentation has been connected.

Optional secrets for the backend:
- NUXT_ZBROU_USAGE_ENDPOINT = secure HTTPS URL for opt-in aggregate usage.
- NUXT_ZBROU_USAGE_TOKEN = optional bearer token, stored as a Secret.

Example upstream schema (illustrative data, NOT actual ZBrou totals):

    {
      "serversActive": 12,
      "playersOnline": 220,
      "installations": 58,
      "updatedAt": "2026-10-08T18:00:00Z",
      "recentActivity": [
        { "type": "activation", "time": "2026-10-08T17:57:00Z" }
      ]
    }

The backend only publishes anonymized aggregate counts and two allowed event types (activation, heartbeat). No buyer names or IP addresses. An opt-in FiveM heartbeat aggregation backend must be built before this can go live.

## Development

    npm ci
    npm run dev
    npm run build

The design branch is design/phrasekill-showcase. Automated builds run through GitHub Actions on the draft PR. Merge only after checking the Nuxt build, Cloudflare preview, desktop/mobile layout and live Tebex purchase behavior.

Useful links:
- https://docs.tebex.io/developers/headless-api/overview
- https://github.com/zbrouscripts/docs
- https://github.com/tebexio/Headless-Template
