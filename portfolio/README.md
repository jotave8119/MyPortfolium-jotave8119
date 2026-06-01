# Portfólio — João Vitor Teixeira

Reconstrução do portfólio com base **editorial/cinematográfica** + um **elemento WebGL** no hero.
Stack: **Vite + React + TypeScript**, **Three.js / React Three Fiber** (hero 3D, lazy), **GSAP + Lenis**
(smooth scroll), **i18next** (PT/EN), **CSS Modules + design tokens**.

## Scripts

```bash
npm install
npm run dev        # ambiente de desenvolvimento (http://localhost:5173)
npm run build      # type-check + build de produção
npm run preview    # serve o build localmente
npm run lint
```

## Estrutura

```
src/
  styles/      tokens.css (design tokens), reset.css, global.css
  i18n/        config.ts + locales/{pt,en}/translation.json
  data/        projects.ts, skills.ts, socials.ts, types.ts   (conteúdo tipado)
  sections/    Hero, About, Work, Stack, Experience, Contact, Footer
  components/  Nav, LanguageToggle, ThemeToggle, SectionHeading, Reveal, ProjectCard
  three/       HeroCanvas (lazy), HeroScene, HeroFallback     (WebGL isolado)
  hooks/       useShould3D, usePrefersReducedMotion, useInView, useScrollTo, useTheme
  providers/   SmoothScroll (Lenis <-> GSAP)
api/
  contact.ts   função serverless (Resend) para o formulário de contato
```

## Formulário de contato (Resend)

O `api/contact.ts` envia e-mails via [Resend](https://resend.com). Configure as variáveis de
ambiente no projeto da Vercel:

| Variável         | Obrigatória | Descrição                                               |
| ---------------- | ----------- | ------------------------------------------------------- |
| `RESEND_API_KEY` | sim         | API key da Resend                                       |
| `CONTACT_TO`     | não         | inbox de destino (default: e-mail do dono)              |
| `CONTACT_FROM`   | não         | remetente verificado (default: `onboarding@resend.dev`) |

Sem `RESEND_API_KEY` o formulário mostra mensagem de erro e o visitante recai nos links de
e-mail/redes sociais (sempre visíveis). Para usar domínio próprio no `from`, verifique-o na Resend.

## Deploy (Vercel)

- **Root Directory** do projeto Vercel: `portfolio/`
- `vercel.json` já faz o rewrite de SPA (excluindo `/api`).
- A pasta `api/` é detectada automaticamente como Serverless Functions.

## Follow-ups conhecidos

- **Otimizar imagens**: `src/assets/projects/screenweather.png` tem ~1.16 MB. Converter os
  screenshots para `.webp`/`.avif` e reduzir resolução (lazy-loaded, não é LCP, mas vale).
- **Conteúdo**: revisar a bio (`i18n/locales/*/translation.json`), o CV em `public/cv/` e a
  lista de projetos/skills em `src/data/`.
- **OG image**: gerar `public/og/og-image.png` (1200x630) — referenciado no `index.html`.
- **Fontes**: hoje via Google Fonts (`<link>`). Self-hostar woff2 é uma otimização opcional.
