import { useState, useEffect, useCallback } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

const AUTH_STORAGE_KEY = "learnhub_auth";
const USERS_STORAGE_KEY = "learnhub_users";

// Get stored users from localStorage
function getStoredUsers(): Record<string, { password: string; user: User }> {
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

// Save users to localStorage
function saveUsers(users: Record<string, { password: string; user: User }>) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

// Get current auth session
function getStoredAuth(): User | null {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

// Save auth session
function saveAuth(user: User | null) {
  if (user) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
  });

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = getStoredAuth();
    setState({
      user: storedUser,
      isLoading: false,
    });
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Validate inputs
    if (!email || !password) {
      return { success: false, error: "Email and password are required" };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: "Please enter a valid email address" };
    }

    const users = getStoredUsers();
    const userEntry = users[email.toLowerCase()];

    if (!userEntry) {
      return { success: false, error: "No account found with this email" };
    }

    if (userEntry.password !== password) {
      return { success: false, error: "Incorrect password" };
    }

    saveAuth(userEntry.user);
    setState({ user: userEntry.user, isLoading: false });
    
    return { success: true };
  }, []);

  const signup = useCallback(async (
    name: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    // Validate inputs
    if (!name || !email || !password) {
      return { success: false, error: "All fields are required" };
    }

    if (name.length < 2) {
      return { success: false, error: "Name must be at least 2 characters" };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: "Please enter a valid email address" };
    }

    if (password.length < 6) {
      return { success: false, error: "Password must be at least 6 characters" };
    }

    const users = getStoredUsers();
    
    if (users[email.toLowerCase()]) {
      return { success: false, error: "An account with this email already exists" };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email: email.toLowerCase(),
      name,
      createdAt: new Date().toISOString(),
    };

    users[email.toLowerCase()] = {
      password,
      user: newUser,
    };

    saveUsers(users);
    saveAuth(newUser);
    setState({ user: newUser, isLoading: false });

    return { success: true };
  }, []);

  const logout = useCallback(() => {
    saveAuth(null);
    setState({ user: null, isLoading: false });
  }, []);

  return {
    user: state.user,
    isLoading: state.isLoading,
    isAuthenticated: !!state.user,
    login,
    signup,
    logout,
  };
}
