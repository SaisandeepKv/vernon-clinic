import { generateObject } from 'ai'
import { z } from 'zod'
import { NextResponse } from 'next/server'

export const maxDuration = 30

// ---------------------------------------------------------------------------
// Zod schema for structured analysis output
// ---------------------------------------------------------------------------

const SkinAnalysisSchema = z.object({
  isValidImage: z
    .boolean()
    .describe('Whether the image is a valid face or scalp/hair photo. ONLY face and scalp/hair photos are valid. Any other image (landscape, object, text, body parts other than face/scalp, pets, food, etc.) must be marked as invalid.'),
  invalidReason: z
    .string()
    .optional()
    .describe('If not valid, a short friendly reason. e.g. "Please upload a clear photo of your face or scalp so we can analyze it."'),
  imageType: z
    .enum(['face', 'scalp', 'hair', 'other'])
    .describe('What type of photo: face, scalp, hair, or other'),
  overallScore: z
    .number()
    .min(0)
    .max(100)
    .describe('Overall skin/hair health score from 0-100. 80+ is excellent, 60-79 good, 40-59 needs attention, below 40 needs professional care'),
  estimatedSkinAge: z
    .number()
    .min(15)
    .max(80)
    .optional()
    .describe('Estimated skin age based on visible signs — wrinkles, elasticity, pigmentation, texture. Can differ from actual age. Only for face photos.'),
  summary: z
    .string()
    .describe('One-sentence friendly summary of the analysis'),
  strengths: z
    .array(z.string())
    .describe('2-3 positive observations about the skin/hair'),
  concerns: z
    .array(
      z.object({
        name: z.string().describe('Human-readable concern name (e.g., "Hyperpigmentation", "Active Acne", "Hair Thinning")'),
        severity: z.enum(['mild', 'moderate', 'severe']).describe('Severity level'),
        area: z.string().describe('Where this is observed (e.g., "cheeks", "forehead", "crown area")'),
        description: z.string().describe('Brief description of what you observe'),
      })
    )
    .describe('List of detected concerns. Can be empty if skin/hair looks healthy.'),
  skinType: z
    .enum(['dry', 'oily', 'combination', 'normal', 'sensitive', 'unknown'])
    .optional()
    .describe('Estimated skin type. Only for face photos.'),
  hairAnalysis: z
    .object({
      density: z.enum(['thick', 'moderate', 'thin', 'very_thin']).describe('Hair density assessment'),
      scalpVisibility: z.enum(['none', 'minimal', 'moderate', 'significant']).describe('How visible the scalp is through hair'),
      pattern: z.string().optional().describe('Pattern of hair loss if applicable'),
      stage: z.string().optional().describe('For male hair loss: Norwood Scale (e.g., "Norwood III"). For female hair loss: Ludwig Scale (e.g., "Ludwig I"). Only if hair loss is visible.'),
    })
    .optional()
    .describe('Hair-specific analysis. Only for hair/scalp photos.'),
  personalizedMessage: z
    .string()
    .describe('A warm 2-3 sentence message: acknowledge what you see, mention what can be improved, and encourage them to meet the doctor for a proper assessment. Do NOT name specific treatments or packages. Example: "Your skin has good elasticity, which is a great sign! The pigmentation on your cheeks is something Dr. Reddy can assess in person and suggest the right approach for. A consultation would give you a clear roadmap."'),
})

// ---------------------------------------------------------------------------
// System prompt
// ---------------------------------------------------------------------------

const ANALYSIS_PROMPT = `You are a dermatology screening assistant for Vernon Skin & Hair Clinic, Hyderabad — led by Dr. Brahmananda Reddy (ISHRS member, 13+ years experience).

Analyze this photo and provide a structured skin/hair health assessment.

STRICT IMAGE VALIDATION:
- ONLY accept clear photos of a person's FACE or SCALP/HAIR.
- REJECT everything else: landscapes, objects, text, screenshots, pets, food, full body shots, hands, legs, etc.
- If rejected, set isValidImage=false and give a friendly reason asking them to upload a face or scalp photo.

RULES:
1. You are NOT making a medical diagnosis. You are observing visible characteristics only.
2. Score health 0-100 based on visible texture, tone, clarity, hydration, hair density, scalp health.
3. Rate each concern as mild/moderate/severe.
4. Be encouraging but honest — strengths first, then concerns.
5. For face photos: assess texture, tone, hydration, pores, acne, pigmentation, wrinkles, dark circles.
6. For hair/scalp photos: assess density, pattern of loss, scalp visibility, scalp health.
7. Use Indian skin tone context (Fitzpatrick III-V).
8. Be specific about which AREAS show concerns.

SKIN AGE:
- Estimate the skin's apparent age based on wrinkles, fine lines, elasticity, pigmentation, pore size, texture.
- Skin age can differ from actual age. Indian skin often ages more slowly due to melanin.
- Only provide for face photos.

HAIR LOSS STAGING:
- Male-pattern: Norwood Scale I–VII (e.g., "Norwood II", "Norwood IV")
- Female-pattern: Ludwig Scale I–III (e.g., "Ludwig I", "Ludwig II")
- Only if hair loss is visible.

PERSONALIZED MESSAGE:
- Acknowledge their concerns warmly
- DO NOT suggest specific treatments, packages, or procedures by name
- Instead, encourage them to meet Dr. Reddy for a proper in-person assessment
- Tone: caring doctor, not salesy
- Example: "The concerns we've identified are very common and highly treatable. A consultation with Dr. Reddy would give you a personalized treatment roadmap tailored to your skin."

Return ONLY the structured JSON.`

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { image, mediaType, userMessage } = body

    if (!image) {
      return NextResponse.json(
        { success: false, error: 'No image provided' },
        { status: 400 }
      )
    }

    const userContent: Array<{ type: 'text'; text: string } | { type: 'image'; image: string; mimeType?: string }> = []

    userContent.push({
      type: 'image',
      image: image.startsWith('data:') ? image.split(',')[1] : image,
      mimeType: mediaType || 'image/jpeg',
    })

    userContent.push({
      type: 'text',
      text: userMessage
        ? `User's description: "${userMessage}". Analyze the image considering this context.`
        : 'Analyze this skin/hair photo.',
    })

    const { object: analysis } = await generateObject({
      model: 'google/gemini-2.5-flash',
      schema: SkinAnalysisSchema,
      system: ANALYSIS_PROMPT,
      messages: [{ role: 'user', content: userContent }],
    })

    // Reject non-face/hair images
    if (!analysis.isValidImage || analysis.imageType === 'other') {
      return NextResponse.json({
        success: false,
        error: analysis.invalidReason || 'Please upload a clear photo of your face or scalp so we can analyze it.',
      })
    }

    return NextResponse.json({
      success: true,
      analysis: {
        overallScore: analysis.overallScore,
        estimatedSkinAge: analysis.estimatedSkinAge,
        imageType: analysis.imageType,
        summary: analysis.summary,
        strengths: analysis.strengths,
        concerns: analysis.concerns,
        skinType: analysis.skinType,
        hairAnalysis: analysis.hairAnalysis,
        personalizedMessage: analysis.personalizedMessage,
      },
      disclaimer:
        'This is an AI-powered screening tool, not a medical diagnosis. For accurate assessment, please consult Dr. Reddy at Vernon Skin & Hair Clinic.',
    })
  } catch (error) {
    console.error('Skin analysis error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to analyze image. Please try again with a clearer photo.' },
      { status: 500 }
    )
  }
}
