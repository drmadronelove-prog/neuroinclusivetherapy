import { ToolPageLayout } from "@/components/tool-page-layout"
import { TestsCards } from "@/components/tests-cards"

export const metadata = {
  title: "Tests | Olive Clinical",
  description: "Self-report screening tools for ADHD, autism, alexithymia, mental imagery, sensory processing, camouflaging, and misophonia.",
}

export default function TestsPage() {
  return (
    <ToolPageLayout title="Tests" color="text-slate">
      <TestsCards />
    </ToolPageLayout>
  )
}
