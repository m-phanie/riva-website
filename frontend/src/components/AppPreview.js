'use client'

import { CheckCircle, Shield, DollarSign, TrendingUp, X } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function AppPreview() {
  const [showModal, setShowModal] = useState(false)
  const { t } = useLanguage()

  const features = [
    t('realtimeVehicleStats'),
    t('safetyAlerts'),
    t('fuelMonitoring'),
    t('driverBehaviorAnalysis'),
    t('fleetManagement'),
    t('instantNotifications'),
  ]

  const impacts = [
    { icon: Shield, value: '70%', label: t('fewerAccidents'), description: t('drunkDrivingPrevented'), color: 'text-[#22C55E]', bg: 'bg-[#22C55E]/10' },
    { icon: DollarSign, value: '35%', label: t('costSavings'), description: t('fuelTheftEliminated'), color: 'text-[#2563EB]', bg: 'bg-[#2563EB]/10' },
    { icon: TrendingUp, value: '500+', label: t('fleetEfficiency'), description: t('vehiclesManaged'), color: 'text-[#7C3AED]', bg: 'bg-[#7C3AED]/10' },
  ]

  const phoneScreens = [
    {
      title: t('dashboard'),
      content: t('realtimeVehicleStats'),
      image: '/images/dashboard.png',
    },
    {
      title: t('aiAssistant'),
      content: t('rivaSoulVoice'),
      image: '/images/ai assistant.png',
    },
    {
      title: t('fuelMonitor'),
      content: t('fuelTracking'),
      image: '/images/fuel.png',
    },
    {
      title: t('safetyAlerts'),
      content: t('instantNotifications'),
      image: '/images/alert.png',
    },
    {
      title: t('gpsTrackingApp'),
      content: t('liveLocation'),
      image: '/images/tracking.png',
    },
    {
      title: t('diagnostics'),
      content: t('vehicleHealth'),
      image: '/images/Government.png',
    },
  ]

  return (
    <section id="app" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Card - Mobile App Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white mb-6">{t('mobileAppPreview')}</h2>
            
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#22C55E] flex-shrink-0" />
                  <span className="text-[#475569] dark:text-gray-400">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 border-2 border-[#2563EB] dark:border-[#7C3AED] rounded-full text-[#2563EB] dark:text-[#7C3AED] font-semibold hover:bg-[#2563EB] dark:hover:bg-[#7C3AED] hover:text-white transition-all duration-300 mb-8"
            >
              {t('viewAppScreens')}
            </button>

            {/* Phone mockups */}
            <div className="relative h-64 flex items-center justify-center">
              <div className="absolute w-32 h-48 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-3xl shadow-lg border-2 border-gray-200 dark:border-gray-600 overflow-hidden">
                <img 
                  src={phoneScreens[0].image} 
                  alt={phoneScreens[0].title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-4xl">📱</div>`
                  }}
                />
              </div>
              <div className="absolute w-32 h-48 bg-gradient-to-br from-blue-100 to-white dark:from-gray-700 dark:to-gray-600 rounded-3xl shadow-lg border-2 border-gray-200 dark:border-gray-600 overflow-hidden transform translate-x-8 translate-y-4">
                <img 
                  src={phoneScreens[1].image} 
                  alt={phoneScreens[1].title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-4xl">📱</div>`
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Card - Real Impact */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white mb-6">{t('realImpact')}</h2>
            
            <div className="space-y-6">
              {impacts.map((impact, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                >
                  <div className={`w-12 h-12 ${impact.bg} rounded-full flex items-center justify-center shadow-sm flex-shrink-0`}>
                    <impact.icon className={`w-6 h-6 ${impact.color}`} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0F172A] dark:text-white">{impact.value}</div>
                    <div className="text-sm font-semibold text-[#0F172A] dark:text-white">{impact.label}</div>
                    <div className="text-xs text-[#475569] dark:text-gray-400">{impact.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Phone Screens Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-[#0F172A] dark:text-white">{t('rivaAppScreens')}</h2>
              <button
                onClick={() => setShowModal(false)}
                className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {phoneScreens.map((screen, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-600 rounded-xl mb-3 overflow-hidden">
                      <img
                        src={screen.image}
                        alt={screen.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-4xl">📱</div>`
                        }}
                      />
                    </div>
                    <h3 className="text-sm font-bold text-[#0F172A] dark:text-white mb-1">{screen.title}</h3>
                    <p className="text-xs text-[#475569] dark:text-gray-400">{screen.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
