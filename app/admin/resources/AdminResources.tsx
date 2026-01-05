"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Upload, 
  Trash2, 
  Download, 
  Loader2,
  FileText,
  Plus
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { Id } from "@/convex/_generated/dataModel";

const CATEGORIES = ["Cheatsheets", "Tools", "Guides", "References"];

export default function AdminResources() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const resources = useQuery(
    api.resources.adminListAll,
    user?.email ? { adminEmail: user.email } : "skip"
  );
  
  const createResource = useMutation(api.resources.adminCreate);
  const deleteResource = useMutation(api.resources.adminDelete);
  const generateUploadUrl = useMutation(api.storage.generateUploadUrl);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        toast.error("Please upload a PDF file");
        return;
      }
      if (selectedFile.size > 50 * 1024 * 1024) { // 50MB limit
        toast.error("File size must be less than 50MB");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.email || !file) {
      toast.error("Please select a file");
      return;
    }

    if (!title || !description || !category) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsUploading(true);

    try {
      // Get upload URL
      const uploadUrl = await generateUploadUrl();

      // Upload file
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!result.ok) {
        throw new Error("Failed to upload file");
      }

      const { storageId } = await result.json();

      // Create resource record
      await createResource({
        adminEmail: user.email,
        title,
        description,
        category,
        fileStorageId: storageId,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
      });

      toast.success("Resource added successfully!");
      
      // Reset form
      setTitle("");
      setDescription("");
      setCategory("");
      setFile(null);
      setIsOpen(false);
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error.message || "Failed to add resource");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (resourceId: Id<"resources">) => {
    if (!user?.email) return;

    if (!confirm("Are you sure you want to delete this resource?")) {
      return;
    }

    try {
      await deleteResource({
        adminEmail: user.email,
        resourceId,
      });
      toast.success("Resource deleted successfully!");
    } catch (error: any) {
      console.error("Delete error:", error);
      toast.error(error.message || "Failed to delete resource");
    }
  };

  if (!user?.isAdmin) {
    return (
      <div className="p-6">
        <p className="text-destructive">Unauthorized access</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Resources Management</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Resource</DialogTitle>
              <DialogDescription>
                Upload a PDF resource for users to download
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="SQL Injection Cheatsheet"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Comprehensive reference for SQL injection..."
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">PDF File</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    required
                  />
                  {file && <FileText className="h-5 w-5 text-primary" />}
                </div>
                <p className="text-xs text-muted-foreground">
                  Max file size: 50MB
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  disabled={isUploading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isUploading}>
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Resource
                    </>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>File Size</TableHead>
              <TableHead>Downloads</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resources === undefined ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                </TableCell>
              </TableRow>
            ) : resources.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No resources yet. Add your first resource above.
                </TableCell>
              </TableRow>
            ) : (
              resources.map((resource) => (
                <TableRow key={resource._id}>
                  <TableCell className="font-medium">{resource.title}</TableCell>
                  <TableCell>{resource.category}</TableCell>
                  <TableCell>
                    {(resource.fileSize / 1024 / 1024).toFixed(1)} MB
                  </TableCell>
                  <TableCell>{resource.downloadCount}</TableCell>
                  <TableCell>
                    {new Date(resource.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(resource.fileUrl, "_blank")}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(resource._id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}