"use client"

import { motion } from "framer-motion"

const services = [
  {
    number: "01",
    title: "Anxiety",
    description:
      "Evidence-based treatment for anxiety disorders, helping you develop skills to manage worry, fear, and avoidance patterns.",
    color: "bg-nav-teal",
  },
  {
    number: "02",
    title: "OCD",
    description:
      "Trained in Exposure Response Prevention (ERP) through the International OCD Foundation. Specialized treatment for obsessive-compulsive disorders.",
    color: "bg-nav-coral",
  },
  {
    number: "03",
    title: "ADHD",
    description:
      "Executive functioning coaching woven into therapeutic work. Strategies for focus, organization, and emotional regulation.",
    color: "bg-nav-salmon",
  },
  {
    number: "04",
    title: "Autism",
    description:
      "Affirming support for autistic adults. Addressing masking burnout, social navigation, and thriving on your own terms.",
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


      </div>
    </section>
  )
}
