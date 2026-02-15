import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { doctors, primaryDoctor } from '@/data/doctors'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Our Team | Vernon Skin and Hair Clinic Hyderabad',
  description:
    'Meet the medical team at Vernon Skin and Hair Clinic. Led by UK-trained dermatosurgeon Dr. Brahmananda Reddy with dedicated care coordinators across three Hyderabad locations.',
}

export default function OurTeamPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'About', href: '/about' },
          { name: 'Our Team', href: '/about/our-team' },
        ]}
      />

      <section className="py-12 lg:py-20">
        <div className="section-max-width section-padding">
          <ScrollReveal>
            <span className="label">Our Team</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="heading-1 mt-3 max-w-3xl">
              Led by a surgeon.{' '}
              <span className="italic text-brand-600">Supported by specialists.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="body-large mt-6 max-w-2xl">
              At Vernon, the clinical team is structured around a simple principle:
              the doctor leads, and the support team ensures every patient receives
              thorough care beyond the consultation room.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t border-brand-100 py-16">
        <div className="section-max-width section-padding">
          {/* Lead Doctor */}
          <ScrollReveal>
            <div className="rounded-2xl border border-brand-100 bg-white p-8 lg:p-12">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-1">
                  <div className="aspect-[3/4] overflow-hidden rounded-xl bg-brand-100">
                    <Image src="/images/doctors/dr-brahmananda-reddy.jpg" alt="Dr. R. Brahmananda Reddy" width={300} height={400} className="h-full w-full object-cover" />
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <span className="badge-clinical">Founder & Lead Physician</span>
                  <h2 className="mt-3 font-display text-2xl text-brand-900 sm:text-3xl">
                    {primaryDoctor.name}
                  </h2>
                  <p className="mt-1 text-sm text-earth-700">{primaryDoctor.title}</p>
                  <p className="mt-4 text-sm leading-relaxed text-brand-600">
                    {primaryDoctor.qualifications.join(' | ')}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-brand-600">
                    Dr. Reddy personally performs or supervises every significant procedure
                    at Vernon. From hair transplant surgeries to filler injections, the
                    founding physician maintains direct clinical involvement — a commitment
                    that distinguishes Vernon from clinic chains where procedures are
                    delegated to technicians.
                  </p>
                  <Link href="/about/dr-brahmananda-reddy" className="btn-primary mt-6">
                    Full Profile
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Dr. Asritha Reddy */}
          <ScrollReveal delay={0.15} className="mt-12">
            <div className="rounded-2xl border border-brand-100 bg-white p-8 lg:p-12">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-1">
                  <div className="aspect-[3/4] overflow-hidden rounded-xl bg-brand-100">
                    <Image src="/images/doctors/dr-asritha-reddy.jpg" alt="Dr. Asritha Reddy" width={300} height={400} className="h-full w-full object-cover" />
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <span className="badge-clinical">Aesthetic Physician & Anaesthesiologist</span>
                  <h2 className="mt-3 font-display text-2xl text-brand-900 sm:text-3xl">
                    {doctors[1].name}
                  </h2>
                  <p className="mt-1 text-sm text-earth-700">{doctors[1].title}</p>
                  <p className="mt-4 text-sm leading-relaxed text-brand-600">
                    {doctors[1].qualifications.join(' | ')}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-brand-600">
                    Dr. Asritha brings a unique combination of anaesthesiology expertise
                    and aesthetic medicine certification. Her dual background ensures
                    patient comfort during procedures while delivering advanced aesthetic
                    treatments at the Banjara Hills and Manikonda locations.
                  </p>
                  <Link href="/about/dr-asritha-reddy" className="btn-primary mt-6">
                    Full Profile
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Support Team */}
          <div className="mt-12">
            <ScrollReveal>
              <h2 className="heading-3">The Support Team</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="body-base mt-3 max-w-2xl">
                Beyond our physicians and coordinators, Vernon&apos;s patient experience
                is shaped by a dedicated support team that handles everything from
                pre-consultation counseling to post-procedure follow-up.
              </p>
            </ScrollReveal>

            <StaggerReveal className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1} baseDelay={0.1}>
              {[
                {
                  role: 'Clinical Assistants',
                  description: 'Trained clinical assistants support Dr. Reddy during procedures, manage sterilization protocols, and ensure the surgical suite meets international standards of hygiene and safety.',
                },
                {
                  role: 'Laser Technicians',
                  description: 'Our laser technicians operate under Dr. Reddy\'s direct supervision and are trained on the specific parameters for Indian skin types. Every laser session follows physician-prescribed settings.',
                },
                {
                  role: 'Front Desk & Scheduling',
                  description: 'Efficient scheduling that respects your time. Our front desk team manages appointments across all three locations and coordinates with Dr. Reddy\'s schedule for procedure planning.',
                },
                {
                  role: 'Pharmacy Support',
                  description: 'Vernon prescribes pharmaceutical-grade medications. Our pharmacy team ensures you receive the exact formulations prescribed, with clear instructions on usage and duration.',
                },
                {
                  role: 'Follow-Up Team',
                  description: 'Post-procedure follow-up is systematic, not reactive. Our team contacts you at scheduled intervals to monitor recovery, address concerns, and schedule review appointments.',
                },
              ].map((member) => (
                <StaggerItem key={member.role}>
                  <div className="card-flat">
                    <h3 className="text-base font-medium text-brand-900">{member.role}</h3>
                    <p className="mt-2 text-sm text-brand-500">{member.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </section>
    </>
  )
}
