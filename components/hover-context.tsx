"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type HoverContextType = {
  hoveredIndex: number | null
  setHoveredIndex: (index: number | null) => void
}

const HoverContext = createContext<HoverContextType | null>(null)

export function HoverProvider({ children }: { children: ReactNode }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <HoverContext.Provider value={{ hoveredIndex, setHoveredIndex }}>
      {children}
    </HoverContext.Provider>
  )
}

export function useHover() {
  const context = useContext(HoverContext)
  if (!context) {
    throw new Error("useHover must be used within a HoverProvider")
  }
  return context
}
