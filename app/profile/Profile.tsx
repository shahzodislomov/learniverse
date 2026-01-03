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
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
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
  Trophy,
  Upload,
  TrendingUp,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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


export default function Profile() {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    avatar: "default",
    photo: "",
  });
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  
  // Get user profile and CTF stats from Convex
  const userProfile = useQuery(
    api.userProfiles.getProfile,
    user ? { email: user.email } : "skip"
  );
  const ctfStats = useQuery(
    api.ctfChallenges.getUserStats,
    user ? { userEmail: user.email } : "skip"
  );
  const updateProfileMutation = useMutation(api.userProfiles.updateProfile);
  const createProfileMutation = useMutation(api.userProfiles.getOrCreateProfile);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
      return;
    }
    if (user && userProfile) {
      setProfile({
        name: userProfile.name,
        email: userProfile.email,
        bio: userProfile.bio || "",
        avatar: userProfile.avatar,
        photo: "",
      });
    } else if (user && userProfile === null) {
      // Create profile if it doesn't exist
      createProfileMutation({ email: user.email, name: user.name });
    }
  }, [user, userProfile, isAuthenticated, isLoading, router, createProfileMutation]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadingPhoto(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, photo: reader.result as string });
        setUploadingPhoto(false);
        toast({
          title: "Photo uploaded!",
          description: "Your profile photo has been updated.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      await updateProfileMutation({
        email: user.email,
        name: profile.name,
        avatar: profile.avatar,
        bio: profile.bio,
      });
      toast({
        title: "Profile updated!",
        description: "Your changes have been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
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

  if (isLoading || ctfStats === undefined) {
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
              {profile.photo ? (
                <Avatar className="h-28 w-28 cursor-pointer border-4 border-primary/20 transition-transform hover:scale-105">
                  <AvatarImage src={profile.photo} alt={profile.name} />
                  <AvatarFallback>{selectedAvatar?.emoji || "👤"}</AvatarFallback>
                </Avatar>
              ) : (
                <div
                  className="flex h-28 w-28 cursor-pointer items-center justify-center rounded-full border-4 border-primary/20 bg-primary/10 text-5xl transition-transform hover:scale-105"
                  onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                >
                  {selectedAvatar?.emoji || "👤"}
                </div>
              )}
              <div className="absolute bottom-0 right-0 flex gap-1">
                <label
                  htmlFor="photo-upload"
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-lg hover:text-foreground"
                >
                  <Upload className="h-4 w-4" />
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                </label>
                {!profile.photo && (
                  <button
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-lg hover:text-foreground"
                    onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                )}
              </div>

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
              <p className="mb-2 text-muted-foreground">{profile.email}</p>
              {ctfStats && (
                <div className="mb-4 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                  <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                    <Trophy className="h-3 w-3" />
                    Rank #{ctfStats.rank}
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-success/10 px-3 py-1 text-sm text-success">
                    <TrendingUp className="h-3 w-3" />
                    Top {ctfStats.percentile}%
                  </span>
                  <span className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
                    {ctfStats.totalPoints} Points
                  </span>
                </div>
              )}
            </div>

            <Button variant="outline" className="gap-2" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      {ctfStats && (
        <section className="border-b border-border py-8">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-border bg-card p-4 text-center"
              >
                <BookOpen className="mx-auto mb-2 h-6 w-6 text-primary" />
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-muted-foreground">Courses Enrolled</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-xl border border-border bg-card p-4 text-center"
              >
                <Target className="mx-auto mb-2 h-6 w-6 text-success" />
                <div className="text-2xl font-bold">{ctfStats.completedChallenges}</div>
                <div className="text-sm text-muted-foreground">CTF Solved</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-xl border border-border bg-card p-4 text-center"
              >
                <Award className="mx-auto mb-2 h-6 w-6 text-warning" />
                <div className="text-2xl font-bold">{ctfStats.firstBloods}</div>
                <div className="text-sm text-muted-foreground">First Bloods</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-xl border border-border bg-card p-4 text-center"
              >
                <Trophy className="mx-auto mb-2 h-6 w-6 text-secondary" />
                <div className="text-2xl font-bold">{ctfStats.totalPoints}</div>
                <div className="text-sm text-muted-foreground">CTF Points</div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* CTF Progress */}
      {ctfStats && (
        <section className="border-b border-border py-8">
          <div className="container mx-auto max-w-7xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-bold">CTF Challenge Progress</h2>
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {ctfStats.completedChallenges} / {ctfStats.totalChallenges} Completed
                </span>
              </div>
              <Progress 
                value={ctfStats.totalChallenges > 0 ? (ctfStats.completedChallenges / ctfStats.totalChallenges) * 100 : 0} 
                className="h-3"
              />
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-success">{ctfStats.completedChallenges}</div>
                  <div className="text-xs text-muted-foreground">Solved</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-warning">
                    {ctfStats.totalChallenges - ctfStats.completedChallenges}
                  </div>
                  <div className="text-xs text-muted-foreground">Remaining</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {ctfStats.totalChallenges > 0 
                      ? Math.round((ctfStats.completedChallenges / ctfStats.totalChallenges) * 100)
                      : 0}%
                  </div>
                  <div className="text-xs text-muted-foreground">Complete</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

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
