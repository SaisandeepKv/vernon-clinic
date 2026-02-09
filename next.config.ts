import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'vernonskinclinic.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
  async redirects() {
    return [
      // ===== WordPress Legacy URL Redirects (from crawl) =====
      // Hair Transplant pages
      { source: '/hair-transplantation', destination: '/treatments/hair-restoration/hair-transplant', permanent: true },
      { source: '/hair-transplantation/', destination: '/treatments/hair-restoration/hair-transplant', permanent: true },
      { source: '/what-is-a-dhi-technique', destination: '/treatments/hair-restoration/dhi-hair-transplant', permanent: true },
      { source: '/what-is-a-dhi-technique/', destination: '/treatments/hair-restoration/dhi-hair-transplant', permanent: true },
      { source: '/fut-fue-combined-hair-transplant', destination: '/treatments/hair-restoration/hair-transplant', permanent: true },
      { source: '/fut-fue-combined-hair-transplant/', destination: '/treatments/hair-restoration/hair-transplant', permanent: true },
      { source: '/fuefutbht-combine-technique-for-hair-transplant', destination: '/treatments/hair-restoration/body-hair-transplant', permanent: true },
      { source: '/fuefutbht-combine-technique-for-hair-transplant/', destination: '/treatments/hair-restoration/body-hair-transplant', permanent: true },
      { source: '/body-hair-transplant', destination: '/treatments/hair-restoration/body-hair-transplant', permanent: true },
      { source: '/body-hair-transplant/', destination: '/treatments/hair-restoration/body-hair-transplant', permanent: true },
      { source: '/eyebrow-hair-transplant', destination: '/treatments/hair-restoration/beard-eyebrow-restoration', permanent: true },
      { source: '/eyebrow-hair-transplant/', destination: '/treatments/hair-restoration/beard-eyebrow-restoration', permanent: true },
      { source: '/women-hair-transplant', destination: '/treatments/hair-restoration/women-hair-transplant', permanent: true },
      { source: '/women-hair-transplant/', destination: '/treatments/hair-restoration/women-hair-transplant', permanent: true },
      { source: '/information-about-hair-transplant', destination: '/treatments/hair-restoration/hair-transplant', permanent: true },
      { source: '/information-about-hair-transplant/', destination: '/treatments/hair-restoration/hair-transplant', permanent: true },

      // Hair Treatment pages
      { source: '/gfc-hair-treatment-benefits-for-hair-loss', destination: '/treatments/hair-restoration/prp-gfc-therapy', permanent: true },
      { source: '/gfc-hair-treatment-benefits-for-hair-loss/', destination: '/treatments/hair-restoration/prp-gfc-therapy', permanent: true },
      { source: '/revitalized-hair-with-gfc-hair-treatment', destination: '/treatments/hair-restoration/prp-gfc-therapy', permanent: true },
      { source: '/revitalized-hair-with-gfc-hair-treatment/', destination: '/treatments/hair-restoration/prp-gfc-therapy', permanent: true },
      { source: '/advanced-bio-hair-therapy-with-gfc-hair-treatment-2', destination: '/treatments/hair-restoration/prp-gfc-therapy', permanent: true },
      { source: '/advanced-bio-hair-therapy-with-gfc-hair-treatment-2/', destination: '/treatments/hair-restoration/prp-gfc-therapy', permanent: true },
      { source: '/meso-therapy-hair', destination: '/treatments/hair-restoration/mesotherapy-hair', permanent: true },
      { source: '/meso-therapy-hair/', destination: '/treatments/hair-restoration/mesotherapy-hair', permanent: true },
      { source: '/laser-for-hair-growthlllt', destination: '/treatments/hair-restoration/prp-gfc-therapy', permanent: true },
      { source: '/laser-for-hair-growthlllt/', destination: '/treatments/hair-restoration/prp-gfc-therapy', permanent: true },

      // Skin Treatment pages
      { source: '/derma-peels-skin-treatment', destination: '/treatments/aesthetics/derma-peels', permanent: true },
      { source: '/derma-peels-skin-treatment/', destination: '/treatments/aesthetics/derma-peels', permanent: true },
      { source: '/vernon-laser-treatment', destination: '/treatments/laser-and-pico/pico-laser-pigmentation', permanent: true },
      { source: '/vernon-laser-treatment/', destination: '/treatments/laser-and-pico/pico-laser-pigmentation', permanent: true },
      { source: '/unlock-clear-radiant-skin-with-q-switched-laser-treatment', destination: '/treatments/laser-and-pico/q-switched-laser', permanent: true },
      { source: '/unlock-clear-radiant-skin-with-q-switched-laser-treatment/', destination: '/treatments/laser-and-pico/q-switched-laser', permanent: true },
      { source: '/top-skin-brightening-treatments', destination: '/treatments/laser-and-pico/pico-laser-pigmentation', permanent: true },
      { source: '/top-skin-brightening-treatments/', destination: '/treatments/laser-and-pico/pico-laser-pigmentation', permanent: true },
      { source: '/botox-and-fillers', destination: '/treatments/aesthetics/botox-fillers', permanent: true },
      { source: '/botox-and-fillers/', destination: '/treatments/aesthetics/botox-fillers', permanent: true },
      { source: '/mesotherapy-for-skin', destination: '/treatments/aesthetics/medi-facials', permanent: true },
      { source: '/mesotherapy-for-skin/', destination: '/treatments/aesthetics/medi-facials', permanent: true },
      { source: '/vampire-lift-treatment', destination: '/treatments/aesthetics/vampire-lift', permanent: true },
      { source: '/vampire-lift-treatment/', destination: '/treatments/aesthetics/vampire-lift', permanent: true },
      { source: '/medi-facials-the-non-surgical-solution-for-timeless-beauty', destination: '/treatments/aesthetics/medi-facials', permanent: true },
      { source: '/medi-facials-the-non-surgical-solution-for-timeless-beauty/', destination: '/treatments/aesthetics/medi-facials', permanent: true },
      { source: '/body-perfection', destination: '/treatments/aesthetics/body-contouring', permanent: true },
      { source: '/body-perfection/', destination: '/treatments/aesthetics/body-contouring', permanent: true },
      { source: '/above-40', destination: '/treatments/aesthetics', permanent: true },
      { source: '/above-40/', destination: '/treatments/aesthetics', permanent: true },

      // Core pages
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/about-us/', destination: '/about', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/contact-us/', destination: '/contact', permanent: true },
      { source: '/book-an-appointment', destination: '/contact', permanent: true },
      { source: '/book-an-appointment/', destination: '/contact', permanent: true },
      { source: '/departments', destination: '/treatments', permanent: true },
      { source: '/departments/', destination: '/treatments', permanent: true },

      // Blog redirects (catch-all for old blog pages)
      { source: '/blog/page/:page', destination: '/blog', permanent: true },
      { source: '/regain-your-confidence-with-gfc-hair-treatment-in-hyderabad-at-vernon-skin-clinic', destination: '/blog', permanent: true },
      { source: '/the-ultimate-guide-to-body-hair-transplant-at-vernon', destination: '/blog', permanent: true },

      // Phonetic confusion searches
      { source: '/werner-skin-clinic', destination: '/', permanent: true },
      { source: '/vernon-skinner', destination: '/', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

export default nextConfig
