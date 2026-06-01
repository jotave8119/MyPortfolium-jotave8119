import { FaLinkedinIn, FaGithub, FaWhatsapp } from 'react-icons/fa6'
import { FiMail } from 'react-icons/fi'
import type { Social } from './types'

export const EMAIL = 'teixeirajoaovitor0@gmail.com'
export const PHONE_INTL = '5521969276579' // (21) 96927-6579

export const socials: Social[] = [
  {
    id: 'linkedin',
    labelKey: 'contact.linkedin',
    href: 'https://www.linkedin.com/in/joaoteixeira13/',
    icon: FaLinkedinIn,
    handle: '/in/joaoteixeira13',
  },
  {
    id: 'github',
    labelKey: 'contact.github',
    href: 'https://github.com/jotave8119',
    icon: FaGithub,
    handle: '@jotave8119',
  },
  {
    id: 'whatsapp',
    labelKey: 'contact.whatsapp',
    href: `https://wa.me/${PHONE_INTL}?text=Vim%20pelo%20portf%C3%B3lio`,
    icon: FaWhatsapp,
    handle: '+55 21 96927-6579',
  },
  {
    id: 'email',
    labelKey: 'contact.email',
    href: `mailto:${EMAIL}?subject=Vim%20pelo%20portf%C3%B3lio`,
    icon: FiMail,
    handle: EMAIL,
  },
]
