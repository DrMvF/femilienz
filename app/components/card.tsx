"use client";

import {
  motion,
  useMotionTemplate,
  useSpring,
} from "framer-motion";

import { PropsWithChildren } from "react";

export const Card: React.FC<PropsWithChildren> = ({ children }) => {
  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div
      onMouseMove={onMouseMove}
      className="relative overflow-hidden rounded-xl border duration-700 
                 group 
                 border-zinc-300 dark:border-zinc-600 
                 hover:border-zinc-500/50 dark:hover:border-zinc-400/50 
                 hover:bg-zinc-100/10 dark:hover:bg-zinc-800/10"
    >
      {/* Overlay Glow & Mask */}
      <div className="pointer-events-none">
        <div className="absolute inset-0 z-0 transition duration-1000 [mask-image:linear-gradient(black,transparent)]" />

        <motion.div
          className="absolute inset-0 z-10 bg-gradient-to-br from-transparent via-zinc-100/10 to-transparent 
                     transition duration-1000 opacity-100 group-hover:opacity-50 
                     dark:via-zinc-300/10"
          style={style}
        />

        <motion.div
          className="absolute inset-0 z-10 mix-blend-overlay transition duration-1000 opacity-0 
                     group-hover:opacity-100"
          style={style}
        />
      </div>

      <div className="relative z-20 p-6 font-serif prose prose-zinc dark:prose-invert">
        {children}
      </div>
    </div>
  );
};
