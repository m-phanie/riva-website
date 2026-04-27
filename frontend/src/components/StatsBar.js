'use client'

import { CheckCircle, Shield, Zap, Globe } from 'lucide-react'

export default function StatsBar() {
  const stats = [
    { icon: CheckCircle, value: '10,000+', label: 'Vehicles Protected', color: 'text-[#22C55E]', bg: 'bg-[#22C55E]/10' },
    { icon: Shield, value: '98.7%', label: 'Accuracy Rate', color: 'text-[#2563EB]', bg: 'bg-[#2563EB]/10' },
    { icon: Zap, value: '24/7', label: 'Monitoring', color: 'text-[#7C3AED]', bg: 'bg-[#7C3AED]/10' },
    { icon: Globe, value: '50+', label: 'Partner Companies', color: 'text-[#F59E0B]', bg: 'bg-[#F59E0B]/10' },
  ]

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 ${stat.bg} rounded-2xl flex items-center justify-center mb-4`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-4xl font-bold text-[#0F172A] dark:text-white mb-2">{stat.value}</div>
                <div className="text-sm font-medium text-[#475569] dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
