import { ToolPageLayout } from "@/components/tool-page-layout"
import { ASDSkillsCards } from "@/components/asd-skills-cards"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ASD Skills — Olive Clinical",
  description: "Interactive tools for autistic adults — a dysregulation log and a fillable meltdown awareness & recovery workbook.",
}

export default function ASDSkillsPage() {
  return (
    <ToolPageLayout title="ASD Skills" color="text-glass">
      <ASDSkillsCards />
    </ToolPageLayout>
  )
}
