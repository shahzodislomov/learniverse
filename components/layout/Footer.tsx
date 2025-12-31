"use client";

import Link from "next/link";
import { Shield, Github, Linkedin, Youtube } from "lucide-react";

function TelegramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M120 0C53.729 0 0 53.729 0 120s53.729 120 120 120 120-53.729 120-120S186.271 0 120 0z" fill="#0088cc" />
      <path d="M50 123l142-51c4-1 7 2 5 6l-56 152c-2 5-7 6-11 3l-39-28-19 19c-2 2-4 3-7 3l3-46 84-61c4-3 1-7-4-5L50 123z" fill="#fff" />
    </svg>
  );
}

const footerLinks = {
  platform: [
    { href: "/courses", label: "Courses" },
    { href: "/labs", label: "Labs" },
    { href: "/news", label: "News" },
    { href: "/resources", label: "Resources" },
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/security", label: "Security" },
  ],
};

const socialLinks = [
  { href: "https://github.com/shahzodislomov", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/shahzodislomov/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://t.me/shawn.isl", icon: TelegramIcon, label: "Telegram" },
  { href: "#", icon: Youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight">LearnHub</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Master cybersecurity with hands-on labs, expert-led courses, and a
              community of passionate learners. Start your journey today.
            </p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Platform</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LearnHub. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built for the cybersecurity community.
          </p>
        </div>
      </div>
    </footer>
  );
}
