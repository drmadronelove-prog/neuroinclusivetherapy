export function AnimatedHeading() {
  return (
    <p className="font-[var(--font-body)] text-foreground text-2xl sm:text-3xl font-medium leading-snug max-w-md"
      style={{ textShadow: "0 1px 6px rgba(200,190,175,0.6)" }}
    >
      Therapy and Tools for people who feel{" "}
      <span className="italic font-[var(--font-accent)] font-bold text-2xl sm:text-3xl" style={{
        color: "#D4A843",
        textShadow: "0 0 8px rgba(212,168,67,1), 0 0 22px rgba(212,168,67,0.85), 0 0 50px rgba(212,168,67,0.55), 0 0 90px rgba(212,168,67,0.25)",
      }}>
        different
      </span>
      <span className="font-[var(--font-accent)] font-bold text-2xl sm:text-3xl" style={{
        color: "#D4A843",
        textShadow: "0 0 8px rgba(212,168,67,1), 0 0 22px rgba(212,168,67,0.85), 0 0 50px rgba(212,168,67,0.55), 0 0 90px rgba(212,168,67,0.25)",
      }}>.</span>
    </p>
  )
}
