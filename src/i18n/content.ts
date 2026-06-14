// ───────────────────────────────────────────────────────────────────────────
//  Bilingual content layer.
//
//  Every user-facing string lives here, once per language. Components read the
//  active language's object (`t`) — they contain NO hardcoded copy. The active
//  language is fixed at BUILD time via VITE_LANG ('en' | 'ar'); we produce two
//  static builds (dist/en, dist/ar) so each URL is a self-contained localized
//  page with its own lang/dir, fonts, and link-preview card.
//
//  ⚠️ The Arabic copy below is a DRAFT for the couple to approve — names, the
//  date format (Arabic-Indic vs Western numerals), and the formal phrasing in
//  particular. Edit values here freely; component code never needs to change.
// ───────────────────────────────────────────────────────────────────────────

export type Lang = 'en' | 'ar'

export type GreetingLine = { words: string[]; accent?: boolean }

export type Content = {
  lang: Lang
  dir: 'ltr' | 'rtl'
  htmlLang: string

  // <head> / sharing
  metaTitle: string
  metaDescription: string
  ogTitle: string
  ogDescription: string

  scrollToOpen: string

  // The letter greeting revealed word-by-word inside the envelope.
  greeting: {
    lines: GreetingLine[]
    baseSize: string // cqw
    accentSize: string // cqw
  }

  names: { bride: string; groom: string; combined: string }

  date: {
    eyebrow: string
    day: string
    full: string
    time: string
  }

  venue: {
    eyebrow: string
    name: string
    address: string
    mapUrl: string
    viewOnMap: string
    closing: string
  }

  addToCalendar: {
    label: string
    google: string
    apple: string
    outlook: string
  }

  rsvp: {
    eyebrow: string
    byHeading: string // the "respond by …" section heading
    subline: string
    replyButton: string
    // modal
    modalTitle: string
    successTitleYes: string // header after a "yes" reply
    successTitleNo: string // header after a "no" reply
    nameLabel: string
    comingLegend: string
    yesLabel: string
    yesSub: string
    noLabel: string
    noSub: string
    guestsLegend: string
    justMe: string
    plusOne: string
    noteLabel: string
    noteOptional: string
    notePlaceholder: string
    send: string
    sending: string
    thanks: (name: string) => string
    comingYesMsg: string
    comingNoMsg: string
    close: string
    errorGeneric: string
    errorNoWebhook: string
  }

  footer: {
    withLove: string
  }

  // iCalendar event text (Add-to-calendar / .ics)
  calendar: {
    title: string
    description: string
  }
}

// Shared, language-neutral facts (not translated).
const MAP_URL = 'https://maps.app.goo.gl/AY8XTkxWRh66NewF7'
const ADDRESS = 'Västra Hindbyvägen 18, 214 58 Malmö'

export const en: Content = {
  lang: 'en',
  dir: 'ltr',
  htmlLang: 'en',

  metaTitle: 'Hani & Roaa — September 5, 2026',
  metaDescription:
    'Together with our families, we request the honour of your presence — Hani & Roaa, September 5, 2026, at Magic Events in Malmö. Kindly RSVP by August 1.',
  ogTitle: 'Hani & Roaa — September 5, 2026',
  ogDescription:
    'Together with our families, we request the honour of your presence at Magic Events, Malmö. Kindly RSVP by August 1.',

  scrollToOpen: 'Scroll to open',

  greeting: {
    lines: [
      { words: ['Kindly', 'join', 'us', 'to'] },
      { words: ['celebrate', 'the', 'wedding', 'of'] },
      { words: ['Hani', '&', 'Roaa'], accent: true },
    ],
    baseSize: '3.4cqw',
    accentSize: '4.6cqw',
  },

  names: { bride: 'Hani', groom: 'Roaa', combined: 'Hani & Roaa' },

  date: {
    eyebrow: 'Save the date',
    day: 'Saturday',
    full: 'September 5, 2026',
    time: '5:00 PM',
  },

  venue: {
    eyebrow: 'The venue',
    name: 'Magic Events',
    address: ADDRESS,
    mapUrl: MAP_URL,
    viewOnMap: 'View on map',
    closing: 'Reception and dinner to follow',
  },

  addToCalendar: {
    label: 'Add to calendar',
    google: 'Google Calendar',
    apple: 'Apple Calendar',
    outlook: 'Outlook',
  },

  rsvp: {
    eyebrow: 'RSVP',
    byHeading: 'Kindly respond by August 1, 2026',
    subline: 'We can’t wait to celebrate with you',
    replyButton: 'Reply',
    modalTitle: 'Will you be there?',
    successTitleYes: 'Wonderful!',
    successTitleNo: 'Thank you',
    nameLabel: 'Your name',
    comingLegend: 'Are you coming?',
    yesLabel: 'Count me in',
    yesSub: 'Wouldn’t miss it',
    noLabel: 'Can’t make it',
    noSub: 'Sending love',
    guestsLegend: 'Bringing anyone?',
    justMe: 'Just me',
    plusOne: 'Plus one',
    noteLabel: 'A note for us',
    noteOptional: '(optional)',
    notePlaceholder: 'A wish, a song request, anything…',
    send: 'Send my reply',
    sending: 'Sending…',
    thanks: (name) => `Thanks, ${name}!`,
    comingYesMsg: 'Can’t wait to see you there!',
    comingNoMsg: 'You’ll be missed!',
    close: 'Close',
    errorGeneric: 'Something went wrong. Please try again or contact us.',
    errorNoWebhook:
      'Sorry — online RSVP isn’t available right now. Please reach out to us directly to let us know.',
  },

  footer: {
    withLove: 'With love',
  },

  calendar: {
    title: 'Hani & Roaa’s Wedding',
    description: 'Reception and dinner to follow. With love, Hani & Roaa.',
  },
}

// ⚠️ DRAFT — pending the couple's approval (names, numerals, phrasing).
export const ar: Content = {
  lang: 'ar',
  dir: 'rtl',
  htmlLang: 'ar',

  metaTitle: 'هاني و رؤى — ٥ سبتمبر ٢٠٢٦',
  metaDescription:
    'بمشاركة عائلتينا، يسعدنا دعوتكم لحضور حفل زفاف هاني و رؤى — ٥ سبتمبر ٢٠٢٦، في Magic Events بمدينة مالمو. نرجو تأكيد الحضور قبل الأول من آب.',
  ogTitle: 'هاني و رؤى — ٥ سبتمبر ٢٠٢٦',
  ogDescription:
    'بمشاركة عائلتينا، يسعدنا دعوتكم لحضور حفل زفافنا في Magic Events بمالمو. نرجو تأكيد الحضور قبل الأول من آب.',

  scrollToOpen: 'مرّر لفتح الدعوة',

  greeting: {
    lines: [
      { words: ['يسعدنا', 'دعوتكم'] },
      { words: ['لحضور', 'حفل', 'زفاف'] },
      { words: ['هاني', 'و', 'رؤى'], accent: true },
    ],
    // Kept close to the English sizes so the 3-line block clears the wax seal.
    baseSize: '3.7cqw',
    accentSize: '4.8cqw',
  },

  names: { bride: 'هاني', groom: 'رؤى', combined: 'هاني و رؤى' },

  date: {
    eyebrow: 'الموعد',
    day: 'السبت',
    full: '٥ سبتمبر ٢٠٢٦',
    time: 'الساعة الخامسة مساءً',
  },

  venue: {
    eyebrow: 'المكان',
    name: 'Magic Events',
    address: ADDRESS,
    mapUrl: MAP_URL,
    viewOnMap: 'اعرض على الخريطة',
    closing: 'يتضمن حفل استقبال وعشاء',
  },

  addToCalendar: {
    label: 'أضِف إلى التقويم',
    google: 'تقويم Google',
    apple: 'تقويم Apple',
    outlook: 'Outlook',
  },

  rsvp: {
    eyebrow: 'تأكيد الحضور',
    byHeading: 'نرجو الرد قبل الأول من آب ٢٠٢٦',
    subline: 'بحضوركم تكتمل فرحتنا',
    replyButton: 'ردّ',
    modalTitle: '',
    successTitleYes: 'رائع!',
    successTitleNo: 'شكراً لكم',
    nameLabel: 'اسمك',
    comingLegend: 'هل ستحضرون؟',
    yesLabel: 'سأحضر',
    yesSub: 'بكل سرور',
    noLabel: 'لن أتمكن',
    noSub: 'مع خالص المحبة',
    guestsLegend: 'هل ستصطحبون أحداً؟',
    justMe: 'بمفردي',
    plusOne: 'وضيف',
    noteLabel: 'رسالة لنا',
    noteOptional: '(اختياري)',
    notePlaceholder: 'أمنية، أغنية تطلبونها، أي شيء…',
    send: 'أرسل ردّي',
    sending: 'جارٍ الإرسال…',
    thanks: (name) => `شكراً، ${name}!`,
    comingYesMsg: 'يسعدنا ويشرفنا حضوركم',
    comingNoMsg: 'سنفتقدكم!',
    close: 'إغلاق',
    errorGeneric: 'حدث خطأ ما. يرجى المحاولة مرة أخرى أو التواصل معنا.',
    errorNoWebhook:
      'نعتذر — تأكيد الحضور عبر الموقع غير متاح حالياً. يرجى التواصل معنا مباشرة لإعلامنا.',
  },

  footer: {
    withLove: 'مع الحب',
  },

  calendar: {
    title: 'حفل زفاف هاني و رؤى',
    description: 'يتضمن حفل استقبال وعشاء. مع الحب، هاني و رؤى.',
  },
}

const CONTENT: Record<Lang, Content> = { en, ar }

// Active language is baked at build time (VITE_LANG); defaults to English so
// `npm run dev` with no env shows the English site. The optional-chained read
// keeps this module safe to import from the Vite config (Node context, where
// import.meta.env is undefined) so the build can pull per-language <head> copy.
const viteLang = (import.meta as { env?: { VITE_LANG?: string } }).env?.VITE_LANG
export const lang: Lang = viteLang === 'ar' ? 'ar' : 'en'

export const t: Content = CONTENT[lang]
