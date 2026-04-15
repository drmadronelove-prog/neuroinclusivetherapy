import { ToolPageLayout } from "@/components/tool-page-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mindfulness & Meditation — Dr. Madrone Love, PsyD",
  description:
    "Contemplative resources for neurodivergent-affirming practice. Mindfulness, when adapted for different nervous systems, can support regulation, self-compassion, and present-moment grounding.",
}

const cards = [
  {
    tag: "ARCHIVE",
    heading: "Audiodharma",
    subtitle: "INSIGHT MEDITATION CENTER",
    body: "Free archive of hundreds of guided meditations and dharma talks by Gil Fronsdal and other IMC teachers. Includes the foundational Introduction to Meditation series — an excellent starting point for clients new to practice.",
    linkLabel: "audiodharma.org",
    linkHref: "https://www.audiodharma.org",
    borderColor: "#5BBFB5",
  },
  {
    tag: "CENTER",
    heading: "Insight Meditation Center",
    subtitle: "IMC — REDWOOD CITY, CA",
    body: "Gil Fronsdal's home center. Weekly dharma talks, sitting groups, and daylong retreats. Sliding-scale and free offerings available. Particularly welcoming to those new to meditation.",
    linkLabel: "insightmeditationcenter.org",
    linkHref: "https://www.insightmeditationcenter.org",
    borderColor: "#E8487A",
  },
  {
    tag: "RETREAT CENTER",
    heading: "Spirit Rock",
    subtitle: "SPIRIT ROCK MEDITATION CENTER — WOODACRE, CA",
    body: "One of the leading Insight meditation centers in the West. Offers daylong, residential, and online retreats. Programs specifically for communities of color, LGBTQ+ practitioners, and those with chronic illness.",
    linkLabel: "spiritrock.org",
    linkHref: "https://www.spiritrock.org",
    borderColor: "#E8A23A",
  },
]

export default function MindfulnessPage() {
  return (
    <ToolPageLayout color="text-nav-amber">
      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>

        {/* Page Heading */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: "#1C1C1A",
          }}
        >
          Mindfulness &amp; Meditation
        </h1>

        {/* Intro blurb */}
        <p
          style={{
            fontSize: "17px",
            lineHeight: 1.65,
            color: "#1C1C1A",
            maxWidth: "660px",
          }}
        >
          Contemplative resources for neurodivergent-affirming practice.
          Mindfulness, when adapted for different nervous systems, can support
          regulation, self-compassion, and present-moment grounding.
        </p>

        {/* Divider */}
        <hr style={{ border: "none", borderTop: "1px solid rgba(28,28,26,0.18)", margin: 0 }} />

        {/* Subsection label */}
        <p
          style={{
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(28,28,26,0.5)",
            margin: 0,
          }}
        >
          Guided Meditation &mdash; Gil Fronsdal
        </p>

        {/* YouTube embed + caption */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "430px",
              borderRadius: "12px",
              overflow: "hidden",
              background: "#000",
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/gRJeblBqhXI"
              title="Gil Fronsdal Guided Meditation"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          </div>
          <p
            style={{
              fontSize: "13px",
              color: "rgba(28,28,26,0.5)",
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            Gil Fronsdal &mdash; Insight Meditation Center, Berkeley. Vipassana
            and mindfulness teachings in the Theravada tradition.
          </p>
        </div>

        {/* Card grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            gap: "20px",
          }}
          className="mindfulness-card-grid"
        >
          {cards.map((card) => (
            <div
              key={card.heading}
              style={{
                backgroundColor: "#F0EDE4",
                border: `2px solid ${card.borderColor}`,
                borderRadius: "16px",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              {/* Tag pill */}
              <div>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    border: "1px solid rgba(28,28,26,0.3)",
                    borderRadius: "999px",
                    padding: "3px 11px",
                    color: "rgba(28,28,26,0.65)",
                  }}
                >
                  {card.tag}
                </span>
              </div>

              {/* Heading */}
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "22px",
                  color: "#1C1C1A",
                  lineHeight: 1.05,
                  margin: 0,
                }}
              >
                {card.heading}
              </h3>

              {/* Subtitle */}
              <p
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(28,28,26,0.5)",
                  margin: 0,
                }}
              >
                {card.subtitle}
              </p>

              {/* Body */}
              <p
                style={{
                  fontSize: "14px",
                  color: "#1C1C1A",
                  lineHeight: 1.65,
                  margin: 0,
                  flexGrow: 1,
                }}
              >
                {card.body}
              </p>

              {/* External link */}
              <a
                href={card.linkHref}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#1C1C1A",
                  textDecoration: "none",
                  marginTop: "auto",
                }}
              >
                {card.linkLabel} ↗
              </a>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (min-width: 640px) {
          .mindfulness-card-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 1024px) {
          .mindfulness-card-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </ToolPageLayout>
  )
}
