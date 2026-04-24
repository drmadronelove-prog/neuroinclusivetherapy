"use client"

import { HoverProvider } from "@/components/hover-context"
import { motion } from "framer-motion"
import Link from "next/link"

interface ToolPageLayoutProps {
  title?: string
  color: string
  children: React.ReactNode
}

export function ToolPageLayout({ title, color, children }: ToolPageLayoutProps) {
  return (
    <HoverProvider>
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <section className="min-h-screen flex flex-col px-6 lg:px-16 pt-16 md:pt-12 pb-12">
        <div className="max-w-4xl mx-auto w-full">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="no-print"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Back to Home
            </Link>
          </motion.div>

          {/* Title */}
          {title && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h1 className={`font-[var(--font-display)] text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.85] tracking-tight ${color}`}>
                {title}
              </h1>
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {children}
          </motion.div>
        </div>
      </section>
    </main>
    </HoverProvider>
  )
}
