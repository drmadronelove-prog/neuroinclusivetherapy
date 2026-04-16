"use client"

import { useEffect, useRef } from "react"

type NodeType = "dsm" | "ndsm" | "mech"

export interface GraphNode {
  id: string
  label: string
  type: NodeType
}

export interface NetworkGraphProps {
  graphId: string
  nodes: GraphNode[]
  links: [string, string][]
  title: string
  description: string
  height?: string
}

const COLORS: Record<NodeType, string> = {
  dsm:  "#6ee7b7",
  ndsm: "#fdba74",
  mech: "#c4b5fd",
}

const LEGEND = [
  { type: "dsm"  as NodeType, label: "DSM / ICD diagnosis" },
  { type: "ndsm" as NodeType, label: "Non-DSM construct" },
  { type: "mech" as NodeType, label: "Cognitive mechanism" },
]

function wrapWords(text: string, maxChars = 12): string[] {
  const words = text.split(" ")
  const lines: string[] = []
  let cur = ""
  for (const w of words) {
    if (!cur) { cur = w; continue }
    if ((cur + " " + w).length <= maxChars) cur += " " + w
    else { lines.push(cur); cur = w }
  }
  if (cur) lines.push(cur)
  return lines
}

export function NetworkGraph({
  graphId,
  nodes,
  links,
  title,
  description,
  height = "clamp(500px, 85vw, 850px)",
}: NetworkGraphProps) {
  const svgRef   = useRef<SVGSVGElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!svgRef.current) return
    let active = true

    import("d3").then((d3) => {
      if (!active || !svgRef.current) return

      // ── Canvas ────────────────────────────────────────────────────────────
      // 1000×1000 viewBox. At a ~750px container the scale is 0.75:
      //   node radius 45–62px → 34–47px visual  (readable)
      //   font 16px            → 12px visual     (readable)
      //   collide 88px (fixed) → 30 nodes need 73% of 1 000 000px² → fits ✓
      //   gap between avg nodes ≈ 52px visual
      const W = 1000
      const H = 1000

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const d3nodes: any[] = nodes.map(n => ({ ...n }))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const d3links: any[] = links.map(([s, t]) => ({ source: s, target: t }))

      const degree: Record<string, number> = {}
      links.forEach(([s, t]) => {
        degree[s] = (degree[s] || 0) + 1
        degree[t] = (degree[t] || 0) + 1
      })

      // Radius scaled by connectivity — busier hubs are slightly larger
      const getR = (id: string) => Math.max(45, Math.min(62, 33 + Math.sqrt(degree[id] || 1) * 5))

      // Pre-place nodes in a regular grid so simulation starts spread out
      const padding = 80
      const cols = Math.ceil(Math.sqrt(d3nodes.length))  // 6 cols × 5 rows for 30 nodes
      const rows = Math.ceil(d3nodes.length / cols)
      d3nodes.forEach((node: any, i: number) => {
        node.x = padding + (i % cols + 0.5) * ((W - padding * 2) / cols) + (Math.random() - 0.5) * 30
        node.y = padding + (Math.floor(i / cols) + 0.5) * ((H - padding * 2) / rows) + (Math.random() - 0.5) * 30
      })

      const svg = d3.select(svgRef.current)
      svg.selectAll("*").remove()
      svg.attr("viewBox", `0 0 ${W} ${H}`)

      const filterId = `glow-${graphId}`
      const defs = svg.append("defs")
      const glow = defs.append("filter")
        .attr("id", filterId)
        .attr("x", "-50%").attr("y", "-50%")
        .attr("width", "200%").attr("height", "200%")
      glow.append("feGaussianBlur").attr("stdDeviation", "3").attr("result", "coloredBlur")
      const fm = glow.append("feMerge")
      fm.append("feMergeNode").attr("in", "coloredBlur")
      fm.append("feMergeNode").attr("in", "SourceGraphic")

      const sim = d3.forceSimulation(d3nodes)
        .alphaDecay(0.012)
        // Fixed 88px collide — independent of node size so math stays clean
        .force("link",    d3.forceLink(d3links).id((d: any) => d.id).distance(160).strength(0.22))
        .force("charge",  d3.forceManyBody().strength(-600))
        .force("collide", d3.forceCollide().radius(88))
        .force("x",       d3.forceX(W / 2).strength(0.003))
        .force("y",       d3.forceY(H / 2).strength(0.003))

      const linkG = svg.append("g")
      const linkEl = linkG.selectAll("line")
        .data(d3links)
        .join("line")
        .attr("stroke", "#cccccc")
        .attr("stroke-width", 1)
        .attr("stroke-opacity", 0.8)

      const nodeG = svg.append("g")
      const selected = new Set<string>()

      function getAdjacent(): Set<string> {
        const adj = new Set<string>()
        if (selected.size === 0) return adj
        d3nodes.forEach(n => {
          if (selected.has(n.id)) return
          const connected = d3links.some(l =>
            (l.source.id === n.id && selected.has(l.target.id)) ||
            (l.target.id === n.id && selected.has(l.source.id))
          )
          if (connected) adj.add(n.id)
        })
        return adj
      }

      function getShared(): Set<string> {
        const shared = new Set<string>()
        if (selected.size < 2) return shared
        const selArr = [...selected]
        d3nodes.forEach(n => {
          if (selected.has(n.id)) return
          const adjToAll = selArr.every(sid =>
            d3links.some(l =>
              (l.source.id === n.id && l.target.id === sid) ||
              (l.target.id === n.id && l.source.id === sid)
            )
          )
          if (adjToAll) shared.add(n.id)
        })
        return shared
      }

      function updateLabel(highlighted: Set<string>) {
        if (!labelRef.current) return
        if (selected.size === 0) {
          labelRef.current.textContent = "Click any node to highlight its connections. Select two or more to see shared mechanisms."
          return
        }
        const selLabels = d3nodes.filter(n => selected.has(n.id)).map(n => n.label)
        if (selected.size === 1) {
          const connLabels = d3nodes.filter(n => highlighted.has(n.id)).map(n => n.label)
          labelRef.current.textContent = connLabels.length
            ? `${selLabels[0]} → connected: ${connLabels.join(", ")}`
            : `Selected: ${selLabels[0]}`
          return
        }
        if (highlighted.size === 0) {
          labelRef.current.textContent = `Selected: ${selLabels.join(", ")}`
          return
        }
        const sharedLabels = d3nodes.filter(n => highlighted.has(n.id)).map(n => n.label)
        labelRef.current.textContent = `${selLabels.join(" + ")} → shared: ${sharedLabels.join(", ")}`
      }

      function updateHighlights() {
        const adjacent = getAdjacent()
        const shared   = getShared()
        const highlighted = selected.size >= 2 ? shared : adjacent
        const hasSel = selected.size > 0

        const isGold = (id: string) => selected.has(id) || highlighted.has(id)

        circleEl
          .attr("fill",   (d: any) => isGold(d.id) ? "#FFD700" : COLORS[d.type as NodeType])
          .attr("r",      (d: any) => isGold(d.id) ? getR(d.id) + 3 : getR(d.id))
          .attr("filter", (d: any) => isGold(d.id) ? `url(#${filterId})` : null)
          .attr("opacity",(d: any) => !hasSel ? 1 : isGold(d.id) ? 1 : 0.2)

        labelG2.attr("opacity", (d: any) => !hasSel ? 1 : isGold(d.id) ? 1 : 0.12)

        linkEl
          .attr("stroke", (d: any) => {
            const s = d.source.id, t = d.target.id
            return (isGold(s) && isGold(t)) ? "#FFD700" : "#cccccc"
          })
          .attr("stroke-width", (d: any) => {
            const s = d.source.id, t = d.target.id
            return (isGold(s) && isGold(t)) ? 2.2 : 1
          })
          .attr("stroke-opacity", (d: any) => {
            if (!hasSel) return 0.7
            const s = d.source.id, t = d.target.id
            return (isGold(s) && isGold(t)) ? 1 : 0.05
          })

        updateLabel(highlighted)
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function drag(simulation: any) {
        return d3.drag<SVGCircleElement, any>()
          .on("start", (e, d) => { if (!e.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y })
          .on("drag",  (e, d) => { d.fx = e.x; d.fy = e.y })
          .on("end",   (e, d) => { if (!e.active) simulation.alphaTarget(0); d.fx = null; d.fy = null })
      }

      const circleEl = nodeG.selectAll<SVGCircleElement, any>("circle")
        .data(d3nodes)
        .join("circle")
        .attr("r",            (d: any) => getR(d.id))
        .attr("fill",         (d: any) => COLORS[d.type as NodeType])
        .attr("stroke",       "#0d0d0d")
        .attr("stroke-width", 1.5)
        .attr("cursor",       "pointer")
        .call(drag(sim))
        .on("click", (e: MouseEvent, d: any) => {
          e.stopPropagation()
          selected.has(d.id) ? selected.delete(d.id) : selected.add(d.id)
          updateHighlights()
        })

      const labelG2 = svg.append("g").attr("pointer-events", "none")
      const labelEl = labelG2.selectAll<SVGTextElement, any>("text")
        .data(d3nodes)
        .join("text")
        .attr("text-anchor", "middle")
        .attr("fill",        "rgba(20,20,20,0.88)")
        .attr("font-family", "DM Sans, sans-serif")
        .attr("font-size",   "16")
        .attr("font-weight", "700")
        .each(function(d: any) {
          const el = d3.select(this)
          const lines = wrapWords(d.label)
          const lineH = 19
          const startDy = -(lines.length - 1) * lineH / 2
          lines.forEach((line, i) => {
            el.append("tspan")
              .attr("x", 0)
              .attr("dy", i === 0 ? startDy : 19)
              .text(line)
          })
        })

      svg.on("click", () => { selected.clear(); updateHighlights() })

      sim.on("tick", () => {
        // Clamp every node inside the viewBox
        d3nodes.forEach((d: any) => {
          const r = getR(d.id)
          d.x = Math.max(r, Math.min(W - r, d.x))
          d.y = Math.max(r, Math.min(H - r, d.y))
        })
        linkEl
          .attr("x1", (d: any) => d.source.x).attr("y1", (d: any) => d.source.y)
          .attr("x2", (d: any) => d.target.x).attr("y2", (d: any) => d.target.y)
        circleEl.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y)
        labelEl.attr("transform", (d: any) => `translate(${d.x},${d.y})`)
      })
    })

    return () => { active = false }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="mb-20">
      <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-black text-foreground tracking-tight mb-2">
        {title}
      </h2>
      <p className="text-sm text-muted-foreground mb-4 max-w-2xl">{description}</p>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-3">
        {LEGEND.map(item => (
          <div key={item.type} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[item.type] }} />
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full flex-shrink-0 bg-yellow-400" />
          <span className="text-xs text-muted-foreground">Selected / shared</span>
        </div>
      </div>

      {/* Status label */}
      <div
        ref={labelRef}
        className="text-xs text-muted-foreground bg-muted/50 border border-border rounded px-3 py-2 mb-3 min-h-[36px]"
      >
        Click any node to highlight its connections. Select two or more to see shared mechanisms.
      </div>

      {/* Graph */}
      <div className="w-full rounded-lg overflow-hidden border border-border" style={{ background: "#ffffff" }}>
        <svg
          ref={svgRef}
          style={{ display: "block", width: "100%", height }}
        />
      </div>
    </div>
  )
}
