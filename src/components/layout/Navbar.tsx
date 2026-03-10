"use client";

import Link from "next/link";
import { useAuth, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-accent to-emerald-accent flex items-center justify-center shadow-lg shadow-cyan-accent/20 group-hover:shadow-cyan-accent/40 transition-shadow">
        <span className="text-irip-bg font-extrabold text-sm tracking-tighter">
          C
        </span>
      </div>
      <span className="text-[1.15rem] font-bold tracking-tight text-foreground">
        Cogn<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-accent to-emerald-accent">ova</span>
      </span>
    </Link>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
    >
      {children}
    </Link>
  );
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isSignedIn } = useAuth();

  return (
    <>
      {/* Backdrop when mobile menu is open */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-black/60 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <nav className="fixed top-0 left-0 right-0 z-50">
        {/* Desktop bar */}
        <div className="hidden md:block mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between rounded-b-2xl glass px-5">
            <Logo />

            <div className="flex items-center gap-1">
              <div className="flex items-center gap-6 mr-6">
                <NavLink href="/search">
                  <span className="inline-flex items-center gap-1.5">
                    <Search className="h-3.5 w-3.5" />
                    Search
                  </span>
                </NavLink>
                <NavLink href="/pricing">Pricing</NavLink>
                <NavLink href="/dashboard">Dashboard</NavLink>
              </div>

              <div className="h-5 w-px bg-white/10" />

              <div className="flex items-center gap-2.5 ml-4">
                {isSignedIn ? (
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "h-8 w-8",
                      },
                    }}
                  />
                ) : (
                  <>
                    <SignInButton mode="modal">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[13px] font-medium text-muted-foreground hover:text-foreground h-8 px-3"
                      >
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button
                        size="sm"
                        className="text-[13px] font-semibold bg-gradient-to-r from-cyan-accent to-emerald-accent text-irip-bg hover:opacity-90 transition-opacity h-8 px-4 rounded-lg shadow-md shadow-cyan-accent/20"
                      >
                        Get Started
                      </Button>
                    </SignUpButton>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile bar + menu — solid background */}
        <div className="md:hidden bg-irip-bg border-b border-white/8">
          <div className="flex h-14 items-center justify-between px-4">
            <Logo />
            <button
              className="text-muted-foreground hover:text-foreground p-1.5 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-5 pt-2 space-y-1 border-t border-white/8">
                  <Link
                    href="/search"
                    className="flex items-center gap-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 py-3 px-3 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Search className="h-4 w-4" />
                    Search Companies
                  </Link>
                  <Link
                    href="/pricing"
                    className="block text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 py-3 px-3 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 py-3 px-3 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <div className="pt-3 mt-1 border-t border-white/8">
                    {isSignedIn ? (
                      <UserButton />
                    ) : (
                      <div className="flex gap-2.5">
                        <SignInButton mode="modal">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex-1 text-sm font-medium h-10"
                          >
                            Sign In
                          </Button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                          <Button
                            size="sm"
                            className="flex-1 text-sm font-semibold bg-gradient-to-r from-cyan-accent to-emerald-accent text-irip-bg hover:opacity-90 rounded-lg h-10"
                          >
                            Get Started
                          </Button>
                        </SignUpButton>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
}
