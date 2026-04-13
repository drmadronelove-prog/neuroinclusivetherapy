"use client"

import { useEffect, useRef, useState } from "react"

// ── Config ────────────────────────────────────────────────────────────────────

const WORDS    = ["feel", "think", "are", "different"] as const
const TYPE_MS  = 80    // ms per letter while typing
const DEL_MS   = 80    // ms per letter while deleting
const HOLD_MS  = 2500  // display time for feel / think / are
const HOLD_LAST = 3500 // display time for "different"
const PAUSE_MS = 200   // pause after full deletion before next word

type Phase = "typing" | "holding" | "deleting" | "pausing"

// ── Component ─────────────────────────────────────────────────────────────────

export function AnimatedHeading() {
  const [wordIdx,   setWordIdx]   = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [phase,     setPhase]     = useState<Phase>("typing")
  const [underline, setUnderline] = useState(false)

  // Stable ref so the cleanup in the effect doesn't depend on stale state
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Clear any pending timer from the previous render
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }

    const word   = WORDS[wordIdx]
    const isLast = wordIdx === WORDS.length - 1

    if (phase === "typing") {
      if (displayed.length < word.length) {
        // Type the next letter
        timerRef.current = setTimeout(
          () => setDisplayed(word.slice(0, displayed.length + 1)),
          TYPE_MS
        )
      } else {
        // Word fully typed — activate underline for "different", then hold
        if (isLast) setUnderline(true)
        setPhase("holding")
      }

    } else if (phase === "holding") {
      timerRef.current = setTimeout(() => {
        setUnderline(false)
        setPhase("deleting")
      }, isLast ? HOLD_LAST : HOLD_MS)

    } else if (phase === "deleting") {
      if (displayed.length > 0) {
        timerRef.current = setTimeout(
          () => setDisplayed(d => d.slice(0, -1)),
          DEL_MS
        )
      } else {
        setPhase("pausing")
      }

    } else if (phase === "pausing") {
      timerRef.current = setTimeout(() => {
        setWordIdx(i => (i + 1) % WORDS.length)
        setPhase("typing")
      }, PAUSE_MS)
    }

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, displayed, wordIdx])

  const word   = WORDS[wordIdx]
  const isLast = wordIdx === WORDS.length - 1

  // Show terminal period once "different" is fully typed
  const showPeriod = isLast && displayed.length === word.length

  return (
    <p className="font-[var(--font-display)] text-foreground text-2xl sm:text-3xl font-bold leading-snug max-w-md">
      Therapy and Tools for people who{" "}

      {/* Animated word */}
      <span className="relative inline-block">
        <span
          className={
            isLast
              ? "text-nav-teal font-[var(--font-script)] font-bold"
              : "text-foreground"
          }
        >
          {displayed}
        </span>

        {/* Fade-in underline — only for "different" */}
        {isLast && (
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 -bottom-1 right-0 h-[2px] rounded-full bg-nav-teal"
            style={{
              opacity: underline ? 1 : 0,
              transition: underline
                ? "opacity 350ms ease-in"
                : "opacity 150ms ease-out",
            }}
          />
        )}
      </span>

      {/* Static " different." when cycling through feel / think / are */}
      {!isLast && " different."}

      {/* Period that appears after the script "different" finishes typing */}
      {isLast && (
        <span
          style={{
            opacity: showPeriod ? 1 : 0,
            transition: "opacity 200ms ease-in",
          }}
        >
          .
        </span>
      )}
    </p>
  )
}
