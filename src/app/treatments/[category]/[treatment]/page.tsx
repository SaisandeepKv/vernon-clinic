import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { allTreatments as treatments, treatmentCategories, getTreatment, getCategory } from '@/data/treatments'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { SocialFollowBar } from '@/components/ui/SocialFollowBar'
import { BookingCTA } from '@/components/booking/BookingCTA'
import { SchemaOrg } from '@/components/schema/SchemaOrg'
import { generateMedicalProcedureSchema, generateFAQSchema } from '@/lib/schema'
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ui/ScrollReveal'

interface PageProps {
  params: Promise<{ category: string; treatment: string }>
}

export async function generateStaticParams() {
  return treatments.map((t) => ({
    category: t.category.slug,
    treatment: t.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { treatment: treatmentSlug } = await params
  const treatment = getTreatment(treatmentSlug)
  if (!treatment) return {}

  return {
    title: treatment.metaTitle,
    description: treatment.metaDescription,
    alternates: {
      canonical: `https://vernonskinclinic.com/treatments/${treatment.category.slug}/${treatment.slug}`,
    },
  }
}

export default async function TreatmentPage({ params }: PageProps) {
  const { category: categorySlug, treatment: treatmentSlug } = await params
  const treatment = getTreatment(treatmentSlug)
  const category = getCategory(categorySlug)
  if (!treatment || !category) notFound()

  // Split hero description into paragraphs and handle markdown-like bold
  const paragraphs = treatment.heroDescription.split('\n\n').filter(Boolean)

  return (
    <>
      <SchemaOrg schema={generateMedicalProcedureSchema(treatment)} />
      <SchemaOrg schema={generateFAQSchema(treatment.faqs)} />

      <Breadcrumbs
        items={[
          { name: 'Treatments', href: '/treatments' },
          { name: category.name, href: `/treatments/${category.slug}` },
          { name: treatment.name, href: `/treatments/${category.slug}/${treatment.slug}` },
        ]}
      />

      <article>
        {/* Hero Image */}
        {treatment.image && (
          <ScrollReveal>
            <div className="relative h-[280px] w-full overflow-hidden sm:h-[360px] lg:h-[420px]">
              <Image
                src={treatment.image}
                alt={treatment.name}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/60 to-transparent" />
            </div>
          </ScrollReveal>
        )}

        {/* Hero */}
        <section className={treatment.image ? 'py-8 lg:py-12' : 'py-12 lg:py-20'}>
          <div className="section-max-width section-padding">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
              {/* Main content */}
              <div className="lg:col-span-2">
                <ScrollReveal>
                  <span className="label">{category.name}</span>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                  <h1 className="heading-1 mt-3">{treatment.name}</h1>
                </ScrollReveal>

                {/* Quick stats */}
                <ScrollReveal delay={0.2}>
                  <div className="mt-6 flex flex-wrap gap-4">
                    <div className="rounded-lg bg-vernon-50 px-4 py-2">
                      <span className="block text-xs text-vernon-400">Duration</span>
                      <span className="text-sm font-medium text-vernon-900">{treatment.duration}</span>
                    </div>
                    <div className="rounded-lg bg-vernon-50 px-4 py-2">
                      <span className="block text-xs text-vernon-400">Sessions</span>
                      <span className="text-sm font-medium text-vernon-900">{treatment.sessions}</span>
                    </div>
                    <div className="rounded-lg bg-vernon-50 px-4 py-2">
                      <span className="block text-xs text-vernon-400">Downtime</span>
                      <span className="text-sm font-medium text-vernon-900">{treatment.downtime}</span>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.22}>
                  <div className="mt-6 flex items-start gap-3 rounded-xl border border-clinical-100 bg-clinical-50/50 p-4">
                    <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-clinical-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-clinical-800">Transparent Pricing</p>
                      <p className="mt-0.5 text-xs text-vernon-500">
                        Consultation fee: ₹400. Treatment costs are discussed upfront during your assessment — no hidden charges, no surprise bills. Exact pricing depends on your specific condition and treatment plan.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Technologies used */}
                <ScrollReveal delay={0.25}>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {treatment.technologies.map((tech) => (
                      <span key={tech} className="badge-clinical">{tech}</span>
                    ))}
                  </div>
                </ScrollReveal>

                {/* Main content */}
                <ScrollReveal delay={0.3}>
                  <div className="treatment-content mt-10">
                    {paragraphs.map((paragraph, index) => {
                      // Handle bold (**text**)
                      const parts = paragraph.split(/\*\*(.*?)\*\*/g)
                      return (
                        <p key={index}>
                          {parts.map((part, i) =>
                            i % 2 === 1 ? (
                              <strong key={i}>{part}</strong>
                            ) : (
                              part
                            )
                          )}
                        </p>
                      )
                    })}
                  </div>
                </ScrollReveal>

                {/* Suitable for */}
                <ScrollReveal className="mt-12">
                  <h2 className="heading-3">Who is this treatment for?</h2>
                </ScrollReveal>
                <StaggerReveal className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2" staggerDelay={0.08}>
                  {treatment.suitableFor.map((item) => (
                    <StaggerItem key={item}>
                      <div className="flex items-start gap-2 rounded-lg bg-clinical-50/50 px-4 py-3">
                        <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-clinical-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm text-vernon-700">{item}</span>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerReveal>

                {/* Contraindications */}
                {treatment.contraindications.length > 0 && (
                  <ScrollReveal className="mt-12">
                    <h2 className="heading-3">Contraindications</h2>
                    <p className="body-small mt-2">
                      This treatment may not be suitable in the following situations.
                      Dr. Reddy assesses each case individually during consultation.
                    </p>
                    <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/50 p-5">
                      <ul className="space-y-2">
                        {treatment.contraindications.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-vernon-700">
                            <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>
                )}

                {/* FAQ */}
                {treatment.faqs.length > 0 && (
                  <div className="mt-12">
                    <ScrollReveal>
                      <h2 className="heading-3">Frequently Asked Questions</h2>
                    </ScrollReveal>
                    <StaggerReveal className="mt-6 space-y-4" staggerDelay={0.1} baseDelay={0.1}>
                      {treatment.faqs.map((faq, index) => (
                        <StaggerItem key={index}>
                          <details
                            className="group rounded-xl border border-vernon-100 bg-white"
                          >
                            <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-base font-medium text-vernon-900 hover:text-clinical-700">
                              {faq.question}
                              <svg className="h-5 w-5 flex-shrink-0 text-vernon-400 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                              </svg>
                            </summary>
                            <div className="border-t border-vernon-50 px-6 py-4 text-sm leading-relaxed text-vernon-600">
                              {faq.answer}
                            </div>
                          </details>
                        </StaggerItem>
                      ))}
                    </StaggerReveal>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <ScrollReveal direction="right" delay={0.2} className="lg:col-span-1">
                <BookingCTA
                  treatment={treatment.name}
                  variant="floating"
                />
                <SocialFollowBar className="mt-6" />
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16">
          <div className="section-max-width section-padding">
            <ScrollReveal>
              <BookingCTA treatment={treatment.name} />
            </ScrollReveal>
          </div>
        </section>
      </article>
    </>
  )
}
