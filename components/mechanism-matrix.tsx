"use client"

import { useState } from "react"

type Group = "imag" | "attn" | "aff" | "pers"

const mechs: { id: string; label: string; g: Group }[] = [
  { id: "hyperphant",  label: "Hyperphantasia",    g: "imag" },
  { id: "inferential", label: "Inferential",        g: "imag" },
  { id: "motivated",   label: "Mot. imagination",  g: "imag" },
  { id: "reality",     label: "Reality mon.",       g: "imag" },
  { id: "absorption",  label: "Absorption",         g: "attn" },
  { id: "dmn",         label: "DMN intrusion",      g: "attn" },
  { id: "monotropism", label: "Monotropism",        g: "attn" },
  { id: "hyperfocus",  label: "Hyperfocus",         g: "attn" },
  { id: "prefint",     label: "Pref. interiority",  g: "attn" },
  { id: "intero",      label: "Interoception",      g: "aff"  },
  { id: "emodysreg",   label: "Emot. dysreg.",      g: "aff"  },
  { id: "dopamine",    label: "Dopamine",            g: "aff"  },
  { id: "persist",     label: "Perseveration",      g: "pers" },
]

const gc: Record<Group, { f: string; d: string; h: string; n: string }> = {
  imag: { f: "#EEEDFE", d: "#7F77DD", h: "#3C3489", n: "Imagination-reality" },
  attn: { f: "#E1F5EE", d: "#1D9E75", h: "#085041", n: "Attentional depth"   },
  aff:  { f: "#FAECE7", d: "#D85A30", h: "#712B13", n: "Affective-somatic"   },
  pers: { f: "#FAEEDA", d: "#BA7517", h: "#633806", n: "Perseverative"        },
}

type CondRow = { label: string; type: "dsm" | "ndsm"; m: Set<string> }
type SepRow  = { sep: true }
type Row = CondRow | SepRow

const rows: Row[] = [
  { label: "OCD",                     type: "dsm",  m: new Set(["hyperphant","inferential","motivated","reality","absorption","emodysreg","dopamine","persist"]) },
  { label: "ADHD",                    type: "dsm",  m: new Set(["hyperphant","motivated","dmn","absorption","hyperfocus","prefint","emodysreg","dopamine","persist"]) },
  { label: "Autism / ASD",            type: "dsm",  m: new Set(["hyperphant","inferential","motivated","absorption","dmn","monotropism","hyperfocus","prefint","intero","emodysreg","persist"]) },
  { label: "Borderline PD",           type: "dsm",  m: new Set(["hyperphant","inferential","motivated","reality","absorption","intero","emodysreg","dopamine","persist"]) },
  { label: "Dissociation",            type: "dsm",  m: new Set(["absorption","prefint","intero","reality","emodysreg"]) },
  { label: "C-PTSD",                  type: "dsm",  m: new Set(["absorption","intero","reality","emodysreg","persist"]) },
  { sep: true },
  { label: "Limerence",               type: "ndsm", m: new Set(["hyperphant","inferential","motivated","reality","absorption","prefint","emodysreg","dopamine","persist"]) },
  { label: "Maladaptive daydreaming", type: "ndsm", m: new Set(["hyperphant","motivated","reality","absorption","dmn","prefint","persist"]) },
  { label: "Giftedness",              type: "ndsm", m: new Set(["hyperphant","motivated","absorption","dmn","hyperfocus","prefint","intero","persist"]) },
  { label: "Alexithymia",             type: "ndsm", m: new Set(["intero","emodysreg"]) },
  { label: "Rejection sensitivity",   type: "ndsm", m: new Set(["motivated","emodysreg","dopamine","persist"]) },
  { label: "Flow states",             type: "ndsm", m: new Set(["motivated","absorption","dmn","monotropism","hyperfocus","prefint"]) },
  { label: "Fantasy proneness",       type: "ndsm", m: new Set(["hyperphant","reality","absorption","prefint"]) },
  { label: "Highly sensitive person", type: "ndsm", m: new Set(["hyperphant","absorption","dmn","prefint","intero","emodysreg"]) },
  { label: "Justice sensitivity",     type: "ndsm", m: new Set(["motivated","emodysreg","dopamine","persist"]) },
  { label: "Cog. disengagement synd.",type: "ndsm", m: new Set(["motivated","reality","absorption","dmn","prefint"]) },
  { label: "NVLD",                    type: "ndsm", m: new Set(["inferential","monotropism","intero","emodysreg","persist"]) },
]

const groupSpans: [Group, number][] = [["imag", 4], ["attn", 5], ["aff", 3], ["pers", 1]]

export function MechanismMatrix() {
  const [hovered,  setHovered]  = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)

  const toggleRow = (label: string) =>
    setSelected(s => (s === label ? null : label))

  return (
    <div className="w-full">
      <div className="overflow-x-auto pb-1">
        <table style={{ borderCollapse: "collapse", whiteSpace: "nowrap", fontSize: "inherit" }}>
          <thead>
            {/* Spectrum group headers */}
            <tr>
              <th style={{ minWidth: 172, width: 172, height: 18 }} />
              {groupSpans.map(([g, n]) => (
                <th
                  key={g}
                  colSpan={n}
                  style={{
                    textAlign: "center",
                    fontSize: 10,
                    fontWeight: 500,
                    color: gc[g].h,
                    background: gc[g].f,
                    padding: "3px 2px",
                    borderRadius: "3px 3px 0 0",
                  }}
                >
                  {gc[g].n}
                </th>
              ))}
              <th style={{ width: 30 }} />
            </tr>
            {/* Column labels (vertical text) */}
            <tr>
              <th style={{ height: 82 }} />
              {mechs.map(m => (
                <th
                  key={m.id}
                  style={{ width: 33, height: 82, verticalAlign: "bottom", padding: "0 1px 4px" }}
                >
                  <div
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      whiteSpace: "nowrap",
                      fontSize: 9.5,
                      fontWeight: 500,
                      color: gc[m.g].h,
                    }}
                  >
                    {m.label}
                  </div>
                </th>
              ))}
              <th
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  fontSize: 9.5,
                  color: "var(--muted-foreground)",
                  verticalAlign: "bottom",
                  padding: "0 5px 4px",
                  fontWeight: 400,
                }}
              >
                n
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              if ("sep" in row) {
                return (
                  <tr key={`sep-${i}`}>
                    <td
                      colSpan={mechs.length + 2}
                      style={{ height: 5, borderTop: "0.5px solid var(--border)" }}
                    />
                  </tr>
                )
              }
              const isActive = selected === row.label
              const isHov    = hovered  === row.label
              const bg = isActive || isHov ? "var(--muted)" : "transparent"

              return (
                <tr
                  key={row.label}
                  style={{ background: bg, cursor: "pointer" }}
                  onMouseEnter={() => setHovered(row.label)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => toggleRow(row.label)}
                >
                  <td
                    style={{
                      fontSize: 11.5,
                      padding: "0 10px 0 3px",
                      height: 24,
                      color: row.type === "dsm" ? "#085041" : "#712B13",
                    }}
                  >
                    {row.label}
                  </td>
                  {mechs.map(m => (
                    <td
                      key={m.id}
                      style={{ width: 33, height: 24, textAlign: "center", verticalAlign: "middle" }}
                    >
                      {row.m.has(m.id) && (
                        <div
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: 2,
                            margin: "0 auto",
                            background: gc[m.g].d,
                          }}
                        />
                      )}
                    </td>
                  ))}
                  <td
                    style={{
                      fontSize: 11,
                      color: "var(--muted-foreground)",
                      padding: "0 6px",
                      textAlign: "center",
                      fontWeight: 500,
                    }}
                  >
                    {row.m.size}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-muted-foreground mt-1 mx-0.5">
        Hover to highlight a row. n = mechanism count. DSM conditions in teal, non-DSM in coral.
      </p>
    </div>
  )
}
