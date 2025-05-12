import './App.css'
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import NewScenarioPage from './pages/NewScenarioPage'
import SettingsPage from './pages/SettingsPage'

const HomePage = () => (
  <div className="container mx-auto px-4 py-6">
    <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
    <p>Welcome! Select an option from the sidebar.</p>
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <SignedOut>
        <div className="flex-1 flex justify-center items-center">
          <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Welcome</h2>
            <p>Please sign in using the button in the header to access the application.</p>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="flex flex-1">
          <Sidebar className="w-64 border-r border-gray-200 shadow-sm fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white z-20 overflow-y-auto" />
          <div className="ml-64 flex-1 flex flex-col min-h-[calc(100vh-4rem)]">
            <main className="flex-1 bg-gray-50 p-6">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/scenarios/new" element={<NewScenarioPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </main>
          </div>
        </div>
      </SignedIn>
    </div>
  )
}

export default App
