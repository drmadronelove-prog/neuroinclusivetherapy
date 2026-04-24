import { ToolPageLayout } from "@/components/tool-page-layout"
import { DysregulationLog } from "@/components/tools/dysregulation-log"
import { MeltdownWorksheet } from "@/components/tools/meltdown-worksheet"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ASD Skills — Madrone Love, PsyD",
  description: "Interactive tools for autistic adults — a dysregulation log and a fillable meltdown awareness & recovery workbook.",
}

export default function ASDSkillsPage() {
  return (
    <ToolPageLayout title="ASD SKILLS" color="text-[#8A9E96]">
      <DysregulationLog />
      <MeltdownWorksheet />
    </ToolPageLayout>
  )
}
