import type { Metadata } from 'next'
import Image from 'next/image'
import { primaryDoctor } from '@/data/doctors'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { BookingCTA } from '@/components/booking/BookingCTA'
import { SchemaOrg } from '@/components/schema/SchemaOrg'
import { generatePhysicianSchema } from '@/lib/schema'
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Dr. R. Brahmananda Reddy | UK-Trained Dermatosurgeon | ISHRS Member',
  description:
    'Dr. R. Brahmananda Reddy — Founder of Vernon Skin and Hair Clinic, Hyderabad. MBBS, MS (Surgery), MSc Dermatology (UK), ISHRS member, official Menarini filler trainer. 13+ years.',
  alternates: {
    canonical: 'https://vernonskinclinic.com/about/dr-brahmananda-reddy',
  },
}

export default function DrReddyPage() {
  const doctor = primaryDoctor

  return (
    <>
      <SchemaOrg schema={generatePhysicianSchema(doctor)} />
      <Breadcrumbs
        items={[
          { name: 'About', href: '/about' },
          { name: 'Dr. R. Brahmananda Reddy', href: '/about/dr-brahmananda-reddy' },
        ]}
      />

      {/* Hero */}
      <section className="py-12 lg:py-20">
        <div className="section-max-width section-padding">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-3 lg:gap-16">
            {/* Photo */}
            <ScrollReveal direction="left" className="lg:col-span-1">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-brand-100">
                <Image
                  src="/images/doctors/dr-brahmananda-reddy.jpg"
                  alt="Dr. R. Brahmananda Reddy - Founder & Chief Dermatosurgeon, Vernon Skin and Hair Clinic"
                  width={400}
                  height={533}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              {/* Quick credentials */}
              <div className="mt-4 space-y-2">
                {doctor.qualifications.map((q) => (
                  <div key={q} className="flex items-center gap-2 text-sm text-brand-600">
                    <svg className="h-4 w-4 flex-shrink-0 text-earth-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
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
                <span className="label">Founder & Chief Dermatosurgeon</span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h1 className="heading-1 mt-2">
                  Dr. R. Brahmananda Reddy
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <p className="mt-2 text-lg text-earth-700">
                  MBBS &middot; MS (General Surgery) &middot; MSc Dermatology (UK) &middot; ISHRS
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="mt-8 space-y-5 text-base leading-relaxed text-brand-600">
                  <p>
                    Dr. R. Brahmananda Reddy is a UK-trained dermatosurgeon who
                    founded Vernon Skin and Hair Clinic to bring international
                    standards of dermatological care to Hyderabad. With a surgical
                    background in General Surgery (MS) and advanced training in
                    Dermatology from the University of Hertfordshire, UK, Dr. Reddy
                    brings a precision-first approach to every procedure.
                  </p>
                  <p>
                    What distinguishes Dr. Reddy from most dermatologists is his dual
                    expertise: he is both a trained surgeon and a board-certified
                    aesthetician. This means he performs everything from complex hair
                    transplant surgeries and Mohs micrographic excisions to delicate
                    filler placements — all under one roof, with surgical-grade
                    oversight.
                  </p>
                  <p>
                    As an official trainer for Menarini dermal fillers, Dr. Reddy
                    regularly conducts training sessions for fellow physicians across
                    Southeast Asia, including Malaysia and Bangkok. When other doctors
                    need to learn advanced injection techniques, they come to
                    Dr. Reddy. This &ldquo;trainer of trainers&rdquo; status is the
                    highest validation of clinical skill in aesthetic medicine.
                  </p>
                  <p>
                    His diagnostic protocol is precise and rapid — with over 13 years
                    of experience, Dr. Reddy identifies root causes efficiently,
                    focusing clinical time on treatment rather than unnecessary
                    consultation length. After diagnosis, dedicated Care Coordinators
                    ensure patients receive thorough counseling on their treatment plan.
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
                    <div className="flex items-center gap-2 rounded-lg bg-brand-50 px-4 py-3">
                      <svg className="h-4 w-4 flex-shrink-0 text-earth-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-brand-700">{spec}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerReveal>

              {/* Memberships */}
              <ScrollReveal className="mt-10">
                <h2 className="heading-4">Professional Memberships</h2>
              </ScrollReveal>
              <StaggerReveal className="mt-4 space-y-3" staggerDelay={0.1}>
                {doctor.memberships.map((m) => (
                  <StaggerItem key={m}>
                    <div className="flex items-start gap-3 rounded-xl border border-brand-100 p-4">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-earth-50">
                        <svg className="h-4 w-4 text-earth-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-brand-900">{m}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerReveal>

              {/* Training Roles */}
              <ScrollReveal className="mt-10">
                <h2 className="heading-4">Training & Faculty Positions</h2>
                <p className="mt-2 text-sm text-brand-500">
                  Dr. Reddy doesn&apos;t just practice — he teaches. His training roles
                  validate his expertise at the highest level.
                </p>
              </ScrollReveal>
              <StaggerReveal className="mt-4 space-y-2" staggerDelay={0.08}>
                {doctor.trainingRoles.map((role) => (
                  <StaggerItem key={role}>
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4 flex-shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                      <span className="text-sm text-brand-700">{role}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerReveal>

              {/* Awards */}
              <ScrollReveal className="mt-10">
                <h2 className="heading-4">Awards & Recognition</h2>
              </ScrollReveal>
              <StaggerReveal className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3" staggerDelay={0.12}>
                {doctor.awards.map((award) => (
                  <StaggerItem key={award.title}>
                    <div className="rounded-xl bg-brand-50 p-4">
                      <p className="text-2xl font-light text-brand-900">{award.year}</p>
                      <p className="mt-1 text-sm font-medium text-brand-800">{award.title}</p>
                      <p className="mt-0.5 text-xs text-brand-400">{award.issuer}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerReveal>

              {/* Guinness World Record */}
              <ScrollReveal className="mt-10">
                <h2 className="heading-4">Guinness World Record</h2>
                <p className="mt-2 text-sm text-brand-500">
                  Dr. Reddy participated in the Guinness World Record for the Largest
                  Men&apos;s Health Awareness Lesson, organised at MNJ Institute of
                  Oncology & Regional Cancer Centre in 2018.
                </p>
              </ScrollReveal>
              <StaggerReveal className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3" staggerDelay={0.12}>
                <StaggerItem>
                  <div className="overflow-hidden rounded-xl">
                    <Image src="/images/guinness/guinness-1.jpg" alt="Dr. Brahmananda Reddy - Guinness World Record event" width={400} height={300} className="h-full w-full object-cover" />
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="overflow-hidden rounded-xl">
                    <Image src="/images/guinness/guinness-2.jpg" alt="Guinness World Record - Men's Health Awareness Lesson" width={400} height={300} className="h-full w-full object-cover" />
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="overflow-hidden rounded-xl">
                    <Image src="/images/guinness/guinness-3.jpg" alt="Guinness World Record certificate and event" width={400} height={300} className="h-full w-full object-cover" />
                  </div>
                </StaggerItem>
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
