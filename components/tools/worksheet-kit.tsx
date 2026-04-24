"use client"

import { useState, useEffect, useRef, type ReactNode, type CSSProperties } from "react"

// ── Persistence ───────────────────────────────────────────────────────────────

export type FieldVal = string | string[]
export type FormState = Record<string, FieldVal>

function storLoad(k: string): FormState {
  try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : {} } catch { return {} }
}
function storSave(k: string, v: FormState) {
  try { localStorage.setItem(k, JSON.stringify(v)) } catch {}
}

export function useWorksheetState(storageKey: string) {
  const [state, setState] = useState<FormState>({})
  const loaded = useRef(false)

  useEffect(() => {
    setState(storLoad(storageKey))
    loaded.current = true
  }, [storageKey])

  function getStr(k: string): string {
    const v = state[k]
    return typeof v === "string" ? v : ""
  }
  function getArr(k: string): string[] {
    const v = state[k]
    return Array.isArray(v) ? v : []
  }
  function set(k: string, v: FieldVal) {
    setState(prev => {
      const next = { ...prev, [k]: v }
      if (loaded.current) storSave(storageKey, next)
      return next
    })
  }
  function toggle(k: string, opt: string) {
    const arr = getArr(k)
    set(k, arr.includes(opt) ? arr.filter(x => x !== opt) : [...arr, opt])
  }
  function reset() {
    setState({})
    try { localStorage.removeItem(storageKey) } catch {}
  }
  return { state, getStr, getArr, set, toggle, reset }
}

// ── Action buttons ────────────────────────────────────────────────────────────

export function WorksheetActions({ onReset }: { onReset: () => void }) {
  function doPrint() { window.print() }
  return (
    <div className="worksheet-noprint flex flex-wrap items-center gap-2 mb-6">
      <button
        onClick={doPrint}
        className="text-xs font-bold tracking-wider bg-foreground text-background px-4 py-2 rounded hover:opacity-80 transition-opacity"
      >
        Save as PDF
      </button>
      <button
        onClick={doPrint}
        className="text-xs font-bold tracking-wider border border-border text-foreground px-4 py-2 rounded hover:bg-card transition-colors"
      >
        Print
      </button>
      <button
        onClick={() => { if (confirm("Clear all entries on this worksheet?")) onReset() }}
        className="text-xs text-muted-foreground hover:text-foreground transition-colors ml-1"
      >
        reset
      </button>
      <span className="text-xs text-muted-foreground ml-auto">
        Auto-saves locally · &ldquo;Save as PDF&rdquo; uses your browser print dialog
      </span>
    </div>
  )
}

// ── Field primitives ──────────────────────────────────────────────────────────

const inputCls =
  "worksheet-input w-full bg-background border border-border rounded px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/40 transition-colors"

export function Section({
  title, eyebrow, intro, children,
}: { title: string; eyebrow?: string; intro?: ReactNode; children: ReactNode }) {
  return (
    <section className="worksheet-section mb-10">
      {eyebrow && (
        <div className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1">
          {eyebrow}
        </div>
      )}
      <h3 className="font-[var(--font-display)] text-xl sm:text-2xl font-black text-foreground tracking-tight mb-2">
        {title}
      </h3>
      {intro && (
        <div className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-prose">
          {intro}
        </div>
      )}
      {children}
    </section>
  )
}

export function Card({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div className="worksheet-card bg-card border border-border rounded-lg p-5" style={style}>
      {children}
    </div>
  )
}

export function TextLine({
  label, value, onChange, placeholder, wide,
}: { label?: string; value: string; onChange: (v: string) => void; placeholder?: string; wide?: boolean }) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      {label && (
        <label className="block text-xs text-muted-foreground mb-1 uppercase tracking-wider">{label}</label>
      )}
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        className={inputCls}
      />
    </div>
  )
}

export function TextBox({
  label, value, onChange, placeholder, rows = 3, wide,
}: { label?: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number; wide?: boolean }) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      {label && (
        <label className="block text-xs text-muted-foreground mb-1 uppercase tracking-wider">{label}</label>
      )}
      <textarea
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        className={`${inputCls} resize-y`}
      />
    </div>
  )
}

export function CheckChips({
  title, opts, selected, onToggle, custom, onCustom, customPlaceholder,
}: {
  title?: string
  opts: string[]
  selected: string[]
  onToggle: (opt: string) => void
  custom?: string
  onCustom?: (v: string) => void
  customPlaceholder?: string
}) {
  return (
    <div>
      {title && (
        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">{title}</div>
      )}
      <div className="flex flex-wrap gap-2 mb-3">
        {opts.map(o => (
          <button
            key={o}
            type="button"
            onClick={() => onToggle(o)}
            className={`worksheet-chip text-xs px-3 py-1.5 rounded-full border transition-colors ${
              selected.includes(o)
                ? "bg-foreground text-background border-foreground"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
            }`}
            data-selected={selected.includes(o) ? "true" : "false"}
          >
            {o}
          </button>
        ))}
      </div>
      {onCustom && (
        <input
          type="text"
          value={custom || ""}
          onChange={e => onCustom(e.target.value)}
          placeholder={customPlaceholder}
          className="worksheet-input w-full bg-background border border-border rounded px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/40 transition-colors"
        />
      )}
    </div>
  )
}

// ── Print-friendly CSS (scoped via .worksheet-root) ───────────────────────────

export function WorksheetPrintStyles() {
  return (
    <style>{`
      .worksheet-root .worksheet-input { field-sizing: content; }
      @media print {
        .worksheet-noprint { display: none !important; }
        .worksheet-root { background: white !important; color: black !important; }
        .worksheet-root .worksheet-card {
          background: transparent !important;
          border: none !important;
          padding: 0 0 0.5rem 0 !important;
          break-inside: avoid;
          page-break-inside: avoid;
        }
        .worksheet-root .worksheet-section { break-inside: avoid; page-break-inside: avoid; }
        .worksheet-root input[type="text"].worksheet-input,
        .worksheet-root textarea.worksheet-input {
          border: none !important;
          border-bottom: 1px solid #000 !important;
          border-radius: 0 !important;
          background: transparent !important;
          color: #000 !important;
          padding: 2px 0 !important;
          box-shadow: none !important;
          field-sizing: content;
          resize: none !important;
        }
        .worksheet-root textarea.worksheet-input {
          overflow: visible !important;
          white-space: pre-wrap !important;
        }
        .worksheet-root .worksheet-chip {
          border: 1px solid #999 !important;
          background: transparent !important;
          color: #666 !important;
        }
        .worksheet-root .worksheet-chip[data-selected="true"] {
          background: #000 !important;
          color: white !important;
          border-color: #000 !important;
        }
        .worksheet-root label,
        .worksheet-root .text-muted-foreground { color: #333 !important; }
        .worksheet-root h1, .worksheet-root h2, .worksheet-root h3 { color: #000 !important; }
      }
    `}</style>
  )
}
