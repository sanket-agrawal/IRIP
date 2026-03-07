import type { CountryRiskData, Company } from "@/types";

export const mockCountryData: Record<string, CountryRiskData> = {
  USA: {
    iso: "USA",
    name: "United States",
    flag: "🇺🇸",
    region: "North America",
    population: 331_900_000,
    gdp: 25_460,
    politicalStabilityIndex: 7.2,
    riskScores: { overall: 4.1, naturalDisaster: 5.8, cyber: 3.5, geopolitical: 2.9 },
    topRisks: ["Hurricanes", "Wildfires", "Cyber espionage"],
    trackedCompanies: 142,
  },
  GBR: {
    iso: "GBR",
    name: "United Kingdom",
    flag: "🇬🇧",
    region: "Europe",
    population: 67_330_000,
    gdp: 3_070,
    politicalStabilityIndex: 7.8,
    riskScores: { overall: 2.8, naturalDisaster: 1.9, cyber: 3.8, geopolitical: 2.6 },
    topRisks: ["Flooding", "Ransomware", "Political instability"],
    trackedCompanies: 87,
  },
  IND: {
    iso: "IND",
    name: "India",
    flag: "🇮🇳",
    region: "South Asia",
    population: 1_428_600_000,
    gdp: 3_730,
    politicalStabilityIndex: 5.5,
    riskScores: { overall: 5.6, naturalDisaster: 7.2, cyber: 4.8, geopolitical: 4.7 },
    topRisks: ["Cyclones", "Flooding", "Earthquakes", "Cyber threats"],
    trackedCompanies: 63,
  },
  CHN: {
    iso: "CHN",
    name: "China",
    flag: "🇨🇳",
    region: "East Asia",
    population: 1_425_700_000,
    gdp: 17_960,
    politicalStabilityIndex: 4.2,
    riskScores: { overall: 5.9, naturalDisaster: 6.1, cyber: 6.5, geopolitical: 5.2 },
    topRisks: ["Typhoons", "Earthquakes", "Cyber warfare", "Trade tensions"],
    trackedCompanies: 95,
  },
  JPN: {
    iso: "JPN",
    name: "Japan",
    flag: "🇯🇵",
    region: "East Asia",
    population: 125_100_000,
    gdp: 4_230,
    politicalStabilityIndex: 8.5,
    riskScores: { overall: 4.5, naturalDisaster: 8.1, cyber: 2.8, geopolitical: 2.5 },
    topRisks: ["Earthquakes", "Tsunamis", "Typhoons", "Volcanism"],
    trackedCompanies: 54,
  },
  DEU: {
    iso: "DEU",
    name: "Germany",
    flag: "🇩🇪",
    region: "Europe",
    population: 83_200_000,
    gdp: 4_070,
    politicalStabilityIndex: 8.1,
    riskScores: { overall: 2.3, naturalDisaster: 2.1, cyber: 3.2, geopolitical: 1.5 },
    topRisks: ["Flooding", "Industrial cyber attacks"],
    trackedCompanies: 72,
  },
  BRA: {
    iso: "BRA",
    name: "Brazil",
    flag: "🇧🇷",
    region: "South America",
    population: 215_300_000,
    gdp: 1_920,
    politicalStabilityIndex: 5.0,
    riskScores: { overall: 5.2, naturalDisaster: 4.8, cyber: 4.1, geopolitical: 6.7 },
    topRisks: ["Flooding", "Landslides", "Deforestation fires", "Political unrest"],
    trackedCompanies: 38,
  },
  AUS: {
    iso: "AUS",
    name: "Australia",
    flag: "🇦🇺",
    region: "Oceania",
    population: 26_000_000,
    gdp: 1_680,
    politicalStabilityIndex: 8.7,
    riskScores: { overall: 3.9, naturalDisaster: 6.5, cyber: 2.5, geopolitical: 1.8 },
    topRisks: ["Bushfires", "Cyclones", "Flooding"],
    trackedCompanies: 31,
  },
  RUS: {
    iso: "RUS",
    name: "Russia",
    flag: "🇷🇺",
    region: "Eastern Europe / North Asia",
    population: 144_200_000,
    gdp: 2_240,
    politicalStabilityIndex: 2.5,
    riskScores: { overall: 7.8, naturalDisaster: 3.5, cyber: 8.2, geopolitical: 9.1 },
    topRisks: ["Cyber operations", "Sanctions", "Conflict", "Political instability"],
    trackedCompanies: 12,
  },
  FRA: {
    iso: "FRA",
    name: "France",
    flag: "🇫🇷",
    region: "Europe",
    population: 67_750_000,
    gdp: 2_780,
    politicalStabilityIndex: 7.0,
    riskScores: { overall: 2.9, naturalDisaster: 2.5, cyber: 3.4, geopolitical: 2.8 },
    topRisks: ["Flooding", "Heatwaves", "Terrorism risk"],
    trackedCompanies: 58,
  },
  SGP: {
    iso: "SGP",
    name: "Singapore",
    flag: "🇸🇬",
    region: "Southeast Asia",
    population: 5_900_000,
    gdp: 397,
    politicalStabilityIndex: 9.2,
    riskScores: { overall: 1.5, naturalDisaster: 0.8, cyber: 2.8, geopolitical: 0.9 },
    topRisks: ["Cyber threats", "Sea level rise"],
    trackedCompanies: 45,
  },
  ISR: {
    iso: "ISR",
    name: "Israel",
    flag: "🇮🇱",
    region: "Middle East",
    population: 9_800_000,
    gdp: 525,
    politicalStabilityIndex: 3.5,
    riskScores: { overall: 7.1, naturalDisaster: 3.2, cyber: 5.5, geopolitical: 9.5 },
    topRisks: ["Armed conflict", "Cyber warfare", "Terrorism"],
    trackedCompanies: 28,
  },
  ARE: {
    iso: "ARE",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    region: "Middle East",
    population: 10_000_000,
    gdp: 507,
    politicalStabilityIndex: 7.5,
    riskScores: { overall: 2.8, naturalDisaster: 2.1, cyber: 3.5, geopolitical: 2.9 },
    topRisks: ["Extreme heat", "Regional instability"],
    trackedCompanies: 35,
  },
  NGA: {
    iso: "NGA",
    name: "Nigeria",
    flag: "🇳🇬",
    region: "West Africa",
    population: 223_800_000,
    gdp: 477,
    politicalStabilityIndex: 3.0,
    riskScores: { overall: 7.5, naturalDisaster: 5.2, cyber: 5.8, geopolitical: 8.5 },
    topRisks: ["Insurgency", "Kidnapping", "Flooding", "Oil theft"],
    trackedCompanies: 15,
  },
  ZAF: {
    iso: "ZAF",
    name: "South Africa",
    flag: "🇿🇦",
    region: "Southern Africa",
    population: 60_400_000,
    gdp: 405,
    politicalStabilityIndex: 4.5,
    riskScores: { overall: 5.8, naturalDisaster: 3.8, cyber: 5.2, geopolitical: 6.5 },
    topRisks: ["Power outages", "Crime", "Social unrest", "Drought"],
    trackedCompanies: 22,
  },
  KOR: {
    iso: "KOR",
    name: "South Korea",
    flag: "🇰🇷",
    region: "East Asia",
    population: 51_740_000,
    gdp: 1_670,
    politicalStabilityIndex: 7.0,
    riskScores: { overall: 3.8, naturalDisaster: 3.2, cyber: 4.5, geopolitical: 3.8 },
    topRisks: ["North Korea tensions", "Typhoons", "Cyber attacks"],
    trackedCompanies: 41,
  },
  MEX: {
    iso: "MEX",
    name: "Mexico",
    flag: "🇲🇽",
    region: "North America",
    population: 128_900_000,
    gdp: 1_320,
    politicalStabilityIndex: 4.2,
    riskScores: { overall: 6.2, naturalDisaster: 5.5, cyber: 3.8, geopolitical: 7.5 },
    topRisks: ["Earthquakes", "Hurricanes", "Cartel violence", "Crime"],
    trackedCompanies: 25,
  },
  IDN: {
    iso: "IDN",
    name: "Indonesia",
    flag: "🇮🇩",
    region: "Southeast Asia",
    population: 275_500_000,
    gdp: 1_320,
    politicalStabilityIndex: 5.8,
    riskScores: { overall: 5.8, naturalDisaster: 8.5, cyber: 3.5, geopolitical: 3.8 },
    topRisks: ["Earthquakes", "Tsunamis", "Volcanism", "Flooding"],
    trackedCompanies: 19,
  },
  CAN: {
    iso: "CAN",
    name: "Canada",
    flag: "🇨🇦",
    region: "North America",
    population: 40_100_000,
    gdp: 2_140,
    politicalStabilityIndex: 8.9,
    riskScores: { overall: 2.1, naturalDisaster: 3.2, cyber: 2.0, geopolitical: 1.2 },
    topRisks: ["Wildfires", "Flooding", "Extreme cold"],
    trackedCompanies: 48,
  },
  UKR: {
    iso: "UKR",
    name: "Ukraine",
    flag: "🇺🇦",
    region: "Eastern Europe",
    population: 37_000_000,
    gdp: 160,
    politicalStabilityIndex: 1.5,
    riskScores: { overall: 9.5, naturalDisaster: 2.5, cyber: 8.0, geopolitical: 10.0 },
    topRisks: ["Active conflict", "Cyber warfare", "Infrastructure destruction"],
    trackedCompanies: 5,
  },
};

/**
 * Maps ISO 3166-1 numeric codes (used in TopoJSON) to ISO alpha-3 codes.
 * Covers the countries we have mock data for.
 */
export const numericToAlpha3: Record<string, string> = {
  "840": "USA", "826": "GBR", "356": "IND", "156": "CHN", "392": "JPN",
  "276": "DEU", "076": "BRA", "036": "AUS", "643": "RUS", "250": "FRA",
  "702": "SGP", "376": "ISR", "784": "ARE", "566": "NGA", "710": "ZAF",
  "410": "KOR", "484": "MEX", "360": "IDN", "124": "CAN", "804": "UKR",
};

export function getRiskColor(score: number): string {
  if (score <= 2) return "rgba(16, 185, 129, 0.6)";   // emerald
  if (score <= 4) return "rgba(34, 197, 94, 0.5)";    // green
  if (score <= 5.5) return "rgba(245, 158, 11, 0.5)"; // amber
  if (score <= 7) return "rgba(249, 115, 22, 0.5)";   // orange
  if (score <= 8.5) return "rgba(239, 68, 68, 0.5)";  // red
  return "rgba(220, 38, 38, 0.7)";                     // deep red
}

export function getRiskLabel(score: number): string {
  if (score <= 2.5) return "Low";
  if (score <= 5) return "Moderate";
  if (score <= 7.5) return "High";
  return "Critical";
}

export function getRiskBadgeColor(score: number): string {
  if (score <= 2.5) return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
  if (score <= 5) return "text-amber-400 bg-amber-400/10 border-amber-400/20";
  if (score <= 7.5) return "text-orange-400 bg-orange-400/10 border-orange-400/20";
  return "text-red-400 bg-red-400/10 border-red-400/20";
}

export function formatPopulation(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
}

export function formatGDP(bn: number): string {
  if (bn >= 1_000) return `$${(bn / 1_000).toFixed(1)}T`;
  return `$${bn}B`;
}

export const mockCompanies: Company[] = [
  {
    id: "1",
    slug: "tata-consultancy-services",
    name: "Tata Consultancy Services",
    industry: "Information Technology",
    website: "https://www.tcs.com",
    employeeCount: 614_000,
    hqCountry: "India",
    locations: [
      { id: "tcs-1", name: "Global HQ", city: "Mumbai", country: "India", countryIso: "IND", lat: 19.076, lng: 72.8777, type: "headquarters" },
      { id: "tcs-2", name: "US Office", city: "New York", country: "USA", countryIso: "USA", lat: 40.7128, lng: -74.006, type: "office" },
      { id: "tcs-3", name: "UK Office", city: "London", country: "UK", countryIso: "GBR", lat: 51.5074, lng: -0.1278, type: "office" },
      { id: "tcs-4", name: "Japan Office", city: "Tokyo", country: "Japan", countryIso: "JPN", lat: 35.6762, lng: 139.6503, type: "office" },
    ],
  },
  {
    id: "2",
    slug: "reliance-industries",
    name: "Reliance Industries",
    industry: "Conglomerate",
    website: "https://www.ril.com",
    employeeCount: 389_000,
    hqCountry: "India",
    locations: [
      { id: "ril-1", name: "Global HQ", city: "Mumbai", country: "India", countryIso: "IND", lat: 19.076, lng: 72.8777, type: "headquarters" },
      { id: "ril-2", name: "Refinery Complex", city: "Jamnagar", country: "India", countryIso: "IND", lat: 22.4707, lng: 70.0577, type: "factory" },
      { id: "ril-3", name: "US Office", city: "Houston", country: "USA", countryIso: "USA", lat: 29.7604, lng: -95.3698, type: "office" },
    ],
  },
  {
    id: "3",
    slug: "infosys",
    name: "Infosys",
    industry: "Information Technology",
    website: "https://www.infosys.com",
    employeeCount: 343_000,
    hqCountry: "India",
    locations: [
      { id: "infy-1", name: "Global HQ", city: "Bengaluru", country: "India", countryIso: "IND", lat: 12.9716, lng: 77.5946, type: "headquarters" },
      { id: "infy-2", name: "US Campus", city: "Indianapolis", country: "USA", countryIso: "USA", lat: 39.7684, lng: -86.1581, type: "office" },
      { id: "infy-3", name: "Europe Office", city: "Zurich", country: "Switzerland", countryIso: "CHE", lat: 47.3769, lng: 8.5417, type: "office" },
    ],
  },
  {
    id: "4",
    slug: "samsung-electronics",
    name: "Samsung Electronics",
    industry: "Electronics",
    website: "https://www.samsung.com",
    employeeCount: 267_000,
    hqCountry: "South Korea",
    locations: [
      { id: "sam-1", name: "HQ", city: "Suwon", country: "South Korea", countryIso: "KOR", lat: 37.2636, lng: 127.0286, type: "headquarters" },
      { id: "sam-2", name: "Semiconductor Plant", city: "Austin", country: "USA", countryIso: "USA", lat: 30.2672, lng: -97.7431, type: "factory" },
      { id: "sam-3", name: "R&D Center", city: "Bengaluru", country: "India", countryIso: "IND", lat: 12.9716, lng: 77.5946, type: "office" },
    ],
  },
  {
    id: "5",
    slug: "shell-plc",
    name: "Shell plc",
    industry: "Energy",
    website: "https://www.shell.com",
    employeeCount: 93_000,
    hqCountry: "United Kingdom",
    locations: [
      { id: "shel-1", name: "Global HQ", city: "London", country: "UK", countryIso: "GBR", lat: 51.5074, lng: -0.1278, type: "headquarters" },
      { id: "shel-2", name: "Refinery", city: "Rotterdam", country: "Netherlands", countryIso: "NLD", lat: 51.9244, lng: 4.4777, type: "factory" },
      { id: "shel-3", name: "Nigeria Operations", city: "Lagos", country: "Nigeria", countryIso: "NGA", lat: 6.5244, lng: 3.3792, type: "office" },
      { id: "shel-4", name: "US HQ", city: "Houston", country: "USA", countryIso: "USA", lat: 29.7604, lng: -95.3698, type: "office" },
    ],
  },
];
