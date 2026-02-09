import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { SchemaOrg } from '@/components/schema/SchemaOrg'
import { generateFAQSchema } from '@/lib/schema'
import { BookingCTA } from '@/components/booking/BookingCTA'
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'FAQ | Frequently Asked Questions About Skin & Hair Treatments',
  description:
    'Answers to common questions about hair transplant, Pico laser, Botox, acne treatment, and other dermatology procedures at Vernon Skin and Hair Clinic Hyderabad.',
}

const faqSections = [
  {
    title: 'General',
    faqs: [
      {
        question: 'Who is Dr. R. Brahmananda Reddy?',
        answer:
          'Dr. R. Brahmananda Reddy is the founder and chief dermatosurgeon of Vernon Skin and Hair Clinic. He holds an MBBS, MS in General Surgery, MSc in Dermatology from the University of Hertfordshire (UK), and is board-certified by the American Academy of Aesthetic Medicine. He is a member of the International Society of Hair Restoration Surgery (ISHRS) and an official trainer for Menarini dermal fillers. With over 13 years of practice, he is one of Hyderabad\'s most qualified dermatosurgeons.',
      },
      {
        question: 'What makes Vernon different from other skin clinics in Hyderabad?',
        answer:
          'Three things: (1) Surgeon-led care — Dr. Reddy personally performs or supervises every significant procedure, unlike chains where technicians do the work. (2) UK training combined with Indian skin expertise — he understands both international protocols and the specific needs of Indian skin types. (3) Evidence-based approach — we only use US-FDA approved technologies and protocols backed by peer-reviewed research. We don\'t follow trends; we follow evidence.',
      },
      {
        question: 'Do I need a referral to see Dr. Reddy?',
        answer:
          'No referral is needed. You can book a consultation directly by calling +91 91000 17567, messaging us on WhatsApp, or using the booking form on this website.',
      },
      {
        question: 'What should I bring to my first appointment?',
        answer:
          'Bring any previous prescriptions, lab reports, or imaging related to your condition. List all current medications including supplements. For skin consultations, come without makeup on the affected area. For hair consultations, no specific preparation is needed.',
      },
      {
        question: 'Is Vernon the same as "Werner Skin Clinic" or "Vernon Skinner"?',
        answer:
          'The official name is Vernon Skin and Hair Clinic. Some patients search for us as "Werner," "Vernon Skinner," or "Vernon Skin Clinic" — these all refer to the same clinic. This confusion sometimes arises from phonetic similarities. The correct name is Vernon Skin and Hair Clinic, founded by Dr. R. Brahmananda Reddy.',
      },
    ],
  },
  {
    title: 'Hair Restoration',
    faqs: [
      {
        question: 'What is the difference between FUE, FUT, and DHI hair transplant?',
        answer:
          'FUE (Follicular Unit Extraction) involves extracting individual follicular units from the donor area using a micro-punch, leaving no linear scar. FUT (Follicular Unit Transplantation) removes a strip of skin from the donor area, dissects it into individual grafts — yields more grafts per session but leaves a linear scar. DHI (Direct Hair Implantation) is a variant of FUE where grafts are implanted directly using a Choi pen, allowing higher density without pre-made channels. Dr. Reddy selects the technique based on your hair type, donor area, and desired outcome.',
      },
      {
        question: 'How long does a hair transplant take to show results?',
        answer:
          'The transplanted hairs shed between weeks 2–6 (shock shedding — this is normal). New growth begins around months 3–4. Progressive thickening occurs from months 6–10. Final results are visible at 12–14 months. Dr. Reddy\'s team provides a detailed timeline during your consultation.',
      },
      {
        question: 'What is PRP therapy and does it actually work for hair loss?',
        answer:
          'PRP (Platelet-Rich Plasma) concentrates your blood\'s platelets — which contain growth factors — and injects them into the scalp. Clinical studies show PRP can increase hair count by 20–30% and improve hair thickness. It works best for early-stage hair loss (thinning but not bald) and as a complement to hair transplant surgery. It is not a replacement for transplant in advanced hair loss. At Vernon, we use advanced double-spin centrifugation for optimal platelet concentration.',
      },
      {
        question: 'What is GFC therapy? How is it different from PRP?',
        answer:
          'GFC (Growth Factor Concentrate) takes PRP a step further. Instead of injecting the entire platelet concentrate, GFC isolates only the growth factors (PDGF, VEGF, EGF) from the platelets. This provides a more purified, targeted regenerative treatment without the red and white blood cells present in PRP. Some studies suggest GFC may produce more consistent results than PRP, though both are effective for hair thinning.',
      },
      {
        question: 'Can women get hair transplants?',
        answer:
          'Yes. Female pattern hair loss (FPHL) is treatable with transplant surgery, but the approach differs from male hair loss. Women typically have diffuse thinning rather than defined bald areas, which requires careful donor assessment. Not all women are candidates — Dr. Reddy evaluates each case individually to determine if transplant, PRP, or medical management is the best path.',
      },
    ],
  },
  {
    title: 'Pico Laser & Laser Treatments',
    faqs: [
      {
        question: 'What is Pico laser? How does it work?',
        answer:
          'Pico laser fires in picoseconds (trillionths of a second) — 1000x faster than traditional Q-Switch lasers. At this speed, it uses photoacoustic energy (shockwaves) rather than photothermal energy (heat) to shatter pigment particles. Think of the difference between melting ice with heat vs. shattering glass with sound. Because it doesn\'t rely on heat, Pico laser is dramatically safer for Indian skin, which absorbs more thermal energy due to higher melanin content. This minimizes the risk of burns and post-inflammatory hyperpigmentation.',
      },
      {
        question: 'Is Pico laser safe for dark Indian skin?',
        answer:
          'Pico laser is the safest laser technology available for Indian skin (Fitzpatrick types IV–VI). Traditional lasers rely on heat, which is disproportionately absorbed by melanin-rich skin, causing burns and hyperpigmentation. Pico\'s photoacoustic mechanism delivers energy so quickly that thermal diffusion doesn\'t occur — the energy is spent on shattering pigment before it can damage surrounding melanocytes. This is why Pico is now the gold standard for laser treatment on darker skin tones.',
      },
      {
        question: 'Can Pico laser cure melasma?',
        answer:
          'No laser "cures" melasma because it is a chronic, hormonally-driven condition. However, Pico laser can significantly reduce pigmentation with the lowest risk of rebound compared to any other laser. At Vernon, Dr. Reddy uses Pico as part of a comprehensive melasma protocol that includes topical depigmenting agents, strict sun protection (SPF 50+), and periodic maintenance sessions. The goal is long-term management, not a one-time fix.',
      },
      {
        question: 'How many sessions does laser hair removal require?',
        answer:
          'Most patients need 6–8 sessions spaced 4–6 weeks apart for 70–90% permanent hair reduction. The number depends on your skin type, hair color, body area, and hormonal status. Patients with PCOS may need additional sessions. Annual maintenance sessions (1–2 per year) may be needed to manage any regrowth.',
      },
      {
        question: 'What is a Carbon Laser Peel (Hollywood Peel)?',
        answer:
          'A Carbon Laser Peel applies a thin layer of medical-grade carbon lotion to the face. Carbon particles penetrate pores and absorb onto sebum and dead cells. A Q-Switch Nd:YAG laser then targets the carbon, simultaneously vaporizing surface debris, stimulating collagen, and shrinking sebaceous glands. The result is immediate brightening, smoother texture, and reduced pore size — with zero downtime. It\'s one of the few procedures that shows visible results from session one.',
      },
    ],
  },
  {
    title: 'Botox, Fillers & Aesthetics',
    faqs: [
      {
        question: 'Will Botox make my face look frozen?',
        answer:
          'Not with the right technique. The "frozen" look results from over-treatment or poor injection placement — not from Botox itself. Dr. Reddy uses precise micro-dosing techniques that soften wrinkles while preserving natural facial expression and movement. As an official filler trainer for Menarini, his injection technique is among the most refined in Hyderabad. The goal is always "you, but refreshed" — not a different face.',
      },
      {
        question: 'What brands of fillers does Vernon use?',
        answer:
          'Vernon exclusively uses US-FDA approved hyaluronic acid (HA) fillers from established brands including Juvederm (Allergan), Restylane (Galderma), and Menarini products. HA fillers are the safest injectable filler material because they are naturally occurring in the body and are fully reversible with hyaluronidase enzyme. Dr. Reddy selects the specific product based on the treatment area — denser products for jawline and cheeks, softer products for lips and under-eyes.',
      },
      {
        question: 'How long do Botox and fillers last?',
        answer:
          'Botox typically lasts 4–6 months. Results appear within 3–7 days and peak at 2 weeks. Hyaluronic acid fillers last 12–18 months depending on the product, treatment area, and individual metabolism. Lip fillers tend to last 8–12 months due to the high mobility of the lips. Cheek and jawline fillers may last up to 18 months.',
      },
      {
        question: 'What are thread lifts? Are they safe?',
        answer:
          'Thread lifts use absorbable PDO (Polydioxanone) threads inserted under the skin to provide immediate mechanical lifting and stimulate long-term collagen production. The threads dissolve in 6–8 months, but the collagen they stimulate maintains the lift for 12–18 months. They are safe when performed by an experienced physician who understands facial anatomy — Dr. Reddy\'s surgical background ensures precise placement along safe anatomical vectors.',
      },
    ],
  },
  {
    title: 'Clinical Dermatology',
    faqs: [
      {
        question: 'What is MNRF and how does it treat acne scars?',
        answer:
          'MNRF (Micro-Needling Radio Frequency) uses insulated micro-needles to deliver radiofrequency energy at precise depths within the dermis. This creates controlled micro-injuries that trigger new collagen formation — the body\'s natural repair mechanism fills in depressed scars from within. The insulated needles protect the epidermis (skin surface), making MNRF safe for Indian skin. It is particularly effective for boxcar and rolling acne scars. Multiple sessions (4–6) are typically needed for optimal results.',
      },
      {
        question: 'Can Vernon remove moles and warts in a single visit?',
        answer:
          'Yes. Most warts, moles, skin tags, and DPN (Dermatosis Papulosa Nigra) can be removed in a single sitting using radiofrequency (RF) surgery. The procedure takes 15–30 minutes and produces minimal scarring. For suspicious moles (those changing in size, shape, or color), tissue is sent for histopathological examination. Dr. Reddy\'s background in General Surgery means these excisions are performed with surgical-grade precision.',
      },
      {
        question: 'Does Vernon treat children\'s skin conditions?',
        answer:
          'Yes. Dr. Reddy provides evidence-based pediatric dermatology for conditions including atopic dermatitis (childhood eczema), molluscum, childhood warts, fungal infections, diaper rash, hemangiomas, and birthmarks. Children\'s skin is thinner and more reactive than adult skin, so treatment protocols, medication dosing, and formulations are specifically adapted for pediatric patients.',
      },
      {
        question: 'What is vitiligo surgery? Am I a candidate?',
        answer:
          'Vitiligo surgery involves transplanting melanocytes (pigment cells) from normally pigmented skin to depigmented patches. At Vernon, Dr. Reddy uses the Non-Cultured Epidermal Cell Suspension (NCES) technique, which can treat larger areas from a small donor site. You may be a candidate if your vitiligo has been stable (no new patches or spread) for at least 12 months and you haven\'t responded adequately to medical treatment. Dr. Reddy assesses each case individually during consultation.',
      },
    ],
  },
  {
    title: 'Practical & Cost',
    faqs: [
      {
        question: 'How much does a consultation cost at Vernon?',
        answer:
          'Consultation fees vary by location and treatment type. For current fees, please call +91 91000 17567 or message us on WhatsApp. The consultation fee is applied toward your treatment cost if you proceed with a procedure.',
      },
      {
        question: 'Does Vernon offer EMI or payment plans?',
        answer:
          'Yes, we offer EMI options for high-value procedures like hair transplant surgery. Details are discussed during your consultation once Dr. Reddy has assessed your needs and provided a treatment plan.',
      },
      {
        question: 'Why are medications prescribed at Vernon more expensive than generic options?',
        answer:
          'Vernon prescribes pharmaceutical-grade, FDA-approved medications and medical-grade skincare products. These formulations have higher purity, proven bioavailability, and established safety profiles. While generic alternatives may be cheaper, they can vary in absorption, efficacy, and may contain inactive ingredients that irritate sensitive skin. Dr. Reddy prescribes what produces the fastest, safest results — the total cost of effective treatment is often lower than prolonged courses of less effective alternatives.',
      },
    ],
  },
]

const allFaqs = faqSections.flatMap((s) => s.faqs)

export default function FAQPage() {
  return (
    <>
      <SchemaOrg schema={generateFAQSchema(allFaqs)} />
      <Breadcrumbs items={[{ name: 'FAQ', href: '/faq' }]} />

      <section className="py-12 lg:py-20">
        <div className="section-max-width section-padding">
          <ScrollReveal>
            <span className="label">Frequently Asked Questions</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="heading-1 mt-3 max-w-3xl">
              Everything you need to know
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="body-large mt-6 max-w-2xl">
              Evidence-based answers to the most common questions about dermatology,
              hair restoration, laser treatments, and cosmetic procedures at Vernon
              Skin and Hair Clinic.
            </p>
          </ScrollReveal>

          {/* Quick nav */}
          <ScrollReveal delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-2">
              {faqSections.map((section) => (
                <a
                  key={section.title}
                  href={`#${section.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="badge hover:bg-clinical-50 hover:text-clinical-700 transition-colors"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </ScrollReveal>

          <div className="mt-12 space-y-16">
            {faqSections.map((section) => (
              <div
                key={section.title}
                id={section.title.toLowerCase().replace(/\s+/g, '-')}
              >
                <ScrollReveal>
                  <h2 className="heading-3 border-b border-vernon-100 pb-4">
                    {section.title}
                  </h2>
                </ScrollReveal>
                <StaggerReveal className="mt-6 space-y-4" staggerDelay={0.08} baseDelay={0.1}>
                  {section.faqs.map((faq, index) => (
                    <StaggerItem key={index}>
                      <details
                        className="group rounded-xl border border-vernon-100 bg-white"
                      >
                        <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-base font-medium text-vernon-900 hover:text-clinical-700">
                          <span className="pr-4">{faq.question}</span>
                          <svg className="h-5 w-5 flex-shrink-0 text-vernon-400 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                          </svg>
                        </summary>
                        <div className="border-t border-vernon-50 px-6 py-4 text-sm leading-relaxed text-vernon-600">
                          {faq.answer}
                        </div>
                      </details>
                    </StaggerItem>
                  ))}
                </StaggerReveal>
              </div>
            ))}
          </div>

          <ScrollReveal className="mt-16">
            <BookingCTA />
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
