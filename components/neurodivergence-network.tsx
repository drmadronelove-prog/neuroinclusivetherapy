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
  height = "clamp(500px, 65vw, 750px)",
}: NetworkGraphProps) {
  const svgRef   = useRef<SVGSVGElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!svgRef.current) return
    let active = true

    import("d3").then((d3) => {
      if (!active || !svgRef.current) return

      const W = 1200
      const H = 860

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const d3nodes: any[] = nodes.map(n => ({ ...n }))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const d3links: any[] = links.map(([s, t]) => ({ source: s, target: t }))

      const degree: Record<string, number> = {}
      links.forEach(([s, t]) => {
        degree[s] = (degree[s] || 0) + 1
        degree[t] = (degree[t] || 0) + 1
      })
      const getR = (id: string) => Math.max(8, Math.min(20, 5 + Math.sqrt(degree[id] || 1) * 1.8))

      const svg = d3.select(svgRef.current)
      svg.selectAll("*").remove()
      svg.attr("viewBox", `0 0 ${W} ${H}`)

      const filterId = `glow-${graphId}`
      const defs = svg.append("defs")
      const glow = defs.append("filter")
        .attr("id", filterId)
        .attr("x", "-50%").attr("y", "-50%")
        .attr("width", "200%").attr("height", "200%")
      glow.append("feGaussianBlur").attr("stdDeviation", "4").attr("result", "coloredBlur")
      const fm = glow.append("feMerge")
      fm.append("feMergeNode").attr("in", "coloredBlur")
      fm.append("feMergeNode").attr("in", "SourceGraphic")

      const sim = d3.forceSimulation(d3nodes)
        .force("link",    d3.forceLink(d3links).id((d: any) => d.id).distance(90).strength(0.5))
        .force("charge",  d3.forceManyBody().strength(-340))
        .force("center",  d3.forceCenter(W / 2, H / 2))
        .force("collide", d3.forceCollide().radius((d: any) => getR(d.id) + 20))
        .force("x",       d3.forceX(W / 2).strength(0.04))
        .force("y",       d3.forceY(H / 2).strength(0.04))

      const linkG = svg.append("g")
      const linkEl = linkG.selectAll("line")
        .data(d3links)
        .join("line")
        .attr("stroke", "#2a2a2a")
        .attr("stroke-width", 1)
        .attr("stroke-opacity", 0.7)

      const nodeG = svg.append("g")
      const selected = new Set<string>()

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

      function updateLabel(shared: Set<string>) {
        if (!labelRef.current) return
        if (selected.size === 0) {
          labelRef.current.textContent = "Click any node to highlight its connections. Select two or more to see shared mechanisms."
          return
        }
        const selLabels = d3nodes.filter(n => selected.has(n.id)).map(n => n.label)
        if (selected.size < 2 || shared.size === 0) {
          labelRef.current.textContent = `Selected: ${selLabels.join(", ")}`
          return
        }
        const sharedLabels = d3nodes.filter(n => shared.has(n.id)).map(n => n.label)
        labelRef.current.textContent = `${selLabels.join(" + ")} → shared: ${sharedLabels.join(", ")}`
      }

      function updateHighlights() {
        const shared = getShared()
        const hasSel = selected.size > 0

        const isGold = (id: string) => selected.has(id) || shared.has(id)

        circleEl
          .attr("fill",   (d: any) => isGold(d.id) ? "#FFD700" : COLORS[d.type as NodeType])
          .attr("r",      (d: any) => isGold(d.id) ? getR(d.id) + 3 : getR(d.id))
          .attr("filter", (d: any) => isGold(d.id) ? `url(#${filterId})` : null)
          .attr("opacity",(d: any) => !hasSel ? 1 : isGold(d.id) ? 1 : 0.2)

        labelG2.attr("opacity", (d: any) => !hasSel ? 1 : isGold(d.id) ? 1 : 0.12)

        linkEl
          .attr("stroke", (d: any) => {
            const s = d.source.id, t = d.target.id
            return (isGold(s) && isGold(t)) ? "#FFD700" : "#2a2a2a"
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

        updateLabel(shared)
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
        .attr("fill",        "white")
        .attr("font-family", "DM Sans, sans-serif")
        .attr("font-size",   "9")
        .attr("font-weight", "500")
        .each(function(d: any) {
          const el = d3.select(this)
          const lines = wrapWords(d.label)
          const startDy = getR(d.id) + 4
          lines.forEach((line, i) => {
            el.append("tspan")
              .attr("x", 0)
              .attr("dy", i === 0 ? startDy : 11)
              .text(line)
          })
        })

      svg.on("click", () => { selected.clear(); updateHighlights() })

      sim.on("tick", () => {
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
        className="text-xs text-amber-300 bg-amber-950/30 border border-amber-800/30 rounded px-3 py-2 mb-3 min-h-[36px]"
      >
        Click any node to highlight its connections. Select two or more to see shared mechanisms.
      </div>

      {/* Graph */}
      <div className="w-full rounded-lg overflow-hidden" style={{ background: "#0d0d0d" }}>
        <svg
          ref={svgRef}
          style={{ display: "block", width: "100%", height }}
        />
      </div>
    </div>
  )
}
