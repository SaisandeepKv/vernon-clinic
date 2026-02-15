import type { Metadata } from 'next'
import Link from 'next/link'
import { treatmentCategories, allTreatments as treatments } from '@/data/treatments'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Treatments | Hair Transplant, Pico Laser, Botox & More',
  description:
    'Complete list of dermatology and cosmetic treatments at Vernon Skin and Hair Clinic Hyderabad. Hair transplant, Pico laser, Botox, fillers, acne scar treatment, vitiligo surgery by UK-trained surgeon.',
}

export default function TreatmentsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Treatments', href: '/treatments' }]} />

      <section className="py-12 lg:py-20">
        <div className="section-max-width section-padding">
          <ScrollReveal>
            <span className="label">All Treatments</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="heading-1 mt-3 max-w-3xl">
              Surgeon-led dermatology{' '}
              <span className="italic text-brand-600">across every discipline</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="body-large mt-6 max-w-2xl">
              Every treatment at Vernon is performed or directly supervised by
              Dr. R. Brahmananda Reddy. Select a category to explore our
              evidence-based treatment protocols.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {treatmentCategories.map((category, catIndex) => {
        const categoryTreatments = treatments.filter(
          (t) => t.category.id === category.id
        )

        return (
          <section
            key={category.id}
            className="border-t border-brand-100 py-16"
          >
            <div className="section-max-width section-padding">
              <ScrollReveal>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="heading-3">{category.name}</h2>
                    <p className="body-base mt-2 max-w-xl">
                      {category.description}
                    </p>
                  </div>
                  <Link
                    href={`/treatments/${category.slug}`}
                    className="btn-ghost hidden sm:inline-flex"
                  >
                    View all
                  </Link>
                </div>
              </ScrollReveal>

              <StaggerReveal className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1} baseDelay={0.15}>
                {categoryTreatments.map((treatment) => (
                  <StaggerItem key={treatment.id}>
                    <Link
                      href={`/treatments/${category.slug}/${treatment.slug}`}
                      className="group card flex h-full flex-col"
                    >
                      <h3 className="text-lg font-medium text-brand-900 group-hover:text-earth-700">
                        {treatment.name}
                      </h3>
                      <p className="mt-2 flex-1 text-sm text-brand-500">
                        {treatment.shortDescription}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="badge">{treatment.duration}</span>
                        <span className="badge">{treatment.sessions}</span>
                        <span className="badge">{treatment.downtime} downtime</span>
                      </div>
                      <div className="mt-4 flex items-center text-sm font-medium text-earth-600">
                        Learn more
                        <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerReveal>
            </div>
          </section>
        )
      })}
    </>
  )
}
