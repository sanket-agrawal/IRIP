import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "@/components/providers/QueryProvider";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cognova — AI-Powered Risk Intelligence",
  description:
    "Interactive geopolitical, natural disaster, and cyber risk intelligence for companies and their global locations.",
  keywords: [
    "risk intelligence",
    "geopolitical risk",
    "cyber risk",
    "natural disaster",
    "global risk",
    "company risk assessment",
    "AI intelligence",
    "market research",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#06b6d4",
          colorBackground: "#0d1117",
          colorInputBackground: "#161b22",
          colorText: "#e8edf8",
        },
      }}
    >
      <html lang="en" className="dark">
        <body
          className={`${plusJakarta.variable} ${jetbrainsMono.variable} antialiased min-h-screen`}
        >
          <QueryProvider>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
