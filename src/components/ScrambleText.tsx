"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";

interface ScrambleTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  speed?: number;
}

export default function ScrambleText({
  text,
  className = "",
  style,
  as: Tag = "span",
  delay = 0,
  speed = 30,
}: ScrambleTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [isInView, delay]);

  useEffect(() => {
    if (!started) return;

    let frame = 0;
    const totalFrames = text.length;
    const interval = setInterval(() => {
      const revealed = text.slice(0, frame);
      const scrambled = text
        .slice(frame)
        .split("")
        .map((ch) =>
          ch === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]
        )
        .join("");

      setDisplay(revealed + scrambled);
      frame++;

      if (frame > totalFrames) {
        clearInterval(interval);
        setDisplay(text);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed]);

  return (
    <Tag ref={ref as React.Ref<never>} className={className} style={style}>
      {started ? display : "\u00A0"}
    </Tag>
  );
}

/**
 * Inline word scramble — 3-4 fast iterations then reveal.
 * Total duration ~0.8s. Used for single keywords within a sentence.
 */
interface WordScrambleProps {
  word: string;
  className?: string;
  delay?: number;
  iterations?: number;
}

export function WordScramble({
  word,
  className = "",
  delay = 0,
  iterations = 4,
}: WordScrambleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(word);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isInView || done) return;

    const timer = setTimeout(() => {
      let frame = 0;
      const intervalMs = 800 / (iterations + 1);

      const interval = setInterval(() => {
        if (frame < iterations) {
          setDisplay(
            word
              .split("")
              .map((ch) =>
                ch === " "
                  ? " "
                  : CHARS[Math.floor(Math.random() * CHARS.length)]
              )
              .join("")
          );
        } else {
          setDisplay(word);
          setDone(true);
          clearInterval(interval);
        }
        frame++;
      }, intervalMs);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [isInView, done, word, delay, iterations]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
