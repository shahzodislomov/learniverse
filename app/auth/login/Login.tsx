"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Shield, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const router = useRouter();
  const { login, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const result = await login(email, password);
    
    if (result.success) {
      toast({
        title: "Welcome back!",
        variant: "default",
      });
      router.push("/profile");
    } else {
      // Show user-friendly error message
      const friendlyError = result.error?.toLowerCase().includes("password") || 
                           result.error?.toLowerCase().includes("credentials") ||
                           result.error?.toLowerCase().includes("not found")
        ? "Incorrect username or password"
        : result.error || "Login failed";
      
      setErrorMessage(friendlyError);
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Form */}
      <div className="flex flex-1 flex-col justify-center px-8 py-12 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto w-full max-w-md"
        >
          {/* Logo */}
          <Link href="/" className="mb-8 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold tracking-tight">LearnHub</span>
          </Link>

          <h1 className="mb-2 text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="mb-8 text-muted-foreground">
            Sign in to continue your learning journey.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="h-12 w-full rounded-lg border border-border bg-card pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="h-12 w-full rounded-lg border border-border bg-card pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-border bg-card"
                />
                Remember me
              </label>
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            <Button 
              type="submit" 
              variant="hero" 
              size="lg" 
              className="w-full gap-2"
              disabled={isSubmitting || authLoading}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/auth/register" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </div>

          {/* Error message */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-lg border border-destructive/50 bg-destructive/10 p-3"
            >
              <p className="text-sm text-destructive">{errorMessage}</p>
            </motion.div>
          )}

          {/* Demo credentials hint */}
          <div className="mt-8 rounded-lg border border-border bg-muted/30 p-4">
            <p className="text-sm font-medium text-foreground">Demo Mode</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Create a new account to get started. All data is stored locally in your browser.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Image */}
      <div className="relative hidden lg:block lg:w-1/2">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-card to-secondary/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(188_94%_43%/0.2),transparent_70%)]" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center">
            <Shield className="mx-auto mb-6 h-20 w-20 text-primary" />
            <h2 className="mb-4 text-3xl font-bold">Master Cybersecurity</h2>
            <p className="mx-auto max-w-md text-muted-foreground">
              Join thousands of security professionals learning with hands-on labs and expert-led courses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
