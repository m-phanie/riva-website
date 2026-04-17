'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function CTA() {
  const { t } = useLanguage()

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#22C55E] rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {t('readyToTransform')}
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              {t('joinThousands')}
            </p>
            <Link href="/login">
              <button className="group px-10 py-4 bg-white text-[#2563EB] rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 flex items-center space-x-2 mx-auto">
                <span>{t('requestDemo')}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
