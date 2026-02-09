// Shimmer blur placeholder for Next.js Image component
// Generates a lightweight SVG-based blur data URI

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#e2e8f0" offset="20%" />
      <stop stop-color="#f1f5f9" offset="50%" />
      <stop stop-color="#e2e8f0" offset="80%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#e2e8f0" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

function toBase64(str: string) {
  return typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)
}

export function blurDataURL(w = 700, h = 475): string {
  return `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`
}

// Teal-tinted placeholder for clinical/medical images
export function blurDataURLTeal(w = 700, h = 475): string {
  const svg = `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${w}" height="${h}" fill="#ccfbf1" />
</svg>`
  return `data:image/svg+xml;base64,${toBase64(svg)}`
}

// Dark placeholder for hero/dark sections
export function blurDataURLDark(w = 700, h = 475): string {
  const svg = `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${w}" height="${h}" fill="#232d36" />
</svg>`
  return `data:image/svg+xml;base64,${toBase64(svg)}`
}
