// @ts-nocheck
import React, { useEffect, useRef } from "react";

export default function FluidBackground({ activePortal }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let animationId = 0;

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      frame += 0.004;
      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createRadialGradient(
        width * (activePortal === "taxes" ? 0.68 : 0.34),
        height * 0.42,
        0,
        width * 0.5,
        height * 0.45,
        width * 0.7
      );
      gradient.addColorStop(0, activePortal === "taxes" ? "rgba(112,0,255,0.28)" : "rgba(0,210,255,0.22)");
      gradient.addColorStop(0.42, "rgba(14,18,30,0.12)");
      gradient.addColorStop(1, "rgba(10,12,16,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      for (let layer = 0; layer < 7; layer++) {
        ctx.beginPath();
        const yBase = height * (0.18 + layer * 0.115);
        for (let x = -80; x <= width + 80; x += 18) {
          const y = yBase + Math.sin(x * 0.008 + frame * (1.2 + layer * 0.12)) * (26 + layer * 5) + Math.cos(x * 0.015 - frame * 1.6) * 12;
          if (x === -80) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = layer % 2 ? "rgba(0,210,255,0.055)" : "rgba(242,242,247,0.045)";
        ctx.lineWidth = 1.2;
        ctx.shadowBlur = 22;
        ctx.shadowColor = activePortal === "taxes" ? "rgba(112,0,255,0.5)" : "rgba(0,210,255,0.45)";
        ctx.stroke();
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [activePortal]);

  return <canvas ref={canvasRef} className="fixed inset-0 h-full w-full" style={{ zIndex: 0 }} />;
}