import dynamic from 'next/dynamic'
import { HeroSection } from '@/components/sections/HeroSection'
import { TrustBar } from '@/components/sections/TrustBar'
import { StatsBar } from '@/components/sections/StatsBar'

// Dynamic imports for below-fold sections — reduces initial JS bundle by ~60%
const TreatmentsOverview = dynamic(() => import('@/components/sections/TreatmentsOverview').then(m => ({ default: m.TreatmentsOverview })))
const DoctorSection = dynamic(() => import('@/components/sections/DoctorSection').then(m => ({ default: m.DoctorSection })))
const TechnologyShowcase = dynamic(() => import('@/components/sections/TechnologyShowcase').then(m => ({ default: m.TechnologyShowcase })))
const PatientJourney = dynamic(() => import('@/components/sections/PatientJourney').then(m => ({ default: m.PatientJourney })))
const PicoComparison = dynamic(() => import('@/components/sections/PicoComparison').then(m => ({ default: m.PicoComparison })))
const TreatmentComparison = dynamic(() => import('@/components/sections/TreatmentComparison').then(m => ({ default: m.TreatmentComparison })))
const BeforeAfterPreview = dynamic(() => import('@/components/sections/BeforeAfterPreview').then(m => ({ default: m.BeforeAfterPreview })))
const HorizontalGallery = dynamic(() => import('@/components/sections/HorizontalGallery').then(m => ({ default: m.HorizontalGallery })))
const WhyVernon = dynamic(() => import('@/components/sections/WhyVernon').then(m => ({ default: m.WhyVernon })))
const GoogleReviews = dynamic(() => import('@/components/sections/GoogleReviews').then(m => ({ default: m.GoogleReviews })))
const HomepageFAQ = dynamic(() => import('@/components/sections/HomepageFAQ').then(m => ({ default: m.HomepageFAQ })))
const BlogPreview = dynamic(() => import('@/components/sections/BlogPreview').then(m => ({ default: m.BlogPreview })))
const LocationsPreview = dynamic(() => import('@/components/sections/LocationsPreview').then(m => ({ default: m.LocationsPreview })))
const VideoShowcase = dynamic(() => import('@/components/sections/VideoShowcase').then(m => ({ default: m.VideoShowcase })))
const SocialMedia = dynamic(() => import('@/components/sections/SocialMedia').then(m => ({ default: m.SocialMedia })))
const SocialProofTicker = dynamic(() => import('@/components/ui/SocialProofTicker').then(m => ({ default: m.SocialProofTicker })))
const BookingCTA = dynamic(() => import('@/components/booking/BookingCTA').then(m => ({ default: m.BookingCTA })))
const BookingWizard = dynamic(() => import('@/components/booking/BookingWizard').then(m => ({ default: m.BookingWizard })))

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <StatsBar />
      <SocialProofTicker />
      <TreatmentsOverview />
      <DoctorSection />
      <TechnologyShowcase />
      <PatientJourney />
      <PicoComparison />
      <TreatmentComparison />
      <BeforeAfterPreview />
      <HorizontalGallery />
      <WhyVernon />
      <GoogleReviews />
      <VideoShowcase />
      <HomepageFAQ />
      <BlogPreview />
      <SocialMedia />
      <LocationsPreview />
      <section className="py-20 lg:py-28">
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
