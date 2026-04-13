"use client"

import { useState } from "react"

// ── Data ────────────────────────────────────────────────────────────────────

const inattentionItems = [
  "Often fails to give close attention to details or makes careless mistakes",
  "Often has difficulty sustaining attention in tasks or play activities",
  "Often does not seem to listen when spoken to directly",
  "Often does not follow through on instructions; fails to finish tasks",
  "Often has difficulty organizing tasks and activities",
  "Often avoids or is reluctant to engage in tasks requiring sustained mental effort",
  "Often loses things necessary for tasks or activities",
  "Is often easily distracted by extraneous stimuli",
  "Is often forgetful in daily activities",
]

const hyperactivityItems = [
  "Often fidgets with or taps hands or feet, or squirms in seat",
  "Often leaves seat in situations when remaining seated is expected",
  "Often runs about or climbs in situations where it is inappropriate",
  "Often unable to play or engage in leisure activities quietly",
  'Is often "on the go," acting as if "driven by a motor"',
  "Often talks excessively",
  "Often blurts out an answer before a question has been completed",
  "Often has difficulty waiting their turn",
  "Often interrupts or intrudes on others",
]

const communityCategories: { id: string; label: string; items: string[] }[] = [
  {
    id: "executive",
    label: "Executive Function",
    items: [
      "Time blindness / temporal agnosia: cannot feel time passing; world divided into NOW vs NOT-NOW",
      "Difficulty initiating tasks despite wanting to do them (task initiation failure)",
      "Difficulty transitioning between tasks (high switching costs)",
      "Poor working memory: loses train of thought mid-sentence",
      "Difficulty prioritizing — everything feels equally urgent or equally unimportant",
      "Chronic underestimation of how long tasks take",
      "Planning paralysis — knowing what to do but unable to start",
      "Difficulty holding multiple steps in mind simultaneously",
      "Forgetting what you were doing mid-task",
      "Starting many things; finishing few",
    ],
  },
  {
    id: "attention",
    label: "Attention and Arousal",
    items: [
      "Hyperfocus: complete absorption in high-interest tasks to the exclusion of everything else",
      "Interest-based nervous system: motivation driven by interest, novelty, urgency, or challenge — not importance",
      "Demand avoidance: motivation collapses when something becomes obligatory",
      "Inconsistent performance: brilliant one day, cannot function the next",
      "Difficulty sustaining attention to things that are not intrinsically interesting",
      "Easily pulled off task by internal thoughts as much as external stimuli",
      "Chronic understimulation and boredom intolerance",
      "Seeking stimulation or novelty compulsively",
    ],
  },
  {
    id: "emotional",
    label: "Emotional Experience",
    items: [
      "Emotional dysregulation: emotions arrive fast, intensely, and are hard to modulate",
      "Rejection sensitive dysphoria (RSD): intense emotional pain triggered by perceived criticism or rejection",
      "Shame sensitivity: chronic low-grade sense of being defective",
      "Frustration intolerance: disproportionate distress when blocked or delayed",
      "Emotional impulsivity: saying or doing things driven by momentary feeling",
      "Difficulty identifying emotions in the moment (alexithymia overlap)",
      "Intense enthusiasm for new interests that fades rapidly",
      "Mood variability across the day not linked to external events",
      "ADHD burnout: cyclical collapse after periods of compensatory hyperfocus output",
    ],
  },
  {
    id: "memory",
    label: "Memory and Processing",
    items: [
      "Object impermanence for people: out of sight, out of mind for relationships",
      "Forgetting conversations, promises, or commitments",
      "Inconsistent memory: remembers random things vividly, forgets important things",
      "Difficulty retrieving words or information on demand",
      "Losing track of time passing during hyperfocus",
      "Losing things constantly: phone, keys, glasses",
      "Prospective memory failures: forgetting to do planned future actions",
    ],
  },
  {
    id: "social",
    label: "Social and Relational",
    items: [
      "Talking over others unintentionally",
      "Difficulty listening without simultaneously thinking of response",
      "Monopolizing conversation around current interest",
      "Inconsistent follow-through on social commitments",
      "Difficulty maintaining friendships due to out-of-sight-out-of-mind",
      "Justice sensitivity: heightened perception of and distress at unfairness",
      "Impulsive disclosure: sharing too much too soon",
      "Difficulty reading implicit social cues in real time",
      "Masking or camouflaging: especially common in women and late-diagnosed adults",
    ],
  },
  {
    id: "body",
    label: "Body and Sensory",
    items: [
      "Sensory sensitivities: clothing textures, sounds, lights, tastes",
      "Difficulty sleeping: racing mind at bedtime; delayed sleep phase common",
      "Appetite irregularity: forgetting to eat; binge eating when finally remembering",
      "Chronic physical restlessness: leg bouncing, fidgeting, needing to move",
      "Interoceptive differences: difficulty detecting hunger, thirst, fatigue, pain until extreme",
      "Hypersensitivity to stimulants, medications, or caffeine",
      "Irregular energy patterns: crash and spike rather than steady flow",
    ],
  },
  {
    id: "identity",
    label: "Identity and Self-Concept",
    items: [
      "Chronic underachievement relative to apparent intelligence",
      "Internalized shame from decades of unexplained failure",
      "Imposter syndrome and difficulty trusting own competence",
      "Compensatory perfectionism: overwork to prevent mistakes that feel catastrophic",
      "Difficulty knowing what one actually wants, enjoys, or values",
      "Grief and disorientation after late diagnosis: what could have been",
      "Identity instability: self-concept shifts across contexts",
      "Gifted-ADHD presentation: intelligence masks deficits; receives no support",
    ],
  },
  {
    id: "cooccurring",
    label: "Co-Occurring and Commonly Associated",
    items: [
      "Anxiety: often secondary to ADHD-related failures and uncertainty",
      "Depression: often secondary to chronic shame and underachievement",
      "OCD or obsessive features",
      "Autism / ASD co-occurrence: highly elevated co-occurrence rates; often both missed",
      "Sleep disorders: delayed sleep phase syndrome especially common",
      "Substance use: self-medication of understimulation or emotional pain",
      "Maladaptive daydreaming",
      "Dyslexia or other learning differences",
      "Sensory processing disorder",
    ],
  },
]

// ── Types ────────────────────────────────────────────────────────────────────

type CheckMap = Record<string, boolean>

// ── Helpers ──────────────────────────────────────────────────────────────────

function countChecked(prefix: string, total: number, checks: CheckMap): number {
  let n = 0
  for (let i = 0; i < total; i++) {
    if (checks[`${prefix}-${i}`]) n++
  }
  return n
}

// ── Sub-components ───────────────────────────────────────────────────────────

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

function DsmBadge({ count, threshold, total }: { count: number; threshold: number; total: number }) {
  const met = count >= threshold
  const started = count > 0 && !met
  return (
    <span
      className={`text-xs font-semibold tabular-nums px-2.5 py-1 rounded-full border ${
        met
          ? "bg-nav-coral/10 border-nav-coral text-nav-coral"
          : started
          ? "bg-nav-amber/10 border-nav-amber text-nav-amber"
          : "bg-muted border-border text-muted-foreground"
      }`}
    >
      {count}&thinsp;/&thinsp;{total} &nbsp;·&nbsp; {threshold}+ threshold
    </span>
  )
}

interface SectionProps {
  label: string
  sublabel: string
  items: string[]
  prefix: string
  checks: CheckMap
  onToggle: (key: string) => void
  threshold?: number
  count?: number
}

function ChecklistSection({
  label,
  sublabel,
  items,
  prefix,
  checks,
  onToggle,
  threshold,
  count,
}: SectionProps) {
  const isDsm = threshold !== undefined && count !== undefined

  return (
    <section>
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <div>
          <h3 className="font-[var(--font-display)] text-lg font-bold text-foreground leading-tight">
            {label}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">{sublabel}</p>
        </div>
        {isDsm && (
          <DsmBadge count={count!} threshold={threshold!} total={items.length} />
        )}
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground italic px-1">Items coming soon.</p>
      ) : (
        <ul className="space-y-0.5">
          {items.map((item, i) => {
            const key = `${prefix}-${i}`
            const checked = !!checks[key]
            return (
              <li key={key}>
                <label className="flex items-start gap-3 py-2 px-2 rounded-md hover:bg-muted/60 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle(key)}
                    className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-border accent-nav-teal cursor-pointer"
                  />
                  <span className={`text-sm leading-snug ${checked ? "text-foreground" : "text-muted-foreground"}`}>
                    {item}
                  </span>
                </label>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function AdhdChecklist() {
  const [open, setOpen] = useState(false)
  const [checks, setChecks] = useState<CheckMap>({})

  function toggle(key: string) {
    setChecks((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  function reset() {
    setChecks({})
  }

  const inattentionCount = countChecked("in", inattentionItems.length, checks)
  const hyperactivityCount = countChecked("hy", hyperactivityItems.length, checks)
  const hasAnyChecks = inattentionCount > 0 || hyperactivityCount > 0

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      {/* Collapsible header — hidden during print */}
      <button
        onClick={() => setOpen(!open)}
        className="no-print w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
        aria-expanded={open}
      >
        <div>
          <h2 className="font-[var(--font-display)] text-xl font-bold text-foreground">
            ADHD Symptom Checklist
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            DSM-5 criteria · community-reported symptoms
          </p>
        </div>
        <div className="flex items-center gap-4 ml-4">
          {hasAnyChecks && (
            <div className="text-xs text-muted-foreground text-right hidden sm:block leading-tight">
              <div>Inattention: {inattentionCount}&thinsp;/&thinsp;9</div>
              <div>Hyperactivity: {hyperactivityCount}&thinsp;/&thinsp;9</div>
            </div>
          )}
          <ChevronIcon open={open} />
        </div>
      </button>

      {/*
        Always rendered so @media print can force it visible.
        `hidden` sets display:none on screen; print CSS overrides with display:block.
      */}
      <div className={`assessment-content ${open ? "" : "hidden"}`}>
        <div className="p-5 sm:p-6 border-t border-border space-y-10">
          {/* Print-only heading */}
          <div className="hidden print:block">
            <h1 className="text-2xl font-bold">ADHD Symptom Checklist</h1>
            <p className="text-sm text-gray-500 mt-1">
              DSM-5 criteria + community-reported symptoms
            </p>
          </div>

          {/* DSM-5 Inattention */}
          <ChecklistSection
            label="DSM-5: Inattention"
            sublabel="6 or more required for adults (DSM-5)"
            items={inattentionItems}
            prefix="in"
            checks={checks}
            onToggle={toggle}
            threshold={6}
            count={inattentionCount}
          />

          {/* DSM-5 Hyperactivity and Impulsivity */}
          <ChecklistSection
            label="DSM-5: Hyperactivity and Impulsivity"
            sublabel="6 or more required for adults (DSM-5)"
            items={hyperactivityItems}
            prefix="hy"
            checks={checks}
            onToggle={toggle}
            threshold={6}
            count={hyperactivityCount}
          />

          {/* Community-reported sections */}
          {communityCategories.map((cat) => (
            <ChecklistSection
              key={cat.id}
              label={cat.label}
              sublabel="Community-reported"
              items={cat.items}
              prefix={cat.id}
              checks={checks}
              onToggle={toggle}
            />
          ))}

          {/* Footer citation */}
          <p className="text-xs text-muted-foreground italic border-t border-border pt-4 leading-relaxed">
            DSM-5 criteria: American Psychiatric Association, 2013. Community-reported symptoms
            drawn from neurodivergent lived experience literature and clinical practice.
          </p>

          {/* Action buttons — hidden during print */}
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
