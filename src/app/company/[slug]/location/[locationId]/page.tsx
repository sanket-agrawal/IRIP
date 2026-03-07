import { Navbar } from "@/components/layout/Navbar";
import { Shield, Activity } from "lucide-react";

export default async function LocationRiskPage({
  params,
}: {
  params: Promise<{ slug: string; locationId: string }>;
}) {
  const { slug, locationId } = await params;

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="glass rounded-xl p-8 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-lg bg-red-accent/20 flex items-center justify-center">
                <Shield className="h-6 w-6 text-red-accent" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Risk Dashboard</h1>
                <p className="text-sm text-muted-foreground font-mono">
                  {slug} / location / {locationId}
                </p>
              </div>
            </div>
            <p className="text-muted-foreground">
              Full risk assessment for this location including natural disaster,
              cyber, geopolitical, and infrastructure scores.
            </p>
          </div>

          <div className="glass rounded-xl p-8 text-center">
            <Activity className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">
              Risk dashboard with gauge, radar, and bar charts will appear here
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
