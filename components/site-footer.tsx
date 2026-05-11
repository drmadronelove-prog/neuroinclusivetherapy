import Link from "next/link"

export function SiteFooter() {
  return (
    <footer
      className="no-print w-full px-5 sm:px-6 lg:px-12 py-8 border-t"
      style={{
        fontFamily: "var(--font-mono)",
        color: "rgba(11,37,69,0.65)",
        fontSize: "0.78rem",
        letterSpacing: "0.02em",
        borderColor: "rgba(11,37,69,0.10)",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p>Hayes Valley, San Francisco &amp; Berkeley, CA</p>
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          <a
            href="tel:+14159152183"
            className="hover:text-foreground transition-colors"
          >
            (415) 915-2183
          </a>
          <a
            href="mailto:info@oliveclinical.com"
            className="hover:text-foreground transition-colors"
          >
            info@oliveclinical.com
          </a>
          <Link
            href="/contact"
            className="hover:text-foreground transition-colors"
          >
            Book a consultation
          </Link>
        </div>
      </div>
    </footer>
  )
}
