import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Make sure to import these

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when a link is clicked
  const handleLinkClick = () => setIsOpen(false);

  return (
    <>
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-50 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800/50"
      >
        <div className="w-full flex items-center justify-between h-20 pl-6 md:pl-32 pr-6 md:pr-16">
          
          {/* Left Side: Brand */}
          <Link to="/" onClick={handleLinkClick} className="group flex items-center gap-2">
            <span className="text-2xl font-bold text-white tracking-tighter group-hover:text-zinc-300 transition-colors">
              bauga.
            </span>
          </Link>

          {/* Desktop Navigation (Hidden on mobile) */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/projects" className="text-sm font-mono uppercase tracking-widest text-zinc-400 hover:text-white relative group">
              Projects
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link to="/games" className="text-sm font-mono uppercase tracking-widest text-zinc-400 hover:text-white relative group">
              Games
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link to="/gallery" className="text-sm font-mono uppercase tracking-widest text-zinc-400 hover:text-white relative group">
              Gallery
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link to="/contact" className="text-sm font-mono uppercase tracking-widest text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95">
              Contact
            </Link>
          </nav>

          {/* Mobile Hamburger Button (Hidden on desktop) */}
          <button 
            className="md:hidden text-zinc-400 hover:text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-zinc-900/95 backdrop-blur-xl flex flex-col items-center justify-center pt-20"
          >
            <nav className="flex flex-col items-center gap-8">
              <Link to="/projects" onClick={handleLinkClick} className="text-2xl font-mono uppercase tracking-widest text-zinc-300 hover:text-white transition-colors">
                Projects
              </Link>
              <Link to="/games" onClick={handleLinkClick} className="text-2xl font-mono uppercase tracking-widest text-zinc-300 hover:text-white transition-colors">
                Games
              </Link>
              <Link to="/gallery" onClick={handleLinkClick} className="text-2xl font-mono uppercase tracking-widest text-zinc-300 hover:text-white transition-colors">
                Gallery
              </Link>
              <Link to="/contact" onClick={handleLinkClick} className="text-2xl font-mono uppercase tracking-widest text-white bg-zinc-800 border border-zinc-700 px-8 py-3 rounded-full mt-4">
                Contact
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}