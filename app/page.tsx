import { DiagonalNav, MobileNav } from "@/components/diagonal-nav"
import { HeroCards } from "@/components/hero-cards"
import { LeftAccent } from "@/components/left-accent"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { ServicesSection } from "@/components/sections/services-section"
import { ContactSection } from "@/components/sections/contact-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <DiagonalNav />
      <MobileNav />
      <LeftAccent />

      {/* Main content area - leaving space for diagonal nav on desktop */}
      <div className="md:mr-64 lg:mr-72">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ContactSection />
      </div>
    </main>
  )
}
