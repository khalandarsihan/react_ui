import { Bell, User } from "lucide-react"
import { Button } from "./ui/Button"
import { Link } from "react-router-dom"

export function TopNav() {
  return (
    <div className="bg-[#0047AB] text-white h-[67px] px-4 flex items-center justify-between z-[100] sticky top-0 left-0 right-0 w-full">
      <div className="flex items-center">
        <Link to="/" className="rounded-md px-2 py-1.5 flex items-center justify-center h-[36px]">
          <img src="/logo.svg" alt="FixDocs Logo" width={120} height={26} />
        </Link>
      </div>
      <div className="text-2xl font-bold">Meem Typing & Stamps</div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-white hover:bg-[#0056D4]">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white hover:bg-[#0056D4]">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
