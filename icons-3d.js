// Simplified, recognizable brand glyphs used inside the 3D icon badges.
// Hand-drawn silhouettes (not trademarked logo files) — clean geometric
// shapes that read clearly at small sizes with the badge's brand-color background.
window.SOCIAL_ICONS = {
  youtube: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.5" y="5" width="21" height="14" rx="4.5" fill="currentColor" opacity="0.15"/>
    <path d="M10 8.5L16 12L10 15.5V8.5Z" fill="currentColor"/>
  </svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2.5" y="2.5" width="19" height="19" rx="6" stroke="currentColor" stroke-width="1.8"/>
    <circle cx="12" cy="12" r="4.6" stroke="currentColor" stroke-width="1.8"/>
    <circle cx="17.3" cy="6.7" r="1.3" fill="currentColor"/>
  </svg>`,
  facebook: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9.5" fill="currentColor" opacity="0.15"/>
    <path d="M14.5 8.5H13C12.4 8.5 12 8.9 12 9.5V11H14.5L14.1 13.5H12V19H9.5V13.5H8V11H9.5V9.2C9.5 7.2 10.7 6 12.7 6H14.5V8.5Z" fill="currentColor"/>
  </svg>`,
  github: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.5 2 2 6.6 2 12.2C2 16.7 4.9 20.5 8.9 21.8C9.4 21.9 9.6 21.6 9.6 21.3V19.5C6.9 20.1 6.3 18.3 6.3 18.3C5.8 17.1 5.1 16.8 5.1 16.8C4.2 16.1 5.2 16.2 5.2 16.2C6.1 16.3 6.6 17.2 6.6 17.2C7.5 18.7 8.9 18.3 9.5 18C9.6 17.4 9.8 17 10.1 16.7C7.9 16.5 5.6 15.6 5.6 11.8C5.6 10.7 6 9.8 6.6 9.1C6.5 8.9 6.1 7.8 6.7 6.4C6.7 6.4 7.6 6.1 9.6 7.4C10.4 7.2 11.3 7.1 12.2 7.1C13.1 7.1 14 7.2 14.8 7.4C16.8 6.1 17.7 6.4 17.7 6.4C18.3 7.8 17.9 8.9 17.8 9.1C18.4 9.8 18.8 10.7 18.8 11.8C18.8 15.6 16.5 16.5 14.3 16.7C14.6 17.1 14.9 17.7 14.9 18.7V21.3C14.9 21.6 15.1 21.9 15.6 21.8C19.6 20.5 22.4 16.7 22.4 12.2C22 6.6 17.5 2 12 2Z" fill="currentColor"/>
  </svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2.5" y="2.5" width="19" height="19" rx="4" fill="currentColor" opacity="0.15"/>
    <rect x="5.3" y="9.5" width="2.6" height="9" fill="currentColor"/>
    <circle cx="6.6" cy="6.2" r="1.6" fill="currentColor"/>
    <path d="M10.5 9.5H13V11C13.5 10.1 14.6 9.2 16.2 9.2C18.7 9.2 19.5 10.8 19.5 13.3V18.5H16.9V13.8C16.9 12.6 16.5 11.7 15.4 11.7C14.3 11.7 13.7 12.4 13.7 13.8V18.5H10.5V9.5Z" fill="currentColor"/>
  </svg>`,
  email: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2.5" y="5" width="19" height="14" rx="3" stroke="currentColor" stroke-width="1.8"/>
    <path d="M3.5 6.5L12 13L20.5 6.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  threads: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9.5" stroke="currentColor" stroke-width="1.8"/>
    <path d="M9 8.5C9 8.5 8 9 8 11.5C8 14.5 10 16 12.2 16C14.5 16 16 14.3 16 12.3C16 10.5 14.8 9.3 13.3 9.3C11.9 9.3 11 10.3 11 11.3C11 12.1 11.6 12.7 12.4 12.7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  </svg>`,

  /* ---- Tech / section icons (used on Skills, Projects, Certifications, Experience, Education, Contact) ---- */
  python: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3C9.5 3 9.2 4 9.2 4V6.2H12.1V6.9H6.7C6.7 6.9 4 6.6 4 12.1C4 17.6 6.4 17.3 6.4 17.3H8V15C8 15 7.9 12.6 10.3 12.6H14C14 12.6 16.2 12.6 16.2 10.4V5.2C16.2 5.2 16.5 3 12 3Z" fill="currentColor"/>
    <path d="M12 21C14.5 21 14.8 20 14.8 20V17.8H11.9V17.1H17.3C17.3 17.1 20 17.4 20 11.9C20 6.4 17.6 6.7 17.6 6.7H16V9C16 9 16.1 11.4 13.7 11.4H10C10 11.4 7.8 11.4 7.8 13.6V18.8C7.8 18.8 7.5 21 12 21Z" fill="currentColor" opacity="0.65"/>
    <circle cx="10.2" cy="4.9" r="0.7" fill="#0a0a10"/>
    <circle cx="13.8" cy="19.1" r="0.7" fill="#0a0a10"/>
  </svg>`,
  database: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="6" rx="7.5" ry="3" stroke="currentColor" stroke-width="1.8"/>
    <path d="M4.5 6V18C4.5 19.7 7.9 21 12 21C16.1 21 19.5 19.7 19.5 18V6" stroke="currentColor" stroke-width="1.8"/>
    <path d="M4.5 12C4.5 13.7 7.9 15 12 15C16.1 15 19.5 13.7 19.5 12" stroke="currentColor" stroke-width="1.8"/>
  </svg>`,
  server: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3.5" y="4" width="17" height="6" rx="1.6" stroke="currentColor" stroke-width="1.8"/>
    <rect x="3.5" y="14" width="17" height="6" rx="1.6" stroke="currentColor" stroke-width="1.8"/>
    <circle cx="7" cy="7" r="1" fill="currentColor"/>
    <circle cx="7" cy="17" r="1" fill="currentColor"/>
  </svg>`,
  ai: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="12" height="12" rx="3" stroke="currentColor" stroke-width="1.8"/>
    <circle cx="9.5" cy="11" r="1.1" fill="currentColor"/>
    <circle cx="14.5" cy="11" r="1.1" fill="currentColor"/>
    <path d="M9 15C9.7 15.7 10.8 16 12 16C13.2 16 14.3 15.7 15 15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M12 2V6M4 12H2M22 12H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
  </svg>`,
  tools: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.5 6.5L17.5 9.5L9.5 17.5L5.5 18.5L6.5 14.5L14.5 6.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M13 8L16 11" stroke="currentColor" stroke-width="1.8"/>
    <path d="M17 3.5C17 3.5 19 3.8 20 5C20.8 6 21 7.5 21 7.5L18.5 6.5L17 3.5Z" fill="currentColor"/>
  </svg>`,
  design: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
    <path d="M12 3C14 5 15 8.5 15 12C15 15.5 14 19 12 21" stroke="currentColor" stroke-width="1.6"/>
    <path d="M12 3C10 5 9 8.5 9 12C9 15.5 10 19 12 21" stroke="currentColor" stroke-width="1.6"/>
    <path d="M3.5 9H20.5M3.5 15H20.5" stroke="currentColor" stroke-width="1.6"/>
  </svg>`,
  people: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="8" r="3" stroke="currentColor" stroke-width="1.8"/>
    <path d="M3.5 19C3.5 15.7 6 13.5 9 13.5C12 13.5 14.5 15.7 14.5 19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="16.5" cy="8.5" r="2.3" stroke="currentColor" stroke-width="1.6" opacity="0.65"/>
    <path d="M15 13.8C17.5 13.8 19.8 15.5 20.3 18.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" opacity="0.65"/>
  </svg>`,
  briefcase: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="8" width="18" height="12" rx="2" stroke="currentColor" stroke-width="1.8"/>
    <path d="M8 8V6C8 4.9 8.9 4 10 4H14C15.1 4 16 4.9 16 6V8" stroke="currentColor" stroke-width="1.8"/>
    <path d="M3 13H21" stroke="currentColor" stroke-width="1.8"/>
    <rect x="10.3" y="12" width="3.4" height="2.6" rx="0.5" fill="currentColor"/>
  </svg>`,
  graduation: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 8L12 4L22 8L12 12L2 8Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M6 10.5V15C6 15 8 17 12 17C16 17 18 15 18 15V10.5" stroke="currentColor" stroke-width="1.8"/>
    <path d="M22 8V14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
  </svg>`,
  certificate: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="9" r="6" stroke="currentColor" stroke-width="1.8"/>
    <path d="M8.5 14L7 21L12 18.5L17 21L15.5 14" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M9.3 9L11 10.7L14.7 7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  research: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="3" width="14" height="18" rx="1.6" stroke="currentColor" stroke-width="1.8"/>
    <path d="M8 8H16M8 12H16M8 16H12.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  </svg>`,
  document: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 2.5H14L18 6.5V21.5H6V2.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M14 2.5V6.5H18" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M8.5 12H15.5M8.5 15.5H15.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  </svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 4.5C5 4.5 6 4 7.5 4C7.5 4 8.5 7 8 8C7.5 9 6.5 9 6.5 9.5C6.5 12 12 17.5 14.5 17.5C15 17.5 15 16.5 16 16C17 15.5 20 16.5 20 16.5C20 18 19.5 19 19.5 19C18.5 20.5 16.5 20.5 14.5 20C9.5 18.5 5.5 14.5 4 9.5C3.5 7.5 3.5 5.5 5 4.5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>
  </svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21C12 21 19 14.5 19 9.5C19 5.4 15.9 2.5 12 2.5C8.1 2.5 5 5.4 5 9.5C5 14.5 12 21 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <circle cx="12" cy="9.5" r="2.6" stroke="currentColor" stroke-width="1.7"/>
  </svg>`,
  star: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.5L14.8 8.6L21.5 9.4L16.6 13.9L18 20.5L12 17.1L6 20.5L7.4 13.9L2.5 9.4L9.2 8.6L12 2.5Z" fill="currentColor"/>
  </svg>`,
  chart: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 20V4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M4 20H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <rect x="7" y="13" width="2.8" height="5" fill="currentColor"/>
    <rect x="12" y="9" width="2.8" height="9" fill="currentColor"/>
    <rect x="17" y="6" width="2.8" height="12" fill="currentColor"/>
  </svg>`,
  git: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="6" r="2" stroke="currentColor" stroke-width="1.7"/>
    <circle cx="6" cy="18" r="2" stroke="currentColor" stroke-width="1.7"/>
    <circle cx="17" cy="12" r="2" stroke="currentColor" stroke-width="1.7"/>
    <path d="M6 8V16" stroke="currentColor" stroke-width="1.7"/>
    <path d="M6 8C6 11 8 12 11 12H15" stroke="currentColor" stroke-width="1.7"/>
  </svg>`,
  code: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 7L4 12L9 17" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15 7L20 12L15 17" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M13 4L11 20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" opacity="0.6"/>
  </svg>`,
  rocket: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C12 2 17 4 17 10C17 13 15.5 15.5 14 17L12 22L10 17C8.5 15.5 7 13 7 10C7 4 12 2 12 2Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>
    <circle cx="12" cy="9.5" r="1.8" stroke="currentColor" stroke-width="1.5"/>
    <path d="M7 15C5.5 15.5 4.5 17 4.5 19C6.5 19 8 18 8.5 16.5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M17 15C18.5 15.5 19.5 17 19.5 19C17.5 19 16 18 15.5 16.5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
  </svg>`
};
