import { ToolPageLayout } from "@/components/tool-page-layout"
import { DeepWorkPlanner } from "@/components/tools/deep-work-planner"
import { DysregulationLog } from "@/components/tools/dysregulation-log"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ADHD Skills — Madrone Love, PsyD",
}

export default function ADHDSkillsPage() {
  return (
    <ToolPageLayout title="ADHD SKILLS" color="text-nav-salmon">
      <p className="text-muted-foreground mb-12 leading-relaxed max-w-prose">
        Interactive tools for ADHD management — goal planning grounded in Cal Newport&apos;s Deep Work framework
        and ACT, plus a pattern tracker for dysregulation episodes. All data is saved locally to your device.
      </p>
      <DeepWorkPlanner />
      <DysregulationLog />
    </ToolPageLayout>
  )
}
