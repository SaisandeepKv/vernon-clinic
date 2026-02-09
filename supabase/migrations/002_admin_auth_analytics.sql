-- Migration 002: Admin Auth, Profiles, Audit Log, and Settings
-- Run after 001_initial_schema.sql

-- Admin profiles (linked to Supabase Auth users)
CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Audit log for admin actions
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  changes JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Site settings (key-value store)
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Add author tracking columns to existing tables
DO $$ BEGIN
  ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;
  ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;
EXCEPTION WHEN others THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE gallery_items ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;
  ALTER TABLE gallery_items ADD COLUMN IF NOT EXISTS updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;
EXCEPTION WHEN others THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE reviews ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;
  ALTER TABLE reviews ADD COLUMN IF NOT EXISTS updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;
EXCEPTION WHEN others THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE clinic_updates ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;
  ALTER TABLE clinic_updates ADD COLUMN IF NOT EXISTS updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;
EXCEPTION WHEN others THEN NULL;
END $$;

-- RLS policies for admin_profiles
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read admin profiles"
  ON admin_profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Super admins can manage admin profiles"
  ON admin_profiles FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- RLS policies for audit_log
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read audit log"
  ON audit_log FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert audit entries"
  ON audit_log FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS policies for site_settings
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site settings"
  ON site_settings FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can update site settings"
  ON site_settings FOR ALL
  TO authenticated
  USING (true);

-- Storage policies for vernon-media bucket (if not already created)
-- NOTE: Create the bucket manually in Supabase dashboard as 'vernon-media' with public access
INSERT INTO storage.buckets (id, name, public) VALUES ('vernon-media', 'vernon-media', true)
ON CONFLICT (id) DO NOTHING;

-- Default site settings
INSERT INTO site_settings (key, value) VALUES
  ('site_title', 'Vernon Skin and Hair Clinic'),
  ('logo_url', '/images/vernon-logo.png'),
  ('contact_phone', '+91 91000 17567'),
  ('contact_email', 'info@vernonskinclinic.com'),
  ('contact_whatsapp', '+919100017567'),
  ('working_hours', 'Mon-Sat: 10:00 AM - 7:00 PM'),
  ('address_banjara_hills', 'Plot 8-2-293/82/A/1310, Road No 36, Jubilee Hills, Hyderabad, 500033'),
  ('address_manikonda', 'H.No. 4-56/1, Alkapuri Township, Manikonda, Hyderabad, 500089'),
  ('address_gachibowli', 'DLF Cyber City, Gachibowli, Hyderabad, 500032')
ON CONFLICT (key) DO NOTHING;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_audit_log_user ON audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_entity ON audit_log(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_created ON audit_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_profiles_role ON admin_profiles(role);
