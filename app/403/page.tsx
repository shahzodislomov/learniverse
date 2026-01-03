"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { ShieldX } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Forbidden() {
  return (
    <MainLayout>
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <ShieldX className="mx-auto mb-6 h-24 w-24 text-destructive" />
          <h1 className="mb-4 text-4xl font-bold">Access Denied</h1>
          <p className="mb-8 text-lg text-muted-foreground">
            You don't have permission to access this page.
          </p>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </motion.div>
      </div>
    </MainLayout>
  );
}