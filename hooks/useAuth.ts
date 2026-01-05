import { useState, useEffect, useCallback } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export interface User {
  userId: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  photoUrl?: string;
  isAdmin: boolean;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

const AUTH_STORAGE_KEY = "learnhub_auth_email";

// Get current auth email from localStorage
function getStoredEmail(): string | null {
  try {
    return localStorage.getItem(AUTH_STORAGE_KEY);
  } catch {
    return null;
  }
}

// Save auth email to localStorage
function saveEmail(email: string | null) {
  if (email) {
    localStorage.setItem(AUTH_STORAGE_KEY, email);
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

export function useAuth() {
  const [email, setEmail] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const registerMutation = useMutation(api.auth.register);
  const loginMutation = useMutation(api.auth.login);
  
  // Get current user from Convex
  const currentUser = useQuery(
    api.auth.getCurrentUser,
    email ? { email } : "skip"
  );

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedEmail = getStoredEmail();
    setEmail(storedEmail);
    setIsInitialized(true);
  }, []);

  const login = useCallback(async (userEmail: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Validate inputs
      if (!userEmail || !password) {
        return { success: false, error: "Email and password are required" };
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userEmail)) {
        return { success: false, error: "Please enter a valid email address" };
      }

      const user = await loginMutation({
        email: userEmail,
        password: password,
      });

      saveEmail(user.email);
      setEmail(user.email);
      
      return { success: true };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.message || "Login failed. Please try again." 
      };
    }
  }, [loginMutation]);

  const signup = useCallback(async (
    name: string,
    userEmail: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // Validate inputs
      if (!name || !userEmail || !password) {
        return { success: false, error: "All fields are required" };
      }

      if (name.length < 2) {
        return { success: false, error: "Name must be at least 2 characters" };
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userEmail)) {
        return { success: false, error: "Please enter a valid email address" };
      }

      if (password.length < 6) {
        return { success: false, error: "Password must be at least 6 characters" };
      }

      const user = await registerMutation({
        email: userEmail,
        password: password,
        name: name,
      });

      saveEmail(user.email);
      setEmail(user.email);

      return { success: true };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.message || "Registration failed. Please try again." 
      };
    }
  }, [registerMutation]);

  const logout = useCallback(() => {
    saveEmail(null);
    setEmail(null);
  }, []);

  return {
    user: currentUser || null,
    isLoading: !isInitialized || (email !== null && currentUser === undefined),
    isAuthenticated: !!currentUser,
    login,
    signup,
    logout,
  };
}