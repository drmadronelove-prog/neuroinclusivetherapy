import { ToolPageLayout } from "@/components/tool-page-layout"
import { BreathingBubble } from "@/components/breathing-bubble"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mindfulness & Meditation — Dr. Madrone Love, PsyD",
  description: "Contemplative resources for neurodivergent-affirming practice. Mindfulness teachings, guided meditations, and Buddhist-informed clinical work.",
}

const resources = [
  {
    title: "Audiodharma",
    subtitle: "INSIGHT MEDITATION CENTER",
    body: "Free archive of hundreds of guided meditations and dharma talks by Gil Fronsdal and other IMC teachers. Includes the foundational Introduction to Meditation series — an excellent starting point for clients new to practice.",
    linkLabel: "audiodharma.org",
    href: "https://www.audiodharma.org",
    color: "#5BA89E",
  },
  {
    title: "Insight Meditation Center",
    subtitle: "IMC — REDWOOD CITY, CA",
    body: "Gil Fronsdal's home center. Weekly dharma talks, sitting groups, and daylong retreats. Sliding-scale and free offerings available. Particularly welcoming to those new to meditation.",
    linkLabel: "insightmeditationcenter.org",
    href: "https://www.insightmeditationcenter.org",
    color: "#7890A8",
  },
  {
    title: "Spirit Rock",
    subtitle: "SPIRIT ROCK MEDITATION CENTER — WOODACRE, CA",
    body: "One of the leading Insight meditation centers in the West. Offers daylong, residential, and online retreats. Programs specifically for communities of color, LGBTQ+ practitioners, and those with chronic illness.",
    linkLabel: "spiritrock.org",
    href: "https://www.spiritrock.org",
    color: "#C89050",
  },
]

export default function MindfulnessPage() {
  return (
    <ToolPageLayout title="MINDFULNESS" color="text-nav-amber">
      <div className="space-y-14">

        {/* Breathing bubble */}
        <div>
          <BreathingBubble />
        </div>

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
              src="https://www.youtube.com/embed/Ptm0FE-KLyc"
              title="Gil Fronsdal guided meditation"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: "100%", height: "100%", border: "none", display: "block" }}
            />
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Gil Fronsdal &mdash; Insight Meditation Center, Redwood City.
            Vipassana and mindfulness teachings in the Theravada tradition.
          </p>
        </div>

        {/* Resource cards */}
        <div>
          <h2 className="font-[var(--font-display)] text-2xl font-black text-foreground tracking-tight mb-6">
            RESOURCES
          </h2>
          <style>{`
            .resource-card { transition: transform 0.15s ease, box-shadow 0.15s ease; }
            .resource-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px var(--card-shadow); }
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
    </ToolPageLayout>
  )
}
