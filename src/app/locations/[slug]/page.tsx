import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { locations, getLocation } from '@/data/locations'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { BookingCTA } from '@/components/booking/BookingCTA'
import { SchemaOrg } from '@/components/schema/SchemaOrg'
import { generateLocalBusinessSchema } from '@/lib/schema'
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ui/ScrollReveal'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const location = getLocation(slug)
  if (!location) return {}

  const geoDescriptions: Record<string, string> = {
    'banjara-hills': `Visit Vernon Skin and Hair Clinic in Banjara Hills, Hyderabad. Premium dermatology consultations with UK-trained Dr. Brahmananda Reddy. Hair transplant, Pico laser, Botox & fillers near Road No. 12, Banjara Hills.`,
    'manikonda': `Vernon Skin and Hair Clinic Manikonda — Hyderabad's trusted dermatology center near Lanco Hills. Hair transplant, laser treatments, acne scar revision & clinical dermatology by Dr. Brahmananda Reddy.`,
    'gachibowli': `Vernon Skin and Hair Clinic Gachibowli — convenient dermatology for IT professionals near DLF Cyber City. Hair transplant, Pico laser, skin treatments by UK-trained Dr. Brahmananda Reddy.`,
  }

  const geoKeywords: Record<string, string[]> = {
    'banjara-hills': ['dermatologist Banjara Hills', 'skin clinic Banjara Hills', 'hair transplant Banjara Hills', 'Vernon clinic Road No 12'],
    'manikonda': ['dermatologist Manikonda', 'skin clinic Manikonda', 'hair transplant Manikonda', 'Vernon clinic Lanco Hills'],
    'gachibowli': ['dermatologist Gachibowli', 'skin clinic Gachibowli', 'hair transplant Gachibowli', 'Vernon clinic DLF Cyber City'],
  }

  return {
    title: location.metaTitle,
    description: geoDescriptions[slug] || location.metaDescription,
    keywords: geoKeywords[slug] || [],
    alternates: {
      canonical: `https://vernonskinclinic.com/locations/${location.slug}`,
    },
  }
}

export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params
  const location = getLocation(slug)
  if (!location) notFound()

  const demographicContent = {
    premium: {
      tagline: 'The Flagship',
      description:
        'Our Banjara Hills clinic is Vernon\'s primary surgical center — the location where Dr. Brahmananda Reddy performs the majority of complex procedures including hair transplant surgery, Pico laser treatments, and injectable aesthetics. Situated in Hyderabad\'s most prestigious neighborhood, this clinic offers a private, discreet environment for patients seeking premium dermatological care.',
      features: [
        'Full surgical suite for hair transplant',
        'Pico laser treatment room',
        'Injectable aesthetics suite',
        'Private consultation rooms',
        'On-site pharmacy',
      ],
    },
    'it-professionals': {
      tagline: 'Designed for Your Schedule',
      description:
        `Vernon ${location.name} is strategically positioned for the IT professionals and young professionals working in the Gachibowli–Manikonda–Financial District corridor. We understand that your time is premium — our ${location.name} clinic is designed for efficient consultations, lunchtime procedures, and treatments that fit around your work schedule without requiring a drive to the city center.`,
      features: [
        'Convenient for IT corridor professionals',
        'Lunchtime-friendly procedure durations',
        'Evening appointments available',
        'Efficient consultation model',
        'All essential dermatology services',
      ],
    },
  }

  const content = demographicContent[location.demographic as keyof typeof demographicContent] || demographicContent.premium

  return (
    <>
      <SchemaOrg schema={generateLocalBusinessSchema(location)} />
      <Breadcrumbs
        items={[
          { name: 'Locations', href: '/locations' },
          { name: location.name, href: `/locations/${location.slug}` },
        ]}
      />

      <section className="py-12 lg:py-20">
        <div className="section-max-width section-padding">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
            <div className="lg:col-span-2">
              <ScrollReveal>
                <span className="label">{content.tagline}</span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h1 className="heading-1 mt-3">
                  Vernon — {location.name}
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="body-large mt-6">
                  {content.description}
                </p>
              </ScrollReveal>

              {/* Address & Contact */}
              <StaggerReveal className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2" staggerDelay={0.12} baseDelay={0.15}>
                <StaggerItem>
                  <div className="card-flat">
                    <h3 className="text-sm font-semibold text-vernon-400">Address</h3>
                    <p className="mt-2 text-sm text-vernon-700">{location.address}</p>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="card-flat">
                    <h3 className="text-sm font-semibold text-vernon-400">Contact</h3>
                    <p className="mt-2">
                      <a href={`tel:${location.phone}`} className="text-sm text-clinical-600 hover:underline">
                        {location.phone}
                      </a>
                    </p>
                    <p className="mt-1">
                      <a href={`mailto:${location.email}`} className="text-sm text-vernon-600 hover:underline">
                        {location.email}
                      </a>
                    </p>
                  </div>
                </StaggerItem>
              </StaggerReveal>

              {/* Timings */}
              <ScrollReveal className="mt-8">
                <h2 className="heading-4">Clinic Timings</h2>
              </ScrollReveal>
              <StaggerReveal className="mt-4 space-y-2" staggerDelay={0.08}>
                {location.timings.map((t) => (
                  <StaggerItem key={t.days}>
                    <div className="flex items-center justify-between rounded-lg bg-vernon-50 px-4 py-3">
                      <span className="text-sm text-vernon-600">{t.days}</span>
                      <span className="text-sm font-medium text-vernon-900">{t.hours}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerReveal>

              {/* Services at this location */}
              <ScrollReveal className="mt-10">
                <h2 className="heading-4">Services Available</h2>
              </ScrollReveal>
              <StaggerReveal className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2" staggerDelay={0.06}>
                {location.services.map((service) => (
                  <StaggerItem key={service}>
                    <div className="flex items-center gap-2 rounded-lg border border-vernon-100 px-4 py-3">
                      <svg className="h-4 w-4 flex-shrink-0 text-clinical-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-vernon-700">{service}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerReveal>

              {/* Clinic Features */}
              <ScrollReveal className="mt-10">
                <h2 className="heading-4">Clinic Features</h2>
              </ScrollReveal>
              <StaggerReveal className="mt-4 space-y-2" staggerDelay={0.08}>
                {content.features.map((feature) => (
                  <StaggerItem key={feature}>
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4 flex-shrink-0 text-vernon-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className="text-sm text-vernon-600">{feature}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerReveal>

              {/* Map */}
              <ScrollReveal className="mt-10">
                <h2 className="heading-4">Find Us</h2>
                <div className="mt-4 aspect-[16/9] overflow-hidden rounded-xl border border-vernon-100">
                  <iframe
                    src={location.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Vernon Skin and Hair Clinic ${location.name} Map`}
                  />
                </div>
              </ScrollReveal>
            </div>

            {/* Sidebar */}
            <ScrollReveal direction="right" delay={0.2} className="lg:col-span-1">
              <BookingCTA location={location.name} variant="floating" />

              {/* Other locations */}
              <div className="mt-8 rounded-xl border border-vernon-100 bg-white p-6">
                <h3 className="text-sm font-semibold text-vernon-400">Other Locations</h3>
                <div className="mt-4 space-y-3">
                  {locations
                    .filter((l) => l.id !== location.id)
                    .map((l) => (
                      <Link
                        key={l.id}
                        href={`/locations/${l.slug}`}
                        className="block rounded-lg bg-vernon-50 px-4 py-3 transition-colors hover:bg-vernon-100"
                      >
                        <p className="text-sm font-medium text-vernon-900">Vernon — {l.name}</p>
                        <p className="mt-0.5 text-xs text-vernon-400 line-clamp-1">{l.address}</p>
                      </Link>
                    ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
