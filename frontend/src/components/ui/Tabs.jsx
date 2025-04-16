"use client"

import React from "react"
import { cn } from "../../lib/utils"

const TabsContext = React.createContext({
  value: "",
  onValueChange: () => {},
})

function Tabs({ children, value, onValueChange, className, ...props }) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

function TabsList({ children, className, ...props }) {
  return (
    <div className={cn("flex flex-wrap", className)} {...props}>
      {children}
    </div>
  )
}

function TabsTrigger({ children, value, className, ...props }) {
  const { value: selectedValue, onValueChange } = React.useContext(TabsContext)
  const isSelected = selectedValue === value

  return (
    <button
      className={cn(
        "px-4 py-2 text-sm font-medium transition-colors",
        isSelected ? "border-b-2 border-[#0047AB] text-[#0047AB]" : "text-gray-500 hover:text-gray-700",
        className,
      )}
      onClick={() => onValueChange(value)}
      {...props}
    >
      {children}
    </button>
  )
}

function TabsContent({ children, value, className, ...props }) {
  const { value: selectedValue } = React.useContext(TabsContext)
  const isSelected = selectedValue === value

  if (!isSelected) return null

  return (
    <div className={cn("mt-2", className)} {...props}>
      {children}
    </div>
  )
}

Tabs.List = TabsList
Tabs.Trigger = TabsTrigger
Tabs.Content = TabsContent

export { Tabs }
