import { NavItem } from '@/types'

export const navigation: NavItem[] = [
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Dr. R. Brahmananda Reddy', href: '/about/dr-brahmananda-reddy' },
      { label: 'Dr. Asritha Reddy', href: '/about/dr-asritha-reddy' },
      { label: 'Our Story', href: '/about/our-story' },
      { label: 'Technology', href: '/about/technology' },
    ],
  },
  {
    label: 'Treatments',
    href: '/treatments',
    children: [
      {
        label: 'Hair Restoration',
        href: '/treatments/hair-restoration',
        children: [
          { label: 'Hair Transplant (FUE/FUT/DHI)', href: '/treatments/hair-restoration/hair-transplant' },
          { label: 'DHI Hair Transplant', href: '/treatments/hair-restoration/dhi-hair-transplant' },
          { label: 'Repair Hair Transplant', href: '/treatments/hair-restoration/repair-hair-transplant' },
          { label: 'PRP & GFC Therapy', href: '/treatments/hair-restoration/prp-gfc-therapy' },
          { label: 'Women Hair Transplant', href: '/treatments/hair-restoration/women-hair-transplant' },
          { label: 'Beard & Eyebrow Restoration', href: '/treatments/hair-restoration/beard-eyebrow-restoration' },
          { label: 'Body Hair Transplant', href: '/treatments/hair-restoration/body-hair-transplant' },
          { label: 'Mesotherapy for Hair', href: '/treatments/hair-restoration/mesotherapy-hair' },
        ],
      },
      {
        label: 'Laser & Pico Technology',
        href: '/treatments/laser-and-pico',
        children: [
          { label: 'Pico Laser for Pigmentation', href: '/treatments/laser-and-pico/pico-laser-pigmentation' },
          { label: 'Pico Laser Tattoo Removal', href: '/treatments/laser-and-pico/pico-laser-tattoo-removal' },
          { label: 'Q-Switched Laser', href: '/treatments/laser-and-pico/q-switched-laser' },
          { label: 'Laser Hair Reduction', href: '/treatments/laser-and-pico/laser-hair-reduction' },
          { label: 'Carbon Laser Peel', href: '/treatments/laser-and-pico/carbon-laser-peel' },
        ],
      },
      {
        label: 'Clinical Dermatology',
        href: '/treatments/clinical-dermatology',
        children: [
          { label: 'Acne & Scar Revision', href: '/treatments/clinical-dermatology/acne-scar-revision' },
          { label: 'Vitiligo Surgery', href: '/treatments/clinical-dermatology/vitiligo-surgery' },
          { label: 'Wart & Mole Removal', href: '/treatments/clinical-dermatology/wart-mole-removal' },
          { label: 'Cyst & Lipoma Excision', href: '/treatments/clinical-dermatology/cyst-lipoma-excision' },
          { label: 'Alopecia Areata', href: '/treatments/clinical-dermatology/alopecia-areata-treatment' },
          { label: 'Anti-Dandruff Treatment', href: '/treatments/clinical-dermatology/anti-dandruff-treatment' },
          { label: 'Hyperhidrosis (Sweating)', href: '/treatments/clinical-dermatology/hyperhidrosis-treatment' },
          { label: 'Pediatric Dermatology', href: '/treatments/clinical-dermatology/pediatric-dermatology' },
        ],
      },
      {
        label: 'Aesthetics & Anti-Aging',
        href: '/treatments/aesthetics',
        children: [
          { label: 'Botox & Fillers', href: '/treatments/aesthetics/botox-fillers' },
          { label: 'Thread Lifts', href: '/treatments/aesthetics/thread-lifts' },
          { label: 'HIFU Skin Tightening', href: '/treatments/aesthetics/hifu-skin-tightening' },
          { label: 'Profhilo Skin Booster', href: '/treatments/aesthetics/profhilo-skin-booster' },
          { label: 'Medi-Facials & HydraFacial', href: '/treatments/aesthetics/medi-facials' },
          { label: 'Derma Peels', href: '/treatments/aesthetics/derma-peels' },
          { label: 'Vampire Lift (PRP Facial)', href: '/treatments/aesthetics/vampire-lift' },
          { label: 'Dark Circle Treatment', href: '/treatments/aesthetics/dark-circle-treatment' },
          { label: 'Jawline Contouring', href: '/treatments/aesthetics/jawline-contouring' },
          { label: 'Lip Augmentation', href: '/treatments/aesthetics/lip-augmentation' },
          { label: 'Mesotherapy for Skin', href: '/treatments/aesthetics/mesotherapy-skin' },
        ],
      },
      {
        label: 'Body & Wellness',
        href: '/treatments/body-wellness',
        children: [
          { label: 'Body Contouring', href: '/treatments/body-wellness/body-contouring' },
          { label: 'IV Drip Therapy', href: '/treatments/body-wellness/iv-drip-therapy' },
          { label: 'Stretch Mark Treatment', href: '/treatments/body-wellness/stretch-marks' },
          { label: 'Bridal Packages', href: '/treatments/body-wellness/bridal-packages' },
          { label: 'Glutathione Radiance', href: '/treatments/body-wellness/glutathione-skin-radiance' },
        ],
      },
    ],
  },
  {
    label: 'Locations',
    href: '/locations',
    children: [
      { label: 'Banjara Hills', href: '/locations/banjara-hills' },
      { label: 'Manikonda', href: '/locations/manikonda' },
      { label: 'Gachibowli', href: '/locations/gachibowli' },
    ],
  },
  { label: 'Results', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]
