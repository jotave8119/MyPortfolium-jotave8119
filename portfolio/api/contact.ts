import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'
import { contactSchema } from '../src/lib/contactSchema'

/**
 * Vercel serverless function (Node runtime).
 *
 * Requires the RESEND_API_KEY environment variable. Optional overrides:
 *   CONTACT_TO   — destination inbox (defaults to the owner's email)
 *   CONTACT_FROM — verified sender (defaults to Resend's onboarding sender)
 *
 * Without RESEND_API_KEY the function returns 500 and the client falls back to
 * the visible email/social links.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method_not_allowed' })
  }

  // Vercel auto-parses JSON bodies; tolerate a raw string just in case.
  let body: unknown = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      return res.status(400).json({ error: 'invalid_json' })
    }
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return res.status(422).json({ error: 'invalid_input' })
  }

  const { name, email, message, company } = parsed.data

  // Honeypot tripped: silently accept without sending.
  if (company) {
    return res.status(200).json({ ok: true })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'not_configured' })
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
    if (error) return res.status(502).json({ error: 'send_failed' })
    return res.status(200).json({ ok: true })
  } catch {
    return res.status(502).json({ error: 'send_failed' })
  }
}
