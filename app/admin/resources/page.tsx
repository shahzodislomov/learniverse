"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/zip",
  "application/x-zip-compressed",
  "text/plain",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export default function AdminResourcesPage() {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "guides",
  });

  const generateUploadUrl = useMutation(api.storage.generateUploadUrl);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast.error("Invalid file type. Only PDF, ZIP, TXT, DOC, and DOCX files are allowed.");
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast.error(`File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
      return;
    }

    setSelectedFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile || !user) {
      toast.error("Please select a file and ensure you're logged in");
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

      // Create resource record (commented out until schema is updated)
      // await adminCreateResource({
      //   adminEmail: user.email,
      //   title: formData.title,
      //   description: formData.description,
      //   category: formData.category,
      //   fileStorageId: storageId,
      //   fileName: selectedFile.name,
      //   fileSize: selectedFile.size,
      // });

      toast.success("Resource uploaded successfully!");
      
      // Reset form
      setFormData({ title: "", description: "", category: "guides" });
      setSelectedFile(null);
      
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload resource");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Resource Management</h1>
        <p className="text-muted-foreground">Upload and manage learning resources</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Upload Resource</CardTitle>
          <CardDescription>
            Add PDFs, documents, and other learning materials
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
                  <SelectItem value="guides">Guides</SelectItem>
                  <SelectItem value="cheatsheets">Cheat Sheets</SelectItem>
                  <SelectItem value="tools">Tools</SelectItem>
                  <SelectItem value="documentation">Documentation</SelectItem>
                  <SelectItem value="misc">Miscellaneous</SelectItem>
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
                  accept=".pdf,.zip,.txt,.doc,.docx"
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
                Allowed: PDF, ZIP, TXT, DOC, DOCX (Max 50MB)
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
    </div>
  );
}