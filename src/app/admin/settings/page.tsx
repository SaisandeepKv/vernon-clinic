'use client'

import { useEffect, useState, useCallback } from 'react'
import { AdminShell } from '@/components/admin/AdminShell'
import { ImageUpload } from '@/components/admin/ImageUpload'

interface Settings {
  [key: string]: string
}

const settingGroups = [
  {
    title: 'Branding',
    fields: [
      { key: 'site_title', label: 'Site Title', type: 'text' },
      { key: 'logo_url', label: 'Logo', type: 'image' },
    ],
  },
  {
    title: 'Contact Information',
    fields: [
      { key: 'contact_phone', label: 'Phone Number', type: 'text' },
      { key: 'contact_email', label: 'Email Address', type: 'text' },
      { key: 'contact_whatsapp', label: 'WhatsApp Number', type: 'text' },
      { key: 'working_hours', label: 'Working Hours', type: 'text' },
    ],
  },
  {
    title: 'Clinic Addresses',
    fields: [
      { key: 'address_banjara_hills', label: 'Banjara Hills', type: 'textarea' },
      { key: 'address_manikonda', label: 'Manikonda', type: 'textarea' },
      { key: 'address_gachibowli', label: 'Gachibowli', type: 'textarea' },
    ],
  },
]

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [dirty, setDirty] = useState(false)

  const loadSettings = useCallback(async () => {
    try {
      const res = await fetch('/api/settings')
      if (res.ok) {
        const data = await res.json()
        setSettings(data)
      }
    } catch { /* ignore */ }
    setLoading(false)
  }, [])

  useEffect(() => { loadSettings() }, [loadSettings])

  function updateSetting(key: string, value: string) {
    setSettings((prev) => ({ ...prev, [key]: value }))
    setDirty(true)
  }

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      if (res.ok) {
        setDirty(false)
        alert('Settings saved!')
      } else {
        const err = await res.json()
        alert(err.error || 'Failed to save')
      }
    } catch {
      alert('Failed to save settings')
    }
    setSaving(false)
  }

  return (
    <AdminShell>
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium text-vernon-900">Settings</h1>
            <p className="mt-1 text-sm text-vernon-500">Manage site branding, contact info, and addresses</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving || !dirty}
            className="btn-primary disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {loading ? (
          <div className="mt-12 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-vernon-300 border-t-clinical-600" />
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            {settingGroups.map((group) => (
              <div key={group.title} className="rounded-xl border border-vernon-200 bg-white p-6">
                <h2 className="text-lg font-medium text-vernon-900">{group.title}</h2>
                <div className="mt-4 space-y-4">
                  {group.fields.map((field) => (
                    <div key={field.key}>
                      {field.type === 'image' ? (
                        <ImageUpload
                          label={field.label}
                          value={settings[field.key] || ''}
                          onChange={(url) => updateSetting(field.key, url)}
                          folder="settings"
                        />
                      ) : field.type === 'textarea' ? (
                        <>
                          <label className="block text-sm font-medium text-vernon-700">{field.label}</label>
                          <textarea
                            value={settings[field.key] || ''}
                            onChange={(e) => updateSetting(field.key, e.target.value)}
                            rows={2}
                            className="mt-1 block w-full rounded-lg border border-vernon-200 px-4 py-2.5 text-sm focus:border-clinical-500 focus:outline-none"
                          />
                        </>
                      ) : (
                        <>
                          <label className="block text-sm font-medium text-vernon-700">{field.label}</label>
                          <input
                            type="text"
                            value={settings[field.key] || ''}
                            onChange={(e) => updateSetting(field.key, e.target.value)}
                            className="mt-1 block w-full rounded-lg border border-vernon-200 px-4 py-2.5 text-sm focus:border-clinical-500 focus:outline-none"
                          />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  )
}
