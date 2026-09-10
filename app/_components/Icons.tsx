/**
 * Authored icon set. One family, 24px grid, 1.5 stroke, square-cut joins to
 * match the page's hairline rules. No unicode glyphs stand in for these.
 */

type IconProps = {
  className?: string
  size?: number
  title?: string
}

function Svg({
  className,
  size = 20,
  title,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  )
}

/** Handled / cleared. */
export function Check(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 12.5 9.5 18 20 6" />
    </Svg>
  )
}

/** Open violation. */
export function Flag(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 21V3h14l-3 5 3 5H5" />
    </Svg>
  )
}

/** Deadline / renewal window. */
export function Clock(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.5l3.5 2" />
    </Svg>
  )
}

/** Health — DOHMH. */
export function Health(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 12h4l2-5 3 10 2.5-6 1.5 3h5" />
    </Svg>
  )
}

/** Building & construction — DOB. */
export function Building(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 21V6l7-3v18" />
      <path d="M11 21V10h9v11" />
      <path d="M14.5 14h2M14.5 17.5h2M7 9.5h1M7 13h1M7 16.5h1" />
    </Svg>
  )
}

/** Fire — FDNY. */
export function Flame(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 2.5c4 4.5 6 7.4 6 10.5a6 6 0 0 1-12 0c0-1.7.6-3.2 1.8-4.6.5 1.4 1.3 2.2 2.4 2.4-.6-3 0-5.6 1.8-8.3Z" />
    </Svg>
  )
}

/** Licensing — DCWP / SLA. */
export function Seal(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="9.5" r="6" />
      <path d="M9 15v6.5l3-2 3 2V15" />
      <path d="M9.5 9.5 11 11l3.5-3.5" />
    </Svg>
  )
}

/** Filing / document. */
export function Filing(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M13 3H6v18h12V8l-5-5Z" />
      <path d="M13 3v5h5" />
      <path d="M9 13h6M9 16.5h6" />
    </Svg>
  )
}

/** Directional — used on actions, never as decoration. */
export function Arrow(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 12h15" />
      <path d="M13 6l6 6-6 6" />
    </Svg>
  )
}

/** Disclosure. */
export function Plus(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 5v14M5 12h14" />
    </Svg>
  )
}

/** The BureauAI mark — the neoclassical frontage, preserved from the old site. */
export function Mark({ className, size = 28 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={(size * 24) / 26}
      viewBox="0 0 26 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <polygon points="13,1.5 22.5,7 3.5,7" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <rect x="3.5" y="7.4" width="19" height="1.5" />
      <rect x="5" y="9.8" width="2.5" height="8" />
      <rect x="11.75" y="9.8" width="2.5" height="8" />
      <rect x="18.5" y="9.8" width="2.5" height="8" />
      <rect x="3" y="18.2" width="20" height="1.4" />
      <rect x="1.5" y="20.2" width="23" height="1.4" opacity="0.55" />
    </svg>
  )
}
