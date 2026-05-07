import React from "react"

// ── Types ─────────────────────────────────────────────────────────────────────

export type Block =
  | { type: "paragraph"; text: string; dropCap?: boolean }
  | { type: "heading"; text: string }
  | { type: "pull-quote"; text: string }
  | { type: "footer-note"; text: string }
  | { type: "callout"; heading: string; text: string }
  | { type: "list"; items: string[] }

export type BlogPost = {
  slug: string
  title: string
  subtitle?: string
  author: string
  credential: string
  category: string
  date?: string
  blocks: Block[]
}

// ── Blue-grey palette ─────────────────────────────────────────────────────────
// All text and accents in the blog post use variations of blue-grey.
const BG = {
  lightest: "#BFCAD6",
  light: "#A7B7C8",
  medium: "#8A9AAE",
  dark: "#6B7B8C",
  darker: "#4F5D6E",
  darkest: "#2F3B47",
} as const

// ── Renderer ──────────────────────────────────────────────────────────────────

export function BlogPostArticle({ post }: { post: BlogPost }) {
  return (
    <article className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <header
        className="space-y-4 pb-6"
        style={{ borderBottom: `1px solid ${BG.lightest}` }}
      >
        {/* Category tag */}
        <span
          className="inline-block text-xs font-bold tracking-widest uppercase rounded-full px-3 py-1"
          style={{
            color: BG.dark,
            border: `1px solid ${BG.light}`,
            backgroundColor: "rgba(167,183,200,0.10)",
          }}
        >
          {post.category}
        </span>

        {/* Title */}
        <h1
          className="text-4xl sm:text-5xl font-black leading-tight tracking-tight"
          style={{ fontFamily: "var(--font-display)", color: BG.darkest }}
        >
          {post.title}
        </h1>

        {/* Subtitle */}
        {post.subtitle && (
          <p
            className="text-xl leading-snug font-medium"
            style={{ color: BG.dark }}
          >
            {post.subtitle}
          </p>
        )}

        {/* Byline */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-sm font-semibold" style={{ color: BG.darker }}>
            {post.author}
          </span>
          <span className="text-sm" style={{ color: BG.medium }}>·</span>
          <span className="text-sm" style={{ color: BG.dark }}>
            {post.credential}
          </span>
          {post.date && (
            <>
              <span className="text-sm" style={{ color: BG.medium }}>·</span>
              <span className="text-sm" style={{ color: BG.dark }}>
                {post.date}
              </span>
            </>
          )}
        </div>
      </header>

      {/* Body blocks */}
      <div className="space-y-6">
        {post.blocks.map((block, i) => {
          switch (block.type) {
            case "paragraph":
              return (
                <p
                  key={i}
                  className={`leading-relaxed text-[1.05rem]${block.dropCap ? " prose-drop-cap-bg" : ""}`}
                  style={{ color: BG.darker }}
                >
                  {block.text}
                </p>
              )

            case "heading":
              return (
                <h2
                  key={i}
                  className="text-2xl sm:text-3xl font-black tracking-tight pt-4"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: BG.darkest,
                  }}
                >
                  {block.text}
                </h2>
              )

            case "pull-quote":
              return (
                <blockquote
                  key={i}
                  className="pl-5 py-2 my-8 rounded-r-lg"
                  style={{
                    borderLeft: `4px solid ${BG.medium}`,
                    backgroundColor: "rgba(138,154,174,0.08)",
                  }}
                >
                  <p
                    className="text-lg sm:text-xl font-medium leading-snug italic"
                    style={{ color: BG.darker }}
                  >
                    {block.text}
                  </p>
                </blockquote>
              )

            case "footer-note":
              return (
                <footer
                  key={i}
                  className="mt-12 pt-6 text-sm leading-relaxed"
                  style={{
                    borderTop: `1px solid ${BG.lightest}`,
                    color: BG.dark,
                  }}
                >
                  <p>{block.text}</p>
                </footer>
              )

            case "callout":
              return (
                <div
                  key={i}
                  className="rounded-lg px-6 py-5 my-6"
                  style={{
                    backgroundColor: "rgba(138,154,174,0.10)",
                    border: `1px solid ${BG.light}`,
                  }}
                >
                  <p
                    className="font-semibold text-[0.95rem] mb-2"
                    style={{ color: BG.darkest }}
                  >
                    {block.heading}
                  </p>
                  <p
                    className="text-[0.95rem] leading-relaxed"
                    style={{ color: BG.dark }}
                  >
                    {block.text}
                  </p>
                </div>
              )

            case "list":
              return (
                <ul key={i} className="space-y-2 my-4">
                  {block.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex gap-3 text-[1.05rem] leading-relaxed"
                      style={{ color: BG.darker }}
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                        style={{ backgroundColor: BG.medium }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )

            default:
              return null
          }
        })}
      </div>
    </article>
  )
}
