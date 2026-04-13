"use client"

import { useState, useEffect } from "react"

// ── Options ───────────────────────────────────────────────────────────────────

const TRIG_OPTS = [
  "Sensory overload", "Unexpected change", "Transition", "Too many demands",
  "Perceived injustice", "Emotional flooding", "Hunger or thirst", "Fatigue",
  "Physical pain", "Conflict", "Being misunderstood", "Time pressure",
  "Too many decisions", "Loss of control", "Crowded / loud environment", "Social exhaustion",
]

const BODY_OPTS = [
  "Heart racing", "Jaw clenching", "Skin crawling", "Tunnel vision", "Voice changing",
  "Need to flee", "Difficulty speaking", "Dissociation / unreality", "Increased stimming",
  "Freezing", "Stomach tightening", "Sound becoming sharper", "Tears", "Rage spike",
  "Shutdown / going blank",
]

const HELP_OPTS = [
  "Solitude", "Movement / walk", "Sensory comfort item", "Dark quiet space",
  "Music / noise blocking", "Sleep or rest", "Nature", "Weighted blanket",
  "Cold water on face", "Slow breathing", "Stimming freely", "Being with a specific person",
  "Pets", "Creative work", "Eating something",
]

// ── Types ─────────────────────────────────────────────────────────────────────

type Plan = {
  triggers:    string[]
  bodySignals: string[]
  whatHelps:   string[]
  contacts:    string
  customTrig:  string
  customBody:  string
  customHelp:  string
}

type Episode = {
  id:       string
  savedAt:  string
  date:     string
  before:   string
  body:     string
  during:   string
  helped:   string
  remember: string
  support:  string
}

type EpForm = Omit<Episode, "id" | "savedAt">

const EMPTY_PLAN: Plan = { triggers: [], bodySignals: [], whatHelps: [], contacts: "", customTrig: "", customBody: "", customHelp: "" }
const EMPTY_FORM: EpForm = { date: "", before: "", body: "", during: "", helped: "", remember: "", support: "" }

// ── Utils ─────────────────────────────────────────────────────────────────────

function uid() { return Math.random().toString(36).slice(2) }
function storSave<T>(k: string, v: T) { try { localStorage.setItem(k, JSON.stringify(v)) } catch {} }
function storLoad<T>(k: string, fb: T): T {
  try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb } catch { return fb }
}

const inputCls = "w-full bg-background border border-border rounded px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/40 transition-colors"

// ── Component ─────────────────────────────────────────────────────────────────

export function DysregulationLog() {
  const [tab,   setTab]   = useState<"plan"|"log"|"hist">("plan")
  const [plan,  setPlan]  = useState<Plan>(EMPTY_PLAN)
  const [eps,   setEps]   = useState<Episode[]>([])
  const [form,  setForm]  = useState<EpForm>(EMPTY_FORM)
  const [flash, setFlash] = useState(false)

  useEffect(() => {
    setPlan(storLoad("nd-mp", EMPTY_PLAN))
    setEps(storLoad("nd-me",  []))
  }, [])

  // ── Plan helpers
  function toggleChip(field: "triggers" | "bodySignals" | "whatHelps", opt: string) {
    const arr = plan[field]
    const next: Plan = { ...plan, [field]: arr.includes(opt) ? arr.filter(x => x !== opt) : [...arr, opt] }
    setPlan(next); storSave("nd-mp", next)
  }

  function updPlan(field: keyof Plan, val: string) {
    const next = { ...plan, [field]: val }
    setPlan(next); storSave("nd-mp", next)
  }

  // ── Episode helpers
  function saveEpisode() {
    if (!form.date && !form.before && !form.helped) return
    const ep: Episode = { id: uid(), savedAt: new Date().toLocaleDateString(), ...form }
    const next = [ep, ...eps]
    setEps(next); storSave("nd-me", next)
    setForm(EMPTY_FORM)
    setFlash(true)
    setTimeout(() => setFlash(false), 2500)
  }

  function delEp(id: string) {
    const next = eps.filter(e => e.id !== id)
    setEps(next); storSave("nd-me", next)
  }

  const tabCls = (t: string) =>
    `px-4 py-2 text-xs font-bold tracking-wider transition-colors rounded whitespace-nowrap ${
      tab === t ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
    }`

  return (
    <div className="mb-16">
      <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-black text-foreground tracking-tight mb-2">
        DYSREGULATION LOG
      </h2>
      <p className="text-sm text-muted-foreground mb-6 max-w-2xl leading-relaxed">
        Track patterns in dysregulation episodes — triggers, body signals, what helps, and insights for next time.
        All entries saved locally to your device.
      </p>

      {/* Tab strip */}
      <div className="flex gap-1 bg-card border border-border rounded p-1 mb-8 w-fit flex-wrap">
        <button className={tabCls("plan")} onClick={() => setTab("plan")}>Know Your Pattern</button>
        <button className={tabCls("log")}  onClick={() => setTab("log")}>Log an Episode</button>
        <button className={tabCls("hist")} onClick={() => setTab("hist")}>
          History {eps.length > 0 && <span className="ml-1 opacity-60">({eps.length})</span>}
        </button>
      </div>

      {/* ── Know your pattern ── */}
      {tab === "plan" && (
        <div className="space-y-4">
          <ChipCard
            title="Common triggers"
            opts={TRIG_OPTS}
            selected={plan.triggers}
            onToggle={o => toggleChip("triggers", o)}
            custom={plan.customTrig}
            onCustom={v => updPlan("customTrig", v)}
            customPlaceholder="Add your own triggers..."
          />
          <ChipCard
            title="Early warning signs in my body"
            opts={BODY_OPTS}
            selected={plan.bodySignals}
            onToggle={o => toggleChip("bodySignals", o)}
            custom={plan.customBody}
            onCustom={v => updPlan("customBody", v)}
            customPlaceholder="Add your own signals..."
          />
          <ChipCard
            title="What helps me regulate"
            opts={HELP_OPTS}
            selected={plan.whatHelps}
            onToggle={o => toggleChip("whatHelps", o)}
            custom={plan.customHelp}
            onCustom={v => updPlan("customHelp", v)}
            customPlaceholder="Add your own..."
          />
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              Who I can contact
            </div>
            <textarea
              rows={3}
              value={plan.contacts}
              placeholder="Name, relationship, how to reach them..."
              onChange={e => updPlan("contacts", e.target.value)}
              className={`${inputCls} resize-y`}
            />
          </div>
        </div>
      )}

      {/* ── Log an episode ── */}
      {tab === "log" && (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="space-y-4">
            <EpField label="Date" value={form.date} placeholder="Today, or a specific date"
              onChange={v => setForm(f => ({ ...f, date: v }))} />
            <EpField label="What was happening right before?" value={form.before} multiline
              placeholder="Triggers, context, what led up to it..."
              onChange={v => setForm(f => ({ ...f, before: v }))} />
            <EpField label="What did my body feel like?" value={form.body} multiline
              placeholder="Physical sensations, early warnings, what escalated..."
              onChange={v => setForm(f => ({ ...f, body: v }))} />
            <EpField label="What happened / what did I do?" value={form.during} multiline
              placeholder="During the episode..."
              onChange={v => setForm(f => ({ ...f, during: v }))} />
            <EpField label="What helped me come back?" value={form.helped} multiline
              placeholder="Strategies that worked..."
              onChange={v => setForm(f => ({ ...f, helped: v }))} />
            <EpField label="What to remember for next time" value={form.remember} multiline
              placeholder="Insights, patterns, what to do differently..."
              onChange={v => setForm(f => ({ ...f, remember: v }))} />
            <EpField label="Support I need" value={form.support} multiline
              placeholder="From others, from myself, from my environment..."
              onChange={v => setForm(f => ({ ...f, support: v }))} />

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={saveEpisode}
                className="text-sm font-bold tracking-wider bg-foreground text-background px-5 py-2 rounded hover:opacity-80 transition-opacity"
              >
                Save Entry
              </button>
              {flash && <span className="text-xs text-nav-teal">Saved</span>}
            </div>
          </div>
        </div>
      )}

      {/* ── History ── */}
      {tab === "hist" && (
        <div>
          {eps.length === 0 ? (
            <p className="text-muted-foreground text-sm py-8 text-center">No episodes logged yet.</p>
          ) : (
            eps.map(ep => (
              <div key={ep.id} className="bg-card border border-border rounded-lg p-5 mb-3">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-bold text-foreground">{ep.date || ep.savedAt}</span>
                  <button
                    onClick={() => delEp(ep.id)}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    delete
                  </button>
                </div>
                {ep.before   && <p className="text-xs text-muted-foreground mb-1"><span className="text-foreground font-medium">Before: </span>{ep.before}</p>}
                {ep.helped   && <p className="text-xs text-muted-foreground mb-1"><span className="text-foreground font-medium">What helped: </span>{ep.helped}</p>}
                {ep.remember && <p className="text-xs text-muted-foreground"><span className="text-foreground font-medium">Remember: </span>{ep.remember}</p>}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ChipCard({
  title, opts, selected, onToggle, custom, onCustom, customPlaceholder,
}: {
  title: string
  opts: string[]
  selected: string[]
  onToggle: (opt: string) => void
  custom: string
  onCustom: (val: string) => void
  customPlaceholder: string
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">{title}</div>
      <div className="flex flex-wrap gap-2 mb-3">
        {opts.map(o => (
          <button
            key={o}
            onClick={() => onToggle(o)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              selected.includes(o)
                ? "bg-foreground text-background border-foreground"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
      <input
        type="text"
        value={custom}
        onChange={e => onCustom(e.target.value)}
        placeholder={customPlaceholder}
        className="w-full bg-background border border-border rounded px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/40 transition-colors"
      />
    </div>
  )
}

function EpField({
  label, value, onChange, multiline, placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
  placeholder?: string
}) {
  const cls = "w-full bg-background border border-border rounded px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/40 transition-colors"
  return (
    <div>
      <label className="block text-xs text-muted-foreground mb-1 uppercase tracking-wider">{label}</label>
      {multiline ? (
        <textarea rows={2} value={value} placeholder={placeholder}
          onChange={e => onChange(e.target.value)} className={`${cls} resize-y`} />
      ) : (
        <input type="text" value={value} placeholder={placeholder}
          onChange={e => onChange(e.target.value)} className={cls} />
      )}
    </div>
  )
}
