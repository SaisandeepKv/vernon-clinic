import { streamText, stepCountIs, convertToModelMessages } from 'ai'
import { z } from 'zod'
import { allTreatments } from '@/data/treatments'
import { doctors } from '@/data/doctors'
import { locations } from '@/data/locations'
import { youtubeVideos, youtubeChannelUrl } from '@/data/youtube-videos'
import { blogPosts } from '@/data/blog-posts'
import { postBookingToNotion } from '@/lib/notion'

export const maxDuration = 30

// ---------------------------------------------------------------------------
// Price ranges (used by estimateCost tool)
// ---------------------------------------------------------------------------

const priceRanges: Record<string, { min: number; max: number; unit: string }> =
  {
    'hair-transplant': {
      min: 40000,
      max: 200000,
      unit: 'total (depends on grafts)',
    },
    'repair-hair-transplant': {
      min: 50000,
      max: 250000,
      unit: 'total (depends on complexity)',
    },
    'dhi-hair-transplant': {
      min: 50000,
      max: 200000,
      unit: 'total (depends on grafts)',
    },
    'prp-gfc-therapy': { min: 3000, max: 8000, unit: 'per session' },
    'mesotherapy-hair': { min: 3000, max: 6000, unit: 'per session' },
    'pico-laser': { min: 3000, max: 15000, unit: 'per session' },
    'q-switch-laser': { min: 2000, max: 8000, unit: 'per session' },
    botox: { min: 8000, max: 25000, unit: 'per area' },
    'dermal-fillers': { min: 15000, max: 40000, unit: 'per syringe' },
    'chemical-peel': { min: 2000, max: 5000, unit: 'per session' },
    'laser-hair-removal': { min: 2000, max: 8000, unit: 'per session' },
    mnrf: { min: 5000, max: 15000, unit: 'per session' },
    hifu: { min: 20000, max: 60000, unit: 'per session' },
    hydrafacial: { min: 3000, max: 8000, unit: 'per session' },
    'acne-treatment': { min: 2000, max: 10000, unit: 'per session' },
    'vitiligo-treatment': { min: 3000, max: 10000, unit: 'per session' },
    'tattoo-removal': { min: 3000, max: 15000, unit: 'per session' },
    'thread-lift': { min: 25000, max: 80000, unit: 'per area' },
    'body-contouring': { min: 15000, max: 60000, unit: 'per session' },
  }

// ---------------------------------------------------------------------------
// System Prompt
// ---------------------------------------------------------------------------

function buildSystemPrompt(): string {
  const treatmentList = allTreatments
    .map((t) => `- ${t.name} [${t.category.name}]`)
    .join('\n')

  const doctorNames = doctors.map((d) => `${d.name} — ${d.title}`).join(', ')

  const locationNames = locations.map((l) => l.name).join(', ')

  return `You are Vernon, the AI assistant for Vernon Skin & Hair Clinic, Hyderabad's premier surgeon-led dermatology center.

## YOUR PERSONALITY
- Warm, professional, empathetic — like a well-trained clinic coordinator
- Concise — answer in 2-3 short paragraphs max
- Use simple language, avoid jargon
- If asked in Hindi or Telugu, respond in that language

## TOOL USAGE RULES — READ CAREFULLY
You have tools available. Use them ONLY when directly relevant to what the user is asking.

IMPORTANT RULES:
1. Only call 1-2 tools per response. Pick the MOST relevant tool for the question.
2. NEVER call bookAppointment unless the user has EXPLICITLY provided their name AND phone number in the conversation. If they say "I want to book" but haven't given name/phone, ASK for it first.
3. NEVER call generateWhatsAppLink unless the user specifically asks for WhatsApp.
4. NEVER call all tools at once. One question = one tool (sometimes two).
5. If the user asks a general question like "what treatments do you have for hair loss?", use searchTreatments OR recommendTreatment — not both, not all 8 tools.
6. DO NOT invent or fabricate patient names, phone numbers, or appointment details. Only use information the user has actually provided.

## WHICH TOOL TO USE
- "What treatments for [condition]?" → searchTreatments OR recommendTreatment (pick one)
- "How much does [treatment] cost?" → estimateCost
- "Tell me about your clinic/location/hours" → getClinicInfo
- "I want to book" + name + phone given → bookAppointment
- "Do you have videos about [topic]?" → findRelatedVideos
- "Tell me more about [medical topic]" → searchBlogContent
- "Can I continue on WhatsApp?" → generateWhatsAppLink
- General greeting or simple question → NO tool needed, just respond naturally

## CRITICAL RULES
1. NEVER diagnose. Say "Based on what you're describing, [treatment] could be relevant, but Dr. Brahmananda Reddy would need to evaluate you in person."
2. When giving prices, always say they are approximate and suggest a free consultation for exact pricing.
3. DO NOT use markdown formatting like **bold** or ## headers. Write in plain conversational text.
4. Be conversational and helpful. Answer the question asked — don't dump all possible information.
5. For booking: ask for name, phone, and preferred location in ONE message if not provided.

## IMAGE ANALYSIS
When a user uploads an image:
1. Observe what you see (color, texture, patterns)
2. Suggest what conditions it COULD be consistent with
3. ALWAYS say "This is not a diagnosis. Dr. Brahmananda Reddy would need to examine you in person."
4. Suggest booking a consultation

## EMERGENCY DETECTION
If symptoms suggest a medical emergency (severe allergic reaction, spreading infection, difficulty breathing, severe burn):
1. IMMEDIATELY advise calling 108 or visiting nearest hospital
2. Provide Vernon's emergency contact: +91-9100017565

## CLINIC OVERVIEW
Vernon Skin & Hair Clinic — surgeon-led dermatology center in Hyderabad, founded by Dr. R. Brahmananda Reddy.
Doctors: ${doctorNames}
Locations: ${locationNames}
Key facts: 13+ years experience | 15,000+ procedures | 4.9 Google rating (2200+ reviews) | Open 7 days, 11AM-9PM
YouTube: ${youtubeChannelUrl} (45+ educational videos)

## AVAILABLE TREATMENTS (${allTreatments.length} total)
${treatmentList}

Use searchTreatments or recommendTreatment tools to get full details about any treatment.`
}

const systemPrompt = buildSystemPrompt()

export async function POST(req: Request) {
  const { messages: uiMessages } = await req.json()
  const messages = await convertToModelMessages(uiMessages)

  const result = streamText({
    model: 'openai/gpt-4.1-nano',
    system: systemPrompt,
    messages,
    tools: {
      // ---------------------------------------------------------------
      // Tool 1: Search treatments by name, category, or keyword
      // ---------------------------------------------------------------
      searchTreatments: {
        description:
          'Search for treatments by name, keyword, or category. Returns treatment details. Use when user asks about specific treatments.',
        inputSchema: z.object({
          query: z
            .string()
            .describe(
              'Search query — treatment name or keyword (e.g., "hair transplant", "acne", "laser")'
            ),
        }),
        execute: async (params: { query: string }) => {
          const q = params.query.toLowerCase()
          const matches = allTreatments.filter(
            (t) =>
              t.name.toLowerCase().includes(q) ||
              t.shortDescription.toLowerCase().includes(q) ||
              t.category.name.toLowerCase().includes(q) ||
              t.suitableFor.some((s) => s.toLowerCase().includes(q)) ||
              t.technologies.some((tech) => tech.toLowerCase().includes(q)) ||
              t.id.toLowerCase().includes(q)
          )

          if (matches.length === 0) {
            return {
              found: false,
              message: `No treatments found matching "${params.query}". Try a different keyword.`,
              availableCategories: [
                ...new Set(allTreatments.map((t) => t.category.name)),
              ],
            }
          }

          return {
            found: true,
            count: matches.length,
            treatments: matches.slice(0, 5).map((t) => ({
              name: t.name,
              category: t.category.name,
              description: t.shortDescription,
              duration: t.duration,
              sessions: t.sessions,
              downtime: t.downtime,
              suitableFor: t.suitableFor,
              technologies: t.technologies,
              faqs: t.faqs.slice(0, 3),
              slug: `${t.category.slug}/${t.slug}`,
            })),
          }
        },
      },

      // ---------------------------------------------------------------
      // Tool 2: Recommend treatments based on a symptom or concern
      // ---------------------------------------------------------------
      recommendTreatment: {
        description:
          'Recommend treatments based on a patient concern or symptom. Use when user describes a problem (e.g., "hair loss", "dark spots").',
        inputSchema: z.object({
          concern: z
            .string()
            .describe(
              'The patient concern or symptom (e.g., "hair loss", "pigmentation", "acne scars")'
            ),
        }),
        execute: async (params: { concern: string }) => {
          const q = params.concern.toLowerCase()
          const scored = allTreatments
            .map((t) => {
              let score = 0
              t.suitableFor.forEach((s) => {
                if (s.toLowerCase().includes(q)) score += 3
              })
              if (t.name.toLowerCase().includes(q)) score += 2
              if (t.shortDescription.toLowerCase().includes(q)) score += 1
              t.faqs.forEach((f) => {
                if (
                  f.question.toLowerCase().includes(q) ||
                  f.answer.toLowerCase().includes(q)
                )
                  score += 1
              })
              return { treatment: t, score }
            })
            .filter((r) => r.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 4)

          if (scored.length === 0) {
            return {
              found: false,
              message: `I couldn't find a specific treatment match for "${params.concern}". I'd recommend booking a consultation with Dr. Brahmananda Reddy for a personalized assessment.`,
            }
          }

          return {
            found: true,
            recommendations: scored.map((r) => ({
              name: r.treatment.name,
              category: r.treatment.category.name,
              why: r.treatment.shortDescription,
              duration: r.treatment.duration,
              sessions: r.treatment.sessions,
              downtime: r.treatment.downtime,
              relevanceScore: r.score,
            })),
            suggestion:
              'I recommend booking a free consultation for a personalized treatment plan.',
          }
        },
      },

      // ---------------------------------------------------------------
      // Tool 3: Estimate treatment cost
      // ---------------------------------------------------------------
      estimateCost: {
        description:
          'Get approximate cost range for a treatment. Use when user asks about pricing or cost.',
        inputSchema: z.object({
          treatmentId: z
            .string()
            .describe(
              'Treatment ID or keyword (e.g., "hair-transplant", "botox", "pico-laser")'
            ),
        }),
        execute: async (params: { treatmentId: string }) => {
          const q = params.treatmentId.toLowerCase().replace(/\s+/g, '-')
          let match = priceRanges[q]
          if (!match) {
            const key = Object.keys(priceRanges).find(
              (k) => k.includes(q) || q.includes(k)
            )
            if (key) match = priceRanges[key]
          }

          if (!match) {
            return {
              found: false,
              message: `I don't have a price range for "${params.treatmentId}". Pricing is best discussed during a free consultation with Dr. Brahmananda Reddy.`,
              availableTreatments: Object.keys(priceRanges),
            }
          }

          const treatment = allTreatments.find(
            (t) => t.id.includes(q) || q.includes(t.id)
          )

          return {
            found: true,
            treatment: treatment?.name || params.treatmentId,
            priceRange: {
              min: `₹${match.min.toLocaleString('en-IN')}`,
              max: `₹${match.max.toLocaleString('en-IN')}`,
              unit: match.unit,
            },
            disclaimer:
              'These are approximate ranges. Exact pricing depends on your specific case and is determined during a free consultation with Dr. Brahmananda Reddy.',
            freeConsultation: true,
          }
        },
      },

      // ---------------------------------------------------------------
      // Tool 4: Find relevant YouTube videos
      // ---------------------------------------------------------------
      findRelatedVideos: {
        description:
          'Find relevant YouTube videos from Vernon Clinic channel. Use when user asks about videos or wants to learn more visually.',
        inputSchema: z.object({
          topic: z
            .string()
            .describe('Topic to search videos for'),
          language: z
            .enum(['english', 'telugu', 'bilingual', 'any'])
            .optional()
            .describe('Preferred language. Defaults to any.'),
        }),
        execute: async (params: { topic: string; language?: string }) => {
          const q = params.topic.toLowerCase()
          let matches = youtubeVideos.filter(
            (v) =>
              v.title.toLowerCase().includes(q) ||
              v.category.toLowerCase().includes(q.replace(/\s+/g, '-'))
          )

          if (
            params.language &&
            params.language !== 'any' &&
            matches.length > 0
          ) {
            const langFiltered = matches.filter(
              (v) => v.language === params.language
            )
            if (langFiltered.length > 0) matches = langFiltered
          }

          if (matches.length === 0) {
            return {
              found: false,
              channelUrl: youtubeChannelUrl,
              message: `No specific video found for "${params.topic}", but you can explore all our videos at ${youtubeChannelUrl}`,
            }
          }

          return {
            found: true,
            videos: matches.slice(0, 3).map((v) => ({
              title: v.title,
              url: `https://youtube.com/watch?v=${v.id}`,
              language: v.language,
              category: v.category,
            })),
            channelUrl: youtubeChannelUrl,
          }
        },
      },

      // ---------------------------------------------------------------
      // Tool 5: Get clinic info (location, hours, doctors, contact)
      // ---------------------------------------------------------------
      getClinicInfo: {
        description:
          'Get clinic information — locations, addresses, phone numbers, hours, or doctor details. Use when user asks about the clinic.',
        inputSchema: z.object({
          query: z
            .enum([
              'all-locations',
              'banjara-hills',
              'manikonda',
              'gachibowli',
              'doctors',
              'hours',
            ])
            .describe('What info to retrieve'),
        }),
        execute: async (params: { query: string }) => {
          if (params.query === 'doctors') {
            return {
              doctors: doctors.map((d) => ({
                name: d.name,
                title: d.title,
                experience: d.experience,
                qualifications: d.qualifications,
                specializations: d.specializations,
                memberships: d.memberships,
                awards: d.awards.map(
                  (a) => `${a.title} (${a.year})`
                ),
                trainingRoles: d.trainingRoles,
                bio: d.bio,
              })),
            }
          }

          if (params.query === 'hours') {
            return {
              hours: locations.map((l) => ({
                location: l.name,
                timings: l.timings,
              })),
            }
          }

          const targetLocations =
            params.query === 'all-locations'
              ? locations
              : locations.filter(
                  (l) =>
                    l.slug === params.query ||
                    l.name.toLowerCase().replace(/\s/g, '-') === params.query
                )

          return {
            locations: targetLocations.map((l) => ({
              name: l.name,
              address: l.address,
              phone: l.phone,
              whatsapp: l.whatsapp,
              email: l.email,
              hours: l.timings
                .map((t) => `${t.days}: ${t.hours}`)
                .join(', '),
              services: l.services,
              googleMapsUrl: l.mapUrl,
            })),
          }
        },
      },

      // ---------------------------------------------------------------
      // Tool 6: Search blog/educational content
      // ---------------------------------------------------------------
      searchBlogContent: {
        description:
          'Search blog posts and educational content. Use when user asks in-depth questions about a condition or wants to read more.',
        inputSchema: z.object({
          query: z
            .string()
            .describe(
              'Search query (e.g., "hair transplant fail", "melasma", "pico laser")'
            ),
        }),
        execute: async (params: { query: string }) => {
          const q = params.query.toLowerCase()
          const matches = blogPosts.filter(
            (p) =>
              p.title.toLowerCase().includes(q) ||
              p.excerpt.toLowerCase().includes(q) ||
              p.category.toLowerCase().includes(q) ||
              p.content.toLowerCase().includes(q)
          )

          if (matches.length === 0) {
            return {
              found: false,
              message: `No blog posts found for "${params.query}".`,
            }
          }

          return {
            found: true,
            posts: matches.slice(0, 3).map((p) => ({
              title: p.title,
              excerpt: p.excerpt,
              category: p.category,
              author: p.author,
              readTime: p.readTime,
              url: `/blog/${p.slug}`,
              contentPreview: p.content.slice(0, 500),
            })),
          }
        },
      },

      // ---------------------------------------------------------------
      // Tool 7: Book appointment (with validation)
      // ---------------------------------------------------------------
      bookAppointment: {
        description:
          'Book a consultation appointment. ONLY call this when the user has explicitly provided their real name AND real phone number in the conversation. NEVER invent or guess names/phones.',
        inputSchema: z.object({
          patientName: z
            .string()
            .min(2, 'Patient name is required')
            .describe('Patient full name — must be provided by the user'),
          phone: z
            .string()
            .min(10, 'Valid phone number is required')
            .describe('Phone number — must be provided by the user'),
          treatment: z
            .string()
            .describe(
              'Treatment or concern. Use "General consultation" if not specified'
            ),
          location: z
            .enum(['Banjara Hills', 'Manikonda', 'Gachibowli'])
            .describe('Preferred clinic location'),
          preferredDate: z
            .string()
            .optional()
            .describe('Preferred date if mentioned'),
          preferredTime: z
            .string()
            .optional()
            .describe('Preferred time if mentioned'),
          notes: z
            .string()
            .optional()
            .describe('Any additional context from the conversation'),
        }),
        execute: async (params: {
          patientName: string
          phone: string
          treatment: string
          location: string
          preferredDate?: string
          preferredTime?: string
          notes?: string
        }) => {
          // Reject empty or obviously fake bookings
          if (
            !params.patientName ||
            params.patientName.trim().length < 2 ||
            !params.phone ||
            params.phone.replace(/\D/g, '').length < 10
          ) {
            return {
              success: false as const,
              message:
                'I need your full name and a valid 10-digit phone number to book an appointment. Could you please provide those?',
            }
          }

          console.log(
            '\n📋 NEW BOOKING REQUEST:',
            JSON.stringify(params, null, 2),
            '\n'
          )

          // Post to Google Sheets webhook if configured
          if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
            try {
              await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  ...params,
                  timestamp: new Date().toISOString(),
                  source: 'website-chatbot',
                }),
              })
            } catch (e) {
              console.error('Google Sheets webhook failed:', e)
            }
          }

          // Post to Notion database
          const notionResult = await postBookingToNotion(params)
          if (notionResult.success) {
            console.log('✅ Notion sync OK:', notionResult.pageUrl)
          }

          return {
            success: true as const,
            message: `Appointment request received for ${params.patientName}. Our care coordinator will contact you at ${params.phone} within 30 minutes during working hours (11 AM – 9 PM) to confirm your appointment.`,
            bookingDetails: {
              name: params.patientName,
              phone: params.phone,
              treatment: params.treatment,
              location: params.location,
              date: params.preferredDate || 'To be confirmed',
              time: params.preferredTime || 'To be confirmed',
            },
          }
        },
      },

      // ---------------------------------------------------------------
      // Tool 8: Generate WhatsApp handoff link
      // ---------------------------------------------------------------
      generateWhatsAppLink: {
        description:
          'Generate a WhatsApp link. ONLY call when the user explicitly asks to continue on WhatsApp.',
        inputSchema: z.object({
          summary: z
            .string()
            .describe(
              'A concise summary of the conversation and user interest'
            ),
          location: z
            .enum(['Banjara Hills', 'Manikonda', 'Gachibowli'])
            .optional()
            .describe('Preferred location if mentioned'),
        }),
        execute: async (params: {
          summary: string
          location?: string
        }) => {
          const phoneNumbers: Record<string, string> = {
            'Banjara Hills': '919100017565',
            Manikonda: '919100017567',
            Gachibowli: '919100017566',
          }
          const phone = params.location
            ? phoneNumbers[params.location]
            : '919100017565'
          const text = encodeURIComponent(
            `Hi, I was chatting with Vernon AI about: ${params.summary}. I'd like to continue the conversation.`
          )
          return {
            success: true,
            whatsappUrl: `https://wa.me/${phone}?text=${text}`,
            message: `Here's your WhatsApp link to continue with our team.`,
          }
        },
      },
    },
    stopWhen: stepCountIs(3),
  })

  return result.toUIMessageStreamResponse()
}
