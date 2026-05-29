import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import './index.css'

// import Home from './pages/Home'
import TempUnavailable from './pages/temp_unavailable'

import TempLanding from './pages/temp_landing'
import Navbar from './components/Navbar' 
import Contact from './pages/Contact'

// 1. The Layout Component
function Layout() {
  return (
    <div className="bg-zinc-900 min-h-screen text-zinc-400 font-sans">
      <Navbar />
      {/* The Outlet is the placeholder where your pages will render */}
      <main>
        <Outlet />
      </main>
    </div>
  )
}

// 2. The Main App Routing
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* TEMP LOCKDOWN MODE */}
        <Route path="*" element={<TempUnavailable />} />

        {/*
        ORIGINAL WEBSITE ROUTES

        <Route element={<Layout />}>
          
          <Route path="/" element={<Home />} />
          
          <Route path="/projects" element={<TempLanding />} />
          <Route path="/games" element={<TempLanding />} />
          <Route path="/gallery" element={<TempLanding />} />
          <Route path="/contact" element={<Contact />} />
        
        </Route>
        */}

      </Routes>
    </BrowserRouter>
  )
}

export default App