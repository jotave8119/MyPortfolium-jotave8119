import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { SmoothScroll } from './providers/SmoothScroll'
import { Cursor } from './components/Cursor/Cursor'
import { Nav } from './components/Nav/Nav'
import { Hero } from './sections/Hero/Hero'
import { About } from './sections/About/About'
import { Work } from './sections/Work/Work'
import { Stack } from './sections/Stack/Stack'
import { Experience } from './sections/Experience/Experience'
import { Contact } from './sections/Contact/Contact'
import { Footer } from './sections/Footer/Footer'

export function App() {
  const { i18n, t } = useTranslation()

  // Keep <html lang> in sync with the active language (SEO + a11y).
  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage === 'en' ? 'en' : 'pt-BR'
  }, [i18n.resolvedLanguage])

  return (
    <SmoothScroll>
      <Cursor />
      <a className="skip-link" href="#main">
        {t('skipToContent')}
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Work />
        <Stack />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
