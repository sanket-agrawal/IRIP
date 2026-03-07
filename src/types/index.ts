export interface CountryRiskData {
  iso: string;
  name: string;
  flag: string;
  region: string;
  population: number;
  gdp: number;
  politicalStabilityIndex: number;
  riskScores: {
    overall: number;
    naturalDisaster: number;
    cyber: number;
    geopolitical: number;
  };
  topRisks: string[];
  trackedCompanies: number;
}

export interface Company {
  id: string;
  slug: string;
  name: string;
  logo?: string;
  industry: string;
  website: string;
  employeeCount: number;
  hqCountry: string;
  locations: CompanyLocation[];
}

export interface CompanyLocation {
  id: string;
  name: string;
  city: string;
  country: string;
  countryIso: string;
  lat: number;
  lng: number;
  type: "headquarters" | "office" | "datacenter" | "warehouse" | "factory";
}

export interface RiskAssessment {
  locationId: string;
  overallScore: number;
  category: "Low" | "Moderate" | "High" | "Critical";
  naturalDisaster: {
    earthquake: number;
    flood: number;
    cyclone: number;
    wildfire: number;
    volcano: number;
  };
  cyber: {
    exposureScore: number;
    threatLevel: "Low" | "Moderate" | "High" | "Critical";
    breakdownCards: { label: string; score: number }[];
  };
  geopolitical: {
    politicalStabilityIndex: number;
    conflictProximityScore: number;
    recentEvents: GeopoliticalEvent[];
  };
  infrastructure: {
    nearestAirport: string;
    internetQuality: "Poor" | "Fair" | "Good" | "Excellent";
    powerReliability: "Unreliable" | "Fair" | "Reliable" | "Very Reliable";
  };
}

export interface GeopoliticalEvent {
  id: string;
  title: string;
  date: string;
  severity: "Low" | "Medium" | "High";
  description: string;
}

export interface UserPlan {
  tier: "free" | "starter" | "pro" | "enterprise";
  searchesUsed: number;
  searchesLimit: number;
  reportsUsed: number;
  reportsLimit: number;
}

export interface GlobeViewState {
  lat: number;
  lng: number;
  altitude: number;
}

export interface SearchResult {
  companies: Company[];
  total: number;
}
