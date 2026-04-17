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
  subtitle: string
  author: string
  credential: string
  category: string
  date?: string
  blocks: Block[]
}

// ── Renderer ──────────────────────────────────────────────────────────────────

export function BlogPostArticle({ post }: { post: BlogPost }) {
  return (
    <article className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <header className="space-y-4 pb-6 border-b border-border">
        {/* Category tag */}
        <span className="inline-block text-xs font-bold tracking-widest uppercase text-nav-teal border border-nav-teal rounded-full px-3 py-1">
          {post.category}
        </span>

        {/* Title */}
        <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl font-black text-foreground leading-tight tracking-tight">
          {post.title}
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-muted-foreground leading-snug font-medium">
          {post.subtitle}
        </p>

        {/* Byline */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-sm font-semibold text-foreground">{post.author}</span>
          <span className="text-muted-foreground text-sm">·</span>
          <span className="text-sm text-muted-foreground">{post.credential}</span>
          {post.date && (
            <>
              <span className="text-muted-foreground text-sm">·</span>
              <span className="text-sm text-muted-foreground">{post.date}</span>
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
                  className={`text-foreground leading-relaxed text-[1.05rem]${block.dropCap ? " prose-drop-cap" : ""}`}
                >
                  {block.text}
                </p>
              )

            case "heading":
              return (
                <h2
                  key={i}
                  className="font-[var(--font-display)] text-2xl sm:text-3xl font-black text-foreground tracking-tight pt-4"
                >
                  {block.text}
                </h2>
              )

            case "pull-quote":
              return (
                <blockquote
                  key={i}
                  className="border-l-4 border-nav-teal pl-5 py-2 my-8 bg-nav-teal/5 rounded-r-lg"
                >
                  <p className="text-lg sm:text-xl text-foreground font-medium leading-snug italic">
                    {block.text}
                  </p>
                </blockquote>
              )

            case "footer-note":
              return (
                <footer
                  key={i}
                  className="mt-12 pt-6 border-t border-border text-sm text-muted-foreground leading-relaxed"
                >
                  <p>{block.text}</p>
                </footer>
              )

            case "callout":
              return (
                <div
                  key={i}
                  className="bg-nav-teal/8 border border-nav-teal/20 rounded-lg px-6 py-5 my-6"
                >
                  <p className="font-semibold text-[0.95rem] text-foreground mb-2">{block.heading}</p>
                  <p className="text-[0.95rem] text-muted-foreground leading-relaxed">{block.text}</p>
                </div>
              )

            case "list":
              return (
                <ul key={i} className="space-y-2 my-4">
                  {block.items.map((item, j) => (
                    <li key={j} className="flex gap-3 text-[1.05rem] text-foreground leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-nav-teal" />
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
