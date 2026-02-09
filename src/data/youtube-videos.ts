export interface YouTubeVideo {
  id: string
  title: string
  category: 'hair-transplant' | 'skin-treatment' | 'aesthetics' | 'education' | 'testimonial' | 'clinic'
  language: 'english' | 'telugu' | 'bilingual'
  featured?: boolean
}

// Vernon Skin and Hair Clinic YouTube Channel
// Channel: VERNON SKIN and HAIR CLINIC
// Channel ID: UCDXZCaiqHI0IfBW10mG87OA
export const youtubeChannelUrl = 'https://www.youtube.com/@VERNONSKINCLINIC'
export const youtubeChannelId = 'UCDXZCaiqHI0IfBW10mG87OA'

export const youtubeVideos: YouTubeVideo[] = [
  // Featured / Most Popular
  {
    id: '0GMAmW1jmcc',
    title: 'Best Skin Whitening Treatment',
    category: 'skin-treatment',
    language: 'telugu',
    featured: true,
  },
  {
    id: 'Hx8xew0OvUo',
    title: 'Alopecia Areata: Causes, Symptoms, and Treatments',
    category: 'education',
    language: 'telugu',
    featured: true,
  },
  {
    id: 'VwpQhuHcVTU',
    title: 'Baldness Treatment — How to Care for a Bald Head',
    category: 'hair-transplant',
    language: 'telugu',
    featured: true,
  },

  // Hair Transplant & Hair Loss
  {
    id: 'CKlvUuYxivY',
    title: 'Hair Transplant Surgery Using The Latest Technology & Techniques',
    category: 'hair-transplant',
    language: 'english',
    featured: true,
  },
  {
    id: 'vI1KuEtch_o',
    title: "Care After Hair Transplant | Do's & Don'ts",
    category: 'hair-transplant',
    language: 'english',
  },
  {
    id: 'VFwHKeHfobQ',
    title: 'Can Surgery Fix Baldness? | Dr. Brahmananda Reddy',
    category: 'hair-transplant',
    language: 'telugu',
  },
  {
    id: '8Dq9j93fOxY',
    title: 'Advanced Treatment For Hair Loss and Baldness',
    category: 'hair-transplant',
    language: 'english',
  },
  {
    id: '1n-b_TLZ1ds',
    title: 'How to Control Hair Fall | Hair Regrowth Tips',
    category: 'education',
    language: 'english',
  },
  {
    id: 'psEoy5e7o2g',
    title: 'Common Causes Of Hair Loss | Dr. Brahmananda Reddy',
    category: 'education',
    language: 'telugu',
  },
  {
    id: '9GuodoclnGg',
    title: 'Cause of Hair Fall and Its Treatment | Hair Regrowth',
    category: 'education',
    language: 'english',
  },
  {
    id: 'rIlgG6E7L58',
    title: 'Hair Transplant at Vernon Advanced Hair Transplant Clinic',
    category: 'hair-transplant',
    language: 'english',
  },
  {
    id: 'MD0tmhf3ed4',
    title: 'Hair Loss Treatments at Vernon',
    category: 'hair-transplant',
    language: 'english',
  },
  {
    id: 'TibGwisFjbw',
    title: 'The Ultimate Solution for Hair Loss at Vernon',
    category: 'hair-transplant',
    language: 'english',
  },

  // Skin Treatments & Aesthetics
  {
    id: 'NHd93dXSvdM',
    title: 'Benefits of Botox Treatment | Dr. Brahmananda Reddy',
    category: 'aesthetics',
    language: 'english',
    featured: true,
  },
  {
    id: 'WKWrU9wzH8Q',
    title: 'Non-Surgical Nose Correction (Liquid Rhinoplasty) | Dr. Brahmananda Reddy',
    category: 'aesthetics',
    language: 'english',
    featured: true,
  },
  {
    id: '5tXjG2m-JgA',
    title: 'Trust Vernon to Deliver Safe and Effective Results — Botox Treatment',
    category: 'aesthetics',
    language: 'english',
  },
  {
    id: '7bESRKKD7fc',
    title: 'Best Dermal Filler Clinic in Hyderabad | Advanced Fillers Treatment',
    category: 'aesthetics',
    language: 'english',
  },
  {
    id: 'lTgWgvBInsE',
    title: 'Causes of Teenage Acne | Skin Care Tips',
    category: 'education',
    language: 'telugu',
  },
  {
    id: 'aUnlzy3NJ1I',
    title: 'Acne and Acne Scars Treatment at Vernon',
    category: 'skin-treatment',
    language: 'english',
  },
  {
    id: 'PdEh8RynmbU',
    title: 'Important Facts About Hair Dye & Hair Color',
    category: 'education',
    language: 'telugu',
  },
  {
    id: 's2Rk4DkECcA',
    title: 'How to Prevent Lines and Wrinkles',
    category: 'aesthetics',
    language: 'english',
  },
  {
    id: 'ANMcoyV-Qx4',
    title: 'PRP (Platelet Rich Platelets) Treatment',
    category: 'hair-transplant',
    language: 'english',
  },

  // Skincare Tips
  {
    id: 'yXjQAgBbQ7k',
    title: 'Winter Skin Care Tips | Dr. Brahmananda Reddy',
    category: 'education',
    language: 'telugu',
  },
  {
    id: '9eLD21zxxWQ',
    title: 'Best Tips to Keep Your Skin Smooth and Soft in Winters',
    category: 'education',
    language: 'english',
  },
  {
    id: '4oYIQfxf7CA',
    title: 'Healthy Tips to Take Care of Your Lips in Winters',
    category: 'education',
    language: 'english',
  },
  {
    id: 'QmpGJH1JF-Y',
    title: 'Bridal Skin Care Before Marriage | Pre-Bridal Skin Glow',
    category: 'skin-treatment',
    language: 'english',
  },

  // Testimonials & Clinic
  {
    id: 'kPY4UzgbmTA',
    title: 'Customer Review: PRP Hair Treatment at Vernon',
    category: 'testimonial',
    language: 'english',
  },
  {
    id: 'YYpcxeYlqMg',
    title: 'Vernon Skin and Hair Clinic — Best Skin and Hair Clinic at Banjara Hills',
    category: 'clinic',
    language: 'english',
  },
  {
    id: 'IEfyehRb27w',
    title: 'Vernon Skin and Hair Clinic',
    category: 'clinic',
    language: 'english',
  },
]

export const getFeaturedVideos = (): YouTubeVideo[] => {
  return youtubeVideos.filter((v) => v.featured)
}

export const getVideosByCategory = (category: YouTubeVideo['category']): YouTubeVideo[] => {
  return youtubeVideos.filter((v) => v.category === category)
}
