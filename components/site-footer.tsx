"use client"

import Link from "next/link"
import { NoSurprisesButton } from "@/components/no-surprises-button"
import { DisclosuresModal } from "@/components/disclosures-modal"

export function SiteFooter() {
  return (
    <footer className="no-print border-t border-border bg-background mt-16 px-6 lg:px-16 py-10">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="font-[var(--font-display)] font-bold text-foreground tracking-wider text-sm">
              MADRONE LOVE, PSYD
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Licensed Psychologist · California #35899
            </p>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <NoSurprisesButton />
            <DisclosuresModal />
          </div>
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
          <a href="https://v0-madronelove-website.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Therapy</a>
          <Link href="/tests" className="hover:text-foreground transition-colors">Tests &amp; Tools</Link>
          <Link href="/neurodiversity" className="hover:text-foreground transition-colors">Neurodiversity</Link>
          <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
        </div>

        {/* Bottom row */}
        <div className="border-t border-border pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Madrone Love, PsyD · San Francisco &amp; Berkeley, CA · Telehealth throughout California
          </p>
          <p>
            <a href="tel:+14159152183" className="hover:text-foreground transition-colors">(415) 915-2183</a>
            {" · "}
            <a href="mailto:therapy@madronelove.com" className="hover:text-foreground transition-colors">
              therapy@madronelove.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
