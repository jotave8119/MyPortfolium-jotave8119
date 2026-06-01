import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register once for the whole app.
gsap.registerPlugin(ScrollTrigger)

// Avoid ScrollTrigger fighting mobile Safari's address-bar resize.
ScrollTrigger.config({ ignoreMobileResize: true })

export { gsap, ScrollTrigger }
