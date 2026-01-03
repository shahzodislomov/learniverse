"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Eye, EyeOff, Search, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Id } from "@/convex/_generated/dataModel";

type Difficulty = "Easy" | "Medium" | "Hard";
type Category = "Web" | "Crypto" | "Forensics" | "OSINT" | "Reverse" | "Misc";

interface ChallengeFormData {
  title: string;
  description: string;
  flag: string;
  flagFormat: string;
  difficulty: Difficulty;
  points: number;
  category: Category;
  isActive: boolean;
}

export default function AdminCTFPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFlags, setShowFlags] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<Id<"ctfChallenges"> | null>(null);
  
  const [formData, setFormData] = useState<ChallengeFormData>({
    title: "",
    description: "",
    flag: "",
    flagFormat: "WEN{...}",
    difficulty: "Easy",
    points: 100,
    category: "Web",
    isActive: true,
  });

  // Check admin access
  const adminCheck = useQuery(api.userProfiles.checkAdmin, user ? { email: user.email } : "skip");
  const challenges = useQuery(
    api.ctfChallenges.adminGetAllChallenges,
    user ? { adminEmail: user.email } : "skip"
  );

  const createChallenge = useMutation(api.ctfChallenges.adminCreateChallenge);
  const updateChallenge = useMutation(api.ctfChallenges.adminUpdateChallenge);
  const deleteChallenge = useMutation(api.ctfChallenges.adminDeleteChallenge);

  useEffect(() => {
    if (adminCheck !== undefined && !adminCheck.isAdmin) {
      router.push("/403");
    }
  }, [adminCheck, router]);

  if (adminCheck === undefined || challenges === undefined) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!adminCheck.isAdmin) {
    return null;
  }

  const filteredChallenges = challenges.filter(
    (challenge) =>
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async () => {
    if (!user) return;

    try {
      if (editingId) {
        await updateChallenge({
          adminEmail: user.email,
          challengeId: editingId,
          ...formData,
        });
        toast.success("Challenge updated successfully");
      } else {
        await createChallenge({
          adminEmail: user.email,
          ...formData,
        });
        toast.success("Challenge created successfully");
      }
      handleCloseModal();
    } catch (error: any) {
      toast.error(error.message || "Failed to save challenge");
    }
  };

  const handleDelete = async (id: Id<"ctfChallenges">) => {
    if (!user || !confirm("Are you sure you want to delete this challenge?")) return;

    try {
      await deleteChallenge({
        adminEmail: user.email,
        challengeId: id,
      });
      toast.success("Challenge deleted successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete challenge");
    }
  };

  const handleEdit = (challenge: any) => {
    setEditingId(challenge._id);
    setFormData({
      title: challenge.title,
      description: challenge.description,
      flag: challenge.flag,
      flagFormat: challenge.flagFormat,
      difficulty: challenge.difficulty,
      points: challenge.points,
      category: challenge.category,
      isActive: challenge.isActive,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      flag: "",
      flagFormat: "WEN{...}",
      difficulty: "Easy",
      points: 100,
      category: "Web",
      isActive: true,
    });
  };

  const difficultyColors: Record<Difficulty, string> = {
    Easy: "text-green-400",
    Medium: "text-yellow-400",
    Hard: "text-red-400",
  };

  const categoryColors: Record<Category, string> = {
    Web: "bg-blue-500/20 text-blue-400",
    Crypto: "bg-purple-500/20 text-purple-400",
    Forensics: "bg-orange-500/20 text-orange-400",
    OSINT: "bg-cyan-500/20 text-cyan-400",
    Reverse: "bg-pink-500/20 text-pink-400",
    Misc: "bg-gray-500/20 text-gray-400",
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">CTF Challenge Management</h1>
            <p className="text-muted-foreground">Create and manage CTF challenges</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Challenge
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search challenges..."
            className="pl-10"
          />
        </div>

        {/* Challenges Table */}
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Difficulty</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Points</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Solves</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Flag</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredChallenges.map((challenge) => (
                  <motion.tr
                    key={challenge._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium">{challenge.title}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${categoryColors[challenge.category]}`}>
                        {challenge.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${difficultyColors[challenge.difficulty]}`}>
                        {challenge.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-primary">{challenge.points}</td>
                    <td className="px-6 py-4">{challenge.solveCount}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <code className="text-xs text-muted-foreground font-mono">
                          {showFlags ? challenge.flag : "••••••••"}
                        </code>
                        <button
                          onClick={() => setShowFlags(!showFlags)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showFlags ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded text-xs font-semibold ${
                          challenge.isActive
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {challenge.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(challenge)}
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(challenge._id)}
                          className="text-destructive hover:text-destructive/80 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {filteredChallenges.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No challenges found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Challenge" : "Create Challenge"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Challenge name"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Challenge description"
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: Category) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Web">Web</SelectItem>
                    <SelectItem value="Crypto">Crypto</SelectItem>
                    <SelectItem value="Forensics">Forensics</SelectItem>
                    <SelectItem value="OSINT">OSINT</SelectItem>
                    <SelectItem value="Reverse">Reverse</SelectItem>
                    <SelectItem value="Misc">Misc</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value: Difficulty) => setFormData({ ...formData, difficulty: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="points">Points</Label>
              <Input
                id="points"
                type="number"
                value={formData.points}
                onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) || 0 })}
                placeholder="100"
              />
            </div>
            <div>
              <Label htmlFor="flagFormat">Flag Format</Label>
              <Input
                id="flagFormat"
                value={formData.flagFormat}
                onChange={(e) => setFormData({ ...formData, flagFormat: e.target.value })}
                placeholder="WEN{...}"
              />
            </div>
            <div>
              <Label htmlFor="flag">Flag</Label>
              <Input
                id="flag"
                value={formData.flag}
                onChange={(e) => setFormData({ ...formData, flag: e.target.value })}
                placeholder="WEN{example_flag}"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="rounded"
              />
              <Label htmlFor="isActive" className="cursor-pointer">
                Active (visible to users)
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editingId ? "Update" : "Create"} Challenge
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}