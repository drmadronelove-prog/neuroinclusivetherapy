export function AnimatedHeading() {
  return (
    <p className="font-[var(--font-body)] text-foreground text-2xl sm:text-3xl font-medium leading-snug max-w-md"
      style={{ textShadow: "0 1px 6px rgba(200,190,175,0.6)" }}
    >
      Therapy and Tools for people who feel{" "}
      <span className="italic font-[var(--font-accent)] font-bold text-4xl sm:text-5xl align-baseline" style={{ color: "#7A9A78" }}>
        different
      </span>
      <span className="font-[var(--font-accent)] font-bold text-4xl sm:text-5xl" style={{ color: "#7A9A78" }}>.</span>
    </p>
  )
}
