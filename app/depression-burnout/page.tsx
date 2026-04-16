import { ToolPageLayout } from "@/components/tool-page-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Depression + Burnout Recovery — Madrone Love, PsyD",
}

export default function DepressionBurnoutPage() {
  return (
    <ToolPageLayout title="DEPRESSION + BURNOUT" color="text-[#7D805F]">
      <div className="max-w-prose space-y-6">
        <p className="text-lg text-foreground leading-relaxed">
          Content coming soon.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          This section is under development. Check back soon for resources on
          depression, burnout, and recovery.
        </p>
      </div>
    </ToolPageLayout>
  )
}
