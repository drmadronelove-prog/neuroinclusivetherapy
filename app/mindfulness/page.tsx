import { ToolPageLayout } from "@/components/tool-page-layout"
import { BreathingBubble } from "@/components/breathing-bubble"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mindfulness & Meditation — Olive Clinical",
  description: "Contemplative resources for neurodivergent-affirming practice. Mindfulness teachings, guided meditations, and Buddhist-informed clinical work.",
}

const resources = [
  {
    title: "Audiodharma",
    subtitle: "Insight Meditation Center",
    body: "Free archive of hundreds of guided meditations and dharma talks by Gil Fronsdal and other IMC teachers. Includes the foundational Introduction to Meditation series — an excellent starting point for clients new to practice.",
    linkLabel: "audiodharma.org",
    href: "https://www.audiodharma.org",
    color: "var(--glass)",
  },
  {
    title: "Insight Meditation Center",
    subtitle: "IMC — Redwood City, CA",
    body: "Gil Fronsdal's home center. Weekly dharma talks, sitting groups, and daylong retreats. Sliding-scale and free offerings available. Particularly welcoming to those new to meditation.",
    linkLabel: "insightmeditationcenter.org",
    href: "https://www.insightmeditationcenter.org",
    color: "var(--slate)",
  },
  {
    title: "Spirit Rock",
    subtitle: "Spirit Rock Meditation Center — Woodacre, CA",
    body: "One of the leading Insight meditation centers in the West. Offers daylong, residential, and online retreats. Programs specifically for communities of color, LGBTQ+ practitioners, and those with chronic illness.",
    linkLabel: "spiritrock.org",
    href: "https://www.spiritrock.org",
    color: "var(--plum)",
  },
]

export default function MindfulnessPage() {
  return (
    <ToolPageLayout title="Mindfulness" color="text-ink">
      <div className="space-y-14">

        {/* Breathing bubble */}
        <div className="flex justify-center">
          <BreathingBubble />
        </div>

        {/* Video section */}
        <div>
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            fontWeight: 500,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--slate)",
            marginBottom: "16px",
          }}>
            Guided Meditation — Gil Fronsdal
          </p>

          <div style={{
            width: "100%",
            aspectRatio: "16 / 9",
            overflow: "hidden",
            background: "var(--ink)",
            marginBottom: "12px",
            border: "1px solid rgba(11,37,69,0.18)",
          }}>
            <iframe
              src="https://www.youtube.com/embed/Ptm0FE-KLyc"
              title="Gil Fronsdal guided meditation"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: "100%", height: "100%", border: "none", display: "block" }}
            />
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Gil Fronsdal — Insight Meditation Center, Redwood City.
            Vipassana and mindfulness teachings in the Theravada tradition.
          </p>
        </div>

        {/* Resource cards */}
        <div>
          <h2
            className="text-2xl text-foreground mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
            }}
          >
            Resources
          </h2>
          <style>{`
            .resource-card { transition: transform 0.15s ease, box-shadow 0.15s ease; }
            .resource-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(11,37,69,0.18); }
          `}</style>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {resources.map(r => (
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

      </div>
    </ToolPageLayout>
  )
}
