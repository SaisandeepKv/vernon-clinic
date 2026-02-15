import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { treatmentCategories, getTreatmentsByCategory, getCategory } from '@/data/treatments'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ui/ScrollReveal'

interface PageProps {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  return treatmentCategories.map((c) => ({ category: c.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params
  const category = getCategory(categorySlug)
  if (!category) return {}

  return {
    title: `${category.name} Treatments | Vernon Skin and Hair Clinic Hyderabad`,
    description: category.description,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params
  const category = getCategory(categorySlug)
  if (!category) notFound()

  const categoryTreatments = getTreatmentsByCategory(categorySlug)

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Treatments', href: '/treatments' },
          { name: category.name, href: `/treatments/${category.slug}` },
        ]}
      />

      <section className="py-12 lg:py-20">
        <div className="section-max-width section-padding">
          <ScrollReveal>
            <span className="label">{category.name}</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="heading-1 mt-3 max-w-3xl">{category.name}</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="body-large mt-6 max-w-2xl">{category.description}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t border-brand-100 py-16">
        <div className="section-max-width section-padding">
          <StaggerReveal className="grid grid-cols-1 gap-8 lg:grid-cols-2" staggerDelay={0.12}>
            {categoryTreatments.map((treatment) => (
              <StaggerItem key={treatment.id}>
                <Link
                  href={`/treatments/${category.slug}/${treatment.slug}`}
                  className="group card flex h-full flex-col"
                >
                  <h2 className="text-xl font-medium text-brand-900 group-hover:text-earth-700">
                    {treatment.name}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-500">
                    {treatment.shortDescription}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="badge">{treatment.duration}</span>
                    <span className="badge">{treatment.sessions}</span>
                    <span className="badge">{treatment.downtime} downtime</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {treatment.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="badge-clinical text-2xs">{tech}</span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center text-sm font-medium text-earth-600">
                    Full treatment details
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
    </>
  )
}
