"use client";

import { useState, useEffect, useRef } from "react";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function usePointerFine() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setFine(mq.matches);
    const handler = (e: MediaQueryListEvent) => setFine(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return fine;
}

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: -100, y: -100 });

  const reducedMotion = usePrefersReducedMotion();
  const pointerFine = usePointerFine();

  const shouldRender = pointerFine && !isTouch && !reducedMotion;

  useEffect(() => {
    if ("ontouchstart" in window) {
      setIsTouch(true);
      return;
    }

    if (!shouldRender) return;

    document.documentElement.style.cursor = "none";
    const styleEl = document.createElement("style");
    styleEl.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(styleEl);

    const move = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const tick = () => {
      setPos((p) => {
        const dx = targetRef.current.x - p.x;
        const dy = targetRef.current.y - p.y;
        if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return targetRef.current;
        return { x: p.x + dx * 0.35, y: p.y + dy * 0.35 };
      });
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", move);
    rafRef.current = requestAnimationFrame(tick);

    const addHover = () => setHovering(true);
    const removeHover = () => setHovering(false);

    const bind = () => {
      document.querySelectorAll("a, button, [role='button'], input, textarea, select").forEach((el) => {
        el.addEventListener("mouseenter", addHover);
        el.addEventListener("mouseleave", removeHover);
      });
    };

    bind();
    const observer = new MutationObserver(bind);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      document.documentElement.style.cursor = "";
      styleEl.remove();
    };
  }, [visible, shouldRender]);

  if (!shouldRender || !visible) return null;

  const size = hovering ? 30 : 12;

  return (
    <div
      className="pointer-events-none fixed z-[10000] rounded-full"
      style={{
        left: pos.x,
        top: pos.y,
        width: size,
        height: size,
        transform: "translate(-50%, -50%)",
        transition: "width 0.15s ease, height 0.15s ease, background 0.15s ease, border-color 0.15s ease",
        background: hovering ? "rgba(0,255,70,0.1)" : "transparent",
        border: `1px solid #00FF46`,
      }}
    />
  );
}
