"use client"

import { useState } from "react"

// ── Data ─────────────────────────────────────────────────────────────────────

const subscales: { name: string; short: string; items: string[] }[] = [
  {
    name: "Psychomotor",
    short: "Psychomotor",
    items: [
      "I have a lot of physical energy that I need to release.",
      "I talk rapidly and feel compelled to keep talking.",
      "I feel driven to be active almost all the time.",
      "I have difficulty sitting still for long periods.",
      "I act impulsively without thinking through consequences.",
      "I am very competitive in games and sports.",
      "I have a strong need to move or fidget when sitting.",
      "I sleep less than most people and still feel energetic.",
      "I speak very quickly when excited.",
      "I channel my energy into many activities simultaneously.",
    ],
  },
  {
    name: "Sensory",
    short: "Sensory",
    items: [
      "I am deeply moved by music, art, or natural beauty.",
      "I have strong sensory preferences or aversions (textures, sounds, tastes).",
      "Beautiful things — art, nature, music — can bring me to tears.",
      "I am very sensitive to aesthetic details others seem not to notice.",
      "I am easily overwhelmed by sensory input in busy environments.",
      "I seek out intense sensory experiences.",
      "I have strong reactions to tastes, smells, or textures.",
      "I am deeply affected by the beauty or ugliness of my surroundings.",
      "I notice subtle sensory details others miss.",
      "I find certain sensory experiences almost unbearably pleasurable or painful.",
    ],
  },
  {
    name: "Intellectual",
    short: "Intellectual",
    items: [
      "I love asking deep questions and seeking answers.",
      "I am intensely curious about many topics.",
      "I can concentrate on intellectual problems for very long periods.",
      "I love learning for its own sake, not just for practical purposes.",
      "I often think about thinking itself — how my mind works.",
      "I become absorbed in theoretical or philosophical problems.",
      "I have a wide range of intense intellectual interests.",
      "I seek to understand complex systems and how things connect.",
      "I am driven to read, research, and learn beyond what is required.",
      "I am frustrated when intellectual discussions stay at a surface level.",
    ],
  },
  {
    name: "Imaginational",
    short: "Imaginational",
    items: [
      "I have a very rich and vivid fantasy life.",
      "I mix fantasy and reality in my thinking.",
      "I create elaborate imaginary worlds or scenarios.",
      "I have very vivid dreams.",
      "I learn best through imagery, metaphor, and story.",
      "I find it easy to visualize complex scenes in detail.",
      "My imagination often takes over and I lose track of time.",
      "I have strong emotional reactions to fictional characters or events.",
      "I think in images, symbols, or metaphors rather than words.",
      "I have a hard time distinguishing intense imaginings from memories.",
    ],
  },
  {
    name: "Emotional",
    short: "Emotional",
    items: [
      "I feel emotions very intensely compared to others.",
      "I have strong emotional reactions to injustice or suffering.",
      "I form deep and lasting emotional bonds.",
      "I am highly empathic and absorb others' emotions.",
      "I experience extreme highs and lows emotionally.",
      "I feel responsible for others' emotional wellbeing.",
      "I have intense reactions to criticism or perceived rejection.",
      "I feel loneliness and a longing for deep connection acutely.",
      "My emotions can overwhelm my ability to think clearly.",
      "I have a deep inner life that others rarely see.",
    ],
  },
]

const SCALE: { value: number; label: string }[] = [
  { value: 1, label: "Not at all like me" },
  { value: 2, label: "Slightly like me" },
  { value: 3, label: "Moderately like me" },
  { value: 4, label: "Very much like me" },
  { value: 5, label: "Extremely like me" },
]

// Subscale colors (one per OE domain)
const SUBSCALE_COLORS = [
  { text: "text-nav-coral",  bg: "bg-nav-coral/10",  border: "border-nav-coral",  active: "bg-nav-coral text-white border-nav-coral"  },
  { text: "text-nav-amber",  bg: "bg-nav-amber/10",  border: "border-nav-amber",  active: "bg-nav-amber text-white border-nav-amber"  },
  { text: "text-nav-teal",   bg: "bg-nav-teal/10",   border: "border-nav-teal",   active: "bg-nav-teal text-white border-nav-teal"   },
  { text: "text-nav-salmon", bg: "bg-nav-salmon/10", border: "border-nav-salmon", active: "bg-nav-salmon text-white border-nav-salmon" },
  { text: "text-nav-coral",  bg: "bg-nav-coral/10",  border: "border-nav-coral",  active: "bg-nav-coral text-white border-nav-coral"  },
]

// ── Types ─────────────────────────────────────────────────────────────────────

type Answers = Partial<Record<number, number>> // item 1-50 → 1-5

// ── Scoring ───────────────────────────────────────────────────────────────────

function subscaleScore(subIdx: number, answers: Answers): { sum: number; count: number } {
  let sum = 0, count = 0
  const start = subIdx * 10 + 1
  for (let n = start; n < start + 10; n++) {
    const v = answers[n]
    if (v !== undefined) { sum += v; count++ }
  }
  return { sum, count }
}

function totalScore(answers: Answers): { sum: number; count: number } {
  let sum = 0, count = 0
  for (const v of Object.values(answers)) {
    if (v !== undefined) { sum += v; count++ }
  }
  return { sum, count }
}

type Band = { label: string; color: string }

function getBand(score: number): Band {
  if (score >= 36) return { label: "High",     color: "text-nav-coral"  }
  if (score >= 21) return { label: "Moderate", color: "text-nav-amber"  }
  return              { label: "Low",       color: "text-nav-teal"   }
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none" stroke="currentColor" viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

interface ItemRowProps {
  num: number
  text: string
  response: number | undefined
  subIdx: number
  onSelect: (n: number, v: number) => void
}

function ItemRow({ num, text, response, subIdx, onSelect }: ItemRowProps) {
  const colors = SUBSCALE_COLORS[subIdx]
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
              onClick={() => onSelect(num, opt.value)}
              title={opt.label}
              className={`flex flex-col items-center gap-0.5 py-1.5 px-0.5 rounded border text-center transition-colors ${
                active
                  ? colors.active
                  : `border-border text-muted-foreground hover:${colors.border} hover:text-foreground`
              }`}
            >
              <span className="text-sm font-bold">{opt.value}</span>
              <span className="text-[9px] leading-tight hidden sm:block">{opt.label}</span>
            </button>
          )
        })}
      </div>
    </li>
  )
}

interface SubscaleSectionProps {
  subIdx: number
  subscale: typeof subscales[0]
  startItem: number
  answers: Answers
  onSelect: (n: number, v: number) => void
}

function SubscaleSection({ subIdx, subscale, startItem, answers, onSelect }: SubscaleSectionProps) {
  const colors = SUBSCALE_COLORS[subIdx]
  const { sum, count } = subscaleScore(subIdx, answers)

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h3 className={`font-[var(--font-display)] text-lg font-bold ${colors.text}`}>
          {subscale.name} Overexcitability
        </h3>
        {count > 0 && (
          <span className={`text-xs font-semibold tabular-nums px-2.5 py-1 rounded-full border ${colors.border} ${colors.bg} ${colors.text}`}>
            {sum}&thinsp;/&thinsp;50 &nbsp;·&nbsp; {count}/10
          </span>
        )}
      </div>
      <ul className="divide-y divide-border/0">
        {subscale.items.map((text, i) => {
          const num = startItem + i
          return (
            <ItemRow
              key={num}
              num={num}
              text={text}
              response={answers[num]}
              subIdx={subIdx}
              onSelect={onSelect}
            />
          )
        })}
      </ul>
    </section>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function OEQ2() {
  const [open, setOpen] = useState(false)
  const [answers, setAnswers] = useState<Answers>({})

  function select(n: number, v: number) {
    setAnswers((prev) => ({ ...prev, [n]: v }))
  }

  function reset() {
    setAnswers({})
  }

  const { sum: total, count: answered } = totalScore(answers)
  const complete = answered === 50

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
            OEQ-II: Overexcitabilities Questionnaire
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            50-item Dabrowski overexcitabilities profile · Falk et al., 1999
          </p>
        </div>
        <div className="flex items-center gap-4 ml-4">
          {answered > 0 && (
            <span className="text-xs font-semibold tabular-nums px-2.5 py-1 rounded-full border border-border bg-muted text-muted-foreground">
              {total}&thinsp;/&thinsp;250 &nbsp;·&nbsp; {answered}/50
            </span>
          )}
          <ChevronIcon open={open} />
        </div>
      </button>

      <div className={`assessment-content ${open ? "" : "hidden"}`}>
        <div className="p-5 sm:p-6 border-t border-border space-y-10">
          {/* Print-only heading */}
          <div className="hidden print:block">
            <h1 className="text-2xl font-bold">OEQ-II: Overexcitabilities Questionnaire</h1>
            <p className="text-sm text-gray-500 mt-1">Falk et al., 1999</p>
          </div>

          {/* Instructions */}
          <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <p>
              Rate how well each statement describes you using the scale below. Answer based on
              your overall experience across your life, not just how you feel today.
            </p>
            <div className="no-print rounded-md border border-border bg-muted/40 p-3 flex flex-wrap gap-x-6 gap-y-0.5 text-xs">
              {SCALE.map((s) => (
                <span key={s.value}>
                  <strong>{s.value}</strong> = {s.label}
                </span>
              ))}
            </div>
          </div>

          {/* Subscale sections */}
          {subscales.map((sub, idx) => (
            <SubscaleSection
              key={idx}
              subIdx={idx}
              subscale={sub}
              startItem={idx * 10 + 1}
              answers={answers}
              onSelect={select}
            />
          ))}

          {/* Score summary */}
          {answered > 0 && (
            <div className="rounded-lg border border-border bg-muted/40 p-4 space-y-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-[var(--font-display)] text-lg font-bold text-foreground">
                  Total: {total} / 250
                </span>
                <span className="text-sm text-muted-foreground">{answered} of 50 answered</span>
              </div>

              {/* Subscale score grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {subscales.map((sub, idx) => {
                  const { sum, count } = subscaleScore(idx, answers)
                  const colors = SUBSCALE_COLORS[idx]
                  if (count === 0) return null
                  const fullScore = count === 10 ? sum : null
                  const band = fullScore !== null ? getBand(fullScore) : null
                  return (
                    <div key={idx} className={`rounded-md px-3 py-2.5 border ${colors.border} ${colors.bg}`}>
                      <p className={`text-xs font-semibold uppercase tracking-wider ${colors.text} mb-0.5`}>
                        {sub.short}
                      </p>
                      <p className="text-base font-bold tabular-nums text-foreground">
                        {sum}&thinsp;/&thinsp;50
                      </p>
                      {band && (
                        <p className={`text-xs font-medium ${band.color}`}>{band.label}</p>
                      )}
                      {count < 10 && (
                        <p className="text-[10px] text-muted-foreground">{count}/10 answered</p>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Total progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>50</span>
                  <span>150</span>
                  <span>250</span>
                </div>
                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-nav-amber rounded-full transition-all duration-300"
                    style={{ width: `${((total - 50) / 200) * 100}%` }}
                  />
                </div>
              </div>

              {!complete && (
                <p className="text-xs text-muted-foreground">
                  Complete all 50 items for a full profile.
                </p>
              )}
            </div>
          )}

          {/* Clinical note */}
          <div className="rounded-md border border-border bg-muted/40 p-3 text-xs text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">Clinical note: </span>
            Overexcitabilities are associated with giftedness and intense lived experience, and
            frequently co-occur with ADHD and autism presentations. High scores do not indicate
            pathology — they reflect depth of experience, intensity of perception, and richness of
            inner life. Overexcitabilities can be both a source of strength and a source of
            difficulty depending on context and support.
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground italic border-t border-border pt-4 leading-relaxed">
            The OEQ-II is a self-report screening tool, not a diagnostic instrument. Scores do not
            constitute a diagnosis of any condition. Falk, R. F., Lind, S., Miller, N. B., Piechowski,
            M. M., &amp; Silverman, L. K. (1999). The Overexcitability Questionnaire-Two: Giving
            voice to the intensity of human experience.{" "}
            <em>Roeper Review, 21</em>(4), 251–256.
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
