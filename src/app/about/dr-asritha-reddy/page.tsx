import type { Metadata } from 'next'
import Image from 'next/image'
import { doctors } from '@/data/doctors'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { BookingCTA } from '@/components/booking/BookingCTA'
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ui/ScrollReveal'

const doctor = doctors[1] // Dr. Asritha Reddy

export const metadata: Metadata = {
  title: 'Dr. Asritha Reddy | Aesthetic Physician & Anaesthesiologist | Vernon Clinic',
  description:
    'Dr. Asritha Reddy — MD Anaesthesia, Certified in Aesthetic Medicine (AAAM). Aesthetic physician and anaesthesiologist at Vernon Skin and Hair Clinic, Hyderabad.',
  alternates: {
    canonical: 'https://vernonskinclinic.com/about/dr-asritha-reddy',
  },
}

export default function DrAsrithaPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'About', href: '/about' },
          { name: 'Dr. Asritha Reddy', href: '/about/dr-asritha-reddy' },
        ]}
      />

      {/* Hero */}
      <section className="py-12 lg:py-20">
        <div className="section-max-width section-padding">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-3 lg:gap-16">
            {/* Photo */}
            <ScrollReveal direction="left" className="lg:col-span-1">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-vernon-100">
                <Image
                  src="/images/doctors/dr-asritha-reddy.jpg"
                  alt="Dr. Asritha Reddy - Aesthetic Physician & Anaesthesiologist, Vernon Skin and Hair Clinic"
                  width={400}
                  height={533}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              {/* Quick credentials */}
              <div className="mt-4 space-y-2">
                {doctor.qualifications.map((q) => (
                  <div key={q} className="flex items-center gap-2 text-sm text-vernon-600">
                    <svg className="h-4 w-4 flex-shrink-0 text-clinical-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                    </svg>
                    {q}
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Content */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <span className="label">Aesthetic Physician & Anaesthesiologist</span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h1 className="heading-1 mt-2">
                  Dr. Asritha Reddy
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <p className="mt-2 text-lg text-clinical-700">
                  MD (Anaesthesia) &middot; Certification in Aesthetic Medicine (AAAM & SMP)
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="mt-8 space-y-5 text-base leading-relaxed text-vernon-600">
                  <p>
                    Dr. Asritha Reddy brings a unique combination of anaesthesiology
                    expertise and aesthetic medicine certification to Vernon Clinic.
                    Her dual background ensures patient comfort during lengthy
                    procedures like hair transplant surgery while also providing
                    advanced aesthetic treatments.
                  </p>
                  <p>
                    As a certified practitioner of the American Academy of Aesthetic
                    Medicine, Dr. Asritha specializes in non-surgical facial
                    rejuvenation, injectable aesthetics, and IV wellness therapy. Her
                    understanding of pharmacology and patient physiology &mdash; honed
                    through years of anaesthesia practice &mdash; translates into safer,
                    more comfortable procedures with precise dosing and monitoring.
                  </p>
                  <p>
                    With over 10 years of clinical experience, Dr. Asritha is dedicated
                    to providing exceptional patient care and delivering outstanding
                    aesthetic results. She works alongside Dr. Brahmananda Reddy to
                    deliver comprehensive care, managing anaesthesia protocols for
                    surgical procedures and independently performing aesthetic
                    consultations and treatments at the Manikonda and Banjara Hills
                    locations.
                  </p>
                </div>
              </ScrollReveal>

              {/* Specializations */}
              <ScrollReveal className="mt-10">
                <h2 className="heading-4">Areas of Expertise</h2>
              </ScrollReveal>
              <StaggerReveal className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2" staggerDelay={0.08}>
                {doctor.specializations.map((spec) => (
                  <StaggerItem key={spec}>
                    <div className="flex items-center gap-2 rounded-lg bg-vernon-50 px-4 py-3">
                      <svg className="h-4 w-4 flex-shrink-0 text-clinical-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-vernon-700">{spec}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerReveal>

              {/* Memberships */}
              {doctor.memberships.length > 0 && (
                <>
                  <ScrollReveal className="mt-10">
                    <h2 className="heading-4">Professional Memberships</h2>
                  </ScrollReveal>
                  <StaggerReveal className="mt-4 space-y-3" staggerDelay={0.1}>
                    {doctor.memberships.map((m) => (
                      <StaggerItem key={m}>
                        <div className="flex items-start gap-3 rounded-xl border border-vernon-100 p-4">
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-clinical-50">
                            <svg className="h-4 w-4 text-clinical-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                            </svg>
                          </div>
                          <p className="text-sm font-medium text-vernon-900">{m}</p>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerReveal>
                </>
              )}

              {/* Training Roles */}
              <ScrollReveal className="mt-10">
                <h2 className="heading-4">Clinical Roles</h2>
              </ScrollReveal>
              <StaggerReveal className="mt-4 space-y-2" staggerDelay={0.08}>
                {doctor.trainingRoles.map((role) => (
                  <StaggerItem key={role}>
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4 flex-shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                      <span className="text-sm text-vernon-700">{role}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Booking */}
      <section className="py-16">
        <div className="section-max-width section-padding">
          <ScrollReveal>
            <BookingCTA />
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
