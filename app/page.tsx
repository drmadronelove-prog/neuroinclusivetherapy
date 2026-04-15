import { DiagonalNav, MobileNav } from "@/components/diagonal-nav"
import { HeroSection } from "@/components/sections/hero-section"

export default function Home() {
  return (
    <main className="relative bg-background overflow-x-hidden">
      <DiagonalNav />
      <MobileNav />

      {/* Signature — subtle, upper-left, fixed */}
      <p
        className="no-print fixed top-6 left-6 z-40 italic pointer-events-none"
        style={{
          fontFamily: "var(--font-accent)",
          fontSize: "0.88rem",
          color: "rgba(61,82,48,0.48)",
          letterSpacing: "0.01em",
        }}
      >
        Dr. Madrone Love, PsyD
      </p>

      {/* Main content area — leaving space for fixed nav on desktop */}
      <div className="md:mr-[252px]">
        <HeroSection />
      </div>
    </main>
  )
}
