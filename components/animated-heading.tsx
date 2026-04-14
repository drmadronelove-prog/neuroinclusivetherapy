"use client"

import { useEffect, useRef, useState } from "react"

// ── Config ─────────────────────────────────────────────────────────────────────
const WORDS        = ["feel", "think", "are"] as const
const STATIC_TEXT  = " different."
const CURSIVE_WORD = "different"

const TYPE_MS      = 80    // ms per letter typing
const DEL_MS       = 60    // ms per letter deleting
const HOLD_MS      = 2000  // hold time for feel / think
const HOLD_ARE_MS  = 1200  // pause after "are" before deleting static text
const HOLD_FINAL   = 4000  // hold time for the signed "different"
const PAUSE_MS     = 200   // pause between words

type Phase =
  | "typing"       // typing the current word
  | "holding"      // word fully displayed, waiting
  | "deleting"     // deleting current word (feel/think) OR deleting "are" on loop-back
  | "pausing"      // brief pause before next word
  | "del-static"   // deleting the static " different." one char at a time
  | "type-cursive" // typing teal cursive "different"
  | "hold-final"   // displaying signed state with underline
  | "del-cursive"  // deleting cursive "different" on loop-back

// ── Component ──────────────────────────────────────────────────────────────────
export function AnimatedHeading() {
  const [wordIdx,   setWordIdx]   = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [phase,     setPhase]     = useState<Phase>("typing")
  const [staticLen, setStaticLen] = useState(STATIC_TEXT.length)
  const [cursive,   setCursive]   = useState("")
  const [underline, setUnderline] = useState(false)

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }

    const word = WORDS[wordIdx]

    switch (phase) {
      case "typing":
        if (displayed.length < word.length) {
          timerRef.current = setTimeout(
            () => setDisplayed(word.slice(0, displayed.length + 1)),
            TYPE_MS,
          )
        } else {
          setPhase("holding")
        }
        break

      case "holding":
        // "are" (wordIdx 2) stays — start deleting the static text instead
        timerRef.current = setTimeout(
          () => setPhase(wordIdx === 2 ? "del-static" : "deleting"),
          wordIdx === 2 ? HOLD_ARE_MS : HOLD_MS,
        )
        break

      case "deleting":
        if (displayed.length > 0) {
          timerRef.current = setTimeout(
            () => setDisplayed(d => d.slice(0, -1)),
            DEL_MS,
          )
        } else {
          // 0→1, 1→2, 2→0 (loop-back after full cycle)
          setWordIdx(wordIdx < 2 ? wordIdx + 1 : 0)
          setPhase("pausing")
        }
        break

      case "pausing":
        timerRef.current = setTimeout(() => setPhase("typing"), PAUSE_MS)
        break

      case "del-static":
        if (staticLen > 0) {
          timerRef.current = setTimeout(
            () => setStaticLen(n => n - 1),
            DEL_MS,
          )
        } else {
          setCursive("")
          setPhase("type-cursive")
        }
        break

      case "type-cursive":
        if (cursive.length < CURSIVE_WORD.length) {
          timerRef.current = setTimeout(
            () => setCursive(CURSIVE_WORD.slice(0, cursive.length + 1)),
            TYPE_MS,
          )
        } else {
          setUnderline(true)
          setPhase("hold-final")
        }
        break

      case "hold-final":
        timerRef.current = setTimeout(() => {
          setUnderline(false)
          setPhase("del-cursive")
        }, HOLD_FINAL)
        break

      case "del-cursive":
        if (cursive.length > 0) {
          timerRef.current = setTimeout(
            () => setCursive(c => c.slice(0, -1)),
            DEL_MS,
          )
        } else {
          // Restore static text, then fall into "deleting" to remove "are"
          setStaticLen(STATIC_TEXT.length)
          setPhase("deleting")
        }
        break
    }

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, displayed, wordIdx, staticLen, cursive])

  // Show cursive span only during the three phases that involve it
  const showCursive =
    wordIdx === 2 &&
    (phase === "type-cursive" || phase === "hold-final" || phase === "del-cursive")

  return (
    <p className="font-[var(--font-display)] text-foreground text-2xl sm:text-3xl font-bold leading-snug max-w-md">
      Therapy and Tools for people who{" "}

      {/* The cycling word (feel / think / are) */}
      <span>{displayed}</span>

      {/* Static " different." — shrinks to nothing during del-static, restored on loop */}
      {STATIC_TEXT.slice(0, staticLen)}

      {/* Teal cursive "different" with signature underline */}
      {showCursive && (
        <>
          {" "}
          <span className="relative inline-block">
            <span className="text-nav-teal font-[var(--font-script)] font-bold">
              {cursive}
            </span>

            {/* Underline draws left-to-right like a pen stroke */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-0 -bottom-1 h-[2px] bg-nav-teal"
              style={{
                width: "calc(100% + 10px)",
                transformOrigin: "left center",
                transform: underline ? "scaleX(1)" : "scaleX(0)",
                transition: underline
                  ? "transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                  : "transform 200ms ease-in",
              }}
            />
          </span>
        </>
      )}
    </p>
  )
}
