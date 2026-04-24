"use client"

import { useState } from "react"
import { ToolPageLayout } from "@/components/tool-page-layout"
import { DeepWorkPlanner } from "@/components/tools/deep-work-planner"
import { DysregulationLog } from "@/components/tools/dysregulation-log"
import { MeltdownWorksheet } from "@/components/tools/meltdown-worksheet"

const asdSkills = [
  {
    title: "Masking & Camouflaging",
    body: "Identifying the cost of chronic social performance — and beginning to recover authentic expression. This includes mapping which masks you wear, what they protect, and what they cost in energy and identity.",
  },
  {
    title: "Autistic Burnout",
    body: "Understanding the cyclical collapse that follows prolonged masking and overextension. Building recovery conditions and sustainable limits that honor your actual capacity — not the capacity the world expects.",
  },
  {
    title: "Monotropism & Deep Interests",
    body: "Working with your attention system rather than against it. Recognizing hyperfocus and deep interest as cognitive strengths, not failures of flexibility — and building a life structured around them.",
  },
  {
    title: "Sensory Environment",
    body: "Identifying sensory needs and designing environments that support regulation. Reducing shame around sensory preferences and building language for advocating for accommodation in work, relationships, and daily life.",
  },
  {
    title: "Social Navigation",
    body: "Understanding the social world on your terms — not by memorizing neurotypical rules, but by gaining clarity about what you actually want from relationships and why connection feels the way it does.",
  },
  {
    title: "Identity After Diagnosis",
    body: "Late diagnosis brings grief, relief, and disorientation simultaneously. Remaking sense of your history through an autistic lens, and rebuilding self-concept on more accurate, compassionate ground.",
  },
]

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

function ASDTab() {
  return (
    <div className="space-y-14">
      <div className="space-y-5 max-w-prose">
        <p className="text-lg text-foreground leading-relaxed">
          Autistic experience is not a collection of deficits to remediate.
          It is a distinct cognitive style — characterized by monotropism, depth of processing,
          and sensory richness — that has been systematically misread by a world built for
          neurotypical minds.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          My work with autistic clients starts from full identity affirmation: your autism
          is not the problem. The exhaustion, confusion, and sense of never quite fitting
          arise from decades of masking, misattunement, and environments that demanded you
          be someone else. Therapy creates space to understand yourself on your own terms
          and recover what masking took from you.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          I work with autistic adults navigating late diagnosis, burnout, identity
          reconstruction, relationship challenges, and the existential complexity of
          discovering yourself mid-life. Sessions are paced to your processing style —
          never rushed, never performative.
        </p>
      </div>

      <div>
        <h2 className="font-[var(--font-display)] text-2xl font-black text-foreground tracking-tight mb-6">
          WHAT WE WORK ON
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {asdSkills.map(skill => (
            <div
              key={skill.title}
              className="bg-card border border-border border-l-2 border-l-[#8A9E96] rounded-lg p-5"
            >
              <h3 className="font-[var(--font-display)] font-bold text-foreground mb-2 text-sm tracking-wide">
                {skill.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{skill.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-l-2 border-[#8A9E96] pl-6 max-w-prose">
        <p className="text-muted-foreground leading-relaxed text-sm">
          I also work with partners, family members, and colleagues of autistic people who are
          navigating relationship dynamics, communication differences, and the impact of
          one person&apos;s neurodivergence on a shared system.
        </p>
      </div>

      <DysregulationLog />
      <MeltdownWorksheet />
    </div>
  )
}

function ADHDTab() {
  return (
    <div className="space-y-12">
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
    </div>
  )
}

export default function ADHDASDSkillsPage() {
  const [tab, setTab] = useState<"asd" | "adhd">("asd")

  return (
    <ToolPageLayout title="ASD + ADHD SKILLS" color="text-[#8A9E96]">
      {/* Tab switcher */}
      <div className="flex gap-2 mb-10">
        {([["asd", "ASD Skills"], ["adhd", "ADHD Skills"]] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "8px 20px",
              borderRadius: "999px",
              border: `2px solid #8A9E96`,
              background: tab === key ? "#8A9E96" : "transparent",
              color: tab === key ? "#fff" : "#8A9E96",
              cursor: "pointer",
              transition: "background 0.18s, color 0.18s",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "asd" ? <ASDTab /> : <ADHDTab />}
    </ToolPageLayout>
  )
}
