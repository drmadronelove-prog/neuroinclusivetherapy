import { ToolPageLayout } from "@/components/tool-page-layout"
import { BlogPostArticle } from "@/components/blog/blog-post"
import type { BlogPost } from "@/components/blog/blog-post"

export const metadata = {
  title: "Blog | Madrone Love, PsyD",
  description: "Thoughts on neurodivergent-affirming therapy, mental wellness, and living differently.",
}

// ── Posts ─────────────────────────────────────────────────────────────────────

const posts: BlogPost[] = [
  {
    slug: "the-inference-gap",
    title: "The Inference Gap: Why Your Brain Fills in the Blanks – and What Happens When It Goes Wrong",
    subtitle: "We never receive reality directly. Every moment, our brains are taking incomplete information and filling in the rest. That gap is where a lot of suffering lives.",
    author: "Madrone Love",
    credential: "PsyD",
    category: "OCD & Neurodivergence",
    date: "2025",
    blocks: [
      {
        type: "paragraph",
        dropCap: true,
        text: "Have you ever asked an AI to create an image for you? You describe exactly what you want — a calm lake at sunset, soft light, maybe a small wooden dock. And what comes back is something. A lake, sure. But the colors are wrong, the mood is off, and there's an inexplicable mountain range in the background that you definitely did not ask for. The AI did not fail. It did something perfectly reasonable with your words. It just did not do what you meant. That gap — between what you communicated and what was understood — is what I call the inference gap. And while it might be a minor frustration when you're prompting an AI, for many people that same gap is one of the most significant sources of suffering in their daily lives.",
      },
      {
        type: "heading",
        text: "What Is the Inference Gap?",
      },
      {
        type: "paragraph",
        text: "We never receive reality directly. Every moment, our brains are taking in partial, incomplete information and filling in the rest. We read between the lines, make assumptions, interpret tone, guess at intention. Most of the time this happens so automatically that we don't even notice it's happening. That space between what's actually there and what we make of it — that's the inference gap. And filling it is something every human mind does, constantly, every day. The question isn't whether we fill it. The question is what we fill it with. For most people, in most situations, the gap gets filled well enough. We're mostly right, or right enough, and life moves on. But for a significant portion of people — including many of the clients I work with as a clinical psychologist — the inference gap has become a site of real pain. Not because they're filling it wrong, exactly. But because their nervous systems have learned, often for very good reasons, that the gap is dangerous.",
      },
      {
        type: "heading",
        text: "When the Gap Becomes a Threat",
      },
      {
        type: "paragraph",
        text: "Here's what I've observed after years of working with people with OCD, neurodivergent profiles, and trauma histories: for these populations, it isn't only what fills the gap that causes suffering. It's the gap itself. The moment of uncertainty — before the meaning lands — activates something. A history. A felt sense of: I've been here before. And last time it cost me something. Think about what it means to grow up consistently misreading social situations. To be told, again and again, that you got it wrong — that you misunderstood the tone, missed the point, responded in a way that confused or upset people. Over time, you don't just approach ambiguous social moments with uncertainty. You approach them with dread. The gap has become evidence, before anything has even been inferred, that something bad is about to happen. That's inference gap sensitivity — the degree to which a nervous system is attuned to, and threatened by, the uncertainty of not yet knowing what something means.",
      },
      {
        type: "heading",
        text: "OCD: When the Gap Fills Itself with Worst-Case Scenarios",
      },
      {
        type: "paragraph",
        text: "If you or someone you love has OCD, you know this experience intimately. A thought arrives: what if I left the stove on? And before any deliberate reasoning can occur, the mind has already traveled — to smoke, to fire, to catastrophic loss. The gap between \"I might have forgotten\" and \"everything could be destroyed\" closes in an instant, and the closure feels not like imagination but like something close to fact. In my clinical work I draw heavily on a framework called inference-based cognitive behavioral therapy, or I-CBT, developed by Frederick Aardema and Kieron O'Connor. Their central insight is that OCD is not primarily an anxiety disorder — it is a reasoning disorder. The problem isn't fear. The problem is that the gap between present reality and imagined possibility collapses. What might be true gets treated as if it is true.",
      },
      {
        type: "paragraph",
        text: "And the gap doesn't fill randomly. It fills according to what Aardema and O'Connor call the feared self — a story about who you might secretly be. Dangerous. Negligent. Unloving. Contaminated. Every intrusive thought is essentially asking: remember this part of yourself? The part you've been trying not to be? That feared self didn't come from nowhere. It was usually constructed — often in childhood, often under conditions of blame or shame or relational rupture — as a way of making sense of painful experiences. Someone communicated, explicitly or implicitly, that something was wrong with you. And a young mind, without the resources to question that verdict, absorbed it. Now, decades later, the inference gap keeps reopening the same case.",
      },
      {
        type: "heading",
        text: "Neurodivergence: Navigating a World Built for Different Inferential Wiring",
      },
      {
        type: "paragraph",
        text: "For autistic people, the inference gap takes a different but equally significant form. The neurotypical social world runs on shared inferential conventions — implicit meaning, emotional subtext, the ability to read between lines that were never written. These conventions are so embedded in how most people communicate that they're invisible to the people who share them. But when you don't share them, the gap is everywhere. Damian Milton, an autistic researcher, has described this as the double empathy problem: the communicative difficulty between autistic and non-autistic people isn't a deficit on one side. It's a mismatch — two different inference systems trying to read each other, each filling gaps with their own priors, each finding the other's output strange or incomplete. The asymmetry is in who gets to define correct.",
      },
      {
        type: "paragraph",
        text: "For ADHD, the inference gap looks different again. The ADHD nervous system, as clinician William Dodson describes it, is interest-based — it assigns attention according to what's novel, personally meaningful, or emotionally activating, rather than what's externally important. Some gaps get elaborated richly and deeply. Others simply don't get processed at all. This creates a characteristic pattern: not filled with threat, but incompletely filled, or filled with whatever interpretation was most immediately available rather than most accurate. And then there is rejection sensitive dysphoria — the way the ADHD nervous system can read a neutral comment, a brief pause, an ambiguous tone, and fill that gap instantly with the interpretation that it was rejection or criticism. The response arrives before deliberation is possible, and its intensity can be overwhelming.",
      },
      {
        type: "heading",
        text: "Imagination Makes It More or Less Vivid",
      },
      {
        type: "paragraph",
        text: "One more variable that matters enormously, and that almost no one talks about: where you fall on the imagination spectrum. Some people have what's called hyperphantasia — mental imagery so vivid that when they close their eyes and picture something, it arrives with near-photographic clarity. Color, texture, movement, emotional weight. For these people, when the inference gap fills with a scary scenario, it doesn't feel like a thought. It feels like something they're almost watching happen. Others have aphantasia — little or no voluntary mental imagery at all. When they fill an inference gap, they do it conceptually, verbally. They know something feels wrong without seeing it as wrong. Neither is better or worse. But they're clinically different. Interestingly, research suggests that neurodivergent nervous systems are overrepresented at both ends of this spectrum — both highly vivid and nearly absent imagery are more common in autistic people than in the general population. Which means we can't assume, clinically, which kind of inferential filling a client is experiencing.",
      },
      {
        type: "heading",
        text: "What This Means for Healing",
      },
      {
        type: "paragraph",
        text: "I want to name something clearly: inference gap sensitivity is not a flaw. It is not evidence of irrationality or weakness or a broken mind. It is a nervous system that learned, under real conditions, that ambiguity leads to threat. The calibration was accurate once. The problem is that it's still running on old data. Healing, in this framework, is not about eliminating the sensitivity. It's about updating the calibration — slowly, relationally, in the context of enough safety to try out a new relationship to the gap. Several evidence-based approaches do this work: I-CBT helps people with OCD recognize when they've crossed from present reality into imagined possibility — and to rebuild trust in their own direct experience as evidence. Mindfulness practice builds the capacity to notice that the gap is filling — to observe that an interpretation has been made — before acting on it as if it were fact. And all of these are supported, at the most basic level, by clear and direct communication: saying what you mean, without relying on implication or context that the other person may not share.",
      },
      {
        type: "heading",
        text: "Why This Matters",
      },
      {
        type: "paragraph",
        text: "I've spent a lot of time thinking about what connects the people I work with — people with OCD, autistic adults, people with ADHD, people carrying the weight of early trauma. On the surface they look like different populations with different needs. But underneath, I keep finding the same thing: a nervous system that has learned to treat the gap as dangerous. A history of consequences for filling it wrong. And a present life organized, in small and large ways, around avoiding the gap or closing it as fast as possible. The AI image prompt is a funny entry point into something serious. But that's exactly why it works. We've all been there. We've all felt the minor frustration of being misread, of having our meaning not land. For many people, that's not a minor frustration. It's the texture of every day. Understanding the inference gap doesn't fix that. But it names something real — and naming it, in my experience, is often where healing begins.",
      },
      {
        type: "footer-note",
        text: "Madrone Love, PsyD, is a licensed clinical psychologist in private practice in Berkeley and San Francisco, specializing in neurodivergent adults, OCD, and trauma. She is an Assistant Professor of Integral Counseling Psychology at the California Institute of Integral Studies and Director of the Sati Center for Buddhist Studies.",
      },
    ],
  },
  {
    slug: "when-imagination-becomes-evidence",
    title: "When Imagination Becomes Evidence",
    subtitle: "How OCD hijacks the mind's ability to simulate — and why vivid imagination isn't the same as dangerous reality",
    author: "Madrone Love",
    credential: "PsyD",
    category: "OCD & the Imagination",
    date: "2025",
    blocks: [
      {
        type: "paragraph",
        dropCap: true,
        text: "Most people, when they imagine something frightening, experience a recognizable gap between the image and reality. The image is vivid, perhaps even disturbing — but it remains an image. For people with OCD, that gap can close in ways that are genuinely difficult to explain to someone who hasn't experienced it. The imagination doesn't just represent a feared scenario; it begins to function as evidence that the scenario is real, imminent, or already underway.",
      },
      {
        type: "paragraph",
        text: "This is not a failure of intelligence or insight. Many people with OCD know, intellectually, that their feared outcome is unlikely. The problem is that knowing and feeling operate through different systems — and in OCD, the felt sense of danger is driven not by logic but by the quality and vividness of the mental image itself.",
      },
      {
        type: "heading",
        text: "The Inference-Based Model",
      },
      {
        type: "paragraph",
        text: "The inference-based model of OCD (IBA), developed by Kieron O'Connor and Frederick Aardema, proposes that OCD is rooted in a specific kind of reasoning error: inferential confusion. In inferential confusion, the person treats imagined possibilities as if they were perceptual realities. The felt conclusion — \"I might have contaminated something,\" \"I might hurt someone,\" \"I might not have locked the door\" — is generated not by observable evidence, but by a narrative the mind constructs.",
      },
      {
        type: "paragraph",
        text: "What makes OCD narratives so compelling is that they are often internally coherent. The person isn't experiencing random, nonsensical fears. They have constructed a plausible story — one that draws on real knowledge about the world, real values, real memories — and that story has the texture of truth. The question isn't whether the scenario is logically possible. It almost always is. The question is whether the evidence justifying the belief actually comes from the senses, or entirely from imagination.",
      },
      {
        type: "pull-quote",
        text: "\"I can picture it\" becomes, functionally, \"it could happen\" — and that possibility demands a response.",
      },
      {
        type: "heading",
        text: "Absorption and the Permeable Border",
      },
      {
        type: "paragraph",
        text: "Psychological absorption — the tendency to become fully immersed in imaginative or internal experience — is a trait that varies across individuals. People high in absorption become genuinely transported by novels, music, and imagery. The boundary between self and experience becomes permeable. This is, in many contexts, a gift: it underlies empathy, creativity, and deep aesthetic engagement.",
      },
      {
        type: "paragraph",
        text: "Research by Auke Tellegen and Gilbert Atkinson identified absorption as a stable personality trait and linked it to heightened responsiveness to imagined content. For some people, imagining a scenario produces physiological and emotional responses comparable to experiencing it directly. The body does not reliably distinguish between vividly imagined threat and perceived threat.",
      },
      {
        type: "paragraph",
        text: "In OCD, this permeability becomes a vulnerability. When the imagination generates a feared scenario with enough detail and emotional force, the nervous system responds as though the scenario is happening. The fear is not a misinterpretation of imagination — it is a real fear response, generated by imagination that has crossed a threshold into something that functions like perception.",
      },
      {
        type: "heading",
        text: "The Vividness Dimension",
      },
      {
        type: "paragraph",
        text: "Not all mental imagery is equal. Vividness — the degree to which imagery resembles actual perception in clarity, detail, and sensory richness — varies considerably across individuals and states. High-vividness imagery activates overlapping neural systems with actual perception. When you vividly imagine biting into a lemon, you salivate. When you vividly imagine falling, your body may tense.",
      },
      {
        type: "paragraph",
        text: "For people with OCD, obsessional imagery tends to be particularly vivid, detailed, and involuntary. The person doesn't choose to generate a graphic intrusive thought — it arrives, fully formed, with sensory texture. And because vividness is itself a cue the brain uses to assess reality (real things are vivid; distant or imagined things are fuzzy), high-vividness intrusions can be interpreted, implicitly, as more real and therefore more dangerous.",
      },
      {
        type: "heading",
        text: "Three Routes to One Problem",
      },
      {
        type: "paragraph",
        text: "Understanding OCD through the lens of imagination, absorption, and inferential confusion suggests three interlocking contributors to why intrusive thoughts become obsessions for some people and not others. First, the vividness and involuntary quality of the imagery makes it feel real. Second, high absorption means the person becomes genuinely immersed in the feared scenario rather than observing it from a safe distance. Third, inferential confusion leads the person to treat the vividness itself as evidence — to reason from the felt reality of the image to conclusions about actual danger.",
      },
      {
        type: "paragraph",
        text: "Treatment approaches that address only content — challenging the logic of the feared thought — often miss this. The problem isn't primarily that the thought is logically flawed. The problem is that the imagination has temporarily overwhelmed the capacity to distinguish what is sensed from what is constructed. Effective treatment, whether through ERP, IBA, or their integration, works in part by helping the person re-establish that distinction — to locate themselves in observable reality, in what the senses actually report, rather than in the narrative the mind has generated.",
      },
      {
        type: "paragraph",
        text: "The imagination is not the enemy. In OCD, it is a capacity that has been pressed into the service of fear. The goal of treatment is not to suppress imagery but to loosen its authority — to restore the gap between imagining something and believing it.",
      },
      {
        type: "footer-note",
        text: "References: O'Connor, K., & Aardema, F. (2012). Clinician's Handbook for Obsessive Compulsive Disorder: Inference-Based Therapy. Wiley-Blackwell. — Tellegen, A., & Atkinson, G. (1974). Openness to absorbing and self-altering experiences (\"absorption\"), a trait related to hypnotic susceptibility. Journal of Abnormal Psychology, 83(3), 268–277.",
      },
    ],
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  return (
    <ToolPageLayout title="BLOG" color="text-nav-teal">
      <div className="space-y-20">
        {posts.map((post) => (
          <BlogPostArticle key={post.slug} post={post} />
        ))}
      </div>
    </ToolPageLayout>
  )
}
