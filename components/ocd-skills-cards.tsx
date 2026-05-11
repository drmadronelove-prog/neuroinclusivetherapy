"use client"

import { ICBTTrueSelfWorksheet } from "@/components/tools/icbt-true-self-worksheet"
import { FeatureCardGrid, type FeatureCard } from "@/components/feature-card-grid"

const CARDS: FeatureCard[] = [
  {
    kind: "modal",
    title: "True Self Worksheet",
    category: "I-CBT · Inference-Based",
    footerLabel: "Open worksheet",
    modalTitle: "True Self Worksheet",
    modalSubtitle:
      "An Inference-Based CBT exercise for distinguishing the OCD self from the true self.",
    content: <ICBTTrueSelfWorksheet />,
  },
]

export function OCDSkillsCards() {
  return <FeatureCardGrid cards={CARDS} modalSize="wide" />
}
