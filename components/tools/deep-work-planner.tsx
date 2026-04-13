"use client"

import { useState, useEffect } from "react"
import type { ReactNode } from "react"

type LTG = { id: string; goal: string; steps: string; deadline: string; process: string; measure: string; motivation: string }
type WK  = { id: string; ltg: string; week: string; goal: string; penalty: string; reward: string; score: string; giw: string }
type VAL = { id: string; value: string; painful: string; avoidance: string; a1: string; a2: string; a3: string }

const WHAT_GOT = [
  "— select —", "All-or-nothing thinking", "Perfectionism", "Procrastination",
  "Emotional dysregulation", "Sensory overload", "Demand avoidance", "Time blindness",
  "Overwhelm", "Executive dysfunction", "Forgot", "RSD", "Burnout", "Life happened", "Other",
]

function uid() { return Math.random().toString(36).slice(2) }

function storSave<T>(k: string, v: T) { try { localStorage.setItem(k, JSON.stringify(v)) } catch {} }
function storLoad<T>(k: string, fb: T): T {
  try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb } catch { return fb }
}

// ── Shared styles ─────────────────────────────────────────────────────────────

const inputCls = "w-full bg-background border border-border rounded px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/40 transition-colors"

function Field({ label, className = "", children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <div className={className}>
      <label className="block text-xs text-muted-foreground mb-1 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export function DeepWorkPlanner() {
  const [tab,  setTab]  = useState<"ltg"|"wk"|"val">("ltg")
  const [ltgs, setLtgs] = useState<LTG[]>([])
  const [wks,  setWks]  = useState<WK[]>([])
  const [vals, setVals] = useState<VAL[]>([])

  useEffect(() => {
    setLtgs(storLoad("nd-ltg", []))
    setWks(storLoad("nd-wk",   []))
    setVals(storLoad("nd-val", []))
  }, [])

  // ── Long-term goals
  function addLTG() {
    const next: LTG[] = [...ltgs, { id: uid(), goal: "", steps: "", deadline: "", process: "", measure: "", motivation: "" }]
    setLtgs(next); storSave("nd-ltg", next)
  }
  function delLTG(id: string) {
    const next = ltgs.filter(l => l.id !== id)
    setLtgs(next); storSave("nd-ltg", next)
  }
  function updLTG(id: string, field: keyof LTG, val: string) {
    const next = ltgs.map(l => l.id === id ? { ...l, [field]: val } : l)
    setLtgs(next); storSave("nd-ltg", next)
  }

  // ── Weekly goals
  function addWK() {
    const next: WK[] = [...wks, { id: uid(), ltg: "", week: "Week 1", goal: "", penalty: "", reward: "", score: "", giw: "" }]
    setWks(next); storSave("nd-wk", next)
  }
  function delWK(id: string) {
    const next = wks.filter(w => w.id !== id)
    setWks(next); storSave("nd-wk", next)
  }
  function updWK(id: string, field: keyof WK, val: string) {
    const next = wks.map(w => w.id === id ? { ...w, [field]: val } : w)
    setWks(next); storSave("nd-wk", next)
  }

  // ── Values
  function addVAL() {
    const next: VAL[] = [...vals, { id: uid(), value: "", painful: "", avoidance: "", a1: "", a2: "", a3: "" }]
    setVals(next); storSave("nd-val", next)
  }
  function delVAL(id: string) {
    const next = vals.filter(v => v.id !== id)
    setVals(next); storSave("nd-val", next)
  }
  function updVAL(id: string, field: keyof VAL, val: string) {
    const next = vals.map(v => v.id === id ? { ...v, [field]: val } : v)
    setVals(next); storSave("nd-val", next)
  }

  const tabCls = (t: string) =>
    `px-4 py-2 text-xs font-bold tracking-wider transition-colors rounded whitespace-nowrap ${
      tab === t ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
    }`

  return (
    <div className="mb-16">
      <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-black text-foreground tracking-tight mb-2">
        DEEP WORK PLANNER
      </h2>
      <p className="text-sm text-muted-foreground mb-6 max-w-2xl leading-relaxed">
        Based on Cal Newport&apos;s Deep Work framework + ACT. Focus on <em>process first</em> — the habit or practice,
        not just the outcome. Anchor weekly goals in long-term intentions. All data saved locally to your device.
      </p>

      {/* Tab strip */}
      <div className="flex gap-1 bg-card border border-border rounded p-1 mb-8 w-fit flex-wrap">
        <button className={tabCls("ltg")} onClick={() => setTab("ltg")}>Long-term Goals</button>
        <button className={tabCls("wk")}  onClick={() => setTab("wk")}>Weekly Goals</button>
        <button className={tabCls("val")} onClick={() => setTab("val")}>Values + Activities</button>
      </div>

      {/* ── Long-term goals ── */}
      {tab === "ltg" && (
        <div>
          {ltgs.map(l => (
            <div key={l.id} className="bg-card border border-border rounded-lg p-6 mb-4">
              <div className="flex justify-end mb-3">
                <button onClick={() => delLTG(l.id)} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  remove
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Long-term goal">
                  <input type="text" value={l.goal} placeholder="What are you working toward?"
                    onChange={e => updLTG(l.id, "goal", e.target.value)} className={inputCls} />
                </Field>
                <Field label="Deadline">
                  <input type="text" value={l.deadline} placeholder="e.g. 6/1/26"
                    onChange={e => updLTG(l.id, "deadline", e.target.value)} className={inputCls} />
                </Field>
                <Field label="Key steps / milestones" className="sm:col-span-2">
                  <input type="text" value={l.steps} placeholder="Key milestones or actions"
                    onChange={e => updLTG(l.id, "steps", e.target.value)} className={inputCls} />
                </Field>
                <Field label="Process focus (habit or practice)">
                  <input type="text" value={l.process} placeholder="What will I do regularly?"
                    onChange={e => updLTG(l.id, "process", e.target.value)} className={inputCls} />
                </Field>
                <Field label="How will I measure this?">
                  <input type="text" value={l.measure} placeholder="Concrete indicators"
                    onChange={e => updLTG(l.id, "measure", e.target.value)} className={inputCls} />
                </Field>
                <Field label="Why does this matter?" className="sm:col-span-2">
                  <input type="text" value={l.motivation} placeholder="Your motivation"
                    onChange={e => updLTG(l.id, "motivation", e.target.value)} className={inputCls} />
                </Field>
              </div>
            </div>
          ))}
          <button onClick={addLTG} className="text-sm font-bold tracking-wider text-muted-foreground hover:text-foreground border border-border rounded px-4 py-2 transition-colors">
            + Add long-term goal
          </button>
        </div>
      )}

      {/* ── Weekly goals ── */}
      {tab === "wk" && (
        <div>
          {wks.map(w => (
            <div key={w.id} className="bg-card border border-border rounded-lg p-6 mb-4">
              <div className="flex justify-end mb-3">
                <button onClick={() => delWK(w.id)} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  remove
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Linked long-term goal">
                  <select value={w.ltg} onChange={e => updWK(w.id, "ltg", e.target.value)} className={inputCls}>
                    <option value="">— select —</option>
                    {ltgs.map(l => (
                      <option key={l.id} value={l.goal}>{l.goal || "Unnamed goal"}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Week">
                  <input type="text" value={w.week} placeholder="Week 1"
                    onChange={e => updWK(w.id, "week", e.target.value)} className={inputCls} />
                </Field>
                <Field label="Weekly goal" className="sm:col-span-2">
                  <input type="text" value={w.goal} placeholder="Specific goal for this week"
                    onChange={e => updWK(w.id, "goal", e.target.value)} className={inputCls} />
                </Field>
                <Field label="Penalty for not completing">
                  <input type="text" value={w.penalty} placeholder="e.g. no weekend movies"
                    onChange={e => updWK(w.id, "penalty", e.target.value)} className={inputCls} />
                </Field>
                <Field label="Reward for completing">
                  <input type="text" value={w.reward} placeholder="e.g. favorite coffee"
                    onChange={e => updWK(w.id, "reward", e.target.value)} className={inputCls} />
                </Field>
                <Field label="Completion score (1–10)">
                  <input type="text" value={w.score} placeholder="1–10"
                    onChange={e => updWK(w.id, "score", e.target.value)} className={inputCls} />
                </Field>
                <Field label="What got in the way?">
                  <select value={w.giw} onChange={e => updWK(w.id, "giw", e.target.value)} className={inputCls}>
                    {WHAT_GOT.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </Field>
              </div>
            </div>
          ))}
          <button onClick={addWK} className="text-sm font-bold tracking-wider text-muted-foreground hover:text-foreground border border-border rounded px-4 py-2 transition-colors">
            + Add weekly goal
          </button>
        </div>
      )}

      {/* ── Values + activities ── */}
      {tab === "val" && (
        <div>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            From ACT: name what matters, identify what gets in the way, and choose low-demand actions that keep you
            connected to your values even when capacity is depleted.
          </p>
          {vals.map(v => (
            <div key={v.id} className="bg-card border border-border rounded-lg p-6 mb-4">
              <div className="flex justify-end mb-3">
                <button onClick={() => delVAL(v.id)} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  remove
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Value" className="sm:col-span-2">
                  <input type="text" value={v.value} placeholder="e.g. Connection, Creativity, Justice, Rest"
                    onChange={e => updVAL(v.id, "value", e.target.value)} className={inputCls} />
                </Field>
                <Field label="Painful thoughts / feelings in the way">
                  <textarea rows={3} value={v.painful} placeholder={`"I'm not good enough..."`}
                    onChange={e => updVAL(v.id, "painful", e.target.value)} className={`${inputCls} resize-y`} />
                </Field>
                <Field label="Avoidance strategies I use">
                  <textarea rows={3} value={v.avoidance} placeholder="Scrolling, isolating, overplanning..."
                    onChange={e => updVAL(v.id, "avoidance", e.target.value)} className={`${inputCls} resize-y`} />
                </Field>
                <Field label="Low-energy value-aligned activity 1">
                  <textarea rows={2} value={v.a1} placeholder="Option 1"
                    onChange={e => updVAL(v.id, "a1", e.target.value)} className={`${inputCls} resize-y`} />
                </Field>
                <Field label="Value-aligned activity 2">
                  <textarea rows={2} value={v.a2} placeholder="Option 2"
                    onChange={e => updVAL(v.id, "a2", e.target.value)} className={`${inputCls} resize-y`} />
                </Field>
                <Field label="Value-aligned activity 3" className="sm:col-span-2">
                  <textarea rows={2} value={v.a3} placeholder="Option 3"
                    onChange={e => updVAL(v.id, "a3", e.target.value)} className={`${inputCls} resize-y`} />
                </Field>
              </div>
            </div>
          ))}
          <button onClick={addVAL} className="text-sm font-bold tracking-wider text-muted-foreground hover:text-foreground border border-border rounded px-4 py-2 transition-colors">
            + Add value
          </button>
        </div>
      )}
    </div>
  )
}
