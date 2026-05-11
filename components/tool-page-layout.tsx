"use client"

import { HoverProvider } from "@/components/hover-context"
import { motion } from "framer-motion"

interface ToolPageLayoutProps {
  /** Title is shown by SiteHeader (looked up by pathname); accepted here for back-compat. */
  title?: string
  color: string
  children: React.ReactNode
}

export function ToolPageLayout({ children }: ToolPageLayoutProps) {
  return (
    <HoverProvider>
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <section className="min-h-screen flex flex-col px-5 sm:px-6 lg:px-16 pt-24 sm:pt-28 lg:pt-32 pb-12">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {children}
          </motion.div>
        </div>
      </section>
    </main>
    </HoverProvider>
  )
}
