import { DiagonalNav, MobileNav } from "@/components/diagonal-nav"
import { LeftAccent } from "@/components/left-accent"
import { HoverProvider } from "@/components/hover-context"
import { NetworkGraph, type GraphNode } from "@/components/neurodivergence-network"
import { MechanismMatrix } from "@/components/mechanism-matrix"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Neurodivergence Map — Dr. Madrone Love, PsyD",
}

// ── Big network (30 nodes) ───────────────────────────────────────────────────

const BIG_NODES: GraphNode[] = [
  { id: "ocd",         label: "OCD",                     type: "dsm"  },
  { id: "adhd",        label: "ADHD",                    type: "dsm"  },
  { id: "asd",         label: "Autism / ASD",            type: "dsm"  },
  { id: "bpd",         label: "Borderline PD",           type: "dsm"  },
  { id: "dissoc",      label: "Dissociation",            type: "dsm"  },
  { id: "cptsd",       label: "C-PTSD",                  type: "dsm"  },
  { id: "limerence",   label: "Limerence",               type: "ndsm" },
  { id: "md",          label: "Maladaptive daydreaming", type: "ndsm" },
  { id: "gifted",      label: "Giftedness",              type: "ndsm" },
  { id: "alexithymia", label: "Alexithymia",             type: "ndsm" },
  { id: "rsd",         label: "Rejection sensitivity",   type: "ndsm" },
  { id: "flow",        label: "Flow states",             type: "ndsm" },
  { id: "fantasy",     label: "Fantasy proneness",       type: "ndsm" },
  { id: "hsp",         label: "Highly sensitive person", type: "ndsm" },
  { id: "justice",     label: "Justice sensitivity",     type: "ndsm" },
  { id: "cds",         label: "Cog. disengagement",      type: "ndsm" },
  { id: "nvld",        label: "Nonverbal LD",            type: "ndsm" },
  { id: "absorption",  label: "Absorption",              type: "mech" },
  { id: "hyperphant",  label: "Hyperphantasia",          type: "mech" },
  { id: "dmn",         label: "DMN intrusion",           type: "mech" },
  { id: "inferential", label: "Inferential confusion",   type: "mech" },
  { id: "monotropism", label: "Monotropism",             type: "mech" },
  { id: "hyperfocus",  label: "Hyperfocus",              type: "mech" },
  { id: "intero",      label: "Interoceptive diff.",     type: "mech" },
  { id: "motivated",   label: "Motivated imagination",   type: "mech" },
  { id: "prefint",     label: "Preferential interiority",type: "mech" },
  { id: "reality",     label: "Reality monitoring",      type: "mech" },
  { id: "dopamine",    label: "Dopamine dysreg.",        type: "mech" },
  { id: "persist",     label: "Perseverative cognition", type: "mech" },
  { id: "emodysreg",   label: "Emotional dysreg.",       type: "mech" },
]

const BIG_LINKS: [string, string][] = [
  ["ocd","inferential"],["ocd","absorption"],["ocd","hyperphant"],["ocd","motivated"],["ocd","reality"],["ocd","persist"],["ocd","dopamine"],["ocd","alexithymia"],["ocd","emodysreg"],["ocd","justice"],
  ["adhd","dmn"],["adhd","absorption"],["adhd","motivated"],["adhd","dopamine"],["adhd","persist"],["adhd","hyperphant"],["adhd","prefint"],["adhd","hyperfocus"],["adhd","rsd"],["adhd","emodysreg"],["adhd","alexithymia"],["adhd","cptsd"],["adhd","flow"],["adhd","justice"],["adhd","cds"],
  ["asd","monotropism"],["asd","intero"],["asd","absorption"],["asd","hyperphant"],["asd","prefint"],["asd","dmn"],["asd","persist"],["asd","motivated"],["asd","hyperfocus"],["asd","alexithymia"],["asd","emodysreg"],["asd","cptsd"],["asd","flow"],["asd","justice"],["asd","nvld"],["asd","inferential"],
  ["bpd","motivated"],["bpd","absorption"],["bpd","inferential"],["bpd","reality"],["bpd","rsd"],["bpd","emodysreg"],["bpd","dopamine"],["bpd","persist"],["bpd","limerence"],["bpd","cptsd"],["bpd","dissoc"],["bpd","intero"],["bpd","alexithymia"],["bpd","hyperphant"],
  ["dissoc","absorption"],["dissoc","reality"],["dissoc","prefint"],["dissoc","intero"],["dissoc","cptsd"],["dissoc","emodysreg"],
  ["cptsd","intero"],["cptsd","reality"],["cptsd","emodysreg"],["cptsd","absorption"],["cptsd","persist"],["cptsd","dissoc"],["cptsd","hsp"],["cptsd","justice"],
  ["limerence","motivated"],["limerence","absorption"],["limerence","inferential"],["limerence","dopamine"],["limerence","prefint"],["limerence","persist"],["limerence","hyperphant"],["limerence","reality"],["limerence","rsd"],["limerence","emodysreg"],["limerence","alexithymia"],["limerence","fantasy"],
  ["md","absorption"],["md","hyperphant"],["md","motivated"],["md","prefint"],["md","dmn"],["md","reality"],["md","persist"],["md","dissoc"],["md","fantasy"],["md","cds"],
  ["gifted","absorption"],["gifted","hyperphant"],["gifted","motivated"],["gifted","prefint"],["gifted","hyperfocus"],["gifted","persist"],["gifted","dmn"],["gifted","intero"],["gifted","flow"],["gifted","fantasy"],["gifted","hsp"],["gifted","justice"],
  ["alexithymia","intero"],["alexithymia","emodysreg"],
  ["rsd","dopamine"],["rsd","emodysreg"],["rsd","persist"],["rsd","motivated"],["rsd","justice"],
  ["flow","absorption"],["flow","hyperfocus"],["flow","motivated"],["flow","prefint"],["flow","dmn"],["flow","monotropism"],
  ["fantasy","absorption"],["fantasy","hyperphant"],["fantasy","prefint"],["fantasy","reality"],
  ["hsp","absorption"],["hsp","intero"],["hsp","emodysreg"],["hsp","prefint"],["hsp","dmn"],["hsp","hyperphant"],["hsp","cptsd"],["hsp","alexithymia"],["hsp","justice"],
  ["justice","emodysreg"],["justice","persist"],["justice","motivated"],["justice","dopamine"],
  ["cds","absorption"],["cds","dmn"],["cds","prefint"],["cds","reality"],["cds","motivated"],["cds","dissoc"],
  ["nvld","inferential"],["nvld","alexithymia"],["nvld","intero"],["nvld","emodysreg"],["nvld","monotropism"],["nvld","justice"],["nvld","persist"],
  ["emodysreg","dopamine"],["emodysreg","intero"],
  ["dmn","absorption"],["monotropism","absorption"],["monotropism","prefint"],["monotropism","dmn"],["monotropism","hyperfocus"],
  ["hyperfocus","absorption"],["hyperfocus","prefint"],["hyperfocus","dopamine"],
  ["hyperphant","inferential"],["hyperphant","reality"],["inferential","motivated"],["inferential","persist"],
  ["absorption","prefint"],["dopamine","motivated"],["persist","inferential"],["motivated","prefint"],
]

// ── Page ─────────────────────────────────────────────────────────────────────

export default function NeurodiversityPage() {
  return (
    <HoverProvider>
      <main className="relative bg-background overflow-x-hidden">
        <DiagonalNav />
        <MobileNav />
        <LeftAccent />

        <div className="md:mr-[378px]">
          <section className="min-h-screen px-6 lg:px-16 pt-24 md:pt-12 pb-20">
            <div className="max-w-6xl mx-auto w-full">

              {/* Back link */}
              <Link
                href="/"
                className="no-print inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Back to Home
              </Link>

              {/* Header */}
              <div className="mb-16">
                <span className="text-nav-amber font-[var(--font-display)] font-bold tracking-wider text-sm">
                  (01) NEURODIVERSITY
                </span>
                <h1 className="font-[var(--font-display)] text-5xl sm:text-6xl lg:text-7xl font-black text-nav-amber leading-[0.9] tracking-tight mt-4">
                  NEURO-
                  <br />DIVERGENCE
                  <br />MAP
                </h1>
                <p className="text-muted-foreground mt-6 max-w-xl leading-relaxed">
                  Interactive networks showing how diagnoses, non-DSM presentations, and cognitive mechanisms overlap.
                  Click nodes to explore connections. Select two or more to reveal shared mechanisms in gold.
                </p>
              </div>

              <NetworkGraph
                graphId="big"
                nodes={BIG_NODES}
                links={BIG_LINKS}
                title="COMPREHENSIVE OVERLAP MAP"
                description="Full network of 30 nodes — DSM diagnoses, non-DSM constructs, and shared cognitive mechanisms. Drag nodes to rearrange."
              />

              <MechanismMatrix />

            </div>
          </section>
        </div>
      </main>
    </HoverProvider>
  )
}
