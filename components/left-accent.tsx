"use client"

export function LeftAccent({ label = "M.", subtitle = "PsyD" }: { label?: string; subtitle?: string }) {
  return (
    <div className="no-print fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div className="bg-ink w-12 h-32 flex flex-col items-center justify-center">
        <span
          className="text-paper text-sm"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            letterSpacing: "0.04em",
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
          }}
        >
          {label}
        </span>
        <div className="w-6 h-px bg-paper/50 my-2 rotate-90" />
        <span
          className="text-paper/80 text-[0.65rem]"
          style={{
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.12em",
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
          }}
        >
          {subtitle}
        </span>
      </div>
    </div>
  )
}
