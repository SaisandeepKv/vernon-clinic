import { TreatmentCategory } from '@/types'

export const treatmentCategories: TreatmentCategory[] = [
  {
    id: 'hair-restoration',
    name: 'Hair Restoration',
    slug: 'hair-restoration',
    description:
      'Surgical and non-surgical hair restoration by ISHRS-certified surgeon Dr. Brahmananda Reddy. From follicular unit extraction to PRP therapy.',
    icon: 'hair',
    image: 'https://images.unsplash.com/photo-1585747860019-5004e4784385?w=600&q=80',
  },
  {
    id: 'laser-and-pico',
    name: 'Laser & Pico Technology',
    slug: 'laser-and-pico',
    description:
      'US-FDA approved laser systems including Pico technology for pigmentation, tattoo removal, and skin rejuvenation. Calibrated for Indian skin types.',
    icon: 'laser',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80',
  },
  {
    id: 'clinical-dermatology',
    name: 'Clinical Dermatology',
    slug: 'clinical-dermatology',
    description:
      'Evidence-based diagnosis and treatment for acne, eczema, psoriasis, vitiligo, warts, moles, and pediatric skin conditions.',
    icon: 'clinical',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80',
  },
  {
    id: 'aesthetics',
    name: 'Aesthetics & Anti-Aging',
    slug: 'aesthetics',
    description:
      'Physician-administered Botox, dermal fillers, thread lifts, and medi-facials. Dr. Reddy is an official filler trainer for Menarini.',
    icon: 'aesthetics',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
  },
  {
    id: 'body-wellness',
    name: 'Body & Wellness',
    slug: 'body-wellness',
    description:
      'IV drip therapy, body contouring, stretch mark treatment, bridal packages, and holistic wellness programs. Comprehensive body care beyond the face.',
    icon: 'wellness',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80',
  },
]

export const getCategory = (slug: string): TreatmentCategory | undefined => {
  return treatmentCategories.find((c) => c.slug === slug)
}
