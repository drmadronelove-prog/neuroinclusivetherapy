import { ToolPageLayout } from "@/components/tool-page-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mindfulness — Dr. Madrone Love, PsyD",
  description: "Buddhist-informed contemplative practice woven into psychotherapy. Presence as a clinical tool.",
}

const practices = [
  {
    title: "Somatic Awareness",
    body: "Learning to track sensation in the body as a real-time signal — not something to override or ignore. Particularly useful for neurodivergent clients navigating interoceptive differences.",
    color: "border-nav-amber",
  },
  {
    title: "Insight Meditation (Vipassana)",
    body: "Observing the arising and passing of thoughts, sensations, and emotions without identification. Rooted in the Theravāda tradition, with particular influence from the Insight Meditation Center lineage.",
    color: "border-nav-amber",
  },
  {
    title: "Working with Difficult Emotions",
    body: "Using mindfulness to open toward difficult internal states rather than compulsively avoid or amplify them — a foundation for ERP, ACT, and grief work alike.",
    color: "border-nav-amber",
  },
  {
    title: "Equanimity Under Uncertainty",
    body: "Developing the capacity to remain present amid unresolvable questions — chronic illness, identity transitions, loss, existential anxiety. Not detachment, but groundedness.",
    color: "border-nav-amber",
  },
]

export default function MindfulnessPage() {
  return (
    <ToolPageLayout title="MINDFULNESS" color="text-nav-amber">
      <div className="space-y-14">

        {/* Intro */}
        <div className="space-y-5 max-w-prose">
          <p className="text-lg text-foreground leading-relaxed">
            My approach to psychotherapy draws deeply from my Buddhist practice.
            Not as a supplementary technique, but as a fundamental orientation —
            full presence with what is actually happening, without the overlay of
            what should be happening.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Mindfulness in a clinical context is not about achieving a calm mind.
            It is about developing a different relationship to whatever mind is present —
            including the racing mind, the looping mind, the dissociating mind.
            This makes it particularly relevant for neurodivergent clients whose
            inner experience moves fast, intensely, or non-linearly.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Contemplative practice is woven into therapy rather than taught as a
            separate curriculum. This might look like pausing to notice what is
            arising in your body during a conversation, working with breath as an
            anchor during high-activation moments, or bringing curiosity to a
            pattern you have been at war with.
          </p>
        </div>

        {/* Practices */}
        <div>
          <h2 className="font-[var(--font-display)] text-2xl font-black text-foreground tracking-tight mb-6">
            WHAT THIS LOOKS LIKE
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {practices.map(p => (
              <div
                key={p.title}
                className={`bg-card border border-border border-l-2 ${p.color} rounded-lg p-5`}
              >
                <h3 className="font-[var(--font-display)] font-bold text-foreground mb-2 text-sm tracking-wide">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Lineage note */}
        <div className="border-l-2 border-nav-amber pl-6 max-w-prose space-y-3">
          <p className="text-muted-foreground leading-relaxed text-sm">
            My meditation practice is rooted in the Insight Meditation tradition, with
            particular influence from Gil Fronsdal and the Insight Meditation Center
            in Redwood City, CA. IMC offers a free archive of guided meditations and
            dharma talks — including foundational series on breath meditation and
            Vipassana — at insightmeditationcenter.org.
          </p>
          <p className="text-muted-foreground leading-relaxed text-sm">
            I also hold a deep respect for the intersection of Buddhist practice and
            psychological theory — including the ways contemplative traditions anticipated
            many of the insights now central to third-wave CBT (ACT, DBT, MBCT).
          </p>
        </div>

      </div>
    </ToolPageLayout>
  )
}
