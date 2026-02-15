import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { blogPosts } from '@/data/blog-posts'
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Blog | Clinical Insights by Dr. Brahmananda Reddy',
  description:
    'Evidence-based dermatology articles and clinical insights by Dr. R. Brahmananda Reddy. Hair loss, Pico laser science, skin care for Indian skin, and treatment guides.',
}

export default function BlogPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Blog', href: '/blog' }]} />

      <section className="py-12 lg:py-20">
        <div className="section-max-width section-padding">
          <ScrollReveal>
            <span className="label">Dr. Reddy&apos;s Clinical Notes</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="heading-1 mt-3 max-w-3xl">
              Evidence-based insights,{' '}
              <span className="italic text-brand-600">not marketing</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="body-large mt-6 max-w-2xl">
              Clinical articles written by Dr. R. Brahmananda Reddy. No fluff,
              no sponsored content — just the science and clinical reality behind
              modern dermatology and hair restoration.
            </p>
          </ScrollReveal>

          {/* Category filter */}
          <ScrollReveal delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-2">
              {['All', 'Hair Restoration', 'Laser Technology', 'Pigmentation', 'Aesthetics', 'Clinical Dermatology', 'General'].map((cat) => (
                <button
                  key={cat}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    cat === 'All'
                      ? 'bg-brand-900 text-white'
                      : 'bg-brand-50 text-brand-600 hover:bg-brand-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Featured post */}
          <ScrollReveal delay={0.35} className="mt-12">
            <Link
              href={`/blog/${blogPosts[0].slug}`}
              className="group block overflow-hidden rounded-2xl border border-brand-100 bg-white transition-shadow hover:shadow-lg"
            >
              {blogPosts[0].image && (
                <div className="relative h-[240px] w-full overflow-hidden sm:h-[320px]">
                  <Image
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 80vw"
                  />
                </div>
              )}
              <div className="p-8 lg:p-12">
              <div className="flex items-center gap-3">
                <span className="badge-clinical">{blogPosts[0].category}</span>
                <span className="text-xs text-brand-400">{blogPosts[0].readTime}</span>
              </div>
              <h2 className="mt-4 font-display text-2xl font-light text-brand-900 group-hover:text-earth-700 sm:text-3xl lg:text-4xl">
                {blogPosts[0].title}
              </h2>
              <p className="mt-4 text-base text-brand-500 lg:text-lg">
                {blogPosts[0].excerpt}
              </p>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-brand-200" />
                  <div>
                    <p className="text-sm font-medium text-brand-900">{blogPosts[0].author}</p>
                    <p className="text-xs text-brand-400">{new Date(blogPosts[0].date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
                <span className="flex items-center text-sm font-medium text-earth-600 group-hover:text-earth-700">
                  Read article
                  <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
              </div>
            </Link>
          </ScrollReveal>

          {/* Grid */}
          <StaggerReveal className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08} baseDelay={0.1}>
            {blogPosts.slice(1).map((post) => (
              <StaggerItem key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group card flex h-full flex-col overflow-hidden !p-0"
                >
                  {post.image && (
                    <div className="relative h-[180px] w-full overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2">
                    <span className="badge-clinical text-2xs">{post.category}</span>
                    <span className="text-xs text-brand-400">{post.readTime}</span>
                  </div>
                  <h3 className="mt-3 flex-1 text-lg font-medium text-brand-900 group-hover:text-earth-700">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-brand-500 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-2 border-t border-brand-50 pt-4">
                    <div className="h-6 w-6 rounded-full bg-brand-200" />
                    <span className="text-xs text-brand-500">{post.author}</span>
                    <span className="text-xs text-brand-300">&middot;</span>
                    <span className="text-xs text-brand-400">
                      {new Date(post.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>
    </>
  )
}
