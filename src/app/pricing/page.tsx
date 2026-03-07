import { Navbar } from "@/components/layout/Navbar";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "₹999",
    period: "/mo",
    subtitle: "~$12/mo",
    features: [
      "25 company searches/mo",
      "5 report downloads/mo",
      "Basic risk dashboard",
      "CSV data export",
      "Email support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "₹2,499",
    period: "/mo",
    subtitle: "~$30/mo",
    features: [
      "100 company searches/mo",
      "25 report downloads/mo",
      "Full risk dashboard",
      "CSV + PDF export",
      "Priority email support",
    ],
    cta: "Subscribe",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "₹4,999",
    period: "/mo",
    subtitle: "~$60/mo",
    features: [
      "Unlimited searches",
      "Unlimited reports",
      "Full dashboard + API access",
      "CSV + PDF + API export",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-muted-foreground text-lg mb-4">
            Start free. Upgrade when you need more.
          </p>
          <p className="text-sm text-cyan-accent font-mono mb-12">
            Free tier: 1 search + 1 report download (lifetime)
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-xl p-8 text-left transition-all ${
                  plan.highlighted
                    ? "glass border-cyan-accent/30 border-2 scale-105"
                    : "glass"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-cyan-accent text-irip-bg text-xs font-bold rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-xs text-muted-foreground font-mono mb-6">
                  {plan.subtitle}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Check className="h-4 w-4 text-emerald-accent flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-semibold text-sm transition-colors ${
                    plan.highlighted
                      ? "bg-cyan-accent text-irip-bg hover:bg-cyan-accent/90"
                      : "bg-white/10 text-foreground hover:bg-white/15"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
