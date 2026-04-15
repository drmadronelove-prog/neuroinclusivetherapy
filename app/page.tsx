import { DiagonalNav, MobileNav } from "@/components/diagonal-nav"
import { HeroSection } from "@/components/sections/hero-section"

export default function Home() {
  return (
    <main className="relative bg-background overflow-x-hidden">
      <DiagonalNav />
      <MobileNav />

      {/* Main content area — leaving space for fixed nav on desktop */}
      <div className="md:mr-[252px]">
        <HeroSection />
      </div>
    </main>
  )
}
