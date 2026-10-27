import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter", display: "swap" });
const interTight = Inter_Tight({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-inter-tight", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Bryan Wei | Portfolio",
  description: "Bryan Wei - University of Waterloo Computer Science student and software developer.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Runs before the first paint so the page never flashes the wrong theme. Order: a toggle choice made earlier in
// this tab, then the system light/dark setting, then (only if the browser cannot report one) the clock,
// 06:00-18:00 light. It also marks the page as sitting on the hero, which tints Safari's status bar to match the
// photo. src/components/Enhancements.tsx keeps both in sync afterwards.
const themeScript = `(function () {
  var d = document.documentElement, o = null;
  d.dataset.atHero = "";
  try { o = sessionStorage.getItem("theme"); } catch (e) {}
  if (o === "dark" || o === "light") { d.dataset.theme = o; return; }
  var mm = window.matchMedia, dark = mm && matchMedia("(prefers-color-scheme: dark)"), light = mm && matchMedia("(prefers-color-scheme: light)");
  if (dark && (dark.matches || light.matches)) d.dataset.theme = dark.matches ? "dark" : "light";
  else { var h = new Date().getHours(); d.dataset.theme = (h >= 6 && h < 18) ? "light" : "dark"; }
})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
