import { useTranslation } from 'react-i18next'
import { FiArrowUp } from 'react-icons/fi'
import { socials } from '@/data/socials'
import { useScrollTo } from '@/hooks/useScrollTo'
import styles from './Footer.module.css'

export function Footer() {
  const { t } = useTranslation()
  const scrollTo = useScrollTo()
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <a
            href="#top"
            className={styles.brand}
            onClick={(e) => {
              e.preventDefault()
              scrollTo('#top')
            }}
          >
            João Vitor Teixeira
          </a>

          <button type="button" className={styles.toTop} onClick={() => scrollTo('#top')}>
            {t('footer.backToTop')}
            <FiArrowUp aria-hidden />
          </button>
        </div>

        <div className={styles.bottom}>
          <ul className={styles.socials} role="list">
            {socials.map(({ id, href, labelKey, icon: Icon }) => (
              <li key={id}>
                <a
                  href={href}
                  target={id === 'email' ? undefined : '_blank'}
                  rel="noreferrer noopener"
                  aria-label={t(labelKey)}
                >
                  <Icon aria-hidden />
                </a>
              </li>
            ))}
          </ul>

          <p className={styles.meta}>
            <span>{t('footer.builtWith')}</span>
            <span className={styles.copy}>
              © {year} · {t('footer.rights')}
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
