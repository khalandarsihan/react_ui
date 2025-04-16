"use client"

import { createContext, useContext, useState } from "react"

const SidebarContext = createContext({
  state: "expanded", // "expanded" | "collapsed" | "hidden"
  setState: () => {},
})

export function SidebarProvider({ children }) {
  const [state, setState] = useState("expanded")

  return <SidebarContext.Provider value={{ state, setState }}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}
