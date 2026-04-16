import { ToolPageLayout } from "@/components/tool-page-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Grief + Trauma Recovery — Madrone Love, PsyD",
}

export default function GriefTraumaPage() {
  return (
    <ToolPageLayout title="GRIEF + TRAUMA" color="text-[#B89878]">
      <div className="max-w-prose space-y-6">
        <p className="text-lg text-foreground leading-relaxed">
          Content coming soon.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          This section is under development. Check back soon for resources on
          grief, loss, and trauma recovery.
        </p>
      </div>
    </ToolPageLayout>
  )
}
