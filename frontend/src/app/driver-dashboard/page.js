'use client'

import { motion } from 'framer-motion'
import { Car, AlertTriangle, Mic, Activity, MapPin, MessageSquare, Send, X, Minimize2, Maximize2 } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function DriverDashboard() {
  const [user, setUser] = useState(null)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isChatMinimized, setIsChatMinimized] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, sender: 'manager', text: 'Hello! Welcome to the team. Let me know if you need any assistance.', time: '10:30 AM' }
  ])

  useEffect(() => {
    // Check if user is authenticated and has driver role
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (!token || !userData) {
      window.location.href = '/login'
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== 'driver') {
      window.location.href = '/access-denied'
      return
    }

    setUser(parsedUser)
    
    // Load chat history
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]')
    const userMessages = chatHistory.filter(msg => 
      (msg.sender === 'driver' && msg.senderId === parsedUser.id) || 
      (msg.sender === 'manager' && msg.recipientId === parsedUser.id)
    )
    setMessages(userMessages)
  }, [])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'driver',
        senderId: user.id,
        senderName: user.name,
        recipientId: 'manager',
        recipientName: 'Manager',
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      
      // Save to shared localStorage
      const chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]')
      chatHistory.push(newMessage)
      localStorage.setItem('chatHistory', JSON.stringify(chatHistory))
      
      setMessages([...messages, newMessage])
      setMessage('')
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] dark:from-[#0f172a] dark:to-[#1e293b]">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-full flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#0f172a] dark:text-white">RIVA</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Driver Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Welcome, {user.name}
              </span>
              <button
                onClick={() => {
                  localStorage.removeItem('token')
                  localStorage.removeItem('user')
                  window.location.href = '/login'
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-blue-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Today</span>
            </div>
            <h3 className="text-3xl font-bold text-[#0f172a] dark:text-white mb-2">245 km</h3>
            <p className="text-gray-600 dark:text-gray-300">Distance Traveled</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Active</span>
            </div>
            <h3 className="text-3xl font-bold text-[#0f172a] dark:text-white mb-2">2</h3>
            <p className="text-gray-600 dark:text-gray-300">Alerts</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <MapPin className="w-8 h-8 text-green-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Current</span>
            </div>
            <h3 className="text-3xl font-bold text-[#0f172a] dark:text-white mb-2">Kigali</h3>
            <p className="text-gray-600 dark:text-gray-300">Location</p>
          </motion.div>
        </div>

        {/* AI Assistant Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-2xl p-8 shadow-lg mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">RIVA SOUL</h2>
              <p className="text-white/80">AI Assistant - Voice Command Ready</p>
            </div>
            <button className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <Mic className="w-8 h-8 text-white" />
            </button>
          </div>
        </motion.div>

        {/* Recent Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-bold text-[#0f172a] dark:text-white mb-4">Recent Alerts</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
              <div className="flex-1">
                <p className="font-medium text-[#0f172a] dark:text-white">Alcohol Detection Alert</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">10:30 AM - Vehicle #RWA-123</p>
              </div>
              <span className="px-3 py-1 bg-yellow-500 text-white text-sm rounded-full">Warning</span>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Activity className="w-6 h-6 text-blue-500" />
              <div className="flex-1">
                <p className="font-medium text-[#0f172a] dark:text-white">Speed Limit Warning</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">09:15 AM - Vehicle #RWA-456</p>
              </div>
              <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">Info</span>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Chat Widget */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`fixed bottom-6 right-6 z-50 ${isChatMinimized ? 'w-16' : 'w-96'}`}
      >
        {!isChatOpen && !isChatMinimized && (
          <button
            onClick={() => setIsChatOpen(true)}
            className="w-16 h-16 bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300"
          >
            <MessageSquare className="w-8 h-8 text-white" />
          </button>
        )}

        {isChatOpen && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-[#10B981] to-[#059669] p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Chat with Manager</h3>
                  <p className="text-white/80 text-sm">Online</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsChatMinimized(!isChatMinimized)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  {isChatMinimized ? <Maximize2 className="w-5 h-5 text-white" /> : <Minimize2 className="w-5 h-5 text-white" />}
                </button>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {!isChatMinimized && (
              <>
                {/* Chat Messages */}
                <div className="h-96 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'driver' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl ${
                          msg.sender === 'driver'
                            ? 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-[#0f172a] dark:text-white'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.sender === 'driver' ? 'text-white/70' : 'text-gray-500'}`}>{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-[#10B981] text-[#0f172a] dark:text-white"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="p-3 bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full hover:shadow-lg transition-all duration-300"
                    >
                      <Send className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </motion.div>
    </div>
  )
}
