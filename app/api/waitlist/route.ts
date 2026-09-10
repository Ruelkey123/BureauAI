import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  let body: { email?: unknown; note?: unknown; source?: unknown }

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Malformed request' }, { status: 400 })
  }

  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const note = typeof body.note === 'string' ? body.note.trim().slice(0, 2000) : ''
  const source = typeof body.source === 'string' ? body.source.slice(0, 64) : 'unknown'

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'A valid email is required' }, { status: 400 })
  }

  // The contact write and the notification fail independently. A duplicate
  // signup is a success for the visitor, so it must not surface as an error.
  const [contact, notification] = await Promise.allSettled([
    resend.contacts.create({
      email,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
      unsubscribed: false,
    }),
    resend.emails.send({
      from: 'BureauAI <onboarding@resend.dev>',
      to: 'arulke01@gmail.com',
      subject: `BureauAI signup: ${email} (${source})`,
      text: [
        'New waitlist signup',
        '',
        `Email:  ${email}`,
        `Source: ${source}`,
        '',
        note ? `What they're dealing with:\n${note}` : 'No note provided.',
        '',
        'All contacts: https://resend.com/audiences',
      ].join('\n'),
    }),
  ])

  if (contact.status === 'rejected' && notification.status === 'rejected') {
    console.error('Waitlist signup failed entirely', {
      contact: contact.reason,
      notification: notification.reason,
    })
    return NextResponse.json({ error: 'Failed to save signup' }, { status: 502 })
  }

  if (contact.status === 'rejected') {
    console.error('Waitlist contact write failed (notification sent)', contact.reason)
  }
  if (notification.status === 'rejected') {
    console.error('Waitlist notification failed (contact saved)', notification.reason)
  }

  return NextResponse.json({ success: true })
}
