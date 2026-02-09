'use client'

import { useState, useRef } from 'react'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const toolbarButtons = [
  { label: 'B', action: 'bold', wrap: ['**', '**'] },
  { label: 'I', action: 'italic', wrap: ['*', '*'] },
  { label: 'H2', action: 'h2', prefix: '## ' },
  { label: 'H3', action: 'h3', prefix: '### ' },
  { label: 'UL', action: 'ul', prefix: '- ' },
  { label: 'OL', action: 'ol', prefix: '1. ' },
  { label: 'Link', action: 'link', wrap: ['[', '](url)'] },
] as const

export function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
  const [preview, setPreview] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function insertMarkdown(button: (typeof toolbarButtons)[number]) {
    const ta = textareaRef.current
    if (!ta) return

    const start = ta.selectionStart
    const end = ta.selectionEnd
    const selected = value.substring(start, end)

    let newText: string
    let newCursorPos: number

    if ('wrap' in button && button.wrap) {
      newText = value.substring(0, start) + button.wrap[0] + selected + button.wrap[1] + value.substring(end)
      newCursorPos = start + button.wrap[0].length + selected.length + button.wrap[1].length
    } else if ('prefix' in button && button.prefix) {
      // For block-level, prepend at line start
      const lineStart = value.lastIndexOf('\n', start - 1) + 1
      newText = value.substring(0, lineStart) + button.prefix + value.substring(lineStart)
      newCursorPos = start + button.prefix.length
    } else {
      return
    }

    onChange(newText)
    requestAnimationFrame(() => {
      ta.focus()
      ta.setSelectionRange(newCursorPos, newCursorPos)
    })
  }

  // Simple markdown to HTML for preview
  function renderPreview(md: string): string {
    return md
      .replace(/### (.+)/g, '<h3 class="text-lg font-medium text-vernon-900 mt-4 mb-2">$1</h3>')
      .replace(/## (.+)/g, '<h2 class="text-xl font-medium text-vernon-900 mt-6 mb-3">$1</h2>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-clinical-600 underline">$1</a>')
      .replace(/^- (.+)/gm, '<li class="ml-4">$1</li>')
      .replace(/^\d+\. (.+)/gm, '<li class="ml-4 list-decimal">$1</li>')
      .replace(/\n\n/g, '</p><p class="mt-3 text-vernon-700">')
      .replace(/^/, '<p class="text-vernon-700">')
      .replace(/$/, '</p>')
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-vernon-700">Content (Markdown)</label>
        <button
          type="button"
          onClick={() => setPreview(!preview)}
          className="text-xs font-medium text-clinical-600 hover:text-clinical-700"
        >
          {preview ? 'Edit' : 'Preview'}
        </button>
      </div>

      {!preview && (
        <div className="mt-1 rounded-lg border border-vernon-200 overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center gap-1 border-b border-vernon-100 bg-vernon-50 px-2 py-1.5">
            {toolbarButtons.map((btn) => (
              <button
                key={btn.action}
                type="button"
                onClick={() => insertMarkdown(btn)}
                className="rounded px-2 py-1 text-xs font-medium text-vernon-600 hover:bg-vernon-200 hover:text-vernon-900"
              >
                {btn.label}
              </button>
            ))}
          </div>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={16}
            className="block w-full px-4 py-3 font-mono text-sm focus:outline-none"
            placeholder={placeholder || 'Write your content in Markdown...'}
          />
        </div>
      )}

      {preview && (
        <div
          className="mt-1 min-h-[20rem] rounded-lg border border-vernon-200 bg-white p-6 treatment-content"
          dangerouslySetInnerHTML={{ __html: renderPreview(value) }}
        />
      )}
    </div>
  )
}
