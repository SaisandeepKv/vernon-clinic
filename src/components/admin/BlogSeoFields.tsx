'use client'

interface BlogSeoFieldsProps {
  metaTitle: string
  metaDescription: string
  onMetaTitleChange: (value: string) => void
  onMetaDescriptionChange: (value: string) => void
}

export function BlogSeoFields({
  metaTitle,
  metaDescription,
  onMetaTitleChange,
  onMetaDescriptionChange,
}: BlogSeoFieldsProps) {
  return (
    <div className="rounded-lg border border-vernon-200 bg-vernon-50/50 p-4">
      <h3 className="flex items-center gap-2 text-sm font-medium text-vernon-700">
        <svg className="h-4 w-4 text-vernon-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        SEO Settings
      </h3>
      <div className="mt-3 space-y-3">
        <div>
          <div className="flex items-center justify-between">
            <label className="block text-xs font-medium text-vernon-600">Meta Title</label>
            <span className={`text-2xs ${metaTitle.length > 60 ? 'text-red-500' : 'text-vernon-400'}`}>
              {metaTitle.length}/60
            </span>
          </div>
          <input
            type="text"
            value={metaTitle}
            onChange={(e) => onMetaTitleChange(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-vernon-200 bg-white px-3 py-2 text-sm focus:border-clinical-500 focus:outline-none"
            placeholder="Defaults to post title if empty"
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className="block text-xs font-medium text-vernon-600">Meta Description</label>
            <span className={`text-2xs ${metaDescription.length > 160 ? 'text-red-500' : 'text-vernon-400'}`}>
              {metaDescription.length}/160
            </span>
          </div>
          <textarea
            value={metaDescription}
            onChange={(e) => onMetaDescriptionChange(e.target.value)}
            rows={2}
            className="mt-1 block w-full rounded-lg border border-vernon-200 bg-white px-3 py-2 text-sm focus:border-clinical-500 focus:outline-none"
            placeholder="Defaults to excerpt if empty"
          />
        </div>
      </div>
    </div>
  )
}
