import { ToolPageLayout } from "@/components/tool-page-layout"
import { OCDSkillsCards } from "@/components/ocd-skills-cards"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "OCD Skills — Olive Clinical",
  description: "Interactive Inference-Based CBT worksheet for uncovering the true self.",
}

export default function OCDSkillsPage() {
  return (
    <ToolPageLayout title="OCD Skills" color="text-slate">
      <OCDSkillsCards />
    </ToolPageLayout>
  )
}
