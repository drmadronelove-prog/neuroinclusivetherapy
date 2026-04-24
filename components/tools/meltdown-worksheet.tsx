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

// ── Option lists ──────────────────────────────────────────────────────────────

const SENSORY_OPTS = [
  "Noise-canceling headphones", "Dim lighting / sunglasses", "Weighted blanket / deep pressure",
  "Cool shower or bath", "Familiar, comforting scent",
]
const MOVEMENT_OPTS = [
  "Walking or pacing", "Rocking, swaying, or stimming", "Shaking out hands / body",
  "Stretching or yoga", "Vigorous exercise",
]
const CREATIVE_OPTS = [
  "Sketching with no pressure", "Color-filling or collage", "Music as non-verbal release",
  "Doodling / mark-making", "Writing / journaling freely",
]
const CONNECTION_OPTS = [
  "Ask for quiet presence", "Signal to family: I need space", "Sit outside / nature",
  "Allow shutdown without guilt", "Animal comfort / pet",
]

const EP_TRIGGERS = [
  "Sensory overload", "Unexpected change", "Demand / transition", "Social overwhelm",
  "Hunger / fatigue", "Emotion buildup", "Creative block / shutdown", "Conflict", "Unknown",
]
const NOISE_LEVELS    = ["Low", "Moderate", "High"]
const LIGHT_LEVELS    = ["Dim", "Natural", "Harsh"]
const CROWDING_LEVELS = ["Alone", "Small group", "Crowded"]
const TEMP_LEVELS     = ["Cold", "Comfortable", "Hot"]

const WARNING_SIGNS = [
  "Irritability / snapping", "Noise sensitivity spike", "Shutting down / going quiet",
  "Chest tightness", "Repetitive movements / stimming", "Overwhelm in conversations",
]
const HELPED = [
  "Alone time / dark room", "Stimming freely", "Moving my body", "Creating something",
  "Being held / contact", "Music or silence", "Water (shower / bath)", "Weighted blanket",
  "Someone sitting with me quietly",
]
const RECOVERY_TIMES = ["Less than 1 hr", "1–3 hrs", "Half a day", "Full day", "Longer"]

const POST_FEELINGS = [
  "Exhausted", "Ashamed", "Empty / numb", "Relieved", "Physically sore", "Sad", "Confused",
]

// ── Component ─────────────────────────────────────────────────────────────────

export function MeltdownWorksheet() {
  const { getStr, getArr, set, toggle, reset } = useWorksheetState("nd-meltdown-workbook")

  return (
    <div className="worksheet-root mb-16">
      <WorksheetPrintStyles />

      <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-black text-foreground tracking-tight mb-2">
        MELTDOWN AWARENESS &amp; RECOVERY WORKBOOK
      </h2>
      <p className="text-sm text-muted-foreground mb-2 max-w-2xl leading-relaxed">
        A personal tracking tool for autistic adults. Meltdowns are not failures &mdash; they are the
        nervous system&apos;s response to an environment that has exceeded its capacity to cope. This
        workbook is a tool for understanding, not judgment.
      </p>
      <p className="text-xs text-muted-foreground mb-6 italic max-w-2xl leading-relaxed">
        &ldquo;Understanding your patterns is not about fixing yourself. It is about knowing yourself
        well enough to ask for what you need.&rdquo;
      </p>

      <WorksheetActions onReset={reset} />

      <div className="worksheet-form space-y-2">

        {/* Ownership line */}
        <Card>
          <TextLine
            label="This workbook belongs to"
            value={getStr("owner")}
            onChange={v => set("owner", v)}
            placeholder="Your name"
          />
        </Card>

        {/* ── PART 1 ── My Personal Map ── */}
        <div className="mt-8 mb-4">
          <div className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-nav-coral">Part 1</div>
          <h3 className="font-[var(--font-display)] text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            My Personal Map
          </h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-prose">
            Complete this section once when you start and update it as you learn more.
            It is a living document.
          </p>
        </div>

        <Section
          title="A. My Common Triggers"
          intro="Across all roles, what tends to send you toward overload?"
        >
          <Card>
            <div className="grid sm:grid-cols-3 gap-4">
              <TextBox label="As a…" rows={4} value={getStr("trigRole1")} onChange={v => set("trigRole1", v)} placeholder="e.g. parent, partner" />
              <TextBox label="As a…" rows={4} value={getStr("trigRole2")} onChange={v => set("trigRole2", v)} placeholder="e.g. artist, employee" />
              <TextBox label="As…"   rows={4} value={getStr("trigRole3")} onChange={v => set("trigRole3", v)} placeholder="e.g. myself" />
            </div>
          </Card>
        </Section>

        <Section
          title="B. My Early Warning Signs"
          intro="What shows up first, before the meltdown peaks?"
        >
          <Card>
            <div className="grid sm:grid-cols-3 gap-4">
              <TextBox label="In my body"     rows={4} value={getStr("warnBody")}     onChange={v => set("warnBody", v)} />
              <TextBox label="In my behavior" rows={4} value={getStr("warnBehavior")} onChange={v => set("warnBehavior", v)} />
              <TextBox label="In my thoughts" rows={4} value={getStr("warnThoughts")} onChange={v => set("warnThoughts", v)} />
            </div>
          </Card>
        </Section>

        <Section
          title="C. What Always Makes It Worse"
          intro="Things that accelerate or intensify a meltdown once it has started."
        >
          <Card>
            <TextBox value={getStr("makesWorse")} onChange={v => set("makesWorse", v)} rows={3}
              placeholder="e.g. being asked questions, bright overhead lights, being touched unexpectedly" />
          </Card>
        </Section>

        <Section
          title="D. What I Need People Around Me to Know"
          intro="If you share this page with your family or close people."
        >
          <Card>
            <div className="grid sm:grid-cols-1 gap-4">
              <TextBox label="When I am in meltdown, please…" rows={3}
                value={getStr("peoplePlease")} onChange={v => set("peoplePlease", v)} />
              <TextBox label="Please do NOT…" rows={3}
                value={getStr("peopleDoNot")} onChange={v => set("peopleDoNot", v)} />
              <TextBox label="I am okay if you…" rows={3}
                value={getStr("peopleOkay")} onChange={v => set("peopleOkay", v)} />
            </div>
          </Card>
        </Section>

        <Section
          title="My Regulation Toolkit"
          eyebrow="Part 1 (continued)"
          intro="Tap what resonates. Add your own. Note the one that helps most in the moment."
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Card>
              <CheckChips
                title="Sensory"
                opts={SENSORY_OPTS}
                selected={getArr("kitSensory")}
                onToggle={o => toggle("kitSensory", o)}
              />
              <TextLine label="My go-to" value={getStr("kitSensoryGoTo")} onChange={v => set("kitSensoryGoTo", v)} />
            </Card>
            <Card>
              <CheckChips
                title="Movement"
                opts={MOVEMENT_OPTS}
                selected={getArr("kitMovement")}
                onToggle={o => toggle("kitMovement", o)}
              />
              <TextLine label="My go-to" value={getStr("kitMovementGoTo")} onChange={v => set("kitMovementGoTo", v)} />
            </Card>
            <Card>
              <CheckChips
                title="Creative / Art"
                opts={CREATIVE_OPTS}
                selected={getArr("kitCreative")}
                onToggle={o => toggle("kitCreative", o)}
              />
              <TextLine label="My go-to" value={getStr("kitCreativeGoTo")} onChange={v => set("kitCreativeGoTo", v)} />
            </Card>
            <Card>
              <CheckChips
                title="Connection / Rest"
                opts={CONNECTION_OPTS}
                selected={getArr("kitConnection")}
                onToggle={o => toggle("kitConnection", o)}
              />
              <TextLine label="My go-to" value={getStr("kitConnectionGoTo")} onChange={v => set("kitConnectionGoTo", v)} />
            </Card>
          </div>
        </Section>

        <Section
          title="E. My Top 3 Early Intervention Strategies"
          intro="When you first notice warning signs, what are the three things most likely to help you regulate before a meltdown peaks?"
        >
          <Card>
            <div className="space-y-3">
              <TextLine label="1" value={getStr("strategy1")} onChange={v => set("strategy1", v)} />
              <TextLine label="2" value={getStr("strategy2")} onChange={v => set("strategy2", v)} />
              <TextLine label="3" value={getStr("strategy3")} onChange={v => set("strategy3", v)} />
            </div>
          </Card>
        </Section>

        <Section
          title="F. My Safe Space / Reset Spot"
          intro="Is there a physical space where you can go to regulate?"
        >
          <Card>
            <div className="space-y-4">
              <TextBox label="Describe it" rows={3}
                value={getStr("safeDescribe")} onChange={v => set("safeDescribe", v)} />
              <TextBox label="What is in it or near it that helps?" rows={3}
                value={getStr("safeItems")} onChange={v => set("safeItems", v)} />
            </div>
          </Card>
        </Section>

        <Section
          title="G. A Note for After the Meltdown"
        >
          <Card>
            <div className="mb-5">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                Post-meltdown, I tend to feel
              </div>
              <CheckChips
                opts={POST_FEELINGS}
                selected={getArr("postFeelings")}
                onToggle={o => toggle("postFeelings", o)}
              />
            </div>
            <div className="space-y-4">
              <TextLine label="What I most need from myself afterward"
                value={getStr("postNeed")} onChange={v => set("postNeed", v)} />
              <TextLine label="A compassionate phrase I can say to myself"
                value={getStr("postPhrase")} onChange={v => set("postPhrase", v)} />
              <TextLine label="How long I usually need before I can reconnect with family"
                value={getStr("postReconnect")} onChange={v => set("postReconnect", v)} />
            </div>
          </Card>
        </Section>

        {/* ── PART 2 ── Episode Log ── */}
        <div className="mt-12 mb-4">
          <div className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-nav-coral">Part 2</div>
          <h3 className="font-[var(--font-display)] text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            Meltdown Episode Log
          </h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-prose">
            Use this log for one episode at a time. Save or print it, then clear the form for the next
            entry — keep the saved copies together so you can look for patterns over time. There is
            no obligation to fill in every field.
          </p>
        </div>

        <Section title="Log Entry">
          <Card>
            <div className="space-y-5">
              <div className="grid sm:grid-cols-3 gap-4">
                <TextLine label="Date"     value={getStr("epDate")}     onChange={v => set("epDate", v)} />
                <TextLine label="Time"     value={getStr("epTime")}     onChange={v => set("epTime", v)} />
                <TextLine label="Duration" value={getStr("epDuration")} onChange={v => set("epDuration", v)} />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <TextLine label="Where were you?" value={getStr("epWhere")} onChange={v => set("epWhere", v)} />
                <TextLine label="What role were you in?" value={getStr("epRole")}  onChange={v => set("epRole", v)}
                  placeholder="e.g. Parent · Partner · Artist · Other" />
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  Possible triggers (check all that apply)
                </div>
                <CheckChips
                  opts={EP_TRIGGERS}
                  selected={getArr("epTriggers")}
                  onToggle={o => toggle("epTriggers", o)}
                  custom={getStr("epTriggerOther")}
                  onCustom={v => set("epTriggerOther", v)}
                  customPlaceholder="Other…"
                />
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  Sensory environment
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-[0.7rem] uppercase tracking-wider text-muted-foreground mb-1">Noise</div>
                    <CheckChips opts={NOISE_LEVELS}    selected={getArr("epNoise")}    onToggle={o => toggle("epNoise", o)} />
                  </div>
                  <div>
                    <div className="text-[0.7rem] uppercase tracking-wider text-muted-foreground mb-1">Lighting</div>
                    <CheckChips opts={LIGHT_LEVELS}    selected={getArr("epLight")}    onToggle={o => toggle("epLight", o)} />
                  </div>
                  <div>
                    <div className="text-[0.7rem] uppercase tracking-wider text-muted-foreground mb-1">Crowding</div>
                    <CheckChips opts={CROWDING_LEVELS} selected={getArr("epCrowding")} onToggle={o => toggle("epCrowding", o)} />
                  </div>
                  <div>
                    <div className="text-[0.7rem] uppercase tracking-wider text-muted-foreground mb-1">Temperature</div>
                    <CheckChips opts={TEMP_LEVELS}     selected={getArr("epTemp")}     onToggle={o => toggle("epTemp", o)} />
                  </div>
                </div>
                <div className="mt-4">
                  <TextBox label="Other sensory notes" rows={2}
                    value={getStr("epSensoryNotes")} onChange={v => set("epSensoryNotes", v)} />
                </div>
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  Early warning signs you noticed before it peaked
                </div>
                <CheckChips
                  opts={WARNING_SIGNS}
                  selected={getArr("epWarnings")}
                  onToggle={o => toggle("epWarnings", o)}
                  custom={getStr("epWarningOther")}
                  onCustom={v => set("epWarningOther", v)}
                  customPlaceholder="Other…"
                />
              </div>

              <TextBox label="What happened (brief description — no judgment required)" rows={4}
                value={getStr("epHappened")} onChange={v => set("epHappened", v)} />

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  What helped
                </div>
                <CheckChips
                  opts={HELPED}
                  selected={getArr("epHelped")}
                  onToggle={o => toggle("epHelped", o)}
                  custom={getStr("epHelpedOther")}
                  onCustom={v => set("epHelpedOther", v)}
                  customPlaceholder="Other…"
                />
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  After / recovery — how long to feel baseline again?
                </div>
                <CheckChips
                  opts={RECOVERY_TIMES}
                  selected={getArr("epRecovery")}
                  onToggle={o => toggle("epRecovery", o)}
                />
                <div className="mt-4">
                  <TextLine label="One thing you needed most afterward"
                    value={getStr("epNeeded")} onChange={v => set("epNeeded", v)} />
                </div>
              </div>

              <div className="pt-2 border-t border-border">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  Reflection (when you are ready)
                </div>
                <div className="space-y-4">
                  <TextBox label="Looking back, was there a moment when you could have intervened earlier?" rows={3}
                    value={getStr("epReflectEarlier")} onChange={v => set("epReflectEarlier", v)} />
                  <TextBox label="One thing I want to try differently next time" rows={3}
                    value={getStr("epTryDifferent")} onChange={v => set("epTryDifferent", v)} />
                  <TextBox label="One compassionate thing I want to say to myself about this episode" rows={3}
                    value={getStr("epCompassion")} onChange={v => set("epCompassion", v)} />
                </div>
              </div>
            </div>
          </Card>
        </Section>

        {/* ── PART 3 ── Monthly Reflection ── */}
        <div className="mt-12 mb-4">
          <div className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-nav-coral">Part 3</div>
          <h3 className="font-[var(--font-display)] text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            Monthly Reflection
          </h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-prose">
            Set aside 10&ndash;15 minutes at the end of each month. There are no right answers.
          </p>
        </div>

        <Section title="Pattern Summary">
          <Card>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <TextLine label="Month / Year" value={getStr("monMonth")} onChange={v => set("monMonth", v)} />
              <TextLine label="Total episodes logged this month" value={getStr("monTotal")} onChange={v => set("monTotal", v)} />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <TextBox label="Most common triggers this month" rows={3}
                value={getStr("monCommonTriggers")} onChange={v => set("monCommonTriggers", v)} />
              <TextBox label="Most effective strategies" rows={3}
                value={getStr("monEffective")} onChange={v => set("monEffective", v)} />
              <TextBox label="What I want to try / change" rows={3}
                value={getStr("monChange")} onChange={v => set("monChange", v)} />
            </div>
          </Card>
        </Section>

        <Section title="Reflection Questions">
          <Card>
            <div className="space-y-5">
              <TextBox label="1. Were there weeks that were harder? What was happening during them (schedule, sleep, demands)?" rows={3}
                value={getStr("monQ1")} onChange={v => set("monQ1", v)} />
              <TextBox label="2. Which role felt most depleted this month? What does that tell you?" rows={3}
                value={getStr("monQ2")} onChange={v => set("monQ2", v)} />
              <TextBox label="3. Was there a meltdown that you managed to catch early? What helped?" rows={3}
                value={getStr("monQ3")} onChange={v => set("monQ3", v)} />
              <TextBox label="4. What environmental accommodations, if any, made a noticeable difference?" rows={3}
                value={getStr("monQ4")} onChange={v => set("monQ4", v)} />
              <TextBox label="5. What do you want to carry forward into next month?" rows={3}
                value={getStr("monQ5")} onChange={v => set("monQ5", v)} />
            </div>
          </Card>
        </Section>

        <Section title="A message to yourself for next month" intro="Something kind, something honest, something useful.">
          <Card>
            <TextBox rows={4} value={getStr("monMessage")} onChange={v => set("monMessage", v)} />
          </Card>
        </Section>

        <p className="text-sm text-muted-foreground italic mt-6 max-w-prose">
          You are learning yourself. That takes courage.
        </p>
      </div>
    </div>
  )
}
