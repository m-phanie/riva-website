'use client'

import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ChatWindow from './ChatWindow'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white"
        aria-label="Toggle chat"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? { scale: 0 } : { scale: 1 }}
      >
        {!isOpen && (
          <>
            <MessageCircle className="w-6 h-6" />
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] md:w-[340px]">
            <ChatWindow onClose={() => setIsOpen(false)} />
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
