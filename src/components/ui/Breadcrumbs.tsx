import Link from 'next/link'
import { SchemaOrg } from '@/components/schema/SchemaOrg'
import { generateBreadcrumbSchema } from '@/lib/schema'

interface BreadcrumbItem {
  name: string
  href: string
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const allItems = [{ name: 'Home', href: '/' }, ...items]

  return (
    <>
      <SchemaOrg schema={generateBreadcrumbSchema(allItems.map((i) => ({ name: i.name, url: i.href })))} />
      <nav aria-label="Breadcrumb" className="section-max-width section-padding py-4">
        <ol className="flex items-center gap-1.5 text-sm">
          {allItems.map((item, index) => (
            <li key={item.href} className="flex items-center gap-1.5">
              {index > 0 && (
                <svg className="h-3.5 w-3.5 text-vernon-300" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              )}
              {index === allItems.length - 1 ? (
                <span className="text-vernon-500">{item.name}</span>
              ) : (
                <Link href={item.href} className="text-vernon-400 hover:text-vernon-700 transition-colors">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
