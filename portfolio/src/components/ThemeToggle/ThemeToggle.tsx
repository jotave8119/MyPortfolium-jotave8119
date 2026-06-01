import { useTranslation } from 'react-i18next'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '@/hooks/useTheme'
import styles from './ThemeToggle.module.css'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const { t } = useTranslation()

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-label={t(theme === 'dark' ? 'theme.toLight' : 'theme.toDark')}
      title={t(theme === 'dark' ? 'theme.toLight' : 'theme.toDark')}
    >
      {theme === 'dark' ? <FiSun aria-hidden /> : <FiMoon aria-hidden />}
    </button>
  )
}
