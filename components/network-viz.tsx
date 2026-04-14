"use client"

import { useEffect, useRef } from "react"

// ── Node data ────────────────────────────────────────────────────────────────

const NODE_DATA = [
  // Cognitive mechanisms
  { id: "reality-monitoring",       label: "Reality monitoring",         category: "cognitive" },
  { id: "inferential-confusion",    label: "Inferential confusion",      category: "cognitive" },
  { id: "perseverative-cognition",  label: "Perseverative cognition",    category: "cognitive" },
  { id: "absorption",               label: "Absorption",                 category: "cognitive" },
  { id: "motivated-imagination",    label: "Motivated imagination",      category: "cognitive" },
  { id: "preferential-interiority", label: "Preferential interiority",   category: "cognitive" },
  { id: "dmn-intrusion",            label: "DMN intrusion",              category: "cognitive" },

  // DSM / ICD diagnoses
  { id: "dissociation",   label: "Dissociation",  category: "dsm" },
  { id: "borderline-pd",  label: "Borderline PD", category: "dsm" },
  { id: "cptsd",          label: "C-PTSD",        category: "dsm" },
  { id: "ocd",            label: "OCD",           category: "dsm" },
  { id: "autism",         label: "Autism / ASD",  category: "dsm" },
  { id: "adhd",           label: "ADHD",          category: "dsm" },

  // Non-DSM constructs
  { id: "cog-disengagement",     label: "Cog. disengagement syndrome", category: "nondSM" },
  { id: "fantasy-proneness",     label: "Fantasy proneness",           category: "nondSM" },
  { id: "hyperphantasia",        label: "Hyperphantasia",              category: "nondSM" },
  { id: "maladaptive-daydream",  label: "Maladaptive daydreaming",     category: "nondSM" },
  { id: "limerence",             label: "Limerence",                   category: "nondSM" },
  { id: "giftedness",            label: "Giftedness",                  category: "nondSM" },
  { id: "alexithymia",           label: "Alexithymia",                 category: "nondSM" },
  { id: "hyperfocus",            label: "Hyperfocus",                  category: "nondSM" },
  { id: "emotional-dysreg",      label: "Emotional dysregulation",     category: "nondSM" },
  { id: "rejection-sensitivity", label: "Rejection sensitivity",       category: "nondSM" },
  { id: "interoceptive-diff",    label: "Interoceptive differences",   category: "nondSM" },
  { id: "monotropism",           label: "Monotropism",                 category: "nondSM" },
  { id: "dopamine-dysreg",       label: "Dopamine dysregulation",      category: "nondSM" },
  { id: "justice-sensitivity",   label: "Justice sensitivity",         category: "nondSM" },
  { id: "highly-sensitive",      label: "Highly sensitive person",     category: "nondSM" },
  { id: "nvld",                  label: "Nonverbal learning disorder", category: "nondSM" },
  { id: "flow-states",           label: "Flow states",                 category: "nondSM" },
]

// ── Edge data (shared mechanisms) ───────────────────────────────────────────

const LINK_DATA = [
  // Reality monitoring
  ["reality-monitoring", "dissociation"],
  ["reality-monitoring", "fantasy-proneness"],
  ["reality-monitoring", "hyperphantasia"],
  ["reality-monitoring", "maladaptive-daydream"],
  ["reality-monitoring", "motivated-imagination"],
  ["reality-monitoring", "cptsd"],
  ["reality-monitoring", "inferential-confusion"],

  // Inferential confusion
  ["inferential-confusion", "ocd"],
  ["inferential-confusion", "dissociation"],
  ["inferential-confusion", "motivated-imagination"],
  ["inferential-confusion", "perseverative-cognition"],
  ["inferential-confusion", "cptsd"],
  ["inferential-confusion", "fantasy-proneness"],

  // Perseverative cognition
  ["perseverative-cognition", "ocd"],
  ["perseverative-cognition", "adhd"],
  ["perseverative-cognition", "maladaptive-daydream"],
  ["perseverative-cognition", "hyperfocus"],
  ["perseverative-cognition", "monotropism"],
  ["perseverative-cognition", "emotional-dysreg"],
  ["perseverative-cognition", "cptsd"],
  ["perseverative-cognition", "dopamine-dysreg"],

  // Absorption
  ["absorption", "hyperfocus"],
  ["absorption", "flow-states"],
  ["absorption", "maladaptive-daydream"],
  ["absorption", "hyperphantasia"],
  ["absorption", "fantasy-proneness"],
  ["absorption", "highly-sensitive"],
  ["absorption", "dmn-intrusion"],
  ["absorption", "giftedness"],
  ["absorption", "dissociation"],

  // Motivated imagination
  ["motivated-imagination", "fantasy-proneness"],
  ["motivated-imagination", "limerence"],
  ["motivated-imagination", "maladaptive-daydream"],

  // Preferential interiority
  ["preferential-interiority", "autism"],
  ["preferential-interiority", "maladaptive-daydream"],
  ["preferential-interiority", "fantasy-proneness"],
  ["preferential-interiority", "flow-states"],
  ["preferential-interiority", "hyperfocus"],
  ["preferential-interiority", "monotropism"],
  ["preferential-interiority", "dmn-intrusion"],

  // DMN intrusion
  ["dmn-intrusion", "adhd"],
  ["dmn-intrusion", "maladaptive-daydream"],
  ["dmn-intrusion", "cog-disengagement"],
  ["dmn-intrusion", "hyperfocus"],
  ["dmn-intrusion", "flow-states"],
  ["dmn-intrusion", "fantasy-proneness"],

  // Dissociation
  ["dissociation", "cptsd"],
  ["dissociation", "borderline-pd"],
  ["dissociation", "maladaptive-daydream"],
  ["dissociation", "fantasy-proneness"],
  ["dissociation", "emotional-dysreg"],

  // Borderline PD
  ["borderline-pd", "cptsd"],
  ["borderline-pd", "emotional-dysreg"],
  ["borderline-pd", "rejection-sensitivity"],
  ["borderline-pd", "limerence"],
  ["borderline-pd", "justice-sensitivity"],
  ["borderline-pd", "dopamine-dysreg"],

  // C-PTSD
  ["cptsd", "emotional-dysreg"],
  ["cptsd", "interoceptive-diff"],
  ["cptsd", "rejection-sensitivity"],
  ["cptsd", "alexithymia"],

  // OCD
  ["ocd", "autism"],
  ["ocd", "emotional-dysreg"],
  ["ocd", "maladaptive-daydream"],
  ["ocd", "rejection-sensitivity"],

  // Autism / ASD
  ["autism", "adhd"],
  ["autism", "alexithymia"],
  ["autism", "interoceptive-diff"],
  ["autism", "monotropism"],
  ["autism", "hyperfocus"],
  ["autism", "emotional-dysreg"],
  ["autism", "rejection-sensitivity"],
  ["autism", "justice-sensitivity"],
  ["autism", "nvld"],
  ["autism", "highly-sensitive"],
  ["autism", "giftedness"],

  // ADHD
  ["adhd", "hyperfocus"],
  ["adhd", "dopamine-dysreg"],
  ["adhd", "emotional-dysreg"],
  ["adhd", "rejection-sensitivity"],
  ["adhd", "cog-disengagement"],
  ["adhd", "flow-states"],
  ["adhd", "justice-sensitivity"],
  ["adhd", "giftedness"],

  // Cog. disengagement syndrome
  ["cog-disengagement", "maladaptive-daydream"],
  ["cog-disengagement", "fantasy-proneness"],
  ["cog-disengagement", "hyperfocus"],

  // Fantasy proneness
  ["fantasy-proneness", "maladaptive-daydream"],
  ["fantasy-proneness", "hyperphantasia"],
  ["fantasy-proneness", "limerence"],

  // Hyperphantasia
  ["hyperphantasia", "maladaptive-daydream"],
  ["hyperphantasia", "flow-states"],
  ["hyperphantasia", "giftedness"],

  // Limerence
  ["limerence", "emotional-dysreg"],
  ["limerence", "rejection-sensitivity"],
  ["limerence", "dopamine-dysreg"],

  // Giftedness
  ["giftedness", "flow-states"],
  ["giftedness", "highly-sensitive"],
  ["giftedness", "emotional-dysreg"],

  // Alexithymia
  ["alexithymia", "interoceptive-diff"],
  ["alexithymia", "emotional-dysreg"],
  ["alexithymia", "highly-sensitive"],

  // Hyperfocus
  ["hyperfocus", "monotropism"],
  ["hyperfocus", "flow-states"],
  ["hyperfocus", "dopamine-dysreg"],

  // Emotional dysregulation
  ["emotional-dysreg", "rejection-sensitivity"],
  ["emotional-dysreg", "dopamine-dysreg"],
  ["emotional-dysreg", "justice-sensitivity"],
  ["emotional-dysreg", "highly-sensitive"],

  // Rejection sensitivity
  ["rejection-sensitivity", "dopamine-dysreg"],
  ["rejection-sensitivity", "justice-sensitivity"],

  // Interoceptive differences
  ["interoceptive-diff", "highly-sensitive"],

  // Monotropism
  ["monotropism", "flow-states"],

  // Justice sensitivity
  ["justice-sensitivity", "highly-sensitive"],
  ["justice-sensitivity", "giftedness"],

  // NVLD
  ["nvld", "adhd"],
  ["nvld", "interoceptive-diff"],
]

// ── Colors ───────────────────────────────────────────────────────────────────

const COLORS: Record<string, string> = {
  cognitive: "#c4b5fd", // lavender/purple
  dsm:       "#6ee7b7", // mint green
  nondSM:    "#fdba74", // peach/salmon
}

const LEGEND_ITEMS = [
  { category: "cognitive", label: "Cognitive mechanism" },
  { category: "dsm",       label: "DSM / ICD diagnosis" },
  { category: "nondSM",    label: "Non-DSM construct" },
]

// ── Label wrap ───────────────────────────────────────────────────────────────

function wrapWords(text: string, maxChars = 13): string[] {
  const words = text.split(" ")
  const lines: string[] = []
  let cur = ""
  for (const w of words) {
    if (!cur) { cur = w; continue }
    if ((cur + " " + w).length <= maxChars) { cur += " " + w }
    else { lines.push(cur); cur = w }
  }
  if (cur) lines.push(cur)
  return lines
}

// ── Component ────────────────────────────────────────────────────────────────

export function NetworkViz() {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return

    let active = true

    import("d3").then((d3) => {
      if (!active || !svgRef.current || !containerRef.current) return

      // ── Dimensions
      const W = 1000
      const H = 680

      // ── Deep-clone data so D3 can mutate
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const nodes: any[] = NODE_DATA.map((d) => ({ ...d }))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const links: any[] = LINK_DATA.map(([s, t]) => ({ source: s, target: t }))

      // ── Degree map for node sizing
      const degree: Record<string, number> = {}
      LINK_DATA.forEach(([s, t]) => {
        degree[s] = (degree[s] || 0) + 1
        degree[t] = (degree[t] || 0) + 1
      })
      const getR = (id: string) => Math.max(7, Math.min(16, 5 + Math.sqrt(degree[id] || 1) * 1.6))

      // ── SVG setup
      const svgEl = d3.select(svgRef.current)
      svgEl.selectAll("*").remove()
      svgEl.attr("viewBox", `0 0 ${W} ${H}`)

      // ── Defs: glow filter + arrow (unused but reserved)
      const defs = svgEl.append("defs")
      const glow = defs.append("filter").attr("id", "glow").attr("x", "-50%").attr("y", "-50%").attr("width", "200%").attr("height", "200%")
      glow.append("feGaussianBlur").attr("stdDeviation", "4").attr("result", "coloredBlur")
      const feMerge = glow.append("feMerge")
      feMerge.append("feMergeNode").attr("in", "coloredBlur")
      feMerge.append("feMergeNode").attr("in", "SourceGraphic")

      // ── Force simulation
      const simulation = d3.forceSimulation(nodes)
        .force("link",    d3.forceLink(links).id((d: any) => d.id).distance(90).strength(0.4))
        .force("charge",  d3.forceManyBody().strength(-320))
        .force("center",  d3.forceCenter(W / 2, H / 2))
        .force("collide", d3.forceCollide().radius((d: any) => getR(d.id) + 18))
        .force("x",       d3.forceX(W / 2).strength(0.04))
        .force("y",       d3.forceY(H / 2).strength(0.04))

      // ── Links layer
      const linkGroup = svgEl.append("g").attr("class", "links")
      const linkEl = linkGroup.selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke", "#2a2a2a")
        .attr("stroke-width", 1)
        .attr("stroke-opacity", 0.7)

      // ── Nodes layer
      const nodeGroup = svgEl.append("g").attr("class", "nodes")

      // ── Selection state (mutable closure — no React re-render needed)
      const selected = new Set<string>()

      function updateHighlights() {
        const hasSel = selected.size > 0

        // Find nodes shared between ALL selected (connected to every selected node)
        const sharedSet = new Set<string>()
        if (selected.size >= 2) {
          const selArr = [...selected]
          nodes.forEach((n) => {
            if (selected.has(n.id)) return
            const adjacentToAll = selArr.every((sid) =>
              links.some(
                (l) =>
                  (l.source.id === n.id && l.target.id === sid) ||
                  (l.target.id === n.id && l.source.id === sid)
              )
            )
            if (adjacentToAll) sharedSet.add(n.id)
          })
        }

        // Nodes
        circleEl
          .attr("fill", (d: any) => {
            if (selected.has(d.id) || sharedSet.has(d.id)) return "#FFD700"
            return COLORS[d.category]
          })
          .attr("r", (d: any) => {
            if (selected.has(d.id) || sharedSet.has(d.id)) return getR(d.id) + 3
            return getR(d.id)
          })
          .attr("filter", (d: any) =>
            selected.has(d.id) || sharedSet.has(d.id) ? "url(#glow)" : null
          )
          .attr("opacity", (d: any) => {
            if (!hasSel) return 1
            if (selected.has(d.id) || sharedSet.has(d.id)) return 1
            return 0.25
          })

        // Labels
        labelGroup
          .attr("opacity", (d: any) => {
            if (!hasSel) return 1
            if (selected.has(d.id) || sharedSet.has(d.id)) return 1
            return 0.2
          })

        // Links
        linkEl
          .attr("stroke", (d: any) => {
            const s = d.source.id, t = d.target.id
            const sSelected = selected.has(s), tSelected = selected.has(t)
            const sShared = sharedSet.has(s), tShared = sharedSet.has(t)
            if ((sSelected && tSelected) ||
                (sSelected && tShared) ||
                (tSelected && sShared)) return "#FFD700"
            return "#2a2a2a"
          })
          .attr("stroke-width", (d: any) => {
            const s = d.source.id, t = d.target.id
            const sSelected = selected.has(s), tSelected = selected.has(t)
            const sShared = sharedSet.has(s), tShared = sharedSet.has(t)
            if ((sSelected && tSelected) ||
                (sSelected && tShared) ||
                (tSelected && sShared)) return 2
            return 1
          })
          .attr("stroke-opacity", (d: any) => {
            if (!hasSel) return 0.7
            const s = d.source.id, t = d.target.id
            const sSelected = selected.has(s), tSelected = selected.has(t)
            const sShared = sharedSet.has(s), tShared = sharedSet.has(t)
            if ((sSelected && tSelected) ||
                (sSelected && tShared) ||
                (tSelected && sShared)) return 1
            return 0.07
          })
      }

      // ── Drag behavior
      function drag(sim: typeof simulation) {
        return d3.drag<SVGCircleElement, any>()
          .on("start", (event, d) => {
            if (!event.active) sim.alphaTarget(0.3).restart()
            d.fx = d.x; d.fy = d.y
          })
          .on("drag", (event, d) => {
            d.fx = event.x; d.fy = event.y
          })
          .on("end", (event, d) => {
            if (!event.active) sim.alphaTarget(0)
            d.fx = null; d.fy = null
          })
      }

      // ── Node circles
      const circleEl = nodeGroup.selectAll<SVGCircleElement, any>("circle")
        .data(nodes)
        .join("circle")
        .attr("r", (d: any) => getR(d.id))
        .attr("fill", (d: any) => COLORS[d.category])
        .attr("stroke", "#0d0d0d")
        .attr("stroke-width", 1.5)
        .attr("cursor", "pointer")
        .call(drag(simulation))
        .on("click", (event: MouseEvent, d: any) => {
          event.stopPropagation()
          if (selected.has(d.id)) selected.delete(d.id)
          else selected.add(d.id)
          updateHighlights()
        })

      // ── Labels
      const labelGroup = svgEl.append("g").attr("class", "labels").attr("pointer-events", "none")
      const labelEl = labelGroup.selectAll<SVGTextElement, any>("text")
        .data(nodes)
        .join("text")
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-family", "DM Sans, sans-serif")
        .attr("font-size", "9")
        .attr("font-weight", "500")
        .each(function(d: any) {
          const el = d3.select(this)
          const lines = wrapWords(d.label)
          const lineH = 11
          const startDy = getR(d.id) + 4
          lines.forEach((line, i) => {
            el.append("tspan")
              .attr("x", 0)
              .attr("dy", i === 0 ? startDy : lineH)
              .text(line)
          })
        })

      // ── Click on background to deselect
      svgEl.on("click", () => {
        selected.clear()
        updateHighlights()
      })

      // ── Tick
      simulation.on("tick", () => {
        linkEl
          .attr("x1", (d: any) => d.source.x)
          .attr("y1", (d: any) => d.source.y)
          .attr("x2", (d: any) => d.target.x)
          .attr("y2", (d: any) => d.target.y)

        circleEl
          .attr("cx", (d: any) => d.x)
          .attr("cy", (d: any) => d.y)

        labelEl
          .attr("transform", (d: any) => `translate(${d.x},${d.y})`)
      })
    })

    return () => { active = false }
  }, [])

  return (
    <section className="mt-16">
      <h2 className="font-[var(--font-display)] text-4xl sm:text-5xl font-black text-foreground leading-tight tracking-tight mb-2">
        NEUROINCLUSIVE CARE
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        Click nodes to select. Select two or more to see shared mechanisms in gold.
      </p>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-4">
        {LEGEND_ITEMS.map((item) => (
          <div key={item.category} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: COLORS[item.category] }}
            />
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full flex-shrink-0 bg-yellow-400" />
          <span className="text-xs text-muted-foreground">Selected / shared</span>
        </div>
      </div>

      {/* Visualization */}
      <div
        ref={containerRef}
        className="w-full rounded-lg overflow-hidden"
        style={{ background: "#0d0d0d" }}
      >
        <svg
          ref={svgRef}
          style={{ display: "block", width: "100%", height: "clamp(480px, 60vw, 700px)" }}
        />
      </div>
    </section>
  )
}
