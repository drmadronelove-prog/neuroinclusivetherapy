import { ToolPageLayout } from "@/components/tool-page-layout"
import { BlogPostArticle } from "@/components/blog/blog-post"
import type { BlogPost } from "@/components/blog/blog-post"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Relationships — Madrone Love, PsyD",
}

const posts: BlogPost[] = [
  {
    slug: "the-invisible-wound",
    title: "The Invisible Wound: Growing Up as an Emotional Orphan",
    subtitle:
      "Your parents were there. They fed you, drove you to school, showed up for the holidays. And yet something essential was missing — something you may have spent years unable to name.",
    author: "Madrone Love",
    credential: "PsyD",
    category: "Relationships & Inner Life",
    date: "2026",
    blocks: [
      {
        type: "paragraph",
        dropCap: true,
        text: "If you grew up without a parent who was truly curious about your inner world, you may have experienced a profound and invisible loss: the loss of being truly known.",
      },
      {
        type: "paragraph",
        text: "I call this experience emotional orphanhood. Not the orphanhood of physical parental absence, but of presence without curiosity, or understanding. A parent who was in the room but never quite arrived.",
      },
      {
        type: "heading",
        text: "What is an emotional orphan?",
      },
      {
        type: "paragraph",
        text: "An emotional orphan is someone who grew up without a parent who could truly be present with the breadth of their emotions. Happiness might have been acceptable, but sadness and anger was not. Their caregivers may have been physically available, financially responsible, and even well-intentioned. But the capacity for genuine emotional connection, for sitting with a child's feelings without dismissing them, talking over them, or shutting them down, was largely absent.",
      },
      {
        type: "paragraph",
        text: "Psychologist Lindsay Gibson, author of Adult Children of Emotionally Immature Parents (2015), has written extensively on this topic. Gibson describes these caregivers as people who struggle to sit with their own emotional discomfort. As a result, they cannot really be present with their children's emotions either. The child learns quickly: my feelings are too much, too inconvenient, or simply not welcome here.",
      },
      {
        type: "paragraph",
        text: "It is worth pausing here to hold something important: the reasons a parent may have been emotionally unavailable are many, and most of them have nothing to do with not loving their child. A parent may have been neurodivergent in ways that were never identified or supported, making the intuitive reading of social and emotional cues genuinely difficult for them. They may have come from a cultural background where emotions were considered private, even dangerous to express, where stoicism was survival and not coldness. They may have been living with untreated depression, anxiety, or trauma of their own. They may have been struggling with addiction, using substances to manage an inner world they had no other tools for. They may have been carrying generational wounds passed down so quietly they never knew the weight was theirs to question.",
      },
      {
        type: "paragraph",
        text: "None of this erases the impact on the child. Both things are true: your parent may have been doing their imperfect best, and what you needed was not fully available. Understanding the why can soften the story over time. But it does not mean you did not experience a real loss.",
      },
      {
        type: "pull-quote",
        text: "You were not abandoned in the way the world would recognize. You were abandoned in the way that leaves no visible bruise.",
      },
      {
        type: "heading",
        text: "Why it can be so hard to recognize",
      },
      {
        type: "paragraph",
        text: "One of the most disorienting aspects of this experience is how hard it can be to name it. When people think of neglect or emotional deprivation, they often imagine dramatic absence. But what about the parent who was physically present nearly every day? What about the parent who worked hard, who may have even said \"I love you,\" who in some respects was trying their best?",
      },
      {
        type: "paragraph",
        text: "This is where many people get stuck. Because the evidence of your parents' presence is real. You have birthday photos. You remember family dinners. You know your parents were not absent in the conventional sense. And so when a deep, aching loneliness begins to surface in adulthood, you may find yourself dismissing it: But they were there. I have no right to feel this way.",
      },
      {
        type: "paragraph",
        text: "For some, there is another layer of complexity. Perhaps you could see that your parent was struggling. Perhaps you watched them drink to get through the evening, or witnessed their depression as something heavy and ungovernable, or understood from a young age that they were carrying something they had never been helped to put down. When the parent's pain is visible, children often become caretakers of that pain rather than recipients of care themselves. And this can make it even harder to claim the grief later: How can I mourn what I lost when they were suffering too?",
      },
      {
        type: "paragraph",
        text: "The answer is that your grief and their struggle are not in competition. You can hold compassion for what your parent was up against and still tend to the wound of not having been held yourself.",
      },
      {
        type: "paragraph",
        text: "What you needed was not simply proximity. You needed someone who was genuinely curious about what was happening inside you, who could help you name it, make sense of it, and not feel so alone in it. If that was not available, the loss is real, regardless of how many evenings your parent sat at the same table.",
      },
      {
        type: "callout",
        heading: "Signs you may have grown up with emotionally immature parents:",
        text: "Your emotional needs were met with dismissal, lectures, or deflection rather than curiosity. Conflict in the household was avoided, denied, or resolved by someone simply leaving the room. You felt responsible for managing your parent's emotional state. You learned to hide or shrink your inner world to keep the peace. You often felt profoundly alone even when surrounded by family.",
      },
      {
        type: "heading",
        text: "Why being seen is not a luxury",
      },
      {
        type: "paragraph",
        text: "When we think about what children need to survive, we tend to think in the visible and concrete: food, shelter, safety, medical care. Being truly understood emotionally rarely makes that list, and yet decades of research make clear that it is just as foundational, and that its absence leaves a mark that can last a lifetime.",
      },
      {
        type: "paragraph",
        text: "Attachment theory, developed by psychiatrist John Bowlby and later built on by developmental psychologist Mary Ainsworth, holds that human beings are wired from birth to seek closeness with a caregiver, not only for physical protection, but for a felt sense that the world is safe and that they matter. When a caregiver responds to a child's distress with consistent emotional warmth and availability, the child develops what Bowlby called a secure base: a deep knowing, held in the body, that says the world is manageable and I am not alone in it.",
      },
      {
        type: "paragraph",
        text: "This is not a luxury. It is the foundation from which a child learns to explore, to tolerate hard things, to recover after conflict, and eventually to find their own steadiness when emotions rise. Ainsworth's research showed that even subtle, repeated moments of disconnection — a caregiver who is physically present but mentally elsewhere, distracted, dismissive, or simply somewhere far away inside themselves — shape how a child learns to relate to others in lasting ways.",
      },
      {
        type: "paragraph",
        text: "What makes this so easy to overlook is that what was missing leaves no visible trace. No one can photograph it or point to its absence in a report. A child whose parent was emotionally unavailable may have been fed, clothed, and kept safe by every external measure. The deprivation was happening in a way that leaves no record: in the pauses, in the responses that never came, in the feelings that were consistently met with silence or a change of subject. The impact of that invisible deprivation is not invisible at all. It lives in the body, in the patterns people carry into every close relationship they will ever have.",
      },
      {
        type: "heading",
        text: "The cost that accumulates over a lifetime",
      },
      {
        type: "paragraph",
        text: "The tax of this kind of upbringing is enormous, and it often does not become fully visible until adulthood. Here is what was not transmitted: the foundational skill of knowing how to be with your own feelings. When a caregiver consistently helps a child ride out difficult emotions — sitting with them through fear, frustration, disappointment, and shame without shutting it down or leaving the room — the child gradually learns to do that for themselves. They build an inner steadiness.",
      },
      {
        type: "paragraph",
        text: "When that steady presence is absent or inconsistent, the child does not develop a reliable sense of how to find their footing when things feel hard. They may grow up to feel emotions intensely but without a way to find their way through them. Or they may learn to cut off from feeling altogether. Or they may swing between the two, overwhelmed one moment and completely closed off the next.",
      },
      {
        type: "paragraph",
        text: "As adults, this can look like chronic anxiety, difficulty in close relationships, an inner critic that never quiets, a sense of emptiness that is hard to locate or explain, or a pattern of looking to others to soothe feelings that were never given a home inside.",
      },
      {
        type: "paragraph",
        text: "None of this is a character flaw. It is a developmental inheritance.",
      },
      {
        type: "heading",
        text: "The grief that must be allowed",
      },
      {
        type: "paragraph",
        text: "Healing from emotional orphanhood requires something that our culture tends to resist: grief. Not grief for what was taken from you in some dramatic way, but grief for what was simply never there. The parent who could not ask \"how are you feeling?\" and truly want to know. The comfort that never came. The version of yourself that kept waiting to be seen.",
      },
      {
        type: "paragraph",
        text: "This grief is often a grief without a name, because it is loss without a clear event to point to, without a death to mourn, without the social permission that more legible losses are given. People around you may not understand what you are grieving. You may not fully understand it yourself at first.",
      },
      {
        type: "pull-quote",
        text: "To grieve a living parent is one of the lonelier forms of mourning. It asks you to hold love and loss at the same time.",
      },
      {
        type: "paragraph",
        text: "And yet this grief, when it is allowed to move through rather than being pushed down or bypassed, is profoundly clarifying. It begins to free the person from the unconscious project of waiting. Waiting for the parent to finally understand. Waiting to finally feel worthy of their curiosity. When the grief is honored, that waiting can end, and the work of learning to give yourself what you needed can truly begin.",
      },
      {
        type: "heading",
        text: "What the grief can include",
      },
      {
        type: "paragraph",
        text: "Grieving an emotionally unavailable parent is not a single event. It is a layered, nonlinear process. It may include:",
      },
      {
        type: "list",
        items: [
          "Mourning the childhood version of yourself who worked so hard to be enough",
          "Releasing the fantasy of the parent you needed but did not have",
          "Grieving the closeness and safety that was not available to you",
          "Coming to terms with the ways this shaped your relationship with yourself and others",
          "Allowing anger, alongside sadness, without guilt",
          "Discovering, perhaps for the first time, what it feels like to be witnessed",
        ],
      },
      {
        type: "paragraph",
        text: "Therapy can be a powerful space for this grief, particularly approaches that center the relationship itself as part of the healing: a consistent, genuinely present person who meets you where you are and does not look away. Over time, many people find that what began as grief slowly opens into something else — a new relationship with their own emotional life, and a capacity for connection that feels less fraught, more true.",
      },
      {
        type: "heading",
        text: "You were not too much. You were too often alone with it.",
      },
      {
        type: "paragraph",
        text: "If you recognize yourself in these pages, know this: the hunger you have felt for deeper connection, for being truly known, is not a weakness or a wound that defines you. It is evidence of your intact longing for what all humans need. It is the part of you that always knew something was missing, and kept looking anyway.",
      },
      {
        type: "paragraph",
        text: "That longing is a place to begin.",
      },
      {
        type: "footer-note",
        text: "Madrone Love, PsyD, is a licensed clinical psychologist in private practice in Berkeley and San Francisco, specializing in neurodivergent adults, OCD, and trauma. She is an Assistant Professor of Integral Counseling Psychology at the California Institute of Integral Studies and Director of the Sati Center for Buddhist Studies.",
      },
    ],
  },
]

export default function RelationshipsPage() {
  return (
    <ToolPageLayout title="RELATIONSHIPS" color="text-[#C17C74]">
      <div className="space-y-20">
        {posts.map((post) => (
          <BlogPostArticle key={post.slug} post={post} />
        ))}
      </div>
    </ToolPageLayout>
  )
}
