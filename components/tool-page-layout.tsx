"use client"

import { HoverProvider } from "@/components/hover-context"
import { motion } from "framer-motion"

interface ToolPageLayoutProps {
  title?: string
  color: string
  children: React.ReactNode
}

export function ToolPageLayout({ title, color, children }: ToolPageLayoutProps) {
  return (
    <HoverProvider>
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <section className="min-h-screen flex flex-col px-5 sm:px-6 lg:px-16 pt-20 sm:pt-24 pb-12">
        <div className="max-w-4xl mx-auto w-full">
          {/* Title */}
          {title && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h1
                className={`text-[2.5rem] sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] break-words hyphens-auto ${color}`}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  letterSpacing: "-0.035em",
                }}
              >
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
