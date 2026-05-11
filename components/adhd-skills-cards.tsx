"use client"

import { DeepWorkPlanner } from "@/components/tools/deep-work-planner"
import { FeatureCardGrid, type FeatureCard } from "@/components/feature-card-grid"

const CARDS: FeatureCard[] = [
  {
    kind: "modal",
    title: "Deep Work Planner",
    category: "Goals · Cal Newport · ACT",
    footerLabel: "Open planner",
    modalTitle: "Deep Work Planner",
    modalSubtitle:
      "Long-term goals, weekly goals, and values + activities. Saved locally.",
    content: <DeepWorkPlanner />,
  },
  {
    kind: "link",
    title: "Body Doubling — 2h Pomodoro",
    category: "External · YouTube",
    footerLabel: "Watch",
    href: "https://youtu.be/7izHQ7Ojt-s",
  },
  {
    kind: "link",
    title: "60-min Visual Time Timer",
    category: "External · YouTube",
    footerLabel: "Watch",
    href: "https://www.youtube.com/watch?v=HSVqiA3sRdU",
  },
]

export function ADHDSkillsCards() {
  return <FeatureCardGrid cards={CARDS} modalSize="wide" />
}
