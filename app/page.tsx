import { DiagonalNav, MobileNav } from "@/components/diagonal-nav"
import { LeftAccent } from "@/components/left-accent"
import { HeroSection } from "@/components/sections/hero-section"
import { HoverProvider } from "@/components/hover-context"
import { NetworkViz } from "@/components/network-viz"

export default function Home() {
  return (
    <HoverProvider>
      <main className="relative bg-background overflow-x-hidden">
        <DiagonalNav />
        <MobileNav />
        <LeftAccent />

        {/* Main content area — leaving space for fixed nav on desktop */}
        <div className="md:mr-[384px]">
          <HeroSection />

          {/* Network visualization */}
          <div className="px-6 lg:px-16 pb-20">
            <NetworkViz />
          </div>
        </div>
      </main>
    </HoverProvider>
  )
}
