# Visual audit: Argix V2 vs https://nexavoxa.com/  (status: NOT VERIFIED)

## What could and could not be observed
- Observed: the page text and structure of nexavoxa.com (title, meta tags, section order, headings, link labels, image file names), read with the page-reading tool.
- NOT observable from this build environment: colours, gradients, fonts, spacing, shadows, hover effects, animation, screenshots.
  The sandbox cannot resolve nexavoxa.com or argix.net (DNS failure; only package registries and a few developer hosts resolve),
  and the page reader returns text, not rendering.
- Therefore no colour/typography/spacing/hover claim about Nexavoxa is made here. Build success and functional tests prove nothing about visual similarity.

## One signal that needs your decision
Several integration icons on Nexavoxa are requested in white (`.../ffffff`) for brands whose logos are normally black. That pattern is
only needed on a dark background, so at least that section of Nexavoxa is probably dark. Your earlier brief asked for a white/light-dominant
site "like Nexavoxa". Both cannot be assumed true. Please confirm which you want: light-dominant (current) or dark sections like the reference.

## Pattern-level comparison (from page structure only)
| Area | Nexavoxa (from page text) | Argix V2 now | Match |
|---|---|---|---|
| Navigation | Mega-menus (Products, Industries, Solutions) plus Features, Enterprise, Pricing, Blog, CTA button | Flat 6 links plus "Let's Talk" | Differs |
| Hero | Headline, subcopy, live voice widget, CTA | Headline, subcopy, 2 CTAs, animated illustration | Partial |
| Numbered story | 01-05 steps paired with product screenshots | 01-06 numbered stages, text only | Partial |
| Product UI mock-ups | Full dashboard screens (agents, numbers, campaigns, logs, analytics) | Window mock-ups in hero and AI demo only | Partial |
| Use-case tabs | Tabs with sample conversations | Industry list + detail panel; AI demo chips | Partial |
| Integrations grid | 20 brand logos | Text technology chips (marquee) | Differs |
| Enterprise grid | 6 capability cards | 4 security-department cards + security section | Partial |
| Technical Q&A | Category tabs + long answers | Plain accordion FAQ | Partial |
| Customers | Wall of 12 names | 5 client names as text (logos not yet available) | Partial |
| Blog on home | 3 article cards | None (blog hub has 1 article) | Differs |
| Final CTA | Headline + 3-step "we do the building" | Teal panel, headline, 2 CTAs, contact links | Partial |
| Footer | Multi-column, social, legal, status | 5 columns, contact, legal | Partial |
| Colours / gradients / type / spacing / cards / hover / motion | not observable | see measured Argix values below | UNVERIFIED |

## Measured Argix values (real, from the built site in headless Chromium at 1440px)
Body #FFFFFF, text rgb(17,21,24), font Manrope; H1 ~62px / weight 800; primary button rgb(15,76,87) pill (999px radius), white text;
cards radius 24-28px with 1px border and soft shadow; alternate sections #F8F9F7. Full data: run the helper below.

## How to make this a real audit (one command, on your machine)
    npm i -D puppeteer
    npm run build && npm run preview          # note the local URL, e.g. http://localhost:4173/
    node docs/visual-audit/capture.mjs https://nexavoxa.com/ http://localhost:4173/
Send back `docs/visual-audit/out/` (screenshots + measured colours, fonts, radii, shadows) or any screenshots of nexavoxa.com.
The helper was tested here against the local Argix preview only; it has not been run against nexavoxa.com.
