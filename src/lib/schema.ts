import { Doctor, Location, Treatment, FAQ } from '@/types'

export function generateMedicalOrganizationSchema(locations: Location[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    '@id': 'https://vernonskinclinic.com/#organization',
    name: 'Vernon Skin and Hair Clinic',
    alternateName: [
      'Vernon Skin Clinic',
      'Vernon Clinic Hyderabad',
      'Vernon Skinner',
      'Werner Skin Clinic',
      'Vernon Dermatology Hyderabad',
      'Vernon Skin and Hair Clinic Hyderabad',
    ],
    url: 'https://vernonskinclinic.com',
    logo: 'https://vernonskinclinic.com/images/logo.png',
    description:
      'Vernon Skin and Hair Clinic is a premier dermatology and hair restoration center in Hyderabad, founded by UK-trained dermatosurgeon Dr. R. Brahmananda Reddy. Specializing in hair transplant, Pico laser, Botox, and clinical dermatology.',
    foundingDate: '2011',
    founder: {
      '@type': 'Person',
      name: 'Dr. R. Brahmananda Reddy',
    },
    medicalSpecialty: [
      'Dermatology',
      'CosmeticSurgery',
      'HairRestoration',
    ],
    address: locations.map((loc) => ({
      '@type': 'PostalAddress',
      streetAddress: loc.address,
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      postalCode: loc.address.match(/\d{6}/)?.[0] || '',
      addressCountry: 'IN',
    })),
    telephone: '+91-9100017567',
    email: 'info@vernonskinclinic.com',
    areaServed: {
      '@type': 'City',
      name: 'Hyderabad',
    },
    sameAs: [
      'https://www.instagram.com/vernonskinclinic/',
      'https://www.youtube.com/@VERNONSKINCLINIC',
      'https://in.linkedin.com/company/vernon-skin-clinic',
      'https://www.practo.com/hyderabad/clinic/vernon-skin-and-hair-clinic-manikonda',
      'https://www.justdial.com/Hyderabad/Vernon-Skin-And-Hair-Clinic',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      ratingCount: '3245',
      reviewCount: '3245',
    },
    award: [
      'Most Promising Hair Transplant Clinic - Healthcare Excellence Awards 2019',
      'Excellence in Dermatology - Times Cyber Media 2020',
    ],
  }
}

export function generatePhysicianSchema(doctor: Doctor) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    '@id': `https://vernonskinclinic.com/about/${doctor.slug}#physician`,
    name: doctor.name,
    jobTitle: doctor.title,
    description: doctor.bio.substring(0, 300),
    image: `https://vernonskinclinic.com${doctor.image}`,
    url: `https://vernonskinclinic.com/about/${doctor.slug}`,
    medicalSpecialty: doctor.specializations.map((s) => ({
      '@type': 'MedicalSpecialty',
      name: s,
    })),
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'University of Hertfordshire',
        address: { '@type': 'PostalAddress', addressCountry: 'GB' },
      },
    ],
    memberOf: doctor.memberships.map((m) => ({
      '@type': 'MedicalOrganization',
      name: m,
    })),
    award: doctor.awards.map((a) => `${a.title} - ${a.issuer} (${a.year})`),
    knowsAbout: [
      'Hair Transplantation',
      'Pico Laser Technology',
      'Dermal Fillers',
      'Mohs Surgery',
      'Vitiligo Surgery',
      'Clinical Dermatology',
    ],
    worksFor: {
      '@type': 'MedicalOrganization',
      name: 'Vernon Skin and Hair Clinic',
      '@id': 'https://vernonskinclinic.com/#organization',
    },
  }
}

export function generateMedicalProcedureSchema(treatment: Treatment) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: treatment.name,
    description: treatment.shortDescription,
    url: `https://vernonskinclinic.com/treatments/${treatment.category.slug}/${treatment.slug}`,
    procedureType: 'http://schema.org/NoninvasiveProcedure',
    howPerformed: treatment.heroDescription.substring(0, 500),
    preparation: treatment.suitableFor.join('. '),
    followup: `${treatment.sessions} sessions, ${treatment.downtime} downtime`,
    status: 'http://schema.org/ActiveActionStatus',
    contraindication: treatment.contraindications.join(', '),
    bodyLocation: 'Skin',
    availableService: {
      '@type': 'MedicalTherapy',
      name: treatment.name,
      availableIn: {
        '@type': 'MedicalOrganization',
        name: 'Vernon Skin and Hair Clinic',
        '@id': 'https://vernonskinclinic.com/#organization',
      },
    },
  }
}

export function generateFAQSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateLocalBusinessSchema(location: Location) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: `Vernon Skin and Hair Clinic - ${location.name}`,
    image: 'https://vernonskinclinic.com/images/clinic-exterior.jpg',
    url: `https://vernonskinclinic.com/locations/${location.slug}`,
    telephone: location.phone,
    email: location.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address,
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng,
    },
    openingHoursSpecification: location.timings.map((t) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: t.days,
      opens: t.hours.split('–')[0]?.trim(),
      closes: t.hours.split('–')[1]?.trim(),
    })),
    parentOrganization: {
      '@type': 'MedicalOrganization',
      name: 'Vernon Skin and Hair Clinic',
      '@id': 'https://vernonskinclinic.com/#organization',
    },
    medicalSpecialty: ['Dermatology', 'CosmeticSurgery'],
    availableService: location.services.map((s) => ({
      '@type': 'MedicalProcedure',
      name: s,
    })),
  }
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://vernonskinclinic.com/#website',
    name: 'Vernon Skin and Hair Clinic',
    url: 'https://vernonskinclinic.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://vernonskinclinic.com/treatments?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'MedicalOrganization',
      '@id': 'https://vernonskinclinic.com/#organization',
    },
  }
}

export function generateVideoObjectSchema(video: {
  name: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  contentUrl?: string
  embedUrl?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate,
    contentUrl: video.contentUrl,
    embedUrl: video.embedUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Vernon Skin and Hair Clinic',
      '@id': 'https://vernonskinclinic.com/#organization',
    },
  }
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://vernonskinclinic.com${item.url}`,
    })),
  }
}
