"use client"

import { FeatureCardGrid, type FeatureCard } from "@/components/feature-card-grid"
import { BreathingBubble } from "@/components/breathing-bubble"

const CARDS: FeatureCard[] = [
  {
    kind: "modal",
    title: "Breathing Circle",
    category: "Box Breath · 4·4·4·4",
    footerLabel: "Begin",
    modalTitle: "Breathing Circle",
    modalSubtitle: "Four-second inhale, hold, exhale, hold.",
    content: (
      <div className="flex justify-center pt-2">
        <BreathingBubble />
      </div>
    ),
  },
  {
    kind: "modal",
    title: "Guided Meditation",
    category: "Gil Fronsdal · IMC",
    footerLabel: "Watch",
    modalTitle: "Guided Meditation",
    modalSubtitle: "Gil Fronsdal · Insight Meditation Center, Redwood City.",
    content: (
      <div
        style={{
          width: "100%",
          aspectRatio: "16 / 9",
          overflow: "hidden",
          background: "var(--ink)",
          border: "1px solid rgba(11,37,69,0.18)",
        }}
      >
        <iframe
          src="https://www.youtube.com/embed/Ptm0FE-KLyc"
          title="Gil Fronsdal guided meditation"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: "100%", height: "100%", border: "none", display: "block" }}
        />
      </div>
    ),
  },
  {
    kind: "link",
    title: "Audiodharma",
    category: "Free dharma archive",
    footerLabel: "Visit",
    href: "https://www.audiodharma.org",
  },
  {
    kind: "link",
    title: "Insight Meditation Center",
    category: "IMC · Redwood City, CA",
    footerLabel: "Visit",
    href: "https://www.insightmeditationcenter.org",
  },
  {
    kind: "link",
    title: "Spirit Rock",
    category: "Spirit Rock · Woodacre, CA",
    footerLabel: "Visit",
    href: "https://www.spiritrock.org",
  },
]

export function MindfulnessCards() {
  return <FeatureCardGrid cards={CARDS} />
}
