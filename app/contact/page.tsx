"use client";
import { Youtube, Linkedin, Twitter} from "lucide-react";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";

const socials = [
  {
    icon: <Youtube size={20} />,
    href: "https://www.youtube.com/@DrMiriamvonFelbert",
    label: "YouTube",
    handle: "@DrMiriamvonFelbert",
  },
  {
    icon: <Linkedin size={20} />,
    href: "https://www.linkedin.com/in/miriamvonfelbert/",
    label: "LinkedIn",
    handle: "Miriam von Felbert",
  },
  {
    icon: <Twitter size={20} />,
    href: "https://x.com/DrMvonFelbert",
    label: "X (Twitter)",
    handle: "@DrMvonFelbert",
  },
];

export default function ContactPage() {
  return (
    <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 min-h-screen">
      <Navigation />
      <div className="mx-auto max-w-6xl px-4 py-24">
        <h1 className="mb-12 text-3xl font-bold text-center text-zinc-100 font-display">
          Get in Touch
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {socials.map((s) => (
            <Card key={s.href}>
              <Link
                href={s.href}
                target="_blank"
                className="flex items-center gap-4 p-6 group hover:bg-zinc-800 transition rounded-xl"
              >
                <span className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-500 bg-zinc-900 text-zinc-200 group-hover:text-white">
                  {s.icon}
                </span>
                <div>
                  <p className="font-medium text-zinc-200 group-hover:text-white">{s.label}</p>
                  <p className="text-sm text-zinc-400">{s.handle}</p>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
