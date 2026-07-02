import React from "react";
import { motion } from "framer-motion";

export default function GlassHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-1/2 top-4 z-40 -translate-x-1/2"
    >

    </motion.header>
  );
}