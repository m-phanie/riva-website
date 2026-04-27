import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request) {
  try {
    const { message, page, language, drivers } = await request.json()

    console.log('Chat API - Received request with drivers:', drivers)

    const languageInstruction = language === 'kinyarwanda' 
      ? 'Respond in Kinyarwanda language. ' 
      : 'Respond in English language. '

    const pageContext = page 
      ? `The user is currently on the page: ${page}. Adapt your response accordingly. ` 
      : ''

    let driversContext = ''
    if (drivers && drivers.length > 0) {
      const driversList = drivers.map(driver => 
        `- ${driver.name} (Email: ${driver.email}, Phone: ${driver.phone}, Plate: ${driver.plate}, Location: ${driver.location}, Fuel: ${driver.fuel}%, Speed: ${driver.speed} km/h, Status: ${driver.status || 'Active'})`
      ).join('\n')
      
      driversContext = `Current Drivers in the Fleet:\n${driversList}\n\nYou can provide information about these drivers when asked.`
      console.log('Chat API - Drivers context:', driversContext)
    } else {
      console.log('Chat API - No drivers data received')
    }

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
- Answer questions about drivers in the fleet when provided

Knowledge:
RIVA includes:
- AI safety monitoring
- Alcohol detection system
- Fuel theft detection
- GPS tracking and geofencing
- Real-time alerts
- Fleet management dashboard
- Driver management system

Behavior:
- Be helpful, clear, and professional
- Give actionable advice
- Adapt answers based on user page context
- When asked about drivers, use the provided driver information

${languageInstruction}
${pageContext}
${driversContext}
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
