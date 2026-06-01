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

  // Keep <html lang> and document title in sync with the active language.
  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage === 'en' ? 'en' : 'pt-BR'
    document.title = t('seoTitle')
  }, [i18n.resolvedLanguage, t])

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
