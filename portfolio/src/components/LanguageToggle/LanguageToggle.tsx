import { useTranslation } from 'react-i18next'
import styles from './LanguageToggle.module.css'

export function LanguageToggle() {
  const { i18n, t } = useTranslation()
  const lang = i18n.resolvedLanguage === 'en' ? 'en' : 'pt'
  const next = lang === 'pt' ? 'en' : 'pt'

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={() => void i18n.changeLanguage(next)}
      aria-label={t(next === 'en' ? 'lang.switchToEn' : 'lang.switchToPt')}
    >
      <span className={lang === 'pt' ? styles.active : undefined}>PT</span>
      <span className={styles.sep} aria-hidden="true">
        /
      </span>
      <span className={lang === 'en' ? styles.active : undefined}>EN</span>
    </button>
  )
}
