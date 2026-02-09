import type { Metadata } from 'next'
import Link from 'next/link'
import { primaryDoctor } from '@/data/doctors'
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'About Vernon Skin and Hair Clinic | UK-Trained Dermatologist Hyderabad',
  description:
    'Learn about Vernon Skin and Hair Clinic, founded by UK-trained dermatosurgeon Dr. R. Brahmananda Reddy. ISHRS member, official filler trainer, 13+ years in Hyderabad.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-vernon-50 py-16 lg:py-24">
        <div className="section-max-width section-padding">
          <ScrollReveal>
            <span className="label">About Vernon</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="heading-1 mt-3 max-w-3xl">
              Where surgical precision{' '}
              <span className="italic text-vernon-600">meets dermatological science</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="body-large mt-6 max-w-2xl">
              Vernon Skin and Hair Clinic was founded with a singular conviction:
              that dermatology deserves the same precision, safety standards, and
              evidence-based rigor as any surgical discipline.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* The Story */}
      <section className="py-16 lg:py-24">
        <div className="section-max-width section-padding">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="heading-3">The Vernon Origin</h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-vernon-600">
                  <p>
                    In 2011, Dr. R. Brahmananda Reddy returned to Hyderabad after
                    completing his MSc in Dermatology from the University of
                    Hertfordshire, UK — carrying with him a vision that would challenge
                    the prevailing model of dermatology practice in India.
                  </p>
                  <p>
                    Most dermatology clinics in India operate on volume: see as many
                    patients as possible, delegate procedures to technicians, and
                    standardize treatment protocols regardless of individual variation.
                    Dr. Reddy had seen a different model in the UK — one where the
                    physician is personally involved in every clinical decision, where
                    procedures are surgeon-led rather than technician-driven, and where
                    the evidence base for a treatment matters more than its marketing
                    budget.
                  </p>
                  <p>
                    Vernon Skin and Hair Clinic was built on this principle. The name
                    &ldquo;Vernon&rdquo; itself was chosen to reflect the international
                    standard of care — a nod to Dr. Reddy&apos;s UK training and the
                    clinical rigor he brought back to Hyderabad.
                  </p>
                  <p>
                    Starting with a single clinic, Vernon has grown to three locations
                    across Hyderabad — Banjara Hills, Manikonda, and Gachibowli — while
                    maintaining the founding promise: Dr. Reddy personally performs or
                    supervises every significant procedure.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <div>
              <ScrollReveal delay={0.15}>
                <h2 className="heading-3">The Clinical Philosophy</h2>
              </ScrollReveal>
              <StaggerReveal className="mt-6 space-y-6" staggerDelay={0.12} baseDelay={0.2}>
                {[
                  {
                    title: 'Diagnosis Before Treatment',
                    text: 'Dr. Reddy\'s diagnostic protocol is precise and rapid. With 13+ years of clinical pattern recognition, he identifies the root cause efficiently — sparing patients unnecessary tests while ensuring nothing is missed.',
                  },
                  {
                    title: 'Surgeon-Led, Not Technician-Driven',
                    text: 'Hair transplants, vitiligo surgery, cyst excisions, and injectable aesthetics are all performed personally by Dr. Reddy. This is not the norm in Indian dermatology — it is the Vernon standard.',
                  },
                  {
                    title: 'Evidence Over Trends',
                    text: 'Every technology at Vernon is US-FDA approved. Every protocol is backed by peer-reviewed literature. We do not adopt "trending" treatments until the evidence supports their safety and efficacy for Indian skin types.',
                  },
                  {
                    title: 'Transparent Communication',
                    text: 'After Dr. Reddy\'s diagnosis, our care coordinators spend dedicated time explaining your treatment plan, expected outcomes, costs, and timeline. No pressure, no upselling — just clinical clarity.',
                  },
                ].map((item) => (
                  <StaggerItem key={item.title}>
                    <div className="rounded-xl border border-vernon-100 p-5">
                      <h3 className="text-base font-medium text-vernon-900">{item.title}</h3>
                      <p className="mt-2 text-sm text-vernon-500">{item.text}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Preview */}
      <section className="border-t border-vernon-100 bg-vernon-50 py-16 lg:py-24">
        <div className="section-max-width section-padding text-center">
          <ScrollReveal>
            <span className="label">The Founder</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="heading-2 mt-3">Dr. R. Brahmananda Reddy</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="body-base mx-auto mt-3 max-w-xl">
              {primaryDoctor.title}. {primaryDoctor.experience} of clinical practice.
              UK-trained. ISHRS-certified. Official filler trainer for Menarini.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <Link href="/about/dr-brahmananda-reddy" className="btn-primary mt-8">
              Full Credentials & Profile
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
