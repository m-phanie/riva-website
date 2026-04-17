'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { TrendingDown, Zap, Shield } from 'lucide-react'

function Counter({ end, duration = 2 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime = null
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration])

  return <span ref={ref}>{count}</span>
}

export default function Impact() {
  const stats = [
    { icon: TrendingDown, value: 60, suffix: '%', label: 'Safety', color: 'bg-green-500', bgLight: 'bg-green-100', textColor: 'text-green-600' },
    { icon: Shield, value: 95, suffix: '%', label: 'Savings', color: 'bg-blue-500', bgLight: 'bg-blue-100', textColor: 'text-blue-600' },
    { icon: Zap, value: 40, suffix: '%', label: 'Efficiency', color: 'bg-purple-500', bgLight: 'bg-purple-100', textColor: 'text-purple-600' },
  ]

  return (
    <section id="impact" className="py-24 bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Real Impact
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            See how RIVA is transforming fleet management
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-16 h-16 ${stat.bgLight} ${stat.textColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <div className={`text-6xl font-bold ${stat.textColor} mb-2`}>
                <Counter end={stat.value} />
                {stat.suffix}
              </div>
              <div className="text-xl text-text-primary font-semibold mb-2">{stat.label}</div>
              <p className="text-text-secondary text-sm">
                Proven results from our fleet partners
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
