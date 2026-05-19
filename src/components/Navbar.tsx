import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Cpu, Menu, X, Rocket, Shield, Zap, ChevronDown, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { LOGO_SVG } from "../lib/constants";
import { openMeeting as openCalendly } from "../lib/calendly";
import { useTheme } from "../lib/ThemeContext";

export function Navbar({ onNavigate, activePage }: { 
  onNavigate: (page: 'home' | 'advisory' | 'ai-systems' | 'about' | 'pricing' | 'policies' | 'dashboard' | 'ecosystem' | 'supporta' | 'strategos' | 'simulate' | 'core' | 'engage' | 'evolve' | 'flow' | 'core-intel' | 'decision-modeling' | 'revenue-growth' | 'brand-content' | 'knowledge-research' | 'ops-automation' | 'cust-experience' | 'adv-strategic' | 'queries-guiding' | 'employee-portal') => void,
  activePage: string 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const { theme, toggleTheme } = useTheme();
  
  const navBgOpacity = useTransform(scrollY, [0, 100], [0, 0.4]);
  const navBlur = useTransform(scrollY, [0, 100], [0, 24]);
  const navBorderOpacity = useTransform(scrollY, [0, 100], [0, 0.1]);

  const backgroundColor = useTransform(navBgOpacity, v => 
    theme === 'dark' ? `rgba(10, 10, 10, ${v})` : `rgba(241, 245, 249, ${v})`
  );
  const backdropFilter = useTransform(navBlur, v => `blur(${v}px)`);
  const borderColor = useTransform(navBorderOpacity, v => 
    theme === 'dark' ? `rgba(255, 255, 255, ${v})` : `rgba(15, 23, 42, ${v})`
  );

  const NavLink = ({ page, label, dotColor }: { page: any, label: string, dotColor: string }) => {
    const isActive = activePage === page;
    return (
      <button 
        onClick={() => { onNavigate(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
        className={`relative transition-all whitespace-nowrap flex flex-col items-center group py-1 ${isActive ? 'text-[var(--color-text)] font-black' : 'text-zinc-400 dark:text-zinc-400 light:text-zinc-600 hover:text-primary dark:hover:text-primary light:hover:text-black transition-colors duration-1000'}`}
      >
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-primary' : dotColor}`} />
          {label}
        </div>
        {isActive && (
          <motion.div 
            layoutId="nav-underline"
            className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary shadow-neon-small"
            initial={false}
          />
        )}
      </button>
    );
  };

  const NavDropdown = ({ label, items, dotColor, grid = false }: { label: string, items: { page: any, label: string, dotColor: string }[], dotColor: string, grid?: boolean }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);
    const hasActiveChild = items.some(item => activePage === item.page);

    const handleMouseEnter = () => {
      if (closeTimeout) {
        clearTimeout(closeTimeout);
        setCloseTimeout(null);
      }
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      const timeout = setTimeout(() => {
        setIsHovered(false);
      }, 150); // Small 150ms delay to prevent accidental closing
      setCloseTimeout(timeout);
    };

    useEffect(() => {
      return () => {
        if (closeTimeout) clearTimeout(closeTimeout);
      };
    }, [closeTimeout]);

    return (
      <div 
        className="relative group py-1"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button 
          className={`relative transition-all whitespace-nowrap flex items-center gap-2 group ${hasActiveChild ? 'text-[var(--color-text)] font-black' : 'text-zinc-400 dark:text-zinc-400 light:text-zinc-600 hover:text-primary dark:hover:text-primary light:hover:text-black transition-colors duration-1000'}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${hasActiveChild ? 'bg-primary' : dotColor}`} />
          {label}
          <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isHovered ? 'rotate-180' : ''}`} />
          {hasActiveChild && (
            <motion.div 
              layoutId="nav-underline-dropdown"
              className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary shadow-neon-small"
              initial={false}
            />
          )}
        </button>

        <AnimatePresence>
          {isHovered && (
            <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50 ${grid ? 'w-[90vw] max-w-[1000px]' : ''}`}>
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="p-4 md:p-6 rounded-2xl bg-[var(--color-bg)]/90 backdrop-blur-3xl border border-white/5 dark:border-white/5 light:border-black/5 shadow-[0_30px_60px_rgba(0,0,0,0.4)] overflow-hidden"
              >
                <div className={grid ? "flex flex-wrap justify-center gap-3" : "flex flex-col gap-1"}>
                  {items.map((item) => (
                    <button
                      key={item.page}
                      onClick={() => { 
                        onNavigate(item.page); 
                        setIsHovered(false); 
                        window.scrollTo({ top: 0, behavior: 'smooth' }); 
                      }}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all text-left group/item ${grid ? 'w-auto' : 'w-full'} ${activePage === item.page ? 'bg-primary/20 text-[var(--color-text)]' : 'text-zinc-400 dark:text-zinc-400 light:text-zinc-600 hover:bg-[var(--color-text)]/[0.05] hover:text-[var(--color-text)] transition-colors duration-1000'}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full transition-transform group-hover/item:scale-125 ${activePage === item.page ? 'bg-primary' : item.dotColor}`} />
                      <span className="text-[11px] font-black tracking-wider uppercase">{item.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] py-4 px-4 md:px-8 lg:px-12 pointer-events-none flex items-center justify-between transition-all duration-300">
      {/* Logo Area */}
      <div 
        onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className="cursor-pointer group transition-all pointer-events-auto shrink-0"
      >
        <motion.div
           animate={{ scale: [1, 1.02, 1] }}
           transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
           className="flex items-center"
        >
           <img 
             src={LOGO_SVG} 
             alt="IPDM Logo" 
             className="h-10 md:h-14 lg:h-18 w-auto object-contain transition-all duration-500 group-hover:scale-105 drop-shadow-[0_0_20px_rgba(59,130,246,0.2)]" 
             referrerPolicy="no-referrer"
           />
        </motion.div>
      </div>

      {/* Navigation Capsule Area */}
      <div className="flex flex-col items-end md:items-center flex-1">
        <div className="w-auto">
          <motion.div 
            style={{ 
              backgroundColor,
              backdropFilter,
              borderColor
            }}
            className="px-4 md:px-8 lg:px-8 py-2 md:py-2 rounded-xl md:rounded-full flex items-center gap-8 lg:gap-10 pointer-events-auto border transition-all duration-500 hover:bg-[var(--color-text)]/[0.05] shadow-[0_20px_40px_rgba(0,0,0,0.1)] relative"
          >
            
            {/* Navigation Links & CTA (Equally Spaced) */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-[13px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-400 light:text-zinc-600 transition-colors duration-1000">
              <NavDropdown 
                label="ABOUT" 
                dotColor="bg-blue-500/60"
                items={[
                  { page: 'about', label: 'WHO WE ARE', dotColor: 'bg-blue-500/60' },
                  { page: 'policies', label: 'POLICIES', dotColor: 'bg-zinc-500/60' },
                ]}
              />

              <NavLink page="ai-systems" label="CAPABILITIES" dotColor="bg-primary/60" />

              <NavDropdown 
                label="SOLUTIONS" 
                dotColor="bg-amber-500/60"
                items={[
                  { page: 'strategos', label: 'STRATEGOS', dotColor: 'bg-amber-500/60' },
                  { page: 'simulate', label: 'SIMULATE', dotColor: 'bg-blue-400/60' },
                  { page: 'dashboard', label: 'DASHBOARD', dotColor: 'bg-emerald-500/60' },
                  { page: 'employee-portal', label: 'EMPLOYEE PORTAL', dotColor: 'bg-primary/60' },
                ]}
              />

              <NavDropdown 
                label="ECOSYSTEM" 
                dotColor="bg-secondary/60"
                grid={true}
                items={[
                  { page: 'core-intel', label: 'CORE INTELLIGENCE', dotColor: 'bg-primary/60' },
                  { page: 'decision-modeling', label: 'DECISION & MODELING', dotColor: 'bg-blue-500/60' },
                  { page: 'revenue-growth', label: 'REVENUE & GROWTH', dotColor: 'bg-emerald-500/60' },
                  { page: 'brand-content', label: 'BRAND & CONTENT', dotColor: 'bg-pink-500/60' },
                  { page: 'knowledge-research', label: 'KNOWLEDGE & RESEARCH', dotColor: 'bg-amber-500/60' },
                  { page: 'ops-automation', label: 'OPERATIONS & AUTOMATIONS', dotColor: 'bg-indigo-500/60' },
                  { page: 'cust-experience', label: 'CUSTOMER EXPERIENCE', dotColor: 'bg-cyan-500/60' },
                  { page: 'adv-strategic', label: 'ADVANCED STRATEGIC', dotColor: 'bg-purple-500/60' },
                  { page: 'queries-guiding', label: 'QUERIES & GUIDING', dotColor: 'bg-orange-500/60' },
                  { page: 'ecosystem', label: 'ECOSYSTEM OVERVIEW', dotColor: 'bg-zinc-500/60' },
                ]}
              />

              <NavLink page="advisory" label="ADVISORY" dotColor="bg-primary/60" />
              <NavLink page="pricing" label="PRICING" dotColor="bg-accent/60" />

              <div className="h-4 w-px bg-[var(--color-text)]/10 hidden lg:block mx-1 transition-colors duration-1000" />

              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/5 text-zinc-400 transition-colors"
                  title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>

                <button 
                  onClick={() => openCalendly()}
                  className="hidden lg:flex px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-black rounded-full uppercase tracking-[0.1px] text-[10px] lg:text-xs items-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] border border-white/10 whitespace-nowrap"
                >
                  Let&apos;s Connect
                </button>
              </div>
            </div>

            <div className="md:hidden flex items-center gap-4">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-white/10 text-zinc-400 transition-colors"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button className="text-[var(--color-text)]" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X /> : <Menu />}
              </button>
            </div>
          </motion.div>

          {/* Mobile Menu */}
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 p-6 rounded-3xl flex flex-col gap-5 text-center pointer-events-auto border border-white/10 dark:border-white/10 light:border-black/5 bg-[var(--color-bg)]/90 backdrop-blur-3xl right-0 absolute w-[calc(100vw-2rem)] max-w-[300px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] light:shadow-[0_10px_30px_rgba(0,0,0,0.1)] z-[200] max-h-[80vh] overflow-y-auto"
            >
              <div className="flex flex-col gap-3">
                <button onClick={() => { onNavigate('home'); setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`${activePage === 'home' ? 'text-primary' : 'text-slate-500 dark:text-zinc-500'} font-bold uppercase tracking-widest text-[10px] hover:text-primary light:hover:text-black dark:hover:text-white transition-colors duration-500`}>Home</button>
                
                <div className="h-px bg-zinc-500/10 my-1" />
                <span className="text-[11px] text-zinc-500 font-black tracking-wider uppercase">About</span>
                <button onClick={() => { onNavigate('about'); setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`${activePage === 'about' ? 'text-primary' : 'text-zinc-500'} font-bold uppercase tracking-widest text-[10px] hover:text-primary light:hover:text-black dark:hover:text-white`}>Who We Are</button>
                <button onClick={() => { onNavigate('policies'); setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`${activePage === 'policies' ? 'text-primary' : 'text-zinc-500'} font-bold uppercase tracking-widest text-[10px] hover:text-primary light:hover:text-black dark:hover:text-white`}>Policies</button>
                
                <div className="h-px bg-zinc-500/10 my-1" />
                <button onClick={() => { onNavigate('ai-systems'); setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`${activePage === 'ai-systems' ? 'text-primary' : 'text-zinc-500'} font-bold uppercase tracking-widest text-[10px] hover:text-primary light:hover:text-black dark:hover:text-white`}>Capabilities</button>

                <div className="h-px bg-zinc-500/10 my-1" />
                <span className="text-[11px] text-zinc-500 font-black tracking-wider uppercase">Solutions</span>
                <button onClick={() => { onNavigate('strategos'); setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`${activePage === 'strategos' ? 'text-primary' : 'text-zinc-500'} font-bold uppercase tracking-widest text-[10px] hover:text-primary light:hover:text-black dark:hover:text-white`}>Strategos</button>
                <button onClick={() => { onNavigate('simulate'); setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`${activePage === 'simulate' ? 'text-primary' : 'text-zinc-500'} font-bold uppercase tracking-widest text-[10px] hover:text-primary light:hover:text-black dark:hover:text-white`}>Simulate</button>
                <button onClick={() => { onNavigate('dashboard'); setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`${activePage === 'dashboard' ? 'text-primary' : 'text-zinc-500'} font-bold uppercase tracking-widest text-[10px] hover:text-primary light:hover:text-black dark:hover:text-white`}>Dashboard</button>
                <button onClick={() => { onNavigate('employee-portal'); setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`${activePage === 'employee-portal' ? 'text-primary' : 'text-zinc-500'} font-bold uppercase tracking-widest text-[10px] hover:text-primary light:hover:text-black dark:hover:text-white`}>Employee Portal</button>

                 <div className="h-px bg-zinc-500/10 my-1" />
                <span className="text-[11px] text-zinc-500 font-black tracking-wider uppercase">Ecosystem</span>
                <button onClick={() => { onNavigate('core-intel'); setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`${activePage === 'core-intel' ? 'text-primary' : 'text-zinc-500'} font-bold uppercase tracking-widest text-[10px] hover:text-primary`}>Core Intelligence</button>
                <button onClick={() => { onNavigate('decision-modeling'); setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`${activePage === 'decision-modeling' ? 'text-primary' : 'text-zinc-500'} font-bold uppercase tracking-widest text-[10px] hover:text-primary`}>Decision & Modeling</button>
                <button onClick={() => { onNavigate('revenue-growth'); setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`${activePage === 'revenue-growth' ? 'text-primary' : 'text-zinc-500'} font-bold uppercase tracking-widest text-[10px] hover:text-primary`}>Revenue & Growth</button>
                <button onClick={() => { onNavigate('brand-content'); setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`${activePage === 'brand-content' ? 'text-primary' : 'text-zinc-500'} font-bold uppercase tracking-widest text-[10px] hover:text-primary`}>Brand & Content</button>
                <button onClick={() => { onNavigate('knowledge-research'); setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`${activePage === 'knowledge-research' ? 'text-primary' : 'text-zinc-500'} font-bold uppercase tracking-widest text-[10px] hover:text-primary`}>Knowledge & Research</button>
                <button onClick={() => { onNavigate('ops-automation'); setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`${activePage === 'ops-automation' ? 'text-primary' : 'text-zinc-500'} font-bold uppercase tracking-widest text-[10px] hover:text-primary`}>Operations & Automations</button>
                <button onClick={() => { onNavigate('cust-experience'); setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`${activePage === 'cust-experience' ? 'text-primary' : 'text-zinc-500'} font-bold uppercase tracking-widest text-[10px] hover:text-primary`}>Customer Experience</button>
                <button onClick={() => { onNavigate('adv-strategic'); setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`${activePage === 'adv-strategic' ? 'text-primary' : 'text-zinc-500'} font-bold uppercase tracking-widest text-[10px] hover:text-primary`}>Advanced Strategic</button>
                <button onClick={() => { onNavigate('queries-guiding'); setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`${activePage === 'queries-guiding' ? 'text-primary' : 'text-zinc-500'} font-bold uppercase tracking-widest text-[10px] hover:text-primary`}>Queries & Guiding</button>
                <button onClick={() => { onNavigate('ecosystem'); setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`${activePage === 'ecosystem' ? 'text-primary' : 'text-zinc-500'} font-bold uppercase tracking-widest text-[10px] hover:text-primary`}>Ecosystem Overview</button>

                <div className="h-px bg-zinc-500/10 my-1" />
                <button onClick={() => { onNavigate('advisory'); setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`${activePage === 'advisory' ? 'text-primary' : 'text-zinc-500'} font-bold uppercase tracking-widest text-[10px] hover:text-primary light:hover:text-black dark:hover:text-white`}>Advisory</button>
                <button onClick={() => { onNavigate('pricing'); setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`${activePage === 'pricing' ? 'text-primary' : 'text-zinc-500'} font-bold uppercase tracking-widest text-[10px] hover:text-primary light:hover:text-black dark:hover:text-white`}>Pricing</button>
              </div>
              
              <button 
                onClick={() => { openCalendly(); setIsOpen(false); }}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-black rounded-xl uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(59,130,246,0.3)] mt-2"
              >
                Let&apos;s Connect
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </nav>
  );
}
