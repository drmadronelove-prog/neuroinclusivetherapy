"use client"

import { motion } from "framer-motion"

export function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32 px-6 lg:px-16 bg-card">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-nav-coral font-[var(--font-display)] font-bold tracking-wider text-sm">
            (02) ABOUT
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Big statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="font-[var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-[0.95] tracking-tight">
              YOUR BRAIN
              <br />
              IS NOT
              <br />
              <span className="text-nav-coral">BROKEN.</span>
            </h2>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-foreground leading-relaxed">
              Dr. Madrone Love is a licensed clinical psychologist specializing in 
              neurodivergent-affirming care. With over a decade of experience, 
              Dr. Love brings deep expertise in working with adults navigating 
              ADHD, autism, and complex trauma.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The practice is grounded in the belief that neurodivergence is a 
              natural form of human diversity—not a deficit to be corrected. 
              Therapy here focuses on understanding your unique neurotype, 
              building on your strengths, and developing strategies that actually 
              work for your brain.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Whether you&apos;re newly diagnosed, questioning, or have known for years, 
              you deserve support that meets you where you are.
            </p>

            {/* Credentials */}
            <div className="pt-8 grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="font-[var(--font-display)] font-bold text-foreground">Education</h4>
                <p className="text-sm text-muted-foreground">
                  PsyD, Clinical Psychology
                  <br />
                  Specialized training in neurodevelopmental conditions
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-[var(--font-display)] font-bold text-foreground">Approach</h4>
                <p className="text-sm text-muted-foreground">
                  Integrative, collaborative
                  <br />
                  Trauma-informed, identity-affirming
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
