"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BreathingBubble } from "@/components/breathing-bubble"

const PAPER_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E\")"

type Card =
  | {
      kind: "breathing"
      title: string
      category: string
      borderColor: string
      rotate: number
    }
  | {
      kind: "video"
      title: string
      category: string
      borderColor: string
      rotate: number
      embedSrc: string
      sourceLabel: string
    }
  | {
      kind: "link"
      title: string
      category: string
      borderColor: string
      rotate: number
      href: string
      linkLabel: string
    }

const CARDS: Card[] = [
  {
    kind: "breathing",
    title: "Breathing Circle",
    category: "Box Breath · 4·4·4·4",
    borderColor: "#9fb3b0",
    rotate: -1.5,
  },
  {
    kind: "video",
    title: "Guided Meditation",
    category: "Gil Fronsdal · IMC",
    borderColor: "#5b6e88",
    rotate: 1,
    embedSrc: "https://www.youtube.com/embed/Ptm0FE-KLyc",
    sourceLabel: "Insight Meditation Center · Redwood City",
  },
  {
    kind: "link",
    title: "Audiodharma",
    category: "Free dharma archive",
    borderColor: "#7a4f6e",
    rotate: -0.75,
    href: "https://www.audiodharma.org",
    linkLabel: "audiodharma.org",
  },
  {
    kind: "link",
    title: "Insight Meditation Center",
    category: "IMC · Redwood City, CA",
    borderColor: "#8c9bb0",
    rotate: 1.5,
    href: "https://www.insightmeditationcenter.org",
    linkLabel: "insightmeditationcenter.org",
  },
  {
    kind: "link",
    title: "Spirit Rock",
    category: "Spirit Rock · Woodacre, CA",
    borderColor: "#c4877e",
    rotate: -1,
    href: "https://www.spiritrock.org",
    linkLabel: "spiritrock.org",
  },
]

export function MindfulnessCards() {
  const [active, setActive] = useState<Card | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
        {CARDS.map((card, i) => (
          <MindfulnessCard
            key={card.title}
            card={card}
            index={i}
            onOpen={() => setActive(card)}
          />
        ))}
      </div>

      <AnimatePresence>
        {active && (active.kind === "breathing" || active.kind === "video") && (
          <Modal onClose={() => setActive(null)}>
            {active.kind === "breathing" && (
              <div className="flex flex-col items-center gap-3">
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    fontWeight: 500,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--slate)",
                  }}
                >
                  Breathing Circle
                </p>
                <BreathingBubble />
              </div>
            )}
            {active.kind === "video" && (
              <div className="w-full">
                <p
                  className="mb-3"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    fontWeight: 500,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--slate)",
                  }}
                >
                  {active.sourceLabel}
                </p>
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "16 / 9",
                    overflow: "hidden",
                    background: "var(--ink)",
                    border: "1px solid rgba(11,37,69,0.18)",
                  }}
                >
                  <iframe
                    src={active.embedSrc}
                    title={active.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                  />
                </div>
              </div>
            )}
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}

function MindfulnessCard({
  card,
  index,
  onOpen,
}: {
  card: Card
  index: number
  onOpen: () => void
}) {
  const [hovered, setHovered] = useState(false)

  const content = (
    <motion.div
      animate={{
        y: hovered ? -6 : 0,
        scale: hovered ? 1.04 : 1,
        rotate: hovered ? 0 : card.rotate,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full"
      style={{
        aspectRatio: "17 / 20",
        backgroundColor: "rgba(244, 243, 240, 0.94)",
        backgroundImage: `${PAPER_BG}, linear-gradient(160deg, ${card.borderColor}22 0%, ${card.borderColor}10 100%)`,
        backgroundSize: "200px 200px, cover",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: `1.5px solid ${card.borderColor}`,
        borderRadius: "12px",
        boxShadow: hovered
          ? `0 14px 32px rgba(11,37,69,0.18), 0 0 0 1px ${card.borderColor}55`
          : `0 3px 10px rgba(11,37,69,0.08), 0 1px 3px rgba(11,37,69,0.05)`,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.35) 0%, transparent 55%)",
          borderRadius: "11px",
          pointerEvents: "none",
        }}
      />
      <div className="relative h-full flex flex-col items-center justify-between gap-2 p-4 sm:p-5">
        <div className="w-full flex items-center justify-between">
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              fontWeight: 500,
              letterSpacing: "0.14em",
              color: card.borderColor,
              opacity: 0.75,
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.5rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: card.borderColor,
              opacity: 0.65,
              textAlign: "right",
              lineHeight: 1.3,
              maxWidth: "70%",
            }}
          >
            {card.category}
          </span>
        </div>

        <h3
          className="text-center"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)",
            fontWeight: 500,
            color: "var(--ink)",
            lineHeight: 1.15,
            letterSpacing: "-0.012em",
            padding: "0 4px",
          }}
        >
          {card.title}
        </h3>

        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.55rem",
            fontWeight: 500,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: card.borderColor,
            opacity: hovered ? 1 : 0.55,
            transition: "opacity 0.2s",
          }}
        >
          {card.kind === "link" ? "Open ↗" : "Open →"}
        </span>
      </div>
    </motion.div>
  )

  if (card.kind === "link") {
    return (
      <a href={card.href} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    )
  }
  return (
    <button
      type="button"
      onClick={onOpen}
      className="block w-full text-left appearance-none bg-transparent border-0 p-0"
    >
      {content}
    </button>
  )
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="no-print fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/55"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 240, damping: 22 }}
        className="bg-background rounded-xl border border-border w-full max-w-xl max-h-[88vh] overflow-y-auto p-5 sm:p-7 relative"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 p-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children}
      </motion.div>
    </motion.div>
  )
}
