import './App.css'
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar className="w-64 border-r" />
        <main className="flex-1 p-6">
          <SignedIn>
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Welcome to Margin Calculator</h1>
              <p>Start calculating your margins by selecting an option from the sidebar.</p>
            </div>
          </SignedIn>
          <SignedOut>
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Welcome to Margin Calculator</h1>
              <p>Please sign in to access the calculator.</p>
            </div>
          </SignedOut>
        </main>
      </div>
    </div>
  )
}

export default App
