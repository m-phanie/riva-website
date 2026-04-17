'use client'

import { motion } from 'framer-motion'
import { User, Building2, Landmark } from 'lucide-react'

export default function Users() {
  const users = [
    {
      icon: User,
      title: 'Individuals',
      description: 'Personal vehicle owners who want peace of mind and safety for their daily commute.',
      features: ['Real-time tracking', 'Safety alerts', 'Fuel monitoring'],
    },
    {
      icon: Building2,
      title: 'Companies',
      description: 'Businesses managing fleets of vehicles for delivery, logistics, or transportation.',
      features: ['Fleet management', 'Analytics dashboard', 'Cost optimization'],
    },
    {
      icon: Landmark,
      title: 'Government',
      description: 'Public transportation and government vehicle fleets requiring strict safety standards.',
      features: ['Compliance tracking', 'Audit reports', 'Public safety'],
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Built for Everyone
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Tailored solutions for every type of fleet
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {users.map((user, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="soft-card p-8 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-teal rounded-2xl flex items-center justify-center mb-6">
                <user.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-3">{user.title}</h3>
              <p className="text-text-secondary mb-6">{user.description}</p>
              <ul className="space-y-2">
                {user.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-text-secondary">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
