"use client"

import {
  useWorksheetState,
  WorksheetActions,
  WorksheetPrintStyles,
  Section,
  Card,
  TextLine,
  TextBox,
  CheckChips,
} from "./worksheet-kit"

const VALUE_OPTS = [
  "kindness", "honesty", "connection", "fairness", "creativity", "loyalty",
  "curiosity", "courage", "care for others", "growth", "authenticity", "independence",
]

export function ICBTTrueSelfWorksheet() {
  const { getStr, getArr, set, toggle, reset } = useWorksheetState("nd-icbt-trueself")

  return (
    <div className="worksheet-root mb-16">
      <WorksheetPrintStyles />

      <div className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-nav-teal mb-1">
        Inference-Based CBT
      </div>
      <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-black text-foreground tracking-tight mb-2">
        UNCOVERING THE TRUE SELF
      </h2>
      <p className="text-sm text-muted-foreground mb-6 max-w-2xl leading-relaxed">
        When we grow up around critical or emotionally limited people, we often absorb their view of
        us as if it were fact. This worksheet helps you examine where that self-critical story came
        from, and what is actually true about you based on your own life and experience.
      </p>

      <WorksheetActions onReset={reset} />

      <div className="worksheet-form space-y-2">

        <Section
          eyebrow="Part 1"
          title="The Critical Narrative"
          intro="Write it down plainly. What does the self-critical voice say about you — what does it tell you about who you are or what you deserve?"
        >
          <Card>
            <TextBox rows={5}
              value={getStr("criticalNarrative")}
              onChange={v => set("criticalNarrative", v)}
              placeholder="e.g. I am too much. I am not enough. I am selfish for needing anything…" />
          </Card>
        </Section>

        <Section
          eyebrow="Part 2"
          title="The Origin of the Story"
          intro="Whose voice does it sound like? What relationships or experiences taught you to see yourself this way? This is not about blame — it is about tracing the source."
        >
          <Card>
            <div className="space-y-4">
              <TextBox label="Where did this story come from?" rows={4}
                value={getStr("origin")} onChange={v => set("origin", v)} />
              <TextLine label="How old were you when you started believing it?"
                value={getStr("originAge")} onChange={v => set("originAge", v)} />
            </div>
          </Card>
          <div className="mt-4 border-l-2 border-nav-teal pl-5 py-1 max-w-prose">
            <p className="text-sm text-muted-foreground leading-relaxed italic">
              The self-critical story was constructed by someone else, in a different time, when you
              had no other frame of reference. It is an inference about who you are &mdash; not a fact.
              The question now is: what does the actual evidence of your life show?
            </p>
          </div>
        </Section>

        <Section
          eyebrow="Part 3"
          title="Autobiographical Evidence"
          intro="Who have you actually been across your life? Think of moments, choices, relationships, and actions that reflect something true about you. Go back as far as you like — small things count."
        >
          <Card>
            <TextBox rows={6}
              value={getStr("autobiographical")} onChange={v => set("autobiographical", v)}
              placeholder="Moments, choices, relationships, actions…" />
          </Card>
        </Section>

        <Section
          eyebrow="Part 4"
          title="What You Actually Care About"
          intro="These are not things you think you should value. They are what moves you when you are most yourself. Tap any that feel true, and add your own."
        >
          <Card>
            <CheckChips
              opts={VALUE_OPTS}
              selected={getArr("values")}
              onToggle={o => toggle("values", o)}
              custom={getStr("valuesOther")}
              onCustom={v => set("valuesOther", v)}
              customPlaceholder="Add others that feel true for you…"
            />
          </Card>
        </Section>

        <Section
          eyebrow="Part 5"
          title="How You Actually Move Through the World"
          intro="Not how the critical voice describes you — how do the people who see you clearly actually describe you?"
        >
          <Card>
            <div className="space-y-4">
              <TextBox label="How do people who know you well experience you?" rows={4}
                value={getStr("howExperienced")} onChange={v => set("howExperienced", v)} />
              <TextBox label="What do you do when someone you care about is struggling?" rows={4}
                value={getStr("whenStruggling")} onChange={v => set("whenStruggling", v)} />
              <TextBox label="What have you kept going toward even when it was hard?" rows={4}
                value={getStr("keptGoingToward")} onChange={v => set("keptGoingToward", v)} />
            </div>
          </Card>
        </Section>

        <Section
          eyebrow="Part 6"
          title="Two Stories Side by Side"
          intro="What is the difference between the story you were given and the person the evidence actually shows?"
        >
          <Card>
            <div className="grid sm:grid-cols-2 gap-4">
              <TextBox label="The story I was given" rows={6}
                value={getStr("storyGiven")} onChange={v => set("storyGiven", v)} />
              <TextBox label="What my life actually shows" rows={6}
                value={getStr("storyShows")} onChange={v => set("storyShows", v)} />
            </div>
          </Card>
        </Section>

        <Section
          eyebrow="Part 7"
          title="A Truer Story"
          intro="Based on all of this, who are you? Write a few sentences in your own words. Not the story you were handed — the one the evidence actually supports."
        >
          <Card>
            <TextBox rows={6}
              value={getStr("truerStory")} onChange={v => set("truerStory", v)} />
          </Card>
        </Section>
      </div>
    </div>
  )
}
