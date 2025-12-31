"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, Shield, User } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { SearchModal } from "@/components/SearchModal";

const navLinks = [
  { href: "/courses", label: "Courses" },
  { href: "/labs", label: "Labs" },
  { href: "/news", label: "News" },
  { href: "/community", label: "Community" },
  { href: "/resources", label: "Resources" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const [avatar, setAvatar] = useState("👤");

  useEffect(() => {
    if (user) {
      const savedProfile = localStorage.getItem(`profile_${user.id}`);
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        const avatarEmojis: Record<string, string> = {
          default: "👤", hacker: "👨‍💻", ninja: "🥷", robot: "🤖",
          alien: "👽", ghost: "👻", wizard: "🧙", detective: "🕵️",
          astronaut: "👨‍🚀", pirate: "🏴‍☠️", cat: "🐱", shield: "🛡️",
        };
        setAvatar(avatarEmojis[profile.avatar] || "👤");
      }
    }
  }, [user]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">LearnHub</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
            </Button>
            {isAuthenticated ? (
              <Link href="/profile">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-lg hover:bg-primary/20 transition-colors">
                  {avatar}
                </div>
              </Link>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" className="text-muted-foreground">Sign in</Button>
                </Link>
                <Link href="/auth/register">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-border bg-background md:hidden"
            >
              <nav className="container mx-auto flex flex-col gap-2 px-4 py-4">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground" onClick={() => setIsMenuOpen(false)}>
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
                  {isAuthenticated ? (
                    <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start gap-2">
                        <span className="text-lg">{avatar}</span> Profile
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start">Sign in</Button>
                      </Link>
                      <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>
                        <Button className="w-full">Get Started</Button>
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}