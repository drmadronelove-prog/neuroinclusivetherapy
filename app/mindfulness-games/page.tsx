"use client"

import { useState } from "react"
import { ToolPageLayout } from "@/components/tool-page-layout"
import { BreathingBubble } from "@/components/breathing-bubble"

const mindfulnessResources = [
  {
    title: "Audiodharma",
    subtitle: "INSIGHT MEDITATION CENTER",
    body: "Free archive of hundreds of guided meditations and dharma talks by Gil Fronsdal and other IMC teachers. Includes the foundational Introduction to Meditation series — an excellent starting point for clients new to practice.",
    linkLabel: "audiodharma.org",
    href: "https://www.audiodharma.org",
    color: "#A7B79F",
  },
  {
    title: "Insight Meditation Center",
    subtitle: "IMC — REDWOOD CITY, CA",
    body: "Gil Fronsdal's home center. Weekly dharma talks, sitting groups, and daylong retreats. Sliding-scale and free offerings available. Particularly welcoming to those new to meditation.",
    linkLabel: "insightmeditationcenter.org",
    href: "https://www.insightmeditationcenter.org",
    color: "#7D805F",
  },
  {
    title: "Spirit Rock",
    subtitle: "SPIRIT ROCK MEDITATION CENTER — WOODACRE, CA",
    body: "One of the leading Insight meditation centers in the West. Offers daylong, residential, and online retreats. Programs specifically for communities of color, LGBTQ+ practitioners, and those with chronic illness.",
    linkLabel: "spiritrock.org",
    href: "https://www.spiritrock.org",
    color: "#C17C74",
  },
]

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
]

function MindfulnessTab() {
  return (
    <div className="space-y-14">
      <div className="flex justify-center">
        <BreathingBubble />
      </div>

      <div>
        <p style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.68rem",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--muted-foreground)",
          marginBottom: "16px",
        }}>
          Guided Meditation &mdash;&mdash; Gil Fronsdal
        </p>

        <div style={{
          width: "100%",
          aspectRatio: "16 / 9",
          borderRadius: "12px",
          overflow: "hidden",
          background: "#000",
          marginBottom: "12px",
        }}>
          <iframe
            src="https://www.youtube.com/embed/Ptm0FE-KLyc"
            title="Gil Fronsdal guided meditation"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: "100%", height: "100%", border: "none", display: "block" }}
          />
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          Gil Fronsdal &mdash; Insight Meditation Center, Redwood City.
          Vipassana and mindfulness teachings in the Theravada tradition.
        </p>
      </div>

      <div>
        <h2 className="font-[var(--font-display)] text-2xl font-black text-foreground tracking-tight mb-6">
          RESOURCES
        </h2>
        <style>{`
          .resource-card { transition: transform 0.15s ease, box-shadow 0.15s ease; }
          .resource-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px var(--card-shadow); }
        `}</style>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mindfulnessResources.map(r => (
            <a
              key={r.title}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="resource-card"
              style={{
                "--card-shadow": `${r.color}55`,
                background: `${r.color}30`,
                borderRadius: "16px",
                border: `2px solid ${r.color}`,
                padding: "24px 22px 20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                textDecoration: "none",
                cursor: "pointer",
              } as React.CSSProperties}
            >
              <h3 style={{
                fontFamily: "var(--font-accent)",
                fontSize: "1.6rem",
                fontWeight: 700,
                lineHeight: 1.15,
                color: "var(--foreground)",
              }}>
                {r.title}
              </h3>
              <p style={{
                fontFamily: "var(--font-accent)",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "var(--muted-foreground)",
                marginTop: "-4px",
              }}>
                {r.subtitle}
              </p>
              <p style={{
                fontFamily: "var(--font-accent)",
                fontSize: "1rem",
                color: "var(--muted-foreground)",
                lineHeight: 1.55,
                flex: 1,
              }}>
                {r.body}
              </p>
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                marginTop: "6px",
                fontSize: "0.95rem",
                fontFamily: "var(--font-accent)",
                fontWeight: 600,
                color: r.color,
                opacity: 0.9,
              }}>
                {r.linkLabel} <span style={{ fontSize: "0.9rem" }}>↗</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

function BrainGamesTab() {
  return (
    <div className="space-y-16">
      {games.map((game) => (
        <section key={game.id} className="space-y-4">
          <div className="space-y-2">
            <span className={`inline-block text-xs font-bold tracking-widest uppercase border rounded-full px-3 py-1 ${game.categoryColor}`}>
              {game.category}
            </span>
            <h2 className="font-[var(--font-display)] text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              {game.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-xl">
              {game.description}
            </p>
          </div>
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
  )
}

export default function MindfulnessGamesPage() {
  const [tab, setTab] = useState<"mindfulness" | "games">("mindfulness")

  return (
    <ToolPageLayout title="MINDFULNESS + BRAIN GAMES" color="text-nav-amber">
      {/* Tab switcher */}
      <div className="flex gap-2 mb-10">
        {([["mindfulness", "Mindfulness"], ["games", "Brain Games"]] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "8px 20px",
              borderRadius: "999px",
              border: `2px solid #C17C74`,
              background: tab === key ? "#C17C74" : "transparent",
              color: tab === key ? "#fff" : "#C17C74",
              cursor: "pointer",
              transition: "background 0.18s, color 0.18s",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "mindfulness" ? <MindfulnessTab /> : <BrainGamesTab />}
    </ToolPageLayout>
  )
}
