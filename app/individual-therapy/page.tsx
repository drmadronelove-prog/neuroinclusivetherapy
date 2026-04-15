import { ToolPageLayout } from "@/components/tool-page-layout"
import { NoSurprisesButton } from "@/components/no-surprises-button"
import { RequiredDisclosuresButton } from "@/components/required-disclosures-button"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Individual Therapy — Dr. Madrone Love, PsyD",
  description: "Neuro-inclusive individual therapy for ADHD, autism, OCD, and trauma. In-person in San Francisco & Berkeley, CA and via telehealth throughout California.",
}

const specializations = [
  {
    title: "ADHD",
    body: "Executive function challenges, focus, impulsivity, emotional regulation, and building life systems that actually work for your brain — not the neurotypical default.",
    color: "border-nav-coral",
  },
  {
    title: "Autism & Neurodivergence",
    body: "ASD, Asperger's, giftedness, highly sensitive person, NVLD, dyslexia, alexithymia, and multiple neurodivergencies — including late diagnosis, masking burnout, and identity work.",
    color: "border-nav-coral",
  },
  {
    title: "OCD",
    body: "All presentations of OCD — existential, moral, harm, and relationship OCD. Treated with gold-standard ERP alongside ACT and compassion-based approaches.",
    color: "border-nav-coral",
  },
  {
    title: "Trauma",
    body: "Childhood trauma, PTSD, religious trauma, and birthing trauma. Approached with somatic, relational, and trauma-focused modalities tailored to your history.",
    color: "border-nav-coral",
  },
  {
    title: "Anxiety & Mood",
    body: "Generalized anxiety, social anxiety, depression, self-esteem, perfectionism, maladaptive daydreaming, and insomnia. Evidence-based tools grounded in a compassionate frame.",
    color: "border-nav-coral",
  },
  {
    title: "Identity & Relationships",
    body: "Multicultural and racial identity, relationship concerns, spirituality, limerence, existential questions, and the intersections of neurodivergence and mental health.",
    color: "border-nav-coral",
  },
]

const modalities = [
  "Exposure Response Prevention (ERP)",
  "Dialectical Behavior Therapy (DBT)",
  "Acceptance & Commitment (ACT)",
  "Mindfulness-Based (MBCT)",
  "Compassion Focused",
  "Somatic",
  "Relational",
  "Trauma Focused",
  "Ketamine-Assisted",
  "Solution Focused Brief",
  "Multicultural",
  "Executive Function Coaching",
]

export default function IndividualTherapyPage() {
  return (
    <ToolPageLayout color="text-nav-coral">
      <div className="space-y-14">

        {/* Therapist intro — name + photo */}
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="shrink-0">
            <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden border-2 border-nav-coral/30 bg-muted">
              <Image
                src="/dr-love.jpg"
                alt="Dr. Madrone Love, PsyD"
                width={288}
                height={288}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
          <div className="space-y-1 pt-1">
            <h2 className="font-[var(--font-display)] text-2xl font-black text-foreground tracking-tight">
              Madrone Love, PsyD
            </h2>
            <p className="text-sm text-muted-foreground">Licensed Psychologist · California #35899</p>
            <p className="text-sm text-muted-foreground">San Francisco &amp; Berkeley · Telehealth throughout CA</p>
          </div>
        </div>

        {/* Personal Statement */}
        <div className="space-y-5 max-w-prose">
          <p className="text-lg text-foreground leading-relaxed">
            I work with people who feel different. Maybe you have an autism, ADHD, or OCD
            diagnosis — including self-diagnosis — or you simply describe yourself as
            &ldquo;weird.&rdquo; My work as a psychologist isn&apos;t to make you
            &ldquo;normal.&rdquo; It&apos;s to help you understand yourself more fully and
            build a life on your own terms.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I primarily work with neurodivergent adults, people with OCD, and trauma
            survivors. I have extensive training in ketamine-assisted therapy and
            psychedelic integration, and can integrate these modalities into treatment
            as indicated.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            In addition to compassion- and mindfulness-based interventions, I bring in
            skills training and coaching when it&apos;s useful. I am trained in ERP, DBT,
            and ACT, and I weave executive function skill building into my practice as
            needed. I begin treatment with a full assessment and work with you to identify
            goals tailored to your unique life.
          </p>
        </div>

        {/* Who I Work With */}
        <div>
          <h2 className="font-[var(--font-display)] text-2xl font-black text-foreground tracking-tight mb-2">
            WHO I WORK WITH
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            I work with adults. My top specialties and areas of expertise include:
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

        {/* Treatment Approaches */}
        <div>
          <h2 className="font-[var(--font-display)] text-2xl font-black text-foreground tracking-tight mb-2">
            TREATMENT APPROACHES
          </h2>
          <p className="text-sm text-muted-foreground mb-5">
            For clients struggling with mood, grief, or seeking deeper insight, we can
            also discuss whether ketamine-assisted therapy might be a good fit.
          </p>
          <div className="flex flex-wrap gap-2">
            {modalities.map(m => (
              <span
                key={m}
                className="text-xs font-[var(--font-display)] font-bold tracking-wide px-3 py-1.5 rounded-full border border-nav-coral/40 text-nav-coral bg-nav-coral/5"
              >
                {m}
              </span>
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
                <li>PsyD, The Wright Institute (2023)</li>
                <li>Post-doctoral Fellow, UCSF (2025)</li>
                <li>ERP Training, International OCD Foundation</li>
                <li>Ketamine-Assisted Therapy Training</li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-[var(--font-display)] font-bold text-foreground text-sm tracking-wide">
                  Additional Roles
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Assistant Professor of Counseling Psychology, CIIS</li>
                  <li>Host, Multiracial Mental Health Podcast</li>
                </ul>
              </div>
              <div className="space-y-1">
                <h3 className="font-[var(--font-display)] font-bold text-foreground text-sm tracking-wide">
                  License
                </h3>
                <p className="text-sm text-muted-foreground">
                  Licensed Psychologist, California #35899
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Locations */}
        <div>
          <h2 className="font-[var(--font-display)] text-2xl font-black text-foreground tracking-tight mb-6">
            LOCATIONS
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-lg p-5 space-y-1">
              <h3 className="font-[var(--font-display)] font-bold text-foreground text-sm tracking-wide mb-2">
                San Francisco
              </h3>
              <p className="text-sm text-muted-foreground">Hayes Valley</p>
              <p className="text-sm text-muted-foreground">110 Gough Street, Suite 203B</p>
              <p className="text-sm text-muted-foreground">San Francisco, CA 94102</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-5 space-y-1">
              <h3 className="font-[var(--font-display)] font-bold text-foreground text-sm tracking-wide mb-2">
                Berkeley
              </h3>
              <p className="text-sm text-muted-foreground">Anam Cara Therapy Center</p>
              <p className="text-sm text-muted-foreground">2915 Martin Luther King Junior Way</p>
              <p className="text-sm text-muted-foreground">Berkeley, CA 94703</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Also available throughout California via telehealth.
          </p>
        </div>

        {/* Getting Started */}
        <div className="border-l-2 border-nav-coral pl-6 space-y-4">
          <h3 className="font-[var(--font-display)] font-bold text-foreground text-sm tracking-wide">
            GETTING STARTED
          </h3>
          <p className="text-muted-foreground leading-relaxed text-sm max-w-prose">
            I am currently accepting new clients and offer both in-person and online
            sessions. I offer a free 20-minute consultation to see whether we are a good
            fit. Reach out by phone at{" "}
            <a href="tel:+14159152183" className="text-nav-coral hover:underline">
              (415) 915-2183
            </a>{" "}
            or by email at{" "}
            <a href="mailto:therapy@madronelove.com" className="text-nav-coral hover:underline">
              therapy@madronelove.com
            </a>
            .
          </p>
          <div className="flex flex-wrap gap-3">
            <NoSurprisesButton />
            <RequiredDisclosuresButton />
          </div>
        </div>

      </div>
    </ToolPageLayout>
  )
}
