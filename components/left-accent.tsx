"use client"

export function LeftAccent({ label = "M.", subtitle = "PsyD" }: { label?: string; subtitle?: string }) {
  return (
    <div className="no-print fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div className="bg-nav-teal w-12 h-32 flex flex-col items-center justify-center">
        <span
          className="text-white font-[var(--font-display)] font-bold text-sm tracking-wider"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
          }}
        >
          {label}
        </span>
        <div className="w-6 h-px bg-white/50 my-2 rotate-90" />
        <span
          className="text-white/80 font-[var(--font-display)] text-xs tracking-wider"
          style={{
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
