"use client"

import { useState, useEffect } from "react"

const PHASES = ["Inhale", "Hold", "Exhale", "Hold"]
const PHASE_DURATION = 4000
const TOTAL_DURATION = 16000

export function BreathingBubble() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const startTime = Date.now()
    const id = setInterval(() => {
      const elapsed = (Date.now() - startTime) % TOTAL_DURATION
      setPhase(Math.floor(elapsed / PHASE_DURATION))
    }, 200)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 0 40px" }}>
      <style>{`
        @keyframes breathe {
          0%   { transform: scale(0.45); }
          25%  { transform: scale(1);    }
          50%  { transform: scale(1);    }
          75%  { transform: scale(0.45); }
          100% { transform: scale(0.45); }
        }
        @keyframes breathe-glow {
          0%   { opacity: 0.35; }
          25%  { opacity: 0.75; }
          50%  { opacity: 0.75; }
          75%  { opacity: 0.35; }
          100% { opacity: 0.35; }
        }
      `}</style>

      {/* Outer guide ring */}
      <div style={{ position: "relative", width: 180, height: 180 }}>
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          border: "1.5px dashed rgba(91,168,158,0.35)",
        }} />

        {/* Animated bubble */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: "radial-gradient(circle at 38% 32%, rgba(107,191,181,0.85) 0%, rgba(74,155,146,0.55) 55%, rgba(58,130,122,0.30) 100%)",
          animation: "breathe 16s cubic-bezier(0.45,0,0.55,1) infinite, breathe-glow 16s ease-in-out infinite",
          transformOrigin: "center",
        }} />

        {/* Center label */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 4,
        }}>
          <span style={{
            fontFamily: "var(--font-accent)",
            fontSize: "1.1rem",
            fontWeight: 600,
            color: "#1D5A54",
            letterSpacing: "0.02em",
          }}>
            {PHASES[phase]}
          </span>
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(29,90,84,0.55)",
          }}>
            4 seconds
          </span>
        </div>
      </div>

      {/* Phase indicator dots */}
      <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
        {PHASES.map((label, i) => (
          <div key={label + i} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: phase === i ? "#5BA89E" : "rgba(91,168,158,0.25)",
              transition: "background 0.3s",
            }} />
            <span style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.55rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: phase === i ? "#5BA89E" : "rgba(91,168,158,0.45)",
              transition: "color 0.3s",
            }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
