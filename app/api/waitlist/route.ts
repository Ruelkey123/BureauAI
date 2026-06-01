import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  const { email, source = 'unknown' } = await request.json()

  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 })
  }

  try {
    await resend.emails.send({
      from: 'BureauAI <onboarding@resend.dev>',
      to: 'arulke01@gmail.com',
      subject: `New BureauAI signup: ${email} (from ${source})`,
      text: `New waitlist signup!\n\nEmail: ${email}\nSource: ${source}`,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Resend error:', err)
    return NextResponse.json({ error: 'Failed to save signup' }, { status: 500 })
  }
}
