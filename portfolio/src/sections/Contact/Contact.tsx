import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { FiArrowUpRight, FiDownload } from 'react-icons/fi'
import { SectionHeading } from '@/components/SectionHeading/SectionHeading'
import { Reveal } from '@/components/Reveal/Reveal'
import { socials } from '@/data/socials'
import { contactSchema } from '@/lib/contactSchema'
import styles from './Contact.module.css'

type Status = 'idle' | 'sending' | 'success' | 'error'
type FieldErrors = { name?: string; email?: string; message?: string }

export function Contact() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<FieldErrors>({})

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const payload = {
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      message: String(fd.get('message') ?? ''),
      company: String(fd.get('company') ?? ''),
    }

    const parsed = contactSchema.safeParse(payload)
    if (!parsed.success) {
      const next: FieldErrors = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0]
        if (key === 'name') next.name = t('contact.form.invalidName')
        if (key === 'email') next.email = t('contact.form.invalidEmail')
        if (key === 'message') next.message = t('contact.form.invalidMessage')
      }
      setErrors(next)
      return
    }

    setErrors({})
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      })
      if (!res.ok) throw new Error('request failed')
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className={`section ${styles.contact}`} aria-labelledby="contact-title">
      <div className="container">
        <SectionHeading
          index="05"
          eyebrow={t('contact.eyebrow')}
          title={t('contact.title')}
          titleId="contact-title"
          intro={t('contact.intro')}
        />

        <div className={styles.grid}>
          <Reveal className={styles.formWrap}>
            <form className={styles.form} onSubmit={onSubmit} noValidate>
              {/* Honeypot — hidden from users, catches bots */}
              <div className={styles.hp} aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className={styles.field}>
                <label htmlFor="name">{t('contact.form.name')}</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder={t('contact.form.namePlaceholder')}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <span id="name-error" className={styles.error}>
                    {errors.name}
                  </span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="email">{t('contact.form.email')}</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={t('contact.form.emailPlaceholder')}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <span id="email-error" className={styles.error}>
                    {errors.email}
                  </span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="message">{t('contact.form.message')}</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder={t('contact.form.messagePlaceholder')}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <span id="message-error" className={styles.error}>
                    {errors.message}
                  </span>
                )}
              </div>

              <button type="submit" className={styles.submit} disabled={status === 'sending'}>
                {status === 'sending' ? t('contact.form.sending') : t('contact.form.send')}
              </button>

              <p
                className={[
                  styles.status,
                  status === 'success' && styles.ok,
                  status === 'error' && styles.fail,
                ]
                  .filter(Boolean)
                  .join(' ')}
                role="status"
                aria-live="polite"
              >
                {status === 'success' && t('contact.form.success')}
                {status === 'error' && t('contact.form.error')}
              </p>
            </form>
          </Reveal>

          <Reveal className={styles.aside} delay={0.1}>
            <p className={styles.orReach}>{t('contact.orReach')}</p>
            <ul className={styles.socials} role="list">
              {socials.map(({ id, labelKey, href, handle, icon: Icon }) => (
                <li key={id}>
                  <a
                    href={href}
                    target={id === 'email' ? undefined : '_blank'}
                    rel="noreferrer noopener"
                  >
                    <Icon aria-hidden className={styles.socialIcon} />
                    <span className={styles.socialLabel}>
                      <span>{t(labelKey)}</span>
                      <span className={styles.handle}>{handle}</span>
                    </span>
                    <FiArrowUpRight aria-hidden className={styles.socialArrow} />
                  </a>
                </li>
              ))}
            </ul>

            <a className={styles.cv} href="/cv/joao-vitor-teixeira-cv.pdf" download>
              <FiDownload aria-hidden />
              {t('cv.download')}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
