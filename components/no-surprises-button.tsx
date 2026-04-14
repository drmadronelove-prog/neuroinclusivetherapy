"use client"

import { useState } from "react"

export function NoSurprisesButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 text-sm font-[var(--font-display)] font-bold tracking-wide text-nav-coral border-2 border-nav-coral rounded-lg px-4 py-2.5 hover:bg-nav-coral/10 transition-colors"
      >
        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        No Surprises Act — Your Rights
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
                YOUR RIGHTS UNDER THE NO SURPRISES ACT
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
            <div className="p-6 space-y-5">
              <p className="text-sm text-muted-foreground leading-relaxed">
                You have the right to receive a{" "}
                <strong className="text-foreground">Good Faith Estimate</strong>{" "}
                explaining how much your care will cost before you receive services.
              </p>

              <p className="text-sm text-muted-foreground leading-relaxed">
                Under the No Surprises Act (effective January 1, 2022), health care
                providers must give patients who are uninsured or not using insurance a
                written estimate of the expected bill for medical items and services.
              </p>

              <ul className="space-y-3">
                {[
                  "You have the right to a Good Faith Estimate for the total expected cost of any non-emergency items or services — including psychotherapy sessions.",
                  "Your provider must give you a written Good Faith Estimate at least 1 business day before your appointment when scheduled 3 or more days in advance.",
                  "You can also request a Good Faith Estimate before scheduling any service.",
                  "If your bill is $400 or more above your Good Faith Estimate, you have the right to dispute the charge.",
                  "Keep a copy of your Good Faith Estimate for your records.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="text-nav-coral font-bold shrink-0 mt-0.5">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-nav-coral/5 border border-nav-coral/20 rounded-lg p-4 text-sm text-muted-foreground leading-relaxed">
                For questions or more information about your rights, visit{" "}
                <a
                  href="https://www.cms.gov/nosurprises"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-nav-coral underline underline-offset-2"
                >
                  cms.gov/nosurprises
                </a>{" "}
                or call{" "}
                <strong className="text-foreground">1-800-985-3059</strong>.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
