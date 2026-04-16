"use client"

import { HeroCards } from "@/components/hero-cards"
import { AnimatedHeading } from "@/components/animated-heading"
import { motion } from "framer-motion"
import Link from "next/link"

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative"
      style={{ minHeight: "100svh" }}
    >

      {/* Logo + name — fixed top-left, front page only */}
      <Link
        href="/"
        className="no-print fixed top-3 left-3 z-[60]"
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="" width={52} height={52} style={{ display: "block", flexShrink: 0 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
          <span style={{
            fontFamily: "var(--font-accent)",
            fontSize: "1.55rem",
            fontWeight: 700,
            color: "#8A7E6E",
            lineHeight: 1.1,
            letterSpacing: "0.02em",
          }}>Madrone Love, PsyD</span>
          <span className="hidden md:inline" style={{
            fontFamily: "var(--font-accent)",
            fontSize: "1.1rem",
            fontWeight: 400,
            color: "#9A8E7E",
            lineHeight: 1.15,
            letterSpacing: "0.15em",
          }}>Clinical Psychologist</span>
        </div>
      </Link>

      {/* Full-bleed video */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
        <video autoPlay muted loop playsInline style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center",
        }}>
          <source src="/ceramics.mp4" type="video/mp4" />
        </video>

        {/* Desktop gradient */}
        <div className="hidden lg:block" style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(240,235,227,0.94) 0%, rgba(240,235,227,0.82) 28%, rgba(240,235,227,0.52) 55%, rgba(240,235,227,0.28) 85%, rgba(240,235,227,0.15) 100%)",
        }} />

        {/* Mobile gradient */}
        <div className="lg:hidden" style={{
          position: "absolute", inset: 0,
          background: "rgba(240,235,227,0.82)",
        }} />
      </div>

      {/* Main content — flex-col on mobile so footer anchors to bottom */}
      <div
        className="relative min-h-[100svh] flex flex-col justify-between lg:justify-center px-6 lg:px-16 pt-10 pb-0 lg:pt-0"
        style={{ zIndex: 2 }}
      >
        {/* Heading + cards */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-12 w-full max-w-6xl mx-auto lg:pb-16">

          <div className="shrink-0 space-y-1 text-center lg:text-left mx-auto lg:mx-0" style={{ maxWidth: "340px" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ textShadow: "0 2px 18px rgba(240,235,227,0.9)" }}
            >
              <h1 style={{
                fontFamily: "var(--font-accent)",
                fontSize: "clamp(3.8rem, 6.5vw, 6rem)",
                fontWeight: 700,
                color: "#7D805F",
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
                margin: 0,
              }}>
                Neuroinclusive
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <AnimatedHeading />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 flex justify-center lg:justify-end"
          >
            <HeroCards />
          </motion.div>

        </div>

        {/* Mobile footer — sits at bottom of viewport */}
        <div className="no-print lg:hidden py-6" style={{ fontFamily: "var(--font-accent)", color: "rgba(61,82,48,0.52)", lineHeight: 1.4, fontSize: "1.1rem" }}>
          <p className="whitespace-nowrap overflow-x-auto">
            San Francisco &amp; Berkeley &nbsp;·&nbsp;{" "}
            <a href="tel:+14159152183" className="hover:opacity-100 transition-opacity">(415) 915-2183</a>
            {" "}&nbsp;·&nbsp;{" "}
            <a href="mailto:therapy@madronelove.com" className="hover:opacity-100 transition-opacity">therapy@madronelove.com</a>
          </p>
        </div>
      </div>

      {/* Desktop footer */}
      <footer
        className="no-print hidden lg:block absolute bottom-0 left-0 right-0"
        style={{
          zIndex: 3,
          background: "linear-gradient(to top, rgba(240,235,227,0.88) 0%, rgba(240,235,227,0.60) 60%, transparent 100%)",
          paddingBottom: "18px",
          paddingTop: "32px",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
          <p style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "1.1rem", color: "rgba(61,82,48,0.48)" }}>
            Hayes Valley, San Francisco &amp; Berkeley, CA
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1" style={{ fontFamily: "var(--font-accent)", color: "rgba(61,82,48,0.48)", fontSize: "1.1rem" }}>
            <a href="tel:+14159152183" className="hover:opacity-100 transition-opacity">(415) 915-2183</a>
            <a href="mailto:therapy@madronelove.com" className="hover:opacity-100 transition-opacity">therapy@madronelove.com</a>
            <Link href="/contact" className="hover:opacity-100 transition-opacity">Book a consultation</Link>
          </div>
        </div>
      </footer>
    </section>
  )
}
