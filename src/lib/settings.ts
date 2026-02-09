import { createServerClient } from './supabase'

const defaults: Record<string, string> = {
  site_title: 'Vernon Skin and Hair Clinic',
  logo_url: '/images/vernon-logo.png',
  contact_phone: '+91 91000 17567',
  contact_email: 'info@vernonskinclinic.com',
  contact_whatsapp: '+919100017567',
  working_hours: 'Mon-Sat: 10:00 AM - 7:00 PM',
  address_banjara_hills: 'Plot 8-2-293/82/A/1310, Road No 36, Jubilee Hills, Hyderabad, 500033',
  address_manikonda: 'H.No. 4-56/1, Alkapuri Township, Manikonda, Hyderabad, 500089',
  address_gachibowli: 'DLF Cyber City, Gachibowli, Hyderabad, 500032',
}

export async function getSetting(key: string): Promise<string> {
  try {
    const supabase = createServerClient()
    if (!supabase) return defaults[key] || ''

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase as any)
      .from('site_settings')
      .select('value')
      .eq('key', key)
      .single()

    return (data as { value: string } | null)?.value || defaults[key] || ''
  } catch {
    return defaults[key] || ''
  }
}

export async function getAllSettings(): Promise<Record<string, string>> {
  try {
    const supabase = createServerClient()
    if (!supabase) return { ...defaults }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase as any).from('site_settings').select('key, value')
    if (!data) return { ...defaults }

    const settings = { ...defaults }
    for (const row of data as { key: string; value: string }[]) {
      settings[row.key] = row.value
    }
    return settings
  } catch {
    return { ...defaults }
  }
}

export function getDefaultSettings(): Record<string, string> {
  return { ...defaults }
}
