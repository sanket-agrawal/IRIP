import { Navbar } from "@/components/layout/Navbar";
import { Building2, MapPin } from "lucide-react";

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="glass rounded-xl p-8 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-lg bg-cyan-accent/20 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-cyan-accent" />
              </div>
              <div>
                <h1 className="text-2xl font-bold capitalize">
                  {slug.replace(/-/g, " ")}
                </h1>
                <p className="text-sm text-muted-foreground font-mono">
                  /{slug}
                </p>
              </div>
            </div>
            <p className="text-muted-foreground">
              Company detail page with globe and location mapping.
              This will show company info, locations plotted on the globe,
              and a location list panel.
            </p>
          </div>

          <div className="glass rounded-xl p-8 text-center">
            <MapPin className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">
              Globe with company locations will appear here
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
