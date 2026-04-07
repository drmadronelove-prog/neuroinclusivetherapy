import { ToolPageLayout } from "@/components/tool-page-layout"

export const metadata = {
  title: "Brain Games | Dr. Madrone Love, PsyD",
  description: "Cognitive exercises and skills for psychological resilience.",
}

export default function BrainGamesPage() {
  return (
    <ToolPageLayout title="BRAIN GAMES" color="text-nav-amber">
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p className="text-lg text-foreground">
          Cognitive exercises and skills for psychological resilience.
        </p>
        <p>
          Content coming soon.
        </p>
      </div>
    </ToolPageLayout>
  )
}
