import type { Company, CountryRiskData, RiskAssessment, SearchResult } from "@/types";
import { mockCountryData, mockCompanies } from "./mock-data";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getAuthHeaders(): Promise<HeadersInit> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (typeof window !== "undefined") {
    try {
      const { default: clerkClient } = await import("@clerk/nextjs");
      // In production, attach Clerk JWT
      void clerkClient;
    } catch {
      // Clerk not initialized or not available
    }
  }

  return headers;
}

async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  if (!API_URL) {
    throw new Error("API_URL not configured");
  }

  const headers = await getAuthHeaders();
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: { ...headers, ...options?.headers },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function searchCompanies(query: string, limit = 10): Promise<SearchResult> {
  try {
    return await apiFetch<SearchResult>(
      `/companies/search?q=${encodeURIComponent(query)}&limit=${limit}`
    );
  } catch {
    const filtered = mockCompanies.filter(
      (c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.industry.toLowerCase().includes(query.toLowerCase())
    );
    return { companies: filtered.slice(0, limit), total: filtered.length };
  }
}

export async function getCompany(slug: string): Promise<Company | null> {
  try {
    return await apiFetch<Company>(`/companies/${slug}`);
  } catch {
    return mockCompanies.find((c) => c.slug === slug) ?? null;
  }
}

export async function getCompanyLocations(slug: string) {
  try {
    return await apiFetch<Company["locations"]>(`/companies/${slug}/locations`);
  } catch {
    const company = mockCompanies.find((c) => c.slug === slug);
    return company?.locations ?? [];
  }
}

export async function getCountryData(isoCode: string): Promise<CountryRiskData | null> {
  try {
    return await apiFetch<CountryRiskData>(`/countries/${isoCode}`);
  } catch {
    return mockCountryData[isoCode.toUpperCase()] ?? null;
  }
}

export async function getRiskAssessment(locationId: string): Promise<RiskAssessment | null> {
  try {
    return await apiFetch<RiskAssessment>(`/risk/${locationId}`);
  } catch {
    return null;
  }
}

export async function checkUsage(): Promise<{ allowed: boolean; reason?: string }> {
  try {
    return await apiFetch<{ allowed: boolean; reason?: string }>("/usage/check");
  } catch {
    return { allowed: true };
  }
}

export async function generateReport(companyId: string, locationId?: string): Promise<Blob> {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_URL}/reports/generate`, {
    method: "POST",
    headers,
    body: JSON.stringify({ company_id: companyId, location_id: locationId }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate report");
  }

  return response.blob();
}
