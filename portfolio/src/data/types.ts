import type { IconType } from 'react-icons'

export interface Project {
  id: string
  title: string
  /** i18n key under `work.projects.*` */
  descKey: string
  href: string
  repo?: string
  image: string
  stack: string[]
  year: number
  featured?: boolean
}

export type SkillCategory = 'frontend' | 'backend' | 'integrations' | 'tooling'

export interface Skill {
  id: string
  label: string
  /** optional — items without a known icon render as text chips */
  icon?: IconType
  category: SkillCategory
}

export interface Social {
  id: string
  /** i18n key under `contact.*` */
  labelKey: string
  href: string
  icon: IconType
  /** plain handle/value shown as secondary text */
  handle: string
}
