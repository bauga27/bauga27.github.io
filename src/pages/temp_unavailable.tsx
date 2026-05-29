import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
  } from "framer-motion";
  
  import { useEffect, useMemo, useRef, useState } from "react";
  import { Terminal, Lock } from "lucide-react";
  
  export default function TempUnavailable() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
  
    const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
    useEffect(() => {
      const move = (e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      };
  
      window.addEventListener("mousemove", move);
      return () => window.removeEventListener("mousemove", move);
    }, []);
  
    const cursorBackground = useMotionTemplate`
      radial-gradient(
        350px circle at ${smoothX}px ${smoothY}px,
        rgba(255,255,255,0.06),
        transparent 80%
      )
    `;
  
    // ---------------- STATUS MESSAGES ----------------
    const statuses = useMemo(
      () => [
        "reducing visibility",
        "perhaps hiding from tiktok",
        "probably getting food",
        "currently ungoogleable",
        "isn't this terminal kinda cool?", 
        "stealth mode enabled",
        "fixing only the most important things (i'm lying)",
        "out on a side quest", 
        "aosdiqwmfbiuas8012eo8h0asd",
        "why are you still reading this?",
        "be back soon... i think", 
      ],
      []
    );
  
    const [statusIndex, setStatusIndex] = useState(0);
  
    useEffect(() => {
      const i = setInterval(() => {
        setStatusIndex((v) => (v + 1) % statuses.length);
      }, 3000);
  
      return () => clearInterval(i);
    }, [statuses.length]);
  
    // ---------------- TYPING EFFECT ----------------
    const [typed, setTyped] = useState("");
    const current = statuses[statusIndex];
  
    useEffect(() => {
      let i = 0;
      setTyped("");
  
      const t = setInterval(() => {
        setTyped(current.slice(0, i + 1));
        i++;
        if (i > current.length) clearInterval(t);
      }, 35);
  
      return () => clearInterval(t);
    }, [current]);
  
    // ---------------- RUNAWAY BUTTON (FIXED) ----------------
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const btnRef = useRef<HTMLButtonElement>(null);
  
    const dodge = (e: React.MouseEvent) => {
      const rect = btnRef.current?.getBoundingClientRect();
      if (!rect) return;
  
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
  
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
  
      const dist = Math.sqrt(dx * dx + dy * dy);
  
      const dangerZone = 220;
      const panicZone = 90;
  
      if (dist < dangerZone) {
        const nx = dx / (dist || 1);
        const ny = dy / (dist || 1);
  
        const force = dist < panicZone ? 260 : 180;
  
        const jitterX = (Math.random() - 0.5) * 80;
        const jitterY = (Math.random() - 0.5) * 80;
  
        setPos({
          x: -(nx * force + jitterX),
          y: -(ny * force + jitterY),
        });
      }
    };
  
    return (
      <div
        onMouseMove={dodge}
        className="min-h-[100svh] flex items-center justify-center bg-zinc-900 text-zinc-400 font-sans px-6 overflow-hidden"
      >
        {/* cursor glow */}
        <motion.div
          className="pointer-events-none fixed inset-0 hidden md:block"
          style={{ background: cursorBackground }}
        />
  
        {/* ambient background */}
        <div className="absolute inset-0">
          <div className="absolute top-[-10%] left-[-10%] h-96 w-96 rounded-full bg-zinc-700/10 blur-3xl" />
          <div className="absolute bottom-[-20%] right-[-10%] h-[30rem] w-[30rem] rounded-full bg-zinc-500/10 blur-3xl" />
        </div>
  
        {/* CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7 }}
          className="relative z-10 w-full max-w-3xl"
        >
          <div className="rounded-[2rem] border border-zinc-700/50 bg-zinc-800/40 backdrop-blur-xl p-10 md:p-14">
  
            {/* status header */}
            <div className="flex items-center gap-2 mb-8">
              <div className="h-2 w-2 rounded-full bg-zinc-400 animate-pulse" />
              <span className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-mono">
                temporary offline mode
              </span>
            </div>
  
            {/* BRB SVG (bauga-style animation) */}
            <div className="h-[130px] mb-6">
              <svg viewBox="0 0 320 140" className="h-full">
                <motion.text
                  x="0"
                  y="105"
                  fontSize="100"
                  stroke="white"
                  strokeWidth="2"
                  fill="transparent"
                  initial={{
                    strokeDasharray: 400,
                    strokeDashoffset: 400,
                    fill: "rgba(255,255,255,0)",
                  }}
                  animate={{
                    strokeDashoffset: [400, 0, 0, 400],
                    fill: [
                      "rgba(255,255,255,0)",
                      "rgba(255,255,255,1)",
                      "rgba(255,255,255,1)",
                      "rgba(255,255,255,0)",
                    ],
                  }}
                  transition={{
                    duration: 8,
                    ease: "easeInOut",
                    repeat: Infinity,
                    times: [0, 0.3, 0.8, 1],
                  }}
                >
                  brb.
                </motion.text>
              </svg>
            </div>
  
            <p className="text-lg md:text-xl text-zinc-300">
              This page is temporarily hidden.
            </p>
  
            <p className="mt-2 text-zinc-500">
              Nothing crazy - Just some maintenance :)
            </p>
  
            {/* terminal */}
            <div className="mt-8 rounded-2xl border border-zinc-700/50 bg-zinc-900/60 p-5 font-mono text-sm">
              <div className="flex items-center gap-2 mb-3 text-zinc-500">
                <Terminal size={14} />
                status.log
              </div>
  
              <div className="text-zinc-300 flex items-center">
                <span className="text-zinc-500 mr-2">{">"}</span>
                {typed}
                <span className="ml-1 animate-pulse">_</span>
              </div>
            </div>
  
            {/* RUNAWAY BUTTON */}
            <div className="mt-10 flex justify-center">
              <motion.button
                ref={btnRef}
                animate={{ x: pos.x, y: pos.y }}
                transition={{ type: "spring", stiffness: 500, damping: 18 }}
                className="px-6 py-3 rounded-2xl border border-zinc-700 bg-zinc-900/60 text-zinc-300 hover:text-white transition"
              >
                Reveal Website
              </motion.button>
            </div>
  
            {/* footer */}
            <div className="mt-10 flex justify-between border-t border-zinc-800 pt-6 text-xs text-zinc-500 uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <Lock size={12} />
                locked
              </span>
              <span>{statuses[statusIndex]}</span>
            </div>
  
          </div>
        </motion.div>
      </div>
    );
  }