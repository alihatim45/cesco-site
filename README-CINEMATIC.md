# CESCO cinematic homepage

The homepage now includes a bilingual cinematic solar hero with a 2.7-second panel pullback, diagonal light sweep, energy traces, staggered text, desktop pointer depth and magnetic links. English content sits left; Arabic content and image composition are mirrored to preserve legibility. The original CESCO navigation, brand and remaining pages are retained.

The former 3.5-second splash is replaced by this intro. The duplicate floating scroll control is hidden on the homepage; the hero has its own scroll cue. Solutions links to `/services`; consultation links to `/contact`.

## Run

Use Node.js 20 or later:

```sh
npm ci
npm run dev
```

Production files: run `npm run build`; serve `dist` through a host with SPA fallback to `index.html`. Nothing has been published. Existing contact integrations still require their original configuration. The distributable includes `.env.example`, not the original private `.env` or local tool configuration.

## Files and compatibility

- `src/components/CinematicHero.jsx`: motion, locale-aware copy, accessible links and scroll cue.
- `src/styles/cinematic-hero.css`: scoped responsive hero styling.
- `src/styles/index.css`: Tailwind v4 semantic solar tokens and layered legacy styling.
- `src/i18n/ar.json` and `en.json`: new `home.cinematic` translations.
- `public/images/cesco-solar-cinematic.png`: bundled generated artwork, no image hotlink.
- `index.html`: title, description, image preload and social metadata. Replace the relative social image URL with the final absolute hosted URL when a domain is chosen.

Tailwind is upgraded to v4 using `@tailwindcss/postcss`, with the existing Tailwind config loaded for compatibility. V4 targets modern browsers. The pre-existing dependency stack is otherwise retained; dependency security modernization is outside this visual change.

## Validation

Production build and local Edge checks cover Arabic/English at 1440×1000 and 390×844, no horizontal overflow, CTA routing, scroll cue, image loading and reduced-motion state. Additional checks cover the actual opening scale, pointer parallax and keyboard focus. No forms were submitted. Screenshots and results are retained separately in the working directory's `qa` folder.

The depth is a layered 2D treatment, not a navigable 3D solar model. Reduced motion skips the pullback and nonessential hero loops; touch layouts disable magnetic motion and pointer/scroll parallax.

## Artwork provenance

Generated using the built-in ImageGen tool and copied into `public/images/cesco-solar-cinematic.png`.

Final prompt:

Use case: photorealistic-natural. Asset type: locally bundled full-screen solar energy website hero background. Generate a cinematic ultra-realistic wide 16:9 photograph of a Gulf-scale solar farm in an Arabian desert at golden sunset. Close dark navy photovoltaic glass panels with fine realistic silver cell grids fill bottom two thirds, orderly rows receding to low rugged mountains and a distant desert horizon. Warm low sun at far right edge casts golden diagonal reflections across panel glass. Dark restrained charcoal left third offers negative space for white website headline. Spacious horizon, atmospheric amber sky, sophisticated engineering photography. No text, no logos, no UI, no watermarks, no illustrated energy lines. High resolution landscape.

## Confirmed baseline

Integrated onto the user-confirmed 9 August 2026 baseline, commit 1e7c049d7415506abe6ecf1eb3c3e93d11deaf6d from cesco-site. Modern service detail routes, calculator updates, product photography, expanded project gallery and Vercel Analytics are preserved.

## Text hover treatment

CESCO outlined wordmark beneath the hero adapted from Aceternity UI Text Hover Effect (https://ui.aceternity.com/components/text-hover-effect; registry https://ui.aceternity.com/registry/text-hover-effect.json). Uses the existing framer-motion dependency, gold/green gradients, instance-safe SVG IDs and static touch/reduced-motion fallbacks. Source attribution: Aceternity / Manu Arora, original contribution Sudhanshu Mishra. Licence: https://ui.aceternity.com/licence.

## Branded SVG loading state

Aceternity LoaderThree (https://ui.aceternity.com/components/loader; source registry https://ui.aceternity.com/registry/loader.json), adapted with CESCO green #30a84b and yellow #fec819. Displays only while the hero image loads/decodes, without a minimum waiting period. Image errors or a 10-second ceiling release the loader so content remains available. Reduced motion uses a static bolt. The bilingual status is announced politely and the header remains available.

## Service card spotlight

The homepage service cards use a lightweight adaptation of Aceternity UI Card Spotlight (https://ui.aceternity.com/components/card-spotlight; registry https://ui.aceternity.com/registry/card-spotlight.json). The radial glow and dot field follow a fine pointer using CESCO green and yellow. Touch and reduced-motion users receive a quiet static treatment. This version avoids the original WebGL canvas dependency, reducing bundle and GPU cost while retaining the interaction. Each card is one semantic link with a visible keyboard focus ring.

## Tracing beam

The homepage content below the hero is wrapped with a CESCO adaptation of Aceternity UI Tracing Beam (https://ui.aceternity.com/components/tracing-beam; registry https://ui.aceternity.com/registry/tracing-beam.json). The green-to-yellow beam follows scroll progress, moves to the logical start edge for Arabic/English, updates its height through ResizeObserver, remains static with reduced motion and is hidden below 768px to protect mobile content width.

## Glowing card effect

All content cards now share a lightweight CESCO-branded edge glow using the renewable green and solar gold palette. The implementation uses one delegated pointer listener for the entire site, discovers cards added during route changes, preserves each card's existing decorative pseudo-elements, and falls back to a restrained static border on touch devices and when reduced motion is requested.

Adapted for this project from the Aceternity UI Glowing Effect interaction pattern: https://ui.aceternity.com/components/glowing-effect

## CESCO lamp hero effect

The cinematic hero includes an Aceternity-inspired lamp treatment above the existing headline. Its animated beams, horizon line, core and ambient glow use the CESCO solar-gold and renewable-green palette, enter after the hero artwork loads, and retain a calm static state for reduced-motion users.

Reference: https://ui.aceternity.com/components/lamp-effect
