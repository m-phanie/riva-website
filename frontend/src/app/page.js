import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import StatsBar from '@/components/StatsBar'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import AppPreview from '@/components/AppPreview'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen relative z-1">
      <Navbar />
      <Hero />
      <StatsBar />
      <Features />
      <HowItWorks />
      <AppPreview />
      <CTA />
      <Footer />
    </main>
  )
}
