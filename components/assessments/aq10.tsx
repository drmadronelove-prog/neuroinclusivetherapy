"use client"

import { useState } from "react"

// ── Data ──────────────────────────────────────────────────────────────────────

// 10 items, verbatim from the AQ-10 (Allison, Auyeung & Baron-Cohen,
// 2012), as supplied. Recommended in NICE clinical guideline CG142.
const aqItems: string[] = [
  "I often notice small sounds when others do not.",
  "I usually concentrate more on the whole picture, rather than the small details.",
  "I find it easy to do more than one thing at once.",
  "If there is an interruption, I can switch back to what I was doing very quickly.",
  "I find it easy to ‘read between the lines’ when someone is talking to me.",
  "I know how to tell if someone listening to me is getting bored.",
  "When I’m reading a story I find it difficult to work out the characters’ intentions.",
  "I like to collect information about categories of things (e.g. types of car, types of bird, types of train, types of plant etc).",
  "I find it easy to work out what someone is thinking or feeling just by looking at their face.",
  "I find it difficult to work out people’s intentions.",
]

// Items where an "agree" response scores a point. The remaining items
// (2, 3, 4, 5, 6, 9) score a point for a "disagree" response.
const AGREE_SCORED = new Set([1, 7, 8, 10])

const SCALE: { value: number; label: string; short: string }[] = [
  { value: 1, label: "Definitely agree",    short: "Definitely\nagree" },
  { value: 2, label: "Slightly agree",      short: "Slightly\nagree" },
  { value: 3, label: "Slightly disagree",   short: "Slightly\ndisagree" },
  { value: 4, label: "Definitely disagree", short: "Definitely\ndisagree" },
]

const REFERRAL_CUT = 6
const MAX_TOTAL = 10

type Answers = Partial<Record<number, number>>

// 1 point per item per the AQ-10 key.
function itemScore(itemNum: number, value: number): number {
  const agreed = value <= 2 // Definitely / Slightly agree
  if (AGREE_SCORED.has(itemNum)) return agreed ? 1 : 0
  return agreed ? 0 : 1
}

function totalScore(answers: Answers): number {
  let sum = 0
  for (const [k, v] of Object.entries(answers)) {
    if (typeof v === "number") sum += itemScore(Number(k), v)
  }
  return sum
}

function answeredCount(answers: Answers): number {
  return Object.values(answers).filter((v) => typeof v === "number").length
}

type Band = { label: string; color: string; bg: string }

function getBand(score: number): Band {
  if (score >= REFERRAL_CUT)
    return {
      label: "At or above the referral threshold (6 or above)",
      color: "text-nav-coral",
      bg: "bg-nav-coral/10",
    }
  return {
    label: "Below the referral threshold",
    color: "text-nav-teal",
    bg: "bg-nav-teal/10",
  }
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

interface ItemRowProps {
  num: number
  text: string
  response: number | undefined
  onSelect: (v: number) => void
}

function ItemRow({ num, text, response, onSelect }: ItemRowProps) {
  const groupId = `aq10-item-${num}`
  return (
    <li className="py-3 border-b border-border/50 last:border-0 print:break-inside-avoid">
      <fieldset>
        <legend id={groupId} className="text-sm text-foreground mb-2 leading-snug">
          <span className="font-semibold tabular-nums text-muted-foreground mr-1.5">{num}.</span>
          {text}
        </legend>
        <div
          className="grid grid-cols-4 gap-1"
          role="radiogroup"
          aria-labelledby={groupId}
        >
          {SCALE.map((opt) => {
            const active = response === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onSelect(opt.value)}
                title={opt.label}
                className={`flex flex-col items-center gap-0.5 py-2 px-1 rounded border text-center transition-colors min-h-[44px] ${
                  active
                    ? "bg-nav-coral text-white border-nav-coral font-semibold"
                    : "border-border text-muted-foreground hover:border-nav-coral hover:text-foreground"
                }`}
              >
                <span className="text-xs font-bold leading-tight whitespace-pre-line">
                  {opt.short}
                </span>
              </button>
            )
          })}
        </div>
      </fieldset>
    </li>
  )
}

function ItemReadout({ num, text, response }: { num: number; text: string; response: number }) {
  const label = SCALE.find((s) => s.value === response)?.label ?? ""
  const pt = itemScore(num, response)
  return (
    <li className="py-2 border-b border-border/50 last:border-0 print:break-inside-avoid">
      <div className="flex items-start justify-between gap-4 text-sm">
        <p className="text-foreground leading-snug">
          <span className="font-semibold tabular-nums text-muted-foreground mr-1.5">{num}.</span>
          {text}
        </p>
        <span className="shrink-0 tabular-nums text-foreground font-medium text-right">
          {label}
          <span className="block text-xs text-muted-foreground font-normal">
            {pt} point{pt === 1 ? "" : "s"}
          </span>
        </span>
      </div>
    </li>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function AQ10() {
  const [open, setOpen] = useState(true)
  const [answers, setAnswers] = useState<Answers>({})
  const [submitted, setSubmitted] = useState(false)

  function select(itemNum: number, value: number) {
    setAnswers((prev) => ({ ...prev, [itemNum]: value }))
  }

  function reset() {
    setAnswers({})
    setSubmitted(false)
  }

  const answered = answeredCount(answers)
  const score = totalScore(answers)
  const complete = answered === aqItems.length
  const band = submitted ? getBand(score) : null

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!complete) return
    setSubmitted(true)
    if (typeof window !== "undefined") {
      requestAnimationFrame(() => {
        document.getElementById("aq10-results")?.scrollIntoView({ behavior: "smooth", block: "start" })
      })
    }
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card aq10-root">
      {/* Collapsible header */}
      <button
        onClick={() => setOpen(!open)}
        className="no-print w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
        aria-expanded={open}
      >
        <div>
          <h2 className="font-[var(--font-display)] text-xl font-bold text-foreground">
            AQ-10: Autism Spectrum Quotient (short)
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            10-item adult referral screen · Allison, Auyeung &amp; Baron-Cohen, 2012
          </p>
        </div>
        <div className="flex items-center gap-4 ml-4">
          {answered > 0 && (
            <span className="text-xs font-semibold tabular-nums px-2.5 py-1 rounded-full border border-border bg-muted text-muted-foreground">
              {answered}/{aqItems.length} answered
            </span>
          )}
          <ChevronIcon open={open} />
        </div>
      </button>

      <div className={`assessment-content ${open ? "" : "hidden"}`}>
        <div className="p-5 sm:p-6 border-t border-border space-y-8">
          {/* Print-only heading */}
          <div className="hidden print:block space-y-2 mb-2">
            <h1 className="text-2xl font-bold">AQ-10: Autism Spectrum Quotient (short)</h1>
            <p className="text-sm">Allison, Auyeung &amp; Baron-Cohen, 2012 · 10-item screen</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Instructions */}
            <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
              <p>
                A quick referral guide for adults with suspected autism who do not have a learning
                disability. Choose one option per question. All {aqItems.length} items are required.
              </p>
            </div>

            {/* Items */}
            <ul className="divide-y divide-border/0">
              {aqItems.map((text, idx) => {
                const num = idx + 1
                return (
                  <ItemRow
                    key={num}
                    num={num}
                    text={text}
                    response={answers[num]}
                    onSelect={(v) => select(num, v)}
                  />
                )
              })}
            </ul>

            {/* Submit row */}
            <div className="no-print flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={!complete}
                className="px-5 py-2.5 text-sm font-semibold rounded-md transition-colors bg-foreground text-background hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submitted ? "Update results" : "Submit"}
              </button>
              <span className="text-xs text-muted-foreground tabular-nums">
                {answered} of {aqItems.length} answered
              </span>
              <button
                type="button"
                onClick={reset}
                className="ml-auto px-4 py-2 text-sm font-medium border border-border rounded-md hover:bg-muted transition-colors"
              >
                Start over
              </button>
            </div>
          </form>

          {/* Results view */}
          {submitted && band && (
            <div id="aq10-results" className="rounded-lg border border-border bg-muted/40 p-4 space-y-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-[var(--font-display)] text-lg font-bold text-foreground">
                  Total score: {score} / {MAX_TOTAL}
                </span>
                <span className="text-sm text-muted-foreground">
                  {aqItems.length} of {aqItems.length} answered
                </span>
              </div>

              {/* Reference band */}
              <div className={`rounded-md px-3 py-2 ${band.bg}`}>
                <p className={`text-sm font-semibold ${band.color}`}>{band.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Per the AQ-10 key, a score of 6 or above suggests considering a referral for a
                  specialist diagnostic assessment. This is a screening guide, not a diagnosis.
                </p>
              </div>

              {/* Visual band */}
              <div className="space-y-1" aria-hidden="true">
                <div className="flex justify-between text-[10px] text-muted-foreground tabular-nums">
                  <span>0</span>
                  <span className="text-nav-coral">6</span>
                  <span>{MAX_TOTAL}</span>
                </div>
                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-nav-coral/70 rounded-full transition-all duration-300"
                    style={{ width: `${(score / MAX_TOTAL) * 100}%` }}
                  />
                  <div
                    className="absolute top-0 h-full w-px bg-foreground/40"
                    style={{ left: `${(REFERRAL_CUT / MAX_TOTAL) * 100}%` }}
                  />
                </div>
              </div>

              {/* Item responses */}
              <div className="border-t border-border pt-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Item responses
                </p>
                <ol className="divide-y divide-border/0">
                  {aqItems.map((text, idx) => {
                    const num = idx + 1
                    const r = answers[num]
                    if (typeof r !== "number") return null
                    return <ItemReadout key={num} num={num} text={text} response={r} />
                  })}
                </ol>
              </div>

              {/* Print + Save as PDF buttons */}
              <div className="no-print flex flex-wrap gap-3 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 text-sm font-medium bg-foreground text-background rounded-md hover:opacity-90 transition-opacity"
                >
                  Print
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 text-sm font-medium border border-border rounded-md hover:bg-muted transition-colors"
                  title="Choose Save as PDF in the print dialog"
                >
                  Save as PDF (choose "Save as PDF" in the print dialog)
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="ml-auto px-4 py-2 text-sm font-medium border border-border rounded-md hover:bg-muted transition-colors"
                >
                  Start over
                </button>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground italic border-t border-border pt-4 leading-relaxed">
            The AQ-10 is a brief screening guide, not a diagnostic instrument. It is recommended in
            NICE clinical guideline CG142 as a quick referral aid. Interpretation belongs in a
            conversation with a qualified clinician.
          </p>

          {/* Citation */}
          <p className="text-xs text-muted-foreground leading-relaxed">
            Allison, C., Auyeung, B., &amp; Baron-Cohen, S. (2012). Toward brief “red flags” for
            autism screening. <em>Journal of the American Academy of Child and Adolescent
            Psychiatry, 51</em>(2), 202 to 212.
          </p>
        </div>
      </div>

      {/* Print-only typography tweaks scoped to this assessment. */}
      <style>{`
        @media print {
          .aq10-root {
            font-family: Georgia, "Times New Roman", serif;
            color: #000;
          }
          .aq10-root, .aq10-root * {
            background: transparent !important;
          }
          .aq10-root {
            border: none !important;
            box-shadow: none !important;
          }
          .aq10-root .assessment-content { display: block !important; }
          .aq10-root h1 { font-size: 18pt; margin-bottom: 6pt; }
          .aq10-root h2 { font-size: 14pt; }
          .aq10-root p, .aq10-root li, .aq10-root dt, .aq10-root dd {
            font-size: 10pt;
            line-height: 1.4;
          }
          .aq10-root li { page-break-inside: avoid; break-inside: avoid; }
          @page { margin: 0.6in; }
        }
      `}</style>
    </div>
  )
}
