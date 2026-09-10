import type { Metadata } from 'next'
import { Archivo, Public_Sans, Geist_Mono } from 'next/font/google'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-archivo',
  display: 'swap',
})

/* Public Sans is the US federal government's typeface — the working voice of
   the bureaucracy this product absorbs. */
const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-public-sans',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-geist-mono',
  display: 'swap',
})

const SITE = 'https://bureauai.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'BureauAI — the compliance department for NYC businesses',
    template: '%s · BureauAI',
  },
  description:
    'BureauAI takes over permits, licenses, renewals and violations across every NYC agency — DOHMH, DOB, FDNY, DCWP and the SLA — so owners never have to think about compliance again.',
  applicationName: 'BureauAI',
  keywords: [
    'NYC compliance',
    'DOHMH permit',
    'DOB permit',
    'FDNY inspection',
    'DCWP license',
    'SLA liquor license',
    'restaurant compliance NYC',
    'permit expediter',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE,
    siteName: 'BureauAI',
    title: 'BureauAI — the compliance department for NYC businesses',
    description:
      'Eight to twelve agencies. One department that handles them. BureauAI manages NYC permits, renewals and violations end to end.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BureauAI — the compliance department for NYC businesses',
    description:
      'Eight to twelve agencies. One department that handles them. BureauAI manages NYC permits, renewals and violations end to end.',
  },
  robots: { index: true, follow: true },
}

/*
 * Direction contract — audited at the finish review. Emitted into the built
 * markup so it survives the production build and can be grepped by seed key.
 */
const DIRECTION_CONTRACT = `<!--
IMPECCABLE DIRECTION CONTRACT

THESIS: A compliance grade plate, machined rather than printed. It refuses the
icon-card grid this category always ships, and it refuses the lit-screen dark
page it replaces: no glow, no glass, no gradient text. Depth here is a milled
bevel and a hairline, never a bloom.

OWN-WORLD: Graphite ground #0e1013 with panels milled one value above it;
hairlines at #2a2f37 carry the structure that shadows carry on paper. Cold ink,
secondary tints held in the blue family. One brand signal, #c8ff3c, on the live
edge of things and almost nowhere else. Two further colours exist only as
functional state, and only ever as ink on a figure or a status word — never as a
field, wash, badge ground or border: warn #f0a93b for "due soon" and flag #ff6152
for "overdue or open violation". A compliance product that cannot distinguish
those two states has stopped doing its job, but neither may take a surface. Archivo pulled to
-0.04em for display, Public Sans (the US federal government's own face) for text,
Geist Mono for every fee, date and count. Square corners throughout; no radii, no
pills, no system display face.

STORY: An owner or an investor sees the grade BureauAI holds a business at, reads
which agencies it absorbs, watches the audit actually run, and requests access.

FIRST VIEWPORT: The grade plate left on milled stock, letter struck at plate
scale; headline set tight and uppercase to its right, ruled agency findings
beneath it, primary action on the machined edge.

FORM: The Inspection Grade — index 6 of 7 on the ordered list; seed bbbbac0c.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish
review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
-->`

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${publicSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="machined min-h-full flex flex-col text-ink">
        <div hidden dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }} />
        {children}
      </body>
    </html>
  )
}
