import { ToolPageLayout } from "@/components/tool-page-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mindfulness & Meditation — Dr. Madrone Love, PsyD",
  description: "Contemplative resources for neurodivergent-affirming practice. Mindfulness teachings, guided meditations, and Buddhist-informed clinical work.",
}

const practices = [
  {
    title: "Somatic Awareness",
    body: "Learning to track sensation in the body as a real-time signal — not something to override or ignore. Particularly useful for neurodivergent clients navigating interoceptive differences.",
  },
  {
    title: "Insight Meditation (Vipassana)",
    body: "Observing the arising and passing of thoughts, sensations, and emotions without identification. Rooted in the Theravāda tradition, with particular influence from the Insight Meditation Center lineage.",
  },
  {
    title: "Working with Difficult Emotions",
    body: "Using mindfulness to open toward difficult internal states rather than compulsively avoid or amplify them — a foundation for ERP, ACT, and grief work alike.",
  },
  {
    title: "Equanimity Under Uncertainty",
    body: "Developing the capacity to remain present amid unresolvable questions — chronic illness, identity transitions, loss, existential anxiety. Not detachment, but groundedness.",
  },
]

const resources = [
  {
    tag: "ARCHIVE",
    title: "Audiodharma",
    subtitle: "INSIGHT MEDITATION CENTER",
    body: "Free archive of hundreds of guided meditations and dharma talks by Gil Fronsdal and other IMC teachers. Includes the foundational Introduction to Meditation series — an excellent starting point for clients new to practice.",
    linkLabel: "audiodharma.org",
    href: "https://www.audiodharma.org",
    color: "#5BBFB5",
  },
  {
    tag: "CENTER",
    title: "Insight Meditation Center",
    subtitle: "IMC — REDWOOD CITY, CA",
    body: "Gil Fronsdal's home center. Weekly dharma talks, sitting groups, and daylong retreats. Sliding-scale and free offerings available. Particularly welcoming to those new to meditation.",
    linkLabel: "insightmeditationcenter.org",
    href: "https://www.insightmeditationcenter.org",
    color: "#E8487A",
  },
  {
    tag: "RETREAT CENTER",
    title: "Spirit Rock",
    subtitle: "SPIRIT ROCK MEDITATION CENTER — WOODACRE, CA",
    body: "One of the leading Insight meditation centers in the West. Offers daylong, residential, and online retreats. Programs specifically for communities of color, LGBTQ+ practitioners, and those with chronic illness.",
    linkLabel: "spiritrock.org",
    href: "https://www.spiritrock.org",
    color: "#E8A23A",
  },
]

export default function MindfulnessPage() {
  return (
    <ToolPageLayout title="MINDFULNESS" color="text-nav-amber">
      <div className="space-y-14">

        {/* Intro */}
        <div className="space-y-4 max-w-prose">
          <p className="text-lg text-foreground leading-relaxed">
            Contemplative resources for neurodivergent-affirming practice.
            Mindfulness, when adapted for different nervous systems, can support
            regulation, self-compassion, and present-moment grounding.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            My approach draws deeply from Buddhist practice — not as a supplementary
            technique, but as a fundamental orientation. Mindfulness in a clinical
            context is not about achieving a calm mind. It is about developing a
            different relationship to whatever mind is present, including the racing
            mind, the looping mind, the dissociating mind.
          </p>
        </div>

        {/* What this looks like */}
        <div>
          <h2 className="font-[var(--font-display)] text-2xl font-black text-foreground tracking-tight mb-6">
            WHAT THIS LOOKS LIKE IN THERAPY
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {practices.map(p => (
              <div
                key={p.title}
                className="bg-card border border-border border-l-2 border-l-nav-amber rounded-lg p-5"
              >
                <h3 className="font-[var(--font-display)] font-bold text-foreground mb-2 text-sm tracking-wide">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className="border-border/50" />

        {/* Video section */}
        <div>
          <p style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--muted-foreground)",
            marginBottom: "16px",
          }}>
            Guided Meditation &mdash;&mdash; Gil Fronsdal
          </p>

          <div style={{
            width: "100%",
            aspectRatio: "16 / 7",
            borderRadius: "12px",
            overflow: "hidden",
            background: "#000",
            marginBottom: "12px",
          }}>
            <iframe
              src="https://www.youtube.com/embed/gRJeblBqhXI"
              title="Gil Fronsdal guided meditation"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: "100%", height: "100%", border: "none", display: "block" }}
            />
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Gil Fronsdal &mdash; Insight Meditation Center, Berkeley.
            Vipassana and mindfulness teachings in the Theravada tradition.
          </p>
        </div>

        {/* Resource cards */}
        <div>
          <h2 className="font-[var(--font-display)] text-2xl font-black text-foreground tracking-tight mb-6">
            RESOURCES
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {resources.map(r => (
              <div
                key={r.title}
                style={{
                  background: "var(--background)",
                  borderRadius: "16px",
                  border: `2px solid ${r.color}`,
                  padding: "24px 22px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {/* Tag pill */}
                <span style={{
                  display: "inline-block",
                  fontSize: "0.6rem",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: r.color,
                  border: `1.5px solid ${r.color}`,
                  borderRadius: "999px",
                  padding: "3px 10px",
                  width: "fit-content",
                  opacity: 0.85,
                }}>
                  {r.tag}
                </span>

                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.25rem",
                  fontWeight: 900,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.15,
                  color: "var(--foreground)",
                }}>
                  {r.title}
                </h3>

                <p style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--muted-foreground)",
                  marginTop: "-4px",
                }}>
                  {r.subtitle}
                </p>

                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  color: "var(--muted-foreground)",
                  lineHeight: 1.65,
                  flex: 1,
                }}>
                  {r.body}
                </p>

                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    marginTop: "6px",
                    fontSize: "0.62rem",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: r.color,
                    textDecoration: "none",
                    opacity: 0.9,
                  }}
                >
                  {r.linkLabel} <span style={{ fontSize: "0.8rem" }}>↗</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Lineage note */}
        <div className="border-l-2 border-nav-amber pl-6 max-w-prose space-y-3">
          <p className="text-muted-foreground leading-relaxed text-sm">
            My meditation practice is rooted in the Insight Meditation tradition, with
            particular influence from Gil Fronsdal and the Insight Meditation Center
            in Redwood City, CA. I also hold a deep respect for the intersection of
            Buddhist practice and psychological theory — including the ways contemplative
            traditions anticipated many of the insights now central to third-wave CBT
            (ACT, DBT, MBCT).
          </p>
        </div>

      </div>
    </ToolPageLayout>
  )
}
