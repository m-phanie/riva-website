import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request) {
  try {
    const { message, page, language } = await request.json()

    const languageInstruction = language === 'kinyarwanda' 
      ? 'Respond in Kinyarwanda language. ' 
      : 'Respond in English language. '

    const pageContext = page 
      ? `The user is currently on the page: ${page}. Adapt your response accordingly. ` 
      : ''

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are RIVA AI, a real-time intelligent vehicle assistant.

Your role:
- Help users understand RIVA features
- Assist drivers, fleet managers, and organizations
- Provide safety insights and recommendations

Knowledge:
RIVA includes:
- AI safety monitoring
- Alcohol detection system
- Fuel theft detection
- GPS tracking and geofencing
- Real-time alerts
- Fleet management dashboard

Behavior:
- Be helpful, clear, and professional
- Give actionable advice
- Adapt answers based on user page context

${languageInstruction}
${pageContext}
Never mention OpenAI or ChatGPT.`
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    })

    const response = completion.choices[0].message.content

    return Response.json({ response })
  } catch (error) {
    console.error('OpenAI API error:', error)
    return Response.json(
      { response: 'I apologize, but I\'m having trouble connecting right now. Please try again later.' },
      { status: 500 }
    )
  }
}
