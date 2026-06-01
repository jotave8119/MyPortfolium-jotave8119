import type { Project } from './types'

import devducks from '@/assets/projects/screendevducks.png'
import devhelp from '@/assets/projects/screendevhelp.png'
import kenziehub from '@/assets/projects/screenkenziehub.png'
import burger from '@/assets/projects/screenburguer.png'
import nukenzie from '@/assets/projects/screennukenzie.png'
import weather from '@/assets/projects/screenweather.png'

/**
 * Project URLs preserved from the previous portfolio.
 * `stack` and `year` are best-effort — adjust to match reality.
 * `repo` is left undefined where the repository URL is unknown.
 */
export const projects: Project[] = [
  {
    id: 'devducks',
    title: 'DevDucks',
    descKey: 'work.projects.devducks',
    href: 'https://devducksjv.vercel.app/',
    image: devducks,
    stack: ['React', 'TypeScript', 'Styled Components'],
    year: 2023,
    featured: true,
  },
  {
    id: 'devhelp',
    title: 'DevHelp',
    descKey: 'work.projects.devhelp',
    href: 'https://grupo3-front-end-m3.vercel.app/home',
    image: devhelp,
    stack: ['React', 'TypeScript', 'Team project'],
    year: 2023,
  },
  {
    id: 'kenziehub',
    title: 'Kenzie Hub',
    descKey: 'work.projects.kenziehub',
    href: 'https://kezie-hub-kohl.vercel.app/',
    image: kenziehub,
    stack: ['React', 'TypeScript', 'React Router'],
    year: 2022,
  },
  {
    id: 'burger',
    title: 'Hamburgueria Kenzie',
    descKey: 'work.projects.burger',
    href: 'https://hamburgueria-opal-pi.vercel.app/',
    image: burger,
    stack: ['React', 'Context API', 'Styled Components'],
    year: 2022,
  },
  {
    id: 'nukenzie',
    title: 'NuKenzie',
    descKey: 'work.projects.nukenzie',
    href: 'https://nukenzie-s130.vercel.app/',
    image: nukenzie,
    stack: ['React', 'TypeScript'],
    year: 2022,
  },
  {
    id: 'weather',
    title: 'Weather App',
    descKey: 'work.projects.weather',
    href: 'https://jotave8119.github.io/project-weather/',
    image: weather,
    stack: ['JavaScript', 'HTML', 'CSS', 'REST API'],
    year: 2022,
  },
]
