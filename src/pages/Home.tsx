import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { ArrowDownRight, Code2, Globe } from 'lucide-react';

const sections = [
  { id: 'hero', label: 'Intro' },
  { id: 'focus', label: 'Focus' },
  { id: 'tech', label: 'Stack' },
  { id: 'progress', label: 'Learning' },
  { id: 'offscreen', label: 'Off-Screen' }
];

// --- ScrollSection Physics ---
const ScrollSection = ({ id, children, setActiveSection, containerRef, isHero = false }: any) => {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.5, 0.6, 1], [0.1, 1, 1, 1, 0.1]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.5, 0.6, 1], [0.95, 1, 1, 1, 0.95]);
  const filter = useTransform(scrollYProgress, [0, 0.4, 0.5, 0.6, 1], ["blur(8px)", "blur(0px)", "blur(0px)", "blur(0px)", "blur(8px)"]);

  return (
    <motion.section
      ref={ref}
      id={id}
      onViewportEnter={() => setActiveSection(id)}
      viewport={{ root: containerRef, amount: 0.5 }}
      className={`snap-center flex flex-col justify-center px-6 md:px-16 max-w-6xl mx-auto w-full ${isHero ? 'min-h-[100svh] py-20 md:py-0' : 'min-h-[75svh] py-12'}`}
      style={{ opacity, scale, filter }}
    >
      {children}
    </motion.section>
  );
};

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const cursorBackground = useMotionTemplate`radial-gradient(300px circle at ${smoothX}px ${smoothY}px, rgba(255,255,255,0.06), transparent 80%)`;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="h-[100svh] w-full bg-zinc-900 text-zinc-400 font-sans selection:bg-zinc-700 selection:text-white relative overflow-y-scroll snap-y snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      
      <motion.div 
        className="pointer-events-none fixed inset-0 z-0 hidden md:block"
        style={{ background: cursorBackground }}
      />

      {/* Vertical Side Navigation - Hidden on mobile, visible on md+ */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full w-24 flex-col justify-center items-center z-50">
        <div className="flex flex-col items-center gap-4">
          {sections.map((section) => (
            <div 
              key={section.id} 
              onClick={() => scrollToSection(section.id)}
              className="relative flex items-center justify-center w-8 h-12 cursor-pointer group"
            >
              <motion.div
                animate={{
                  height: activeSection === section.id ? 32 : 12,
                  backgroundColor: activeSection === section.id ? "#ffffff" : "#52525b"
                }}
                className="w-[2px] rounded-full transition-colors duration-300"
              />
              <div className="absolute left-8 opacity-0 group-hover:opacity-100 text-[10px] font-mono tracking-widest uppercase text-white transition-opacity whitespace-nowrap pointer-events-none">
                {section.label}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <div className="ml-0 md:ml-24 relative z-10">
        
        {/* HERO SECTION */}
        <ScrollSection id="hero" setActiveSection={setActiveSection} containerRef={containerRef} isHero={true}>
          <div className="w-full flex flex-col justify-center h-full pt-16 md:pt-0">
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 md:gap-12 w-full max-w-5xl mx-auto">
              
              <div className="flex-1 flex flex-col items-center md:items-start w-full text-center md:text-left order-1 md:order-1">
                {/* FIX: Removed max-w to let flexbox center properly */}
                <div className="mb-4 md:mb-6 h-[60px] md:h-[120px] w-full flex justify-center md:justify-start">
                  <motion.svg 
                    className="w-auto h-full" 
                    // FIX: Tightened viewBox from "0 0 400 120" to "0 0 320 120" to perfectly center the letters
                    viewBox="0 0 320 120"
                    preserveAspectRatio="xMinYMid meet"
                  >
                    <motion.text
                      x="0" y="90"
                      className="text-7xl md:text-[100px] font-bold tracking-tighter"
                      fill="transparent" stroke="white" strokeWidth="2"
                      initial={{ strokeDasharray: 400, strokeDashoffset: 400, fill: "rgba(255,255,255,0)" }}
                      animate={{
                        strokeDashoffset: [400, 0, 0, 400],
                        fill: ["rgba(255,255,255,0)", "rgba(255,255,255,1)", "rgba(255,255,255,1)", "rgba(255,255,255,0)"]
                      }}
                      transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, times: [0, 0.3, 0.8, 1] }}
                    >
                      bauga.
                    </motion.text>
                  </motion.svg>
                </div>

                <p className="text-lg md:text-2xl max-w-xl font-light leading-relaxed text-zinc-300">
                  Hey, I'm Gabe! <br className="hidden md:block" />
                  I like to build things :) 
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4 order-2 md:order-2">
                <div className="h-48 w-48 md:h-72 md:w-72 rounded-full bg-zinc-800 border-4 border-zinc-700/50 flex items-center justify-center overflow-hidden shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)] group transition-transform hover:scale-105 duration-300">
                  <img 
                    src="/baby_gabe.jpg"
                    alt="Baby Gabe" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                <p className="text-xs md:text-sm font-mono tracking-wider text-zinc-500 text-center w-full">
                  (yes, the baby with all that swag is me) 
                </p>
              </div>
            </div>
            
            <div className="absolute bottom-8 md:bottom-12 left-0 w-full md:w-auto md:left-16 flex justify-center md:justify-start items-center gap-2 text-xs md:text-sm tracking-widest uppercase text-zinc-500">
              <span>Scroll to explore</span>
              <ArrowDownRight size={16} className="animate-bounce" />
            </div>
          </div>
        </ScrollSection>

        {/* 01. CURRENT FOCUS */}
        <ScrollSection id="focus" setActiveSection={setActiveSection} containerRef={containerRef}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-16 w-full">
            <div className="md:col-span-4 flex items-start">
              <h2 className="text-xs md:text-sm font-mono tracking-widest uppercase text-zinc-500">01. Focus</h2>
            </div>
            <div className="md:col-span-8">
              <h3 className="text-2xl md:text-4xl font-medium text-white mb-4 md:mb-6 leading-tight">
                I like building things that are actually useful.
              </h3>
              <p className="text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                Most of what I work on sits somewhere between engineering and real-world use — apps, tools, and systems that people can actually rely on. I’m not really into overcomplicating things. If it works cleanly and makes sense, that’s usually the goal.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                Right now I’m focused on getting better at structuring systems, improving how my apps scale, and making interfaces feel smooth and intuitive. Just trying to build things that don’t feel clunky.
              </p>
            </div>
          </div>
        </ScrollSection>

        {/* 02. TECH STACK */}
        <ScrollSection id="tech" setActiveSection={setActiveSection} containerRef={containerRef}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-16 w-full">
            <div className="md:col-span-4 flex items-start">
              <h2 className="text-xs md:text-sm font-mono tracking-widest uppercase text-zinc-500">02. Stack</h2>
            </div>
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="group p-5 md:p-6 rounded-2xl bg-zinc-800/40 border border-zinc-700/50 hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-300">
                <Code2 className="text-zinc-500 mb-3 md:mb-4 group-hover:text-white transition-colors" size={20} />
                <h4 className="text-white text-base md:text-lg mb-2">Frontend</h4>
                <p className="text-xs md:text-sm text-zinc-400">React, TypeScript, Next.js — building clean, responsive interfaces with smooth interactions</p>
              </div>
              <div className="group p-5 md:p-6 rounded-2xl bg-zinc-800/40 border border-zinc-700/50 hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-300">
                <Globe className="text-zinc-500 mb-3 md:mb-4 group-hover:text-white transition-colors" size={20} />
                <h4 className="text-white text-base md:text-lg mb-2">Backend & Data</h4>
                <p className="text-xs md:text-sm text-zinc-400">Node, Django, FastAPI, PostgreSQL — handling APIs, data flow, and application logic</p>
              </div>
              <div className="group p-5 md:p-6 rounded-2xl bg-zinc-800/40 border border-zinc-700/50 hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-300">
                <Code2 className="text-zinc-500 mb-3 md:mb-4 group-hover:text-white transition-colors" size={20} />
                <h4 className="text-white text-base md:text-lg mb-2">Mobile & Full-Stack</h4>
                <p className="text-xs md:text-sm text-zinc-400">React Native, Firebase, Supabase — building apps with real-time data and offline support</p>
              </div>
              <div className="group p-5 md:p-6 rounded-2xl bg-zinc-800/40 border border-zinc-700/50 hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-300">
                <Globe className="text-zinc-500 mb-3 md:mb-4 group-hover:text-white transition-colors" size={20} />
                <h4 className="text-white text-base md:text-lg mb-2">Tools & Workflow</h4>
                <p className="text-xs md:text-sm text-zinc-400">Git, CI/CD, Postman — shipping, testing, and maintaining projects properly</p>
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* 03. IN PROGRESS */}
        <ScrollSection id="progress" setActiveSection={setActiveSection} containerRef={containerRef}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-16 w-full">
            <div className="md:col-span-4 flex items-start">
              <h2 className="text-xs md:text-sm font-mono tracking-widest uppercase text-zinc-500">03. Learning</h2>
            </div>
            <div className="md:col-span-8 space-y-2 md:space-y-4 w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 md:py-4 border-b border-zinc-800/50 group">
                <span className="text-white text-lg md:text-xl group-hover:translate-x-2 transition-transform">System Design</span>
                <span className="text-xs md:text-sm text-zinc-500 mt-1 sm:mt-0">Understanding how apps scale and fit together</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 md:py-4 border-b border-zinc-800/50 group">
                <span className="text-white text-lg md:text-xl group-hover:translate-x-2 transition-transform">UI / UX</span>
                <span className="text-xs md:text-sm text-zinc-500 mt-1 sm:mt-0">Making interfaces feel clean, fast, and intuitive</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 md:py-4 border-b border-zinc-800/50 group">
                <span className="text-white text-lg md:text-xl group-hover:translate-x-2 transition-transform">Cloud (AWS)</span>
                <span className="text-xs md:text-sm text-zinc-500 mt-1 sm:mt-0">Learning how to deploy and run real apps</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 md:py-4 border-b border-zinc-800/50 group">
                <span className="text-white text-lg md:text-xl group-hover:translate-x-2 transition-transform">ML / AI</span>
                <span className="text-xs md:text-sm text-zinc-500 mt-1 sm:mt-0">Understanding how it works under the hood</span>
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* 04. OFF-SCREEN */}
        <ScrollSection id="offscreen" setActiveSection={setActiveSection} containerRef={containerRef}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-16 w-full">
            <div className="md:col-span-4 flex items-start">
              <h2 className="text-xs md:text-sm font-mono tracking-widest uppercase text-zinc-500">04. Off-Screen</h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                I try to keep a balance between building things and actually living a bit. When I’m not coding, I’m usually at the gym, playing badminton, or trying to cook something new (hit or miss).
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                I’m also big on random side quests — showing up to events, exploring new places, meeting people, or just doing something different. Not everything needs to be productive.
              </p>
            </div>
          </div>
        </ScrollSection>

        {/* FIX: This invisible spacer block guarantees the last section has enough room to snap completely to the center */}
        <div className="h-[20vh] w-full shrink-0 pointer-events-none" />

      </div>
    </div>
  );
}