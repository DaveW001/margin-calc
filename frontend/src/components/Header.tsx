import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react"
import { Button } from "./ui/button"

export function Header() {
  const { isSignedIn } = useUser()

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center px-4">
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold">Margin Calculator</span>
          </a>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          {isSignedIn ? (
            <SignOutButton>
              <Button variant="outline">Sign Out</Button>
            </SignOutButton>
          ) : (
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          )}
        </div>
      </div>
    </header>
  )
} 