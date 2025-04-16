import { TopNav } from "./TopNav"
import { CompanySidebar } from "./CompanySidebar"

export function Layout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <CompanySidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="container mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
