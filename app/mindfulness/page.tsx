import { ToolPageLayout } from "@/components/tool-page-layout"
import { BreathingBubble } from "@/components/breathing-bubble"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mindfulness & Meditation — Dr. Madrone Love, PsyD",
  description: "Contemplative resources for neurodivergent-affirming practice. Mindfulness teachings, guided meditations, and Buddhist-informed clinical work.",
}

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

      </div>
    </ToolPageLayout>
  )
}
