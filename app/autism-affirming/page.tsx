import { ToolPageLayout } from "@/components/tool-page-layout"

export const metadata = {
  title: "Autism-Affirming Care | Olive Clinical",
  description: "Therapy that honors autistic identity and addresses masking burnout.",
}

export default function AutismAffirmingPage() {
  return (
    <ToolPageLayout title="Autism-Affirming" color="text-plum">
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
