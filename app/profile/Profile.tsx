"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import {
  User,
  Mail,
  Camera,
  Save,
  Shield,
  Award,
  BookOpen,
  Target,
  LogOut,
} from "lucide-react";

const avatarOptions = [
  { id: "default", emoji: "👤" },
  { id: "hacker", emoji: "👨‍💻" },
  { id: "ninja", emoji: "🥷" },
  { id: "robot", emoji: "🤖" },
  { id: "alien", emoji: "👽" },
  { id: "ghost", emoji: "👻" },
  { id: "wizard", emoji: "🧙" },
  { id: "detective", emoji: "🕵️" },
  { id: "astronaut", emoji: "👨‍🚀" },
  { id: "pirate", emoji: "🏴‍☠️" },
  { id: "cat", emoji: "🐱" },
  { id: "shield", emoji: "🛡️" },
];

const stats = [
  { icon: BookOpen, label: "Courses Enrolled", value: 5 },
  { icon: Target, label: "Labs Completed", value: 12 },
  { icon: Award, label: "Certificates", value: 3 },
  { icon: Shield, label: "Security Score", value: 850 },
];

export default function Profile() {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    avatar: "default",
  });
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
      return;
    }
    if (user) {
      const savedProfile = localStorage.getItem(`profile_${user.id}`);
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      } else {
        setProfile({
          name: user.name,
          email: user.email,
          bio: "",
          avatar: "default",
        });
      }
    }
  }, [user, isAuthenticated, isLoading, router]);

  const handleSave = async () => {
    setIsSaving(true);
    // Save to localStorage
    if (user) {
      localStorage.setItem(`profile_${user.id}`, JSON.stringify(profile));
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
    toast({
      title: "Profile updated!",
      description: "Your changes have been saved.",
    });
  };

  const handleLogout = () => {
    logout();
    router.push("/");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  const selectedAvatar = avatarOptions.find((a) => a.id === profile.avatar);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Header */}
      <section className="border-b border-border py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-6 md:flex-row md:items-start"
          >
            {/* Avatar */}
            <div className="relative">
              <div
                className="flex h-28 w-28 cursor-pointer items-center justify-center rounded-full bg-primary/10 text-5xl transition-transform hover:scale-105"
                onClick={() => setShowAvatarPicker(!showAvatarPicker)}
              >
                {selectedAvatar?.emoji || "👤"}
              </div>
              <button
                className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-lg hover:text-foreground"
                onClick={() => setShowAvatarPicker(!showAvatarPicker)}
              >
                <Camera className="h-5 w-5" />
              </button>

              {/* Avatar Picker */}
              {showAvatarPicker && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute left-1/2 top-full z-10 mt-4 w-72 -translate-x-1/2 rounded-xl border border-border bg-card p-4 shadow-xl"
                >
                  <p className="mb-3 text-sm font-medium">Choose your avatar</p>
                  <div className="grid grid-cols-6 gap-2">
                    {avatarOptions.map((avatar) => (
                      <button
                        key={avatar.id}
                        className={`flex h-10 w-10 items-center justify-center rounded-lg text-xl transition-colors hover:bg-muted ${
                          profile.avatar === avatar.id
                            ? "bg-primary/20 ring-2 ring-primary"
                            : ""
                        }`}
                        onClick={() => {
                          setProfile({ ...profile, avatar: avatar.id });
                          setShowAvatarPicker(false);
                        }}
                      >
                        {avatar.emoji}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="mb-2 text-3xl font-bold">{profile.name || "User"}</h1>
              <p className="mb-4 text-muted-foreground">{profile.email}</p>
              <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                  Pro Member
                </span>
                <span className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
                  Joined Dec 2024
                </span>
              </div>
            </div>

            <Button variant="outline" className="gap-2" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border py-8">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl border border-border bg-card p-4 text-center"
              >
                <stat.icon className="mx-auto mb-2 h-6 w-6 text-primary" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Profile Form */}
      <section className="py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-border bg-card p-8"
            >
              <h2 className="mb-6 text-xl font-bold">Edit Profile</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Display Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                      className="pl-10"
                      disabled
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Email cannot be changed
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    rows={4}
                    value={profile.bio}
                    onChange={(e) =>
                      setProfile({ ...profile, bio: e.target.value })
                    }
                  />
                </div>

                <Button onClick={handleSave} className="w-full" disabled={isSaving}>
                  {isSaving ? (
                    "Saving..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
