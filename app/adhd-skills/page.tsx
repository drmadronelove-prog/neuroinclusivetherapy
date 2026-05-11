import { ToolPageLayout } from "@/components/tool-page-layout"
import { ADHDSkillsCards } from "@/components/adhd-skills-cards"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ADHD Skills — Olive Clinical",
}

export default function ADHDSkillsPage() {
  return (
    <ToolPageLayout title="ADHD Skills" color="text-plum">
      <ADHDSkillsCards />
    </ToolPageLayout>
  )
}
