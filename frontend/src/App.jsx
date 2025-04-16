import React from "react"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "./components/ThemeProvider"
import { SidebarProvider } from "./context/SidebarContext"
import AppRoutes from "./routes"

// Create a loading component
const Loading = () => (
  <div className="flex items-center justify-center h-screen w-full">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0047AB]"></div>
  </div>
)

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <SidebarProvider>
          <React.Suspense fallback={<Loading />}>
            <AppRoutes />
          </React.Suspense>
        </SidebarProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
