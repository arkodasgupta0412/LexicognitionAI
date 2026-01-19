import { HeroScene } from "@/components/three/hero-scene"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { HowItWorks } from "@/components/landing/how-it-works"
import { CTASection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {/* 3D Background Scene */}
      <HeroScene />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works */}
      <HowItWorks />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  )
}
