import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiMenu, FiX } from 'react-icons/fi'
import { LanguageToggle } from '@/components/LanguageToggle/LanguageToggle'
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle'
import { useScrollTo } from '@/hooks/useScrollTo'
import styles from './Nav.module.css'

const LINKS = [
  { id: 'about', target: '#about' },
  { id: 'work', target: '#work' },
  { id: 'stack', target: '#stack' },
  { id: 'experience', target: '#experience' },
  { id: 'contact', target: '#contact' },
] as const

export function Nav() {
  const { t } = useTranslation()
  const scrollTo = useScrollTo()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll + close on Escape while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const go = (target: string) => {
    setOpen(false)
    scrollTo(target)
  }

  return (
    <header className={[styles.header, scrolled && styles.scrolled].filter(Boolean).join(' ')}>
      <nav className={styles.nav} aria-label="Primary">
        <a
          href="#top"
          className={styles.brand}
          onClick={(e) => {
            e.preventDefault()
            go('#top')
          }}
        >
          JT<span className={styles.brandDot}>.</span>
        </a>

        <ul className={styles.links} role="list">
          {LINKS.map((link, i) => (
            <li key={link.id}>
              <a
                href={link.target}
                onClick={(e) => {
                  e.preventDefault()
                  go(link.target)
                }}
              >
                <span className={styles.linkNum} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {t(`nav.${link.id}`)}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            className={styles.burger}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <FiX aria-hidden /> : <FiMenu aria-hidden />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={[styles.mobile, open && styles.mobileOpen].filter(Boolean).join(' ')}
        hidden={!open}
      >
        <ul role="list">
          {LINKS.map((link, i) => (
            <li key={link.id}>
              <a
                href={link.target}
                onClick={(e) => {
                  e.preventDefault()
                  go(link.target)
                }}
              >
                <span className={styles.mobileNum} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {t(`nav.${link.id}`)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
