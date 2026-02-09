'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface GalleryItem {
  id: string
  title: string
  description: string | null
  category: string
  before_image: string
  after_image: string
  patient_age: string | null
  patient_gender: string | null
  sessions_count: string | null
  published: boolean
  sort_order: number
  created_at: string
}

interface SortableGalleryItemProps {
  item: GalleryItem
  onTogglePublish: (item: GalleryItem) => void
  onEdit: (item: GalleryItem) => void
  onDelete: (id: string) => void
}

export function SortableGalleryItem({ item, onTogglePublish, onEdit, onDelete }: SortableGalleryItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-4 px-6 py-4"
    >
      {/* Drag handle */}
      <button
        className="cursor-grab touch-none text-vernon-300 hover:text-vernon-500 active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      <div className="flex gap-2">
        {item.before_image && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={item.before_image} alt="Before" className="h-16 w-16 rounded-lg object-cover" />
        )}
        {item.after_image && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={item.after_image} alt="After" className="h-16 w-16 rounded-lg object-cover" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-vernon-900">{item.title}</p>
        <p className="text-xs text-vernon-400">{item.category}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className={`rounded-full px-2 py-0.5 text-2xs ${item.published ? 'bg-clinical-50 text-clinical-700' : 'bg-amber-50 text-amber-700'}`}>
          {item.published ? 'Published' : 'Hidden'}
        </span>
        <button onClick={() => onTogglePublish(item)} className="rounded px-2 py-1 text-xs text-vernon-500 hover:bg-vernon-50">
          {item.published ? 'Hide' : 'Show'}
        </button>
        <button onClick={() => onEdit(item)} className="rounded px-2 py-1 text-xs text-clinical-600 hover:bg-clinical-50">
          Edit
        </button>
        <button onClick={() => onDelete(item.id)} className="rounded px-2 py-1 text-xs text-red-500 hover:bg-red-50">
          Delete
        </button>
      </div>
    </div>
  )
}
