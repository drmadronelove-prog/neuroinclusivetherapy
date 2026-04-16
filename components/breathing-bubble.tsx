"use client"

import { useState, useEffect, useRef } from "react"

const PHASES = ["Inhale", "Hold", "Exhale", "Hold"]
const PHASE_DURATION = 4000
const TOTAL_DURATION = 16000

// Descending C major arpeggio — peaceful, grounding
const PHASE_FREQUENCIES = [523, 392, 330, 262]

function playBell(ctx: AudioContext, freq: number) {
  // Fundamental tone
  const osc1 = ctx.createOscillator()
  const gain1 = ctx.createGain()
  osc1.type = "sine"
  osc1.frequency.value = freq
  osc1.connect(gain1)
  gain1.connect(ctx.destination)
  gain1.gain.setValueAtTime(0, ctx.currentTime)
  gain1.gain.linearRampToValueAtTime(0.13, ctx.currentTime + 0.04)
  gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.8)
  osc1.start(ctx.currentTime)
  osc1.stop(ctx.currentTime + 2.8)

  // Soft octave harmonic for bell richness
  const osc2 = ctx.createOscillator()
  const gain2 = ctx.createGain()
  osc2.type = "sine"
  osc2.frequency.value = freq * 2
  osc2.connect(gain2)
  gain2.connect(ctx.destination)
  gain2.gain.setValueAtTime(0, ctx.currentTime)
  gain2.gain.linearRampToValueAtTime(0.055, ctx.currentTime + 0.02)
  gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4)
  osc2.start(ctx.currentTime)
  osc2.stop(ctx.currentTime + 1.4)
}

export function BreathingBubble() {
  const [phase, setPhase] = useState(0)
  const [soundOn, setSoundOn] = useState(true)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const soundOnRef  = useRef(true)

  function toggleSound() {
    soundOnRef.current = !soundOnRef.current
    setSoundOn(soundOnRef.current)
  }

  function triggerBell(phaseIndex: number) {
    if (!soundOnRef.current) return
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext()
      }
      const ctx = audioCtxRef.current
      if (ctx.state === "suspended") ctx.resume()
      playBell(ctx, PHASE_FREQUENCIES[phaseIndex])
    } catch {
      // audio unavailable — fail silently
    }
  }

  useEffect(() => {
    const startTime = Date.now()
    let lastPhase = -1

    const id = setInterval(() => {
      const elapsed = (Date.now() - startTime) % TOTAL_DURATION
      const current = Math.floor(elapsed / PHASE_DURATION)
      if (current !== lastPhase) {
        lastPhase = current
        setPhase(current)
        triggerBell(current)
      }
    }, 100)

    return () => clearInterval(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{
      border: "1.5px solid rgba(91,168,158,0.35)",
      borderRadius: "20px",
      background: "rgba(91,168,158,0.05)",
      padding: "32px 24px 28px",
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      maxWidth: "320px",
      width: "100%",
    }}>
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
          25%  { opacity: 0.78; }
          50%  { opacity: 0.78; }
          75%  { opacity: 0.35; }
          100% { opacity: 0.35; }
        }
      `}</style>

      {/* Outer guide ring + bubble */}
      <div style={{ position: "relative", width: 180, height: 180 }}>
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          border: "1.5px dashed rgba(91,168,158,0.35)",
        }} />

        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: "radial-gradient(circle at 38% 32%, rgba(107,191,181,0.85) 0%, rgba(74,155,146,0.55) 55%, rgba(58,130,122,0.30) 100%)",
          animation: "breathe 16s cubic-bezier(0.45,0,0.55,1) infinite, breathe-glow 16s ease-in-out infinite",
          transformOrigin: "center",
        }} />

        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 4,
        }}>
          <span style={{
            fontFamily: "var(--font-accent)",
            fontSize: "1.1rem", fontWeight: 600,
            color: "#1D5A54", letterSpacing: "0.02em",
          }}>
            {PHASES[phase]}
          </span>
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.65rem", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: "rgba(29,90,84,0.55)",
          }}>
            4 seconds
          </span>
        </div>
      </div>

      {/* Phase dots */}
      <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
        {PHASES.map((label, i) => (
          <div key={label + i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: phase === i ? "#5BA89E" : "rgba(91,168,158,0.25)",
              transition: "background 0.3s",
            }} />
            <span style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.55rem", fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: phase === i ? "#5BA89E" : "rgba(91,168,158,0.45)",
              transition: "color 0.3s",
            }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Sound toggle */}
      <button
        onClick={toggleSound}
        aria-label={soundOn ? "Mute sounds" : "Enable sounds"}
        style={{
          marginTop: 16,
          display: "flex", alignItems: "center", gap: 6,
          background: "none", border: "none", cursor: "pointer",
          opacity: soundOn ? 0.7 : 0.35,
          transition: "opacity 0.2s",
          padding: "4px 8px",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5BA89E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {soundOn ? (
            <>
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </>
          ) : (
            <>
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </>
          )}
        </svg>
        <span style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.6rem", fontWeight: 700,
          letterSpacing: "0.12em", textTransform: "uppercase",
          color: "#5BA89E",
        }}>
          {soundOn ? "Sound on" : "Sound off"}
        </span>
      </button>
    </div>
  )
}
