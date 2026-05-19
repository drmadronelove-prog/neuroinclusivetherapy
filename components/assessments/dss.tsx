"use client"

import { useState } from "react"

// ── Data ──────────────────────────────────────────────────────────────────────

// 20 items, verbatim from the Dissociative Symptoms Scale (DSS),
// National Center for PTSD. Carlson, E. B., Waelde, L. C., Palmieri, P. A.,
// Macia, K. S., Smith, S. R., & McDade-Montez, E. (2018).
const dssItems: string[] = [
  "My body felt strange or unreal.",
  "Things around me seemed strange or unreal.",
  "I got reminded of something upsetting and then spaced out for a while.",
  "I had moments when I lost control and acted like I was back in an upsetting time in my past.",
  "I felt like I was outside myself, watching myself do things.",
  "I heard something that I know really wasn't there.",
  "I got upset about something and can't remember what happened next.",
  "I felt like I was in a movie – like nothing that was happening was real.",
  "I didn't feel pain when I was hurt and should have felt something.",
  "A memory came back to me that was so strong that I lost track of what was going on around me.",
  "I found myself staring into space and thinking of nothing.",
  "I couldn't remember things that had happened during the day even when I tried to.",
  "I felt like I wasn't myself.",
  "I saw something that seemed real, but was not.",
  "I suddenly realized that I hadn't been paying attention to what was going on around me.",
  "Parts of my body seemed distorted - like they were bigger or smaller than usual.",
  "I reacted to people or situations as if I were back in an upsetting time in my past.",
  "I got so focused on something going on in my mind that I lost track of what was happening around me.",
  "I noticed there were gaps in my memory for things that happened to me that I should be able to remember.",
  "I smelled something that I know really wasn't there.",
]

const SCALE: { value: number; label: string; short: string }[] = [
  { value: 0, label: "Not at all",            short: "Not at\nall" },
  { value: 1, label: "Once or twice",         short: "Once or\ntwice" },
  { value: 2, label: "Almost every day",      short: "Almost\nevery day" },
  { value: 3, label: "About once a day",      short: "About\nonce a day" },
  { value: 4, label: "More than once a day",  short: "More than\nonce a day" },
]

type Answers = Partial<Record<number, number>>

function totalScore(answers: Answers): number {
  let sum = 0
  for (const v of Object.values(answers)) {
    if (typeof v === "number") sum += v
  }
  return sum
}

function answeredCount(answers: Answers): number {
  return Object.values(answers).filter((v) => typeof v === "number").length
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
  const groupId = `dss-item-${num}`
  return (
    <li className="py-3 border-b border-border/50 last:border-0 print:break-inside-avoid">
      <fieldset>
        <legend id={groupId} className="text-sm text-foreground mb-2 leading-snug">
          <span className="font-semibold tabular-nums text-muted-foreground mr-1.5">{num}.</span>
          {text}
        </legend>
        <div
          className="grid grid-cols-5 gap-1"
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

function ItemReadout({ num, text, response }: { num: number; text: string; response: number }) {
  const label = SCALE.find((s) => s.value === response)?.label ?? ""
  return (
    <li className="py-2 border-b border-border/50 last:border-0 print:break-inside-avoid">
      <div className="flex items-start justify-between gap-4 text-sm">
        <p className="text-foreground leading-snug">
          <span className="font-semibold tabular-nums text-muted-foreground mr-1.5">{num}.</span>
          {text}
        </p>
        <span className="shrink-0 tabular-nums text-foreground font-medium">
          {response} <span className="text-muted-foreground font-normal">({label})</span>
        </span>
      </div>
    </li>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function DSS() {
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
  const complete = answered === dssItems.length
  const mean = complete ? score / dssItems.length : 0

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!complete) return
    setSubmitted(true)
    if (typeof window !== "undefined") {
      requestAnimationFrame(() => {
        document.getElementById("dss-results")?.scrollIntoView({ behavior: "smooth", block: "start" })
      })
    }
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card dss-root">
      {/* Collapsible header */}
      <button
        onClick={() => setOpen(!open)}
        className="no-print w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
        aria-expanded={open}
      >
        <div>
          <h2 className="font-[var(--font-display)] text-xl font-bold text-foreground">
            DSS: Dissociative Symptoms Scale
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            20-item self-report measure of dissociative symptoms · Carlson et al., 2018
          </p>
        </div>
        <div className="flex items-center gap-4 ml-4">
          {answered > 0 && (
            <span className="text-xs font-semibold tabular-nums px-2.5 py-1 rounded-full border border-border bg-muted text-muted-foreground">
              {answered}/{dssItems.length} answered
            </span>
          )}
          <ChevronIcon open={open} />
        </div>
      </button>

      <div className={`assessment-content ${open ? "" : "hidden"}`}>
        <div className="p-5 sm:p-6 border-t border-border space-y-8">
          {/* Print-only heading */}
          <div className="hidden print:block space-y-2 mb-2">
            <h1 className="text-2xl font-bold">DSS: Dissociative Symptoms Scale</h1>
            <p className="text-sm">Carlson et al., 2018 · National Center for PTSD · 20-item self-report</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Instructions */}
            <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
              <p>
                For each statement below, choose the response that best shows how
                much each thing has happened to you <strong>in the past week</strong>.
                All {dssItems.length} items are required.
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
              {dssItems.map((text, idx) => {
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
                {answered} of {dssItems.length} answered
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
          {submitted && complete && (
            <div id="dss-results" className="rounded-lg border border-border bg-muted/40 p-4 space-y-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-[var(--font-display)] text-lg font-bold text-foreground">
                  Total raw score: {score} / 80
                </span>
                <span className="text-sm text-muted-foreground">
                  {dssItems.length} of {dssItems.length} answered
                </span>
              </div>

              {/* Mean score */}
              <div className="rounded-md px-3 py-2 bg-nav-teal/10">
                <p className="text-sm font-semibold text-nav-teal">
                  Mean item score: {mean.toFixed(2)} / 4
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Each item is rated 0–4; higher total and mean scores indicate
                  greater severity of dissociative symptoms over the past week.
                  This is a research screening measure, not a diagnosis.
                </p>
              </div>

              {/* Visual band */}
              <div className="space-y-1" aria-hidden="true">
                <div className="flex justify-between text-[10px] text-muted-foreground tabular-nums">
                  <span>0</span>
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                </div>
                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-nav-teal/70 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, Math.max(0, (mean / 4) * 100))}%` }}
                  />
                </div>
              </div>

              {/* Item responses */}
              <div className="border-t border-border pt-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Item responses
                </p>
                <ol className="divide-y divide-border/0">
                  {dssItems.map((text, idx) => {
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
            The DSS is a self-report screening measure used in clinical and research
            settings for dissociative symptoms. It is not a diagnostic instrument.
            Interpretation belongs in a conversation with a qualified clinician.
          </p>

          {/* Citation */}
          <p className="text-xs text-muted-foreground leading-relaxed">
            Carlson, E. B., Waelde, L. C., Palmieri, P. A., Macia, K. S., Smith, S. R.,
            &amp; McDade-Montez, E. (2018). Development and validation of the
            Dissociative Symptoms Scale. <em>Assessment, 25</em>(1), 84 to 98.
            National Center for PTSD.
          </p>
        </div>
      </div>

      {/* Print-only typography tweaks scoped to this assessment. */}
      <style>{`
        @media print {
          .dss-root {
            font-family: Georgia, "Times New Roman", serif;
            color: #000;
          }
          .dss-root, .dss-root * {
            background: transparent !important;
          }
          .dss-root {
            border: none !important;
            box-shadow: none !important;
          }
          .dss-root .assessment-content { display: block !important; }
          .dss-root h1 { font-size: 18pt; margin-bottom: 6pt; }
          .dss-root h2 { font-size: 14pt; }
          .dss-root p, .dss-root li, .dss-root dt, .dss-root dd {
            font-size: 10pt;
            line-height: 1.4;
          }
          .dss-root li { page-break-inside: avoid; break-inside: avoid; }
          @page { margin: 0.6in; }
        }
      `}</style>
    </div>
  )
}
