import { ToolPageLayout } from "@/components/tool-page-layout"
import { ICBTTrueSelfWorksheet } from "@/components/tools/icbt-true-self-worksheet"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "OCD Skills — Madrone Love, PsyD",
  description: "Interactive Inference-Based CBT worksheet for uncovering the true self.",
}

export default function OCDSkillsPage() {
  return (
    <ToolPageLayout title="OCD SKILLS" color="text-nav-teal">
      <ICBTTrueSelfWorksheet />
    </ToolPageLayout>
  )
}
