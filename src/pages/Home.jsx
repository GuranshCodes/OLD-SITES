import React, { useState } from "react";
import { motion } from "framer-motion";
import FluidBackground from "@/components/home/FluidBackground";
import GlassHeader from "@/components/home/GlassHeader";
import PortalCard from "@/components/home/PortalCard";

const portals = [
  {
    key: "calculations",
    title: "Calculations",
    host: "calculations.classresources.ca",
    url: "https://calculations.classresources.ca",
    description: "A precise gateway for fast, focused calculation tools built for classroom clarity and instant access.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=900&q=80"
  },
  {
    key: "taxes",
    title: "Taxes",
    host: "taxes.classresources.ca",
    url: "https://taxes.classresources.ca",
    description: "A streamlined tax resource portal with refractive guidance, clean direction, and zero-friction entry.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80"
  }
];

export default function Home() {
  const [activePortal, setActivePortal] = useState(null);

  return (
    <main className="liquid-page fixed inset-0 overflow-hidden bg-background text-foreground">
      <FluidBackground activePortal={activePortal} />
      <div className="liquid-grid absolute inset-0 z-[1]" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-background/20 via-transparent to-background/75" />

      <GlassHeader />

      <section className="relative z-10 flex h-full flex-col px-4 pb-4 pt-20 md:px-8 md:pb-6 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.44em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />
              classresources.ca
            </div>
            <div className="h-3 w-px bg-foreground/10" />
            <h1 className="font-display text-xl font-light tracking-[-0.03em] text-foreground md:text-2xl">
              Select a <span className="font-semibold text-primary">Portal</span>
            </h1>
          </div>
          <div className="liquid-dock hidden rounded-full px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.24em] text-muted-foreground md:block">
            2 portals active
          </div>
        </motion.div>

        <div className="flex min-h-0 flex-1 flex-col gap-3 md:flex-row md:gap-4">
          {portals.map((portal, index) => (
            <PortalCard
              key={portal.key}
              portal={portal}
              index={index}
              isActive={activePortal === portal.key}
              onHover={setActivePortal}
              onLeave={() => setActivePortal(null)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}