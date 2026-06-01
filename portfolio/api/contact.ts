import { Resend } from 'resend'
import { contactSchema } from '../src/lib/contactSchema'

/**
 * Vercel serverless function (Node runtime, Web handler signature).
 *
 * Requires the RESEND_API_KEY environment variable. Optional overrides:
 *   CONTACT_TO   — destination inbox (defaults to the owner's email)
 *   CONTACT_FROM — verified sender (defaults to Resend's onboarding sender)
 *
 * Without RESEND_API_KEY the function returns 500 and the client falls back to
 * the visible email/social links.
 */
export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ error: 'method_not_allowed' }, 405)
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ error: 'invalid_json' }, 400)
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return json({ error: 'invalid_input' }, 422)
  }

  const { name, email, message, company } = parsed.data

  // Honeypot tripped: silently accept without sending.
  if (company) {
    return json({ ok: true }, 200)
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return json({ error: 'not_configured' }, 500)
  }

  const to = process.env.CONTACT_TO ?? 'teixeirajoaovitor0@gmail.com'
  const from = process.env.CONTACT_FROM ?? 'Portfolio <onboarding@resend.dev>'

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portfólio · nova mensagem de ${name}`,
      text: `Nome: ${name}\nE-mail: ${email}\n\n${message}`,
    })
    if (error) return json({ error: 'send_failed' }, 502)
    return json({ ok: true }, 200)
  } catch {
    return json({ error: 'send_failed' }, 502)
  }
}

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}
