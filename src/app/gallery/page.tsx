'use client'

import { useState } from 'react'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ui/ScrollReveal'

const galleryCategories = [
  'All',
  'Hair Transplant',
  'Pico Laser',
  'Acne Scars',
  'Pigmentation',
  'Botox & Fillers',
  'Vitiligo',
  'Laser Hair Reduction',
]

const sampleGallery = [
  {
    id: '1',
    category: 'Hair Transplant',
    treatment: 'FUE Hair Transplant',
    sessions: '1 session',
    duration: '12 months post-op',
    patientAge: '32 years',
    patientGender: 'Male',
    description: 'Norwood III hair loss. 2,800 grafts FUE. Natural hairline restoration with Dr. Reddy.',
  },
  {
    id: '2',
    category: 'Hair Transplant',
    treatment: 'Repair Hair Transplant',
    sessions: '1 session',
    duration: '14 months post-op',
    patientAge: '38 years',
    patientGender: 'Male',
    description: 'Repair of unnatural hairline from previous surgery elsewhere. Hairline redesign and density improvement.',
  },
  {
    id: '3',
    category: 'Pico Laser',
    treatment: 'Pico Laser Pigmentation',
    sessions: '5 sessions',
    duration: '3 months',
    patientAge: '28 years',
    patientGender: 'Female',
    description: 'Mixed-type melasma treated with fractional Pico laser + topical depigmenting protocol.',
  },
  {
    id: '4',
    category: 'Acne Scars',
    treatment: 'MNRF + Subcision',
    sessions: '6 sessions',
    duration: '8 months',
    patientAge: '25 years',
    patientGender: 'Male',
    description: 'Rolling and boxcar acne scars. Combination MNRF, subcision, and TCA CROSS protocol.',
  },
  {
    id: '5',
    category: 'Pico Laser',
    treatment: 'Pico Laser Tattoo Removal',
    sessions: '6 sessions',
    duration: '5 months',
    patientAge: '30 years',
    patientGender: 'Male',
    description: 'Multi-color professional tattoo. Pico laser with dual wavelength (1064nm + 532nm).',
  },
  {
    id: '6',
    category: 'Botox & Fillers',
    treatment: 'Dermal Fillers',
    sessions: '1 session',
    duration: 'Immediate result',
    patientAge: '42 years',
    patientGender: 'Female',
    description: 'Nasolabial fold correction and cheek volume restoration with HA fillers by Dr. Reddy.',
  },
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  return (
    <>
      <Breadcrumbs items={[{ name: 'Results Gallery', href: '/gallery' }]} />

      <section className="py-12 lg:py-20">
        <div className="section-max-width section-padding">
          <ScrollReveal>
            <span className="label">Clinical Results</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="heading-1 mt-3 max-w-3xl">
              Results speak{' '}
              <span className="italic text-brand-600">louder than claims</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="body-large mt-6 max-w-2xl">
              Every result shown here is from an actual Vernon patient, documented
              with their consent. We include treatment details, session count,
              and timeline for full transparency.
            </p>
          </ScrollReveal>

          {/* Category filter */}
          <ScrollReveal delay={0.3}>
            <div className="mt-10 flex flex-wrap gap-2">
              {galleryCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? 'bg-brand-900 text-white'
                      : 'bg-brand-50 text-brand-600 hover:bg-brand-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Gallery grid */}
          <StaggerReveal className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1} baseDelay={0.15}>
            {sampleGallery.filter(item => activeCategory === 'All' || item.category === activeCategory).map((item) => (
              <StaggerItem key={item.id}>
                <div className="group card">
                  {/* Before/After placeholder */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-brand-100">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="grid w-full grid-cols-2 gap-0.5">
                        <div className="flex h-full items-center justify-center bg-brand-200 py-12">
                          <span className="text-xs font-medium text-brand-500">BEFORE</span>
                        </div>
                        <div className="flex h-full items-center justify-center bg-brand-100 py-12">
                          <span className="text-xs font-medium text-brand-500">AFTER</span>
                        </div>
                      </div>
                    </div>
                    {/* Metadata overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-950/80 to-transparent p-4">
                      <span className="badge-clinical text-2xs">{item.category}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-base font-medium text-brand-900">
                      {item.treatment}
                    </h3>
                    <p className="mt-1 text-sm text-brand-500">{item.description}</p>
                  </div>

                  {/* Metadata */}
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="rounded bg-brand-50 px-3 py-1.5">
                      <span className="block text-2xs text-brand-400">Sessions</span>
                      <span className="text-xs font-medium text-brand-700">{item.sessions}</span>
                    </div>
                    <div className="rounded bg-brand-50 px-3 py-1.5">
                      <span className="block text-2xs text-brand-400">Timeline</span>
                      <span className="text-xs font-medium text-brand-700">{item.duration}</span>
                    </div>
                    <div className="rounded bg-brand-50 px-3 py-1.5">
                      <span className="block text-2xs text-brand-400">Patient</span>
                      <span className="text-xs font-medium text-brand-700">{item.patientGender}, {item.patientAge}</span>
                    </div>
                    <div className="rounded bg-brand-50 px-3 py-1.5">
                      <span className="block text-2xs text-brand-400">Doctor</span>
                      <span className="text-xs font-medium text-brand-700">Dr. Reddy</span>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>

          <ScrollReveal delay={0.2} className="mt-12">
            <div className="rounded-xl border border-brand-200 bg-brand-50 p-8 text-center">
              <h3 className="heading-4">Want to see results for your specific condition?</h3>
              <p className="body-small mt-2">
                During your consultation, Dr. Reddy can show you relevant before/after
                results from patients with similar conditions and skin types.
              </p>
              <a href="/contact" className="btn-primary mt-4">
                Book a Consultation
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
