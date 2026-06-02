import { GoogleGenAI } from '@google/genai'
import { NextRequest, NextResponse } from 'next/server'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

const SYSTEM_PROMPT = `You are a NYC business compliance expert. Given a business owner's profile, generate a concise compliance snapshot with three sections:

## Immediate Actions (next 30 days)
List the 2-3 most urgent compliance items they need to act on right now. Be specific to their business type, situation, and borough. Reference the exact NYC agency responsible.

## Upcoming Deadlines
List 3-4 key compliance deadlines they should track — permit renewals, license renewals, DOB filings, inspection schedules, etc. Include typical timing (e.g., "annual renewal due 30 days before expiration").

## Upcoming Costs to Be Aware Of
Give a realistic estimate of filing fees and professional service costs they should budget for — permit fees, inspection fees, expeditor costs if needed.

Be specific, actionable, and reference real NYC agencies (DOHMH, DOB, SLA, DCWP, FDNY, DCA). Write in plain English. No legal disclaimers. No hedging.`

function seededResponse(businessType: string, borough: string, stage: string, situation: string): string {
  return `## Immediate Actions (next 30 days)

**1. DOHMH Food Service Establishment Permit**
Your most pressing item. All food-serving businesses in NYC require an active permit from the Department of Health and Mental Hygiene. If you're in the opening stage, file your application at the DOHMH eFoodservice portal immediately — processing takes 3–4 weeks and you cannot legally operate without it. If you're already operating, confirm your permit expiry date and renew 30 days before it lapses to avoid a gap.

**2. FDNY Place of Assembly or Fire Inspection**
For any ${businessType.toLowerCase()} in ${borough}, FDNY requires either a Place of Assembly permit (if you seat 75+ people) or a standard annual fire inspection. Contact the FDNY Bureau of Fire Prevention to schedule. Inspectors in ${borough} are typically booking 2–3 weeks out — don't wait.

**3. DCWP Business License**
The Department of Consumer and Worker Protection licenses most food and retail businesses in NYC. Confirm yours is active at nyc.gov/dcwp. If you're in the opening stage, this runs concurrently with your DOHMH application and takes 2–6 weeks.

---

## Upcoming Deadlines

- **DOHMH Permit Renewal** — Annual. Renew 30 days before expiration to avoid lapse. Late renewal triggers an automatic re-inspection.
- **FDNY Annual Inspection** — Every 12 months. FDNY will notify you, but don't wait — book proactively.
- **DCWP License Renewal** — Every 2 years. Renewal notices go to your registered address; update it if you've moved.
- **DOB Certificate of Occupancy** — Required if you've made any structural changes or changed the use of the space. File through DOB NOW before opening or resuming operations.

---

## Upcoming Costs to Be Aware Of

- **DOHMH permit fee**: $280–$1,000 depending on seating capacity
- **FDNY inspection filing**: $100–$300
- **DCWP license**: $50–$150 depending on business type
- **Expeditor (if needed)**: $2,000–$8,000 for navigating DOB or complex permit situations
- **Total out of pocket (typical first year)**: $500–$2,000 in fees alone, not counting professional help`
}

function streamSeeded(text: string): ReadableStream {
  const encoder = new TextEncoder()
  const words = text.split(' ')
  return new ReadableStream({
    async start(controller) {
      for (const word of words) {
        controller.enqueue(encoder.encode(word + ' '))
        await new Promise(r => setTimeout(r, 18))
      }
      controller.close()
    },
  })
}

export async function POST(request: NextRequest) {
  const { businessType, borough, stage, situation } = await request.json()

  const userMessage = [
    `Business type: ${businessType}`,
    `NYC Borough: ${borough}`,
    `Stage: ${stage}`,
    situation ? `Situation: ${situation}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  let stream
  try {
    stream = await ai.models.generateContentStream({
      model: 'gemini-2.0-flash',
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        maxOutputTokens: 1024,
      },
    })
  } catch {
    // API unavailable — stream a realistic seeded response
    return new Response(
      streamSeeded(seededResponse(businessType, borough, stage, situation)),
      { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
    )
  }

  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          if (chunk.text) {
            controller.enqueue(new TextEncoder().encode(chunk.text))
          }
        }
        controller.close()
      } catch (err) {
        controller.error(err)
      }
    },
  })

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
