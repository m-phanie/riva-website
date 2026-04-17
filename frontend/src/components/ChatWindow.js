'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Minimize2, Mic, Globe, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function ChatWindow({ onClose }) {
  const pathname = usePathname()
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: "Hi! I'm RIVA AI, your intelligent assistant. I can help you with:\n\n• Customer support & questions about RIVA\n• Website navigation\n• Fleet management assistance\n• General inquiries\n\nHow can I help you today?"
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [language, setLanguage] = useState('english')
  const messagesEndRef = useRef(null)

  const suggestions = [
    "How does RIVA improve safety?",
    "Explain fuel monitoring",
    "Show fleet features"
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser')
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = language === 'kinyarwanda' ? 'rw-RW' : 'en-US'

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setInput(transcript)
      setIsListening(false)
    }

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion)
    handleSubmit(new Event('submit'), suggestion)
  }

  const handleSubmit = async (e, messageText = null) => {
    e.preventDefault()
    const messageToSend = messageText || input
    if (!messageToSend.trim()) return

    const userMessage = {
      id: messages.length + 1,
      role: 'user',
      content: messageToSend
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: messageToSend,
          page: pathname,
          language: language
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessages(prev => [...prev, {
          id: messages.length + 2,
          role: 'assistant',
          content: data.response
        }])
      } else {
        // Fallback to rule-based response if API fails
        const aiResponse = generateAIResponse(messageToSend)
        setMessages(prev => [...prev, {
          id: messages.length + 2,
          role: 'assistant',
          content: aiResponse
        }])
      }
    } catch (error) {
      console.error('Error calling AI API:', error)
      // Fallback to rule-based response on error
      const aiResponse = generateAIResponse(messageToSend)
      setMessages(prev => [...prev, {
        id: messages.length + 2,
        role: 'assistant',
        content: aiResponse
      }])
    } finally {
      setIsTyping(false)
    }
  }

  const generateAIResponse = (userInput) => {
    const input = userInput.toLowerCase().trim()

    // Customer Support - Pricing
    if (input.includes('price') || input.includes('cost') || input.includes('pricing') || input.includes('how much') || input.includes('pay')) {
      return "Great question about pricing! RIVA offers flexible pricing plans that scale with your fleet size. We have options for small businesses, mid-sized fleets, and enterprise solutions.\n\nFor accurate pricing tailored to your needs, I'd recommend reaching out to our sales team:\n\n📧 Email: sales@riva.rw\n📞 Phone: +250 788 123 456\n\nThey'll provide you with a customized quote based on your specific requirements. Would you like me to help you with anything else about our services?"
    }

    // Customer Support - Help/Contact
    if (input.includes('support') || input.includes('help') || input.includes('contact') || input.includes('reach') || input.includes('talk to')) {
      return "I'm here to help! Our dedicated support team is available 24/7 to assist you with any questions or issues. Here's how you can reach them:\n\n📧 Email: support@riva.rw\n📞 Phone: +250 788 123 456\n💬 Live Chat: Available right here on our website\n\nYou can also visit our Contact page for more options and a contact form. Is there something specific you need help with that I can assist with right now?"
    }

    // Features
    if (input.includes('feature') || input.includes('what can riva do') || input.includes('what does riva') || input.includes('capabilities') || input.includes('offer')) {
      return "RIVA is packed with powerful features to transform your fleet management! Here's what we offer:\n\n🚗 **Real-time Vehicle Tracking** - Know exactly where your vehicles are at all times\n🤖 **AI-Powered Accident Prevention** - Proactive safety monitoring and alerts\n⛽ **Fuel Theft Detection** - Protect your fuel assets with smart monitoring\n🔧 **Predictive Maintenance** - Fix issues before they become problems\n👨‍💼 **Driver Behavior Monitoring** - Improve driving habits and reduce risks\n📍 **GPS Geofencing** - Set boundaries and get instant alerts\n🗣️ **Voice Assistant** - Kinyarwanda supported for local accessibility\n📊 **24/7 Monitoring** - Never miss an important alert\n\nWhich feature would you like to know more about?"
    }

    // Navigation
    if (input.includes('where is') || input.includes('find') || input.includes('navigate') || input.includes('page') || input.includes('go to')) {
      return "I can help you find your way around! Here are the main pages on our website:\n\n🏠 **Home** - Overview of RIVA and our key features\nℹ️ **About** - Learn about our company, mission, and team\n📞 **Contact** - Get in touch with our team\n🔐 **Login** - Access your fleet management dashboard\n📝 **Register** - Create a new account to get started\n\nJust let me know which page you're looking for, and I can provide more specific information about what you'll find there!"
    }

    // Register
    if (input.includes('register') || input.includes('sign up') || input.includes('create account') || input.includes('new account')) {
      return "Creating an account is quick and easy! You can register by clicking the 'Register' button in the navigation menu or by visiting /register directly.\n\nThe registration process takes less than 2 minutes and will give you full access to our fleet management dashboard where you can:\n\n• Track your vehicles in real-time\n• Monitor driver behavior\n• Set up alerts and notifications\n• Generate detailed reports\n\nReady to get started? Just head over to the registration page!"
    }

    // Login
    if (input.includes('login') || input.includes('sign in') || input.includes('access account') || input.includes('log in')) {
      return "To access your account, click the 'Login' button in the navigation menu or visit /login. Once logged in, you'll have full access to your personalized fleet management dashboard.\n\nIf you're having trouble logging in or forgot your password, there's a 'Forgot password?' link on the login page that will help you recover your account.\n\nNeed any other assistance with your account?"
    }

    // Fleet Management
    if (input.includes('fleet') || input.includes('vehicle') || input.includes('track') || input.includes('monitor')) {
      return "Fleet management is at the heart of what we do! Once you log in to your dashboard, you'll have powerful tools to manage your entire fleet:\n\n🗺️ **Real-time Tracking** - See all your vehicles on a live map\n📈 **Performance Analytics** - Track efficiency and identify areas for improvement\n⚠️ **Instant Alerts** - Get notified about important events immediately\n📊 **Custom Reports** - Generate reports for management and compliance\n🎯 **Geofencing** - Set boundaries and receive alerts when vehicles leave designated areas\n\nTo access these features, you'll need to log in to your account. Would you like help with registration or login?"
    }

    // Fuel
    if (input.includes('fuel') || input.includes('theft') || input.includes('gas') || input.includes('petrol')) {
      return "Fuel theft is a major concern for fleet operators, and RIVA has you covered! Our intelligent fuel theft detection system:\n\n🔍 **Monitors fuel levels in real-time** - Detects sudden drops or unusual consumption patterns\n⚡ **Sends instant alerts** - You'll know immediately if something suspicious happens\n📊 **Tracks fuel efficiency** - Identify which vehicles are using fuel most efficiently\n💰 **Saves money** - Our customers report significant reduction in fuel losses\n\nThe system works seamlessly in the background and provides detailed reports on fuel usage across your entire fleet. Want to know more about how it works?"
    }

    // Safety/Accidents
    if (input.includes('accident') || input.includes('safety') || input.includes('prevent') || input.includes('protect')) {
      return "Safety is our top priority at RIVA! Our AI-powered system works around the clock to prevent accidents:\n\n👁️ **Real-time driver monitoring** - Detects risky behaviors like speeding, harsh braking\n🍺 **Alcohol detection** - Identifies signs of impairment before driving begins\n⚠️ **Hazard alerts** - Warns drivers about road conditions and potential dangers\n🔧 **Predictive maintenance** - Catches mechanical issues before they cause accidents\n🛣️ **Road condition analysis** - Factors in weather and traffic data\n\nThe results speak for themselves - our customers have seen a 40% reduction in accidents since implementing RIVA. Safety isn't just a feature, it's our mission."
    }

    // About RIVA
    if (input.includes('what is riva') || input.includes('about riva') || input.includes('company') || input.includes('who are you')) {
      return "Great question! RIVA stands for Real-time Intelligence Vehicle Assistant. We're a next-generation AI-powered vehicle intelligence company based here in Rwanda.\n\n🎯 **Our Mission**: Make roads safer for everyone by preventing accidents and optimizing fleet performance\n📊 **Our Impact**: Currently protecting over 10,000 vehicles across Rwanda and beyond\n🤖 **Our Technology**: Proprietary AI system called RIVA SOUL that learns vehicle patterns and provides intelligent predictions\n🌍 **Our Reach**: Supporting multiple languages including Kinyarwanda to serve local communities\n\nWe're passionate about using technology to save lives and make fleet management smarter. Want to know more about our team or specific features?"
    }

    // Greetings
    if (input.includes('hello') || input.includes('hi') || input.includes('hey') || input.includes('good morning') || input.includes('good afternoon')) {
      return "Hello there! 👋 Welcome to RIVA! I'm your AI assistant, and I'm here to help you with anything you need.\n\nI can assist you with:\n• Questions about RIVA's features and services\n• Navigating the website\n• Fleet management information\n• Getting in touch with our team\n\nWhat would you like to know today?"
    }

    // Thanks
    if (input.includes('thank') || input.includes('thanks') || input.includes('appreciate')) {
      return "You're very welcome! 😊 I'm always here to help whenever you need assistance with RIVA. Whether you have questions about our services, need help navigating the site, or want to learn more about fleet management, don't hesitate to ask.\n\nIs there anything else I can help you with today?"
    }

    // Bye
    if (input.includes('bye') || input.includes('goodbye') || input.includes('see you')) {
      return "Goodbye! 👋 It was great chatting with you. Thank you for choosing RIVA!\n\nRemember, I'm here 24/7 whenever you need assistance. Safe travels, and feel free to come back anytime!"
    }

    // Default response with helpful suggestions
    return "I appreciate your question! While I'm still learning, I'd love to help you find the information you need.\n\nI can assist with topics like:\n\n💰 **Pricing and plans**\n🚗 **Features and capabilities**\n📍 **Website navigation**\n📞 **Contact information**\n🛡️ **Safety and accident prevention**\n⛽ **Fuel theft detection**\n\nCould you rephrase your question or let me know which topic you're interested in? I'm here to help!"
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-gray-900 rounded-t-2xl md:rounded-2xl shadow-2xl border border-gray-700 overflow-hidden flex flex-col w-full md:w-[340px] h-[80vh] md:h-[460px] fixed bottom-0 left-0 md:bottom-auto md:left-auto md:relative z-50"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
            <Bot className="w-6 h-6 text-gray-800" />
          </div>
          <div>
            <h3 className="text-white font-semibold">RIVA AI</h3>
            <p className="text-white text-xs">Online • Ready to help</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLanguage(language === 'english' ? 'kinyarwanda' : 'english')}
            className="text-white hover:text-white/80 transition-colors p-1"
            title="Toggle language"
          >
            <Globe className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="text-white hover:text-white/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-900">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                  <Bot className="w-5 h-5 text-gray-200" />
                </div>
              )}
              <div
                className={`max-w-[80%] px-4 py-2 rounded-xl ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-800 text-gray-100 shadow-sm'
                }`}
              >
                <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
              </div>
              {message.role === 'user' && (
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                  <User className="w-5 h-5 text-gray-200" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 justify-start"
          >
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
              <Bot className="w-5 h-5 text-gray-200" />
            </div>
            <div className="bg-gray-800 px-4 py-2 rounded-xl shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div className="px-4 pb-2 bg-gray-900">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="bg-gray-800 hover:bg-gray-700 rounded-full px-3 py-1 text-sm text-gray-200 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-3 bg-gray-900 border-t border-gray-700 flex gap-2 items-center">
        <button
          type="button"
          onClick={startListening}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            isListening 
              ? 'bg-red-500 text-white animate-pulse' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          title="Voice input"
        >
          <Mic className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={language === 'english' ? 'Type your message...' : 'Andika ubutumwa...'}
          className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-white placeholder-gray-400 text-sm transition-all"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </motion.div>
  )
}
