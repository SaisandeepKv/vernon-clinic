import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { blogPosts, getBlogPost } from '@/data/blog-posts'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { SocialFollowBar } from '@/components/ui/SocialFollowBar'
import { BookingCTA } from '@/components/booking/BookingCTA'
import { SchemaOrg } from '@/components/schema/SchemaOrg'
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ui/ScrollReveal'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: `https://vernonskinclinic.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      ...(post.image && { images: [{ url: post.image, width: 800, height: 450 }] }),
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  // Generate Article schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
      jobTitle: 'Dermatosurgeon & Hair Restoration Surgeon',
      worksFor: {
        '@type': 'MedicalOrganization',
        name: 'Vernon Skin and Hair Clinic',
      },
    },
    publisher: {
      '@type': 'MedicalOrganization',
      name: 'Vernon Skin and Hair Clinic',
      url: 'https://vernonskinclinic.com',
    },
    mainEntityOfPage: `https://vernonskinclinic.com/blog/${post.slug}`,
  }

  // Parse markdown-like content to JSX
  const sections = post.content.split('\n\n').filter(Boolean)

  return (
    <>
      <SchemaOrg schema={articleSchema} />

      <Breadcrumbs
        items={[
          { name: 'Blog', href: '/blog' },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      />

      {/* Hero Image */}
      {post.image && (
        <ScrollReveal>
          <div className="relative h-[240px] w-full overflow-hidden sm:h-[340px] lg:h-[400px]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
          </div>
        </ScrollReveal>
      )}

      <article className={post.image ? 'py-8 lg:py-12' : 'py-12 lg:py-20'}>
        <div className="section-max-width section-padding">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Header */}
              <ScrollReveal>
                <div className="flex items-center gap-3">
                  <span className="badge-clinical">{post.category}</span>
                  <span className="text-xs text-vernon-400">{post.readTime}</span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h1 className="mt-4 font-display text-3xl font-light leading-tight text-vernon-900 sm:text-4xl lg:text-5xl">
                  {post.title}
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="mt-6 flex items-center gap-4 border-b border-vernon-100 pb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-clinical-100 text-sm font-medium text-clinical-700">
                    BR
                  </div>
                  <div>
                    <p className="text-sm font-medium text-vernon-900">{post.author}</p>
                    <p className="text-xs text-vernon-400">
                      {new Date(post.date).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                      {' · '}{post.readTime}
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Article body */}
              <ScrollReveal delay={0.3}>
              <div className="treatment-content mt-8">
                {sections.map((section, index) => {
                  // Handle headings
                  if (section.startsWith('## ')) {
                    return (
                      <h2 key={index}>
                        {section.replace('## ', '')}
                      </h2>
                    )
                  }
                  if (section.startsWith('### ')) {
                    return (
                      <h3 key={index}>
                        {section.replace('### ', '')}
                      </h3>
                    )
                  }

                  // Handle lists
                  if (section.includes('\n- ')) {
                    const lines = section.split('\n')
                    const title = lines[0].startsWith('- ') ? null : lines[0]
                    const items = lines.filter((l) => l.startsWith('- '))
                    return (
                      <div key={index}>
                        {title && <p>{renderInline(title)}</p>}
                        <ul>
                          {items.map((item, i) => (
                            <li key={i}>{renderInline(item.replace('- ', ''))}</li>
                          ))}
                        </ul>
                      </div>
                    )
                  }

                  // Handle numbered lists
                  if (/^\d+\. /.test(section)) {
                    const items = section.split('\n').filter((l) => /^\d+\. /.test(l))
                    return (
                      <ol key={index} className="list-decimal space-y-1 pl-6">
                        {items.map((item, i) => (
                          <li key={i}>{renderInline(item.replace(/^\d+\. /, ''))}</li>
                        ))}
                      </ol>
                    )
                  }

                  // Handle table-like content (pipes)
                  if (section.includes('|') && section.includes('---')) {
                    const lines = section.split('\n').filter(Boolean)
                    const headers = lines[0].split('|').filter(Boolean).map((h) => h.trim())
                    const rows = lines.slice(2).map((row) =>
                      row.split('|').filter(Boolean).map((cell) => cell.trim())
                    )
                    return (
                      <div key={index} className="my-6 overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                          <thead>
                            <tr className="border-b border-vernon-200 bg-vernon-50">
                              {headers.map((h, i) => (
                                <th key={i} className="px-4 py-2 text-left font-medium text-vernon-900">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {rows.map((row, ri) => (
                              <tr key={ri} className="border-b border-vernon-100">
                                {row.map((cell, ci) => (
                                  <td key={ci} className="px-4 py-2 text-vernon-700">
                                    {renderInline(cell)}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )
                  }

                  // Regular paragraph
                  return <p key={index}>{renderInline(section)}</p>
                })}
              </div>
              </ScrollReveal>

              {/* Author bio */}
              <ScrollReveal className="mt-12">
              <div className="rounded-xl border border-vernon-100 bg-vernon-50/50 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-clinical-100 text-sm font-medium text-clinical-700">
                    BR
                  </div>
                  <div>
                    <p className="font-medium text-vernon-900">Dr. R. Brahmananda Reddy</p>
                    <p className="mt-1 text-sm text-vernon-500">
                      MBBS, MSc Dermatology (UK), Diploma Aesthetic Medicine, Fellowship ILAMED (Germany).
                      Founder & Chief Operating Surgeon, Vernon Skin and Hair Clinic.
                      ISHRS member and official Menarini filler trainer.
                    </p>
                    <Link
                      href="/about/dr-brahmananda-reddy"
                      className="mt-2 inline-block text-sm font-medium text-clinical-600 hover:text-clinical-700"
                    >
                      View full profile &rarr;
                    </Link>
                  </div>
                </div>
              </div>
              </ScrollReveal>

              {/* Related posts */}
              <div className="mt-12">
                <ScrollReveal>
                  <h2 className="heading-3">More Clinical Notes</h2>
                </ScrollReveal>
                <StaggerReveal className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2" staggerDelay={0.1} baseDelay={0.1}>
                  {blogPosts
                    .filter((p) => p.slug !== post.slug)
                    .slice(0, 4)
                    .map((related) => (
                      <StaggerItem key={related.slug}>
                        <Link
                          href={`/blog/${related.slug}`}
                          className="group block overflow-hidden rounded-lg border border-vernon-100 transition-shadow hover:shadow-md"
                        >
                          {related.image && (
                            <div className="relative h-[120px] w-full overflow-hidden">
                              <Image
                                src={related.image}
                                alt={related.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 640px) 100vw, 50vw"
                              />
                            </div>
                          )}
                          <div className="p-4">
                          <span className="text-2xs font-medium uppercase tracking-wider text-clinical-600">
                            {related.category}
                          </span>
                          <h3 className="mt-1 text-sm font-medium text-vernon-900 group-hover:text-clinical-700">
                            {related.title}
                          </h3>
                          <p className="mt-1 text-xs text-vernon-400">{related.readTime}</p>
                          </div>
                        </Link>
                      </StaggerItem>
                    ))}
                </StaggerReveal>
              </div>
            </div>

            {/* Sidebar */}
            <ScrollReveal direction="right" delay={0.2} className="lg:col-span-1">
              <BookingCTA variant="floating" />
              <SocialFollowBar className="mt-6" />
            </ScrollReveal>
          </div>
        </div>
      </article>
    </>
  )
}

/** Render inline markdown (bold, inline code) */
function renderInline(text: string) {
  // Handle **bold** text
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  )
}
