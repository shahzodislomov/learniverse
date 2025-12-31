"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

type Props = {
  formData: any;
  setFormData: (updater: any) => void;
  onSubmit: () => void;
  isEdit?: boolean;
};

export default function LessonForm({ formData, setFormData, onSubmit, isEdit = false }: Props) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Lesson Title</Label>
        <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Introduction to XSS" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="What students will learn in this lesson" rows={2} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="moduleTitle">Module Name</Label>
        <Input id="moduleTitle" value={formData.moduleTitle} onChange={(e) => setFormData({ ...formData, moduleTitle: e.target.value })} placeholder="Introduction" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Input id="duration" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} placeholder="15" />
        </div>
        <div className="flex items-center gap-3 pt-6">
          <Switch id="isPreview" checked={formData.isPreview} onCheckedChange={(checked) => setFormData({ ...formData, isPreview: checked })} />
          <Label htmlFor="isPreview">Free Preview</Label>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="videoUrl">Video URL (YouTube, Vimeo, or direct link)</Label>
        <Input id="videoUrl" value={formData.videoUrl} onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })} placeholder="https://youtube.com/watch?v=..." />
      </div>
      <Button onClick={onSubmit} className="w-full">{isEdit ? "Update Lesson" : "Create Lesson"}</Button>
    </div>
  );
}
