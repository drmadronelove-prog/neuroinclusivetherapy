"use client"

import { useState } from "react"

// ── Data ──────────────────────────────────────────────────────────────────────

// 24 items, verbatim from the OC Trait Rating Scale (Seretis, Hempel &
// Lynch, 2015), as supplied. Items 5, 7, 8, 13, 21, 22, 24 are
// reverse-scored.
const octItems: string[] = [
  "When challenged by someone I tend to immediately deny, dismiss, or dispute the feedback.",
  "There is always a right and a wrong way to do things.",
  "My mind often goes blank when I have to speak about my feelings.",
  "Very few people really know the real me.",
  "I always make time for enjoyment or fun.",
  "On the surface I appear calm, but inwardly I am often fearful or irritable.",
  "My dream life involves having a new experience every day.",
  "Most of the time life seems easy.",
  "I often feel detached from others.",
  "If I’m invited to a party I usually attend out of obligation, not because I expect it to be fun.",
  "Most people may not know that I will do almost anything to get ahead.",
  "I often feel compelled to correct mistakes made by others.",
  "I am sometimes so open to new ideas that people have described me as naive or gullible.",
  "Having to be around others for long periods of time is exhausting.",
  "In life, there is a set of rules and principles that one should always adhere to.",
  "I am proud of my ability to tolerate pain or distress in order to achieve a goal.",
  "Most things in life don’t work out.",
  "I often notice errors that other people miss.",
  "Very few people know that I can have an explosive temper.",
  "My anxiety often interferes with my ability to hear what another person is saying.",
  "I dislike details.",
  "I find something positive or amusing in almost every situation.",
  "I often mask or hide my inner feelings from others.",
  "I feel content with my life.",
]

// 1-indexed item numbers that are reverse-scored.
const REVERSE_ITEMS = new Set([5, 7, 8, 13, 21, 22, 24])

const SCALE: { value: number; label: string; short: string }[] = [
  { value: 1, label: "Disagree completely", short: "Disagree\ncompletely" },
  { value: 2, label: "Disagree strongly",   short: "Disagree\nstrongly" },
  { value: 3, label: "Disagree somewhat",   short: "Disagree\nsomewhat" },
  { value: 4, label: "Agree somewhat",      short: "Agree\nsomewhat" },
  { value: 5, label: "Agree strongly",      short: "Agree\nstrongly" },
  { value: 6, label: "Agree completely",    short: "Agree\ncompletely" },
]

const MIN_TOTAL = 24
const MAX_TOTAL = 144
const SOCIAL_ANXIETY_CUT = 79.5
const ASD_CUT = 86.5

type Answers = Partial<Record<number, number>>

function scoredValue(itemNum: number, raw: number): number {
  return REVERSE_ITEMS.has(itemNum) ? 7 - raw : raw
}

function totalScore(answers: Answers): number {
  let sum = 0
  for (const [k, v] of Object.entries(answers)) {
    if (typeof v === "number") sum += scoredValue(Number(k), v)
  }
  return sum
}

function answeredCount(answers: Answers): number {
  return Object.values(answers).filter((v) => typeof v === "number").length
}

type Band = { label: string; color: string; bg: string }

function getBand(score: number): Band {
  if (score >= ASD_CUT)
    return {
      label: "At or above the autism-spectrum reference threshold (≈86.5)",
      color: "text-nav-coral",
      bg: "bg-nav-coral/10",
    }
  if (score >= SOCIAL_ANXIETY_CUT)
    return {
      label: "At or above the social-anxiety reference threshold (≈79.5)",
      color: "text-nav-amber",
      bg: "bg-nav-amber/10",
    }
  return {
    label: "Below the preliminary reference thresholds",
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
  const groupId = `octrs-item-${num}`
  return (
    <li className="py-3 border-b border-border/50 last:border-0 print:break-inside-avoid">
      <fieldset>
        <legend id={groupId} className="text-sm text-foreground mb-2 leading-snug">
          <span className="font-semibold tabular-nums text-muted-foreground mr-1.5">{num}.</span>
          {text}
        </legend>
        <div
          className="grid grid-cols-6 gap-1"
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
                <span className="text-sm font-bold">{opt.value}</span>
                <span className="text-[9px] leading-tight hidden sm:block whitespace-pre-line">
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

// Compact item readout used in the print / results view.
function ItemReadout({ num, text, response }: { num: number; text: string; response: number }) {
  const label = SCALE.find((s) => s.value === response)?.label ?? ""
  const reversed = REVERSE_ITEMS.has(num)
  return (
    <li className="py-2 border-b border-border/50 last:border-0 print:break-inside-avoid">
      <div className="flex items-start justify-between gap-4 text-sm">
        <p className="text-foreground leading-snug">
          <span className="font-semibold tabular-nums text-muted-foreground mr-1.5">{num}.</span>
          {text}
          {reversed && (
            <span className="ml-1 text-[0.65rem] uppercase tracking-wider text-muted-foreground">
              (reverse-scored)
            </span>
          )}
        </p>
        <span className="shrink-0 tabular-nums text-foreground font-medium">
          {response} <span className="text-muted-foreground font-normal">({label})</span>
        </span>
      </div>
    </li>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function OCTRS() {
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
  const complete = answered === octItems.length
  const band = submitted ? getBand(score) : null

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!complete) return
    setSubmitted(true)
    if (typeof window !== "undefined") {
      requestAnimationFrame(() => {
        document.getElementById("octrs-results")?.scrollIntoView({ behavior: "smooth", block: "start" })
      })
    }
  }

  const pct = (v: number) =>
    Math.min(100, Math.max(0, ((v - MIN_TOTAL) / (MAX_TOTAL - MIN_TOTAL)) * 100))

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card octrs-root">
      {/* Collapsible header */}
      <button
        onClick={() => setOpen(!open)}
        className="no-print w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
        aria-expanded={open}
      >
        <div>
          <h2 className="font-[var(--font-display)] text-xl font-bold text-foreground">
            OCT-RS: OC Trait Rating Scale
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            24-item self-report measure of maladaptive overcontrol · Seretis, Hempel &amp; Lynch, 2015
          </p>
        </div>
        <div className="flex items-center gap-4 ml-4">
          {answered > 0 && (
            <span className="text-xs font-semibold tabular-nums px-2.5 py-1 rounded-full border border-border bg-muted text-muted-foreground">
              {answered}/{octItems.length} answered
            </span>
          )}
          <ChevronIcon open={open} />
        </div>
      </button>

      <div className={`assessment-content ${open ? "" : "hidden"}`}>
        <div className="p-5 sm:p-6 border-t border-border space-y-8">
          {/* Print-only heading */}
          <div className="hidden print:block space-y-2 mb-2">
            <h1 className="text-2xl font-bold">OCT-RS: OC Trait Rating Scale</h1>
            <p className="text-sm">Seretis, Hempel &amp; Lynch, 2015 · 24-item self-report</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Instructions */}
            <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
              <p>
                Read each statement carefully and decide how much it applies to you according to
                your present and past experiences. There are no right or wrong answers. All{" "}
                {octItems.length} items are required.
              </p>
              <div className="no-print rounded-md border border-border bg-muted/40 p-3">
                <p className="font-medium text-foreground mb-1 text-xs uppercase tracking-wider">Scale</p>
                <ol className="flex flex-wrap gap-x-5 gap-y-0.5">
                  {SCALE.map((s) => (
                    <li key={s.value} className="flex gap-1.5">
                      <span className="font-bold text-foreground">{s.value}</span>
                      <span>{s.label}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Items */}
            <ul className="divide-y divide-border/0">
              {octItems.map((text, idx) => {
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
                {answered} of {octItems.length} answered
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
            <div id="octrs-results" className="rounded-lg border border-border bg-muted/40 p-4 space-y-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-[var(--font-display)] text-lg font-bold text-foreground">
                  Total score: {score} / {MAX_TOTAL}
                </span>
                <span className="text-sm text-muted-foreground">
                  {octItems.length} of {octItems.length} answered
                </span>
              </div>

              {/* Reference band */}
              <div className={`rounded-md px-3 py-2 ${band.bg}`}>
                <p className={`text-sm font-semibold ${band.color}`}>{band.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Preliminary data suggests scores of 79.5 or higher may indicate social anxiety,
                  and 86.5 or higher may indicate autism spectrum disorder. These thresholds come
                  from a sample of 253 university students; clinical research is ongoing. This is a
                  research-derived comparison, not a diagnosis.
                </p>
              </div>

              {/* Visual band */}
              <div className="space-y-1" aria-hidden="true">
                <div className="flex justify-between text-[10px] text-muted-foreground tabular-nums">
                  <span>{MIN_TOTAL}</span>
                  <span className="text-nav-amber">79.5</span>
                  <span className="text-nav-coral">86.5</span>
                  <span>{MAX_TOTAL}</span>
                </div>
                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-nav-coral/70 rounded-full transition-all duration-300"
                    style={{ width: `${pct(score)}%` }}
                  />
                  <div
                    className="absolute top-0 h-full w-px bg-foreground/40"
                    style={{ left: `${pct(SOCIAL_ANXIETY_CUT)}%` }}
                  />
                  <div
                    className="absolute top-0 h-full w-px bg-foreground/40"
                    style={{ left: `${pct(ASD_CUT)}%` }}
                  />
                </div>
              </div>

              {/* Item responses */}
              <div className="border-t border-border pt-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Item responses
                </p>
                <ol className="divide-y divide-border/0">
                  {octItems.map((text, idx) => {
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
            The OCT-RS is a self-report measure of maladaptive overcontrol used in research and
            clinical settings. It is not a diagnostic instrument. Interpretation belongs in a
            conversation with a qualified clinician.
          </p>

          {/* Citation */}
          <p className="text-xs text-muted-foreground leading-relaxed">
            Seretis, D., Hempel, R. J., &amp; Lynch, T. R. (2015). The OC Trait Rating Scale.
            Unpublished manuscript, Department of Psychology, University of Southampton,
            Southampton, United Kingdom.
          </p>
        </div>
      </div>

      {/* Print-only typography tweaks scoped to this assessment. */}
      <style>{`
        @media print {
          .octrs-root {
            font-family: Georgia, "Times New Roman", serif;
            color: #000;
          }
          .octrs-root, .octrs-root * {
            background: transparent !important;
          }
          .octrs-root {
            border: none !important;
            box-shadow: none !important;
          }
          .octrs-root .assessment-content { display: block !important; }
          .octrs-root h1 { font-size: 18pt; margin-bottom: 6pt; }
          .octrs-root h2 { font-size: 14pt; }
          .octrs-root p, .octrs-root li, .octrs-root dt, .octrs-root dd {
            font-size: 10pt;
            line-height: 1.4;
          }
          .octrs-root li { page-break-inside: avoid; break-inside: avoid; }
          @page { margin: 0.6in; }
        }
      `}</style>
    </div>
  )
}
