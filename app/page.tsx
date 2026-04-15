import { DiagonalNav, MobileNav } from "@/components/diagonal-nav"
import { HeroSection } from "@/components/sections/hero-section"
import Link from "next/link"

export default function Home() {
  return (
    <main className="relative bg-background overflow-x-hidden">
      <DiagonalNav />
      <MobileNav />

      {/* Main content area — leaving space for fixed nav on desktop */}
      <div className="md:mr-[252px]">
        <HeroSection />

        {/* Subtle footer */}
        <footer className="no-print border-t border-border/50 px-8 py-6 md:px-16">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-[var(--font-display)] font-bold text-foreground tracking-wide text-sm">
                Dr. Madrone Love, PsyD
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Neuroinclusive Psychologist · San Francisco &amp; Berkeley, CA · Telehealth
              </p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
              <a href="tel:+14159152183" className="hover:text-foreground transition-colors">
                (415) 915-2183
              </a>
              <a href="mailto:therapy@madronelove.com" className="hover:text-foreground transition-colors">
                therapy@madronelove.com
              </a>
              <Link href="/contact" className="hover:text-foreground transition-colors">
                Book a consultation
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
