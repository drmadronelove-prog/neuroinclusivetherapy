"use client"

import { useState } from "react"

// ── Data ─────────────────────────────────────────────────────────────────────

const scenes: { title: string; instruction: string; items: string[] }[] = [
  {
    title: "Scene 1",
    instruction: "Think of a relative or friend you frequently see.",
    items: [
      "The exact contour of face, head, shoulders, and body",
      "Characteristic poses of head, attitudes of body, etc.",
      "The precise carriage, length of step, etc., in walking",
      "The different colors worn in some familiar clothes",
    ],
  },
  {
    title: "Scene 2",
    instruction: "Visualize a rising sun.",
    items: [
      "The sun is rising above the horizon into a hazy sky",
      "The sky clears and surrounds the sun with blueness",
      "Clouds. A storm blows up, with flashes of lightning",
      "A rainbow appears",
    ],
  },
  {
    title: "Scene 3",
    instruction: "Think of the front of a shop you often go to.",
    items: [
      "The overall appearance of the shop from the opposite side of the road",
      "A window display including colors, shapes, and details of individual items for sale",
      "You are near the entrance. The color, shape, and details of the door.",
      "You enter the shop and go to the counter. The counter assistant serves you. Money changes hands.",
    ],
  },
  {
    title: "Scene 4",
    instruction: "Think of a country scene involving trees, mountains, and a lake.",
    items: [
      "The contours of the landscape",
      "The color and shape of the trees",
      "The color and shape of the lake",
      "A strong wind blows on the trees and on the lake, causing waves",
    ],
  },
]

const SCALE: { value: number; label: string; short: string }[] = [
  { value: 1, label: "No image at all", short: "1" },
  { value: 2, label: "Vague and dim", short: "2" },
  { value: 3, label: "Moderately clear and vivid", short: "3" },
  { value: 4, label: "Clear and reasonably vivid", short: "4" },
  { value: 5, label: "Perfectly clear and vivid", short: "5" },
]

// ── Types ─────────────────────────────────────────────────────────────────────

type Answers = Partial<Record<number, number>> // item 1-16 → 1-5

// ── Scoring ───────────────────────────────────────────────────────────────────

function calcScore(answers: Answers): number {
  return Object.values(answers).reduce<number>((sum, v) => sum + (v ?? 0), 0)
}

function calcAnswered(answers: Answers): number {
  return Object.values(answers).filter((v) => v !== undefined).length
}

type Band = { label: string; range: string; color: string; bg: string }

function getBand(score: number): Band {
  if (score <= 32) return { label: "Aphantasia / low imagery range",    range: "16–32", color: "text-nav-coral",  bg: "bg-nav-coral/10"  }
  if (score <= 48) return { label: "Below average imagery",             range: "33–48", color: "text-nav-amber",  bg: "bg-nav-amber/10"  }
  if (score <= 64) return { label: "Above average imagery",             range: "49–64", color: "text-nav-teal",   bg: "bg-nav-teal/10"   }
  return              { label: "Hyperphantasia / vivid imagery range",  range: "65–80", color: "text-nav-teal",   bg: "bg-nav-teal/10"   }
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

interface SceneBlockProps {
  scene: (typeof scenes)[0]
  startIndex: number
  answers: Answers
  onSelect: (itemNum: number, value: number) => void
}

function SceneBlock({ scene, startIndex, answers, onSelect }: SceneBlockProps) {
  return (
    <section>
      <div className="mb-3">
        <h3 className="font-[var(--font-display)] text-lg font-bold text-foreground leading-tight">
          {scene.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-0.5 italic">{scene.instruction}</p>
      </div>

      <ul className="space-y-4">
        {scene.items.map((item, i) => {
          const num = startIndex + i
          const selected = answers[num]

          return (
            <li key={num} className="space-y-2">
              <p className="text-sm text-foreground leading-snug">
                <span className="font-semibold tabular-nums text-muted-foreground mr-1.5">{num}.</span>
                {item}
              </p>

              {/* 5-point scale */}
              <div className="grid grid-cols-5 gap-1">
                {SCALE.map((opt) => {
                  const active = selected === opt.value
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => onSelect(num, opt.value)}
                      title={opt.label}
                      className={`flex flex-col items-center gap-0.5 py-2 px-1 rounded border text-center transition-colors ${
                        active
                          ? "bg-nav-teal text-white border-nav-teal font-semibold"
                          : "border-border text-muted-foreground hover:border-nav-teal hover:text-foreground"
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
        })}
      </ul>
    </section>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function VVIQ() {
  const [open, setOpen] = useState(false)
  const [answers, setAnswers] = useState<Answers>({})

  function select(itemNum: number, value: number) {
    setAnswers((prev) => ({ ...prev, [itemNum]: value }))
  }

  function reset() {
    setAnswers({})
  }

  const score = calcScore(answers)
  const answered = calcAnswered(answers)
  const complete = answered === 16
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
            VVIQ: Vividness of Visual Imagery
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            16-item imagery questionnaire · Marks, 1973
          </p>
        </div>
        <div className="flex items-center gap-4 ml-4">
          {answered > 0 && (
            <span className="text-xs font-semibold tabular-nums px-2.5 py-1 rounded-full border border-border bg-muted text-muted-foreground">
              {score}&thinsp;/&thinsp;80 &nbsp;·&nbsp; {answered}/16
            </span>
          )}
          <ChevronIcon open={open} />
        </div>
      </button>

      <div className={`assessment-content ${open ? "" : "hidden"}`}>
        <div className="p-5 sm:p-6 border-t border-border space-y-10">
          {/* Print-only heading */}
          <div className="hidden print:block">
            <h1 className="text-2xl font-bold">VVIQ: Vividness of Visual Imagery Questionnaire</h1>
            <p className="text-sm text-gray-500 mt-1">Marks, 1973</p>
          </div>

          {/* Instructions */}
          <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <p>
              For each item below, rate how vividly you can mentally picture the described detail.
              Close your eyes and try to form the image before rating.
            </p>
            <div className="no-print rounded-md border border-border bg-muted/40 p-3">
              <p className="font-medium text-foreground mb-1 text-xs uppercase tracking-wider">Scale</p>
              <ol className="space-y-0.5">
                {SCALE.map((s) => (
                  <li key={s.value} className="flex gap-2">
                    <span className="font-bold text-foreground w-4 flex-shrink-0">{s.value}</span>
                    <span>{s.label}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Scenes */}
          {scenes.map((scene, si) => (
            <SceneBlock
              key={si}
              scene={scene}
              startIndex={si * 4 + 1}
              answers={answers}
              onSelect={select}
            />
          ))}

          {/* Score summary */}
          {answered > 0 && (
            <div className="rounded-lg border border-border bg-muted/40 p-4 space-y-3">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-[var(--font-display)] text-lg font-bold text-foreground">
                  Total: {score} / 80
                </span>
                <span className="text-sm text-muted-foreground">{answered} of 16 answered</span>
              </div>

              {complete && band && (
                <div className={`rounded-md px-3 py-2 ${band.bg}`}>
                  <p className={`text-sm font-semibold ${band.color}`}>{band.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Score range: {band.range}</p>
                </div>
              )}

              {!complete && (
                <p className="text-xs text-muted-foreground">
                  Complete all 16 items for a full interpretation.
                </p>
              )}

              {/* Progress bar with band boundaries */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>16</span>
                  <span>32</span>
                  <span>48</span>
                  <span>64</span>
                  <span>80</span>
                </div>
                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-nav-teal rounded-full transition-all duration-300"
                    style={{ width: `${((score - 16) / 64) * 100}%` }}
                  />
                  {/* Band boundaries at 32, 48, 64 */}
                  {[32, 48, 64].map((v) => (
                    <div
                      key={v}
                      className="absolute top-0 h-full w-px bg-border"
                      style={{ left: `${((v - 16) / 64) * 100}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>Aphantasia</span>
                  <span>Below avg</span>
                  <span>Above avg</span>
                  <span>Hyperphantasia</span>
                </div>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground italic border-t border-border pt-4 leading-relaxed">
            The VVIQ is a self-report measure of imagery vividness, not a diagnostic instrument. Scores
            reflect subjective experience and should not be used as a clinical diagnosis of aphantasia or
            hyperphantasia. Marks, D. F. (1973). Visual imagery differences in the recall of pictures.
            <em> British Journal of Psychology, 64</em>(1), 17–24.
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
