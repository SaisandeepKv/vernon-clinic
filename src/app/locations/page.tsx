import type { Metadata } from 'next'
import Link from 'next/link'
import { locations } from '@/data/locations'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Clinic Locations | Banjara Hills, Manikonda, Gachibowli',
  description:
    'Vernon Skin and Hair Clinic locations in Hyderabad. Visit us at Banjara Hills, Manikonda, or Gachibowli. Same UK-trained dermatologist, three convenient locations.',
}

export default function LocationsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Locations', href: '/locations' }]} />

      <section className="py-12 lg:py-20">
        <div className="section-max-width section-padding">
          <ScrollReveal>
            <span className="label">Our Locations</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="heading-1 mt-3">
              Three clinics across Hyderabad
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="body-large mt-6 max-w-2xl">
              Same doctor. Same standards. Same evidence-based protocols. Choose the
              Vernon location most convenient for your schedule.
            </p>
          </ScrollReveal>

          <StaggerReveal className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3" staggerDelay={0.15} baseDelay={0.1}>
            {locations.map((location) => (
              <StaggerItem key={location.id}>
                <Link
                  href={`/locations/${location.slug}`}
                  className="group card flex h-full flex-col"
                >
                  {/* Map placeholder */}
                  <div className="aspect-video overflow-hidden rounded-lg bg-brand-100">
                    <div className="flex h-full items-center justify-center text-sm text-brand-400">
                      <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      View on map
                    </div>
                  </div>

                  <h2 className="mt-4 text-xl font-medium text-brand-900 group-hover:text-earth-700">
                    Vernon — {location.name}
                  </h2>

                  <p className="mt-2 flex-1 text-sm text-brand-500">
                    {location.address}
                  </p>

                  <div className="mt-4 space-y-2">
                    {location.timings.map((t) => (
                      <div key={t.days} className="flex justify-between text-sm">
                        <span className="text-brand-400">{t.days}</span>
                        <span className="font-medium text-brand-700">{t.hours}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 border-t border-brand-50 pt-4">
                    {location.services.slice(0, 4).map((s) => (
                      <span key={s} className="badge text-2xs">{s}</span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-4">
                    <span className="text-sm text-earth-600">
                      {location.phone}
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>
    </>
  )
}
