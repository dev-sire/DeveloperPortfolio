"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Transition } from "framer-motion";
import { cn } from "@/lib/utils";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Random uppercase letters, never the same one twice in a row and never the real letter next to itself.
const randomLetters = (count: number, real: string) => {
  const out: string[] = [];
  let previous = real.toUpperCase();
  for (let i = 0; i < count; i++) {
    let next = previous;
    while (next === previous) next = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
    out.push(next);
    previous = next;
  }
  return out;
};

type RandomLetterSwapProps = {
  label: string;
  className?: string;
  // Delay between one letter starting and the next.
  staggerDuration?: number;
  transition?: Transition;
  // How many random letters each letter rolls through before landing on the real one.
  rolls?: number;
  // "self" listens on this element; "parent" listens on the closest link or button, so the whole link is the hover target.
  trigger?: "self" | "parent";
  disabled?: boolean;
};

// Hover or focus: every letter rolls through a few random letters (in red) and lands back on itself.
// The server renders plain text; the random letters only exist while a hover is in progress.
export function RandomLetterSwap({
  label,
  className,
  staggerDuration = 0.025,
  transition = { duration: 0.6, type: "spring" },
  rolls = 3,
  trigger = "self",
  disabled = false,
}: RandomLetterSwapProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const [strips, setStrips] = useState<string[][] | null>(null);
  const off = disabled || !!reduceMotion;
  const letters = Array.from(label);

  const start = useCallback(() => {
    if (off) return;
    setStrips(Array.from(label).map((char) => (char.trim() ? randomLetters(rolls, char) : [])));
  }, [off, label, rolls]);
  const stop = useCallback(() => setStrips(null), []);

  useEffect(() => {
    const host = trigger === "parent" ? rootRef.current?.closest("a, button") : rootRef.current;
    if (!host) return;
    host.addEventListener("mouseenter", start);
    host.addEventListener("mouseleave", stop);
    host.addEventListener("focus", start);
    host.addEventListener("blur", stop);
    return () => {
      host.removeEventListener("mouseenter", start);
      host.removeEventListener("mouseleave", stop);
      host.removeEventListener("focus", start);
      host.removeEventListener("blur", stop);
    };
  }, [trigger, start, stop]);

  return (
    <span ref={rootRef} className={cn("inline-flex", className)}>
      {letters.map((char, i) => {
        const strip = strips?.[i];
        const rolling = !!strip && strip.length > 0;
        return (
          <span key={i} className="relative inline-block" style={{ overflowX: "visible", overflowY: "clip" }}>
            <span className={rolling ? "invisible" : undefined}>{char === " " ? "\u00A0" : char}</span>
            {rolling && (
              <motion.span
                aria-hidden="true"
                className="absolute left-0 top-0 flex flex-col"
                initial={{ y: "0%" }}
                animate={{ y: `-${((strip.length + 1) * 100) / (strip.length + 2)}%` }}
                transition={{ ...transition, delay: i * staggerDuration }}
              >
                {[char, ...strip, char].map((item, j, all) => (
                  <span key={j} className={j > 0 && j < all.length - 1 ? "text-[#e32b3c]" : undefined}>{item}</span>
                ))}
              </motion.span>
            )}
          </span>
        );
      })}
    </span>
  );
}

export default RandomLetterSwap;
