import { ToolPageLayout } from "@/components/tool-page-layout"
import { DysregulationLog } from "@/components/tools/dysregulation-log"
import { MeltdownWorksheet } from "@/components/tools/meltdown-worksheet"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ASD Skills — Madrone Love, PsyD",
  description: "Affirming support for autistic adults — masking burnout, identity, and thriving on your own terms.",
}

const skills = [
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

export default function ASDSkillsPage() {
  return (
    <ToolPageLayout title="ASD SKILLS" color="text-[#8A9E96]">
      <div className="space-y-14">

        {/* Intro */}
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

        {/* What we work on */}
        <div>
          <h2 className="font-[var(--font-display)] text-2xl font-black text-foreground tracking-tight mb-6">
            WHAT WE WORK ON
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {skills.map(skill => (
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

        {/* Framing note */}
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
    </ToolPageLayout>
  )
}
