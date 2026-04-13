import { ToolPageLayout } from "@/components/tool-page-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "OCD Skills — Dr. Madrone Love, PsyD",
  description: "ERP-trained treatment for OCD. Understanding the cycle and building the skills to step out of it.",
}

const cycleSteps = [
  {
    label: "Obsession",
    body: "An intrusive thought, image, or urge that the brain tags as threatening — regardless of whether it is. The content varies: contamination, harm, symmetry, morality, relationship doubt.",
  },
  {
    label: "Anxiety",
    body: "The brain treats the intrusion as a genuine signal of danger. Distress rises. The urge to resolve or neutralize the thought becomes urgent.",
  },
  {
    label: "Compulsion",
    body: "A behavior — overt (washing, checking, arranging) or covert (mental review, reassurance-seeking, neutralizing) — performed to reduce the distress. It works, briefly.",
  },
  {
    label: "Temporary relief → Reset",
    body: "The relief reinforces the compulsion and strengthens the loop. The brain learns: this thought requires a response. The threshold lowers. The cycle tightens.",
  },
]

const approaches = [
  {
    title: "Exposure & Response Prevention (ERP)",
    body: "The gold-standard, evidence-based treatment for OCD. ERP involves deliberate, graduated exposure to obsessional triggers while refraining from compulsive responses — allowing the brain to learn that the feared outcome does not require the compulsion. I am trained in ERP through the International OCD Foundation.",
    tag: "Primary Treatment",
    color: "border-nav-teal",
  },
  {
    title: "Inference-Based CBT (iCBT)",
    body: "OCD often operates through a specific reasoning error: treating imagined possibilities as if they were real evidence. iCBT targets this inferential confusion directly — distinguishing obsessional logic from reality-based reasoning, without requiring distress tolerance as the entry point.",
    tag: "Complementary",
    color: "border-nav-teal",
  },
  {
    title: "ACT for OCD",
    body: "Acceptance and Commitment Therapy offers tools for relating differently to intrusive thoughts — observing them without fusing with them, clarifying values, and choosing behavior based on what matters rather than what the obsession demands.",
    tag: "Complementary",
    color: "border-nav-teal",
  },
]

export default function OCDSkillsPage() {
  return (
    <ToolPageLayout title="OCD SKILLS" color="text-nav-teal">
      <div className="space-y-14">

        {/* Intro */}
        <div className="space-y-5 max-w-prose">
          <p className="text-lg text-foreground leading-relaxed">
            OCD is not about cleanliness or being &ldquo;a little OCD.&rdquo; It is a neurological
            condition involving intrusive thoughts that the brain incorrectly tags as threatening,
            and compulsive responses that provide temporary relief while tightening the loop.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I am trained in Exposure and Response Prevention (ERP) through the International
            OCD Foundation — the evidence-based, gold-standard treatment for OCD. I also draw
            on Inference-Based CBT and ACT to address the reasoning patterns and experiential
            avoidance that sustain obsessional thinking over time.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            OCD frequently co-occurs with ADHD, autism, and anxiety disorders. I am experienced
            in working with presentations where multiple conditions overlap, and in adapting
            ERP for neurodivergent brains.
          </p>
        </div>

        {/* The cycle */}
        <div>
          <h2 className="font-[var(--font-display)] text-2xl font-black text-foreground tracking-tight mb-2">
            THE OCD CYCLE
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Understanding why OCD is self-sustaining is the first step toward stepping out of it.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {cycleSteps.map((step, i) => (
              <div key={step.label} className="bg-card border border-border rounded-lg p-5 relative">
                <span className="text-xs font-bold tracking-widest text-nav-teal mb-2 block">
                  STEP {i + 1}
                </span>
                <h3 className="font-[var(--font-display)] font-bold text-foreground mb-2 text-sm tracking-wide">
                  {step.label}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Treatment approaches */}
        <div>
          <h2 className="font-[var(--font-display)] text-2xl font-black text-foreground tracking-tight mb-6">
            TREATMENT APPROACHES
          </h2>
          <div className="space-y-4">
            {approaches.map(a => (
              <div key={a.title} className={`bg-card border border-border border-l-2 ${a.color} rounded-lg p-5`}>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-[var(--font-display)] font-bold text-foreground text-sm tracking-wide">
                    {a.title}
                  </h3>
                  <span className="text-xs text-nav-teal font-bold tracking-wider whitespace-nowrap shrink-0">
                    {a.tag}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="border-l-2 border-nav-teal pl-6 max-w-prose">
          <p className="text-muted-foreground leading-relaxed text-sm">
            ERP is not about flooding or maximizing distress. It is a gradual, collaborative
            process — designed with your input, paced to build capacity, and informed throughout
            by your values and goals.
          </p>
        </div>

      </div>
    </ToolPageLayout>
  )
}
