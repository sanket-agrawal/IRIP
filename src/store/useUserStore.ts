import { create } from "zustand";
import type { UserPlan } from "@/types";

interface UserState {
  plan: UserPlan;
  setPlan: (plan: UserPlan) => void;
  incrementSearches: () => void;
  incrementReports: () => void;
  canSearch: () => boolean;
  canDownloadReport: () => boolean;
}

const defaultPlan: UserPlan = {
  tier: "free",
  searchesUsed: 0,
  searchesLimit: 1,
  reportsUsed: 0,
  reportsLimit: 1,
};

export const useUserStore = create<UserState>((set, get) => ({
  plan: defaultPlan,

  setPlan: (plan) => set({ plan }),

  incrementSearches: () =>
    set((state) => ({
      plan: { ...state.plan, searchesUsed: state.plan.searchesUsed + 1 },
    })),

  incrementReports: () =>
    set((state) => ({
      plan: { ...state.plan, reportsUsed: state.plan.reportsUsed + 1 },
    })),

  canSearch: () => {
    const { plan } = get();
    if (plan.tier === "enterprise") return true;
    return plan.searchesUsed < plan.searchesLimit;
  },

  canDownloadReport: () => {
    const { plan } = get();
    if (plan.tier === "enterprise") return true;
    return plan.reportsUsed < plan.reportsLimit;
  },
}));
