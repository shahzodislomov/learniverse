"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, BookOpen, Newspaper, ArrowLeft, Shield, FileText, Settings, Users } from "lucide-react";
import { useAdminGuard } from "@/hooks/useAdminGuard";
import { Loader2 } from "lucide-react";

const adminNavLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/admin/resources", label: "Resources", icon: FileText },
  { href: "/admin/ctf", label: "CTF Challenges", icon: Shield },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const user = useAdminGuard();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card">
        <div className="flex h-16 items-center border-b border-border px-6">
          <h1 className="text-lg font-bold">Admin Panel</h1>
        </div>
        <nav className="space-y-1 p-4">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Site
            </Button>
          </Link>
          {adminNavLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className="w-full justify-start gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Button>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container mx-auto p-8">{children}</div>
      </main>
    </div>
  );
}