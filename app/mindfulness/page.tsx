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
      <p className="text-muted-foreground leading-relaxed mb-10 max-w-2xl">
        A breathing circle, a guided meditation, and three places to keep going.
        Tap a card to open it.
      </p>
      <MindfulnessCards />
    </ToolPageLayout>
  )
}
