"use client"

import { DysregulationLog } from "@/components/tools/dysregulation-log"
import { MeltdownWorksheet } from "@/components/tools/meltdown-worksheet"
import { FeatureCardGrid, type FeatureCard } from "@/components/feature-card-grid"

const CARDS: FeatureCard[] = [
  {
    kind: "modal",
    title: "Dysregulation Log",
    category: "Pattern tracking",
    footerLabel: "Open log",
    modalTitle: "Dysregulation Log",
    modalSubtitle: "Triggers, body signals, what helps. Saved locally.",
    content: <DysregulationLog />,
  },
  {
    kind: "modal",
    title: "Meltdown Workbook",
    category: "Awareness & recovery",
    footerLabel: "Open workbook",
    modalTitle: "Meltdown Awareness & Recovery Workbook",
    modalSubtitle: "A personal tracking workbook. Saved locally.",
    content: <MeltdownWorksheet />,
  },
]

export function ASDSkillsCards() {
  return <FeatureCardGrid cards={CARDS} modalSize="wide" />
}
