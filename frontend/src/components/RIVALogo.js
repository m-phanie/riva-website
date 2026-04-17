'use client'

export default function RIVALogo({ variant = 'full', size = 'large' }) {
  const sizeClasses = {
    large: 'h-16 w-auto',
    medium: 'h-12 w-auto',
    small: 'h-8 w-auto',
  }

  const taglineSize = {
    large: 'text-[8px]',
    medium: 'text-[6px]',
    small: 'text-[4px]',
  }

  if (variant === 'app-icon') {
    return (
      <div className={`relative ${sizeClasses[size]} ${sizeClasses[size].replace('h-', 'w-').replace('w-auto', 'h-auto')} bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg`}>
        <div className="relative">
          {/* Arc shape */}
          <svg
            viewBox="0 0 100 100"
            className="absolute -top-4 -left-4 w-32 h-32 opacity-20"
          >
            <path
              d="M 10 50 Q 50 10 90 50"
              stroke="white"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          <svg
            viewBox="0 0 100 100"
            className="absolute -bottom-4 -left-4 w-32 h-32 opacity-20"
          >
            <path
              d="M 10 50 Q 50 90 90 50"
              stroke="white"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          {/* R text */}
          <span className="text-white font-bold text-4xl relative z-10">R</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {/* Top arc */}
        <svg
          viewBox="0 0 200 40"
          className="absolute -top-6 left-1/2 -translate-x-1/2 w-48 h-12 opacity-40"
        >
          <path
            d="M 10 30 Q 100 0 190 30"
            stroke="#2563EB"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        
        {/* Main text */}
        <div className="relative z-10">
          <span 
            className="text-4xl font-bold text-[#0F172A] tracking-tight"
            style={{
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              textShadow: '0 0 30px rgba(37, 99, 235, 0.1)',
            }}
          >
            RIVA
          </span>
        </div>

        {/* Bottom arc */}
        <svg
          viewBox="0 0 200 40"
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-12 opacity-40"
        >
          <path
            d="M 10 10 Q 100 40 190 10"
            stroke="#2563EB"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Tagline */}
      <span 
        className={`${taglineSize[size]} text-gray-400 tracking-[0.3em] mt-4 uppercase`}
        style={{
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        Fleet Safety System
      </span>
    </div>
  )
}
