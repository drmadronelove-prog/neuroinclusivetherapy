"use client"

import { useState } from "react"

type SpectrumId = "imag" | "attn" | "aff" | "pers"
type CondType   = "dsm" | "ndsm"

interface Spectrum {
  id:    SpectrumId
  c:     string
  l:     string
  t:     string
  n:     string
}

interface Cond {
  l:    string
  type: CondType
  desc: string
  sec:  SpectrumId[]
}

interface Band {
  id:    SpectrumId
  mechs: string[]
  conds: Cond[]
}

const sc: Record<SpectrumId, Spectrum> = {
  imag: { id: "imag", c: "#7F77DD", l: "#EEEDFE", t: "#3C3489", n: "Imagination-Reality Interface"     },
  attn: { id: "attn", c: "#1D9E75", l: "#E1F5EE", t: "#085041", n: "Attentional Depth"                 },
  aff:  { id: "aff",  c: "#D85A30", l: "#FAECE7", t: "#712B13", n: "Affective-Somatic Sensitivity"     },
  pers: { id: "pers", c: "#BA7517", l: "#FAEEDA", t: "#633806", n: "Perseverative-Moral Processing"    },
}

const cc: Record<CondType, { f: string; s: string; t: string }> = {
  dsm:  { f: "#E1F5EE", s: "#1D9E75", t: "#085041" },
  ndsm: { f: "#FAECE7", s: "#D85A30", t: "#712B13" },
}

const bands: Band[] = [
  {
    id: "imag",
    mechs: ["Hyperphantasia", "Inferential confusion", "Motivated imagination", "Reality monitoring"],
    conds: [
      { l: "OCD",               type: "dsm",  sec: ["aff","pers"],        desc: "Inferential confusion and motivated imagination are the I-CBT core. Hyperphantasia amplifies intrusive content. Compulsion-relief is dopaminergic." },
      { l: "Limerence",         type: "ndsm", sec: ["attn","aff","pers"],  desc: "Motivated imagination and inferential confusion sustain the limerent object. Reality monitoring degrades. Strongly overlaps affective and perseverative spectra." },
      { l: "Borderline PD",     type: "dsm",  sec: ["attn","aff","pers"],  desc: "Inferential confusion about others\' states and intentions. Reality monitoring of relational cues is unreliable. Absorption in imagined scenarios of the other." },
      { l: "Fantasy proneness", type: "ndsm", sec: ["attn"],               desc: "Hyperphantasia and degraded reality monitoring are defining. Absorption is high. Often confuses fantasy with memory." },
      { l: "Mal. daydreaming",  type: "ndsm", sec: ["attn","pers"],        desc: "Motivated imagination and reality monitoring are core. Absorption into an internally generated world. DMN overactivation sustains the loop." },
    ],
  },
  {
    id: "attn",
    mechs: ["Absorption", "DMN intrusion", "Monotropism", "Hyperfocus", "Preferential interiority"],
    conds: [
      { l: "ADHD",               type: "dsm",  sec: ["imag","aff","pers"],  desc: "DMN intrusion, hyperfocus, and absorption are defining. Dopaminergic gating of attention. Inner world often more rewarding than external." },
      { l: "Autism / ASD",       type: "dsm",  sec: ["imag","aff","pers"],  desc: "Monotropism is the primary attentional architecture. Hyperfocus, deep absorption, and preferential interiority follow from it. Broadest mechanism profile of any condition here." },
      { l: "Giftedness",         type: "ndsm", sec: ["imag","aff","pers"],  desc: "Absorption, hyperfocus, and DMN intrusion overlap significantly with ADHD and ASD. Dabrowski\'s overexcitabilities map onto multiple spectra." },
      { l: "Flow states",        type: "ndsm", sec: ["imag"],               desc: "Absorption, hyperfocus, monotropism, and preferential interiority are defining. The positive pole of the attentional depth spectrum." },
      { l: "Cog. disengagement", type: "ndsm", sec: ["imag"],               desc: "DMN intrusion, absorption, and preferential interiority produce the foggy, internally-oriented quality. Distinct from ADHD neurobiologically." },
    ],
  },
  {
    id: "aff",
    mechs: ["Interoception", "Emotional dysreg.", "Dopamine dysreg."],
    conds: [
      { l: "C-PTSD",                  type: "dsm",  sec: ["imag","pers"],        desc: "Interoceptive differences and emotional dysregulation are organizing. Absorption in trauma-related states. Perseverative processing of unresolvable injustice." },
      { l: "Dissociation",            type: "dsm",  sec: ["imag","attn"],        desc: "Interoceptive disruption is core. Reality monitoring and absorption interact to produce identity and perceptual discontinuity." },
      { l: "Highly sensitive person", type: "ndsm", sec: ["imag","attn"],        desc: "Interoception and emotional dysregulation amplified across sensory domains. Hyperphantasia may contribute to intensity of imaginative processing." },
      { l: "Alexithymia",             type: "ndsm", sec: [],                     desc: "Defined by interoceptive difficulty and emotional dysregulation. The narrowest mechanism profile here — pure affective-somatic." },
      { l: "NVLD",                    type: "ndsm", sec: ["imag","attn","pers"], desc: "Interoceptive differences and emotional dysregulation. Inferential confusion in the social-nonverbal domain. Monotropism as compensatory strategy." },
    ],
  },
  {
    id: "pers",
    mechs: ["Perseverative cognition"],
    conds: [
      { l: "Justice sensitivity",   type: "ndsm", sec: ["imag","aff"], desc: "Perseverative cognition organized around moral injury. Emotional dysregulation and dopamine dysregulation sustain the loop. Overlaps RSD." },
      { l: "Rejection sensitivity", type: "ndsm", sec: ["imag","aff"], desc: "Dopamine dysregulation and emotional dysregulation are core. Perseverative rehearsal of rejection scenarios. Overlaps limerence and justice sensitivity." },
    ],
  },
]

export function TwoLevelFoundations() {
  const [selected, setSelected] = useState<{ band: SpectrumId; label: string } | null>(null)

  const activeDesc =
    selected
      ? bands
          .find(b => b.id === selected.band)
          ?.conds.find(c => c.l === selected.label)?.desc ?? ""
      : ""

  const toggle = (band: SpectrumId, label: string) =>
    setSelected(s =>
      s?.band === band && s?.label === label ? null : { band, label },
    )

  return (
    <div className="w-full">
      <div className="space-y-[7px]">
        {bands.map(band => {
          const s = sc[band.id]
          return (
            <div
              key={band.id}
              className="flex flex-col sm:flex-row"
              style={{
                borderRadius: 8,
                overflow: "hidden",
                border: `0.5px solid ${s.c}`,
              }}
            >
              {/* Spectrum label */}
              <div
                className="sm:w-[88px] sm:min-w-[88px]"
                style={{
                  background: s.c,
                  color: "white",
                  fontSize: 10,
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: "6px 10px",
                  lineHeight: 1.3,
                }}
              >
                {s.n}
              </div>

              {/* Mechanisms */}
              <div
                style={{
                  background: s.l,
                  padding: "7px 10px",
                  display: "flex",
                  flexWrap: "wrap",
                  alignContent: "center",
                  gap: 4,
                  flex: 1,
                  minWidth: 0,
                  borderTop: `0.5px solid ${s.c}`,
                  borderBottom: `0.5px solid ${s.c}`,
                }}
                className="sm:border-t-0 sm:border-b-0 sm:border-l sm:border-r"
              >
                {band.mechs.map(m => (
                  <span
                    key={m}
                    style={{
                      fontSize: 9.5,
                      padding: "2px 7px",
                      borderRadius: 10,
                      background: "white",
                      color: s.t,
                      border: `0.5px solid ${s.c}`,
                      whiteSpace: "nowrap",
                      opacity: 0.9,
                    }}
                  >
                    {m}
                  </span>
                ))}
              </div>

              {/* Conditions */}
              <div
                style={{
                  background: "var(--background)",
                  padding: "7px 10px",
                  display: "flex",
                  flexWrap: "wrap",
                  alignContent: "center",
                  gap: 4,
                  flex: 2,
                  minWidth: 0,
                }}
              >
                {band.conds.map(c => {
                  const ccc = cc[c.type]
                  const isActive = selected?.band === band.id && selected?.label === c.l
                  return (
                    <span
                      key={c.l}
                      onClick={() => toggle(band.id, c.l)}
                      style={{
                        fontSize: 10.5,
                        padding: "3px 9px",
                        borderRadius: 10,
                        background: ccc.f,
                        color: ccc.t,
                        border: `0.5px solid ${ccc.s}`,
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        boxShadow: isActive ? `0 0 0 2px ${s.c}` : "none",
                        opacity: isActive ? 1 : 0.9,
                        transition: "opacity 0.15s",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      {c.l}
                      {c.sec.map(sid => (
                        <span
                          key={sid}
                          title={sc[sid].n}
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            background: sc[sid].c,
                            display: "inline-block",
                          }}
                        />
                      ))}
                    </span>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Description */}
      <div
        className="text-[12px] text-muted-foreground min-h-[18px] mt-1 mx-0.5 italic"
        style={{ transition: "opacity 0.15s", opacity: activeDesc ? 1 : 0 }}
      >
        {activeDesc || "\u00A0"}
      </div>

      <p className="text-[11px] text-muted-foreground mt-0.5 mx-0.5">
        Click a condition for its mechanism profile. Each band = one spectrum. Foundation layer = shared mechanisms.
      </p>
    </div>
  )
}
