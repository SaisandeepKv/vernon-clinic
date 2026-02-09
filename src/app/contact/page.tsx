import type { Metadata } from 'next'
import { locations } from '@/data/locations'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { BookingCTA } from '@/components/booking/BookingCTA'
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Contact Vernon Skin and Hair Clinic | Book Appointment Hyderabad',
  description:
    'Contact Vernon Skin and Hair Clinic. Book an appointment with Dr. Brahmananda Reddy. Three locations: Banjara Hills, Manikonda, Gachibowli. Call +91 91000 17567.',
}

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Contact', href: '/contact' }]} />

      <section className="py-12 lg:py-20">
        <div className="section-max-width section-padding">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Contact info */}
            <div>
              <ScrollReveal>
                <span className="label">Get in Touch</span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h1 className="heading-1 mt-3">
                  Begin with a{' '}
                  <span className="italic text-vernon-600">conversation</span>
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="body-large mt-6">
                  Every treatment at Vernon starts with an honest clinical assessment.
                  No pressure, no upselling — just a clear understanding of your
                  condition and the options available.
                </p>
              </ScrollReveal>

              {/* Direct contact */}
              <StaggerReveal className="mt-10 space-y-4" staggerDelay={0.12} baseDelay={0.2}>
                <StaggerItem>
                  <a
                    href="tel:+919100017567"
                    className="flex items-center gap-4 rounded-xl border border-vernon-100 bg-white p-5 transition-colors hover:border-clinical-200"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-clinical-50">
                      <svg className="h-6 w-6 text-clinical-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-vernon-900">Call Us</p>
                      <p className="text-lg text-clinical-600">+91 91000 17567</p>
                      <p className="text-xs text-vernon-400">Mon–Sat, 10AM–7PM</p>
                    </div>
                  </a>
                </StaggerItem>

                <StaggerItem>
                  <a
                    href="https://wa.me/919885446622?text=Hi%2C%20I%20would%20like%20to%20book%20a%20consultation%20at%20Vernon%20Skin%20Clinic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-xl border border-vernon-100 bg-white p-5 transition-colors hover:border-green-200"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
                      <svg className="h-6 w-6 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-vernon-900">WhatsApp</p>
                      <p className="text-base text-green-600">Message us on WhatsApp</p>
                      <p className="text-xs text-vernon-400">Instant response during working hours</p>
                    </div>
                  </a>
                </StaggerItem>

                <StaggerItem>
                  <a
                    href="mailto:info@vernonskinclinic.com"
                    className="flex items-center gap-4 rounded-xl border border-vernon-100 bg-white p-5 transition-colors hover:border-vernon-200"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-vernon-50">
                      <svg className="h-6 w-6 text-vernon-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-vernon-900">Email</p>
                      <p className="text-base text-vernon-600">info@vernonskinclinic.com</p>
                      <p className="text-xs text-vernon-400">We respond within 24 hours</p>
                    </div>
                  </a>
                </StaggerItem>
              </StaggerReveal>

              {/* Locations */}
              <ScrollReveal delay={0.3} className="mt-10">
                <h2 className="heading-4">Our Locations</h2>
              </ScrollReveal>
              <StaggerReveal className="mt-4 space-y-4" staggerDelay={0.1} baseDelay={0.35}>
                {locations.map((location) => (
                  <StaggerItem key={location.id}>
                    <div className="rounded-xl border border-vernon-100 p-5">
                      <h3 className="text-base font-medium text-vernon-900">
                        Vernon — {location.name}
                      </h3>
                      <p className="mt-1 text-sm text-vernon-500">{location.address}</p>
                      <div className="mt-3 flex flex-wrap gap-3">
                        {location.timings.map((t) => (
                          <span key={t.days} className="text-xs text-vernon-500">
                            {t.days}: <span className="font-medium text-vernon-700">{t.hours}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerReveal>
            </div>

            {/* Booking form */}
            <ScrollReveal direction="right" delay={0.2}>
              <div>
                <BookingCTA variant="floating" />

                {/* FAQ teaser */}
                <div className="mt-8 rounded-xl border border-vernon-100 bg-white p-6">
                  <h3 className="heading-4">Before your visit</h3>
                  <div className="mt-4 space-y-3 text-sm text-vernon-600">
                    <div className="flex items-start gap-2">
                      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-clinical-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>No referral needed — book directly</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-clinical-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Bring any previous prescriptions or test reports</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-clinical-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>List any medications you&apos;re currently taking</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-clinical-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Avoid applying makeup on the day of skin consultation</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-clinical-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Consultations typically last 15–30 minutes</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
