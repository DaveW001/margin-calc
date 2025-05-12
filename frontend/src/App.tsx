import './App.css'
import Header from './components/Header'
import { SignedIn, SignedOut } from '@clerk/clerk-react'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto p-4">
        <SignedIn>
          <h2 className="text-2xl font-bold mb-4">Welcome to Margin Calc</h2>
          <p>You are signed in. You can now access the application.</p>
        </SignedIn>
        <SignedOut>
          <h2 className="text-2xl font-bold mb-4">Welcome to Margin Calc</h2>
          <p>Please sign in to access the application.</p>
        </SignedOut>
      </main>
    </div>
  )
}

export default App
