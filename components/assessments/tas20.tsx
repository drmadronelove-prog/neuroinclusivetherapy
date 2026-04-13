"use client"

import { useState } from "react"

// ── Data ─────────────────────────────────────────────────────────────────────

const tasItems: string[] = [
  "I am often confused about what emotion I am feeling.",                                          // 1
  "It is difficult for me to find the right words for my feelings.",                               // 2
  "I have physical sensations that even doctors don't understand.",                                // 3
  "I am able to describe my feelings easily.",                                                     // 4  reverse
  "I prefer to analyze problems rather than just describe them.",                                  // 5  reverse
  "When I am upset, I don't know if I am sad, frightened, or angry.",                             // 6
  "I am often puzzled by sensations in my body.",                                                  // 7
  "I prefer to just let things happen rather than to understand why they turned out that way.",    // 8  reverse
  "I have feelings that I can't quite identify.",                                                  // 9
  "Being in touch with emotions is essential.",                                                    // 10 reverse
  "I find it hard to describe how I feel about people.",                                          // 11
  "People tell me to describe my feelings more.",                                                  // 12
  "I don't know what's going on inside me.",                                                       // 13
  "I often don't know why I am angry.",                                                            // 14
  "I prefer talking to people about their daily activities rather than their feelings.",           // 15 reverse
  "I prefer to watch light entertainment shows rather than psychological dramas.",                 // 16 reverse
  "It is difficult for me to reveal my innermost feelings, even to close friends.",               // 17
  "I can feel close to someone, even in moments of silence.",                                     // 18 reverse
  "I find examination of my feelings useful in solving personal problems.",                        // 19 reverse
  "Looking for hidden meanings in movies or books interferes with my enjoyment of them.",         // 20
]

const REVERSE_ITEMS = new Set([4, 5, 8, 10, 15, 16, 18, 19])

// Subscale membership (1-indexed)
const DIF_ITEMS = new Set([1, 3, 6, 7, 9, 13, 14])
const DDF_ITEMS = new Set([2, 4, 11, 12, 17])
const EOT_ITEMS = new Set([5, 8, 10, 15, 16, 18, 19, 20])

const SCALE: { value: number; label: string }[] = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neither" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
]

// ── Types ─────────────────────────────────────────────────────────────────────

type Answers = Partial<Record<number, number>> // item 1-20 → 1-5

// ── Scoring ───────────────────────────────────────────────────────────────────

function scoredValue(itemNum: number, raw: number): number {
  return REVERSE_ITEMS.has(itemNum) ? 6 - raw : raw
}

function subscaleScore(items: Set<number>, answers: Answers): number | null {
  let total = 0
  let answered = 0
  for (const n of items) {
    const v = answers[n]
    if (v !== undefined) { total += scoredValue(n, v); answered++ }
  }
  return answered === 0 ? null : total
}

function totalScore(answers: Answers): number {
  let sum = 0
  for (const [key, v] of Object.entries(answers)) {
    if (v !== undefined) sum += scoredValue(Number(key), v)
  }
  return sum
}

function answeredCount(answers: Answers): number {
  return Object.values(answers).filter((v) => v !== undefined).length
}

type Band = { label: string; range: string; color: string; bg: string }

function getBand(score: number): Band {
  if (score <= 51) return { label: "No alexithymia",       range: "20–51", color: "text-nav-teal",  bg: "bg-nav-teal/10"  }
  if (score <= 60) return { label: "Possible alexithymia", range: "52–60", color: "text-nav-amber", bg: "bg-nav-amber/10" }
  return              { label: "Alexithymia likely",        range: "61–100", color: "text-nav-coral", bg: "bg-nav-coral/10" }
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
  return (
    <li className="py-3 border-b border-border/50 last:border-0">
      <p className="text-sm text-foreground mb-2 leading-snug">
        <span className="font-semibold tabular-nums text-muted-foreground mr-1.5">{num}.</span>
        {text}
      </p>
      <div className="grid grid-cols-5 gap-1">
        {SCALE.map((opt) => {
          const active = response === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelect(opt.value)}
              title={opt.label}
              className={`flex flex-col items-center gap-0.5 py-2 px-1 rounded border text-center transition-colors ${
                active
                  ? "bg-nav-coral text-white border-nav-coral font-semibold"
                  : "border-border text-muted-foreground hover:border-nav-coral hover:text-foreground"
              }`}
            >
              <span className="text-sm font-bold">{opt.value}</span>
              <span className="text-[10px] leading-tight hidden sm:block">{opt.label}</span>
            </button>
          )
        })}
      </div>
    </li>
  )
}

interface SubscaleRowProps {
  label: string
  abbr: string
  items: Set<number>
  max: number
  answers: Answers
}

function SubscaleRow({ label, abbr, items, max, answers }: SubscaleRowProps) {
  const score = subscaleScore(items, answers)
  const answeredHere = [...items].filter((n) => answers[n] !== undefined).length

  return (
    <div className="flex items-center justify-between gap-4 py-2 border-b border-border/50 last:border-0">
      <div className="min-w-0">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="ml-1.5 text-xs text-muted-foreground">({abbr})</span>
        <span className="ml-2 text-xs text-muted-foreground tabular-nums">
          {answeredHere}/{items.size} answered
        </span>
      </div>
      <span className="text-sm font-semibold tabular-nums text-foreground flex-shrink-0">
        {score ?? "—"}&thinsp;/&thinsp;{max}
      </span>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function TAS20() {
  const [open, setOpen] = useState(false)
  const [answers, setAnswers] = useState<Answers>({})

  function select(itemNum: number, value: number) {
    setAnswers((prev) => ({ ...prev, [itemNum]: value }))
  }

  function reset() {
    setAnswers({})
  }

  const answered = answeredCount(answers)
  const score = totalScore(answers)
  const complete = answered === 20
  const band = complete ? getBand(score) : null

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      {/* Collapsible header */}
      <button
        onClick={() => setOpen(!open)}
        className="no-print w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
        aria-expanded={open}
      >
        <div>
          <h2 className="font-[var(--font-display)] text-xl font-bold text-foreground">
            TAS-20: Toronto Alexithymia Scale
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            20-item alexithymia screening · Bagby, Parker &amp; Taylor, 1994
          </p>
        </div>
        <div className="flex items-center gap-4 ml-4">
          {answered > 0 && (
            <span className="text-xs font-semibold tabular-nums px-2.5 py-1 rounded-full border border-border bg-muted text-muted-foreground">
              {score}&thinsp;/&thinsp;100 &nbsp;·&nbsp; {answered}/20
            </span>
          )}
          <ChevronIcon open={open} />
        </div>
      </button>

      <div className={`assessment-content ${open ? "" : "hidden"}`}>
        <div className="p-5 sm:p-6 border-t border-border space-y-8">
          {/* Print-only heading */}
          <div className="hidden print:block">
            <h1 className="text-2xl font-bold">TAS-20: Toronto Alexithymia Scale</h1>
            <p className="text-sm text-gray-500 mt-1">Bagby, Parker &amp; Taylor, 1994</p>
          </div>

          {/* Instructions */}
          <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <p>
              Rate how strongly each statement applies to you using the 5-point scale below.
              Answer based on how you generally feel, not just today.
            </p>
            <div className="no-print rounded-md border border-border bg-muted/40 p-3">
              <p className="font-medium text-foreground mb-1 text-xs uppercase tracking-wider">Scale</p>
              <ol className="flex flex-wrap gap-x-6 gap-y-0.5">
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
            {tasItems.map((text, idx) => {
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

          {/* Score summary */}
          {answered > 0 && (
            <div className="rounded-lg border border-border bg-muted/40 p-4 space-y-4">
              {/* Total */}
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-[var(--font-display)] text-lg font-bold text-foreground">
                  Total: {score} / 100
                </span>
                <span className="text-sm text-muted-foreground">{answered} of 20 answered</span>
              </div>

              {complete && band && (
                <div className={`rounded-md px-3 py-2 ${band.bg}`}>
                  <p className={`text-sm font-semibold ${band.color}`}>{band.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Score range: {band.range}</p>
                </div>
              )}

              {!complete && (
                <p className="text-xs text-muted-foreground">
                  Complete all 20 items for a full interpretation.
                </p>
              )}

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>20</span>
                  <span className="text-nav-teal">51 (no alexithymia)</span>
                  <span className="text-nav-amber">60</span>
                  <span>100</span>
                </div>
                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-nav-coral rounded-full transition-all duration-300"
                    style={{ width: `${((score - 20) / 80) * 100}%` }}
                  />
                  <div className="absolute top-0 h-full w-px bg-nav-teal/70"  style={{ left: `${((51 - 20) / 80) * 100}%` }} />
                  <div className="absolute top-0 h-full w-px bg-nav-amber/70" style={{ left: `${((60 - 20) / 80) * 100}%` }} />
                </div>
              </div>

              {/* Subscales */}
              <div className="border-t border-border pt-4 space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Subscale scores
                </p>
                <SubscaleRow
                  label="Difficulty Identifying Feelings"
                  abbr="DIF"
                  items={DIF_ITEMS}
                  max={35}
                  answers={answers}
                />
                <SubscaleRow
                  label="Difficulty Describing Feelings"
                  abbr="DDF"
                  items={DDF_ITEMS}
                  max={25}
                  answers={answers}
                />
                <SubscaleRow
                  label="Externally Oriented Thinking"
                  abbr="EOT"
                  items={EOT_ITEMS}
                  max={40}
                  answers={answers}
                />
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground italic border-t border-border pt-4 leading-relaxed">
            The TAS-20 is a screening tool, not a diagnostic instrument. A score in the alexithymia
            range does not constitute a clinical diagnosis. Results should be discussed with a qualified
            mental health professional. Bagby, R. M., Parker, J. D. A., &amp; Taylor, G. J. (1994).
            The twenty-item Toronto Alexithymia Scale. <em>Journal of Psychosomatic Research,
            38</em>(1), 23–32.
          </p>

          {/* Action buttons */}
          <div className="no-print flex flex-wrap gap-3">
            <button
              onClick={reset}
              className="px-4 py-2 text-sm font-medium border border-border rounded-md hover:bg-muted transition-colors"
            >
              Clear / Reset
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 text-sm font-medium bg-foreground text-background rounded-md hover:opacity-90 transition-opacity"
            >
              Print / Save as PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
