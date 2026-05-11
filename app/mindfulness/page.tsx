import { ToolPageLayout } from "@/components/tool-page-layout"
import { MindfulnessCards } from "@/components/mindfulness-cards"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mindfulness & Meditation — Olive Clinical",
  description: "Contemplative resources for neurodivergent-affirming practice. Mindfulness teachings, guided meditations, and Buddhist-informed clinical work.",
}

export default function MindfulnessPage() {
  return (
    <ToolPageLayout title="Mindfulness" color="text-ink">
      <MindfulnessCards />
    </ToolPageLayout>
  )
}
