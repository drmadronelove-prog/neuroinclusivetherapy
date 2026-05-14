"use client"

import { DeepWorkPlanner } from "@/components/tools/deep-work-planner"
import { AdhdChecklist } from "@/components/assessments/adhd-checklist"
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
    kind: "modal",
    title: "ADHD Symptom Checklist",
    category: "DSM-5 + community",
    footerLabel: "Take checklist",
    modalTitle: "ADHD Symptom Checklist",
    modalSubtitle: "DSM-5 criteria · community-reported symptoms.",
    content: <AdhdChecklist />,
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
  {
    kind: "link",
    title: "Time Is a Rainbow",
    category: "Blog · ADHD",
    footerLabel: "Read essay",
    href: "/blog/time-is-a-rainbow",
  },
  {
    kind: "link",
    title: "Loving Across the Wiring",
    category: "Blog · ADHD",
    footerLabel: "Read essay",
    href: "/blog/loving-across-the-wiring",
  },
  {
    kind: "link",
    title: "Windows of Interest",
    category: "Blog · Neurodivergence",
    footerLabel: "Read essay",
    href: "/blog/windows-of-interest",
  },
]

export function ADHDSkillsCards() {
  return <FeatureCardGrid cards={CARDS} modalSize="wide" />
}
