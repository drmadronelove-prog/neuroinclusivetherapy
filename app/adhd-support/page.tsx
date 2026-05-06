import { ToolPageLayout } from "@/components/tool-page-layout"

export const metadata = {
  title: "ADHD Support | Olive Clinical",
  description: "Executive function coaching woven into therapeutic work.",
}

export default function ADHDSupportPage() {
  return (
    <ToolPageLayout title="ADHD SUPPORT" color="text-nav-salmon">
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p className="text-lg text-foreground">
          Executive function coaching woven into therapeutic work.
        </p>
        <p>
          Content coming soon.
        </p>
      </div>
    </ToolPageLayout>
  )
}
