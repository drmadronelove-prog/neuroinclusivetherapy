"use client"

import { useState } from "react"

// ── Data ─────────────────────────────────────────────────────────────────────

const mdsItems: { question: string; lowLabel: string; highLabel: string }[] = [
  {
    question: "How often do you daydream?",
    lowLabel: "Never",
    highLabel: "Always, constantly",
  },
  {
    question: "When you daydream, how vivid or lifelike are your daydreams?",
    lowLabel: "Not at all vivid",
    highLabel: "Extremely vivid, like reality",
  },
  {
    question: "When you daydream, how much do you enjoy it?",
    lowLabel: "Not at all",
    highLabel: "Extremely — it is the most pleasurable activity I know",
  },
  {
    question: "How difficult is it for you to stop daydreaming once you have started?",
    lowLabel: "Very easy to stop",
    highLabel: "Impossible to stop, I have no control",
  },
  {
    question: "How much does daydreaming interfere with your daily functioning (work, studies, relationships)?",
    lowLabel: "Not at all",
    highLabel: "Completely disrupts my life",
  },
  {
    question: "How much do you prefer daydreaming to performing real-life activities?",
    lowLabel: "I always prefer real activities",
    highLabel: "I always prefer daydreaming",
  },
  {
    question: "How distressed are you about your daydreaming?",
    lowLabel: "Not at all distressed",
    highLabel: "Extremely distressed",
  },
  {
    question: "How often do you daydream while doing routine activities (e.g. chores, walking)?",
    lowLabel: "Never",
    highLabel: "Always",
  },
  {
    question: "How often do you use music, movement, or other triggers to induce daydreaming?",
    lowLabel: "Never",
    highLabel: "Always — I cannot daydream without them",
  },
  {
    question: "How real do the characters and worlds in your daydreams feel to you?",
    lowLabel: "Not real at all",
    highLabel: "Completely real",
  },
  {
    question: "How often do you lose track of time while daydreaming?",
    lowLabel: "Never",
    highLabel: "Always",
  },
  {
    question: "How much do you feel addicted to daydreaming?",
    lowLabel: "Not at all",
    highLabel: "Completely addicted",
  },
  {
    question: "How much do you feel that your daydreaming is out of control?",
    lowLabel: "Completely in control",
    highLabel: "Completely out of control",
  },
  {
    question: "How often do you make movements or sounds while daydreaming (e.g. pacing, whispering, facial expressions)?",
    lowLabel: "Never",
    highLabel: "Always",
  },
  {
    question: "How often do you daydream in order to escape from negative emotions or difficult situations?",
    lowLabel: "Never",
    highLabel: "Always",
  },
  {
    question: "How often do you find yourself daydreaming when you should be doing something else?",
    lowLabel: "Never",
    highLabel: "Always",
  },
]

// ── Types ─────────────────────────────────────────────────────────────────────

// values: current slider position (0–100); rated: items the user has actively touched
type SliderValues = Record<number, number>

// ── Scoring ───────────────────────────────────────────────────────────────────

function meanScore(values: SliderValues, rated: Set<number>): number | null {
  if (rated.size === 0) return null
  const sum = [...rated].reduce((acc, n) => acc + (values[n] ?? 0), 0)
  return Math.round(sum / rated.size)
}

type Band = { label: string; color: string; bg: string }

function getBand(mean: number): Band {
  if (mean >= 60) return { label: "Significant maladaptive daydreaming (≥ 60)",   color: "text-nav-coral",  bg: "bg-nav-coral/10"  }
  if (mean >= 40) return { label: "Possible maladaptive daydreaming (40–59)",      color: "text-nav-amber", bg: "bg-nav-amber/10" }
  return              { label: "Below clinical threshold (< 40)",                  color: "text-nav-teal",  bg: "bg-nav-teal/10"  }
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

interface SliderItemProps {
  num: number
  question: string
  lowLabel: string
  highLabel: string
  value: number
  isRated: boolean
  onChange: (num: number, val: number) => void
  onTouch: (num: number) => void
}

function SliderItem({ num, question, lowLabel, highLabel, value, isRated, onChange, onTouch }: SliderItemProps) {
  return (
    <li className="py-4 border-b border-border/50 last:border-0 space-y-3">
      <p className="text-sm text-foreground leading-snug">
        <span className="font-semibold tabular-nums text-muted-foreground mr-1.5">{num}.</span>
        {question}
      </p>

      {/* Percentage markers */}
      <div className="flex justify-between text-[10px] text-muted-foreground px-0.5">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>

      {/* Slider + current value */}
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={0}
          max={100}
          step={10}
          value={value}
          onChange={(e) => onChange(num, Number(e.target.value))}
          onPointerDown={() => onTouch(num)}
          className="flex-1 h-2 cursor-pointer accent-amber-500"
          style={{ accentColor: "var(--nav-amber)" }}
          aria-label={question}
        />
        <span
          className={`text-sm font-bold tabular-nums w-10 text-right flex-shrink-0 ${
            isRated ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {isRated ? `${value}%` : "—"}
        </span>
      </div>

      {/* Visual fill bar */}
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-nav-amber rounded-full transition-all duration-100"
          style={{ width: isRated ? `${value}%` : "0%" }}
        />
      </div>

      {/* Endpoint labels */}
      <div className="flex justify-between text-[10px] text-muted-foreground leading-tight gap-4 px-0.5">
        <span className="max-w-[45%]">{lowLabel}</span>
        <span className="max-w-[45%] text-right">{highLabel}</span>
      </div>
    </li>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function MDS16() {
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState<SliderValues>({})
  const [rated, setRated] = useState<Set<number>>(new Set())

  function handleChange(num: number, val: number) {
    setValues((prev) => ({ ...prev, [num]: val }))
    setRated((prev) => new Set([...prev, num]))
  }

  function handleTouch(num: number) {
    // Mark rated immediately on first contact so value 0 is valid
    setRated((prev) => new Set([...prev, num]))
    setValues((prev) => ({ [num]: 0, ...prev })) // only sets 0 if not already set
  }

  function reset() {
    setValues({})
    setRated(new Set())
  }

  const answered = rated.size
  const mean = meanScore(values, rated)
  const complete = answered === 16
  const band = mean !== null && complete ? getBand(mean) : null

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
            MDS-16: Maladaptive Daydreaming Scale
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            16-item daydreaming questionnaire · Somer et al., 2017
          </p>
        </div>
        <div className="flex items-center gap-4 ml-4">
          {answered > 0 && mean !== null && (
            <span className="text-xs font-semibold tabular-nums px-2.5 py-1 rounded-full border border-border bg-muted text-muted-foreground">
              Mean: {mean} &nbsp;·&nbsp; {answered}/16
            </span>
          )}
          <ChevronIcon open={open} />
        </div>
      </button>

      <div className={`assessment-content ${open ? "" : "hidden"}`}>
        <div className="p-5 sm:p-6 border-t border-border space-y-8">
          {/* Print-only heading */}
          <div className="hidden print:block">
            <h1 className="text-2xl font-bold">MDS-16: Maladaptive Daydreaming Scale</h1>
            <p className="text-sm text-gray-500 mt-1">Somer et al., 2017</p>
          </div>

          {/* Instructions */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            For each question, move the slider to indicate how much each statement applies to you,
            from 0% (not at all / never) to 100% (completely / always). There are no right or wrong
            answers — respond based on your typical experience.
          </p>

          {/* Items */}
          <ul className="divide-y divide-border/0">
            {mdsItems.map((item, idx) => {
              const num = idx + 1
              return (
                <SliderItem
                  key={num}
                  num={num}
                  question={item.question}
                  lowLabel={item.lowLabel}
                  highLabel={item.highLabel}
                  value={values[num] ?? 0}
                  isRated={rated.has(num)}
                  onChange={handleChange}
                  onTouch={handleTouch}
                />
              )
            })}
          </ul>

          {/* Score summary */}
          {answered > 0 && mean !== null && (
            <div className="rounded-lg border border-border bg-muted/40 p-4 space-y-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-[var(--font-display)] text-lg font-bold text-foreground">
                  Mean score: {mean} / 100
                </span>
                <span className="text-sm text-muted-foreground">{answered} of 16 answered</span>
              </div>

              {complete && band && (
                <div className={`rounded-md px-3 py-2 ${band.bg}`}>
                  <p className={`text-sm font-semibold ${band.color}`}>{band.label}</p>
                </div>
              )}

              {!complete && (
                <p className="text-xs text-muted-foreground">
                  Complete all 16 items for a full interpretation.
                </p>
              )}

              {/* Progress bar with threshold markers */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>0</span>
                  <span className="text-nav-amber">40 (threshold)</span>
                  <span className="text-nav-coral">60</span>
                  <span>100</span>
                </div>
                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-nav-amber rounded-full transition-all duration-300"
                    style={{ width: `${mean}%` }}
                  />
                  <div className="absolute top-0 h-full w-px bg-nav-amber/70" style={{ left: "40%" }} />
                  <div className="absolute top-0 h-full w-px bg-nav-coral/70" style={{ left: "60%" }} />
                </div>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground italic border-t border-border pt-4 leading-relaxed">
            The MDS-16 is a screening tool, not a diagnostic instrument. Maladaptive daydreaming is
            not currently a recognized clinical diagnosis but is an area of active research. A score
            above threshold should be discussed with a mental health professional. Somer, E.,
            Soffer-Dudek, N., Ross, C. A., &amp; Halpern, N. (2017). Maladaptive daydreaming:
            Proposed diagnostic criteria and their assessment with a structured clinical interview.{" "}
            <em>Psychology of Consciousness: Theory, Research, and Practice, 4</em>(2), 176–189.
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
