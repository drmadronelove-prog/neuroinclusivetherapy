import { ToolPageLayout } from "@/components/tool-page-layout"

export const metadata = {
  title: "Autism-Affirming Care | Dr. Madrone Love, PsyD",
  description: "Therapy that honors autistic identity and addresses masking burnout.",
}

export default function AutismAffirmingPage() {
  return (
    <ToolPageLayout title="AUTISM-AFFIRMING" color="text-nav-coral">
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p className="text-lg text-foreground">
          Therapy that honors autistic identity and addresses masking burnout.
        </p>
        <p>
          Content coming soon.
        </p>
      </div>
    </ToolPageLayout>
  )
}
