import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Instagram, Mail, FileText, Coffee, Send, CheckCircle2, ArrowDownRight, Linkedin } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    
    // Using your existing Formspree endpoint
    await fetch('https://formspree.io/f/mbdrvbqp', {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    
    setIsSubmitting(false);
    setSubmitted(true);
    form.reset();
    setName('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  // Animation variants for staggered load
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen w-full bg-zinc-900 text-zinc-400 font-sans selection:bg-zinc-700 selection:text-white pt-32 pb-20 px-6 md:px-16 flex justify-center">
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24"
      >
        
        {/* LEFT COLUMN: Intro & Form */}
        <motion.div variants={itemVariants} className="flex flex-col space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-4">
              Wanna connect? 🦜
            </h1>
            <p className="text-lg leading-relaxed text-zinc-400">
              I'm always open to talking about frontend architecture, macroeconomics, or even just swapping badminton strategies. Whether you have a project idea, a question, or just want to say hey, drop a message below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 relative">
            <input type="hidden" name="_subject" value={name ? `New message from ${name}` : 'New Website Message'} />
            
            <div className="flex flex-col space-y-1">
              <label htmlFor="name" className="text-xs font-mono uppercase tracking-widest text-zinc-500 ml-1">Name / Alias</label>
              <input 
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-xl bg-zinc-800/40 border border-zinc-700/50 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-400 focus:bg-zinc-800 transition-all duration-300" 
                type="text" 
                placeholder="Optional" 
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="message" className="text-xs font-mono uppercase tracking-widest text-zinc-500 ml-1">Message</label>
              <textarea 
                id="message"
                name="message"
                className="w-full p-3 rounded-xl bg-zinc-800/40 border border-zinc-700/50 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-400 focus:bg-zinc-800 transition-all duration-300 resize-none min-h-[150px]" 
                placeholder="What's on your mind?" 
                required
              />
            </div>

            <button 
              type="submit"
              disabled={isSubmitting || submitted}
              className="group relative w-full flex items-center justify-center gap-2 px-6 py-3 bg-zinc-100 hover:bg-white text-zinc-900 font-medium rounded-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="animate-pulse">Sending...</span>
              ) : submitted ? (
                <>
                  <CheckCircle2 size={18} className="text-emerald-600" />
                  <span>Sent successfully!</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* RIGHT COLUMN: Socials & Links */}
        <motion.div variants={itemVariants} className="flex flex-col space-y-8 md:pt-4">
          
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-6">Digital Footprint</h2>
            
            <div className="flex flex-col space-y-3">
              {/* GitHub */}
              <a href="https://github.com/bauga27" target="_blank" rel="noreferrer" className="group flex items-center justify-between p-4 rounded-xl bg-zinc-800/20 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800/40 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <Github size={20} className="text-zinc-400 group-hover:text-white transition-colors" />
                  <span className="text-zinc-300 group-hover:text-white transition-colors">GitHub</span>
                </div>
                <ArrowDownRight size={16} className="text-zinc-600 group-hover:text-white group-hover:-rotate-90 transition-all duration-300" />
              </a>

              {/* LinkedIn */}
              <a href="https://linkedin.com/in/bautistagabriel" target="_blank" rel="noreferrer" className="group flex items-center justify-between p-4 rounded-xl bg-zinc-800/20 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800/40 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <Linkedin size={20} className="text-zinc-400 group-hover:text-white transition-colors" />
                  <span className="text-zinc-300 group-hover:text-white transition-colors">LinkedIn</span>
                </div>
                <ArrowDownRight size={16} className="text-zinc-600 group-hover:text-white group-hover:-rotate-90 transition-all duration-300" />
              </a>

              {/* Instagram */}
              <a href="https://instagram.com/_bauga" target="_blank" rel="noreferrer" className="group flex items-center justify-between p-4 rounded-xl bg-zinc-800/20 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800/40 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <Instagram size={20} className="text-zinc-400 group-hover:text-white transition-colors" />
                  <span className="text-zinc-300 group-hover:text-white transition-colors">Instagram</span>
                </div>
                <ArrowDownRight size={16} className="text-zinc-600 group-hover:text-white group-hover:-rotate-90 transition-all duration-300" />
              </a>

              {/* Email */}
              <a href="gbautist@ualberta.ca" className="group flex items-center justify-between p-4 rounded-xl bg-zinc-800/20 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800/40 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <Mail size={20} className="text-zinc-400 group-hover:text-white transition-colors" />
                  <span className="text-zinc-300 group-hover:text-white transition-colors">Email</span>
                </div>
                <ArrowDownRight size={16} className="text-zinc-600 group-hover:text-white group-hover:-rotate-90 transition-all duration-300" />
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-6">Extras</h2>
            
            <div className="flex flex-col space-y-3">
              {/* Resume */}
              <a href="/Bautista_Resume.pdf" target="_blank" rel="noreferrer" className="group flex items-center justify-between p-4 rounded-xl bg-zinc-800/20 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800/40 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <FileText size={20} className="text-zinc-400 group-hover:text-white transition-colors" />
                  <span className="text-zinc-300 group-hover:text-white transition-colors">View Resume</span>
                </div>
                <ArrowDownRight size={16} className="text-zinc-600 group-hover:text-white group-hover:-rotate-90 transition-all duration-300" />
              </a>

              {/* Buy Me A Coffee */}
              <a href="https://buymeacoffee.com/bauga" target="_blank" rel="noreferrer" className="group flex items-center justify-between p-4 rounded-xl bg-zinc-800/20 border border-zinc-800 hover:border-amber-600/50 hover:bg-amber-900/10 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <Coffee size={20} className="text-amber-500/70 group-hover:text-amber-400 transition-colors" />
                  <span className="text-zinc-300 group-hover:text-white transition-colors">Buy me a coffee</span>
                </div>
                <ArrowDownRight size={16} className="text-zinc-600 group-hover:text-amber-400 group-hover:-rotate-90 transition-all duration-300" />
              </a>
            </div>
          </div>

        </motion.div>

      </motion.div>
    </div>
  );
}