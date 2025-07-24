import Link from "next/link";
import React from "react";
import Particles from "./components/particles";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-700/20 to-black">
      {/* Navigation */}
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base font-serif text-white hover:text-zinc-300 duration-500"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>

      {/* Glow Divider oben */}
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

      {/* Particles */}
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />

      {/* Haupttitel */}
      <h1 className="py-3.5 px-0.5 z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-serif sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text">
        Femilienz
      </h1>

      {/* Glow Divider unten */}
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

      {/* Untertitel */}
      <div className="my-16 text-center animate-fade-in">
        <h2 className="text-base text-white leading-relaxed font-serif">
          Feminine energy. Mental clarity. Inner wisdom. A rhythm of resilience.
        </h2>
      </div>
    </div>
  );
}
