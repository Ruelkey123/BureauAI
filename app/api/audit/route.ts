import { GoogleGenAI } from '@google/genai'
import { NextRequest } from 'next/server'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

const SYSTEM_PROMPT = `You are a NYC restaurant compliance expert. Given a restaurant owner's profile, generate a concise compliance snapshot with three sections:

## Immediate Actions (next 30 days)
List the 2-3 most urgent compliance items they need to act on right now. Be specific to their situation and borough. Reference the exact NYC agency responsible.

## Upcoming Deadlines
List 3-4 key compliance deadlines they should track — annual DOH permit renewal, license renewals, DOB filings, etc. Include typical timing (e.g., "annual renewal due 30 days before expiration").

## What This Costs Without BureauAI
Give a realistic estimate of professional service costs for their situation — expeditor fees ($2K–$20K), attorney fees ($5K–$15K for SLA), consultant fees. Then state: BureauAI costs $299/month.

Be specific, actionable, and reference real NYC agencies (DOHMH, DOB, SLA, DCWP, FDNY). Write in plain English. No legal disclaimers. No hedging.`

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

  const stream = await ai.models.generateContentStream({
    model: 'gemini-2.0-flash',
    contents: userMessage,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      maxOutputTokens: 1024,
    },
  })

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
