"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, FileText, Loader2, Trash2, Download } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useToast } from "@/hooks/use-toast";
import { Id } from "@/convex/_generated/dataModel";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

const CATEGORIES = ["Cheatsheets", "Tools", "Guides", "References"];

export default function AdminResourcesPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Cheatsheets",
  });

  const resources = useQuery(
    api.resources.adminListAll,
    user?.email ? { adminEmail: user.email } : "skip"
  );
  
  const generateUploadUrl = useMutation(api.storage.generateUploadUrl);
  const createResource = useMutation(api.resources.adminCreate);
  const deleteResource = useMutation(api.resources.adminDelete);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type - only PDF
    if (file.type !== "application/pdf") {
      toast({
        title: "Please upload a PDF file only",
        variant: "destructive",
      });
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile || !user) {
      toast({
        title: "Please select a file and ensure you're logged in",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Get upload URL
      const uploadUrl = await generateUploadUrl();
      
      // Upload file
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": selectedFile.type },
        body: selectedFile,
      });

      const { storageId } = await result.json();

      // Create resource record
      await createResource({
        adminEmail: user.email,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        fileStorageId: storageId,
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        fileType: selectedFile.type,
      });

      toast({
        title: "Resource uploaded successfully!",
        variant: "default",
      });
      
      // Reset form
      setFormData({ title: "", description: "", category: "Cheatsheets" });
      setSelectedFile(null);
      
      // Reset file input
      const fileInput = document.getElementById("file") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Failed to upload resource",
        variant: "destructive",
      });
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
      toast({
        title: "Resource deleted successfully!",
        variant: "default",
      });
    } catch (error: any) {
      console.error("Delete error:", error);
      toast({
        title: error.message || "Failed to delete resource",
        variant: "destructive",
      });
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
    <div className="p-6 space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Resource Management</h1>
        <p className="text-muted-foreground">Upload and manage PDF resources</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Upload New Resource</CardTitle>
          <CardDescription>
            Add PDF resources for users to download
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Resource title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the resource..."
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
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
              <Label htmlFor="file">File</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf"
                  required
                />
                {selectedFile && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>{selectedFile.name}</span>
                    <span>({(selectedFile.size / 1024).toFixed(2)} KB)</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Only PDF files allowed (Max 50MB)
              </p>
            </div>

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
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Uploaded Resources</CardTitle>
          <CardDescription>
            Manage existing resources
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                      No resources yet. Upload your first resource above.
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
        </CardContent>
      </Card>
    </div>
  );
}