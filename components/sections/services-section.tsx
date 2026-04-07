"use client"

import { motion } from "framer-motion"

const services = [
  {
    number: "01",
    title: "Anxiety & OCD",
    description:
      "Trained in Exposure Response Prevention (ERP) through the International OCD Foundation. Evidence-based treatment for anxiety and obsessive-compulsive disorders.",
    color: "bg-nav-teal",
  },
  {
    number: "02",
    title: "Trauma & PTSD",
    description:
      "Dedicated space to explore the things that are harder to talk about: childhood trauma, low self-esteem, and the impacts of difficult experiences.",
    color: "bg-nav-coral",
  },
  {
    number: "03",
    title: "ADHD & Autism",
    description:
      "Specialized support for neurodivergent adults. I integrate executive functioning coaching, somatic and mindfulness-based skills into our work together.",
    color: "bg-nav-salmon",
  },
  {
    number: "04",
    title: "Grief & Life Transitions",
    description:
      "Death, divorce, major life transitions, identity questions, existential anxiety, and work-related stress—I can help you navigate these challenges.",
    color: "bg-nav-amber",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-24 lg:py-32 px-6 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-nav-salmon font-[var(--font-display)] font-bold tracking-wider text-sm">
            (03) SERVICES
          </span>
          <h2 className="font-[var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-[0.95] tracking-tight mt-4">
            HOW WE CAN
            <br />
            <span className="text-nav-salmon">WORK TOGETHER</span>
          </h2>
        </motion.div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-card rounded-lg p-8 border border-border hover:border-transparent hover:shadow-xl transition-all duration-300"
            >
              {/* Color accent */}
              <div
                className={`absolute top-0 left-0 w-1 h-full ${service.color} rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div className="flex items-start gap-4">
                <span className="text-muted-foreground font-[var(--font-display)] font-bold text-sm">
                  {service.number}
                </span>
                <div>
                  <h3 className="font-[var(--font-display)] text-xl font-bold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 p-8 bg-card rounded-lg border border-border"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-[var(--font-display)] font-bold text-foreground mb-2">
                Session Rate
              </h4>
              <p className="text-sm text-muted-foreground">
                $250 per session. Weekly or biweekly available with therapy-focused assignments between sessions.
              </p>
            </div>
            <div>
              <h4 className="font-[var(--font-display)] font-bold text-foreground mb-2">
                Insurance
              </h4>
              <p className="text-sm text-muted-foreground">
                Out of network. Superbills provided for reimbursement.
              </p>
            </div>
            <div>
              <h4 className="font-[var(--font-display)] font-bold text-foreground mb-2">
                Modalities
              </h4>
              <p className="text-sm text-muted-foreground">
                In-person (SF &amp; Berkeley) or telehealth throughout California.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
