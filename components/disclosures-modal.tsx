"use client"

import { useState } from "react"

export function DisclosuresModal() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
      >
        Required Disclosures
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          <div className="bg-background rounded-xl border border-border max-w-lg w-full max-h-[85vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 p-6 border-b border-border">
              <h2 className="font-[var(--font-display)] font-black text-lg tracking-tight text-foreground leading-tight">
                PROFESSIONAL DISCLOSURES
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="shrink-0 p-1 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">

              <div className="space-y-2">
                <h3 className="font-[var(--font-display)] font-bold text-foreground text-xs tracking-widest uppercase">
                  Licensure
                </h3>
                <p>
                  Madrone Love, PsyD is a Licensed Psychologist in the State of California
                  (License #35899). Licensure is verified through the California Board of
                  Psychology.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-[var(--font-display)] font-bold text-foreground text-xs tracking-widest uppercase">
                  Scope of Practice
                </h3>
                <p>
                  Services are provided to adults (18+) residing in California. This practice
                  does not provide crisis intervention or emergency services. If you are
                  experiencing a mental health emergency, please call 988 (Suicide &amp; Crisis
                  Lifeline) or go to your nearest emergency room.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-[var(--font-display)] font-bold text-foreground text-xs tracking-widest uppercase">
                  Telehealth
                </h3>
                <p>
                  Telehealth services are provided via HIPAA-compliant video platforms to
                  clients located in California at the time of service. You have the right
                  to withdraw consent for telehealth at any time and request in-person sessions
                  where available.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-[var(--font-display)] font-bold text-foreground text-xs tracking-widest uppercase">
                  Confidentiality &amp; HIPAA
                </h3>
                <p>
                  All communications are confidential under federal HIPAA law and California
                  law. Exceptions include imminent risk of harm to self or others, abuse or
                  neglect of a minor or dependent adult, and court orders. A full Notice of
                  Privacy Practices will be provided at intake.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-[var(--font-display)] font-bold text-foreground text-xs tracking-widest uppercase">
                  Fees &amp; Good Faith Estimate
                </h3>
                <p>
                  Session fees are discussed at intake. This practice is out-of-network for
                  all insurance plans; superbills are provided for potential reimbursement.
                  Under the No Surprises Act (effective January 1, 2022), you have the right
                  to a Good Faith Estimate of costs before services begin.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-[var(--font-display)] font-bold text-foreground text-xs tracking-widest uppercase">
                  Website Disclaimer
                </h3>
                <p>
                  Content on this website — including self-report tools, articles, and
                  resources — is for informational and educational purposes only. It does not
                  constitute professional psychological advice, diagnosis, or treatment, and
                  does not establish a therapist–client relationship.
                </p>
              </div>

              <p className="text-xs border-t border-border pt-4">
                Questions? Contact{" "}
                <a
                  href="mailto:info@oliveclinical.com"
                  className="text-nav-coral hover:underline"
                >
                  info@oliveclinical.com
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
