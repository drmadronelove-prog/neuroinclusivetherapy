import { ToolPageLayout } from "@/components/tool-page-layout"

export const metadata = {
  title: "Blog | Dr. Madrone Love, PsyD",
  description: "Thoughts on neurodivergent-affirming therapy, mental wellness, and living differently.",
}

export default function BlogPage() {
  return (
    <ToolPageLayout title="BLOG" color="text-nav-teal">
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p className="text-lg text-foreground">
          Thoughts on neurodivergent-affirming therapy, mental wellness, and living differently.
        </p>
        <p>
          Posts coming soon.
        </p>
      </div>
    </ToolPageLayout>
  )
}
