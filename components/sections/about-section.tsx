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
              My approach to psychotherapy draws deeply from my Buddhist practice, 
              allowing me to be fully present with clients as they navigate life&apos;s 
              inevitable challenges. I specialize in helping people work through grief 
              and loss, divorce, major life transitions, identity questions, existential 
              anxiety, and work-related stress.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I&apos;m particularly passionate about working with neurodivergent individuals, 
              including those with ADHD, autism spectrum differences, giftedness, or 
              multiple neurodivergencies. I also have experience supporting partners 
              and family members of neurodivergent people.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Working with me is about understanding who you are and the life that you 
              are building for yourself. From there, I can support you to gain clarity 
              about your path ahead, understand yourself more compassionately, and develop 
              psychological skills that help you thrive on your own terms.
            </p>

            {/* Credentials */}
            <div className="pt-8 grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="font-[var(--font-display)] font-bold text-foreground">Education</h4>
                <p className="text-sm text-muted-foreground">
                  BA, University of Pennsylvania
                  <br />
                  MA, UC Berkeley
                  <br />
                  PsyD, Wright Institute
                  <br />
                  Post-doc, UCSF
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-[var(--font-display)] font-bold text-foreground">Also</h4>
                <p className="text-sm text-muted-foreground">
                  Host, Multiracial Mental Health Podcast
                  <br />
                  Assistant Professor, CIIS
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
