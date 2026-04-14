import { DiagonalNav, MobileNav } from "@/components/diagonal-nav"
import { HeroSection } from "@/components/sections/hero-section"
import { HoverProvider } from "@/components/hover-context"

export default function Home() {
  return (
    <HoverProvider>
      <main className="relative bg-background overflow-x-hidden">
        <DiagonalNav />
        <MobileNav />

        {/* Main content area — leaving space for fixed nav on desktop */}
        <div className="md:mr-[378px]">
          <HeroSection />
        </div>
      </main>
    </HoverProvider>
  )
}
