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

      {/* Globe - full viewport background */}
      <div className="absolute inset-0 z-0">
        <InteractiveGlobe />
      </div>

      {/* Gradient overlays for readability */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-irip-bg/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-irip-bg via-irip-bg/80 to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="relative z-20 flex flex-col items-center justify-end min-h-screen pb-16 pt-20 px-4">
        {/* Hero text */}
        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-accent/10 border border-cyan-accent/20 text-cyan-accent text-xs font-mono tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-accent animate-pulse" />
              INTELLIGENCE & RISK INSIGHTS PLATFORM
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
          >
            Global Risk,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-accent to-emerald-accent">
              Visualized
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-muted-foreground text-base sm:text-lg mb-8 max-w-xl"
          >
            Interactive geopolitical, natural disaster, and cyber risk
            intelligence for companies and their global locations.
          </motion.p>

          {/* Search Bar */}
          <div className="w-full max-w-2xl mb-6">
            <SearchBar variant="hero" />
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
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

        {/* Bottom stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="w-full max-w-4xl mx-auto mt-8"
        >
          <div className="glass rounded-xl px-6 py-4">
            <div className="grid grid-cols-3 divide-x divide-white/10">
              <div className="flex items-center justify-center gap-3 px-4">
                <Shield className="h-5 w-5 text-cyan-accent flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground font-mono">
                    Risk Categories
                  </p>
                  <p className="text-sm font-bold">5 Domains</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 px-4">
                <Globe className="h-5 w-5 text-emerald-accent flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground font-mono">
                    Coverage
                  </p>
                  <p className="text-sm font-bold">195 Countries</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 px-4">
                <Zap className="h-5 w-5 text-amber-accent flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground font-mono">
                    Data Sources
                  </p>
                  <p className="text-sm font-bold">40+ APIs</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Country Panel */}
      <CountryPanel />
    </main>
  );
}
