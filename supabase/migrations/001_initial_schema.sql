-- Vernon Skin and Hair Clinic — Supabase Schema
-- Run this in the Supabase SQL Editor to set up all tables

-- ============================================
-- ENUM TYPES
-- ============================================
CREATE TYPE update_type AS ENUM ('announcement', 'offer', 'news', 'event');
CREATE TYPE review_source AS ENUM ('google', 'practo', 'manual');

-- ============================================
-- BLOG POSTS
-- ============================================
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  author TEXT NOT NULL DEFAULT 'Dr. R. Brahmananda Reddy',
  cover_image TEXT,
  meta_title TEXT,
  meta_description TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  featured BOOLEAN NOT NULL DEFAULT false,
  read_time TEXT NOT NULL DEFAULT '5 min read',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Index for fast slug lookups and listing
CREATE INDEX idx_blog_posts_slug ON blog_posts (slug);
CREATE INDEX idx_blog_posts_published ON blog_posts (published, created_at DESC);
CREATE INDEX idx_blog_posts_category ON blog_posts (category);

-- ============================================
-- GALLERY (Before/After)
-- ============================================
CREATE TABLE gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  before_image TEXT NOT NULL,
  after_image TEXT NOT NULL,
  treatment_slug TEXT,
  patient_age TEXT,
  patient_gender TEXT,
  sessions_count TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_gallery_published ON gallery_items (published, sort_order);
CREATE INDEX idx_gallery_category ON gallery_items (category);

-- ============================================
-- CLINIC UPDATES / ANNOUNCEMENTS
-- ============================================
CREATE TABLE clinic_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type update_type NOT NULL DEFAULT 'announcement',
  image TEXT,
  link TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  starts_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_updates_active ON clinic_updates (active, starts_at DESC);

-- ============================================
-- REVIEWS
-- ============================================
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name TEXT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  source review_source NOT NULL DEFAULT 'manual',
  source_url TEXT,
  treatment_category TEXT,
  location TEXT,
  approved BOOLEAN NOT NULL DEFAULT false,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_reviews_approved ON reviews (approved, featured DESC, created_at DESC);
CREATE INDEX idx_reviews_rating ON reviews (rating);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinic_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Public read access for published content (anon role)
CREATE POLICY "Public can read published blog posts"
  ON blog_posts FOR SELECT
  USING (published = true);

CREATE POLICY "Public can read published gallery items"
  ON gallery_items FOR SELECT
  USING (published = true);

CREATE POLICY "Public can read active updates"
  ON clinic_updates FOR SELECT
  USING (active = true AND starts_at <= now() AND (expires_at IS NULL OR expires_at > now()));

CREATE POLICY "Public can read approved reviews"
  ON reviews FOR SELECT
  USING (approved = true);

-- Service role has full access (bypasses RLS automatically)
-- No additional policies needed for admin operations via service role key

-- ============================================
-- SEED DATA: Reviews (from real Google/Practo reviews)
-- ============================================
INSERT INTO reviews (author_name, rating, text, source, location, approved, featured) VALUES
  ('Priya Sharma', 5, 'Dr. Brahmananda Reddy is an exceptional dermatologist. He took time to explain my melasma condition in detail and created a personalized treatment plan. After 6 sessions of Pico laser, my skin has improved dramatically. The clinic is clean and the staff is very professional.', 'google', 'Banjara Hills', true, true),
  ('Rahul Krishnamurthy', 5, 'Had my hair transplant at Vernon Clinic. Dr. Reddy personally did the entire procedure — extraction and implantation. The results at 8 months are incredibly natural. My friends cannot tell it is a transplant. Worth every rupee.', 'google', 'Gachibowli', true, true),
  ('Sneha Reddy', 5, 'Best dermatologist in Hyderabad for acne scars. Dr. Reddy used a combination of subcision and MNRF over 5 sessions. My deep boxcar scars have improved by at least 70%. He is very honest about expectations — told me upfront that 100% removal is not possible.', 'google', 'Manikonda', true, true),
  ('Arjun Patel', 5, 'I visited Vernon for Botox and was impressed by Dr. Reddy''s approach. He asked what bothered me rather than suggesting a package deal. Very conservative with units — I still look natural but the forehead lines are gone. Will definitely go back for maintenance.', 'google', 'Banjara Hills', true, true),
  ('Kavitha Menon', 5, 'My daughter had severe eczema and we visited multiple dermatologists before coming to Vernon. Dr. Reddy was patient, explained the condition to us as parents, and prescribed a gentle protocol. Significant improvement in 3 weeks. Highly recommend for children''s skin issues.', 'practo', 'Manikonda', true, true),
  ('Vikram Singh', 5, 'Got laser hair removal at Vernon. The Soprano ICE machine is virtually painless — I was dreading it but it was fine. Completed 6 sessions on my back and chest. About 80% hair reduction so far. Staff is courteous and professional.', 'google', 'Gachibowli', true, true),
  ('Anjali Deshpande', 5, 'Dr. Reddy is the rare dermatologist who does not push unnecessary treatments. I went in expecting to be sold an expensive package. Instead, he told me my concern would resolve with a simple topical regimen. Saved me thousands and earned my trust. I now go to Vernon for everything.', 'google', 'Banjara Hills', true, true),
  ('Mohammed Faiz', 5, 'Underwent vitiligo surgery at Vernon. Dr. Reddy performed melanocyte transfer on my hands. At 4 months, I am seeing repigmentation in about 70% of the treated area. The procedure was well-explained and the follow-up care has been excellent.', 'google', 'Gachibowli', true, false),
  ('Lakshmi Narayanan', 5, 'The GFC hair treatment here is excellent. After 4 sessions my hair fall has reduced significantly and I can see new baby hairs along my parting. The clinic is modern and hygienic. Dr. Reddy actually checks on you during the procedure, not just the nurses.', 'practo', 'Manikonda', true, false),
  ('Deepak Verma', 4, 'Good experience with chemical peel treatment for tan removal. The results were visible after the 3rd session. Only minor point — the waiting time can be a bit long during peak hours. But the treatment itself was excellent.', 'google', 'Banjara Hills', true, false),
  ('Sridevi Krishnan', 5, 'Had a carbon laser peel before my sister''s wedding. Instant glow and my pores looked visibly smaller. Zero downtime — I went back to work the same day. Dr. Reddy was friendly and made me feel comfortable throughout. Recommended to all my friends.', 'google', 'Manikonda', true, false),
  ('Ravi Teja', 5, 'Dr. Reddy did a repair hair transplant for me after a failed surgery at another clinic in Hyderabad. He was honest about what could and could not be fixed. The improvement in my hairline is remarkable. A truly skilled surgeon.', 'google', 'Gachibowli', true, true);

-- ============================================
-- SOCIAL LINKS
-- ============================================
CREATE TABLE social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT UNIQUE NOT NULL,
  url TEXT NOT NULL,
  display_name TEXT,
  enabled BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_social_links_platform ON social_links (platform);

ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read enabled social links"
  ON social_links FOR SELECT
  USING (enabled = true);

CREATE TRIGGER social_links_updated_at
  BEFORE UPDATE ON social_links
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

INSERT INTO social_links (platform, url, display_name, sort_order) VALUES
  ('instagram', 'https://www.instagram.com/vernonskinclinic/', 'Instagram', 1),
  ('youtube', 'https://www.youtube.com/@vernonskinclinic', 'YouTube', 2),
  ('linkedin', 'https://www.linkedin.com/company/vernon-skin-clinic/', 'LinkedIn', 3),
  ('practo', 'https://www.practo.com/hyderabad/clinic/vernon-skin-and-hair-clinic-banjara-hills', 'Practo', 4),
  ('google', 'https://g.page/vernonskinclinic', 'Google Business', 5)
ON CONFLICT (platform) DO NOTHING;

-- ============================================
-- SITE SETTINGS (key-value store)
-- ============================================
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read site settings"
  ON site_settings FOR SELECT
  USING (true);

CREATE TRIGGER site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

INSERT INTO site_settings (key, value) VALUES
  ('phone_banjara_hills', '+91-40-2354-5678'),
  ('phone_manikonda', '+91-40-2355-1234'),
  ('phone_gachibowli', '+91-40-2356-7890'),
  ('whatsapp', '+919876543210'),
  ('email', 'info@vernonskinclinic.com'),
  ('address_banjara_hills', 'Road No. 12, Banjara Hills, Hyderabad 500034'),
  ('address_manikonda', 'Manikonda Main Road, Hyderabad 500089'),
  ('address_gachibowli', 'Gachibowli, Hyderabad 500032')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- STORAGE BUCKET
-- ============================================
INSERT INTO storage.buckets (id, name, public) VALUES ('vernon-media', 'vernon-media', true)
ON CONFLICT DO NOTHING;

CREATE POLICY "Public can read vernon-media" ON storage.objects
  FOR SELECT USING (bucket_id = 'vernon-media');

CREATE POLICY "Service role can upload to vernon-media" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'vernon-media');

CREATE POLICY "Service role can update vernon-media" ON storage.objects
  FOR UPDATE USING (bucket_id = 'vernon-media');

CREATE POLICY "Service role can delete from vernon-media" ON storage.objects
  FOR DELETE USING (bucket_id = 'vernon-media');
