"use client"

import { createContext, useContext, useEffect, useState } from "react"

const initialState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext(initialState)

export function ThemeProvider({ children, defaultTheme = "system", enableSystem = true, ...props }) {
  const [theme, setTheme] = useState(defaultTheme)

  useEffect(() => {
    // Try to get theme from localStorage
    try {
      const storedTheme = localStorage.getItem("theme")
      if (storedTheme) {
        setTheme(storedTheme)
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system" && enableSystem) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme, enableSystem])

  const value = {
    theme,
    setTheme: (theme) => {
      setTheme(theme)
      // Save to localStorage
      try {
        localStorage.setItem("theme", theme)
      } catch (e) {
        console.error(e)
      }
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
