"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Eye, EyeOff, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { useAllNews, useCreateNews, useUpdateNews, useDeleteNews } from "@/hooks/useConvex";
import { useToast } from "@/hooks/use-toast";
import NewsForm from "./NewsForm";
import { Id } from "../../../convex/_generated/dataModel";

const categories = ["Vulnerability", "Analysis", "Technology", "Industry", "Research"];

export default function AdminNews() {
  const news = useAllNews();
  const createNews = useCreateNews();
  const updateNews = useUpdateNews();
  const deleteNews = useDeleteNews();
  const { toast } = useToast();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<any>(null);

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Technology",
    author: "",
    image: "",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "Technology",
      author: "",
      image: "",
    });
  };

  const handleCreate = async () => {
    if (!formData.title || !formData.title.trim()) {
      toast({
        title: "Title is required",
        variant: "destructive",
      });
      return;
    }

    try {
      await createNews({
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        author: formData.author,
        image: formData.image || undefined,
      });
      toast({
        title: "Article created successfully",
        variant: "default",
      });
      setIsCreateOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Failed to create article",
        variant: "destructive",
      });
    }
  };

  const handleUpdate = async () => {
    if (!editingNews) return;

    try {
      await updateNews({
        id: editingNews._id as Id<"news">,
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        author: formData.author,
        image: formData.image || undefined,
      });
      toast({
        title: "Article updated successfully",
        variant: "default",
      });
      setEditingNews(null);
      resetForm();
    } catch (error) {
      toast({
        title: "Failed to update article",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: Id<"news">) => {
    try {
      await deleteNews({ id });
      toast({
        title: "Article deleted successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Failed to delete article",
        variant: "destructive",
      });
    }
  };

  const handleTogglePublish = async (article: any) => {
    try {
      await updateNews({
        id: article._id as Id<"news">,
        isPublished: !article.isPublished,
      });
      toast({
        title: article.isPublished ? "Article unpublished" : "Article published",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Failed to update article",
        variant: "destructive",
      });
    }
  };

  const handleToggleFeatured = async (article: any) => {
    try {
      await updateNews({
        id: article._id as Id<"news">,
        isFeatured: !article.isFeatured,
      });
      toast({
        title: article.isFeatured ? "Removed from featured" : "Added to featured",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Failed to update article",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (article: any) => {
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      author: article.author,
      image: article.image || "",
    });
    setEditingNews(article);
  };

  

  return (
    <div className="p-6">
      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">News</h1>
          <p className="text-muted-foreground">Manage your news articles</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={(open) => {
          setIsCreateOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button variant="hero" className="gap-2">
              <Plus className="h-4 w-4" />
              New Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Article</DialogTitle>
              <DialogDescription>Add a new news article to your platform</DialogDescription>
            </DialogHeader>
            <NewsForm formData={formData} setFormData={setFormData} onSubmit={handleCreate} />
          </DialogContent>
        </Dialog>
      </header>

      {/* News List */}
      <div className="space-y-4">
        {news === undefined ? (
          <div className="py-12 text-center text-muted-foreground">Loading articles...</div>
        ) : !news || news.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            No articles yet. Create your first article!
          </div>
        ) : (
          news.map((article, index) => (
            <motion.div
              key={article._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
            >
              <div className="h-16 w-24 overflow-hidden rounded-lg bg-muted">
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <h3 className="font-medium line-clamp-1">{article.title}</h3>
                  {article.isFeatured && (
                    <Star className="h-4 w-4 fill-warning text-warning" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {article.excerpt}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="outline">{article.category}</Badge>
                  <span className="text-xs text-muted-foreground">
                    by {article.author} • {article.readTime}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleToggleFeatured(article)}
                  title={article.isFeatured ? "Remove from featured" : "Add to featured"}
                >
                  <Star className={`h-4 w-4 ${article.isFeatured ? "fill-warning text-warning" : ""}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleTogglePublish(article)}
                  title={article.isPublished ? "Unpublish" : "Publish"}
                >
                  {article.isPublished ? (
                    <Eye className="h-4 w-4 text-success" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </Button>
                <Dialog
                  open={editingNews?._id === article._id}
                  onOpenChange={(open) => {
                    if (!open) {
                      setEditingNews(null);
                      resetForm();
                    }
                  }}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditDialog(article)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Edit Article</DialogTitle>
                      <DialogDescription>Update article details</DialogDescription>
                    </DialogHeader>
                    <NewsForm formData={formData} setFormData={setFormData} onSubmit={handleUpdate} isEdit />
                  </DialogContent>
                </Dialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Article</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete "{article.title}".
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(article._id as Id<"news">)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
