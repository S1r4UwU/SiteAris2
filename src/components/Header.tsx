"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "OFFRES", href: "#offres" },
  { label: "INFRASTRUCTURE", href: "#infrastructure" },
  { label: "TERMINAL", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(5,5,5,0.95)] backdrop-blur-xl"
          : "bg-[rgba(5,5,5,0.85)] backdrop-blur-md"
      }`}
      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-16">
        <a href="#" className="font-mono text-lg font-bold tracking-[0.3em] text-text">
          ARIS<span className="text-cyber-green">_</span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-xs tracking-[0.15em] text-text-tertiary px-4 py-2 transition-colors duration-200 hover:text-text"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#offres"
            className="ml-4 font-mono text-[11px] tracking-[0.15em] uppercase px-5 py-2.5 bg-text text-bg hover:bg-transparent hover:text-text transition-all duration-200"
            style={{ border: "1px solid #EDEDED" }}
          >
            DÉPLOYER
          </a>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-text p-2"
          aria-label="Menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden overflow-hidden bg-[rgba(5,5,5,0.95)] backdrop-blur-xl"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-mono text-sm tracking-[0.15em] text-text-tertiary hover:text-text transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#offres"
                onClick={() => setMobileOpen(false)}
                className="mt-2 font-mono text-[11px] tracking-[0.15em] uppercase px-5 py-3 bg-text text-bg text-center hover:bg-transparent hover:text-text transition-all duration-200"
                style={{ border: "1px solid #EDEDED" }}
              >
                DÉPLOYER
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
