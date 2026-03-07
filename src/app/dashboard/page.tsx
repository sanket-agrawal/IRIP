import { Navbar } from "@/components/layout/Navbar";
import { BarChart3, FileDown, Search, CreditCard } from "lucide-react";

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground mb-8">
            Your usage stats, plan info, and billing
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Searches Used", value: "0 / 1", icon: Search },
              { label: "Reports Downloaded", value: "0 / 1", icon: FileDown },
              { label: "Current Plan", value: "Free", icon: CreditCard },
              { label: "Risk Queries", value: "0", icon: BarChart3 },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <stat.icon className="h-5 w-5 text-cyan-accent" />
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
                <p className="text-2xl font-bold font-mono">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="glass rounded-xl p-8 text-center">
            <p className="text-muted-foreground mb-4">
              Upgrade your plan to unlock more searches and reports
            </p>
            <a
              href="/pricing"
              className="inline-block px-6 py-3 bg-cyan-accent text-irip-bg rounded-lg font-semibold text-sm hover:bg-cyan-accent/90 transition-colors"
            >
              View Plans
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
