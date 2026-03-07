"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, Shield, Zap, Building2, Globe } from "lucide-react";
import type { CountryRiskData } from "@/types";
import { useGlobeStore } from "@/store/useGlobeStore";
import {
  getRiskLabel,
  getRiskBadgeColor,
  formatPopulation,
  formatGDP,
} from "@/lib/mock-data";

function RiskScoreBadge({ score, label }: { score: number; label: string }) {
  const colorClass = getRiskBadgeColor(score);
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-mono text-sm font-semibold">
          {score.toFixed(1)}
        </span>
        <span
          className={`text-[10px] font-mono px-2 py-0.5 rounded border ${colorClass}`}
        >
          {getRiskLabel(score)}
        </span>
      </div>
    </div>
  );
}

export function CountryPanel() {
  const { selectedCountry, setSelectedCountry, setAutoRotating } =
    useGlobeStore();

  const handleClose = () => {
    setSelectedCountry(null);
    setAutoRotating(true);
  };

  return (
    <AnimatePresence>
      {selectedCountry && (
        <>
          {/* Mobile: bottom sheet, Desktop: right panel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/30 md:hidden"
            onClick={handleClose}
          />

          {/* Desktop side panel */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md hidden md:block"
          >
            <div className="h-full glass border-l border-white/10 overflow-y-auto">
              <PanelContent
                country={selectedCountry}
                onClose={handleClose}
              />
            </div>
          </motion.div>

          {/* Mobile bottom sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 right-0 bottom-0 z-50 md:hidden max-h-[80vh]"
          >
            <div className="glass rounded-t-2xl border-t border-white/10 overflow-y-auto max-h-[80vh]">
              <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mt-3" />
              <PanelContent
                country={selectedCountry}
                onClose={handleClose}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function PanelContent({
  country,
  onClose,
}: {
  country: CountryRiskData;
  onClose: () => void;
}) {
  const overallColor = getRiskBadgeColor(country.riskScores.overall);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{country.flag}</span>
          <div>
            <h2 className="text-xl font-bold">{country.name}</h2>
            <p className="text-sm text-muted-foreground font-mono">
              {country.region}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Overall Risk */}
      <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold flex items-center gap-2">
            <Shield className="h-4 w-4 text-cyan-accent" />
            Overall Risk Score
          </span>
          <span
            className={`text-xs font-mono px-2 py-1 rounded border ${overallColor}`}
          >
            {getRiskLabel(country.riskScores.overall)}
          </span>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-4xl font-bold font-mono">
            {country.riskScores.overall.toFixed(1)}
          </span>
          <span className="text-sm text-muted-foreground pb-1">/ 10</span>
        </div>
        <div className="mt-3 h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${(country.riskScores.overall / 10) * 100}%`,
              background: `linear-gradient(90deg, #10b981, #f59e0b, #ef4444)`,
            }}
          />
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <Globe className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
              Population
            </span>
          </div>
          <span className="text-lg font-bold font-mono">
            {formatPopulation(country.population)}
          </span>
        </div>
        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
              GDP
            </span>
          </div>
          <span className="text-lg font-bold font-mono">
            {formatGDP(country.gdp)}
          </span>
        </div>
        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
              Stability
            </span>
          </div>
          <span className="text-lg font-bold font-mono">
            {country.politicalStabilityIndex.toFixed(1)}
          </span>
        </div>
        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
              Companies
            </span>
          </div>
          <span className="text-lg font-bold font-mono">
            {country.trackedCompanies}
          </span>
        </div>
      </div>

      {/* Risk Breakdown */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider font-mono">
          Risk Breakdown
        </h3>
        <div className="divide-y divide-white/5">
          <RiskScoreBadge
            score={country.riskScores.naturalDisaster}
            label="Natural Disaster"
          />
          <RiskScoreBadge
            score={country.riskScores.cyber}
            label="Cyber"
          />
          <RiskScoreBadge
            score={country.riskScores.geopolitical}
            label="Geopolitical"
          />
        </div>
      </div>

      {/* Top Risks */}
      <div>
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider font-mono">
          Top Risk Factors
        </h3>
        <div className="flex flex-wrap gap-2">
          {country.topRisks.map((risk) => (
            <span
              key={risk}
              className="text-xs font-mono px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground"
            >
              {risk}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
