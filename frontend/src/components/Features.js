'use client'

import { Trophy, Gauge, MapPin, Sparkles, Users } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Features() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Trophy,
      title: t('alcoholDetection'),
      description: t('alcoholDetectionDesc'),
      color: 'bg-[#EF4444]/10 text-[#EF4444]'
    },
    {
      icon: Gauge,
      title: t('fuelMonitoring'),
      description: t('fuelMonitoringDesc'),
      color: 'bg-[#F59E0B]/10 text-[#F59E0B]'
    },
    {
      icon: MapPin,
      title: t('gpsTracking'),
      description: t('gpsTrackingDesc'),
      color: 'bg-[#2563EB]/10 text-[#2563EB]'
    },
    {
      icon: Sparkles,
      title: t('rivaSoulAI'),
      description: t('rivaSoulAIDesc'),
      badge: t('kinyarwandaBadge'),
      color: 'bg-[#7C3AED]/10 text-[#7C3AED]'
    },
    {
      icon: Users,
      title: t('fleetManagement'),
      description: t('fleetManagementDesc'),
      color: 'bg-[#22C55E]/10 text-[#22C55E]'
    },
  ]

  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#2563EB]/10 dark:bg-[#7C3AED]/10 text-[#2563EB] dark:text-[#7C3AED] rounded-full text-sm font-semibold mb-4">
            {t('coreFeatures')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] dark:text-white mb-4">
            {t('everythingYouNeed')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl p-6 text-center transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${feature.color}`}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] dark:text-white mb-2">{feature.title}</h3>
              {feature.badge && (
                <span className="inline-block px-2 py-1 text-xs font-semibold bg-[#2563EB]/10 dark:bg-[#7C3AED]/10 text-[#2563EB] dark:text-[#7C3AED] rounded-full mb-2">
                  {feature.badge}
                </span>
              )}
              <p className="text-sm text-[#475569] dark:text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
