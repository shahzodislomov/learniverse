"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Loader2, Image as ImageIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useToast } from "@/hooks/use-toast";
// import { useSiteLogo, useUpdateLogo } from "@/hooks/useConvex"; // Uncomment after convex regenerates

const ALLOWED_LOGO_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"];
const MAX_LOGO_SIZE = 2 * 1024 * 1024; // 2MB

export default function AdminSettingsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  
  // const currentLogo = useSiteLogo(); // Uncomment after convex regenerates
  const currentLogo = null;
  const generateUploadUrl = useMutation(api.storage.generateUploadUrl);
  // const updateLogo = useUpdateLogo(); // Uncomment after convex regenerates

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!ALLOWED_LOGO_TYPES.includes(file.type)) {
      toast({
        title: "Invalid file type. Only PNG, JPG, JPEG, and SVG are allowed.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size
    if (file.size > MAX_LOGO_SIZE) {
      toast({
        title: `Logo size must be less than ${MAX_LOGO_SIZE / (1024 * 1024)}MB`,
        variant: "destructive",
      });
      return;
    }

    setSelectedLogo(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadLogo = async () => {
    if (!selectedLogo || !user) {
      toast({
        title: "Please select a logo and ensure you're logged in",
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
        headers: { "Content-Type": selectedLogo.type },
        body: selectedLogo,
      });

      const { storageId } = await result.json();

      // Update logo setting
      // await updateLogo({
      //   adminEmail: user.email,
      //   storageId,
      // });

      toast({
        title: "Logo uploaded successfully! (Settings will be enabled after Convex setup)",
        variant: "default",
      });
      setSelectedLogo(null);
      setPreviewUrl("");
      
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Failed to upload logo",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Site Settings</h1>
        <p className="text-muted-foreground">Manage site branding and configuration</p>
      </header>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Site Logo</CardTitle>
            <CardDescription>
              Upload a logo to appear in the navigation bar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentLogo && (
              <div className="space-y-2">
                <Label>Current Logo</Label>
                <div className="flex items-center gap-4 rounded-lg border border-border p-4">
                  <img src={currentLogo} alt="Current Logo" className="h-12 w-auto" />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="logo">Upload New Logo</Label>
              <Input
                id="logo"
                type="file"
                onChange={handleLogoChange}
                accept=".png,.jpg,.jpeg,.svg"
              />
              <p className="text-xs text-muted-foreground">
                Recommended: PNG or SVG, max 2MB
              </p>
            </div>

            {previewUrl && (
              <div className="space-y-2">
                <Label>Preview</Label>
                <div className="flex items-center gap-4 rounded-lg border border-border bg-muted p-4">
                  <img src={previewUrl} alt="Logo Preview" className="h-12 w-auto" />
                </div>
              </div>
            )}

            <Button onClick={handleUploadLogo} disabled={!selectedLogo || isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Update Logo
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}