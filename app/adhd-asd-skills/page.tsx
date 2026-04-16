"use client"

import { useState } from "react"
import { ToolPageLayout } from "@/components/tool-page-layout"
import { DeepWorkPlanner } from "@/components/tools/deep-work-planner"
import { DysregulationLog } from "@/components/tools/dysregulation-log"

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
    </div>
  )
}

function ADHDTab() {
  return (
    <div className="space-y-12">
      <p className="text-muted-foreground mb-12 leading-relaxed max-w-prose">
        Interactive tools for ADHD management — goal planning grounded in Cal Newport&apos;s Deep Work framework
        and ACT, plus a pattern tracker for dysregulation episodes. All data is saved locally to your device.
      </p>
      <DeepWorkPlanner />
      <DysregulationLog />
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
