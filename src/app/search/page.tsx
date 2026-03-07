"use client";

import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { SearchBar } from "@/components/search/SearchBar";
import { Globe } from "lucide-react";

function SearchContent() {
  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Search Companies</h1>
        <p className="text-muted-foreground mb-8">
          Find companies and explore their global risk profiles
        </p>
        <SearchBar variant="hero" />
        <div className="mt-16 flex flex-col items-center text-muted-foreground">
          <Globe className="h-16 w-16 mb-4 opacity-20" />
          <p className="text-sm">Enter a company name to get started</p>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <>
      <Navbar />
      <Suspense>
        <SearchContent />
      </Suspense>
    </>
  );
}
