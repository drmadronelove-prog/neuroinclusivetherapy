import { ToolPageLayout } from "@/components/tool-page-layout"

export const metadata = {
  title: "Brain Games | Madrone Love, PsyD",
  description: "Interactive games for building psychological skills — ACT defusion, I-CBT reality-testing, OCD narrative work, and more.",
}

const games = [
  {
    id: "thought-emotion-sensation",
    title: "Thought, Emotion, or Sensation?",
    category: "ACT · Defusion",
    categoryColor: "text-nav-teal border-nav-teal",
    description:
      "Practice the foundational ACT skill of distinguishing between thoughts, emotions, and somatic sensations — the first step toward defusion and mindful awareness.",
    src: "/games/thought-emotion-sensation.html",
    height: 760,
  },
  {
    id: "spark",
    title: "Spark",
    category: "ACT · Values",
    categoryColor: "text-nav-amber border-nav-amber",
    description:
      "Your light is yours. Practice the skill of protecting it — moving toward what matters and learning when to say no. That's it. That's the whole game.",
    src: "/games/spark.html",
    height: 820,
  },
  {
    id: "dont-make-it-worse",
    title: "Don't Make It Worse!",
    category: "DBT · Compassion",
    categoryColor: "text-nav-teal border-nav-teal",
    description:
      "Someone is struggling. Your job: don't pile on. Drag comforting responses toward them and avoid the ones that make it worse. Three kind things and they feel better — three harmful ones and you made it worse.",
    src: "/games/dont_make_it_worse.html",
    height: 820,
  },
  {
    id: "fake-news",
    title: "Real News or Fake News?",
    category: "I-CBT · Reality Testing",
    categoryColor: "text-nav-coral border-nav-coral",
    description:
      "Train your inner investigative journalist. Practice the I-CBT skill of distinguishing OCD-generated narratives from evidence-based reality — and learn to recognize when your mind is filling airtime.",
    src: "/games/fake-news.html",
    height: 700,
  },
  {
    id: "moment-one-incoming",
    title: "Incoming",
    category: "I-CBT · Thought Catching",
    categoryColor: "text-nav-amber border-nav-amber",
    description:
      "Practice catching thoughts at moment one — before they become stories. Ten thoughts are about to arrive. Your only job: recognize each one as a thought rather than a fact, and don't let Tucker get the airtime.",
    src: "/games/moment-one-incoming.html",
    height: 700,
  },
  {
    id: "am-i-a-monster",
    title: "Am I a Monster?",
    category: "OCD · Narrative Work",
    categoryColor: "text-nav-salmon border-nav-salmon",
    description:
      "A guided narrative reconstruction exercise for the feared self in OCD. Trace the \"Am I a bad person?\" loop back to its origin — not to argue with it, but to find out who wrote that story, and whether the evidence actually holds up.",
    src: "/games/am-i-a-monster.html",
    height: 820,
  },
  {
    id: "mindfulness-game",
    title: "What Do I Do With This?",
    category: "ACT · Mindfulness",
    categoryColor: "text-nav-teal border-nav-teal",
    description:
      "A skill-matching game for working with difficult emotions, thoughts, and sensations. Match what's arising to evidence-based ACT, DBT, and mindfulness responses — and build an intuition for which tools actually fit.",
    src: "/games/mindfulness-game.html",
    height: 820,
  },
  {
    id: "regulation-station",
    title: "Regulation Station",
    category: "Neurodivergent · Dysregulation",
    categoryColor: "text-nav-coral border-nav-coral",
    description:
      "An interactive tool for tracking and understanding emotional dysregulation episodes — identifying patterns, triggers, and building your personal regulation toolkit. Four real-life scenarios, each with visible warning signs and a live nervous system meter.",
    src: "/games/regulation-station.html",
    height: 700,
  },
  {
    id: "spark-dont-make-it-worse",
    title: "Spark & Don't Make It Worse",
    category: "DBT · Distress Tolerance",
    categoryColor: "text-nav-teal border-nav-teal",
    description:
      "When distress arrives, the first rule isn't fix it — it's don't add fuel. Practice the DBT distress tolerance skill of recognizing which responses escalate activation and which ones let the spark settle. Four real situations, sixteen choices.",
    src: "/games/spark-dont-make-it-worse.html",
    height: 700,
  },
]

export default function BrainGamesPage() {
  return (
    <ToolPageLayout title="BRAIN GAMES" color="text-nav-amber">
      <div className="space-y-16">
        {games.map((game) => (
          <section key={game.id} className="space-y-4">
            {/* Card header */}
            <div className="space-y-2">
              <span
                className={`inline-block text-xs font-bold tracking-widest uppercase border rounded-full px-3 py-1 ${game.categoryColor}`}
              >
                {game.category}
              </span>
              <h2 className="font-[var(--font-display)] text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                {game.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-xl">
                {game.description}
              </p>
            </div>

            {/* Game iframe */}
            <div
              className="w-full rounded-xl overflow-hidden border border-border shadow-sm bg-card"
              style={{ height: game.height }}
            >
              <iframe
                src={game.src}
                title={game.title}
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </section>
        ))}
      </div>
    </ToolPageLayout>
  )
}
