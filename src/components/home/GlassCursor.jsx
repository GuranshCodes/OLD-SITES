import React, { useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export default function GlassCursor() {
  const cursorRef = useRef(null);
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, { stiffness: 520, damping: 36, mass: 0.28 });
  const y = useSpring(rawY, { stiffness: 520, damping: 36, mass: 0.28 });

  useEffect(() => {
    const move = (e) => {
      rawX.set(e.clientX - 20);
      rawY.set(e.clientY - 20);
    };
    const over = (e) => {
      const el = cursorRef.current;
      if (!el) return;
      const isHot = Boolean(e.target.closest("a, button, .glass-card"));
      el.style.transform = `${el.style.transform?.replace(/scale\([^)]*\)/, "") ?? ""} scale(${isHot ? 1.55 : 1})`;
      el.style.width = isHot ? "52px" : "40px";
      el.style.height = isHot ? "52px" : "40px";
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [rawX, rawY]);

  useEffect(() => {
    const unsubX = x.on("change", () => update());
    const unsubY = y.on("change", () => update());
    const update = () => {
      const el = cursorRef.current;
      if (!el) return;
      el.style.translate = `${x.get()}px ${y.get()}px`;
    };
    return () => { unsubX(); unsubY(); };
  }, [x, y]);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-10 w-10 rounded-full border border-white/30 md:block"
      style={{
        background: "rgba(255,255,255,0.07)",
        boxShadow: "inset 0 0 14px rgba(255,255,255,0.15), 0 0 22px rgba(0,210,255,0.22)",
        backdropFilter: "blur(6px)",
        transition: "width 200ms ease, height 200ms ease",
        willChange: "translate",
      }}
    />
  );
}