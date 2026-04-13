import { ToolPageLayout } from "@/components/tool-page-layout"

export const metadata = {
  title: "Friends | Dr. Madrone Love, PsyD",
  description: "Resources, collaborators, and communities we love.",
}

export default function FriendsPage() {
  return (
    <ToolPageLayout title="FRIENDS" color="text-nav-amber">
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p className="text-lg text-foreground">
          Resources, collaborators, and communities we love.
        </p>
        <p>
          Content coming soon.
        </p>
      </div>
    </ToolPageLayout>
  )
}
