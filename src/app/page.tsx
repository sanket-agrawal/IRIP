"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Globe, Zap } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { SearchBar } from "@/components/search/SearchBar";
import { CountryPanel } from "@/components/globe/CountryPanel";

const InteractiveGlobe = dynamic(
  () => import("@/components/globe/InteractiveGlobe"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-cyan-accent font-mono text-sm animate-pulse">
          Initializing globe...
        </div>
      </div>
    ),
  }
);

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-irip-bg">
      <Navbar />

      {/* Hero Section — split layout */}
      <section className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-8 min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col lg:flex-row items-center gap-8 lg:gap-4">
          {/* Left — Copy */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center py-8 lg:py-0 lg:pr-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-accent/10 border border-cyan-accent/20 text-cyan-accent text-xs font-mono tracking-wider uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-accent animate-pulse" />
                AI-Powered Risk Intelligence
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] mb-5"
            >
              Global Risk,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-accent to-emerald-accent">
                Visualized
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8 max-w-lg"
            >
              Interactive geopolitical, natural disaster, and cyber risk
              intelligence for companies and their global locations.
            </motion.p>

            {/* Search Bar */}
            <div className="w-full max-w-lg mb-6">
              <SearchBar variant="hero" />
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link
                href="/search"
                className="inline-flex items-center gap-2 text-sm text-cyan-accent hover:text-cyan-accent/80 transition-colors font-medium"
              >
                Explore Companies
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>

          {/* Right — Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative h-[500px] sm:h-[550px] lg:h-[650px]"
          >
            {/* Subtle glow behind globe */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[80%] h-[80%] rounded-full bg-cyan-accent/5 blur-3xl" />
            </div>
            <div className="absolute inset-0 z-10">
              <InteractiveGlobe />
            </div>
          </motion.div>
        </div>

        {/* Bottom stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="w-full max-w-4xl mx-auto mt-auto pt-4 pb-4"
        >
          <div className="glass rounded-xl px-4 sm:px-6 py-4">
            <div className="flex items-center justify-around sm:grid sm:grid-cols-3 sm:divide-x sm:divide-white/10">
              <div className="flex flex-col items-center gap-1 px-2 sm:flex-row sm:justify-center sm:gap-3 sm:px-4">
                <Shield className="h-5 w-5 text-cyan-accent flex-shrink-0" />
                <div className="text-center sm:text-left">
                  <p className="text-[10px] sm:text-xs text-muted-foreground font-mono leading-tight">
                    Risk Categories
                  </p>
                  <p className="text-xs sm:text-sm font-bold whitespace-nowrap">5 Domains</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1 px-2 sm:flex-row sm:justify-center sm:gap-3 sm:px-4">
                <Globe className="h-5 w-5 text-emerald-accent flex-shrink-0" />
                <div className="text-center sm:text-left">
                  <p className="text-[10px] sm:text-xs text-muted-foreground font-mono leading-tight">
                    Coverage
                  </p>
                  <p className="text-xs sm:text-sm font-bold whitespace-nowrap">195 Countries</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1 px-2 sm:flex-row sm:justify-center sm:gap-3 sm:px-4">
                <Zap className="h-5 w-5 text-amber-accent flex-shrink-0" />
                <div className="text-center sm:text-left">
                  <p className="text-[10px] sm:text-xs text-muted-foreground font-mono leading-tight">
                    Data Sources
                  </p>
                  <p className="text-xs sm:text-sm font-bold whitespace-nowrap">40+ APIs</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Country Panel */}
      <CountryPanel />
    </main>
  );
}
