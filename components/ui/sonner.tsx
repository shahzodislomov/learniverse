"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import type { ToasterProps as SonnerToasterProps } from "sonner";

// Dynamic import to avoid SSR issues
let SonnerToaster: React.ComponentType<SonnerToasterProps> | null = null;

const Toaster = (props: SonnerToasterProps) => {
  const { theme = "system" } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Only load sonner on client
    import("sonner").then((mod) => {
      SonnerToaster = () => mod.Toaster(props);
    });
  }, []);

  if (!mounted || !SonnerToaster) {
    return null;
  }

  return <SonnerToaster {...props} />;
};

export { Toaster };

