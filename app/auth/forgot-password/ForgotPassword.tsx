"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Shield, CheckCircle } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Reset link sent!",
      description: "Check your email for password reset instructions.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen">
        <div className="flex flex-1 items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md text-center"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success/20">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <h1 className="mb-4 text-2xl font-bold">Check your email</h1>
            <p className="mb-8 text-muted-foreground">
              We've sent a password reset link to{" "}
              <span className="font-medium text-foreground">{email}</span>
            </p>
            <p className="mb-8 text-sm text-muted-foreground">
              Didn't receive the email? Check your spam folder or{" "}
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-primary hover:underline"
              >
                try again
              </button>
            </p>
            <Link href="/auth/login">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to login
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="flex flex-1 items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Link
            href="/auth/login"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>

          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold tracking-tight">
              Reset your password
            </h1>
            <p className="text-muted-foreground">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send reset link"}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right side - Decorative */}
      <div className="hidden flex-1 items-center justify-center bg-muted/30 lg:flex">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="p-12 text-center"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary">
            <Shield className="h-10 w-10 text-primary-foreground" />
          </div>
          <h2 className="mb-4 text-2xl font-bold">Security first</h2>
          <p className="max-w-md text-muted-foreground">
            Your security is our top priority. Password reset links expire after
            1 hour and can only be used once.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
