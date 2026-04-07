import { ToolPageLayout } from "@/components/tool-page-layout"

export const metadata = {
  title: "Individual Therapy | Dr. Madrone Love, PsyD",
  description: "One-on-one sessions to thrive on your own terms.",
}

export default function IndividualTherapyPage() {
  return (
    <ToolPageLayout title="INDIVIDUAL THERAPY" color="text-nav-coral">
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p className="text-lg text-foreground">
          One-on-one sessions to thrive on your own terms.
        </p>
        <p>
          Content coming soon.
        </p>
      </div>
    </ToolPageLayout>
  )
}
