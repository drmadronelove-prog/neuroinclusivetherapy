import { DiagonalNav, MobileNav } from "@/components/diagonal-nav"
import { LeftAccent } from "@/components/left-accent"
import { HeroSection } from "@/components/sections/hero-section"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <DiagonalNav />
      <MobileNav />
      <LeftAccent />

      {/* Main content area - leaving space for diagonal nav on desktop */}
      <div className="md:mr-[288px] lg:mr-[336px]">
        <HeroSection />
      </div>
    </main>
  )
}
