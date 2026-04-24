import { ToolPageLayout } from "@/components/tool-page-layout"
import { DeepWorkPlanner } from "@/components/tools/deep-work-planner"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ADHD Skills — Madrone Love, PsyD",
}

const bodyDoublingResources = [
  {
    title: "2-Hour Body Doubling Session (Pomodoro)",
    subtitle: "WORK WITH ME — 25/5 POMODORO",
    body: "A 'Work With Me' video featuring a 25/5 Pomodoro timer and background music. Put it on, sit down next to it, and work alongside the presence of another focused human.",
    linkLabel: "youtu.be/7izHQ7Ojt-s",
    href: "https://youtu.be/7izHQ7Ojt-s",
    color: "#7A9A78",
  },
  {
    title: "60-Minute Visual Time Timer",
    subtitle: "COUNTDOWN TIMER FOR TIME BLINDNESS",
    body: "A clean, 1-hour visual countdown timer to help with time blindness. Start it at the top of a task and let the shrinking disc translate abstract time into something you can actually see.",
    linkLabel: "youtube.com/watch?v=HSVqiA3sRdU",
    href: "https://www.youtube.com/watch?v=HSVqiA3sRdU",
    color: "#C17C74",
  },
]

export default function ADHDSkillsPage() {
  return (
    <ToolPageLayout title="ADHD SKILLS" color="text-[#C17C74]">
      <p className="text-muted-foreground mb-12 leading-relaxed max-w-prose">
        Interactive tools for ADHD management — goal planning grounded in Cal Newport&apos;s Deep Work framework
        and ACT, plus external resources for co-regulation and time blindness. All data is saved locally to your device.
      </p>

      <DeepWorkPlanner />

      {/* Time & Body Doubling resources */}
      <div className="mb-16">
        <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-black text-foreground tracking-tight mb-2">
          TIME &amp; BODY DOUBLING
        </h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-2xl leading-relaxed">
          External co-regulation for ADHD brains. Body doubling borrows someone else&apos;s focus to anchor your own;
          a visual timer makes abstract time legible. Both open in a new tab.
        </p>

        <style>{`
          .resource-card { transition: transform 0.15s ease, box-shadow 0.15s ease; }
          .resource-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px var(--card-shadow); }
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
                "--card-shadow": `${r.color}55`,
                background: `${r.color}30`,
                borderRadius: "16px",
                border: `2px solid ${r.color}`,
                padding: "24px 22px 20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                textDecoration: "none",
                cursor: "pointer",
              } as React.CSSProperties}
            >
              <h3 style={{
                fontFamily: "var(--font-accent)",
                fontSize: "1.6rem",
                fontWeight: 700,
                lineHeight: 1.15,
                color: "var(--foreground)",
              }}>
                {r.title}
              </h3>

              <p style={{
                fontFamily: "var(--font-accent)",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "var(--muted-foreground)",
                marginTop: "-4px",
              }}>
                {r.subtitle}
              </p>

              <p style={{
                fontFamily: "var(--font-accent)",
                fontSize: "1rem",
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
                fontSize: "0.95rem",
                fontFamily: "var(--font-accent)",
                fontWeight: 600,
                color: r.color,
                opacity: 0.9,
              }}>
                {r.linkLabel} <span style={{ fontSize: "0.9rem" }}>↗</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </ToolPageLayout>
  )
}
