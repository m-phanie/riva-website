'use client'

import { Settings, Smartphone, Brain } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function HowItWorks() {
  const { t } = useLanguage()

  const steps = [
    {
      number: '1',
      icon: Settings,
      title: t('installDevice'),
      description: t('installDeviceDesc'),
      bgGradient: 'from-[#2563EB] to-[#7C3AED]',
      iconBg: 'bg-[#2563EB]/10',
      iconColor: 'text-[#2563EB]',
      numberBg: 'from-[#2563EB] to-[#7C3AED]',
      cardBorder: 'border-gray-200 dark:border-gray-700'
    },
    {
      number: '2',
      icon: Smartphone,
      title: t('connectApp'),
      description: t('connectAppDesc'),
      bgGradient: 'from-[#2563EB] to-[#7C3AED]',
      iconBg: 'bg-[#7C3AED]/10',
      iconColor: 'text-[#7C3AED]',
      numberBg: 'from-[#2563EB] to-[#7C3AED]',
      cardBorder: 'border-gray-200 dark:border-gray-700'
    },
    {
      number: '3',
      icon: Brain,
      title: t('monitorAI'),
      description: t('monitorAIDesc'),
      bgGradient: 'from-[#2563EB] to-[#7C3AED]',
      iconBg: 'bg-[#22C55E]/10',
      iconColor: 'text-[#22C55E]',
      numberBg: 'from-[#2563EB] to-[#7C3AED]',
      cardBorder: 'border-gray-200 dark:border-gray-700'
    },
  ]

  return (
    <section id="how-it-works" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white rounded-full text-sm font-semibold mb-4 shadow-lg">
            {t('howItWorks')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] dark:text-white mb-4">
            {t('simpleSmartConnected')}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Gradient line connector */}
          <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 transform -translate-y-1/2 opacity-50"></div>

          {steps.map((step, index) => (
            <div key={index} className="relative z-10 text-center">
              <div className="bg-[#064e3b] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-xl p-8 text-center transition-all duration-300 hover:-translate-y-2 border-2 border-[#065f46]">
                <div className="relative inline-block mb-6">
                  <div className={`w-20 h-20 ${step.iconBg} rounded-2xl flex items-center justify-center`}>
                    <step.icon className={`w-10 h-10 ${step.iconColor}`} />
                  </div>
                  <div className={`absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br ${step.numberBg} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                    {step.number}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm text-gray-200">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
