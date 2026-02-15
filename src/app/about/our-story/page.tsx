import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Our Story | From UK Training to Hyderabad\'s Premier Dermatology Center',
  description:
    'The story of Vernon Skin and Hair Clinic — how Dr. Brahmananda Reddy brought UK-standard dermatological care to Hyderabad. From a single clinic to three locations.',
}

export default function OurStoryPage() {
  const milestones = [
    {
      year: '2005',
      title: 'Medical Foundation',
      description: 'Dr. Brahmananda Reddy completes MBBS, beginning his journey in medicine with a focus on understanding the human body at its most fundamental level.',
    },
    {
      year: '2008',
      title: 'Surgical Training',
      description: 'Completes MS in General Surgery — a decision that would later distinguish him from dermatologists without surgical backgrounds. This training forms the foundation for hair transplant surgery and surgical dermatology.',
    },
    {
      year: '2010',
      title: 'UK Dermatology',
      description: 'Earns MSc in Dermatology from the University of Hertfordshire, UK. Exposed to the British model of physician-led care where the doctor is personally involved in every clinical decision.',
    },
    {
      year: '2011',
      title: 'Vernon Founded',
      description: 'Returns to Hyderabad with a mission: build a dermatology practice that combines UK clinical rigor with Indian accessibility. Opens the first Vernon clinic with a simple promise — the surgeon performs the surgery.',
    },
    {
      year: '2014',
      title: 'ISHRS Membership',
      description: 'Accepted as a member of the International Society of Hair Restoration Surgery (ISHRS), the world\'s foremost authority on hair transplantation. This membership validates Vernon\'s hair restoration program at an international standard.',
    },
    {
      year: '2016',
      title: 'International Training Role',
      description: 'Appointed as official trainer for Menarini dermal fillers. Begins conducting training sessions for physicians across Southeast Asia, establishing the "trainer of trainers" reputation.',
    },
    {
      year: '2018',
      title: 'Manikonda Expansion',
      description: 'Opens the Manikonda clinic to serve the growing IT corridor. Designed for professionals who need efficient consultations and treatments that fit around their work schedule.',
    },
    {
      year: '2019',
      title: 'Pico Laser Technology',
      description: 'Invests in US-FDA approved Pico laser technology — a commitment to having the safest, most advanced laser platform for Indian skin types. Vernon becomes one of the first clinics in Hyderabad to offer picosecond laser treatments.',
    },
    {
      year: '2020',
      title: 'Gachibowli Branch',
      description: 'Opens the third Vernon location near the Financial District, completing coverage of Hyderabad\'s key professional corridors while maintaining the founding principle of surgeon-led care.',
    },
    {
      year: '2024',
      title: 'Digital Transformation',
      description: 'Launches a comprehensive digital platform to match the clinical quality with digital accessibility — making evidence-based dermatological information available to every patient researching their condition.',
    },
  ]

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'About', href: '/about' },
          { name: 'Our Story', href: '/about/our-story' },
        ]}
      />

      <section className="py-12 lg:py-20">
        <div className="section-max-width section-padding">
          <ScrollReveal>
            <span className="label">Our Story</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="heading-1 mt-3 max-w-3xl">
              From UK training room to{' '}
              <span className="italic text-brand-600">Hyderabad&apos;s operating theatre</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="body-large mt-6 max-w-2xl">
              Vernon Skin and Hair Clinic was born from a simple observation: that
              Hyderabad deserved a dermatology practice where the surgeon stays in
              the room.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t border-brand-100 py-16 lg:py-24">
        <div className="section-max-width section-padding">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[2rem] top-0 hidden h-full w-px bg-brand-200 sm:block lg:left-1/2" />

            <StaggerReveal className="space-y-12" staggerDelay={0.12} baseDelay={0.1}>
              {milestones.map((milestone, index) => (
                <StaggerItem key={milestone.year}>
                  <div
                    className={`relative flex flex-col gap-4 sm:flex-row ${
                      index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-[1.65rem] hidden h-3 w-3 rounded-full border-2 border-earth-500 bg-white sm:block lg:left-1/2 lg:-translate-x-1/2" />

                    {/* Content */}
                    <div className={`flex-1 sm:pl-16 lg:pl-0 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
                      <span className="font-mono text-sm text-earth-600">{milestone.year}</span>
                      <h3 className="mt-1 text-xl font-medium text-brand-900">{milestone.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-brand-500">{milestone.description}</p>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden flex-1 lg:block" />
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
