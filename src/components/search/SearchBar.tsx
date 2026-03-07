"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface SearchBarProps {
  variant?: "hero" | "compact";
  className?: string;
}

export function SearchBar({ variant = "hero", className = "" }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    },
    [query, router]
  );

  if (variant === "hero") {
    return (
      <motion.form
        onSubmit={handleSubmit}
        className={`w-full max-w-2xl mx-auto ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-accent/30 via-emerald-accent/30 to-cyan-accent/30 rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-500" />
          <div className="relative flex items-center glass rounded-xl px-5 py-4">
            <Search className="h-5 w-5 text-cyan-accent mr-3 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search companies by name, industry, or location..."
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base"
            />
            <button
              type="submit"
              className="ml-3 px-4 py-2 bg-cyan-accent text-irip-bg rounded-lg text-sm font-semibold hover:bg-cyan-accent/90 transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      </motion.form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search companies..."
        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-cyan-accent/50 transition-colors"
      />
    </form>
  );
}
