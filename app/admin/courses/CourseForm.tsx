"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const categories = ["Web Security", "Pentesting", "Network", "Forensics", "Cryptography", "Blue Team"];
const levels = ["beginner", "intermediate", "advanced"] as const;

type Props = {
  formData: any;
  setFormData: (updater: any) => void;
  onSubmit: () => void;
  isEdit?: boolean;
};

export default function CourseForm({ formData, setFormData, onSubmit, isEdit = false }: Props) {
  return (
    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Course title"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Course description"
          rows={3}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Level</Label>
          <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="https://example.com/image.jpg"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="instructorName">Instructor Name</Label>
          <Input
            id="instructorName"
            value={formData.instructorName}
            onChange={(e) => setFormData({ ...formData, instructorName: e.target.value })}
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="instructorTitle">Instructor Title</Label>
          <Input
            id="instructorTitle"
            value={formData.instructorTitle}
            onChange={(e) => setFormData({ ...formData, instructorTitle: e.target.value })}
            placeholder="Senior Security Engineer"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="whatYouLearn">What You'll Learn (one per line)</Label>
        <Textarea
          id="whatYouLearn"
          value={formData.whatYouLearn}
          onChange={(e) => setFormData({ ...formData, whatYouLearn: e.target.value })}
          placeholder="Identify XSS vulnerabilities\nPerform SQL injection"
          rows={4}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="requirements">Requirements (one per line)</Label>
        <Textarea
          id="requirements"
          value={formData.requirements}
          onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
          placeholder="Basic HTML knowledge\nFamiliarity with web browsers"
          rows={3}
        />
      </div>
      <Button onClick={onSubmit} className="w-full">{isEdit ? "Update Course" : "Create Course"}</Button>
    </div>
  );
}
