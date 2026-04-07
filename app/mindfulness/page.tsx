import { ToolPageLayout } from "@/components/tool-page-layout"

export const metadata = {
  title: "Mindfulness | Dr. Madrone Love, PsyD",
  description: "Buddhist-inspired somatic practices for grounding and clarity.",
}

export default function MindfulnessPage() {
  return (
    <ToolPageLayout title="MINDFULNESS" color="text-nav-teal">
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p className="text-lg text-foreground">
          Buddhist-inspired somatic practices for grounding and clarity.
        </p>
        <p>
          Content coming soon.
        </p>
      </div>
    </ToolPageLayout>
  )
}
