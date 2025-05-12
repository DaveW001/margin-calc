import { cn } from "../lib/utils"
import { buttonVariants } from "./ui/button"
import { HomeIcon, CalculatorIcon, SettingsIcon } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Navigation
          </h2>
          <div className="space-y-1">
            <Link 
              to="/"
              className={cn(
                buttonVariants({ variant: location.pathname === '/' ? 'secondary' : 'ghost' }), 
                "w-full justify-start"
              )}
            >
              <HomeIcon className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
            <Link 
              to="/scenarios/new"
              className={cn(
                buttonVariants({ variant: location.pathname === '/scenarios/new' ? 'secondary' : 'ghost' }),
                "w-full justify-start"
              )}
            >
              <CalculatorIcon className="mr-2 h-4 w-4" />
              New Scenario
            </Link>
            <Link 
              to="/settings"
              className={cn(
                buttonVariants({ variant: location.pathname === '/settings' ? 'secondary' : 'ghost' }),
                "w-full justify-start"
              )}
            >
              <SettingsIcon className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 