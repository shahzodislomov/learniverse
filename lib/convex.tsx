"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, createContext, useContext } from "react";

// Get the Convex URL from environment
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL as string | undefined;

// Check if it's a valid Convex URL
const isValidConvexUrl = Boolean(convexUrl && convexUrl.includes("convex.cloud"));

// Context to track if Convex is properly configured
const ConvexConfigContext = createContext<boolean>(false);

export function useIsConvexConfigured() {
  return useContext(ConvexConfigContext);
}

// Always create a client - use placeholder if not configured
// This ensures ConvexProvider is always present so useQuery doesn't crash
const PLACEHOLDER_URL = "https://placeholder.convex.cloud";
const convex = new ConvexReactClient(isValidConvexUrl ? convexUrl! : PLACEHOLDER_URL);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexConfigContext.Provider value={isValidConvexUrl}>
      <ConvexProvider client={convex}>{children}</ConvexProvider>
    </ConvexConfigContext.Provider>
  );
}