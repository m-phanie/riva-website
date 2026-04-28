import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { LanguageProvider } from '@/contexts/LanguageContext'
import ConditionalChatWidget from '@/components/ConditionalChatWidget'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RIVA - Real-time Intelligence Vehicle Assistant',
  description: 'Smarter Vehicles. Safer Roads. Powered by AI.',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <ThemeProvider>
            {children}
            <ConditionalChatWidget />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
