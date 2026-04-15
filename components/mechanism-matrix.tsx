"use client"

const COLUMNS = [
  { id: "absorption",  label: "Absorption" },
  { id: "hyperphant",  label: "Hyperphantasia" },
  { id: "dmn",         label: "DMN Intrusion" },
  { id: "inferential", label: "Inferential Confusion" },
  { id: "monotropism", label: "Monotropism" },
  { id: "hyperfocus",  label: "Hyperfocus" },
  { id: "intero",      label: "Interoceptive Diff." },
  { id: "motivated",   label: "Motivated Imagination" },
  { id: "prefint",     label: "Preferential Interiority" },
  { id: "reality",     label: "Reality Monitoring" },
  { id: "dopamine",    label: "Dopamine Dysreg." },
  { id: "persist",     label: "Perseverative Cog." },
  { id: "emodysreg",   label: "Emotional Dysreg." },
]

const ROWS = [
  { id: "ocd",         name: "OCD",                     subtitle: "Obsessive-Compulsive Disorder",    type: "dsm"  },
  { id: "adhd",        name: "ADHD",                    subtitle: "Attention Deficit Hyperactivity",  type: "dsm"  },
  { id: "asd",         name: "Autism / ASD",            subtitle: "Autism Spectrum",                  type: "dsm"  },
  { id: "bpd",         name: "Borderline PD",           subtitle: "BPD",                              type: "dsm"  },
  { id: "dissoc",      name: "Dissociation",            subtitle: "Dissociative disorders",           type: "dsm"  },
  { id: "cptsd",       name: "C-PTSD",                  subtitle: "Complex trauma",                   type: "dsm"  },
  { id: "limerence",   name: "Limerence",               subtitle: "Non-DSM",                          type: "ndsm" },
  { id: "md",          name: "Maladaptive Daydreaming", subtitle: "Non-DSM",                          type: "ndsm" },
  { id: "gifted",      name: "Giftedness",              subtitle: "Twice-exceptional / 2e",           type: "ndsm" },
  { id: "hsp",         name: "Highly Sensitive Person", subtitle: "HSP / Sensory processing",         type: "ndsm" },
  { id: "rsd",         name: "Rejection Sensitivity",   subtitle: "RSD — common in ADHD/ASD",         type: "ndsm" },
  { id: "justice",     name: "Justice Sensitivity",     subtitle: "Common in ND populations",         type: "ndsm" },
  { id: "alexithymia", name: "Alexithymia",             subtitle: "Emotion identification difficulty",type: "ndsm" },
  { id: "cds",         name: "CDS",                     subtitle: "Cognitive disengagement syndrome", type: "ndsm" },
]

// Connections derived from the full network graph data
const MATRIX: Record<string, Set<string>> = {
  ocd:         new Set(["absorption","hyperphant","inferential","motivated","reality","dopamine","persist","emodysreg"]),
  adhd:        new Set(["absorption","hyperphant","dmn","hyperfocus","motivated","prefint","dopamine","persist","emodysreg"]),
  asd:         new Set(["absorption","hyperphant","dmn","inferential","monotropism","hyperfocus","intero","motivated","prefint","persist","emodysreg"]),
  bpd:         new Set(["absorption","hyperphant","inferential","intero","motivated","reality","dopamine","persist","emodysreg"]),
  dissoc:      new Set(["absorption","intero","prefint","reality","emodysreg"]),
  cptsd:       new Set(["absorption","intero","reality","persist","emodysreg"]),
  limerence:   new Set(["absorption","hyperphant","inferential","motivated","prefint","reality","dopamine","persist","emodysreg"]),
  md:          new Set(["absorption","hyperphant","dmn","motivated","prefint","reality","persist"]),
  gifted:      new Set(["absorption","hyperphant","dmn","hyperfocus","intero","motivated","prefint","persist"]),
  hsp:         new Set(["absorption","hyperphant","dmn","intero","prefint","emodysreg"]),
  rsd:         new Set(["motivated","dopamine","persist","emodysreg"]),
  justice:     new Set(["motivated","dopamine","persist","emodysreg"]),
  alexithymia: new Set(["intero","emodysreg"]),
  cds:         new Set(["absorption","dmn","motivated","prefint","reality"]),
}

const TYPE_COLORS: Record<string, string> = {
  dsm:  "text-emerald-700 dark:text-emerald-400",
  ndsm: "text-orange-600 dark:text-orange-400",
}

export function MechanismMatrix() {
  return (
    <div className="mb-20">
      <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-black text-foreground tracking-tight mb-2">
        MECHANISM MATRIX
      </h2>
      <p className="text-sm text-muted-foreground mb-4 max-w-2xl">
        Which cognitive mechanisms underlie each diagnosis or construct. Each dot marks a documented connection in the research literature.
      </p>

      {/* Legend */}
      <div className="flex flex-wrap gap-5 mb-5 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
          <span>DSM / ICD diagnosis</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-orange-400/70" />
          <span>Non-DSM construct</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-foreground font-bold text-sm leading-none">●</span>
          <span>Strong connection — core feature</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-foreground/50 text-sm leading-none">●</span>
          <span>Moderate connection — frequently co-present</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-foreground/25 text-sm leading-none">●</span>
          <span>Variable — present in some presentations</span>
        </div>
      </div>

      {/* Scrollable table */}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="border-collapse text-xs w-full min-w-max">
          <thead>
            <tr className="border-b border-border">
              <th
                className="sticky left-0 z-10 bg-background text-left px-4 py-3 font-[var(--font-display)] text-[10px] tracking-wider text-muted-foreground border-r border-border min-w-[200px]"
                style={{ minWidth: 200 }}
              >
                DIAGNOSIS / CONSTRUCT
              </th>
              {COLUMNS.map(col => (
                <th key={col.id} className="px-0 py-2 text-center align-bottom" style={{ width: 44, minWidth: 44 }}>
                  <div
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      whiteSpace: "nowrap",
                      fontSize: "9px",
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      paddingBlock: "6px",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {col.label}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, ri) => {
              const connections = MATRIX[row.id] ?? new Set()
              return (
                <tr
                  key={row.id}
                  className={`border-b border-border/60 transition-colors hover:bg-muted/20 ${ri % 2 === 1 ? "bg-muted/10" : "bg-background"}`}
                >
                  <td
                    className={`sticky left-0 z-10 px-4 py-2.5 border-r border-border ${ri % 2 === 1 ? "bg-muted/10" : "bg-background"}`}
                  >
                    <div className={`font-[var(--font-display)] font-bold text-xs tracking-wide ${TYPE_COLORS[row.type]}`}>
                      {row.name}
                    </div>
                    <div className="text-muted-foreground text-[10px] mt-0.5 leading-tight">{row.subtitle}</div>
                  </td>
                  {COLUMNS.map(col => (
                    <td key={col.id} className="text-center py-2.5" style={{ width: 44 }}>
                      {connections.has(col.id) && (
                        <span
                          className="text-foreground/80 select-none"
                          style={{ fontSize: "11px", lineHeight: 1 }}
                          title={`${row.name} — ${col.label}`}
                        >
                          ●
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
