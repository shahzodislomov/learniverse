"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

const ADMIN_EMAIL = "wenaco34@gmail.com";

export function useAdminGuard() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return; // loading

    if (!user || user.email !== ADMIN_EMAIL) {
      router.replace("/403");
    }
  }, [user, isLoading, router]);

  return user;
}
