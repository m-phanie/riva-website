'use client'

import { usePathname } from 'next/navigation'
import ChatWidget from './ChatWidget'

export default function ConditionalChatWidget() {
  const pathname = usePathname()
  
  // Hide global chat widget on manager dashboard (it has its own with driver data)
  const hideChatWidget = pathname === '/manager-dashboard'

  if (hideChatWidget) {
    return null
  }

  return <ChatWidget />
}
