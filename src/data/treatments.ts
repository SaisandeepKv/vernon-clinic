import { Treatment } from '@/types'
import { treatmentCategories, getCategory } from './categories'

// Re-export for backward compatibility
export { treatmentCategories, getCategory }

export const treatments: Treatment[] = [
  // ===== HAIR RESTORATION =====
  {
    id: 'hair-transplant',
    name: 'Hair Transplant',
    slug: 'hair-transplant',
    category: treatmentCategories[0],
    shortDescription:
      'Surgeon-led FUE, FUT & DHI hair transplantation with natural hairline design by ISHRS member Dr. Brahmananda Reddy.',
    heroDescription: `Hair transplantation at Vernon is not a cosmetic procedure — it is reconstructive microsurgery. Every graft is extracted, preserved, and implanted under the direct oversight of Dr. R. Brahmananda Reddy, an ISHRS member and trained surgeon with a background in General Surgery (MS) and Minimal Access Surgery.

Unlike clinic chains where technicians perform the procedure, at Vernon, the surgeon controls every critical step: donor assessment, hairline architecture, graft angulation, and density distribution. This surgical-grade approach is why Vernon is trusted for both primary transplants and complex repair cases where previous surgeries have failed.`,
    image: 'https://images.unsplash.com/photo-1617257485487-da9a7a6d95e3?w=800&q=80',
    duration: '6–8 hours',
    sessions: '1 (with follow-up PRP sessions)',
    downtime: '7–10 days',
    suitableFor: [
      'Male pattern baldness (Norwood Scale II–VII)',
      'Female pattern hair loss',
      'Hairline recession',
      'Failed previous transplants (Repair cases)',
      'Scar camouflage',
      'Beard and eyebrow restoration',
    ],
    contraindications: [
      'Active scalp infections',
      'Uncontrolled diabetes',
      'Blood clotting disorders',
      'Insufficient donor area',
      'Unrealistic expectations (assessed during consultation)',
    ],
    technologies: ['FUE (Follicular Unit Extraction)', 'FUT (Follicular Unit Transplantation)', 'DHI (Direct Hair Implantation)', 'Sapphire FUE blades', 'Hypothermosol graft preservation'],
    faqs: [
      {
        question: 'How is Vernon different from clinic chains for hair transplant?',
        answer: 'At Vernon, Dr. Brahmananda Reddy — an MS in General Surgery and ISHRS member — personally performs every transplant. In most chains, technicians handle extraction and implantation with minimal surgeon involvement. The difference shows in naturalness of results, especially hairline design and graft survival rates.',
      },
      {
        question: 'What is the hair transplant cost at Vernon Clinic Hyderabad?',
        answer: 'Cost depends on the number of grafts needed, technique (FUE vs FUT vs DHI), and complexity. During your consultation, Dr. Reddy will assess your donor area, design the hairline, and provide a transparent cost breakdown. We do not offer per-graft pricing that incentivizes over-harvesting.',
      },
      {
        question: 'Will my transplanted hair look natural?',
        answer: 'Naturalness depends on three factors: hairline design, graft angulation, and density distribution. Dr. Reddy designs hairlines based on facial geometry, age, and future hair loss patterns — not templated shapes. Each graft is placed at the correct angle and direction to match natural hair growth.',
      },
      {
        question: 'What happens during the shedding phase after transplant?',
        answer: 'Between weeks 2–6, transplanted hairs enter a "shock shedding" phase. This is normal physiology — the follicle root remains alive and enters a resting phase. New growth begins around month 3–4, with progressive thickening. Final results are visible at 12–14 months.',
      },
      {
        question: 'Can you fix a bad hair transplant done elsewhere?',
        answer: 'Yes. Repair hair transplants are a significant part of Dr. Reddy\'s practice. Common issues we correct include unnatural "pluggy" hairlines, visible scarring, poor density distribution, and depleted donor areas. Repair surgery requires greater skill than primary surgery.',
      },
    ],
    metaTitle: 'Hair Transplant in Hyderabad | ISHRS Surgeon Dr. Brahmananda Reddy | Vernon Clinic',
    metaDescription: 'Best hair transplant in Hyderabad by ISHRS surgeon Dr. Brahmananda Reddy. FUE, FUT, DHI techniques with natural results. Repair transplants available. 13+ years experience.',
  },
  {
    id: 'repair-hair-transplant',
    name: 'Repair Hair Transplant',
    slug: 'repair-hair-transplant',
    category: treatmentCategories[0],
    shortDescription:
      'Correction of failed hair transplants — unnatural hairlines, scarring, poor density, and depleted donor areas.',
    heroDescription: `Not every hair transplant delivers the promised result. Unnatural hairlines, visible "plug" patterns, wide scars from strip surgery, and patchy density are common consequences of procedures performed by undertrained operators or in high-volume assembly-line clinics.

Repair hair transplantation is among the most demanding procedures in hair restoration surgery. It requires the surgeon to work within the constraints of a damaged donor area while correcting aesthetic failures. Dr. Brahmananda Reddy's background in General Surgery and Minimal Access Surgery makes him uniquely qualified for these complex revisions — he understands tissue handling, scar modification, and graft survival in compromised tissue.`,
    image: 'https://images.unsplash.com/photo-1643191834050-15b4b41be4ac?w=800&q=80',
    duration: '4–8 hours (varies by complexity)',
    sessions: '1–2 (depending on extent of correction needed)',
    downtime: '7–14 days',
    suitableFor: [
      'Unnatural or "pluggy" hairlines from previous surgery',
      'Wide linear scars from FUT/strip surgery',
      'Poor graft survival or patchy results',
      'Over-harvested donor areas',
      'Incorrect hair direction or angulation',
    ],
    contraindications: [
      'Severely depleted donor area (assessed individually)',
      'Active keloid formation',
      'Unrealistic expectations for degree of correction',
    ],
    technologies: ['Micro-FUE for scar camouflage', 'Scar revision techniques', 'Scalp micropigmentation (adjunct)', 'Hypothermosol graft preservation'],
    faqs: [
      {
        question: 'How do I know if I need a repair transplant?',
        answer: 'If your hairline looks unnatural, you can see individual "plugs," your scar is visible, or the overall density is poor despite a previous transplant, you may benefit from repair surgery. Book a consultation with Dr. Reddy for an honest assessment.',
      },
      {
        question: 'Is repair surgery more expensive than a first transplant?',
        answer: 'Repair procedures are often more complex and require greater surgical skill, so they may cost more per session. However, fewer grafts may be needed. Dr. Reddy provides a transparent assessment during consultation.',
      },
    ],
    metaTitle: 'Repair Hair Transplant Hyderabad | Fix Failed Hair Transplant | Vernon Clinic',
    metaDescription: 'Failed hair transplant? Dr. Brahmananda Reddy specializes in repair hair transplant surgery in Hyderabad. Fix unnatural hairlines, scarring, poor density. ISHRS surgeon.',
  },
  {
    id: 'prp-gfc-therapy',
    name: 'PRP & GFC Therapy',
    slug: 'prp-gfc-therapy',
    category: treatmentCategories[0],
    shortDescription:
      'Platelet-Rich Plasma and Growth Factor Concentrate therapy for hair regrowth and follicle strengthening.',
    heroDescription: `PRP (Platelet-Rich Plasma) and GFC (Growth Factor Concentrate) therapy harness your body's own healing mechanisms to stimulate hair follicles. A small blood sample is drawn, processed to concentrate platelets and growth factors, and injected directly into areas of thinning hair.

**PRP (Platelet-Rich Plasma):** Blood is drawn and centrifuged to concentrate platelets to 4–6x baseline levels. The concentrated plasma contains key growth factors — PDGF (platelet-derived growth factor) and VEGF (vascular endothelial growth factor) — that act on stem cells in the hair follicle, stimulate new follicle development, and promote neovascularization (new blood vessel formation) around follicles. Typically requires 4–6 sessions. Hair fall reduction begins within 2–3 months; visible thickness improvement in 4–6 months.

**GFC (Growth Factor Concentrate):** A second-generation advancement over PRP. GFC extracts only the purified growth factors from platelets, excluding red blood cells and white blood cells entirely. This provides a higher concentration of targeted growth factors including PDGF, TGF-beta, FGF (fibroblast growth factor), VEGF, IGF (insulin-like growth factor), and BDGF (brain-derived growth factor). Clinical studies show GFC produces better outcomes in total hair count and shaft diameter compared to PRP. Requires fewer sessions (3–4 vs 4–6 for PRP) with results often appearing within 1 month.

**The key difference:** PRP contains everything in concentrated blood — platelets along with other blood components, which can cause more inflammation at the injection site. GFC is purified to contain only the growth factors your follicles need, with no inflammatory components. This means less post-procedure swelling and a potentially more effective, targeted regenerative response.

At Vernon, Dr. Reddy recommends the appropriate therapy based on the stage and type of hair loss, patient budget, and individual response. Both treatments are used as adjuncts to hair transplant surgery or as standalone therapy for early-stage hair loss.`,
    image: 'https://plus.unsplash.com/premium_photo-1674219246699-f1132854b712?w=800&q=80',
    duration: '45–60 minutes',
    sessions: '4–6 sessions (monthly), then maintenance every 3–4 months',
    downtime: 'None — return to work the same day',
    suitableFor: [
      'Early-stage male and female pattern hair loss',
      'Post-transplant graft survival enhancement',
      'Diffuse thinning',
      'Alopecia areata (select cases)',
    ],
    contraindications: [
      'Active blood disorders',
      'Platelet dysfunction syndromes',
      'Active scalp infections',
      'Pregnancy',
    ],
    technologies: ['Double-spin centrifugation', 'GFC isolation kit', 'Mesotherapy injection technique'],
    faqs: [
      {
        question: 'What is the difference between PRP and GFC?',
        answer: 'PRP contains concentrated platelets along with other blood components. GFC goes a step further by isolating just the growth factors from platelets, providing a more purified and potentially more effective concentrate without red or white blood cells.',
      },
      {
        question: 'How many PRP sessions do I need?',
        answer: 'Most patients see improvement with 4–6 monthly sessions. After the initial course, maintenance sessions every 3–4 months help sustain results. Response varies based on the stage and type of hair loss.',
      },
    ],
    metaTitle: 'PRP & GFC Hair Treatment Hyderabad | Non-Surgical Hair Regrowth | Vernon Clinic',
    metaDescription: 'Advanced PRP and GFC therapy for hair loss in Hyderabad. Non-surgical hair regrowth treatment with growth factor technology at Vernon Skin and Hair Clinic.',
  },
  {
    id: 'beard-eyebrow-restoration',
    name: 'Beard & Eyebrow Restoration',
    slug: 'beard-eyebrow-restoration',
    category: treatmentCategories[0],
    shortDescription:
      'Precision facial hair transplantation for beard, moustache, and eyebrow restoration with natural-looking results.',
    heroDescription: `Beard and eyebrow transplantation demands the highest degree of surgical precision. Unlike scalp transplants where you work with thousands of grafts, facial hair restoration involves placing individual follicles at exact angles, depths, and directions to mimic natural growth patterns.

Dr. Brahmananda Reddy's microsurgical training is particularly valuable here. Each eyebrow hair must be placed at a specific acute angle (10–15 degrees) to lie flat against the skin, and each beard graft must follow the natural curl pattern of facial hair. The donor hair is typically harvested from behind the ear or the nape — areas where hair characteristics most closely match facial hair.`,
    image: 'https://images.unsplash.com/photo-1602697579058-cb09b4cc9a6e?w=800&q=80',
    duration: '3–5 hours',
    sessions: '1',
    downtime: '5–7 days',
    suitableFor: [
      'Sparse or patchy beard growth',
      'Eyebrow hair loss (alopecia, over-plucking, scars)',
      'Burns or trauma scars on face',
      'Transgender patients seeking masculine facial hair',
    ],
    contraindications: [
      'Active acne in treatment area',
      'Keloid-prone skin in facial area',
      'Insufficient donor hair',
    ],
    technologies: ['Micro-FUE extraction', 'Single-graft implantation', 'Custom needle sizing'],
    faqs: [
      {
        question: 'Will the transplanted beard or eyebrow hair look natural?',
        answer: 'Yes, when performed by an experienced surgeon. Dr. Reddy places each graft individually at precise angles that match your natural facial hair direction. The key is using appropriate donor hair and meticulous placement.',
      },
    ],
    metaTitle: 'Beard & Eyebrow Transplant Hyderabad | Facial Hair Restoration | Vernon Clinic',
    metaDescription: 'Natural-looking beard and eyebrow transplant in Hyderabad by surgeon Dr. Brahmananda Reddy. Precision FUE technique for facial hair restoration at Vernon Clinic.',
  },

  // ===== LASER & PICO TECHNOLOGY =====
  {
    id: 'pico-laser-tattoo-removal',
    name: 'Pico Laser Tattoo Removal',
    slug: 'pico-laser-tattoo-removal',
    category: treatmentCategories[1],
    shortDescription:
      'US-FDA approved picosecond laser for multi-color tattoo removal. Photoacoustic technology for safer, faster clearance on Indian skin.',
    heroDescription: `Picosecond laser technology represents a fundamental shift in how laser energy interacts with ink particles. Traditional Q-switched lasers operate in nanoseconds (10⁻⁹ seconds) and rely primarily on photothermal energy — heat — to break down pigment. This works, but the thermal damage carries significant risk of burns, scarring, and post-inflammatory hyperpigmentation (PIH), especially on Indian skin types (Fitzpatrick IV–VI).

Pico lasers deliver energy in picoseconds (10⁻¹² seconds) — a thousand times faster. At this speed, the dominant mechanism shifts from photothermal to photoacoustic: the laser pulse generates a shockwave that shatters ink particles into microscopic fragments through mechanical force rather than heat. Think of it as the difference between melting ice (thermal) and shattering glass with sound (acoustic).

**Why this matters for Indian skin:** Melanin-rich skin absorbs more laser energy. With nanosecond lasers, this excess absorption generates heat in surrounding tissue, causing burns and hyperpigmentation. Pico lasers deliver energy so quickly that there is insufficient time for thermal diffusion — the energy is spent on particle fragmentation before heat can damage surrounding melanocytes. This makes Pico technology the safest laser platform for treating pigmentation and removing tattoos on darker skin tones.

**The particle size advantage:** Nanosecond lasers break ink into fragments comparable to gravel. Your immune system struggles to clear these large fragments, requiring 10–15+ sessions. Pico lasers shatter the same ink into dust-like particles that macrophages can readily engulf and transport to lymph nodes for clearance. Result: fewer sessions (typically 4–8) and more complete clearance, including stubborn colors like green and blue that resist traditional lasers.`,
    image: 'https://plus.unsplash.com/premium_photo-1674461537000-76c8a9c4024f?w=800&q=80',
    duration: '15–45 minutes per session',
    sessions: '4–8 sessions (2–4 weeks apart)',
    downtime: 'Minimal — mild redness for 24–48 hours',
    suitableFor: [
      'Professional and amateur tattoos (all colors)',
      'Previously treated but incompletely cleared tattoos',
      'Dark skin types (Fitzpatrick IV–VI)',
      'Multi-color tattoos including green and blue',
      'Cosmetic tattoo removal (eyebrows, lip liner)',
    ],
    contraindications: [
      'Pregnancy or breastfeeding',
      'Active skin infection at treatment site',
      'History of keloid scarring (relative)',
      'Photosensitizing medications',
      'Recent sun exposure / active tan',
    ],
    technologies: ['PicoWay Nd:YAG (1064nm) — deep pigment, black ink', 'PicoWay KTP (532nm) — superficial pigment, red/orange/yellow ink', 'PicoWay 785nm — blue/green ink, mid-depth lesions', 'PicoWay Resolve fractional handpiece'],
    faqs: [
      {
        question: 'How does Pico laser differ from Q-Switch laser for tattoo removal?',
        answer: 'Q-Switch lasers fire in nanoseconds and use heat (photothermal) to break ink. Pico lasers fire 1000x faster in picoseconds, using shockwaves (photoacoustic) to shatter ink into dust. This means less heat damage, fewer sessions, and better clearance of resistant colors — critical advantages for Indian skin.',
      },
      {
        question: 'Is Pico laser safe for dark Indian skin?',
        answer: 'Pico laser is the safest laser technology for Indian skin (Fitzpatrick IV–VI). Because the pulse is so fast, energy is spent on shattering pigment before heat can damage surrounding melanocytes. This minimizes the risk of post-inflammatory hyperpigmentation — the most common side effect of older lasers on dark skin.',
      },
      {
        question: 'How many sessions will I need for tattoo removal?',
        answer: 'Most tattoos require 4–8 sessions with Pico laser (compared to 10–15+ with Q-Switch). The number depends on ink density, colors used, tattoo age, depth of ink, and your immune response. Professional tattoos with dense, deep ink require more sessions than amateur tattoos.',
      },
      {
        question: 'Can Pico laser remove all tattoo colors?',
        answer: 'Yes. Pico lasers with multiple wavelengths (1064nm and 532nm) can target the full spectrum of tattoo inks, including green and blue pigments that Q-Switch lasers struggle with. The photoacoustic mechanism is effective regardless of ink color.',
      },
      {
        question: 'Does Pico laser tattoo removal hurt?',
        answer: 'Most patients describe the sensation as a rubber band snapping against the skin. We apply topical numbing cream 30–45 minutes before the procedure. The ultra-short pulse duration actually makes Pico laser less painful than Q-Switch treatments because there is less thermal sensation.',
      },
    ],
    metaTitle: 'Pico Laser Tattoo Removal Hyderabad | Safest for Indian Skin | Vernon Clinic',
    metaDescription: 'Advanced Pico laser tattoo removal in Hyderabad. Photoacoustic technology — safer for Indian skin, fewer sessions, all colors. US-FDA approved at Vernon Skin Clinic.',
  },
  {
    id: 'pico-laser-pigmentation',
    name: 'Pico Laser for Melasma & Pigmentation',
    slug: 'pico-laser-pigmentation',
    category: treatmentCategories[1],
    shortDescription:
      'Fractional Pico technology for melasma, sun spots, and uneven skin tone. The safest depigmentation laser for Indian skin types.',
    heroDescription: `Melasma and pigmentation disorders are among the most challenging conditions in dermatology, particularly for Indian skin. The same melanin that protects darker skin from UV damage also makes it hypersensitive to laser energy — creating a therapeutic paradox where the treatment can worsen the condition it aims to correct.

Fractional Pico laser resolves this paradox through two mechanisms:

**1. Laser-Induced Optical Breakdown (LIOB):** The fractional handpiece creates microscopic vacuoles in the dermis without disrupting the epidermis. These controlled micro-injuries trigger a wound healing cascade that remodels collagen and disperses melanin — all without the thermal damage that triggers rebound hyperpigmentation.

**2. Photoacoustic pigment disruption:** At the cellular level, Pico pulses fragment melanosomes (the organelles that contain melanin) into particles small enough for dermal macrophages to clear. Unlike chemical peels or older lasers that attempt to bleach or burn pigment, Pico technology works with the body's own clearance mechanisms.

**The melasma consideration:** Melasma is hormonally driven and exists in epidermal, dermal, and mixed forms. Dr. Reddy's protocol involves Wood's lamp assessment to determine melasma depth before selecting the appropriate energy settings. Low-fluence, high-frequency Pico toning is used for maintenance, while fractional Pico is used for deeper structural remodeling. This is always combined with strict photoprotection and topical depigmenting agents — laser alone is never sufficient for melasma management.`,
    image: 'https://images.unsplash.com/photo-1700760933574-9f0f4ea9aa3b?w=800&q=80',
    duration: '20–30 minutes',
    sessions: '4–6 sessions (2–4 weeks apart), then maintenance',
    downtime: 'Minimal — slight redness for a few hours',
    suitableFor: [
      'Melasma (epidermal, dermal, and mixed)',
      'Post-inflammatory hyperpigmentation (PIH)',
      'Sunspots and age spots',
      'Uneven skin tone',
      'Freckles',
      'Skin rejuvenation and pore refinement',
    ],
    contraindications: [
      'Active sun exposure / recent tanning',
      'Pregnancy',
      'Oral retinoid use within 6 months',
      'Active herpes simplex (facial treatment)',
    ],
    technologies: ['PicoWay Resolve fractional handpiece', 'Pico toning (low-fluence 1064nm)', '532nm for superficial epidermal pigment', '1064nm for deep dermal pigment', 'Multi-wavelength platform (532/785/1064nm)'],
    faqs: [
      {
        question: 'Can Pico laser cure melasma permanently?',
        answer: 'No laser can "cure" melasma because it is a chronic, hormonally-driven condition. However, Pico laser can significantly reduce pigmentation with minimal risk of rebound. Long-term management requires ongoing photoprotection (SPF 50+), topical agents, and periodic maintenance sessions.',
      },
      {
        question: 'Why is Pico laser better than chemical peels for pigmentation?',
        answer: 'Chemical peels work by controlled destruction of the epidermis — which carries significant risk of post-inflammatory hyperpigmentation in Indian skin. Pico laser bypasses the epidermis using fractional technology, targeting pigment at the dermal level with mechanical (not chemical) disruption. The risk profile is substantially better for darker skin.',
      },
    ],
    metaTitle: 'Pico Laser Melasma Treatment Hyderabad | Pigmentation Removal Indian Skin | Vernon',
    metaDescription: 'Safest melasma and pigmentation treatment for Indian skin. Fractional Pico laser at Vernon Clinic Hyderabad. No heat damage, minimal downtime. UK-trained dermatologist.',
  },
  {
    id: 'laser-hair-reduction',
    name: 'Laser Hair Reduction',
    slug: 'laser-hair-reduction',
    category: treatmentCategories[1],
    shortDescription:
      'FDA-approved diode and Nd:YAG laser systems for permanent hair reduction. Safe and effective for all Indian skin types.',
    heroDescription: `Laser hair reduction at Vernon Clinic uses FDA-approved laser platforms with the strongest evidence base for permanent hair reduction on Indian skin.

The principle is selective photothermolysis: laser energy is absorbed by melanin in the hair follicle, converting to heat that damages the follicular stem cells responsible for hair regrowth. The key to safety on Indian skin is using wavelengths that target follicular melanin while minimizing absorption by epidermal melanin.

**How modern laser hair removal works:** The laser targets the melanin (dark pigment) inside the hair shaft and follicle. When the laser pulse hits the hair, the melanin absorbs the energy and converts it to heat. This heat radiates outward from the hair shaft into the surrounding follicular structures, damaging the bulge region stem cells that produce new hair. The follicle enters a prolonged resting phase and eventually becomes incapable of producing terminal (thick) hair.

**Devices and wavelengths used at Vernon:**

**Soprano ICE (Alma Lasers):** Uses SHR (Super Hair Removal) technology with three wavelengths simultaneously — Alexandrite (755nm) + Diode (810nm) + Nd:YAG (1064nm). The unique IN-Motion technology delivers gradual heating through continuous low-fluence pulses, making it virtually painless. The combined wavelength approach treats all hair types (fine to coarse) and all skin colors. Particularly suitable for Indian skin due to the gradual heating process that reduces the risk of burns and PIH.

**Nd:YAG (1064nm):** Penetrates deepest with the least epidermal melanin absorption, making it the safest single wavelength for Fitzpatrick IV–VI (darker Indian skin types). The longer wavelength bypasses the melanin-rich epidermis to reach the hair follicle directly.

**Critical safety note for Indian skin:** The Alexandrite wavelength (755nm), while highly effective on lighter skin, must be used cautiously on darker skin tones as it is more strongly absorbed by epidermal melanin, risking burns and discoloration. At Vernon, Dr. Reddy selects the appropriate wavelength and parameters based on your individual Fitzpatrick skin type — this is not a one-setting-fits-all approach.`,
    image: 'https://images.unsplash.com/photo-1700760933941-3a06a28fbf47?w=800&q=80',
    duration: '15–60 minutes (depends on body area)',
    sessions: '6–8 sessions (4–6 weeks apart)',
    downtime: 'None',
    suitableFor: [
      'Unwanted facial hair (upper lip, chin, sideburns)',
      'Body hair (underarms, arms, legs, bikini)',
      'PCOS-related hirsutism',
      'Pseudofolliculitis barbae (razor bumps)',
      'All Indian skin types (Fitzpatrick III–VI)',
    ],
    contraindications: [
      'Active tan or recent sun exposure',
      'Pregnancy',
      'White or grey hair (no melanin target)',
      'Photosensitizing medications',
    ],
    technologies: ['Soprano ICE (Alma) — triple wavelength SHR', '1064nm Nd:YAG Laser', '810nm Diode Laser', '755nm Alexandrite (lighter skin types)', 'Contact cooling & IN-Motion technology'],
    faqs: [
      {
        question: 'Is laser hair removal permanent?',
        answer: 'The correct term is "permanent hair reduction." After a full course of 6–8 sessions, most patients experience 70–90% reduction in hair growth. Some fine hair may regrow over time, requiring annual maintenance sessions. Hormonal conditions like PCOS may require more sessions.',
      },
      {
        question: 'Which laser is best for Indian skin hair removal?',
        answer: 'The 1064nm Nd:YAG laser has the best safety profile for darker Indian skin. It penetrates deeper with less absorption by epidermal melanin, reducing the risk of burns and pigmentation changes. At Vernon, we select between diode (810nm) and Nd:YAG based on your specific skin type.',
      },
    ],
    metaTitle: 'Laser Hair Removal Hyderabad | Safe for Indian Skin | Vernon Skin Clinic',
    metaDescription: 'FDA-approved laser hair reduction in Hyderabad. Safe for all Indian skin types. Diode & Nd:YAG laser technology at Vernon Skin and Hair Clinic. PCOS specialists.',
  },
  {
    id: 'carbon-laser-peel',
    name: 'Carbon Laser Peel',
    slug: 'carbon-laser-peel',
    category: treatmentCategories[1],
    shortDescription:
      'Carbon-assisted Q-Switch laser for instant skin brightening, pore reduction, and oil control. The "Hollywood Peel."',
    heroDescription: `The Carbon Laser Peel — often called the "Hollywood Peel" or "China Doll Peel" — combines a carbon lotion with Q-Switch Nd:YAG laser energy to deliver immediate skin brightening and pore tightening with zero downtime.

**How the Hollywood Peel works — step by step:**

**Step 1 — Carbon application:** A thin layer of medical-grade liquid carbon is spread across the face. The carbon particles are microscopic and penetrate into pores, binding to dirt, oil, dead cells, and sebum.

**Step 2 — Laser-carbon interaction:** The Q-Switched Nd:YAG laser (1064nm) is fired at the carbon layer. Carbon absorbs the laser light energy intensely, causing micro-explosions at the skin surface.

**Step 3 — Surface effect:** The carbon is vaporized along with all bound impurities, dead skin cells, and excess oil. This produces immediate exfoliation, deep cleansing, and pore tightening.

**Step 4 — Deep effect:** The heat energy is conducted into the dermis, activating fibroblasts to produce new collagen and elastin. The thermal influence also acts on the pilosebaceous unit (oil gland), reducing oil production and targeting P. acnes bacteria through its effect on the cytokine-mediated inflammatory cascade — making this treatment effective for mild acne as well.

The result: an immediate "glow" effect with brighter, smoother, more refined skin from the very first session. Over a course of 4–6 sessions, the cumulative collagen stimulation produces lasting improvement in skin texture, pore size, and oil control. This is one of the most popular lunchtime procedures — the entire treatment takes 30 minutes with no downtime whatsoever.`,
    image: 'https://plus.unsplash.com/premium_photo-1764702290442-9fd140d79bf0?w=800&q=80',
    duration: '30 minutes',
    sessions: '4–6 sessions for optimal results',
    downtime: 'None — immediate return to activities',
    suitableFor: [
      'Oily skin and enlarged pores',
      'Dull, uneven skin tone',
      'Mild acne and blackheads',
      'Pre-event skin brightening',
      'Skin rejuvenation',
    ],
    contraindications: [
      'Active inflammatory acne (severe)',
      'Open wounds on treatment area',
      'Recent chemical peel (within 2 weeks)',
    ],
    technologies: ['Q-Switch Nd:YAG 1064nm', 'Medical-grade carbon suspension'],
    faqs: [
      {
        question: 'How soon will I see results from a Carbon Laser Peel?',
        answer: 'You will see immediate brightening and smoother texture after the first session. For sustained results — pore reduction, oil control, and tone improvement — a course of 4–6 sessions spaced 2–4 weeks apart is recommended.',
      },
    ],
    metaTitle: 'Carbon Laser Peel Hyderabad | Hollywood Peel | Instant Skin Brightening | Vernon',
    metaDescription: 'Carbon Laser Peel (Hollywood Peel) in Hyderabad at Vernon Skin Clinic. Instant skin brightening, pore reduction, and oil control. Zero downtime.',
  },

  // ===== CLINICAL DERMATOLOGY =====
  {
    id: 'acne-scar-revision',
    name: 'Acne & Scar Revision',
    slug: 'acne-scar-revision',
    category: treatmentCategories[2],
    shortDescription:
      'Multi-modal acne scar treatment: MNRF, subcision, TCA CROSS, fractional laser, and dermal fillers for all scar types.',
    heroDescription: `Acne scars are not a single entity — they exist on a spectrum from superficial discoloration to deep structural tissue loss. Effective scar revision requires accurate classification (ice pick, boxcar, rolling, hypertrophic) and a multi-modal approach that addresses each scar type with the appropriate intervention.

At Vernon, Dr. Brahmananda Reddy uses a combination protocol:

**MNRF (Micro-Needling Radio Frequency):** Insulated micro-needles penetrate to controlled depths (1.5mm for bony areas to 2.5mm for deeper scars) and deliver radiofrequency energy directly into the dermis, creating "Radiofrequency Thermal Zones" (RFTZ). The RF energy heats dermal collagen to 60–70°C, triggering immediate collagen contraction followed by a wound-healing cascade that produces new collagen (neocollagenesis) and new elastin (neoelastinogenesis) over the following weeks. Because the needle tips are insulated, the epidermis — the melanin-rich layer — is spared entirely. This is why MNRF is the safest energy-based scar treatment for Indian skin (Fitzpatrick III–V), with clinical studies showing 80% of patients achieving significant improvement. This is the workhorse treatment for boxcar and rolling scars on Indian skin.

**Subcision:** A surgical technique where a needle is used to release fibrous tethers that pull scars downward, allowing the skin surface to rise. Combined with filler or PRP injection to prevent re-tethering.

**TCA CROSS:** Trichloroacetic acid at high concentration (70–100%) applied focally to individual ice pick scars. This causes controlled chemical reconstruction of the scar column.

**Fractional CO2/Erbium laser:** Reserved for superficial texture improvement after structural scars have been addressed by subcision and MNRF.

No single technology "removes" acne scars. The Vernon protocol layers these modalities across multiple sessions, treating the deepest structural damage first and refining surface texture last.`,
    image: 'https://images.unsplash.com/photo-1706429468525-2ac4a7e177f5?w=800&q=80',
    duration: '45–90 minutes per session',
    sessions: '4–8 sessions (4–6 weeks apart)',
    downtime: '2–5 days (varies by modality)',
    suitableFor: [
      'Ice pick scars',
      'Boxcar scars',
      'Rolling scars',
      'Post-inflammatory hyperpigmentation from acne',
      'Hypertrophic scars',
      'Active acne (treated concurrently)',
    ],
    contraindications: [
      'Active cystic acne (must be controlled first)',
      'Oral isotretinoin use within 6 months',
      'Pregnancy',
      'Active skin infection',
    ],
    technologies: ['MNRF (Micro-Needling Radio Frequency)', 'Subcision needles', 'TCA CROSS', 'Fractional CO2 laser', 'Dermal fillers for scar volumization'],
    faqs: [
      {
        question: 'Can acne scars be completely removed?',
        answer: 'Complete removal is rarely possible, but 60–80% improvement is achievable with the right protocol. The goal is to bring scarred skin texture close to surrounding normal skin. Deep ice pick scars are the most resistant; rolling and boxcar scars respond best to combination treatment.',
      },
      {
        question: 'What is MNRF and how does it help acne scars?',
        answer: 'MNRF (Micro-Needling Radio Frequency) uses insulated micro-needles to deliver radiofrequency energy at precise depths in the dermis. This stimulates new collagen formation without damaging the skin surface — making it safe for Indian skin. It is particularly effective for boxcar and rolling scars.',
      },
    ],
    metaTitle: 'Acne Scar Treatment Hyderabad | MNRF, Subcision, Laser | Vernon Skin Clinic',
    metaDescription: 'Best acne scar treatment in Hyderabad. MNRF, subcision, TCA CROSS, fractional laser combination protocol by Dr. Brahmananda Reddy at Vernon Clinic. All scar types.',
  },
  {
    id: 'wart-mole-removal',
    name: 'Wart & Mole Removal',
    slug: 'wart-mole-removal',
    category: treatmentCategories[2],
    shortDescription:
      'Radiofrequency surgical excision of warts, moles, skin tags, DPN, and syringoma. Same-day procedure with minimal scarring.',
    heroDescription: `Warts, moles, skin tags, DPN (Dermatosis Papulosa Nigra), and syringomas are among the most common skin growths that patients seek removal for. While often benign, any mole that changes in size, shape, or color should be evaluated by a dermatologist to rule out melanoma before removal.

At Vernon, Dr. Brahmananda Reddy performs these excisions using radiofrequency (RF) surgery — a technique that uses high-frequency radio waves to cut and coagulate tissue simultaneously. RF surgery produces less thermal damage than electrocautery, resulting in faster healing and minimal scarring. For suspicious moles, tissue is sent for histopathological examination.

Dr. Reddy's surgical background (MS General Surgery) is a significant advantage here. While many dermatologists refer excisions to plastic surgeons, Vernon handles everything from simple skin tags to complex cyst removal under one roof.`,
    image: 'https://plus.unsplash.com/premium_photo-1711609635822-408cefc8ab51?w=800&q=80',
    duration: '15–30 minutes',
    sessions: '1 (most cases)',
    downtime: '1–3 days',
    suitableFor: [
      'Common warts and plantar warts',
      'Moles (dermal, compound, junctional)',
      'Skin tags (acrochordons)',
      'DPN (Dermatosis Papulosa Nigra)',
      'Syringoma',
      'Seborrheic keratoses',
      'Cysts and lipomas',
    ],
    contraindications: [
      'Active infection at the site',
      'Uncontrolled bleeding disorders',
      'Cardiac pacemaker (for RF surgery)',
    ],
    technologies: ['Radiofrequency surgery', 'Cryotherapy (liquid nitrogen)', 'Electrocautery', 'Surgical excision with histopathology'],
    faqs: [
      {
        question: 'Will mole removal leave a scar?',
        answer: 'RF surgery produces minimal scarring compared to traditional excision. Small moles typically heal with a faint mark that fades over weeks. Larger or deeper moles may leave a small scar. Dr. Reddy uses techniques optimized for minimal cosmetic impact.',
      },
    ],
    metaTitle: 'Wart & Mole Removal Hyderabad | RF Surgery | Same Day | Vernon Clinic',
    metaDescription: 'Same-day wart, mole, and skin tag removal in Hyderabad. Radiofrequency surgery by surgeon Dr. Brahmananda Reddy at Vernon Skin Clinic. Minimal scarring.',
  },
  {
    id: 'vitiligo-surgery',
    name: 'Vitiligo Surgery',
    slug: 'vitiligo-surgery',
    category: treatmentCategories[2],
    shortDescription:
      'Melanocyte transfer surgery for stable vitiligo. Surgical repigmentation for patches resistant to medical treatment.',
    heroDescription: `Vitiligo surgery is indicated for patients with stable vitiligo (no new patches or expansion for at least 12 months) who have not responded adequately to medical treatment (topical steroids, calcineurin inhibitors, phototherapy).

The procedure involves harvesting melanocytes (pigment-producing cells) from a normally pigmented donor site and transplanting them to the depigmented patches. Dr. Brahmananda Reddy performs non-cultured epidermal cell suspension (NCES) technique, which allows treatment of larger areas from a relatively small donor site.

**The procedure:** A thin split-thickness skin graft is harvested from a hidden donor area (typically the thigh). This tissue is processed in an enzymatic solution (trypsin) to separate individual melanocytes and keratinocytes into a cell suspension. The recipient vitiligo patches are deepithelialized (surface skin removed by dermabrasion), and the cell suspension is applied and dressed. Over the following weeks, the transplanted melanocytes repopulate the depigmented skin.

This is a surgical procedure that requires experience in tissue handling and graft processing — Dr. Reddy's background in General Surgery is directly relevant here.`,
    image: 'https://plus.unsplash.com/premium_photo-1711611162438-19459863ae91?w=800&q=80',
    duration: '2–4 hours',
    sessions: '1 (may need touch-up for large areas)',
    downtime: '7–14 days (dressing period)',
    suitableFor: [
      'Stable vitiligo (no activity for 12+ months)',
      'Segmental vitiligo',
      'Focal vitiligo resistant to medical treatment',
      'Lip and genital vitiligo (select cases)',
      'Piebaldism',
    ],
    contraindications: [
      'Active/unstable vitiligo (new patches in last 12 months)',
      'Koebner phenomenon positive',
      'Keloidal tendency',
      'Pregnancy',
      'Unrealistic expectations (repigmentation is gradual)',
    ],
    technologies: ['Non-Cultured Epidermal Cell Suspension (NCES)', 'Suction blister grafting', 'Punch grafting', 'Narrow-band UVB (adjunct)'],
    faqs: [
      {
        question: 'What percentage of repigmentation can I expect?',
        answer: 'NCES technique typically achieves 60–90% repigmentation in appropriately selected patients (stable vitiligo). Results appear gradually over 3–6 months as transplanted melanocytes multiply and produce pigment. Color match improves with time and UV exposure.',
      },
      {
        question: 'Is vitiligo surgery painful?',
        answer: 'The procedure is performed under local anesthesia, so you will not feel pain during surgery. Post-operative discomfort is mild and managed with standard analgesics. The dressing period (7–14 days) requires care to protect the graft.',
      },
    ],
    metaTitle: 'Vitiligo Surgery Hyderabad | Melanocyte Transfer | Repigmentation | Vernon Clinic',
    metaDescription: 'Vitiligo surgery in Hyderabad. Non-cultured melanocyte transfer (NCES) for stable vitiligo by surgeon Dr. Brahmananda Reddy. 60-90% repigmentation at Vernon Clinic.',
  },
  {
    id: 'pediatric-dermatology',
    name: 'Pediatric Dermatology',
    slug: 'pediatric-dermatology',
    category: treatmentCategories[2],
    shortDescription:
      'Specialized skin care for children: eczema, birthmarks, fungal infections, and childhood skin conditions.',
    heroDescription: `Children's skin requires a different approach than adult dermatology. Pediatric skin is thinner, more permeable, and more reactive to topical medications. Dosing, formulation choices, and treatment duration all differ from adult protocols.

At Vernon, Dr. Brahmananda Reddy provides evidence-based pediatric dermatology for conditions including atopic dermatitis (eczema), viral infections (molluscum, warts), fungal infections (tinea), birthmarks (hemangiomas, port wine stains), and genetic skin conditions. The approach emphasizes parental education, gentle treatment protocols, and age-appropriate formulations.`,
    image: 'https://images.unsplash.com/photo-1723924944532-5ac6f84c8f28?w=800&q=80',
    duration: '20–30 minutes (consultation)',
    sessions: 'Varies by condition',
    downtime: 'N/A',
    suitableFor: [
      'Atopic dermatitis (childhood eczema)',
      'Diaper dermatitis',
      'Molluscum contagiosum',
      'Childhood warts',
      'Tinea (fungal infections)',
      'Hemangiomas and birthmarks',
      'Childhood psoriasis',
      'Acne in adolescents',
    ],
    contraindications: [],
    technologies: ['Gentle topical protocols', 'Narrow-band UVB (select cases)', 'Pulsed dye laser (hemangiomas)'],
    faqs: [
      {
        question: 'At what age can a child see a dermatologist?',
        answer: 'There is no minimum age. Newborns can present with conditions that require dermatological assessment, including birthmarks, cradle cap, and neonatal rashes. Dr. Reddy sees patients of all ages.',
      },
    ],
    metaTitle: 'Pediatric Dermatologist Hyderabad | Children Skin Doctor | Vernon Clinic',
    metaDescription: 'Best pediatric dermatologist in Hyderabad. Eczema, birthmarks, fungal infections, childhood skin conditions. Gentle treatment at Vernon Skin and Hair Clinic.',
  },

  // ===== AESTHETICS & ANTI-AGING =====
  {
    id: 'botox-fillers',
    name: 'Botox & Dermal Fillers',
    slug: 'botox-fillers',
    category: treatmentCategories[3],
    shortDescription:
      'Physician-administered Botox and hyaluronic acid fillers by Dr. Reddy — an official Menarini filler trainer.',
    heroDescription: `Injectable aesthetics — Botox and dermal fillers — are among the most commonly performed cosmetic procedures worldwide. They are also among the most operator-dependent: results depend entirely on the injector's understanding of facial anatomy, product rheology, and aesthetic proportions.

Dr. Brahmananda Reddy is an official trainer for Menarini dermal fillers, regularly teaching injection techniques to physicians across Southeast Asia. This "trainer's eye" translates directly into patient outcomes — when your injector teaches other doctors how to inject, you are receiving the highest standard of care available.

**Botox (Botulinum Toxin Type A):** Temporarily relaxes specific facial muscles that create dynamic wrinkles. The molecule blocks acetylcholine release at the neuromuscular junction, causing temporary muscle relaxation. Onset begins within 24–48 hours, with full effect at 2 weeks. Duration: 3–6 months. The goal is natural expression, not a frozen face. Dr. Reddy uses micro-dosing techniques that preserve movement while softening lines.

**Treatment areas and typical dosing:** Forehead lines (15–30 units), frown lines or "11s" between the brows (15–25 units), crow's feet (10–20 units per side), bunny lines on the nose (5–10 units per side), lip flip (4–10 units), chin dimpling (2–6 units), neck bands (25–50 units), and masseter/jawline slimming (15–50 units per side). A full upper face treatment typically uses 40–70 units total. Dosing is always customized — these ranges are guidelines, not prescriptions.

**Dermal Fillers (Hyaluronic Acid):** Restore lost volume, define contours, and correct deep folds. Vernon uses premium HA filler families including the **Juvederm range** (Voluma for cheeks and midface volume, Volbella for under-eyes and lips, Vollure for nasolabial folds, Volux for jawline sculpting) and the **Restylane range** (Lyft for cheeks and hands, Kysse for lips, Defyne for deep folds, Contour for cheeks). Each product has different viscosity, elasticity, and cohesivity — Dr. Reddy selects the specific product based on the facial zone and desired outcome.

**Key difference between filler families:** Juvederm uses Vycross cross-linking technology, producing a smooth gel that integrates seamlessly into tissue — ideal for areas requiring natural movement like lips. Restylane uses NASHA and OBT technology, producing a more particulate gel that provides structured support — excellent for lifting and contouring. Both are fully reversible with hyaluronidase enzyme, a critical safety feature.

**Treatment areas for fillers:** Lips (augmentation and definition), cheeks (volume restoration and midface lift), nasolabial folds, marionette lines, under-eye hollows (tear trough), jawline (sculpting and definition), chin (augmentation), temples (volume loss), nose (non-surgical rhinoplasty), and ear lobes. Fillers last 6–18 months depending on the product, facial area, and individual metabolism.

**The Vernon approach:** Dr. Reddy performs all injections personally — there is no delegation to nurses or junior staff. Every procedure begins with a facial analysis that considers bone structure, fat pad distribution, skin quality, and the patient's aesthetic goals. The goal is always natural-looking rejuvenation — "you, but refreshed."`,
    image: 'https://plus.unsplash.com/premium_photo-1745164066754-214bfa2ca31c?w=800&q=80',
    duration: '15–45 minutes',
    sessions: 'Botox: every 4–6 months | Fillers: every 12–18 months',
    downtime: 'Minimal — mild swelling/bruising for 24–48 hours',
    suitableFor: [
      'Forehead lines and frown lines (Botox)',
      'Crow\'s feet (Botox)',
      'Nasolabial folds / marionette lines (Fillers)',
      'Cheek volume loss (Fillers)',
      'Lip augmentation (Fillers)',
      'Under-eye hollows / tear trough (Fillers)',
      'Jawline contouring (Fillers)',
      'Non-surgical rhinoplasty (Fillers)',
      'Excessive sweating / hyperhidrosis (Botox)',
    ],
    contraindications: [
      'Pregnancy or breastfeeding',
      'Neuromuscular disorders (Botox)',
      'Active skin infection at injection site',
      'Allergy to hyaluronic acid or botulinum toxin',
      'Autoimmune conditions (relative)',
    ],
    technologies: ['US-FDA approved Botulinum Toxin Type A', 'Hyaluronic acid fillers (Menarini)', 'Micro-cannula technique', 'Ultrasound guidance (select cases)'],
    faqs: [
      {
        question: 'Will I look frozen or unnatural after Botox?',
        answer: 'Not with Dr. Reddy\'s technique. He uses precise micro-doses that soften wrinkles while preserving natural facial expression. The "frozen" look results from over-treatment or poor injection placement — not from Botox itself.',
      },
      {
        question: 'Are fillers safe? Can they be reversed?',
        answer: 'Hyaluronic acid fillers are one of the safest injectable materials because they are fully reversible. If you are unhappy with the result or experience a complication, the filler can be dissolved instantly with hyaluronidase enzyme. This safety feature is why Dr. Reddy uses only HA-based fillers.',
      },
      {
        question: 'How long do fillers last?',
        answer: 'Depending on the product, facial area, and individual metabolism, fillers last 12–18 months. Lip fillers tend to last 8–12 months due to the high mobility of the area. Cheek and jawline fillers may last up to 18 months.',
      },
    ],
    metaTitle: 'Botox & Fillers Hyderabad | Official Filler Trainer Dr. Reddy | Vernon Clinic',
    metaDescription: 'Botox and dermal fillers by official Menarini trainer Dr. Brahmananda Reddy. Natural results, physician-administered. Best injectable aesthetics in Hyderabad at Vernon Clinic.',
  },
  {
    id: 'medi-facials',
    name: 'Medi-Facials & HydraFacial',
    slug: 'medi-facials',
    category: treatmentCategories[3],
    shortDescription:
      'Clinical-grade facials: HydraFacial, chemical peels, and medical-grade skincare protocols. Not spa treatments.',
    heroDescription: `Medi-facials bridge the gap between salon facials and clinical treatments. Unlike spa facials that focus on relaxation, medi-facials use medical-grade active ingredients and clinical-grade devices to produce measurable skin improvement.

**HydraFacial:** A patented vortex-fusion technology that simultaneously cleanses, exfoliates, extracts, and infuses the skin with condition-specific serums. The device uses a spiral tip that creates a vacuum effect, dislodging impurities from pores while delivering hyaluronic acid, antioxidants, and peptides into the skin.

**Chemical Peels:** Vernon offers a range from superficial (glycolic, lactic acid) to medium-depth (TCA, Jessner's) peels. Peel selection is based on skin type, condition severity, and downtime tolerance. Dr. Reddy personally selects and monitors medium-depth peels for Indian skin.

**Dermapen / Microneedling:** Controlled micro-injuries stimulate collagen production and enhance penetration of topical actives by up to 90%. Used for skin rejuvenation, fine lines, and mild scarring.`,
    image: 'https://plus.unsplash.com/premium_photo-1661368616947-cafb481baaca?w=800&q=80',
    duration: '30–60 minutes',
    sessions: 'Monthly maintenance recommended',
    downtime: 'None (HydraFacial) to 3–5 days (medium peels)',
    suitableFor: [
      'Dull, dehydrated skin',
      'Fine lines and early aging',
      'Oily skin and blackheads',
      'Mild hyperpigmentation',
      'Pre-event skin prep',
      'Maintenance between clinical treatments',
    ],
    contraindications: [
      'Active rosacea or eczema (some peels)',
      'Recent isotretinoin use (peels)',
      'Open wounds',
    ],
    technologies: ['HydraFacial MD', 'Glycolic/TCA/Jessner chemical peels', 'Dermapen microneedling', 'LED light therapy'],
    faqs: [
      {
        question: 'What is the difference between a medi-facial and a salon facial?',
        answer: 'Salon facials use cosmetic-grade products and focus on relaxation. Medi-facials use medical-grade active ingredients (glycolic acid, retinoids, clinical-grade serums) and clinical devices (HydraFacial, LED, microneedling) under physician supervision. The results are measurable and cumulative.',
      },
    ],
    metaTitle: 'HydraFacial & Medi-Facials Hyderabad | Medical-Grade Skincare | Vernon Clinic',
    metaDescription: 'HydraFacial and medical-grade facials in Hyderabad. Clinical skincare protocols — not spa treatments. Chemical peels, microneedling at Vernon Skin and Hair Clinic.',
  },
  {
    id: 'thread-lifts',
    name: 'Thread Lifts',
    slug: 'thread-lifts',
    category: treatmentCategories[3],
    shortDescription:
      'PDO thread lifts for non-surgical face and neck lifting. Immediate lift with progressive collagen stimulation.',
    heroDescription: `Thread lifts offer a non-surgical alternative to facelift surgery for patients experiencing mild to moderate skin laxity. The procedure involves inserting absorbable threads under the skin using fine needles, which provide immediate mechanical lifting while stimulating long-term collagen production around the thread scaffold.

**Thread materials matter:** Not all threads are equal. The three main materials used in modern thread lifts have different collagen-stimulating capacities and longevity:

**PDO (Polydioxanone):** The most established material. Dissolves in 6–8 months, with moderate collagen stimulation maintaining results for 9–12 months. PDO is the workhorse for most thread lift procedures.

**PLLA (Poly-L-Lactic Acid):** A newer option with significantly higher collagen stimulation than PDO. Dissolves in 12–18 months, with results lasting 12–24 months. The same material used in Sculptra dermal filler, known for its powerful collagen-building properties.

**PCL (Polycaprolactone):** The newest and longest-lasting material. Dissolves in 18–24 months, with the highest collagen stimulation of all three materials. Results can last 2+ years. Ideal for patients wanting maximum longevity.

**Thread types:** Mono threads (smooth) create a collagen-stimulating mesh for skin tightening. Screw/tornado threads (intertwined) restore volume. Cog threads (barbed) have bidirectional barbs that physically hook under tissue, providing the strongest mechanical lift — these are used for jowls, midface, and neck.

Thread lifts are particularly effective for mid-face lifting, jowl reduction, neck lifting, jawline definition, and brow elevation. Dr. Reddy's surgical training ensures precise thread placement along anatomically safe vectors, avoiding vital structures while maximizing the lifting effect.`,
    image: 'https://plus.unsplash.com/premium_photo-1661375154787-bc106ab48e08?w=800&q=80',
    duration: '45–60 minutes',
    sessions: '1 (repeat at 12–18 months if desired)',
    downtime: '3–5 days (mild swelling)',
    suitableFor: [
      'Mild to moderate facial sagging',
      'Jowl formation',
      'Nasolabial fold deepening',
      'Neck laxity',
      'Brow drooping',
      'Patients wanting non-surgical lift',
    ],
    contraindications: [
      'Severe skin laxity (surgical facelift indicated)',
      'Active infection',
      'Autoimmune conditions',
      'Blood thinning medications',
      'Pregnancy',
    ],
    technologies: ['PDO (Polydioxanone) threads', 'PLLA (Poly-L-Lactic Acid) threads', 'PCL (Polycaprolactone) threads', 'Barbed/cog threads for lifting', 'Mono smooth threads for collagen stimulation'],
    faqs: [
      {
        question: 'How long do thread lift results last?',
        answer: 'The threads dissolve in 6–8 months, but the collagen stimulation they trigger maintains results for 12–18 months. Many patients opt for repeat treatments at yearly intervals to sustain the effect.',
      },
      {
        question: 'Thread lift vs. surgical facelift — which is better?',
        answer: 'Thread lifts are ideal for mild to moderate laxity in patients who want improvement without surgery. For significant sagging, a surgical facelift provides more dramatic and longer-lasting results. Dr. Reddy will honestly assess which option is appropriate for your degree of aging.',
      },
    ],
    metaTitle: 'Thread Lift Hyderabad | Non-Surgical Face Lift PDO Threads | Vernon Clinic',
    metaDescription: 'PDO thread lift in Hyderabad for non-surgical face and neck lifting. Immediate lift with collagen stimulation. Surgeon-administered at Vernon Skin and Hair Clinic.',
  },
]

// Import additional treatments from old site crawl
import { additionalTreatments } from './additional-treatments'

// Combine all treatments
export const allTreatments = [...treatments, ...additionalTreatments]

export const getTreatment = (slug: string): Treatment | undefined => {
  return allTreatments.find((t) => t.slug === slug)
}

export const getTreatmentsByCategory = (categorySlug: string): Treatment[] => {
  return allTreatments.filter((t) => t.category.slug === categorySlug)
}
