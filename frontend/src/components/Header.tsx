import { SignInButton, SignOutButton, useUser } from '@clerk/clerk-react'

export default function Header() {
  const { isSignedIn } = useUser()

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100">
      <h1 className="text-xl font-bold">Margin Calc</h1>
      <div>
        {!isSignedIn ? (
          <SignInButton mode="modal">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Sign In
            </button>
          </SignInButton>
        ) : (
          <SignOutButton>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Sign Out
            </button>
          </SignOutButton>
        )}
      </div>
    </header>
  )
} 