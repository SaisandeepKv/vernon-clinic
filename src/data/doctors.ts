import { Doctor } from '@/types'

export const doctors: Doctor[] = [
  {
    id: 'dr-brahmananda-reddy',
    name: 'Dr. R. Brahmananda Reddy',
    slug: 'dr-brahmananda-reddy',
    title: 'Founder & Chief Dermatosurgeon',
    qualifications: [
      'MBBS',
      'MSc in Dermatology Skills and Treatment (University of Hertfordshire, UK)',
      'Diploma in Dermatology (UK)',
      'Diploma in Aesthetic Medicine',
      'Fellowship in Aesthetic Medicine (ILAMED, University of Greifswald, Germany)',
    ],
    specializations: [
      'Hair Transplantation (FUE/FUT/DHI)',
      'Pico Laser Treatments',
      'Mohs Micrographic Surgery',
      'Vitiligo Surgery',
      'Botox & Dermal Fillers',
      'Clinical Dermatology',
      'Pediatric Dermatology',
      'Cyst & Lipoma Excision',
    ],
    memberships: [
      'International Society of Hair Restoration Surgery (ISHRS) — Associate Member',
      'Asian Association of Hair Restoration Surgery (AAHRS)',
      'Indian Association of Dermatologists, Venereologists and Leprologists (IADVL)',
      'Association of Cutaneous Surgeons of India (ACSI)',
    ],
    experience: '13+ years',
    bio: `Dr. R. Brahmananda Reddy is a UK-trained dermatosurgeon who founded Vernon Skin and Hair Clinic to bring international standards of dermatological care to Hyderabad. With a surgical background in General Surgery (MS) and advanced training in Dermatology from the University of Hertfordshire, UK, Dr. Reddy brings a precision-first approach to every procedure.

What distinguishes Dr. Reddy from most dermatologists is his dual expertise: he is both a trained surgeon and a board-certified aesthetician. This means he performs everything from complex hair transplant surgeries and Mohs micrographic excisions to delicate filler placements — all under one roof, with surgical-grade oversight.

As an official trainer for Menarini dermal fillers, Dr. Reddy regularly conducts training sessions for fellow physicians across Southeast Asia, including Malaysia and Bangkok. When other doctors need to learn advanced injection techniques, they come to Dr. Reddy. This "trainer of trainers" status is the highest validation of clinical skill in aesthetic medicine.

His diagnostic protocol is precise and rapid — with over 13 years of experience, Dr. Reddy identifies root causes efficiently, focusing clinical time on treatment rather than unnecessary consultation length. After diagnosis, dedicated Care Coordinators ensure patients receive thorough counseling on their treatment plan.`,
    image: '/images/dr-reddy.jpg',
    locations: ['banjara-hills', 'manikonda', 'gachibowli'],
    awards: [
      {
        title: 'Most Promising Hair Transplant Surgeon in Hyderabad',
        year: '2017',
        issuer: 'Merit Awards & Marketing Research Survey',
      },
      {
        title: 'The Best Doctor in Dermatology',
        year: '2018',
        issuer: 'Suman Theatres',
      },
      {
        title: 'Best Hair Transplant Surgeon',
        year: '2019',
        issuer: 'Honourable Governor of Telangana',
      },
      {
        title: 'Guinness World Record Participant — Largest Men\'s Health Awareness Lesson',
        year: '2018',
        issuer: 'MNJ Institute of Oncology & Regional Cancer Centre',
      },
    ],
    trainingRoles: [
      'Official Trainer – Menarini Dermal Fillers (International)',
      'Faculty – Advanced Hair Transplant Workshops (Malaysia, Bangkok)',
      'Guest Lecturer – Aesthetic Medicine Conferences',
      'Attended 24th World Congress of ISHRS (2016)',
    ],
  },
  {
    id: 'dr-asritha-reddy',
    name: 'Dr. Asritha Reddy',
    slug: 'dr-asritha-reddy',
    title: 'Aesthetic Physician & Anaesthesiologist',
    qualifications: [
      'MD Anaesthesia',
      'Certified in Aesthetic Medicine (AAAM)',
      'Advanced Injectable Training',
    ],
    specializations: [
      'Aesthetic Medicine',
      'Injectable Treatments (Botox & Fillers)',
      'Anaesthesia for Hair Transplant Surgery',
      'Non-Surgical Facial Rejuvenation',
      'IV Drip Therapy',
    ],
    memberships: [
      'American Academy of Aesthetic Medicine (AAAM)',
    ],
    experience: '8+ years',
    bio: `Dr. Asritha Reddy brings a unique combination of anaesthesiology expertise and aesthetic medicine certification to Vernon Clinic. Her dual background ensures patient comfort during lengthy procedures like hair transplant surgery while also providing advanced aesthetic treatments.

As a certified practitioner of the American Academy of Aesthetic Medicine, Dr. Asritha specializes in non-surgical facial rejuvenation, injectable aesthetics, and IV wellness therapy. Her understanding of pharmacology and patient physiology — honed through years of anaesthesia practice — translates into safer, more comfortable procedures with precise dosing and monitoring.

At Vernon, Dr. Asritha works alongside Dr. Brahmananda Reddy to deliver comprehensive care. She manages anaesthesia protocols for surgical procedures and independently performs aesthetic consultations and treatments at the Manikonda and Banjara Hills locations.`,
    image: '/images/dr-asritha.jpg',
    locations: ['banjara-hills', 'manikonda'],
    awards: [],
    trainingRoles: [
      'Aesthetic Medicine Practitioner – Vernon Clinic',
      'Anaesthesia Lead – Hair Transplant Surgery Program',
    ],
  },
]

export const getDoctor = (slug: string): Doctor | undefined => {
  return doctors.find((d) => d.slug === slug)
}

export const primaryDoctor = doctors[0]
