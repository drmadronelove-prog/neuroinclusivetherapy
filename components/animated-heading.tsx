export function AnimatedHeading() {
  return (
    <p
      className="text-2xl sm:text-3xl font-normal leading-snug max-w-md text-foreground"
      style={{
        fontFamily: "var(--font-body)",
        textShadow: "0 1px 6px rgba(251,248,243,0.6)",
      }}
    >
      therapy and assessment for people who{" "}
      <span className="whitespace-nowrap">
        think{" "}
        <span
          className="italic"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            color: "var(--plum)",
          }}
        >
          different
        </span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            color: "var(--plum)",
          }}
        >
          .
        </span>
      </span>
    </p>
  )
}
