import dynamic from 'next/dynamic'
import { HeroSection } from '@/components/sections/HeroSection'
import { TrustBar } from '@/components/sections/TrustBar'

// Dynamic imports for below-fold sections
const TreatmentsOverview = dynamic(() => import('@/components/sections/TreatmentsOverview').then(m => ({ default: m.TreatmentsOverview })))
const DoctorSection = dynamic(() => import('@/components/sections/DoctorSection').then(m => ({ default: m.DoctorSection })))
const WhyVernon = dynamic(() => import('@/components/sections/WhyVernon').then(m => ({ default: m.WhyVernon })))
const BeforeAfterPreview = dynamic(() => import('@/components/sections/BeforeAfterPreview').then(m => ({ default: m.BeforeAfterPreview })))
const GoogleReviews = dynamic(() => import('@/components/sections/GoogleReviews').then(m => ({ default: m.GoogleReviews })))
const HomepageFAQ = dynamic(() => import('@/components/sections/HomepageFAQ').then(m => ({ default: m.HomepageFAQ })))
const LocationsPreview = dynamic(() => import('@/components/sections/LocationsPreview').then(m => ({ default: m.LocationsPreview })))
const BookingCTA = dynamic(() => import('@/components/booking/BookingCTA').then(m => ({ default: m.BookingCTA })))
const BookingWizard = dynamic(() => import('@/components/booking/BookingWizard').then(m => ({ default: m.BookingWizard })))

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <TreatmentsOverview />
      <DoctorSection />
      <WhyVernon />
      <BeforeAfterPreview />
      <GoogleReviews />
      <HomepageFAQ />
      <LocationsPreview />
      <section className="py-24 lg:py-32">
        <div className="section-max-width section-padding">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <BookingCTA />
            <BookingWizard />
          </div>
        </div>
      </section>
    </>
  )
}
