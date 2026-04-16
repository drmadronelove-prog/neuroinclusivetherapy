export function AnimatedHeading() {
  return (
    <p className="font-[var(--font-body)] text-foreground text-2xl sm:text-3xl font-medium leading-snug max-w-md"
      style={{ textShadow: "0 1px 6px rgba(200,190,175,0.6)" }}
    >
      Therapy and Tools for people who{" "}
      <span className="whitespace-nowrap">are{" "}
        <span className="italic font-[var(--font-accent)] font-bold text-2xl sm:text-3xl" style={{
          color: "#C98A55",
          textShadow: "0 0 10px rgba(201,138,85,0.5), 0 0 24px rgba(201,138,85,0.22)",
        }}>
          different
        </span>
        <span className="font-[var(--font-accent)] font-bold text-2xl sm:text-3xl" style={{
          color: "#C98A55",
          textShadow: "0 0 10px rgba(201,138,85,0.5), 0 0 24px rgba(201,138,85,0.22)",
        }}>.</span>
      </span>
    </p>
  )
}
