import { ToolPageLayout } from "@/components/tool-page-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Individual Therapy — Dr. Madrone Love, PsyD",
  description: "One-on-one psychotherapy for neurodivergent adults navigating identity, grief, anxiety, and major life transitions.",
}

const specializations = [
  {
    title: "Grief & Loss",
    body: "Death, divorce, diagnosis, the loss of an imagined future. Working through grief rather than around it.",
    color: "border-nav-coral",
  },
  {
    title: "Life Transitions",
    body: "Career shifts, relationship changes, late diagnoses, becoming a parent, growing older. Navigating the disorientation of becoming someone new.",
    color: "border-nav-coral",
  },
  {
    title: "Identity & Existential Questions",
    body: "Who am I outside of what I produce? What do I actually believe? What kind of life do I want? Therapy as a space for the questions that don't have easy answers.",
    color: "border-nav-coral",
  },
  {
    title: "Anxiety",
    body: "Generalized anxiety, social anxiety, existential anxiety, perfectionism. Evidence-based tools integrated with contemplative practice.",
    color: "border-nav-coral",
  },
  {
    title: "Neurodivergent Adults",
    body: "ADHD, autism, OCD, giftedness, and multiple neurodivergencies — including late diagnosis, masking burnout, and building a life structured around how you actually work.",
    color: "border-nav-coral",
  },
  {
    title: "Multicultural Identity",
    body: "Navigating multiple cultural identities, racial identity, and the intersections of race, neurodivergence, and mental health. Informed by my work as host of the Multiracial Mental Health Podcast.",
    color: "border-nav-coral",
  },
]

export default function IndividualTherapyPage() {
  return (
    <ToolPageLayout title="INDIVIDUAL THERAPY" color="text-nav-coral">
      <div className="space-y-14">

        {/* Intro */}
        <div className="space-y-5 max-w-prose">
          <p className="text-lg text-foreground leading-relaxed">
            Working with me is about understanding who you are and the life you are
            building for yourself — not conforming to a standard of health that was
            never designed with you in mind.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            My approach draws from my Buddhist practice, which means I show up to sessions
            genuinely present — not running a protocol, but in actual contact with you and
            what you are carrying. From there we work together to gain clarity about your
            path ahead, understand yourself more compassionately, and develop psychological
            skills that help you thrive on your own terms.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I use an integrative approach: evidence-based modalities (ERP, CBT, ACT) are
            grounded in a relational, depth-oriented frame. The research matters. So does
            the relationship. I hold both.
          </p>
        </div>

        {/* Who I work with */}
        <div>
          <h2 className="font-[var(--font-display)] text-2xl font-black text-foreground tracking-tight mb-2">
            WHO I WORK WITH
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            I work primarily with adults. My specializations include:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {specializations.map(s => (
              <div
                key={s.title}
                className={`bg-card border border-border border-l-2 ${s.color} rounded-lg p-5`}
              >
                <h3 className="font-[var(--font-display)] font-bold text-foreground mb-2 text-sm tracking-wide">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Background */}
        <div>
          <h2 className="font-[var(--font-display)] text-2xl font-black text-foreground tracking-tight mb-6">
            BACKGROUND
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h3 className="font-[var(--font-display)] font-bold text-foreground text-sm tracking-wide">
                Education & Training
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>BA, University of Pennsylvania</li>
                <li>MA, University of California, Berkeley</li>
                <li>PsyD, The Wright Institute</li>
                <li>Post-doctoral Fellow, UCSF</li>
                <li>ERP Training, International OCD Foundation</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-[var(--font-display)] font-bold text-foreground text-sm tracking-wide">
                Additional Roles
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Assistant Professor of Counseling Psychology, CIIS</li>
                <li>Host, Multiracial Mental Health Podcast</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Getting started */}
        <div className="border-l-2 border-nav-coral pl-6 max-w-prose space-y-3">
          <h3 className="font-[var(--font-display)] font-bold text-foreground text-sm tracking-wide">
            GETTING STARTED
          </h3>
          <p className="text-muted-foreground leading-relaxed text-sm">
            I practice in Berkeley and San Francisco, CA — and work with clients throughout
            California via telehealth. I offer a free 20-minute consultation to see whether
            we are a good fit. Reach out through the contact form or by email to begin.
          </p>
        </div>

      </div>
    </ToolPageLayout>
  )
}
