"use client"

import { useState } from "react"

// ── Data ─────────────────────────────────────────────────────────────────────

const modalities: { name: string; items: { a: string; b: string }[] }[] = [
  {
    name: "Visual",
    items: [
      { a: "I am bothered by bright lights or sunlight", b: "I do not notice when lights are very bright" },
      { a: "I find it hard to concentrate when there is visual movement around me", b: "I do not notice movement around me" },
      { a: "I find certain colors distressing or overwhelming", b: "I do not notice colors around me" },
      { a: "I am uncomfortable in places with fluorescent lighting", b: "I do not notice the type of lighting around me" },
      { a: "I am overwhelmed by busy or patterned visual environments", b: "I do not notice visual patterns around me" },
      { a: "I find it hard to filter out visual distractions", b: "I fail to notice things in my visual field" },
    ],
  },
  {
    name: "Auditory",
    items: [
      { a: "I am bothered by everyday sounds that others don't notice", b: "I do not notice sounds that others notice" },
      { a: "I find it hard to filter out background noise", b: "I do not notice background noise" },
      { a: "I am distressed by sudden or unexpected sounds", b: "I do not notice sudden sounds" },
      { a: "I find certain sounds painful or physically uncomfortable", b: "I am not bothered by sounds that others find loud" },
      { a: "I struggle to follow conversations in noisy environments", b: "I do not notice when environments are noisy" },
      { a: "I am overwhelmed by loud music or crowds", b: "Loud sounds do not affect me" },
    ],
  },
  {
    name: "Tactile",
    items: [
      { a: "I am bothered by certain clothing textures or tags", b: "I do not notice clothing textures" },
      { a: "I find light touch uncomfortable or irritating", b: "I do not notice when people touch me lightly" },
      { a: "I find certain food textures unbearable", b: "I do not notice food textures" },
      { a: "I am bothered by the sensation of certain materials on my skin", b: "I do not notice materials on my skin" },
      { a: "I find it uncomfortable when my hair or face is touched", b: "I do not notice when my hair or face is touched" },
      { a: "I am oversensitive to temperature changes", b: "I do not notice temperature changes" },
    ],
  },
  {
    name: "Olfactory",
    items: [
      { a: "I am bothered by smells that others do not notice", b: "I do not notice smells that others notice" },
      { a: "I find certain smells overwhelming or nauseating", b: "I do not notice strong smells" },
      { a: "I can smell things from a greater distance than most people", b: "I have difficulty detecting smells" },
      { a: "Certain smells trigger strong emotional reactions in me", b: "Smells do not affect my emotions" },
      { a: "I find it hard to be in places with strong perfume or cleaning products", b: "I do not notice perfume or cleaning products" },
      { a: "Certain smells make it hard for me to concentrate", b: "Smells do not distract me" },
    ],
  },
  {
    name: "Gustatory",
    items: [
      { a: "I am very sensitive to the taste of food", b: "I do not notice differences in food taste" },
      { a: "I find certain food tastes intolerable or overwhelming", b: "I cannot easily distinguish between different flavors" },
      { a: "Bitter, sour, or strong flavors are very difficult for me to tolerate", b: "I need very strong flavors to enjoy food" },
      { a: "I notice very slight differences in food taste that others do not detect", b: "Food tastes bland to me compared to others" },
      { a: "I gag or feel sick with certain food tastes", b: "I do not notice unpleasant or bitter tastes" },
      { a: "I find it difficult to eat food with mixed textures or unexpected flavors", b: "I have difficulty tasting subtle flavors" },
    ],
  },
  {
    name: "Vestibular",
    items: [
      { a: "I feel dizzy or unsteady in situations that do not affect most people", b: "I do not notice when I am off-balance" },
      { a: "I find car, boat, or plane travel nauseating", b: "I rarely or never experience motion sickness" },
      { a: "I dislike fairground rides, lifts, or rapid changes in height or speed", b: "I enjoy extreme movement or spinning without discomfort" },
      { a: "I feel overwhelmed or disoriented by fast or spinning movement", b: "I do not notice changes in speed or direction of movement" },
      { a: "I become disoriented when changing positions quickly (e.g. standing up suddenly)", b: "I have difficulty sensing my own movement through space" },
      { a: "I feel uncomfortable on escalators, moving walkways, or uneven surfaces", b: "I do not notice when surfaces or environments are unstable" },
    ],
  },
  {
    name: "Proprioceptive",
    items: [
      { a: "I am very aware of my body position and find certain postures uncomfortable", b: "I am not aware of where my body is in space without looking" },
      { a: "I find certain physical pressures or touch sensations overwhelming", b: "I seek out intense pressure, weight, or deep touch" },
      { a: "I am very sensitive to pain", b: "I do not notice pain or physical discomfort easily" },
      { a: "I am acutely aware of my heartbeat or internal body sensations", b: "I do not notice internal body sensations such as hunger, fatigue, or pain" },
      { a: "I find it uncomfortable to be in certain body positions for any length of time", b: "I have difficulty sensing where my limbs are without looking at them" },
      { a: "I notice physical fatigue quickly and find it overwhelming", b: "I do not notice when I am physically tired or uncomfortable" },
    ],
  },
]

const SCALE = [
  { value: 0, label: "Never" },
  { value: 1, label: "Rarely" },
  { value: 2, label: "Sometimes" },
  { value: 3, label: "Often" },
  { value: 4, label: "Always" },
]

// ── Types ─────────────────────────────────────────────────────────────────────

type Answers = Partial<Record<string, number>> // e.g. "1a", "1b", "2a" …

// ── Scoring helpers ───────────────────────────────────────────────────────────

function itemNum(modIdx: number, itemIdx: number): number {
  return modIdx * 6 + itemIdx + 1
}

function modalityScores(modIdx: number, answers: Answers) {
  let hyperSum = 0, hyperCount = 0, hypoSum = 0, hypoCount = 0
  for (let i = 0; i < 6; i++) {
    const n = itemNum(modIdx, i)
    const ha = answers[`${n}a`]
    const hb = answers[`${n}b`]
    if (ha !== undefined) { hyperSum += ha; hyperCount++ }
    if (hb !== undefined) { hypoSum += hb; hypoCount++ }
  }
  return { hyperSum, hyperCount, hypoSum, hypoCount }
}

function totalScores(answers: Answers) {
  let hyperSum = 0, hyperCount = 0, hypoSum = 0, hypoCount = 0
  for (let m = 0; m < 7; m++) {
    const s = modalityScores(m, answers)
    hyperSum += s.hyperSum; hyperCount += s.hyperCount
    hypoSum += s.hypoSum;   hypoCount += s.hypoCount
  }
  return { hyperSum, hyperCount, hypoSum, hypoCount }
}

function fmtMean(sum: number, count: number): string {
  if (count === 0) return "—"
  return (sum / count).toFixed(2)
}

type SensLevel = { label: string; color: string; bg: string }

function hyperLevel(mean: number): SensLevel {
  if (mean >= 2.0) return { label: "Elevated",  color: "text-nav-coral",  bg: "bg-nav-coral/10"  }
  if (mean >= 1.0) return { label: "Moderate",  color: "text-nav-amber",  bg: "bg-nav-amber/10"  }
  return              { label: "Low",        color: "text-nav-teal",   bg: "bg-nav-teal/10"   }
}

function hypoLevel(mean: number): SensLevel {
  if (mean >= 1.5) return { label: "Elevated",  color: "text-nav-coral",  bg: "bg-nav-coral/10"  }
  if (mean >= 0.75)return { label: "Moderate",  color: "text-nav-amber",  bg: "bg-nav-amber/10"  }
  return              { label: "Low",        color: "text-nav-teal",   bg: "bg-nav-teal/10"   }
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

interface QuestionRowProps {
  itemText: string
  answerKey: string
  value: number | undefined
  type: "hyper" | "hypo"
  onSelect: (key: string, v: number) => void
}

function QuestionRow({ itemText, answerKey, value, type, onSelect }: QuestionRowProps) {
  const activeClass = type === "hyper"
    ? "bg-nav-coral text-white border-nav-coral"
    : "bg-nav-teal text-white border-nav-teal"
  const hoverClass = type === "hyper"
    ? "hover:border-nav-coral hover:text-foreground"
    : "hover:border-nav-teal hover:text-foreground"

  return (
    <div className="space-y-2">
      <p className="text-sm text-foreground leading-snug">{itemText}</p>
      <div className="grid grid-cols-5 gap-1">
        {SCALE.map((opt) => {
          const active = value === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelect(answerKey, opt.value)}
              title={opt.label}
              className={`flex flex-col items-center py-1.5 rounded border text-center transition-colors ${
                active ? activeClass : `border-border text-muted-foreground ${hoverClass}`
              }`}
            >
              <span className="text-xs font-bold">{opt.value}</span>
              <span className="text-[9px] leading-tight hidden sm:block">{opt.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

interface ModalitySectionProps {
  modIdx: number
  modality: typeof modalities[0]
  answers: Answers
  onSelect: (key: string, v: number) => void
}

function ModalitySection({ modIdx, modality, answers, onSelect }: ModalitySectionProps) {
  return (
    <section>
      <h3 className="font-[var(--font-display)] text-lg font-bold text-foreground mb-3">
        {modality.name}
      </h3>
      <ul className="space-y-4">
        {modality.items.map((item, i) => {
          const n = itemNum(modIdx, i)
          const hyperKey = `${n}a`
          const hypoKey  = `${n}b`
          return (
            <li key={n} className="rounded-md border border-border/60 p-3 sm:p-4 space-y-4">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                Item {n}
              </span>
              {/* Hypersensitivity */}
              <div>
                <p className="text-[10px] font-semibold text-nav-coral uppercase tracking-wider mb-1.5">
                  Hypersensitivity
                </p>
                <QuestionRow
                  itemText={item.a}
                  answerKey={hyperKey}
                  value={answers[hyperKey]}
                  type="hyper"
                  onSelect={onSelect}
                />
              </div>
              <div className="border-t border-border/40" />
              {/* Hyposensitivity */}
              <div>
                <p className="text-[10px] font-semibold text-nav-teal uppercase tracking-wider mb-1.5">
                  Hyposensitivity
                </p>
                <QuestionRow
                  itemText={item.b}
                  answerKey={hypoKey}
                  value={answers[hypoKey]}
                  type="hypo"
                  onSelect={onSelect}
                />
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function GSQ() {
  const [open, setOpen] = useState(false)
  const [answers, setAnswers] = useState<Answers>({})

  function select(key: string, value: number) {
    setAnswers((prev) => ({ ...prev, [key]: value }))
  }

  function reset() {
    setAnswers({})
  }

  const totals = totalScores(answers)
  const totalAnswered = totals.hyperCount + totals.hypoCount
  const hyperMean = totals.hyperCount > 0 ? totals.hyperSum / totals.hyperCount : null
  const hypoMean  = totals.hypoCount  > 0 ? totals.hypoSum  / totals.hypoCount  : null
  const hyperLvl  = hyperMean !== null ? hyperLevel(hyperMean) : null
  const hypoLvl   = hypoMean  !== null ? hypoLevel(hypoMean)  : null

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
            GSQ: Glasgow Sensory Questionnaire
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            42-item sensory profile · Robertson &amp; Simmons, 2013
          </p>
        </div>
        <div className="flex items-center gap-4 ml-4">
          {totalAnswered > 0 && (
            <span className="text-xs font-semibold tabular-nums px-2.5 py-1 rounded-full border border-border bg-muted text-muted-foreground">
              {totalAnswered}/84 answered
            </span>
          )}
          <ChevronIcon open={open} />
        </div>
      </button>

      <div className={`assessment-content ${open ? "" : "hidden"}`}>
        <div className="p-5 sm:p-6 border-t border-border space-y-10">
          {/* Print-only heading */}
          <div className="hidden print:block">
            <h1 className="text-2xl font-bold">GSQ: Glasgow Sensory Questionnaire</h1>
            <p className="text-sm text-gray-500 mt-1">Robertson &amp; Simmons, 2013</p>
          </div>

          {/* Instructions */}
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              This questionnaire asks about your sensory experiences across seven modalities. Each
              numbered item has two parts: one about <span className="font-semibold text-nav-coral">hypersensitivity</span>{" "}
              (over-responding to sensory input) and one about{" "}
              <span className="font-semibold text-nav-teal">hyposensitivity</span>{" "}
              (under-responding). Rate each statement from 0 (Never) to 4 (Always).
            </p>
            <div className="no-print flex flex-wrap gap-x-6 gap-y-1 rounded-md border border-border bg-muted/40 p-3 text-xs">
              {SCALE.map((s) => (
                <span key={s.value}>
                  <strong>{s.value}</strong> = {s.label}
                </span>
              ))}
            </div>
          </div>

          {/* Modality sections */}
          {modalities.map((mod, idx) => (
            <ModalitySection
              key={idx}
              modIdx={idx}
              modality={mod}
              answers={answers}
              onSelect={select}
            />
          ))}

          {/* Score summary */}
          {totalAnswered > 0 && (
            <div className="rounded-lg border border-border bg-muted/40 p-4 space-y-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-[var(--font-display)] text-lg font-bold text-foreground">
                  Score Summary
                </span>
                <span className="text-sm text-muted-foreground">{totalAnswered} of 84 answered</span>
              </div>

              {/* Overall hyper / hypo */}
              <div className="grid sm:grid-cols-2 gap-3">
                {hyperMean !== null && hyperLvl && (
                  <div className={`rounded-md px-3 py-2.5 ${hyperLvl.bg}`}>
                    <p className="text-[10px] font-semibold text-nav-coral uppercase tracking-wider mb-0.5">
                      Overall Hypersensitivity
                    </p>
                    <p className={`text-base font-bold tabular-nums ${hyperLvl.color}`}>
                      Mean {(hyperMean).toFixed(2)} / 4.00
                    </p>
                    <p className={`text-xs font-medium ${hyperLvl.color}`}>{hyperLvl.label}</p>
                  </div>
                )}
                {hypoMean !== null && hypoLvl && (
                  <div className={`rounded-md px-3 py-2.5 ${hypoLvl.bg}`}>
                    <p className="text-[10px] font-semibold text-nav-teal uppercase tracking-wider mb-0.5">
                      Overall Hyposensitivity
                    </p>
                    <p className={`text-base font-bold tabular-nums ${hypoLvl.color}`}>
                      Mean {(hypoMean).toFixed(2)} / 4.00
                    </p>
                    <p className={`text-xs font-medium ${hypoLvl.color}`}>{hypoLvl.label}</p>
                  </div>
                )}
              </div>

              {/* Per-modality breakdown */}
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Modality breakdown
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-1.5 pr-4 font-medium text-muted-foreground text-xs">Modality</th>
                        <th className="text-right py-1.5 px-3 font-semibold text-nav-coral text-xs whitespace-nowrap">Hyper mean</th>
                        <th className="text-right py-1.5 pl-3 font-semibold text-nav-teal text-xs whitespace-nowrap">Hypo mean</th>
                      </tr>
                    </thead>
                    <tbody>
                      {modalities.map((mod, idx) => {
                        const s = modalityScores(idx, answers)
                        return (
                          <tr key={idx} className="border-b border-border/40 last:border-0">
                            <td className="py-1.5 pr-4 text-foreground">{mod.name}</td>
                            <td className="py-1.5 px-3 text-right tabular-nums text-muted-foreground">
                              {fmtMean(s.hyperSum, s.hyperCount)}
                            </td>
                            <td className="py-1.5 pl-3 text-right tabular-nums text-muted-foreground">
                              {fmtMean(s.hypoSum, s.hypoCount)}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground italic border-t border-border pt-4 leading-relaxed">
            The GSQ is a self-report screening measure, not a diagnostic instrument. Elevated scores
            indicate sensory differences consistent with autism or sensory processing differences, but
            do not constitute a diagnosis. Scores should be interpreted by a qualified clinician.
            Robertson, A. E., &amp; Simmons, D. R. (2013). The relationship between sensory
            sensitivity and autistic traits in the general population.{" "}
            <em>Journal of Autism and Developmental Disorders, 43</em>(4), 775–784.
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
