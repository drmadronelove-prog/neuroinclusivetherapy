import { ToolPageLayout } from "@/components/tool-page-layout"
import { BrainGameCard, type BrainGameCardData } from "@/components/brain-game-card"

export const metadata = {
  title: "Brain Games | Olive Clinical",
  description: "Interactive games for building psychological skills — ACT defusion, I-CBT reality-testing, OCD narrative work, and more.",
}

const games: BrainGameCardData[] = [
  {
    id: "thought-emotion-sensation",
    title: "Thought, Emotion, or Sensation?",
    category: "ACT · Defusion",
    href: "/games/thought-emotion-sensation.html",
    rotate: -2,
  },
  {
    id: "spark",
    title: "Spark",
    category: "ACT · Values",
    href: "/games/spark.html",
    rotate: 1.5,
  },
  {
    id: "dont-make-it-worse",
    title: "Don't Make It Worse!",
    category: "DBT · Compassion",
    href: "/games/dont_make_it_worse.html",
    rotate: -1.5,
  },
  {
    id: "fake-news",
    title: "Real News or Fake News?",
    category: "I-CBT · Reality Testing",
    href: "/games/fake-news.html",
    rotate: 1,
  },
  {
    id: "moment-one-incoming",
    title: "Incoming",
    category: "I-CBT · Thought Catching",
    href: "/games/moment-one-incoming.html",
    rotate: -1,
  },
  {
    id: "am-i-a-monster",
    title: "Am I a Monster?",
    category: "OCD · Narrative Work",
    href: "/games/am-i-a-monster.html",
    rotate: 2,
  },
  {
    id: "mindfulness-game",
    title: "What Do I Do With This?",
    category: "ACT · Mindfulness",
    href: "/games/mindfulness-game.html",
    rotate: -0.5,
  },
  {
    id: "regulation-station",
    title: "Regulation Station",
    category: "Neurodivergent · Dysregulation",
    href: "/games/regulation-station.html",
    rotate: 1.25,
  },
]

export default function BrainGamesPage() {
  return (
    <ToolPageLayout title="Brain Games" color="text-gold">
      <p className="text-muted-foreground leading-relaxed mb-10 max-w-2xl">
        Eight interactive games for practicing psychological skills — ACT defusion,
        I-CBT reality-testing, OCD narrative work, and emotion regulation. Tap a card to play.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
        {games.map((game, i) => (
          <BrainGameCard key={game.id} game={game} index={i} />
        ))}
      </div>
    </ToolPageLayout>
  )
}
