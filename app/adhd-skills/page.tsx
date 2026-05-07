import { ToolPageLayout } from "@/components/tool-page-layout"
import { DeepWorkPlanner } from "@/components/tools/deep-work-planner"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ADHD Skills — Olive Clinical",
}

const bodyDoublingResources = [
  {
    title: "2-Hour Body Doubling Session (Pomodoro)",
    subtitle: "Work with me — 25/5 Pomodoro",
    body: "A 'Work With Me' video featuring a 25/5 Pomodoro timer and background music. Put it on, sit down next to it, and work alongside the presence of another focused human.",
    linkLabel: "youtu.be/7izHQ7Ojt-s",
    href: "https://youtu.be/7izHQ7Ojt-s",
    color: "var(--slate)",
  },
  {
    title: "60-Minute Visual Time Timer",
    subtitle: "Countdown timer for time blindness",
    body: "A clean, 1-hour visual countdown timer to help with time blindness. Start it at the top of a task and let the shrinking disc translate abstract time into something you can actually see.",
    linkLabel: "youtube.com/watch?v=HSVqiA3sRdU",
    href: "https://www.youtube.com/watch?v=HSVqiA3sRdU",
    color: "var(--plum)",
  },
]

export default function ADHDSkillsPage() {
  return (
    <ToolPageLayout title="ADHD Skills" color="text-plum">
      <p className="text-muted-foreground mb-12 leading-relaxed max-w-prose">
        Interactive tools for ADHD management — goal planning grounded in Cal Newport&apos;s Deep Work framework
        and ACT, plus external resources for co-regulation and time blindness. All data is saved locally to your device.
      </p>

      <DeepWorkPlanner />

      {/* Time & Body Doubling resources */}
      <div className="mb-16">
        <h2
          className="text-3xl sm:text-4xl text-foreground mb-3"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
          }}
        >
          Time &amp; body doubling
        </h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-2xl leading-relaxed">
          External co-regulation for ADHD brains. Body doubling borrows someone else&apos;s focus to anchor your own;
          a visual timer makes abstract time legible. Both open in a new tab.
        </p>

        <style>{`
          .resource-card { transition: transform 0.15s ease, box-shadow 0.15s ease; }
          .resource-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(11,37,69,0.18); }
        `}</style>

        <div className="grid sm:grid-cols-2 gap-5">
          {bodyDoublingResources.map(r => (
            <a
              key={r.title}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="resource-card"
              style={{
                background: "var(--linen)",
                border: `1px solid ${r.color}`,
                padding: "24px 22px 20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: r.color,
              }}>
                {r.subtitle}
              </span>

              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.5rem",
                fontWeight: 500,
                letterSpacing: "-0.015em",
                lineHeight: 1.15,
                color: "var(--ink)",
              }}>
                {r.title}
              </h3>

              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                color: "var(--muted-foreground)",
                lineHeight: 1.55,
                flex: 1,
              }}>
                {r.body}
              </p>

              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                marginTop: "6px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                color: r.color,
              }}>
                {r.linkLabel} ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </ToolPageLayout>
  )
}
