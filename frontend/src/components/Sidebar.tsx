import { cn } from "../lib/utils"
import { Button } from "./ui/button"
import { HomeIcon, CalculatorIcon, SettingsIcon } from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Navigation
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <HomeIcon className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <CalculatorIcon className="mr-2 h-4 w-4" />
              Calculator
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <SettingsIcon className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 