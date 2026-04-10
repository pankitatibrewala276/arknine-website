/**
 * ARKNINE TECHNOLOGIES — DESIGN TOKENS
 * =====================================
 * Single source of truth. Every value here maps 1:1 to CSS custom properties
 * in globals.css (from arknine-design-system.html).
 *
 * USAGE:
 * - In CSS/Tailwind: use var(--color-primary), var(--space-8), etc.
 * - In JS (rare, for dynamic styles): import { tokens } from "@/design-tokens"
 * - Components use CSS classes from globals.css, NOT inline token values.
 *
 * DO NOT modify these values without updating globals.css and
 * arknine-design-system.html simultaneously.
 */

// ============================================================
// 1. COLOR TOKENS
// ============================================================
/**
 * COLOR SYSTEM
 *
 * Primary (Arknine Blue #33355E):
 *   Use for: primary buttons, links, active states, nav highlights,
 *            eyebrow text, card-icon backgrounds, focus rings.
 *   DO NOT use as a background fill for large areas.
 *
 * Secondary (Amber #DF8B30):
 *   Use for: secondary CTAs, accent highlights, the hero underline.
 *   Use SPARINGLY — only for emphasis or contrast against primary.
 *   DO NOT use for body text or large surfaces.
 *
 * Greyscale (cool-toned):
 *   Charcoal (#16161A) — primary text, headings
 *   Stone (#6A6A73) — secondary text, descriptions, card body
 *   Cool Grey (#9A9DA8) — placeholders, hints, disabled text
 *   Mist (#E8E9ED) — borders, dividers, input borders
 *   Off White (#F5F6F7) — surface backgrounds (footer, showcase, table headers)
 *   White (#FAFAFA) — page background
 *   Pure White (#FFFFFF) — card backgrounds, inputs, elevated surfaces
 *
 * Semantic (used ONLY for status indicators):
 *   Success (#4C9A72) — deployed, active, confirmed
 *   Failure (#AC4343) — error, failed, destructive
 *   Warning (#C68E36) — review, approaching limit
 */
export const colors = {
  primary: {
    DEFAULT: "#33355e",
    hover: "#4b4f85",
    light: "#6469a8",
    pressed: "#252747",
    ghost: "rgba(51, 53, 94, 0.06)",
    ghostHover: "rgba(51, 53, 94, 0.10)",
  },
  secondary: {
    DEFAULT: "#df8b30",
    hover: "#e89d4f",
    pressed: "#c87a25",
    ghost: "rgba(223, 139, 48, 0.08)",
  },
  grey: {
    charcoal: "#16161a",
    stone: "#6a6a73",
    cool: "#9a9da8",
    mist: "#e8e9ed",
    offWhite: "#f5f6f7",
    white: "#fafafa",
    pureWhite: "#ffffff",
  },
  semantic: {
    success: "#4c9a72",
    successBg: "rgba(76, 154, 114, 0.08)",
    failure: "#ac4343",
    failureBg: "rgba(172, 67, 67, 0.08)",
    warning: "#c68e36",
    warningBg: "rgba(198, 142, 54, 0.08)",
  },
} as const;

// ============================================================
// 2. TYPOGRAPHY TOKENS
// ============================================================
/**
 * TYPOGRAPHY
 *
 * Heading font: Prata (serif, weight 400 only)
 *   Loaded via next/font/google → CSS var --font-prata
 *   Use for: h1, h2, h3, display text, nav-brand, footer brand
 *   ALWAYS weight 400 — Prata has no other weights
 *   Letter-spacing: -0.01em on h1 only
 *
 * Body font: Avenir Next (sans-serif, weights 400/500/600)
 *   System font stack fallback: "Avenir Next LT Pro", "Avenir Next",
 *     "Avenir", "Segoe UI", sans-serif
 *   Use for: all body text, buttons, labels, captions, badges, inputs
 *
 * Scale (fluid where noted):
 *   h1:       clamp(2.25rem, 3vw + 1rem, 3rem) — ~36-48px
 *   h2:       clamp(1.75rem, 2vw + 0.75rem, 2.25rem) — ~28-36px
 *   h3:       clamp(1.25rem, 1.5vw + 0.5rem, 1.5rem) — ~20-24px
 *   body-lg:  1.125rem (18px) — hero descriptions, lead paragraphs
 *   body:     1rem (16px) — default text, btn-lg
 *   body-sm:  0.875rem (14px) — secondary text, btn-sm/md, nav-links, table cells
 *   caption:  0.75rem (12px) — timestamps, labels, table headers, fine print
 *   eyebrow:  0.6875rem (11px) — section labels, hero tags (ALWAYS uppercase, 600 weight, 0.12em tracking)
 *
 * Line heights:
 *   h1: 1.15 | h2: 1.2 | h3: 1.3
 *   body-lg: 1.65 | body: 1.6 | body-sm: 1.55 | caption: 1.5
 */
export const typography = {
  fonts: {
    heading: "var(--font-heading)", // Prata
    body: "var(--font-body)",       // Avenir Next stack
  },
  sizes: {
    h1: "clamp(2.25rem, 3vw + 1rem, 3rem)",
    h2: "clamp(1.75rem, 2vw + 0.75rem, 2.25rem)",
    h3: "clamp(1.25rem, 1.5vw + 0.5rem, 1.5rem)",
    bodyLg: "1.125rem",
    body: "1rem",
    bodySm: "0.875rem",
    caption: "0.75rem",
    eyebrow: "0.6875rem",
  },
  lineHeights: {
    h1: 1.15,
    h2: 1.2,
    h3: 1.3,
    bodyLg: 1.65,
    body: 1.6,
    bodySm: 1.55,
    caption: 1.5,
  },
  weights: {
    regular: 400,  // headings, body text
    medium: 500,   // nav-links, tabs
    semibold: 600, // buttons, labels, eyebrow, badges
  },
} as const;

// ============================================================
// 3. SPACING SCALE
// ============================================================
/**
 * SPACING (4px base unit)
 *
 * CSS vars: --space-1 through --space-24
 *
 * Usage guide:
 *   1  (4px)  — tight inline gaps (badge dot gap)
 *   2  (8px)  — icon-text gap in buttons, form-group internal, checkbox gap
 *   3  (12px) — small padding (btn-row gap, tab padding, eyebrow margin-bottom)
 *   4  (16px) — base unit (nav padding, card-icon margin, form padding)
 *   5  (20px) — compact card padding, grid-4 gap
 *   6  (24px) — section spacing, grid-2/3 gap, divider margin, tab margin-bottom
 *   8  (32px) — card padding, hero eyebrow margin-bottom, section-header margin
 *   10 (40px) — section-header margin-bottom, page-wrapper padding (mobile)
 *   12 (48px) — page-wrapper padding (desktop sides)
 *   16 (64px) — section vertical padding, page-wrapper desktop top/bottom
 *   20 (80px) — hero top padding
 *   24 (96px) — maximum section spacing
 */
export const spacing = {
  1: "0.25rem",   // 4px
  2: "0.5rem",    // 8px
  3: "0.75rem",   // 12px
  4: "1rem",      // 16px
  5: "1.25rem",   // 20px
  6: "1.5rem",    // 24px
  8: "2rem",      // 32px
  10: "2.5rem",   // 40px
  12: "3rem",     // 48px
  16: "4rem",     // 64px
  20: "5rem",     // 80px
  24: "6rem",     // 96px
} as const;

// ============================================================
// 4. BORDER RADIUS SCALE
// ============================================================
/**
 * RADII
 *
 * Usage guide:
 *   sm   (6px)    — btn-sm, input-sm, checkbox
 *   md   (8px)    — btn-md (default), input (default), card-icon, nav-link, tooltip
 *   lg   (12px)   — btn-lg, input-lg, card-compact, alert, table-wrap, swatch
 *   xl   (16px)   — card (default), showcase
 *   2xl  (20px)   — reserved for larger panels/modals
 *   full (9999px) — badges, hero-eyebrow, progress-bar, avatar, toggle
 */
export const radii = {
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.25rem",
  full: "9999px",
} as const;

// ============================================================
// 5. SHADOW SCALE
// ============================================================
/**
 * SHADOWS
 *
 * All shadows use charcoal (22,22,26) base — NO pure black.
 * This keeps shadows warm and consistent with the cool-grey palette.
 *
 * Usage guide:
 *   xs   — sticky header on scroll
 *   sm   — toggle knob, subtle elevation
 *   md   — dropdown menus, hovering nav, tooltips
 *   lg   — card hover state, elevated panels
 *   xl   — modals, large floating elements
 *   inner — pressed input states (reserved)
 *
 * Button shadows are CUSTOM (not from this scale) — see button tokens.
 */
export const shadows = {
  xs: "0 1px 2px rgba(22, 22, 26, 0.04)",
  sm: "0 2px 8px rgba(22, 22, 26, 0.06)",
  md: "0 4px 16px rgba(22, 22, 26, 0.08)",
  lg: "0 8px 32px rgba(22, 22, 26, 0.10)",
  xl: "0 16px 48px rgba(22, 22, 26, 0.12)",
  inner: "inset 0 1px 2px rgba(22, 22, 26, 0.06)",
} as const;

// ============================================================
// 6. CONTAINER WIDTHS
// ============================================================
/**
 * CONTAINER
 *
 * Single container: .page-wrapper
 *   max-width: 1280px
 *   Padding mobile: space-10 (40px) top/bottom, space-6 (24px) sides
 *   Padding desktop (≥768px): space-16 (64px) top/bottom, space-12 (48px) sides
 *
 * Content max-widths (applied inline where needed):
 *   540px — section-header description
 *   480px — testimonial card, accent card
 *   48ch  — hero description (character-width based)
 *   14ch  — hero h1 (character-width based)
 *   320px — footer brand description
 */
export const containers = {
  maxWidth: "1280px",
  padding: {
    mobile: { x: "1.5rem", y: "2.5rem" },     // space-6, space-10
    desktop: { x: "3rem", y: "4rem" },          // space-12, space-16
  },
  contentWidths: {
    sectionDescription: "540px",
    testimonialCard: "480px",
    heroDescription: "48ch",
    heroHeading: "14ch",
    footerBrand: "320px",
  },
} as const;

// ============================================================
// 7. BREAKPOINT SYSTEM
// ============================================================
/**
 * BREAKPOINTS
 *
 * Mobile-first. Media queries use min-width.
 *
 *   sm (640px)  — grid-2 becomes 2-col, grid-3/4 becomes 2-col
 *   md (768px)  — page-wrapper padding increases, footer grid restructures
 *   lg (960px)  — grid-3 becomes 3-col, grid-4 becomes 4-col
 *   xl (1024px) — desktop nav visible, mobile menu hidden
 *
 * Grid utility classes:
 *   .grid-2 — 1col → 2col at sm
 *   .grid-3 — 1col → 2col at sm → 3col at lg
 *   .grid-4 — 1col → 2col at sm → 4col at lg
 *
 * Responsive helpers:
 *   .lg-show — hidden below xl, visible above
 *   .lg-hide — visible below xl, hidden above
 */
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "960px",
  xl: "1024px",
} as const;

// ============================================================
// 8. BUTTON STYLE TOKENS
// ============================================================
/**
 * BUTTONS
 *
 * Base: .btn — all variants share this
 *   font: body (Avenir Next), weight 600
 *   border-radius: radius-md (0.5rem) default
 *   transition: all 250ms ease-out-quart
 *   active: scale(0.97)
 *
 * Sizes:
 *   sm — 8px 16px, body-sm, radius-sm
 *   md — 10px 22px, body-sm, radius-md (default)
 *   lg — 14px 28px, body, radius-lg
 *
 * Variants:
 *   primary    — bg:primary, text:white, inset glow, hover lifts -1px
 *   secondary  — bg:amber, text:white, inset glow, hover lifts -1px
 *   outline    — transparent, inset 1.5px border primary, hover fills ghost
 *   ghost      — transparent, text:primary, hover fills ghost
 *   destructive — bg:failure, text:white
 *
 * Icon buttons: .btn-icon — square, no padding
 *   sm: 2rem | md: 2.5rem | lg: 3rem
 *
 * SVG inside buttons: 1em width/height, hover translateX(2px)
 *
 * Button groups: .btn-row — flex, wrap, gap space-3
 */
export const buttonTokens = {
  sizes: {
    sm: { padding: "0.5rem 1rem", fontSize: "var(--text-body-sm)", radius: "var(--radius-sm)" },
    md: { padding: "0.625rem 1.375rem", fontSize: "var(--text-body-sm)", radius: "var(--radius-md)" },
    lg: { padding: "0.875rem 1.75rem", fontSize: "var(--text-body)", radius: "var(--radius-lg)" },
  },
  iconSizes: { sm: "2rem", md: "2.5rem", lg: "3rem" },
} as const;

// ============================================================
// 9. TABLE STYLE TOKENS
// ============================================================
/**
 * TABLE
 *
 * Wrapper: .table-wrap
 *   overflow-x: auto (horizontal scroll on mobile)
 *   border: 1px solid mist
 *   border-radius: radius-lg
 *
 * Header (th):
 *   bg: off-white, text: stone
 *   font: caption size (12px), weight 600, uppercase, 0.04em tracking
 *   padding: space-3 space-4
 *   border-bottom: 1px solid mist
 *
 * Cells (td):
 *   text: charcoal, font: body-sm (14px)
 *   padding: space-3 space-4
 *   border-bottom: 1px solid mist (none on last row)
 *
 * Row hover: background rgba(51,53,94,0.02) — very subtle primary tint
 *
 * Use with Badge components for status columns.
 * Bold the "name" column with font-weight: 600.
 */
export const tableTokens = {
  wrapper: { border: "1px solid var(--color-mist)", radius: "var(--radius-lg)" },
  header: {
    bg: "var(--color-off-white)",
    color: "var(--color-stone)",
    fontSize: "var(--text-caption)",
    padding: "var(--space-3) var(--space-4)",
  },
  cell: {
    color: "var(--color-charcoal)",
    fontSize: "var(--text-body-sm)",
    padding: "var(--space-3) var(--space-4)",
  },
  rowHover: "rgba(51, 53, 94, 0.02)",
} as const;

// ============================================================
// 10. FORM FIELD STYLE TOKENS
// ============================================================
/**
 * FORM FIELDS
 *
 * Wrapper: .form-group — flex column, gap space-2
 * Label: .form-label — body-sm, weight 600, charcoal
 * Hint: .form-hint — caption, cool-grey (failure color when error)
 *
 * Input: .input
 *   font: body font, body size
 *   padding: 10px 14px
 *   border: 1.5px solid mist
 *   border-radius: radius-md
 *   bg: pure-white
 *   transition: border-color + box-shadow, 250ms ease-out-quart
 *   hover: border → cool-grey
 *   focus: border → primary, shadow → 0 0 0 3px rgba(primary, 0.08)
 *
 * Sizes:
 *   sm — 6px 12px, body-sm, radius-sm
 *   md — 10px 14px, body, radius-md (default)
 *   lg — 14px 16px, body-lg, radius-lg
 *
 * States:
 *   error: border → failure, focus shadow → rgba(failure, 0.08)
 *   success: border → success
 *
 * Textarea: .input on <textarea>, min-height 120px, resize vertical
 *
 * Select: .input on <select>, custom chevron SVG, padding-right 2.5rem
 *
 * Checkbox: .checkbox-group
 *   18px square, 1.5px cool-grey border, radius-sm
 *   checked: bg primary, white checkmark via ::after pseudo
 *
 * Toggle: .toggle
 *   44px × 24px, mist bg, radius-full
 *   knob: 18px circle, pure-white, shadow-sm
 *   active: bg primary, knob slides right 20px
 */
export const formTokens = {
  input: {
    padding: { sm: "0.375rem 0.75rem", md: "0.625rem 0.875rem", lg: "0.875rem 1rem" },
    fontSize: { sm: "var(--text-body-sm)", md: "var(--text-body)", lg: "var(--text-body-lg)" },
    radius: { sm: "var(--radius-sm)", md: "var(--radius-md)", lg: "var(--radius-lg)" },
    border: "1.5px solid var(--color-mist)",
    focusShadow: "0 0 0 3px rgba(51, 53, 94, 0.08)",
    errorShadow: "0 0 0 3px rgba(172, 67, 67, 0.08)",
  },
  checkbox: { size: "1.125rem", border: "1.5px solid var(--color-cool-grey)", radius: "var(--radius-sm)" },
  toggle: { width: "2.75rem", height: "1.5rem", knob: "1.125rem" },
} as const;

// ============================================================
// MOTION TOKENS
// ============================================================
/**
 * MOTION
 *
 * Easings:
 *   ease-out-quart (0.25, 1, 0.5, 1) — buttons, inputs, nav transitions
 *   ease-out-expo (0.16, 1, 0.3, 1) — scroll reveals, entrance animations, dropdown open
 *   ease-smooth (0.32, 0.72, 0, 1) — reserved for spring-like motion
 *
 * Durations:
 *   fast (150ms) — hover color, focus, nav-link
 *   normal (250ms) — buttons, inputs, all interactive transitions
 *   slow (400ms) — card hover (shadow + transform + border)
 *   enter (600ms) — scroll reveal entrance
 *
 * Scroll reveal (.reveal):
 *   opacity: 0 → 1, translateY(24px) → 0
 *   duration: enter (600ms), ease: ease-out-expo
 *   delays: 80ms increments (.reveal-delay-1 through .reveal-delay-5)
 *   Respects prefers-reduced-motion
 */
export const motion = {
  easings: {
    outQuart: "cubic-bezier(0.25, 1, 0.5, 1)",
    outExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
    smooth: "cubic-bezier(0.32, 0.72, 0, 1)",
  },
  durations: {
    fast: "150ms",
    normal: "250ms",
    slow: "400ms",
    enter: "600ms",
  },
} as const;

// ============================================================
// COMBINED EXPORT
// ============================================================
export const tokens = {
  colors,
  typography,
  spacing,
  radii,
  shadows,
  containers,
  breakpoints,
  buttonTokens,
  tableTokens,
  formTokens,
  motion,
} as const;
