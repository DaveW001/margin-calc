import './App.css'
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import NewScenarioPage from './pages/NewScenarioPage'

const HomePage = () => (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold">Dashboard</h1>
    <p>Welcome! Select an option from the sidebar.</p>
  </div>
);

function App() {
  return (
    <>
      <Header />

      <SignedOut>
        <div className="flex justify-center items-center pt-20">
           <p>Please sign in using the button in the header.</p>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="flex min-h-screen pt-16">
          <Sidebar className="w-64 border-r fixed top-16 left-0 h-[calc(100vh-4rem)] bg-background overflow-y-auto" />
          <div className="flex flex-col flex-1 ml-64">
            <main className="flex-1 p-6">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/scenarios/new" element={<NewScenarioPage />} />
              </Routes>
            </main>
          </div>
        </div>
      </SignedIn>
    </>
  )
}

export default App
