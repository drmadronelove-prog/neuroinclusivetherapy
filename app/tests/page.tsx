import { ToolPageLayout } from "@/components/tool-page-layout"
import { AdhdChecklist } from "@/components/assessments/adhd-checklist"
import { AQ50 } from "@/components/assessments/aq50"
import { VVIQ } from "@/components/assessments/vviq"
import { TAS20 } from "@/components/assessments/tas20"
import { CATQ } from "@/components/assessments/catq"
import { MDS16 } from "@/components/assessments/mds16"
import { GSQ } from "@/components/assessments/gsq"
import { OEQ2 } from "@/components/assessments/oeq2"

export const metadata = {
  title: "Tests | Dr. Madrone Love, PsyD",
  description: "Comprehensive psychological assessments and evaluations by Dr. Madrone Love.",
}

export default function TestsPage() {
  return (
    <ToolPageLayout title="TESTS" color="text-nav-teal">
      <div className="space-y-4">
        <p className="text-lg text-foreground">
          Self-report screening tools. Not diagnostic instruments — bring results to a clinician for interpretation.
        </p>
        <AdhdChecklist />
        <AQ50 />
        <VVIQ />
        <TAS20 />
        <CATQ />
        <MDS16 />
        <GSQ />
        <OEQ2 />
      </div>
    </ToolPageLayout>
  )
}
