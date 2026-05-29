import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import TempUnavailable from './pages/temp_unavailable'

/*
========================================================
🔒 ORIGINAL APP (LOCKED - REVERT ANYTIME)
========================================================

import Home from './pages/Home'
import TempLanding from './pages/temp_landing'
import Navbar from './components/Navbar' 
import Contact from './pages/Contact'

function Layout() {
  return (
    <div className="bg-zinc-900 min-h-screen text-zinc-400 font-sans">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<TempLanding />} />
          <Route path="/games" element={<TempLanding />} />
          <Route path="/gallery" element={<TempLanding />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

========================================================
*/

// 🔒 TEMP LOCKDOWN MODE (ACTIVE BUILD)
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<TempUnavailable />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App