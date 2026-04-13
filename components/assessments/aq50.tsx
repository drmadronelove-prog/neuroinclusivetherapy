"use client"

import { useState } from "react"

// ── Data ─────────────────────────────────────────────────────────────────────

const aqItems: string[] = [
  "I prefer to do things with others, rather than on my own.",                                          // 1
  "I prefer to do things the same way over and over again.",                                            // 2
  "If I try to imagine something, I find it very easy to create a picture in my mind.",                 // 3
  "I frequently get so strongly absorbed in one thing that I lose sight of other things.",              // 4
  "I often notice small sounds when others do not.",                                                    // 5
  "I usually notice car number plates or similar strings of information.",                              // 6
  "Other people frequently tell me that what I've said is impolite, even though I think it is polite.", // 7
  "When I'm reading a story, I can easily imagine what the characters might look like.",                // 8
  "I am fascinated by dates.",                                                                          // 9
  "In a social group, I can easily keep track of several different people's conversations.",            // 10
  "I find social situations easy.",                                                                     // 11
  "I tend to notice details that others do not.",                                                       // 12
  "I would rather go to a library than to a party.",                                                    // 13
  "I find making up stories easy.",                                                                     // 14
  "I find myself drawn more strongly to people than to things.",                                        // 15
  "I tend to have very strong interests, which I get upset about if I can't pursue.",                   // 16
  "I enjoy social chitchat.",                                                                           // 17
  "When I talk, it isn't always easy for others to get a word in edgewise.",                            // 18
  "I am fascinated by numbers.",                                                                        // 19
  "When I'm reading a story, I find it difficult to work out the characters' intentions.",              // 20
  "I don't particularly enjoy reading fiction.",                                                        // 21
  "I find it hard to make new friends.",                                                                // 22
  "I notice patterns in things all the time.",                                                          // 23
  "I would rather go to the theatre than to a museum.",                                                 // 24
  "It does not upset me if my daily routine is disturbed.",                                             // 25
  "I frequently find that I don't know how to keep a conversation going.",                              // 26
  "I find it easy to \"read between the lines\" when someone is talking to me.",                        // 27
  "I usually concentrate more on the whole picture, rather than on the small details.",                 // 28
  "I am not very good at remembering phone numbers.",                                                   // 29
  "I don't usually notice small changes in a situation or a person's appearance.",                      // 30
  "I don't know how to tell if someone listening to me is getting bored.",                              // 31
  "I find it easy to do more than one thing at once.",                                                  // 32
  "When I talk on the phone, I'm not sure when it's my turn to speak.",                                 // 33
  "I enjoy doing things spontaneously.",                                                                // 34
  "I am often the last to understand the point of a joke.",                                             // 35
  "I find it easy to work out what someone is thinking or feeling just by looking at their face.",      // 36
  "If there is an interruption, I can switch back to what I was doing very quickly.",                   // 37
  "I am good at social chitchat.",                                                                      // 38
  "People often tell me that I keep going on and on about the same thing.",                             // 39
  "When I was young, I used to enjoy playing games involving pretending with other children.",          // 40
  "I like to collect information about categories of things (e.g. types of cars, birds, trains, plants).", // 41
  "I find it difficult to imagine what it would be like to be someone else.",                           // 42
  "I like to carefully plan any activities I participate in.",                                          // 43
  "I enjoy social occasions.",                                                                          // 44
  "I find it difficult to work out people's intentions.",                                               // 45
  "New situations make me anxious.",                                                                    // 46
  "I enjoy meeting new people.",                                                                        // 47
  "I am a good diplomat.",                                                                              // 48
  "I am not very good at remembering people's date of birth.",                                         // 49
  "I find it very easy to play games with children that involve pretending.",                           // 50
]

// Items 1-indexed; Agree (DA or SA) = 1 point
const AGREE_SCORE_ITEMS = new Set([
  2, 4, 5, 6, 7, 9, 12, 13, 16, 18, 19, 20, 21, 22, 23,
  26, 31, 33, 35, 39, 41, 42, 43, 45, 46,
])
// All other items: Disagree (SD or DD) = 1 point

// ── Types ─────────────────────────────────────────────────────────────────────

type Response = 1 | 2 | 3 | 4 // DA, SA, SD, DD
type Answers = Partial<Record<number, Response>>

// ── Scoring ───────────────────────────────────────────────────────────────────

const OPTIONS: { value: Response; label: string }[] = [
  { value: 1, label: "Definitely Agree" },
  { value: 2, label: "Slightly Agree" },
  { value: 3, label: "Slightly Disagree" },
  { value: 4, label: "Definitely Disagree" },
]

function scoreItem(itemNum: number, response: Response): number {
  const isAgree = response === 1 || response === 2
  return AGREE_SCORE_ITEMS.has(itemNum) ? (isAgree ? 1 : 0) : (isAgree ? 0 : 1)
}

function calcScore(answers: Answers): number {
  let total = 0
  for (const [key, response] of Object.entries(answers)) {
    if (response !== undefined) total += scoreItem(Number(key), response)
  }
  return total
}

function calcAnswered(answers: Answers): number {
  return Object.values(answers).filter((v) => v !== undefined).length
}

function interpretation(score: number): { label: string; color: string } {
  if (score >= 32) return { label: "Above research threshold (32+) — consistent with elevated autistic traits", color: "text-nav-coral" }
  if (score >= 26) return { label: "Elevated range (26–31) — associated with autistic traits", color: "text-nav-amber" }
  return { label: "Below elevated threshold (< 26)", color: "text-muted-foreground" }
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

function ScoreBadge({ score, answered }: { score: number; answered: number }) {
  const { color } = interpretation(score)
  return (
    <span className={`text-xs font-semibold tabular-nums px-2.5 py-1 rounded-full border border-border bg-muted ${color}`}>
      Score: {score}&thinsp;/&thinsp;50 &nbsp;·&nbsp; {answered} answered
    </span>
  )
}

interface AQItemRowProps {
  num: number
  text: string
  response: Response | undefined
  onSelect: (r: Response) => void
}

function AQItemRow({ num, text, response, onSelect }: AQItemRowProps) {
  return (
    <li className="py-3 border-b border-border/50 last:border-0">
      <p className="text-sm text-foreground mb-2 leading-snug">
        <span className="font-semibold tabular-nums text-muted-foreground mr-1.5">{num}.</span>
        {text}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
        {OPTIONS.map((opt) => {
          const selected = response === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelect(opt.value)}
              className={`text-xs px-2 py-1.5 rounded border transition-colors text-center leading-tight ${
                selected
                  ? "bg-nav-teal text-white border-nav-teal font-semibold"
                  : "border-border text-muted-foreground hover:border-nav-teal hover:text-foreground"
              }`}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </li>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function AQ50() {
  const [open, setOpen] = useState(false)
  const [answers, setAnswers] = useState<Answers>({})

  function select(itemNum: number, response: Response) {
    setAnswers((prev) => ({ ...prev, [itemNum]: response }))
  }

  function reset() {
    setAnswers({})
  }

  const score = calcScore(answers)
  const answered = calcAnswered(answers)
  const { label: interpLabel, color: interpColor } = interpretation(score)

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
            AQ-50: Autism Spectrum Quotient
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            50-item screening questionnaire · Baron-Cohen et al., 2001
          </p>
        </div>
        <div className="flex items-center gap-4 ml-4">
          {answered > 0 && <ScoreBadge score={score} answered={answered} />}
          <ChevronIcon open={open} />
        </div>
      </button>

      <div className={`assessment-content ${open ? "" : "hidden"}`}>
        <div className="p-5 sm:p-6 border-t border-border space-y-8">
          {/* Print-only heading */}
          <div className="hidden print:block">
            <h1 className="text-2xl font-bold">AQ-50: Autism Spectrum Quotient</h1>
            <p className="text-sm text-gray-500 mt-1">Baron-Cohen et al., 2001</p>
          </div>

          {/* Instructions */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            For each statement, choose the response that best describes how strongly it applies to you.
            There are no right or wrong answers.
          </p>

          {/* Option legend (desktop) */}
          <div className="no-print hidden sm:grid grid-cols-4 gap-1.5 text-xs text-center text-muted-foreground font-medium border-b border-border pb-3">
            {OPTIONS.map((opt) => (
              <div key={opt.value}>{opt.label}</div>
            ))}
          </div>

          {/* Items */}
          <ul className="divide-y divide-border/0">
            {aqItems.map((text, idx) => {
              const num = idx + 1
              return (
                <AQItemRow
                  key={num}
                  num={num}
                  text={text}
                  response={answers[num]}
                  onSelect={(r) => select(num, r)}
                />
              )
            })}
          </ul>

          {/* Score summary */}
          {answered > 0 && (
            <div className="rounded-lg border border-border bg-muted/40 p-4 space-y-2">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-[var(--font-display)] text-lg font-bold text-foreground">
                  Score: {score} / 50
                </span>
                <span className="text-sm text-muted-foreground">{answered} of 50 answered</span>
              </div>
              {answered === 50 && (
                <p className={`text-sm font-medium ${interpColor}`}>{interpLabel}</p>
              )}
              {answered < 50 && (
                <p className="text-xs text-muted-foreground">
                  Complete all 50 items for a full interpretation.
                </p>
              )}
              {/* Threshold markers */}
              <div className="mt-3 space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0</span>
                  <span className="text-nav-amber">26 (elevated)</span>
                  <span className="text-nav-coral">32 (research threshold)</span>
                  <span>50</span>
                </div>
                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-nav-teal rounded-full transition-all duration-300"
                    style={{ width: `${(score / 50) * 100}%` }}
                  />
                  {/* Threshold markers */}
                  <div className="absolute top-0 h-full w-px bg-nav-amber/60" style={{ left: "52%" }} />
                  <div className="absolute top-0 h-full w-px bg-nav-coral/60" style={{ left: "64%" }} />
                </div>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground italic border-t border-border pt-4 leading-relaxed">
            The AQ-50 is a screening tool, not a diagnostic instrument. A score above threshold does not
            constitute a diagnosis. Scores should be interpreted by a qualified clinician in conjunction
            with a comprehensive evaluation. Baron-Cohen, S., Wheelwright, S., Skinner, R., Martin, J.,
            &amp; Clubley, E. (2001). The Autism-Spectrum Quotient (AQ). <em>Journal of Autism and
            Developmental Disorders, 31</em>(1), 5–17.
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
