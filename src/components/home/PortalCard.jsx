// @ts-nocheck
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function PortalCard({ portal, index, isActive, onHover, onLeave }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0, mx: 50, my: 50 });
  const [launching, setLaunching] = useState(false);

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y, mx: ((event.clientX - rect.left) / rect.width) * 100, my: ((event.clientY - rect.top) / rect.height) * 100 });
  };

  const handleClick = (e) => {
    e.preventDefault();
    setLaunching(true);
    setTimeout(() => {
      window.open(portal.url, "_blank", "noopener,noreferrer");
      setLaunching(false);
    }, 760);
  };

  return (
    <motion.a
      href={portal.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      onMouseEnter={() => onHover(portal.key)}
      onMouseLeave={() => {
        onLeave();
        setTilt({ x: 0, y: 0, mx: 50, my: 50 });
      }}
      onMouseMove={handleMove}
      initial={{ opacity: 0, y: 42, filter: "blur(14px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)", flex: isActive ? 1.24 : 1 }}
      transition={{ delay: 0.12 + index * 0.12, duration: 0.85, type: "spring", stiffness: 80, damping: 18 }}
      className="glass-card group relative min-h-[44vh] w-full overflow-hidden rounded-[1.5rem] text-left md:h-full md:min-h-0 no-underline"
      style={{ "--mx": `${tilt.mx}%`, "--my": `${tilt.my}%`, transformStyle: "preserve-3d", WebkitTapHighlightColor: "transparent" }}
    >
      <motion.div
        className="relative h-full w-full overflow-hidden rounded-[1.5rem]"
        animate={{ rotateX: tilt.y, rotateY: tilt.x, scale: isActive ? 1.015 : 1 }}
        transition={{ type: "spring", stiffness: 110, damping: 18, mass: 0.6 }}
      >
        <img src={portal.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.18] transition duration-700 group-hover:scale-110 group-hover:opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/72 to-background/30" />
        <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100 liquid-frost" />

        <div className="relative z-10 flex h-full flex-col justify-between p-5 md:p-7">
          <div className="flex items-start justify-between gap-4">
            <span className="font-display text-5xl font-extralight leading-none tracking-[-0.08em] text-foreground/[0.08] transition duration-500 group-hover:text-primary/20 md:text-6xl">0{index + 1}</span>
            <span className="translate-y-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-[0.22em] text-primary opacity-0 transition duration-400 group-hover:translate-y-0 group-hover:opacity-100">
              Enter portal
            </span>
          </div>

          <div className="space-y-3 text-shadow-glass">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.26em] text-primary/80 opacity-0 transition duration-400 group-hover:opacity-100">
              <span className="h-1 w-1 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
              Enter portal
            </div>
            <h2 className="font-heading text-3xl font-semibold tracking-[-0.04em] text-foreground md:text-4xl lg:text-5xl">{portal.title}</h2>
            <p className="max-h-0 overflow-hidden text-sm font-medium leading-6 text-foreground/65 opacity-0 transition-all duration-600 group-hover:max-h-24 group-hover:opacity-100">{portal.description}</p>
            <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] text-muted-foreground transition duration-300 group-hover:text-primary">
              <span className="h-1 w-1 rounded-full bg-primary/70" />
              <span className="truncate">{portal.host}</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {launching && (
          <motion.div
            layoutId={`portal-${portal.key}`}
            initial={{ inset: "0%", borderRadius: "2rem", opacity: 0.82 }}
            animate={{ inset: "-85%", borderRadius: "0rem", opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.72, ease: [0.7, 0, 0.15, 1] }}
            className="fixed z-[60] bg-background/70 backdrop-blur-3xl"
          />
        )}
      </AnimatePresence>
    </motion.a>
  );
}