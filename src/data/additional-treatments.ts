import { Treatment } from '@/types'
import { treatmentCategories } from './categories'

// Additional treatments discovered from the old site crawl
// These are appended to the main treatments array

export const additionalTreatments: Treatment[] = [
  // ===== HAIR RESTORATION - ADDITIONAL =====
  {
    id: 'dhi-hair-transplant',
    name: 'DHI Hair Transplant',
    slug: 'dhi-hair-transplant',
    category: treatmentCategories[0],
    shortDescription:
      'Direct Hair Implantation using Choi implanter pens for maximum density without pre-made channels. Up to 97% graft survival rate.',
    heroDescription: `DHI (Direct Hair Implantation) is an advanced refinement of FUE hair transplant technique. The key difference lies in the implantation phase: instead of creating recipient channels first and then placing grafts (as in traditional FUE), DHI uses a specialized Choi implanter pen that simultaneously creates the channel and places the graft in a single motion.

**How the Choi Pen works:** The device is a hollow needle loaded with a single follicular unit. When pressed against the scalp, it punctures the skin to the exact required depth and deposits the graft — all in one controlled action. This eliminates the "out of body" time for grafts, as they move directly from the donor area to the pen to the recipient site.

**Advantages of DHI:**

**1. Higher density implantation:** Because no pre-made channels are needed, grafts can be placed closer together. This is particularly valuable for the hairline zone where maximum density is needed for a natural appearance.

**2. Reduced graft handling:** Each graft is touched fewer times, reducing mechanical damage. This contributes to DHI's reported graft survival rates of up to 97%.

**3. No channel creation phase:** Traditional FUE requires creating hundreds of tiny incisions before implanting grafts. DHI eliminates this step, reducing overall procedure time and bleeding.

**4. Better angle and direction control:** The Choi pen gives the surgeon precise control over implantation angle and depth with each individual graft.

**When Dr. Reddy recommends DHI vs. FUE:** DHI excels for hairline work, smaller sessions, and areas requiring maximum density. For large sessions (3000+ grafts), traditional FUE may be more efficient. Dr. Reddy often combines techniques — using DHI for the hairline and frontal zone, and FUE for the crown, creating an optimized hybrid approach.`,
    image: 'https://images.unsplash.com/photo-1676155081561-865fab11da37?w=800&q=80',
    duration: '5–8 hours',
    sessions: '1',
    downtime: '5–7 days',
    suitableFor: [
      'Patients wanting maximum hairline density',
      'Early-stage hair loss (hairline refinement)',
      'Smaller graft sessions (under 2500 grafts)',
      'Patients seeking minimal scarring',
      'Beard and eyebrow transplants',
    ],
    contraindications: [
      'Very large graft requirements (may need FUE combination)',
      'Active scalp conditions',
      'Insufficient donor area',
    ],
    technologies: ['Choi Implanter Pen', 'Micro-extraction punches (0.6–0.9mm)', 'Hypothermosol graft preservation'],
    faqs: [
      {
        question: 'Is DHI better than FUE for hair transplant?',
        answer: 'DHI is not "better" or "worse" — it is a different technique suited to different situations. DHI excels at high-density implantation in smaller areas like the hairline. FUE is more efficient for large sessions. At Vernon, Dr. Reddy often combines both techniques in a single procedure for optimal results.',
      },
      {
        question: 'What is the success rate of DHI hair transplant?',
        answer: 'DHI has a reported graft survival rate of up to 97%, slightly higher than traditional FUE, because grafts spend less time outside the body and undergo less mechanical handling. However, the surgeon\'s skill remains the most important factor in any hair transplant outcome.',
      },
    ],
    metaTitle: 'DHI Hair Transplant Hyderabad | Choi Pen Technique | Vernon Skin Clinic',
    metaDescription: 'Advanced DHI hair transplant in Hyderabad using Choi implanter pen. Up to 97% graft survival. Maximum density hairline restoration by Dr. Brahmananda Reddy at Vernon Clinic.',
  },
  {
    id: 'body-hair-transplant',
    name: 'Body Hair Transplant (BHT)',
    slug: 'body-hair-transplant',
    category: treatmentCategories[0],
    shortDescription:
      'Using chest, beard, or body hair as donor when scalp donor area is insufficient. Ideal for repair cases and advanced hair loss.',
    heroDescription: `Body Hair Transplant (BHT) is an advanced technique that uses hair from non-scalp donor areas — chest, beard, arms, or legs — to supplement or replace scalp donor hair. This technique is primarily indicated when the traditional scalp donor area (the permanent zone at the back and sides of the head) is depleted or insufficient for the degree of coverage needed.

**When BHT is necessary:**

**1. Previous over-harvested transplants:** Patients who have had multiple surgeries with excessive extraction from the scalp donor area.

**2. Advanced Norwood stages (VI–VII):** Where the baldness area is so large that scalp donor alone cannot provide adequate coverage.

**3. Scar camouflage:** Using body hair to fill in visible scars from previous surgeries.

**Body hair characteristics differ from scalp hair** — body hair has a different growth cycle (shorter anagen phase), different texture, and different caliber. Dr. Reddy uses BHT hair strategically: chest and beard hair (which are closest in caliber to scalp hair) are placed in areas where density matters, while finer body hair can be used for filling and blending.

**The combined approach at Vernon:** Dr. Reddy often uses FUE + FUT + BHT in a single "mega-session" to maximize the total graft yield. This triple combination is one of the most technically demanding procedures in hair restoration — it requires a surgeon who can manage multiple donor sites, different hair types, and large graft volumes simultaneously.`,
    image: 'https://images.unsplash.com/photo-1618382521251-25bf46b85861?w=800&q=80',
    duration: '6–10 hours',
    sessions: '1–2',
    downtime: '7–14 days',
    suitableFor: [
      'Depleted scalp donor area from previous surgeries',
      'Advanced hair loss (Norwood VI–VII)',
      'Scar camouflage',
      'Patients needing maximum graft yield',
    ],
    contraindications: [
      'Insufficient body hair',
      'Fine body hair that won\'t match scalp coverage needs',
      'Active skin conditions on donor body areas',
    ],
    technologies: ['Body FUE extraction', 'Micro-punch 0.8–1.0mm', 'Multi-donor site management'],
    faqs: [
      {
        question: 'Will body hair look natural on my scalp?',
        answer: 'Body hair has different characteristics than scalp hair — it is often finer and has a shorter growth cycle. Dr. Reddy places body hair strategically to blend with existing scalp hair, typically using it for density supplementation rather than hairline work. Beard hair gives the best cosmetic result among body hair donors.',
      },
    ],
    metaTitle: 'Body Hair Transplant Hyderabad | BHT for Advanced Hair Loss | Vernon Clinic',
    metaDescription: 'Body Hair Transplant (BHT) in Hyderabad for patients with depleted scalp donor area. Chest, beard, body hair used for maximum coverage. Advanced technique at Vernon Clinic.',
  },
  {
    id: 'women-hair-transplant',
    name: 'Women Hair Transplant',
    slug: 'women-hair-transplant',
    category: treatmentCategories[0],
    shortDescription:
      'Specialized hair restoration for women — addressing female pattern hair loss, traction alopecia, and post-pregnancy hair loss.',
    heroDescription: `Female hair loss presents fundamentally different challenges than male pattern baldness. Women typically experience diffuse thinning rather than defined bald patches, the hairline usually remains intact, and the donor area may be affected by the thinning process — making traditional transplant approaches potentially unsuitable.

**Types of female hair loss treated at Vernon:**

**1. Female Pattern Hair Loss (FPHL / Ludwig Scale):** Widening of the central part, thinning across the crown while the frontal hairline is preserved. This is the most common type and may be suitable for transplant if the donor area is stable.

**2. Traction Alopecia:** Hair loss caused by years of tight hairstyles (braids, ponytails, extensions). The hairline and temple areas are most affected. Transplant can restore these areas once the traction source is eliminated.

**3. Post-Surgical / Scar-Related Loss:** Hair loss around facelift scars, brow lift scars, or other surgical sites.

**4. Frontal Fibrosing Alopecia (FFA):** An autoimmune condition causing progressive recession of the frontal hairline in women. Transplant may be considered once the condition is stable.

**The critical screening step:** Not all women with hair loss are transplant candidates. Dr. Reddy performs detailed evaluation including:
- Trichoscopy (dermoscopic hair and scalp analysis)
- Blood work (thyroid, iron, ferritin, hormones, vitamin D)
- Donor area density assessment
- Ludwig scale classification

Women with unstable or diffuse donor area thinning may be better served by medical management (minoxidil, PRP/GFC, nutritional optimization) rather than surgical intervention.`,
    image: 'https://plus.unsplash.com/premium_photo-1755175271085-fc65f05e37db?w=800&q=80',
    duration: '4–7 hours',
    sessions: '1',
    downtime: '7–10 days',
    suitableFor: [
      'Female pattern hair loss (Ludwig I–II)',
      'Traction alopecia',
      'Post-surgical hair loss (facelift scars)',
      'Stable frontal fibrosing alopecia',
      'Widening part line',
    ],
    contraindications: [
      'Diffuse thinning affecting donor area',
      'Active autoimmune hair loss',
      'Iron deficiency or thyroid disorders (must treat first)',
      'Unrealistic expectations',
    ],
    technologies: ['FUE with micro-punches', 'DHI for hairline refinement', 'No-shave FUE (select cases)'],
    faqs: [
      {
        question: 'Do women need to shave their head for hair transplant?',
        answer: 'Not necessarily. Dr. Reddy offers "no-shave" or "partial-shave" FUE for women, where only small sections of the donor area are trimmed (hidden by surrounding hair). This allows women to return to their normal appearance much faster.',
      },
      {
        question: 'Can minoxidil or PRP work instead of transplant for women?',
        answer: 'For many women, yes. Minoxidil (2% for women), PRP/GFC therapy, and nutritional optimization can significantly improve hair density without surgery. Dr. Reddy always explores non-surgical options first and recommends transplant only when medical management is insufficient or inappropriate for the type of hair loss.',
      },
    ],
    metaTitle: 'Women Hair Transplant Hyderabad | Female Hair Loss Treatment | Vernon Clinic',
    metaDescription: 'Specialized hair transplant for women in Hyderabad. Female pattern hair loss, traction alopecia treatment. No-shave FUE available. Dr. Brahmananda Reddy at Vernon Clinic.',
  },
  {
    id: 'mesotherapy-hair',
    name: 'Mesotherapy for Hair',
    slug: 'mesotherapy-hair',
    category: treatmentCategories[0],
    shortDescription:
      'Micro-injection of vitamins, minerals, and growth factors directly into the scalp to strengthen existing hair and reduce hair fall.',
    heroDescription: `Hair mesotherapy involves injecting a customized cocktail of vitamins (biotin, B-complex), minerals (zinc, iron), amino acids, and growth factors directly into the mesoderm (middle layer) of the scalp using ultra-fine needles.

**How it works:** The micro-injections deliver nutrients directly to the hair follicle level, bypassing the gastrointestinal tract where oral supplements may be poorly absorbed. This targeted delivery ensures that the follicle receives the exact micronutrients it needs for optimal growth.

**The Vernon mesotherapy protocol:** Each session lasts 20–30 minutes. A series of superficial injections is administered across the areas of thinning using a mesotherapy gun for consistent depth and dosing. The procedure is mildly uncomfortable but does not require anesthesia.

**Frequency:** Initial phase — 1 session per week for 4–6 weeks. Maintenance — 1 session per month. Most patients notice reduced hair fall within 4–6 sessions and visible improvement in hair texture and thickness by 3 months.

Mesotherapy works best as part of a comprehensive hair loss management plan that may include minoxidil, finasteride (for men), nutritional optimization, and PRP/GFC therapy.`,
    image: 'https://plus.unsplash.com/premium_photo-1661295617603-44c4f9dfd00f?w=800&q=80',
    duration: '20–30 minutes',
    sessions: '8–12 sessions (weekly then monthly)',
    downtime: 'None',
    suitableFor: [
      'Early-stage hair thinning',
      'Nutritional hair loss',
      'Post-pregnancy hair fall',
      'Complementary treatment to PRP/GFC',
      'Hair quality improvement',
    ],
    contraindications: [
      'Pregnancy',
      'Blood clotting disorders',
      'Active scalp infections',
      'Allergy to mesotherapy components',
    ],
    technologies: ['Mesotherapy gun', 'Customized nutrient cocktails', 'Ultra-fine 32G needles'],
    faqs: [
      {
        question: 'Is mesotherapy the same as PRP?',
        answer: 'No. PRP uses your own blood\'s concentrated platelets. Mesotherapy uses externally sourced vitamins, minerals, and growth factors. Both deliver nutrients directly to the scalp via injection, but through different active ingredients. They can be used together for complementary benefits.',
      },
    ],
    metaTitle: 'Hair Mesotherapy Hyderabad | Vitamin Injection for Hair Growth | Vernon Clinic',
    metaDescription: 'Hair mesotherapy treatment in Hyderabad. Direct scalp injection of vitamins, minerals, and growth factors to reduce hair fall and strengthen hair. Vernon Skin and Hair Clinic.',
  },

  // ===== LASER & PICO - ADDITIONAL =====
  {
    id: 'q-switched-laser',
    name: 'Q-Switched Laser Treatment',
    slug: 'q-switched-laser',
    category: treatmentCategories[1],
    shortDescription:
      'Q-Switched Nd:YAG laser for pigmentation, skin discoloration, and toning. The established workhorse for dermatological laser treatments.',
    heroDescription: `The Q-Switched Nd:YAG laser has been the foundation of dermatological laser treatment for over two decades. Operating at 1064nm and 532nm wavelengths with nanosecond pulse durations, it remains a versatile and effective tool for multiple skin conditions.

**How Q-Switch works:** The laser delivers high-energy pulses in nanoseconds. These ultra-short bursts target melanin and other chromophores through selective photothermolysis — the laser energy is absorbed preferentially by pigmented targets, heating them rapidly enough to cause fragmentation without significant damage to surrounding tissue.

**Conditions treated:**

**Pigmentation disorders:** Lentigines (sun spots), freckles, cafe-au-lait macules, nevus of Ota, and post-inflammatory hyperpigmentation.

**Skin toning:** Low-fluence Q-Switch "toning" uses repeated passes at low energy settings to gradually lighten skin and reduce pore appearance. This is particularly popular as a lunch-time treatment.

**Tattoo removal:** Effective for dark (black, dark blue) tattoo inks at 1064nm. For multi-color tattoos, Pico laser is preferred as it handles resistant colors (green, red, yellow) more effectively.

**Carbon peel mode:** Combined with carbon lotion for the "Hollywood Peel" — instant brightening and pore tightening.

At Vernon, Q-Switch complements our Pico laser platform. Dr. Reddy selects between Q-Switch and Pico based on the specific condition, skin type, and treatment goals.`,
    image: 'https://plus.unsplash.com/premium_photo-1661573297404-d558c113a7d8?w=800&q=80',
    duration: '15–30 minutes',
    sessions: '4–8 sessions (2–4 weeks apart)',
    downtime: 'Minimal — mild redness for 24 hours',
    suitableFor: [
      'Pigmentation and dark spots',
      'Skin toning and brightening',
      'Freckles and sun damage',
      'Dark tattoo removal',
      'Carbon peel (Hollywood Peel)',
      'Nevus of Ota',
    ],
    contraindications: [
      'Active sun exposure',
      'Pregnancy',
      'Active skin infection',
      'Photosensitizing medications',
    ],
    technologies: ['Q-Switched Nd:YAG 1064nm', 'KTP 532nm', 'Carbon peel mode'],
    faqs: [
      {
        question: 'Should I choose Q-Switch or Pico laser?',
        answer: 'It depends on your condition. Pico is preferred for melasma, multi-color tattoos, and patients with very dark skin where thermal safety is paramount. Q-Switch is effective and more affordable for simple pigmentation, skin toning, and dark tattoo removal. Dr. Reddy will recommend the appropriate technology during your consultation.',
      },
    ],
    metaTitle: 'Q-Switched Laser Treatment Hyderabad | Pigmentation & Skin Toning | Vernon Clinic',
    metaDescription: 'Q-Switched Nd:YAG laser treatment in Hyderabad for pigmentation, dark spots, skin toning, and tattoo removal at Vernon Skin and Hair Clinic.',
  },

  // ===== AESTHETICS - ADDITIONAL =====
  {
    id: 'vampire-lift',
    name: 'Vampire Lift (PRP Facial)',
    slug: 'vampire-lift',
    category: treatmentCategories[3],
    shortDescription:
      'Combines PRP, microdermabrasion, and hyaluronic acid fillers for comprehensive facial rejuvenation using your body\'s own growth factors.',
    heroDescription: `The Vampire Lift is a multi-step facial rejuvenation procedure that combines three technologies:

**1. Microdermabrasion / Microneedling:** The skin surface is prepared by removing dead cells and creating micro-channels that enhance the penetration and effectiveness of the PRP that follows.

**2. PRP (Platelet-Rich Plasma) application:** Your own blood is drawn, centrifuged to concentrate platelets and growth factors, and then applied to the prepared skin. The growth factors penetrate through the micro-channels into the dermis, stimulating fibroblast activity and new collagen synthesis.

**3. Hyaluronic Acid Filler (optional):** Strategic volume restoration with HA filler in areas of significant volume loss (cheeks, nasolabial folds, under-eyes) completes the rejuvenation.

**Why "Vampire" Lift?** The name comes from the use of your own blood as the active rejuvenating agent. Despite the dramatic name, the procedure is gentle, uses your body's own healing mechanisms, and involves minimal downtime.

**Results timeline:** Immediate improvement from the microdermabrasion and hydration. Collagen remodeling from PRP begins at 2–4 weeks and progressively improves over 3–6 months. Filler results are immediate and last 12–18 months.`,
    image: 'https://plus.unsplash.com/premium_photo-1736765199034-5f3a00143107?w=800&q=80',
    duration: '60–90 minutes',
    sessions: '3–4 sessions (4–6 weeks apart)',
    downtime: '24–48 hours (mild redness)',
    suitableFor: [
      'Early signs of aging (fine lines, dull skin)',
      'Skin texture improvement',
      'Under-eye dark circles and hollows',
      'Overall facial rejuvenation',
      'Patients preferring natural/biological treatments',
    ],
    contraindications: [
      'Blood disorders',
      'Active skin infection',
      'Pregnancy',
      'Autoimmune conditions',
    ],
    technologies: ['PRP centrifugation', 'Microneedling/Dermapen', 'Hyaluronic acid fillers', 'Microdermabrasion'],
    faqs: [
      {
        question: 'Is the Vampire Lift painful?',
        answer: 'Topical numbing cream is applied before the procedure. Most patients describe the microneedling as mildly uncomfortable — like a scratching sensation. The PRP application is painless. If filler is included, it contains built-in lidocaine for comfort.',
      },
    ],
    metaTitle: 'Vampire Lift Hyderabad | PRP Facial Rejuvenation | Vernon Skin Clinic',
    metaDescription: 'Vampire Lift (PRP facial rejuvenation) in Hyderabad. Combines PRP, microneedling, and fillers for natural anti-aging. Dr. Brahmananda Reddy at Vernon Skin Clinic.',
  },
  {
    id: 'body-contouring',
    name: 'Body Contouring & Sculpting',
    slug: 'body-contouring',
    category: treatmentCategories[4],
    shortDescription:
      'Non-invasive body shaping using VelaShape and cryolipolysis technology. Fat reduction, skin tightening, and cellulite improvement.',
    heroDescription: `Vernon's body contouring program uses two US-FDA approved technologies for non-invasive fat reduction and skin tightening:

**VelaShape:** Combines infrared light, bipolar radiofrequency energy, and vacuum suction to heat fat cells, stimulate collagen production, and improve lymphatic drainage. The treatment reduces circumference, improves skin texture, and reduces the appearance of cellulite. Each session covers specific body zones — abdomen, flanks, thighs, or arms.

**Cryolipolysis (Fat Freezing):** Based on the principle that fat cells are more susceptible to cold damage than surrounding tissue. Controlled cooling crystallizes fat cells, which then undergo apoptosis (natural cell death) and are gradually eliminated by the body over 2–3 months. Each session can reduce fat in the treated area by 20–25%.

**Important medical context:** Body contouring is not a weight loss solution. These treatments are designed for people at or near their target weight who have localized fat deposits resistant to diet and exercise. Dr. Reddy evaluates each patient's BMI, fat distribution, and realistic expectations during consultation.

The program also includes laser treatments for stretch marks and scar reduction, providing comprehensive body aesthetics management.`,
    image: 'https://plus.unsplash.com/premium_photo-1682097032813-79ba61ff791f?w=800&q=80',
    duration: '45–60 minutes per zone',
    sessions: '4–6 sessions (VelaShape) / 1–2 sessions (Cryolipolysis)',
    downtime: 'None',
    suitableFor: [
      'Localized fat deposits (love handles, belly, thighs)',
      'Cellulite reduction',
      'Post-pregnancy body contouring',
      'Skin tightening after weight loss',
      'Arm and chin fat reduction',
      'Stretch mark and scar improvement',
    ],
    contraindications: [
      'Obesity (BMI > 30 — not a weight loss substitute)',
      'Pregnancy',
      'Hernia in treatment area',
      'Cryoglobulinemia (for fat freezing)',
      'Raynaud\'s disease (for fat freezing)',
    ],
    technologies: ['VelaShape III', 'Cryolipolysis (fat freezing)', 'Laser stretch mark treatment', 'Radiofrequency skin tightening'],
    faqs: [
      {
        question: 'How much fat can body contouring remove?',
        answer: 'Cryolipolysis reduces fat in the treated area by approximately 20–25% per session. VelaShape reduces circumference by 1–3 cm per treated zone. These are subtle, natural-looking improvements — not dramatic surgical results. For significant fat reduction, liposuction would be the appropriate recommendation.',
      },
      {
        question: 'Is body contouring a substitute for weight loss?',
        answer: 'No. Body contouring targets localized fat deposits that persist despite a healthy diet and exercise routine. It is designed for patients at or near their goal weight. Dr. Reddy will honestly assess whether body contouring or lifestyle modification is the appropriate path for you.',
      },
    ],
    metaTitle: 'Body Contouring Hyderabad | VelaShape, Fat Freezing | Vernon Skin Clinic',
    metaDescription: 'Non-invasive body contouring in Hyderabad. VelaShape, cryolipolysis fat freezing, stretch mark treatment at Vernon Skin and Hair Clinic. FDA-approved technology.',
  },
  {
    id: 'derma-peels',
    name: 'Derma Peels',
    slug: 'derma-peels',
    category: treatmentCategories[3],
    shortDescription:
      'Medical-grade chemical peels for pigmentation, acne, tan removal, and skin rejuvenation. From superficial glycolic to medium-depth TCA.',
    heroDescription: `Chemical peels are one of the oldest and most effective treatments in dermatology. They work by applying a controlled chemical solution to the skin that causes exfoliation of the damaged outer layers, revealing fresh, rejuvenated skin beneath.

**Types of peels at Vernon:**

**Superficial peels (Glycolic, Lactic, Mandelic acid — 20-50%):** Remove only the outermost layer (stratum corneum). Used for mild pigmentation, dullness, and as maintenance treatments. Zero downtime — you can return to work immediately.

**Medium peels (TCA 15-35%, Jessner's solution):** Penetrate to the papillary dermis. More effective for moderate pigmentation, acne scars, and sun damage. Requires 5–7 days of peeling/downtime.

**Combination peels:** Dr. Reddy uses customized combinations based on your skin type and concern. For Indian skin, specific protocols are followed to minimize the risk of post-inflammatory hyperpigmentation.

**The Vernon approach to peels:** Before any peel, Dr. Reddy assesses your Fitzpatrick skin type, current skin condition, and medication history. Indian skin (Fitzpatrick IV–VI) requires modified protocols — lower concentrations, shorter contact times, and mandatory pre-treatment with depigmenting agents to reduce PIH risk. We never use aggressive peels on unprepared Indian skin.

**Conditions treated:** Tan removal, melasma (adjunct), acne (active and scars), fine lines, age spots, uneven skin tone, and dull skin.`,
    image: 'https://images.unsplash.com/photo-1613223026022-afda5c1c95b8?w=800&q=80',
    duration: '20–30 minutes',
    sessions: '4–6 sessions (2–3 weeks apart)',
    downtime: '0 days (superficial) to 7 days (medium)',
    suitableFor: [
      'Skin tan and dullness',
      'Mild to moderate pigmentation',
      'Active acne (salicylic peel)',
      'Fine lines and early aging',
      'Uneven skin tone',
      'Pre-event skin brightening',
    ],
    contraindications: [
      'Active eczema or dermatitis',
      'Recent isotretinoin use (within 6 months for medium peels)',
      'Active herpes simplex',
      'Open wounds',
      'Pregnancy (some peels)',
    ],
    technologies: ['Glycolic acid peels (20–70%)', 'TCA peels (15–35%)', 'Salicylic acid peels', 'Jessner\'s solution', 'Lactic acid peels', 'Mandelic acid peels'],
    faqs: [
      {
        question: 'Are chemical peels safe for dark Indian skin?',
        answer: 'Yes, when performed correctly with appropriate skin preparation. Dr. Reddy uses modified protocols for Indian skin — lower concentrations, shorter contact times, and pre-treatment depigmenting agents. The risk of post-inflammatory hyperpigmentation exists but is manageable with proper technique and aftercare.',
      },
      {
        question: 'Which peel is best for tan removal?',
        answer: 'Glycolic acid peels (30–50%) are effective and gentle for tan removal. For stubborn tan, a course of 3–4 sessions with progressive concentration increase gives the best results. Always combine with daily sunscreen (SPF 50+) to prevent re-tanning.',
      },
    ],
    metaTitle: 'Chemical Peels Hyderabad | Derma Peels for Pigmentation & Tan | Vernon Clinic',
    metaDescription: 'Medical-grade chemical peels in Hyderabad. Glycolic, TCA, salicylic acid peels for pigmentation, acne, tan removal. Safe for Indian skin at Vernon Skin Clinic.',
  },

  // ===== AESTHETICS - HIFU & PROFHILO =====
  {
    id: 'hifu-skin-tightening',
    name: 'HIFU Skin Tightening',
    slug: 'hifu-skin-tightening',
    category: treatmentCategories[3],
    shortDescription:
      'High-Intensity Focused Ultrasound for non-surgical face lifting and skin tightening. Reaches the SMAS layer — the same layer addressed in surgical facelifts.',
    heroDescription: `HIFU (High-Intensity Focused Ultrasound) is the only non-invasive technology that can reach the SMAS (Superficial Muscular Aponeurotic System) layer — the same deep tissue layer that plastic surgeons manipulate during a surgical facelift. This makes HIFU the most powerful non-surgical lifting treatment available.

**How HIFU works:** The device delivers focused ultrasound energy to precise depths beneath the skin surface. Unlike lasers (which work from the surface down), HIFU bypasses the skin surface entirely and creates thermal coagulation points at three specific depths:

**1.5mm depth:** Targets the superficial dermis for fine line improvement and skin texture enhancement.

**3.0mm depth:** Targets the deep dermis and superficial subcutaneous layer, stimulating neocollagenesis (new collagen production) for progressive tightening over 2–3 months.

**4.5mm depth:** Reaches the SMAS layer — this is the breakthrough. By contracting the SMAS, HIFU produces a genuine lifting effect on sagging jowls, neck, and midface tissue. No other non-invasive technology reaches this depth.

**The collagen timeline:** HIFU creates immediate tissue contraction (visible tightening on the treatment day) followed by progressive neocollagenesis that continues for 3–6 months. Peak results are typically seen at 3 months post-treatment, with effects lasting 12–18 months.

**How Vernon's HIFU differs from spa-grade devices:** Medical-grade HIFU devices (US-FDA approved) deliver focused energy at calibrated depths with real-time visualization. Many spas and salons use cheaper, non-medical HIFU devices with inconsistent energy delivery and no visualization — these are less effective and potentially unsafe. At Vernon, Dr. Reddy uses only FDA-approved HIFU technology with proper depth calibration for each treatment zone.`,
    image: 'https://plus.unsplash.com/premium_photo-1661484665696-c40dae7f04fa?w=800&q=80',
    duration: '60–90 minutes',
    sessions: '1 session (repeat at 12–18 months)',
    downtime: 'None to minimal — mild redness and tenderness for a few hours',
    suitableFor: [
      'Mild to moderate facial sagging',
      'Jowl tightening',
      'Neck lifting and tightening',
      'Brow lifting',
      'Double chin reduction',
      'Overall skin tightening and firming',
      'Patients who want lifting without surgery',
    ],
    contraindications: [
      'Severe skin laxity (surgical facelift recommended)',
      'Active skin infection or inflammation',
      'Metal implants in treatment area',
      'Pregnancy',
      'Open wounds or cystic acne in treatment area',
    ],
    technologies: ['US-FDA approved HIFU device', '4.5mm SMAS-targeting transducer', '3.0mm dermal transducer', '1.5mm superficial transducer'],
    faqs: [
      {
        question: 'How is HIFU different from a thread lift or Botox?',
        answer: 'HIFU addresses skin laxity through deep tissue tightening — it physically contracts the SMAS layer and stimulates new collagen. Thread lifts use physical threads to mechanically lift sagging tissue. Botox relaxes muscles to smooth wrinkles but does not tighten or lift. Each addresses a different aspect of aging, and they can be combined.',
      },
      {
        question: 'Is HIFU painful?',
        answer: 'Most patients describe HIFU as uncomfortable but tolerable — a prickling or heating sensation during energy delivery, particularly along the jawline and forehead. We apply numbing cream before treatment and adjust energy levels based on your comfort. The discomfort lasts only during the procedure.',
      },
      {
        question: 'How many HIFU sessions do I need?',
        answer: 'Most patients achieve excellent results with a single session. The effects continue to improve for 3–6 months as new collagen forms. A maintenance session at 12–18 months helps sustain the lifting effect. Unlike some treatments, HIFU does not require monthly sessions.',
      },
    ],
    metaTitle: 'HIFU Skin Tightening Hyderabad | Non-Surgical Face Lift | Vernon Clinic',
    metaDescription: 'HIFU skin tightening in Hyderabad — the only non-surgical technology that reaches the SMAS facelift layer. FDA-approved at Vernon Skin and Hair Clinic.',
  },
  {
    id: 'profhilo-skin-booster',
    name: 'Profhilo Skin Booster',
    slug: 'profhilo-skin-booster',
    category: treatmentCategories[3],
    shortDescription:
      'Bio-remodeling injectable that spreads hyaluronic acid across the face for deep hydration, elastin stimulation, and skin quality improvement from within.',
    heroDescription: `Profhilo is not a filler. It is a bio-remodeling treatment that represents a completely different approach to skin aging. While fillers add volume to specific areas, Profhilo improves overall skin quality — hydration, elasticity, firmness, and radiance — by stimulating your skin's own regenerative processes.

**What makes Profhilo unique:**

**1. Highest HA concentration available (64mg/2ml):** Profhilo contains one of the highest concentrations of hyaluronic acid of any injectable product. But unlike fillers, it is not cross-linked to maintain shape — it is designed to flow and spread, distributing HA broadly across the treatment area.

**2. Bio-remodeling, not filling:** Profhilo works by stimulating four different types of collagen and elastin production. It activates adipocyte (fat cell) stem cells, counteracting the fat pad atrophy that causes the aged, hollow look. This is fundamentally different from fillers, which simply add physical volume.

**3. The BAP (Bio Aesthetic Points) technique:** Profhilo is injected at only 5 specific points on each side of the face (10 total injection points). From these points, the product spreads through the tissue layers, distributing hyaluronic acid across the entire face. This means fewer injection points, less discomfort, and more natural distribution than traditional treatments.

**What Profhilo treats:** Profhilo is indicated for skin that looks tired, dehydrated, crepe-like, or has lost its "bounce." It is particularly effective for the lower face, neck, hands, and decolletage — areas where skin quality deterioration is most visible but fillers would look unnatural.

**The protocol:** Two sessions, 4 weeks apart. Results begin within 1 week of the first session and continue to improve over 2–3 months. Maintenance every 6 months sustains the results. Most patients describe a visible "glow" and improved skin texture within the first week.

**Profhilo vs other skin boosters:** While products like Restylane Skinboosters and Juvederm Volite provide hydration, Profhilo's unique hybrid HA complex (high and low molecular weight chains) provides both immediate hydration AND long-term tissue remodeling. Clinical studies show measurable improvement in skin elasticity and firmness.`,
    image: 'https://plus.unsplash.com/premium_photo-1708271132106-788ca6856e60?w=800&q=80',
    duration: '15–20 minutes',
    sessions: '2 sessions (4 weeks apart), then maintenance every 6 months',
    downtime: 'Minimal — small bumps at injection sites resolve within hours',
    suitableFor: [
      'Skin laxity and loss of firmness',
      'Dehydrated, dull skin',
      'Fine lines and crepey texture',
      'Neck and decolletage aging',
      'Hand rejuvenation',
      'Patients wanting natural skin quality improvement',
      'Complement to Botox and fillers',
    ],
    contraindications: [
      'Pregnancy or breastfeeding',
      'Active skin infection at injection sites',
      'Autoimmune conditions (relative)',
      'Allergy to hyaluronic acid',
    ],
    technologies: ['Profhilo stabilized hybrid HA complex (H-HA + L-HA)', 'BAP injection technique (5 points per side)'],
    faqs: [
      {
        question: 'Is Profhilo the same as dermal filler?',
        answer: 'No. Fillers are cross-linked gels that add physical volume to specific areas (cheeks, lips, jawline). Profhilo is a non-cross-linked HA that spreads across the face to improve overall skin quality — hydration, elasticity, and firmness. Think of fillers as structural improvement and Profhilo as skin quality improvement. Many patients benefit from both.',
      },
      {
        question: 'When will I see results from Profhilo?',
        answer: 'Most patients notice improved hydration and a subtle glow within the first week. The bio-remodeling effects — improved firmness, elasticity, and skin texture — develop over 4–8 weeks after the second session. The full result is typically visible at 2 months.',
      },
      {
        question: 'Can Profhilo be combined with Botox and fillers?',
        answer: 'Absolutely — in fact, this is the optimal approach for comprehensive facial rejuvenation. Botox addresses dynamic wrinkles, fillers restore lost volume, and Profhilo improves the overall quality and texture of the skin itself. Dr. Reddy creates personalized combination protocols based on each patient\'s needs.',
      },
    ],
    metaTitle: 'Profhilo Skin Booster Hyderabad | Bio-Remodeling Treatment | Vernon Clinic',
    metaDescription: 'Profhilo bio-remodeling treatment in Hyderabad. Deep skin hydration, elastin stimulation, and firmness improvement. Not a filler — skin quality transformation at Vernon Clinic.',
  },

  // ===== BODY & WELLNESS =====
  {
    id: 'iv-drip-therapy',
    name: 'IV Drip Therapy',
    slug: 'iv-drip-therapy',
    category: treatmentCategories[4],
    shortDescription:
      'Intravenous vitamin, mineral, and antioxidant infusions for skin radiance, energy, immunity, and overall wellness. Physician-supervised.',
    heroDescription: `IV Drip Therapy delivers vitamins, minerals, antioxidants, and amino acids directly into the bloodstream, bypassing the digestive system for 100% bioavailability. Unlike oral supplements where absorption is limited to 10–30%, IV delivery ensures every molecule reaches your cells.

**Available IV formulations at Vernon:**

**Glutathione Drip (Skin Radiance):** The "master antioxidant" — glutathione inhibits tyrosinase enzyme activity, reducing melanin production. Regular sessions produce a gradual, natural skin brightening effect. Unlike topical glutathione (which has poor skin penetration), IV delivery achieves therapeutic blood levels.

**Vitamin C Mega-Dose:** High-dose ascorbic acid (10–25g) for collagen synthesis, immune support, and antioxidant protection. Particularly beneficial before and after aesthetic procedures to support healing and reduce post-inflammatory hyperpigmentation.

**Myers' Cocktail:** The classic IV wellness formula — magnesium, calcium, B-complex, and vitamin C. Addresses fatigue, stress, migraines, and general wellness.

**NAD+ Infusion:** Nicotinamide adenine dinucleotide — a coenzyme essential for cellular energy production and DNA repair. Emerging research shows NAD+ supplementation may support cellular aging, cognitive function, and metabolic health.

**Hair & Skin Nourishment Drip:** Biotin, zinc, selenium, iron, B12, and amino acids specifically formulated for hair growth and skin health. Ideal complement to PRP therapy and mesotherapy.

**Medical supervision:** All IV drips at Vernon are administered under physician supervision with proper pre-assessment. Dr. Asritha Reddy, with her anaesthesiology background, oversees IV protocols ensuring safe access, appropriate dosing, and monitoring for adverse reactions.`,
    image: 'https://plus.unsplash.com/premium_photo-1708371358266-e63985fd2a60?w=800&q=80',
    duration: '30–60 minutes',
    sessions: 'Weekly for 6–12 sessions, then monthly maintenance',
    downtime: 'None',
    suitableFor: [
      'Skin brightening and radiance',
      'Fatigue and low energy',
      'Pre/post-procedure recovery support',
      'Hair loss (nutritional support)',
      'Immune system support',
      'General wellness optimization',
      'Jet lag and dehydration',
    ],
    contraindications: [
      'Kidney disease',
      'Heart failure',
      'G6PD deficiency (for high-dose Vitamin C)',
      'Hemochromatosis (for iron-containing formulations)',
    ],
    technologies: ['Pharmaceutical-grade IV formulations', 'Physician-supervised administration', 'Pre-assessment blood work'],
    faqs: [
      {
        question: 'Does glutathione IV really lighten skin?',
        answer: 'Glutathione inhibits melanin synthesis by suppressing tyrosinase activity. With regular sessions (weekly for 8–12 weeks), most patients notice a gradual, natural brightening. The effect is subtle and cumulative — not a dramatic color change. Results are maintained with monthly sessions.',
      },
      {
        question: 'Are IV drips safe?',
        answer: 'When administered by qualified medical professionals with proper pre-assessment, IV drips are very safe. At Vernon, Dr. Asritha Reddy (MD Anaesthesia) supervises all IV protocols. We screen for contraindications and use pharmaceutical-grade formulations. Minor side effects (mild bruising, slight coolness during infusion) are rare.',
      },
    ],
    metaTitle: 'IV Drip Therapy Hyderabad | Glutathione, Vitamin C Drip | Vernon Clinic',
    metaDescription: 'IV drip therapy in Hyderabad — glutathione skin brightening, vitamin C, NAD+, and wellness infusions. Physician-supervised at Vernon Skin and Hair Clinic.',
  },
  {
    id: 'stretch-marks',
    name: 'Stretch Mark Treatment',
    slug: 'stretch-marks',
    category: treatmentCategories[4],
    shortDescription:
      'Multi-modal stretch mark reduction using MNRF microneedling, fractional laser, PRP, and derma peels. Effective for both new and old stretch marks.',
    heroDescription: `Stretch marks (striae) occur when the skin is stretched rapidly beyond its elastic capacity — during pregnancy, rapid weight gain/loss, growth spurts, or bodybuilding. The dermis tears, and the resulting scar tissue appears as depressed, discolored lines on the skin.

**Stretch mark types and what they mean:**

**Striae rubrae (red/purple):** New stretch marks with active inflammation. These are the most responsive to treatment because the blood supply is intact and collagen remodeling is actively occurring. Early intervention during this phase yields the best results.

**Striae albae (white/silver):** Mature stretch marks where the inflammation has resolved and the scar tissue has stabilized. These are more challenging to treat but can still be significantly improved.

**The Vernon multi-modal approach:**

**1. MNRF (Micro-Needling Radiofrequency):** The primary treatment. Insulated microneedles deliver RF energy into the dermis at the base of the stretch mark, triggering new collagen production that gradually fills in the depressed scar. The insulated tips protect the epidermis, making this safe for all skin types.

**2. Fractional CO2 Laser:** Creates microscopic columns of controlled injury that trigger wound healing and collagen remodeling. Particularly effective for striae albae where the collagen structure needs significant reconstruction.

**3. PRP (Platelet-Rich Plasma):** Applied immediately after MNRF or microneedling — the growth factors from your own blood penetrate through the micro-channels and accelerate the healing and collagen synthesis process.

**4. Chemical Peels:** TCA peels stimulate surface-level remodeling and improve the texture and color match of stretch mark skin with surrounding normal skin.

**Realistic expectations:** Complete elimination of stretch marks is rarely possible. With a full treatment course (6–10 sessions), most patients achieve 50–70% improvement in the appearance of stretch marks — reduced depth, improved color match, and smoother texture.`,
    image: 'https://plus.unsplash.com/premium_photo-1671717726071-dde99cd37682?w=800&q=80',
    duration: '30–45 minutes per session',
    sessions: '6–10 sessions (3–4 weeks apart)',
    downtime: '24–48 hours (mild redness)',
    suitableFor: [
      'Pregnancy stretch marks',
      'Weight fluctuation stretch marks',
      'Growth spurt stretch marks',
      'Bodybuilding/gym-related stretch marks',
      'Both new (red) and old (white) stretch marks',
    ],
    contraindications: [
      'Active pregnancy (treat after delivery)',
      'Active skin infection in treatment area',
      'Keloid tendency (relative)',
      'Recent isotretinoin use',
    ],
    technologies: ['MNRF microneedling', 'Fractional CO2 laser', 'PRP therapy', 'TCA chemical peels'],
    faqs: [
      {
        question: 'Can stretch marks be completely removed?',
        answer: 'Complete removal is rarely possible as stretch marks are a form of scar. However, with multi-modal treatment (MNRF + laser + PRP), most patients achieve 50–70% improvement — reduced depth, better color match, and smoother texture that makes them far less noticeable.',
      },
      {
        question: 'When is the best time to treat stretch marks?',
        answer: 'As early as possible. Red/purple stretch marks (striae rubrae) respond significantly better to treatment than white/silver ones (striae albae). If you notice new stretch marks forming, starting treatment early can prevent them from becoming permanent white scars.',
      },
    ],
    metaTitle: 'Stretch Mark Treatment Hyderabad | MNRF, Laser, PRP | Vernon Clinic',
    metaDescription: 'Advanced stretch mark treatment in Hyderabad using MNRF microneedling, fractional laser, and PRP. Effective for pregnancy, weight, and growth stretch marks at Vernon Clinic.',
  },
  {
    id: 'bridal-packages',
    name: 'Bridal Glow Packages',
    slug: 'bridal-packages',
    category: treatmentCategories[4],
    shortDescription:
      'Customized pre-wedding skin and hair programs starting 3–6 months before the wedding. Medical-grade treatments for lasting radiance, not just surface glow.',
    heroDescription: `Vernon's bridal program is not a spa package — it is a medically designed treatment protocol that starts months before the wedding to achieve genuine, lasting skin transformation rather than a one-day surface glow.

**Why start 3–6 months early:** Most effective dermatological treatments require multiple sessions with healing time between them. Collagen remodeling takes 4–8 weeks. Pigmentation correction requires 4–6 sessions. Starting early ensures you see results well before the wedding, with time to adjust if needed.

**The Vernon Bridal Protocol:**

**Phase 1 (6 months before): Foundation**
- Comprehensive skin analysis with Dr. Reddy
- Blood work for nutritional deficiencies affecting skin and hair
- Begin addressing primary concerns: acne control, pigmentation treatment, or hair quality improvement
- Start home skincare regimen with medical-grade products

**Phase 2 (3–4 months before): Active Treatment**
- Pico laser or chemical peels for pigmentation and even skin tone
- MNRF for acne scars or skin texture (if needed)
- PRP/GFC therapy for hair quality and volume
- Glutathione IV drips for skin radiance (weekly)

**Phase 3 (1–2 months before): Refinement**
- HydraFacial and medi-facial sessions for hydration and glow
- Botox for forehead lines, crow's feet (if desired — 2+ weeks before for natural settling)
- Profhilo for overall skin quality
- Final peel for brightness

**Phase 4 (1–2 weeks before): Final Glow**
- Gentle HydraFacial (no aggressive treatments close to the date)
- LED light therapy
- Final IV drip session

**What the package includes:** All treatments are customized based on your skin type, concerns, and wedding timeline. Dr. Reddy creates a personalized protocol during the initial consultation, and you receive a detailed month-by-month schedule.

**For the groom too:** Vernon's bridal packages include groom skin preparation — addressing acne, pigmentation, beard grooming, and overall skin health.`,
    image: 'https://plus.unsplash.com/premium_photo-1711301937399-d9e0b5643c66?w=800&q=80',
    duration: '30–90 minutes per session (varies by treatment)',
    sessions: '12–20 sessions over 3–6 months',
    downtime: 'Varies by treatment (scheduled with recovery time before the wedding)',
    suitableFor: [
      'Brides-to-be (3–6 months before wedding)',
      'Grooms seeking skin preparation',
      'Pigmentation and uneven skin tone',
      'Acne and acne scars',
      'Dull, dehydrated skin',
      'Hair thinning and quality',
      'Overall skin radiance',
    ],
    contraindications: [
      'Pregnancy (some treatments contraindicated)',
      'Active severe acne (must stabilize first)',
      'Unrealistic timeline (some results need months)',
    ],
    technologies: ['Pico Laser', 'HydraFacial', 'MNRF', 'PRP/GFC', 'Glutathione IV', 'Profhilo', 'LED therapy', 'Medical-grade peels'],
    faqs: [
      {
        question: 'How early should I start bridal treatments?',
        answer: 'Ideally 6 months before the wedding. This allows time for a full treatment course with healing between sessions. The minimum effective timeline is 3 months. Starting just weeks before the wedding limits you to surface-level treatments with temporary results.',
      },
      {
        question: 'Will my skin look natural on the wedding day?',
        answer: 'Yes — that is the entire point of starting early. By wedding day, all treatments have healed and settled into natural-looking results. There will be no redness, peeling, or "freshly treated" appearance. The glow is real, not cosmetic.',
      },
    ],
    metaTitle: 'Bridal Glow Packages Hyderabad | Pre-Wedding Skin & Hair | Vernon Clinic',
    metaDescription: 'Medical-grade bridal skin packages in Hyderabad starting 3–6 months before wedding. Laser, HydraFacial, PRP, glutathione drips for lasting bridal glow at Vernon Clinic.',
  },

  // ===== CLINICAL DERMATOLOGY - ADDITIONAL =====
  {
    id: 'cyst-lipoma-excision',
    name: 'Cyst & Lipoma Excision',
    slug: 'cyst-lipoma-excision',
    category: treatmentCategories[2],
    shortDescription:
      'Surgical removal of sebaceous cysts, epidermoid cysts, lipomas, and other subcutaneous lumps. Minimal-scar technique by trained surgeon.',
    heroDescription: `Cysts and lipomas are common benign lumps that develop under the skin. While they are not dangerous, they can be cosmetically bothersome, uncomfortable, or continue to grow if left untreated.

**Types of lumps treated at Vernon:**

**Sebaceous cysts:** Develop from blocked sebaceous glands. They contain a cheesy, foul-smelling material (keratin) and can become infected and painful. Complete removal requires excision of the entire cyst wall to prevent recurrence.

**Epidermoid cysts:** Similar to sebaceous cysts but originate from the epidermis. Often appear on the face, neck, and trunk. Surgical excision with complete capsule removal is the definitive treatment.

**Lipomas:** Benign fatty tumors that grow slowly under the skin. They are soft, mobile, and painless. While they don't require removal for medical reasons, many patients choose excision for cosmetic reasons or discomfort.

**Dermoid cysts:** Congenital cysts that may contain hair, skin, and other tissue. Often found near the eyebrow or midline. Surgical excision is recommended.

**Dr. Reddy's surgical approach:** With an MS in General Surgery and additional training in Minimal Access Surgery, Dr. Reddy uses techniques that prioritize minimal scarring:

**1. Minimal incision technique:** The incision is made as small as possible — often smaller than the cyst itself. The cyst is carefully dissected from surrounding tissue and delivered through the small opening intact.

**2. Complete capsule removal:** The entire cyst wall/capsule is removed. Incomplete removal (often from "squeeze and drain" techniques at non-surgical clinics) leads to recurrence rates of 40–60%.

**3. Layered closure:** The wound is closed in layers with fine absorbable sutures internally and skin closure techniques that minimize visible scarring.

**4. Histopathological examination:** All excised lumps are sent for pathological examination to confirm they are benign. This is standard surgical practice and important for patient safety.`,
    image: 'https://plus.unsplash.com/premium_photo-1723928512186-27de0f04424d?w=800&q=80',
    duration: '20–45 minutes',
    sessions: '1',
    downtime: '2–5 days (suture removal at 7–10 days)',
    suitableFor: [
      'Sebaceous cysts (any location)',
      'Epidermoid cysts',
      'Lipomas (fatty lumps)',
      'Dermoid cysts',
      'Recurring cysts (failed prior drainage)',
      'Infected or painful cysts',
    ],
    contraindications: [
      'Blood clotting disorders (relative)',
      'Active skin infection overlying the cyst (may need antibiotics first)',
      'Anticoagulant medication (may need temporary adjustment)',
    ],
    technologies: ['Minimal incision excision technique', 'Radiofrequency-assisted dissection', 'Layered wound closure', 'Histopathological analysis'],
    faqs: [
      {
        question: 'Can cysts be treated without surgery?',
        answer: 'Drainage alone provides temporary relief but the cyst almost always recurs because the wall remains. Steroid injections can shrink inflamed cysts but don\'t eliminate them. Complete surgical excision of the cyst with its capsule is the only way to prevent recurrence.',
      },
      {
        question: 'Will the excision leave a scar?',
        answer: 'Any surgical incision leaves some mark. However, Dr. Reddy uses minimal incision techniques and meticulous layered closure to ensure the scar is as small and inconspicuous as possible — typically much smaller than the lump being removed. The scar continues to fade over 6–12 months.',
      },
    ],
    metaTitle: 'Cyst & Lipoma Removal Hyderabad | Minimal Scar Excision | Vernon Clinic',
    metaDescription: 'Expert cyst and lipoma excision in Hyderabad by surgeon Dr. Brahmananda Reddy. Minimal-scar technique, complete capsule removal, histopathology. Vernon Skin Clinic.',
  },

  // ===== ADDITIONAL SKIN TREATMENTS FROM OLD WEBSITE =====
  {
    id: 'anti-dandruff-treatment',
    name: 'Anti-Dandruff Treatment',
    slug: 'anti-dandruff-treatment',
    category: treatmentCategories[2],
    shortDescription:
      'Medical management of dandruff and seborrheic dermatitis — from mild flaking to severe scalp inflammation. Evidence-based protocols, not just shampoos.',
    heroDescription: `Dandruff (seborrheic dermatitis of the scalp) is one of the most common conditions seen in dermatology clinics. While mild dandruff is a cosmetic nuisance, moderate to severe seborrheic dermatitis involves significant scalp inflammation, itching, and can contribute to hair thinning.

**The difference between dandruff and seborrheic dermatitis:**

Mild dandruff is simply increased desquamation (skin flaking) of the scalp. Seborrheic dermatitis is an inflammatory condition driven by the Malassezia yeast, sebaceous gland activity, and individual immune response. The distinction matters because treatment approach differs significantly.

**Vernon's diagnostic approach:**

**1. Trichoscopy:** A dermoscopic examination of the scalp reveals the pattern and severity of inflammation, differentiates seborrheic dermatitis from psoriasis or other scalp conditions, and identifies any associated hair loss.

**2. Identifying triggers:** Stress, diet, weather changes, hormonal fluctuations, and incorrect hair products can trigger or worsen dandruff. Dr. Reddy addresses these systematically.

**Treatment protocol by severity:**

**Mild:** Medical-grade anti-fungal shampoos (ketoconazole 2%, ciclopirox), correct washing frequency guidance, scalp care routine.

**Moderate:** Topical antifungal lotions, low-potency topical steroids for flare management, calcineurin inhibitors for steroid-sparing maintenance.

**Severe / Resistant:** Oral antifungal therapy, phototherapy, scalp PRP for associated hair thinning, nutritional optimization (zinc, B-complex, omega-3).

**The hair loss connection:** Chronic untreated seborrheic dermatitis can cause telogen effluvium — a diffuse hair shedding response to ongoing scalp inflammation. Controlling dandruff is often the first step in managing associated hair thinning.`,
    image: 'https://plus.unsplash.com/premium_photo-1730126356140-cf6e3492ea4d?w=800&q=80',
    duration: '15–20 minutes (consultation + scalp analysis)',
    sessions: '2–4 follow-ups over 2–3 months',
    downtime: 'None',
    suitableFor: [
      'Persistent dandruff not responding to OTC shampoos',
      'Severe scalp flaking and itching',
      'Seborrheic dermatitis',
      'Scalp redness and inflammation',
      'Hair thinning associated with dandruff',
    ],
    contraindications: [
      'Very few — treatment is primarily topical and safe for most patients',
    ],
    technologies: ['Trichoscopy', 'Prescription antifungal therapy', 'Scalp PRP (for associated hair loss)', 'Phototherapy'],
    faqs: [
      {
        question: 'Why doesn\'t anti-dandruff shampoo work for me?',
        answer: 'Over-the-counter shampoos contain lower concentrations of active ingredients and may not address the underlying inflammation. Moderate to severe cases often need prescription-strength topical treatments, oral medications, or a combination approach. Also, many patients use these shampoos incorrectly — the shampoo needs 3–5 minutes of contact time on the scalp, not just a quick lather.',
      },
    ],
    metaTitle: 'Anti-Dandruff Treatment Hyderabad | Seborrheic Dermatitis | Vernon Clinic',
    metaDescription: 'Medical dandruff treatment in Hyderabad for persistent flaking and seborrheic dermatitis. Trichoscopy diagnosis, prescription therapy by dermatologist at Vernon Skin Clinic.',
  },
  {
    id: 'glutathione-skin-radiance',
    name: 'Glutathione Radiance Treatment',
    slug: 'glutathione-skin-radiance',
    category: treatmentCategories[4],
    shortDescription:
      'Medical-grade glutathione therapy for skin brightening, antioxidant protection, and detoxification. IV infusion and topical protocols.',
    heroDescription: `Glutathione is the body's most abundant intracellular antioxidant — a tripeptide (glutamic acid, cysteine, glycine) that plays a critical role in detoxification, immune function, and melanin regulation.

**How glutathione brightens skin:**

Glutathione inhibits the enzyme tyrosinase, which is the rate-limiting step in melanin synthesis. By reducing tyrosinase activity, glutathione shifts melanin production from eumelanin (dark brown/black pigment) toward pheomelanin (lighter, reddish pigment). This produces a gradual, natural brightening of the skin — not "bleaching" but a shift in the type of melanin being produced.

**The Vernon glutathione protocol:**

**IV Infusion (Primary):** 600–1200mg of pharmaceutical-grade glutathione delivered intravenously. This is the most effective delivery method as oral glutathione is largely degraded in the GI tract. Sessions are weekly for 8–12 weeks, then monthly for maintenance.

**Combination approach:** Glutathione is most effective when combined with:
- High-dose Vitamin C (which recycles oxidized glutathione back to its active form)
- Alpha-lipoic acid (another glutathione recycler)
- N-acetyl cysteine (the rate-limiting precursor for glutathione synthesis)

**What to expect:** Results are gradual and cumulative. Most patients notice improved skin radiance and even tone by session 6–8. The brightening effect is subtle and natural — skin looks healthier and more luminous rather than artificially lightened.

**Medical context:** At Vernon, glutathione therapy is physician-supervised. We do not offer glutathione to patients seeking dramatic skin color change — it is an antioxidant and skin health treatment that produces modest, natural brightening as a secondary benefit.`,
    image: 'https://plus.unsplash.com/premium_photo-1736765199034-5f3a00143107?w=800&q=80',
    duration: '30–45 minutes',
    sessions: '8–12 weekly sessions, then monthly maintenance',
    downtime: 'None',
    suitableFor: [
      'Dull, uneven skin tone',
      'Hyperpigmentation support (adjunct to laser)',
      'Overall skin radiance',
      'Antioxidant and detoxification support',
      'Pre-event skin brightening',
    ],
    contraindications: [
      'Kidney disease',
      'Asthma (IV glutathione may trigger bronchospasm in some patients)',
      'Pregnancy',
      'G6PD deficiency',
    ],
    technologies: ['IV glutathione infusion', 'Vitamin C co-administration', 'N-acetyl cysteine supplementation'],
    faqs: [
      {
        question: 'How many sessions until I see skin brightening?',
        answer: 'Most patients notice improved skin radiance by sessions 6–8 (6–8 weeks of weekly treatment). The brightening effect is gradual and cumulative. Maintenance sessions every 4–6 weeks sustain the results.',
      },
      {
        question: 'Is glutathione treatment safe long-term?',
        answer: 'Glutathione is a naturally occurring molecule in your body. Supplementation via IV at therapeutic doses is considered safe when administered by qualified medical professionals. At Vernon, all patients undergo pre-assessment and are monitored during infusion. Long-term use for maintenance is well-established in aesthetic medicine.',
      },
    ],
    metaTitle: 'Glutathione Treatment Hyderabad | Skin Brightening IV Drip | Vernon Clinic',
    metaDescription: 'Glutathione skin brightening treatment in Hyderabad via IV infusion. Medical-grade antioxidant therapy for radiant, even-toned skin at Vernon Skin and Hair Clinic.',
  },
  {
    id: 'mesotherapy-skin',
    name: 'Mesotherapy for Skin',
    slug: 'mesotherapy-skin',
    category: treatmentCategories[3],
    shortDescription:
      'Micro-injection of vitamins, hyaluronic acid, and antioxidants into the skin for deep hydration, rejuvenation, and glow. The "mesolift" effect.',
    heroDescription: `While mesotherapy for hair targets follicles on the scalp, mesotherapy for skin delivers a cocktail of rejuvenating ingredients directly into the facial dermis — the layer where collagen, elastin, and hyaluronic acid reside.

**What skin mesotherapy delivers:**

**Hyaluronic acid (non-cross-linked):** Unlike fillers that add volume, mesotherapy HA hydrates the dermis from within, improving skin plumpness and turgor without adding visible volume.

**Vitamins (C, E, B-complex):** Provide antioxidant protection and support collagen synthesis at the cellular level.

**Amino acids and peptides:** Building blocks for collagen and elastin production.

**Growth factors:** Stimulate fibroblast activity and cell renewal.

**The "Mesolift" effect:** After a series of mesotherapy sessions, patients notice a distinctive improvement in skin quality — improved hydration, reduced fine lines, smaller-appearing pores, and a natural luminosity. This is sometimes called the "mesolift" because it creates a subtle lifting and plumping effect from hydration rather than mechanical lifting.

**How it differs from Profhilo:** Profhilo delivers a high concentration of a single ingredient (hybrid HA) through 10 injection points that spread broadly. Mesotherapy delivers multiple ingredients through hundreds of micro-injections across the entire treatment area. Both improve skin quality but through different mechanisms — Profhilo for bio-remodeling, mesotherapy for comprehensive nutrient delivery.

**Treatment areas:** Face, neck, decolletage, hands, and under-eye area. Each area receives a customized cocktail formulation.`,
    image: 'https://plus.unsplash.com/premium_photo-1661295617603-44c4f9dfd00f?w=800&q=80',
    duration: '30–45 minutes',
    sessions: '4–6 sessions (2–3 weeks apart), then maintenance every 1–2 months',
    downtime: 'Minimal — tiny red dots for 24 hours',
    suitableFor: [
      'Dull, dehydrated skin',
      'Fine lines and early aging',
      'Under-eye dark circles (vascular type)',
      'Pre-event skin preparation',
      'Neck and decolletage aging',
      'Hand rejuvenation',
    ],
    contraindications: [
      'Active skin infection',
      'Pregnancy',
      'Autoimmune conditions (relative)',
      'Allergy to mesotherapy components',
    ],
    technologies: ['Mesotherapy micro-injection gun', 'Customized HA-vitamin cocktails', 'Dermapen-assisted delivery (alternative)'],
    faqs: [
      {
        question: 'How long do mesotherapy results last?',
        answer: 'After an initial course of 4–6 sessions, results typically last 3–4 months. Monthly maintenance sessions sustain the improvement in skin quality. The cumulative effect of repeated sessions builds progressively better skin health over time.',
      },
    ],
    metaTitle: 'Skin Mesotherapy Hyderabad | Mesolift, Vitamin Injection | Vernon Clinic',
    metaDescription: 'Skin mesotherapy in Hyderabad — micro-injection of vitamins, HA, and growth factors for deep hydration and radiance. Mesolift effect at Vernon Skin and Hair Clinic.',
  },

  // ===== HIGH-PRIORITY COMPETITIVE GAPS =====
  {
    id: 'dark-circle-treatment',
    name: 'Under Eye Dark Circle Treatment',
    slug: 'dark-circle-treatment',
    category: treatmentCategories[3],
    shortDescription:
      'Multi-modal dark circle correction — tear trough fillers, PRP, Pico laser, and vitamin K therapy. Because dark circles have multiple causes that need different solutions.',
    heroDescription: `Dark circles under the eyes are one of the most common cosmetic complaints, yet they are frequently mismanaged because the cause is not properly diagnosed. At Vernon, treatment begins with identifying which type of dark circle you have — because each requires a completely different approach.

**The four types of dark circles:**

**1. Pigmentary (melanin-based):** Excess melanin deposition in the periorbital skin, often genetic and more pronounced in Indian skin types. Appears as brown or dark brown discoloration.

**Treatment:** Topical depigmenting agents (vitamin C, kojic acid, arbutin), Pico laser toning at very low fluence, gentle chemical peels (mandelic or lactic acid).

**2. Vascular (blood vessel-based):** The under-eye skin is the thinnest on the body (0.5mm). In patients with prominent superficial blood vessels, the purplish-blue venous network shows through. This type appears worse with fatigue, dehydration, or allergies.

**Treatment:** Topical vitamin K and retinol to strengthen capillary walls, vascular laser treatment, lifestyle modification (sleep, hydration).

**3. Structural (volume loss / hollowing):** As we age, the fat pads under the eyes shrink and the orbital bone becomes more prominent, creating a shadow that appears as a dark circle. This is actually a shadow, not pigmentation.

**Treatment:** Tear trough filler (hyaluronic acid) is the most effective solution. A small amount of HA filler placed along the orbital rim instantly corrects the hollow and eliminates the shadow. Results last 12–18 months. Dr. Reddy uses cannula technique for safer, more precise filler placement in this delicate area.

**4. Mixed (most common):** The majority of patients have a combination of two or three types. This is why a single treatment approach rarely works.

**The Vernon protocol for dark circles:**
1. Wood's lamp examination to distinguish pigmentary from vascular component
2. Assessment of tear trough depth for volume loss
3. Customized multi-modal treatment plan addressing all contributing factors
4. Staged treatment — typically start with filler (if volume loss present), then address pigmentation/vascular components`,
    image: 'https://plus.unsplash.com/premium_photo-1722728642072-4291006eb998?w=800&q=80',
    duration: '20–45 minutes (depending on treatment)',
    sessions: '1 (filler) + 4–6 (laser/peel)',
    downtime: 'None to minimal',
    suitableFor: [
      'Dark circles not responsive to creams',
      'Under-eye hollowing and shadows',
      'Hereditary dark circles',
      'Tired, aged appearance around eyes',
      'Periorbital hyperpigmentation',
    ],
    contraindications: [
      'Active eye infection or inflammation',
      'Severe allergies (treat underlying cause first)',
      'Unrealistic expectations (some genetic pigmentation is persistent)',
      'Blood thinners (relative — for filler)',
    ],
    technologies: ['Tear trough HA filler (cannula technique)', 'Pico laser toning', 'PRP under-eye rejuvenation', 'Vitamin K therapy', 'Chemical peels'],
    faqs: [
      {
        question: 'Can dark circles be permanently removed?',
        answer: 'It depends on the type. Structural dark circles (hollowing) can be effectively corrected with filler for 12–18 months. Pigmentary dark circles can be significantly improved but may require maintenance. Vascular dark circles improve with treatment but tend to recur with fatigue and dehydration. A realistic goal is significant improvement, not complete elimination.',
      },
      {
        question: 'Is under-eye filler safe?',
        answer: 'Yes, when performed by an experienced physician using proper technique. Dr. Reddy uses cannula (blunt-tip needle) technique for under-eye filler, which is safer than sharp needles in this delicate area. The risk of bruising and vascular complications is significantly reduced with cannula technique.',
      },
    ],
    metaTitle: 'Dark Circle Treatment Hyderabad | Under Eye Filler, Laser | Vernon Clinic',
    metaDescription: 'Expert dark circle treatment in Hyderabad. Tear trough filler, Pico laser, PRP for under-eye hollows and pigmentation. Multi-modal approach at Vernon Skin Clinic.',
  },
  {
    id: 'jawline-contouring',
    name: 'Non-Surgical Jawline Contouring',
    slug: 'jawline-contouring',
    category: treatmentCategories[3],
    shortDescription:
      'Dermal fillers for jawline definition and Botox masseter reduction for facial slimming. Create a sharper, more defined jawline without surgery.',
    heroDescription: `Non-surgical jawline contouring has become one of the most requested aesthetic treatments, driven by the desire for a defined, sculpted jawline that photographs well and creates facial harmony.

**Two approaches to jawline enhancement:**

**1. Jawline Definition with Dermal Fillers:**
Hyaluronic acid filler (high-viscosity products like Juvederm Volux or Restylane Defyne) is injected along the jawline to create definition, sharpen the jaw angle, and improve the transition from jaw to neck. This is particularly effective for:
- Weak or receding jawline
- Jowl camouflage (pre-jowl sulcus filling)
- Asymmetric jawline correction
- Creating a more angular, defined profile

**Technique:** Dr. Reddy maps the jawline architecture before injection, identifying the mandibular angle, body, and mental region. Filler is placed deep (on the bone periosteum) for structural support using a combination of needle and cannula technique. The result is immediate — a sharper, more defined jawline visible from both frontal and profile views.

**2. Facial Slimming with Botox Masseter:**
For patients with a wide, square jawline caused by masseter muscle hypertrophy (often from bruxism/teeth grinding or genetic muscle bulk), Botox is injected into the masseter muscles bilaterally. The muscles gradually reduce in size over 4–8 weeks, transforming a square face into a more V-shaped, feminine contour.

**Masseter Botox also helps with:**
- TMJ (temporomandibular joint) pain
- Teeth grinding/clenching
- Jaw tension headaches

**The combination approach:** Many patients benefit from both — Botox to slim the lateral jaw and fillers to define the jaw angle and chin. This creates a comprehensive reshaping effect that is dramatic yet natural-looking.`,
    image: 'https://plus.unsplash.com/premium_photo-1683121028204-1e00326672b0?w=800&q=80',
    duration: '20–30 minutes',
    sessions: '1 (repeat filler at 12–18 months, Botox at 4–6 months)',
    downtime: 'Minimal — possible mild swelling for 24–48 hours',
    suitableFor: [
      'Weak or undefined jawline',
      'Wide or square face (masseter hypertrophy)',
      'Pre-jowl sulcus / early jowling',
      'Facial asymmetry correction',
      'TMJ pain and teeth grinding',
      'Desire for V-shaped face contour',
    ],
    contraindications: [
      'Active skin infection at injection site',
      'Pregnancy or breastfeeding',
      'Known allergy to HA or botulinum toxin',
      'Unrealistic expectations for non-surgical results',
    ],
    technologies: ['High-viscosity HA fillers (Volux, Defyne)', 'Botox masseter injection', 'Cannula technique for jawline', 'Facial mapping and symmetry analysis'],
    faqs: [
      {
        question: 'How long does jawline filler last?',
        answer: 'Jawline fillers typically last 12–18 months, sometimes longer because the jawline area has less movement than lips or cheeks. High-viscosity fillers designed for structural support (like Volux) tend to last longer than standard fillers.',
      },
      {
        question: 'Will masseter Botox change my smile?',
        answer: 'No. Botox is injected into the deep masseter muscle, not the muscles responsible for smiling. When performed by an experienced injector who understands facial anatomy, masseter Botox does not affect smile, speech, or chewing ability.',
      },
    ],
    metaTitle: 'Jawline Contouring Hyderabad | Non-Surgical Jawline Filler | Vernon Clinic',
    metaDescription: 'Non-surgical jawline contouring in Hyderabad with dermal fillers and Botox masseter slimming. Sharper jawline, V-shaped face at Vernon Skin and Hair Clinic.',
  },
  {
    id: 'lip-augmentation',
    name: 'Lip Augmentation & Enhancement',
    slug: 'lip-augmentation',
    category: treatmentCategories[3],
    shortDescription:
      'Natural lip enhancement with hyaluronic acid fillers. Volume, definition, symmetry correction, and hydration — customized to your facial proportions.',
    heroDescription: `Lip augmentation at Vernon is not about creating artificially plump lips — it is about enhancing your natural lip shape, improving symmetry, and creating proportional fullness that harmonizes with your facial features.

**What lip filler can achieve:**

**1. Volume enhancement:** Adding fullness to naturally thin lips or lips that have lost volume with age. The goal is proportional enhancement — upper lip should be slightly smaller than lower lip in most cases.

**2. Lip border definition:** Sharpening the vermillion border (the line between lip and surrounding skin) creates a more defined lip shape without necessarily adding volume.

**3. Cupid's bow enhancement:** Defining the M-shape of the upper lip's central peaks adds elegance and definition.

**4. Asymmetry correction:** Many people have naturally uneven lips. Filler can be placed strategically to improve symmetry.

**5. Lip hydration:** Small amounts of soft HA filler distributed throughout the lip body improve hydration and reduce fine lip lines without adding volume.

**The Vernon lip philosophy:**
Dr. Reddy follows the principle of proportional enhancement. The ideal lip proportions (lower lip 1.6x the upper lip volume, matching the golden ratio) serve as a guide, but individual facial anatomy always takes priority. We never create "duck lips" — the result should look like a naturally beautiful version of YOUR lips.

**Products used:** Soft, flexible HA fillers specifically designed for lips (Juvederm Ultra Smile, Restylane Kysse). These contain built-in lidocaine for comfort and are softer than fillers used for cheeks or jawline, ensuring natural movement and feel.

**The procedure:** Topical numbing cream is applied for 15–20 minutes. Filler is injected using a combination of needle (for precise border work) and cannula (for body volume, safer and less bruising). Total injection time is 15–20 minutes. Results are immediate.`,
    image: 'https://plus.unsplash.com/premium_photo-1719617673004-cb7e037051b0?w=800&q=80',
    duration: '30–40 minutes (including numbing)',
    sessions: '1 (repeat at 6–12 months)',
    downtime: 'Mild swelling for 24–48 hours',
    suitableFor: [
      'Naturally thin lips',
      'Age-related lip volume loss',
      'Lip asymmetry',
      'Undefined lip borders',
      'Fine lip lines (smoker\'s lines)',
      'Desire for subtle, natural enhancement',
    ],
    contraindications: [
      'Active cold sore (herpes simplex) — treat first',
      'Pregnancy or breastfeeding',
      'Known allergy to HA fillers',
      'Autoimmune conditions (relative)',
    ],
    technologies: ['Soft HA lip fillers (Juvederm, Restylane)', 'Cannula technique', 'Micro-droplet injection technique', 'Proportional facial analysis'],
    faqs: [
      {
        question: 'Will lip filler look natural?',
        answer: 'When performed by an experienced injector with appropriate restraint, yes. The "overdone" lip look comes from excessive volume, not from filler itself. Dr. Reddy follows proportional guidelines and always errs on the conservative side — it is easy to add more at a follow-up, impossible to remove excess quickly.',
      },
      {
        question: 'How painful is lip filler?',
        answer: 'Topical numbing cream is applied for 15–20 minutes before injection. The filler itself contains built-in lidocaine that provides additional numbing as the treatment progresses. Most patients describe mild discomfort, not pain. The procedure takes only 15–20 minutes of actual injection time.',
      },
    ],
    metaTitle: 'Lip Filler Hyderabad | Natural Lip Augmentation | Vernon Skin Clinic',
    metaDescription: 'Natural lip augmentation in Hyderabad with HA fillers. Volume, definition, symmetry correction by physician injector Dr. Brahmananda Reddy at Vernon Clinic.',
  },
  {
    id: 'alopecia-areata-treatment',
    name: 'Alopecia Areata Treatment',
    slug: 'alopecia-areata-treatment',
    category: treatmentCategories[2],
    shortDescription:
      'Comprehensive management of autoimmune hair loss — intralesional steroids, immunotherapy, JAK inhibitors, and PRP for alopecia areata and its variants.',
    heroDescription: `Alopecia areata is an autoimmune condition where the immune system mistakenly attacks hair follicles, causing sudden, patchy hair loss. It can range from a single small patch to complete loss of all scalp hair (alopecia totalis) or all body hair (alopecia universalis).

**Understanding alopecia areata:**

Unlike male/female pattern hair loss (which is gradual and genetic), alopecia areata is:
- **Sudden onset:** Patches appear over days to weeks
- **Autoimmune:** Driven by T-lymphocytes attacking the hair follicle bulb
- **Unpredictable:** May resolve spontaneously, remain stable, or progress
- **Potentially reversible:** The follicle is not destroyed — hair can regrow if the immune attack is controlled

**Types treated at Vernon:**

**Patchy alopecia areata:** One or more coin-sized smooth bald patches. The most common form and most responsive to treatment.

**Alopecia totalis:** Complete loss of all scalp hair.

**Alopecia universalis:** Complete loss of all body hair including eyebrows and eyelashes.

**Ophiasis pattern:** Band-like hair loss along the temporal and occipital scalp margins. More resistant to treatment.

**Treatment protocol at Vernon:**

**First-line — Intralesional corticosteroid injection:**
Triamcinolone acetonide (2.5–10mg/ml) is injected directly into the bald patches every 4–6 weeks. This is the gold standard for limited patchy alopecia areata, with regrowth seen in 60–70% of patients within 4–8 weeks of starting treatment.

**Second-line — Topical immunotherapy (DPCP/SADBE):**
For extensive alopecia areata, we apply a contact sensitizer to the scalp that redirects the immune response away from hair follicles. This requires careful medical supervision and regular visits.

**Emerging — JAK inhibitors:**
Oral tofacitinib or baricitinib show remarkable efficacy in moderate to severe alopecia areata. Ritlecitinib (FDA-approved 2023) is specifically designed for alopecia areata. These represent a genuine breakthrough for patients with extensive disease.

**Adjunctive — PRP therapy:**
PRP growth factors support follicle recovery and can accelerate regrowth when combined with corticosteroid or immunotherapy.

**Prognostic factors:**
- Early onset (childhood) — more likely to have extensive disease
- Nail changes (pitting, ridging) — indicates more active autoimmune process
- Family history of autoimmune conditions — higher recurrence risk
- Ophiasis pattern — more resistant to treatment
- Single small patch in an adult — best prognosis`,
    image: 'https://plus.unsplash.com/premium_photo-1693146325881-02f972eb4b38?w=800&q=80',
    duration: '20–30 minutes per session',
    sessions: 'Variable — monthly injections for 3–6 months minimum',
    downtime: 'None',
    suitableFor: [
      'Patchy hair loss (coin-sized bald spots)',
      'Alopecia totalis and universalis',
      'Beard alopecia areata',
      'Eyebrow hair loss (autoimmune)',
      'Recurrent alopecia areata episodes',
    ],
    contraindications: [
      'Active scalp infection',
      'Steroid sensitivity (for intralesional injection)',
      'Immunodeficiency (for JAK inhibitors — requires screening)',
    ],
    technologies: ['Intralesional corticosteroid injection', 'Topical immunotherapy (DPCP)', 'JAK inhibitor therapy', 'PRP/GFC therapy', 'Narrow-band UVB phototherapy'],
    faqs: [
      {
        question: 'Will my hair grow back from alopecia areata?',
        answer: 'In most cases of limited patchy alopecia areata, yes. Approximately 50% of patients with a single patch experience spontaneous regrowth within 1 year. With treatment (intralesional steroids), 60–70% see regrowth within 2–3 months. However, recurrence is common (about 50% within 5 years), and extensive forms (totalis/universalis) have a lower regrowth rate.',
      },
      {
        question: 'Is alopecia areata different from regular hair loss?',
        answer: 'Yes, completely. Pattern hair loss (androgenetic alopecia) is gradual, genetic, and caused by DHT hormone sensitivity. Alopecia areata is sudden, autoimmune, and causes smooth, round bald patches. The distinction matters because they require entirely different treatments.',
      },
    ],
    metaTitle: 'Alopecia Areata Treatment Hyderabad | Autoimmune Hair Loss | Vernon Clinic',
    metaDescription: 'Alopecia areata treatment in Hyderabad — intralesional steroids, JAK inhibitors, immunotherapy for patchy hair loss. Expert dermatologist at Vernon Skin Clinic.',
  },
  {
    id: 'hyperhidrosis-treatment',
    name: 'Hyperhidrosis (Excessive Sweating) Treatment',
    slug: 'hyperhidrosis-treatment',
    category: treatmentCategories[2],
    shortDescription:
      'Medical management of excessive sweating — Botox injections for underarms, palms, and forehead. Long-lasting relief from embarrassing sweat patches.',
    heroDescription: `Hyperhidrosis is a medical condition characterized by sweating that exceeds what is necessary for thermoregulation. It affects approximately 3% of the population and can be socially and professionally debilitating — ruining clothing, making handshakes embarrassing, and causing constant anxiety about visible sweat marks.

**Types of hyperhidrosis:**

**Primary focal hyperhidrosis:** The most common form. Excessive sweating limited to specific areas — underarms, palms, soles, face, or scalp. Usually bilateral and symmetric. Begins in adolescence and has a genetic component.

**Secondary generalized hyperhidrosis:** Sweating all over the body, caused by an underlying condition (thyroid disorder, diabetes, menopause, medication side effects). This requires medical investigation and treatment of the underlying cause.

**Treatment at Vernon:**

**Botox for hyperhidrosis (first-line for axillary and palmar):**

Botulinum toxin blocks the nerve signals that activate sweat glands. When injected into the affected area, it produces a dramatic reduction in sweating within 3–7 days, lasting 6–12 months.

**Underarm (axillary) treatment:** The most commonly treated area. Approximately 50 units of Botox per underarm, injected in a grid pattern at 1–2cm intervals. Sweat reduction: 80–90%. Duration: 6–12 months.

**Palm (palmar) treatment:** More technically challenging due to the density of nerve endings in the palms (making it more painful) and the importance of preserving grip strength. We use nerve block anesthesia for comfort. Sweat reduction: 80–90%. Duration: 4–6 months.

**Forehead/scalp treatment:** Effective for patients whose face/head sweats excessively during meetings, social situations, or mild exertion. Careful dosing prevents affecting forehead muscle movement.

**The starch-iodine test:** Before treatment, Dr. Reddy performs a starch-iodine test to map the exact areas of maximum sweating. This ensures Botox is placed precisely where it is needed, maximizing effectiveness and minimizing units used.

**Topical options:**

**Prescription-strength antiperspirants (aluminum chloride 20%):** Applied nightly to affected areas. Effective for mild hyperhidrosis but can cause skin irritation.

**Glycopyrrolate topical solution:** An anticholinergic that blocks sweat gland activation. Applied to the skin surface.

**When sweating affects quality of life — treat it.** Hyperhidrosis is a legitimate medical condition, not a hygiene issue. Effective treatment exists and can be transformative.`,
    image: 'https://plus.unsplash.com/premium_photo-1661761733916-aab02c59d88c?w=800&q=80',
    duration: '30–45 minutes',
    sessions: '1 (repeat every 6–12 months)',
    downtime: 'None',
    suitableFor: [
      'Excessive underarm sweating',
      'Sweaty palms',
      'Facial/forehead sweating',
      'Sweat staining clothes despite antiperspirant',
      'Social anxiety from visible sweating',
      'Compensatory sweating in specific areas',
    ],
    contraindications: [
      'Neuromuscular disorders (myasthenia gravis)',
      'Pregnancy or breastfeeding',
      'Allergy to botulinum toxin',
      'Active skin infection at injection site',
    ],
    technologies: ['Botulinum toxin injection', 'Starch-iodine sweat mapping', 'Nerve block anesthesia (for palms)', 'Prescription topical anticholinergics'],
    faqs: [
      {
        question: 'How long does Botox for sweating last?',
        answer: 'Underarm Botox for sweating typically lasts 6–12 months (longer than cosmetic Botox because sweat glands regenerate more slowly than muscles). Palm treatment lasts 4–6 months. Most patients need 1–2 treatments per year.',
      },
      {
        question: 'Does Botox for sweating cause compensatory sweating elsewhere?',
        answer: 'This is a concern with surgical sympathectomy (nerve cutting), not with Botox. Botox blocks sweat glands locally without affecting the nervous system. Compensatory sweating is extremely rare with Botox treatment.',
      },
    ],
    metaTitle: 'Hyperhidrosis Treatment Hyderabad | Botox for Sweating | Vernon Clinic',
    metaDescription: 'Excessive sweating treatment in Hyderabad — Botox for underarms, palms, face. 6–12 month relief from hyperhidrosis at Vernon Skin and Hair Clinic.',
  },
]
