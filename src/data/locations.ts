import { Location } from '@/types'

export const locations: Location[] = [
  {
    id: 'banjara-hills',
    name: 'Banjara Hills',
    slug: 'banjara-hills',
    address:
      '4th Floor, Uptown Banjara, Above Q-Mart, Opposite TV9 Office, Road Number 3, Banjara Hills, Hyderabad, Telangana 500034',
    phone: '+91-9100017565',
    whatsapp: '+91-9100017565',
    email: 'info@vernonskinclinic.com',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.8456!2d78.4095!3d17.4156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zVmVybm9uIFNraW4gQ2xpbmlj!5e0!3m2!1sen!2sin!4v1',
    coordinates: { lat: 17.4156, lng: 78.4095 },
    timings: [
      { days: 'Monday – Sunday', hours: '11:00 AM – 9:00 PM' },
    ],
    doctors: ['dr-brahmananda-reddy'],
    services: [
      'Hair Transplant (FUE/FUT/DHI)',
      'Pico Laser',
      'Botox & Fillers',
      'Surgical Dermatology',
      'All Clinical Dermatology',
      'Body Contouring',
    ],
    demographic: 'premium',
    metaTitle:
      'Vernon Skin & Hair Clinic Banjara Hills | Best Dermatologist in Jubilee Hills Hyderabad',
    metaDescription:
      'Visit Vernon Skin and Hair Clinic in Banjara Hills, Hyderabad. UK-trained dermatosurgeon Dr. Brahmananda Reddy offers hair transplant, Pico laser, Botox & advanced skin treatments. 4.9/5 Google rating.',
  },
  {
    id: 'manikonda',
    name: 'Manikonda',
    slug: 'manikonda',
    address:
      '2nd Floor, Plot 7, Fortune Towers, Pipeline Road, Puppalaguda, Sri Ram Nagar Colony, Manikonda, Hyderabad, Telangana 500089',
    phone: '+91-9100017567',
    whatsapp: '+91-9100017567',
    email: 'info@vernonskinclinic.com',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.5!2d78.385!3d17.395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zVmVybm9uIFNraW4gQ2xpbmlj!5e0!3m2!1sen!2sin!4v1',
    coordinates: { lat: 17.395, lng: 78.385 },
    timings: [
      { days: 'Monday – Sunday', hours: '11:00 AM – 9:00 PM' },
    ],
    doctors: ['dr-brahmananda-reddy'],
    services: [
      'Hair Transplant Consultation',
      'Laser Hair Reduction',
      'Acne & Scar Treatment',
      'PRP/GFC Therapy',
      'Clinical Dermatology',
      'Medi-Facials',
    ],
    demographic: 'it-professionals',
    metaTitle:
      'Vernon Skin & Hair Clinic Manikonda | Dermatologist Near Gachibowli IT Corridor',
    metaDescription:
      'Vernon Skin and Hair Clinic Manikonda – 4.7/5 on Google (2200+ reviews). Convenient dermatology near Gachibowli. Hair transplant, acne treatment, laser procedures. Open 7 days.',
  },
  {
    id: 'gachibowli',
    name: 'Gachibowli',
    slug: 'gachibowli',
    address:
      'No. 2-48, 107 & 107A, 2nd Floor, Opp. Al-saba Restaurant, Old Mumbai Highway, Telecom Nagar, Near Cyberabad Commissioner Office, Gachibowli, Hyderabad, Telangana 500032',
    phone: '+91-9100017566',
    whatsapp: '+91-9100017566',
    email: 'info@vernonskinclinic.com',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.0!2d78.362!3d17.378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zVmVybm9uIFNraW4gQ2xpbmlj!5e0!3m2!1sen!2sin!4v1',
    coordinates: { lat: 17.378, lng: 78.362 },
    timings: [
      { days: 'Monday – Sunday', hours: '11:00 AM – 9:00 PM' },
    ],
    doctors: ['dr-brahmananda-reddy'],
    services: [
      'Hair Transplant (Advanced)',
      'Laser Hair Reduction',
      'Acne Treatment',
      'Hair Loss Consultation',
      'Medi-Facials',
      'General Dermatology',
    ],
    demographic: 'it-professionals',
    metaTitle:
      'Vernon Skin & Hair Clinic Gachibowli | Skin Doctor Near Financial District Hyderabad',
    metaDescription:
      'Vernon Skin Clinic Gachibowli – advanced dermatology near Financial District & Cyberabad. Hair transplant, laser treatments, skincare. Open 7 days, 11AM–9PM.',
  },
]

export const getLocation = (slug: string): Location | undefined => {
  return locations.find((l) => l.slug === slug)
}
