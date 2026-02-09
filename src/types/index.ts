export interface Doctor {
  id: string
  name: string
  slug: string
  title: string
  qualifications: string[]
  specializations: string[]
  memberships: string[]
  experience: string
  bio: string
  image: string
  locations: string[]
  awards: Award[]
  trainingRoles: string[]
}

export interface Award {
  title: string
  year: string
  issuer: string
}

export interface Location {
  id: string
  name: string
  slug: string
  address: string
  phone: string
  whatsapp: string
  email: string
  mapUrl: string
  coordinates: { lat: number; lng: number }
  timings: { days: string; hours: string }[]
  doctors: string[]
  services: string[]
  demographic: string
  metaTitle: string
  metaDescription: string
}

export interface Treatment {
  id: string
  name: string
  slug: string
  category: TreatmentCategory
  shortDescription: string
  heroDescription: string
  image?: string
  duration: string
  sessions: string
  downtime: string
  suitableFor: string[]
  contraindications: string[]
  technologies: string[]
  faqs: FAQ[]
  metaTitle: string
  metaDescription: string
}

export interface TreatmentCategory {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  image?: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface GalleryItem {
  id: string
  treatment: string
  beforeImage: string
  afterImage: string
  patientAge: string
  patientGender: string
  sessions: string
  duration: string
  description: string
  category: string
}

export interface Testimonial {
  id: string
  name: string
  treatment: string
  location: string
  rating: number
  review: string
  date: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  image: string
  metaTitle: string
  metaDescription: string
}

export interface BookingContext {
  treatment?: string
  location?: string
  doctor?: string
  source?: string
}

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}
