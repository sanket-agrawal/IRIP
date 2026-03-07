import { create } from "zustand";
import type { CountryRiskData, Company, CompanyLocation, GlobeViewState } from "@/types";

interface GlobeState {
  selectedCountry: CountryRiskData | null;
  selectedCompany: Company | null;
  selectedLocation: CompanyLocation | null;
  globeView: GlobeViewState;
  isAutoRotating: boolean;
  hoveredCountryIso: string | null;

  setSelectedCountry: (country: CountryRiskData | null) => void;
  setSelectedCompany: (company: Company | null) => void;
  setSelectedLocation: (location: CompanyLocation | null) => void;
  setGlobeView: (view: Partial<GlobeViewState>) => void;
  setAutoRotating: (rotating: boolean) => void;
  setHoveredCountryIso: (iso: string | null) => void;
  resetGlobe: () => void;
}

const defaultView: GlobeViewState = {
  lat: 20,
  lng: 0,
  altitude: 2.5,
};

export const useGlobeStore = create<GlobeState>((set) => ({
  selectedCountry: null,
  selectedCompany: null,
  selectedLocation: null,
  globeView: defaultView,
  isAutoRotating: true,
  hoveredCountryIso: null,

  setSelectedCountry: (country) =>
    set({ selectedCountry: country, isAutoRotating: false }),

  setSelectedCompany: (company) =>
    set({ selectedCompany: company, isAutoRotating: false }),

  setSelectedLocation: (location) => set({ selectedLocation: location }),

  setGlobeView: (view) =>
    set((state) => ({
      globeView: { ...state.globeView, ...view },
    })),

  setAutoRotating: (rotating) => set({ isAutoRotating: rotating }),

  setHoveredCountryIso: (iso) => set({ hoveredCountryIso: iso }),

  resetGlobe: () =>
    set({
      selectedCountry: null,
      selectedCompany: null,
      selectedLocation: null,
      globeView: defaultView,
      isAutoRotating: true,
      hoveredCountryIso: null,
    }),
}));
