import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="py-20 lg:py-32">
      <div className="section-max-width section-padding text-center">
        <span className="label">Page Not Found</span>
        <h1 className="heading-1 mt-4">404</h1>
        <p className="body-large mx-auto mt-4 max-w-lg">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let us help you find what you need.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
          <Link href="/treatments" className="btn-secondary">
            Browse Treatments
          </Link>
          <Link href="/contact" className="btn-ghost text-clinical-600">
            Contact Us
          </Link>
        </div>

        <div className="mx-auto mt-16 max-w-md">
          <p className="text-sm font-medium text-vernon-600">Popular pages:</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {[
              { label: 'Hair Transplant', href: '/treatments/hair-restoration/hair-transplant' },
              { label: 'Pico Laser', href: '/treatments/laser-and-pico/pico-laser-pigmentation' },
              { label: 'Botox & Fillers', href: '/treatments/aesthetics/botox-fillers' },
              { label: 'About Dr. Reddy', href: '/about/dr-brahmananda-reddy' },
              { label: 'Locations', href: '/locations' },
              { label: 'Blog', href: '/blog' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-vernon-200 px-3 py-1.5 text-sm text-vernon-600 transition-colors hover:border-clinical-300 hover:text-clinical-700"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
