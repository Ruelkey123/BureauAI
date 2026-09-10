---
name: BureauAI
description: The compliance department for NYC businesses — a machined graphite instrument, not a lit screen.
colors:
  void: "#0e1013"
  panel: "#16191e"
  panel-hi: "#1c2027"
  hair: "#2a2f37"
  hair-bright: "#3b424d"
  ink: "#f2f4f7"
  ink-2: "#a8b2bf"
  ink-3: "#7d8896"
  signal: "#c8ff3c"
  signal-deep: "#a4d81c"
  warn: "#f0a93b"
  flag: "#ff6152"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 5.4vw, 4.6rem)"
    fontWeight: 600
    lineHeight: 0.96
    letterSpacing: "-0.042em"
  plate:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(8rem, 23vw, 19rem)"
    fontWeight: 600
    lineHeight: 0.72
    letterSpacing: "-0.055em"
  head:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 4vw, 3.1rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 300
    lineHeight: 1.6
    letterSpacing: "normal"
  xl:
    fontFamily: "Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  lg:
    fontFamily: "Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  md:
    fontFamily: "Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 300
    lineHeight: 1.55
    letterSpacing: "normal"
  sm:
    fontFamily: "Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.88rem"
    fontWeight: 300
    lineHeight: 1.6
    letterSpacing: "normal"
  xs:
    fontFamily: "Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 300
    lineHeight: 1.5
    letterSpacing: "normal"
  2xs:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.7rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.08em"
  figure:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
  micro:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.625rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.1em"
rounded:
  none: "0"
  dot: "50%"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "28px"
  xl: "48px"
  section: "80px"
components:
  button-primary:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.void}"
    typography: "{typography.micro}"
    rounded: "{rounded.none}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "transparent"
    textColor: "{colors.signal}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.micro}"
    rounded: "{rounded.none}"
    padding: "14px 24px"
  button-secondary-hover:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
  panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
  panel-raised:
    backgroundColor: "{colors.panel-hi}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
  input:
    backgroundColor: "{colors.void}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  input-focus:
    backgroundColor: "{colors.void}"
    textColor: "{colors.ink}"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.signal}"
    typography: "{typography.micro}"
    rounded: "{rounded.none}"
    padding: "0.3em 0.55em"
---

# BureauAI Design System

Recorded from the shipped build, not from intention. Where the direction contract and the build diverge, this file describes the build.

## Overview

BureauAI absorbs the bureaucracy a New York City business answers to. The surface is built as a **machined instrument** — graphite stock, milled finish, hairline structure, engraved figures — deliberately opposed to both the paper-and-cream world of its own pitch deck and the lit-screen "AI product" page it replaced.

The organizing device is the **compliance grade plate**: a banded metal plate carrying a single struck grade character. It leads the landing hero and reappears in the dashboard as the score panel, which is what makes the marketing surface and the product surface read as one object.

Two rules carry most of the identity:

1. **Structure is ruled, not boxed.** Hairlines and ruled rows do the work that cards and shadows do elsewhere. Same-size cards of icon-plus-heading-plus-text are not part of this system.
2. **Depth is milled, never lit.** A one-pixel top bevel and a real offset-and-blur shadow. No glow, no halo, no glass, no gradient text.

## Colors

**Strategy: restrained.** A graphite neutral ramp plus one brand accent, with two further colours admitted *only* as functional state.

| Token | Value | Role |
|---|---|---|
| `void` | `#0e1013` | Page ground. The dominant field. |
| `panel` | `#16191e` | Panels milled one value above ground. |
| `panel-hi` | `#1c2027` | Raised stock — the grade plate, the lead pricing column, badge grounds. |
| `hair` | `#2a2f37` | The structural hairline. Does the work shadows do on paper. |
| `hair-bright` | `#3b424d` | Interactive borders — inputs, secondary buttons. |
| `ink` | `#f2f4f7` | Primary text. |
| `ink-2` | `#a8b2bf` | Secondary text. Cold-tinted, never neutral grey. |
| `ink-3` | `#7d8896` | Labels, captions, disabled. Cold-tinted. |
| `signal` | `#c8ff3c` | The one brand accent. Live edges, primary actions, positive state. |
| `warn` | `#f0a93b` | **State only:** "due soon". |
| `flag` | `#ff6152` | **State only:** "overdue / open violation". |

Secondary text tints stay in the blue family. A neutral grey on this ground reads as dead pixels rather than as a value step.

**`warn` and `flag` are ink, never ground.** They colour a figure or a status word. They may not paint a field, wash, badge ground or border. The measured discipline on the dashboard is roughly 69% signal to 31% warn across saturated pixels; when warn starts winning that ratio, it has become decoration.

## Typography

Three faces, each with one job.

- **Archivo** — display only. Uppercase, pulled to `-0.035em`/`-0.042em`, `line-height` under 1. Headings and the grade plate.
- **Public Sans** — body. The US federal government's own typeface: the working voice of the bureaucracy this product absorbs. Weight 300 for prose, 400–500 for UI.
- **Geist Mono** — every fee, date, count, label and status. `font-variant-numeric: tabular-nums` is global for anything marked `[data-figure]`, `.tabular` or inside a `table`.

The ramp is `plate` → `lede` → `head` → `figure` → `xl` → `lg` → `md` → `base` → `sm` → `xs` → `2xs` → `micro`, defined once in `tailwind.config.ts` and overriding Tailwind's defaults. An arbitrary `text-[…rem]` is off-system. `micro` (0.625rem, `0.1em` tracking, uppercase, mono) is the label voice and appears as column heads, meta rows and status words.

**Body measure is capped at 66ch** (`.measure`). Display headings take `text-wrap: balance`; prose takes `text-wrap: pretty`.

## Layout

- Content max width `80rem` (`max-w-sheet`), gutters `1.25rem` mobile / `2rem` from `sm`.
- Sections are separated by a full-bleed `1px solid hair` top border and `5rem`/`7rem` vertical padding — never by a background change alone. Alternating sections may take `bg-panel/40`.
- The landing grid is 12 columns from `lg`. The recurring split is 5/7 (plate + report) or 7/5 (heading + standfirst).
- Multi-column groups are built as `grid gap-px bg-hair` with `bg-void` children, so the gap *is* the hairline. This is the house method for a row of panels.
- More space above a heading than below it.
- Tables and wide content scroll inside their own container; the page body never scrolls horizontally.

## Elevation & Depth

Depth is machined, not lit.

- `lift-1` — `0 1px 2px rgba(0,0,0,.45), 0 2px 10px rgba(0,0,0,.30)`
- `lift-2` — `0 2px 6px rgba(0,0,0,.50), 0 16px 40px rgba(0,0,0,.42)`
- `lift-3` — `0 6px 14px rgba(0,0,0,.55), 0 34px 74px rgba(0,0,0,.55)` (the grade plate only)
- `lift-pop` — `0 2px 4px rgba(0,0,0,.45), 0 8px 20px rgba(0,0,0,.40)` (tooltips and popovers, which sit close to their trigger)
- `scrim` — `rgba(0,0,0,.55)` behind modal surfaces

Every shadow carries both an offset and a blur. A zero-offset coloured halo is decoration and is not part of this system.

`.panel` adds `inset 0 1px 0 rgba(255,255,255,.035)` — a milled bevel catching light along the top edge. It is one pixel and it is honest; it is not a CSS imitation of a material the page never renders.

**The ground is milled, not flat.** `.machined` lays a `repeating-linear-gradient` at `rgba(255,255,255,0.038)`, 1px on a 4px pitch. This must remain legible at 1× — sampled, the ruling reads ~23 against a ground of ~14. Below roughly 0.03 the finish stops existing on screen and becomes a claim the stylesheet makes but the page does not keep.

## Shapes

**Square. Everywhere.** `border-radius: 0` is the house rule across both the marketing and product surfaces. The only curve permitted is a true `50%` dot used as a status indicator.

No pills, no rounded badges, no soft-cornered cards. Corners and hairlines are the form language; rounding them dissolves it.

## Components

- **Grade plate** — `panel-hi` stock; a mono `micro` header band; the struck character at `plate` scale with `text-shadow: 0 1px 0 rgba(255,255,255,.07), 0 -1px 0 rgba(0,0,0,.5)` (an engraving, both sides); a status band; and a `signal-hair` rule along the bottom edge as the live edge. Carries `lift-3`.
- **Ruled row** (`.rule-row`) — the structural unit that replaces cards. `border-top: 1px solid hair`, last child also takes a bottom border. Label left, value right, mono figures.
- **Register table** — `border-collapse`, `micro` uppercase column heads over a `hair` rule, `hair` row borders, `hover:bg-panel`. The house treatment for any list of instruments, fees or deadlines.
- **Primary action** — `signal` ground, `void` text, mono `micro` uppercase, square. Hover **inverts to transparent with `signal` text and border** rather than shifting lightness.
- **Tag** (`.tag`) — 1px `currentColor` border, mono `micro`, square. A stamped label, never an eyebrow above a heading.
- **Inputs** — `void` ground, `hair-bright` border, focus to `signal` border with `caret-color: signal`.
- **Icons** — authored SVG on a 24 box, 1.5 stroke, `square` caps, `miter` joins, `currentColor`. See `app/_components/Icons.tsx`. Unicode glyphs never stand in for icons.

**Browser surfaces are themed** and count as components: `::selection` (signal on void), `:focus-visible` (2px signal, 2px offset), `caret-color`, both scrollbar treatments, and tabular numerals.

## Do's and Don'ts

**Do**

- Build lists as ruled rows and registers; let hairlines carry structure.
- Set every fee, date and count in Geist Mono with tabular figures.
- Keep `signal` for live edges and primary action — it should feel scarce.
- Let a heading carry its own weight.
- Give one authored arrival per surface: the plate strikes, the headline inks in, the rows settle behind it. Respect `prefers-reduced-motion`.
- Label every synthetic surface. The demo, the sample audit run and the illustrative grade all say so on the page.

**Don't**

- Don't round anything. Don't add pills or soft cards.
- Don't use `warn` or `flag` as a field, wash, badge ground or border. State is ink.
- Don't reach for glow, glass, gradient text, or a zero-offset coloured halo.
- Don't put a kicker or eyebrow label above a heading.
- Don't stand a unicode glyph in for an icon, or a system face in for the display face.
- Don't build a page section as a row of same-size icon-plus-heading-plus-text cards.
- Don't state a commercial claim the product cannot keep. Pricing reads as planned, not purchasable, until it is.
