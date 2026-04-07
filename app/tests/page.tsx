import { ToolPageLayout } from "@/components/tool-page-layout"

export const metadata = {
  title: "Tests | Dr. Madrone Love, PsyD",
  description: "Comprehensive psychological assessments and evaluations by Dr. Madrone Love.",
}

export default function TestsPage() {
  return (
    <ToolPageLayout title="TESTS" color="text-nav-teal">
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p className="text-lg text-foreground">
          Full assessment to identify treatment goals tailored to your unique life.
        </p>
        <p>
          Content coming soon.
        </p>
      </div>
    </ToolPageLayout>
  )
}
