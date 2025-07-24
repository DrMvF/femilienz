import "../global.css";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";

export const metadata: Metadata = {
  title: {
    default: "Femilienz",
    template: "%s | Femilienz",
  },
  description:
    "A poetic system for reflection, resonance, and real transformation – built around Radical Sensitive Leadership and Ikigai.",
  openGraph: {
    title: "Femilienz",
    description:
      "A poetic system for reflection, resonance, and real transformation – built around Radical Sensitive Leadership and Ikigai.",
    url: "https://femilienz.de",
    siteName: "Femilienz",
    images: [
      {
        url: "https://femilienz.de/og.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "FEMILIENZ",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Analytics />
      </head>
      <body
        className={`bg-black text-white ${process.env.NODE_ENV === "development" ? "debug-screens" : ""
          }`}
      >
        {children}
      </body>
    </html>
  );
}
