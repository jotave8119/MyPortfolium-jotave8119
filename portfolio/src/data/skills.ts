import {
  FaReact,
  FaAngular,
  FaNodeJs,
  FaGitAlt,
  FaInstagram,
} from 'react-icons/fa6'
import {
  SiTypescript,
  SiNextdotjs,
  SiAstro,
  SiTailwindcss,
  SiSass,
  SiNestjs,
  SiBun,
  SiExpress,
  SiPrisma,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiWhatsapp,
  SiTwilio,
} from 'react-icons/si'
import type { Skill } from './types'

export const skills: Skill[] = [
  // Front-end
  { id: 'react', label: 'React.js', icon: FaReact, category: 'frontend' },
  { id: 'ts', label: 'TypeScript', icon: SiTypescript, category: 'frontend' },
  { id: 'next', label: 'Next.js', icon: SiNextdotjs, category: 'frontend' },
  { id: 'angular', label: 'Angular', icon: FaAngular, category: 'frontend' },
  { id: 'rn', label: 'React Native', icon: FaReact, category: 'frontend' },
  { id: 'astro', label: 'Astro', icon: SiAstro, category: 'frontend' },
  { id: 'tailwind', label: 'Tailwind', icon: SiTailwindcss, category: 'frontend' },
  { id: 'scss', label: 'SCSS', icon: SiSass, category: 'frontend' },
  { id: 'mui', label: 'MUI', category: 'frontend' },

  // Back-end & infra
  { id: 'node', label: 'Node.js', icon: FaNodeJs, category: 'backend' },
  { id: 'nest', label: 'NestJS', icon: SiNestjs, category: 'backend' },
  { id: 'bun', label: 'Bun', icon: SiBun, category: 'backend' },
  { id: 'hono', label: 'Hono', category: 'backend' },
  { id: 'express', label: 'Express.js', icon: SiExpress, category: 'backend' },
  { id: 'prisma', label: 'Prisma ORM', icon: SiPrisma, category: 'backend' },
  { id: 'postgres', label: 'PostgreSQL', icon: SiPostgresql, category: 'backend' },
  { id: 'mongo', label: 'MongoDB', icon: SiMongodb, category: 'backend' },
  { id: 'docker', label: 'Docker', icon: SiDocker, category: 'backend' },
  { id: 'railway', label: 'Railway', category: 'backend' },

  // Integrations
  { id: 'whatsapp', label: 'WhatsApp API', icon: SiWhatsapp, category: 'integrations' },
  { id: 'twilio', label: 'Twilio', icon: SiTwilio, category: 'integrations' },
  { id: 'instagram', label: 'Instagram API', icon: FaInstagram, category: 'integrations' },
  { id: 'llm', label: 'LLMs / Prompt Eng.', category: 'integrations' },

  // Practices & tooling
  { id: 'git', label: 'Git Flow', icon: FaGitAlt, category: 'tooling' },
  { id: 'scrum', label: 'Scrum', category: 'tooling' },
  { id: 'kanban', label: 'Kanban', category: 'tooling' },
  { id: 'cleancode', label: 'Clean Code', category: 'tooling' },
  { id: 'solid', label: 'SOLID', category: 'tooling' },
  { id: 'codereview', label: 'Code Review', category: 'tooling' },
]
