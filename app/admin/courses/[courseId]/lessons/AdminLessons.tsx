"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, ArrowLeft, Play, GripVertical } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { useLessons, useCreateLesson, useUpdateLesson, useDeleteLesson, useAllCourses } from "@/hooks/useConvex";
import { toast } from "sonner";
import type { Id } from "@/convex/_generated/dataModel";
import LessonForm from "./LessonForm";

export default function AdminLessons() {
  const params = useParams();
  const courseId = typeof params?.courseId === 'string' ? params.courseId : '';
  const courses = useAllCourses();
  const course = courses?.find((c) => c._id === courseId);
  const lessons = useLessons(courseId as Id<"courses"> | undefined);
  const createLesson = useCreateLesson();
  const updateLesson = useUpdateLesson();
  const deleteLesson = useDeleteLesson();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<any>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    duration: "",
    moduleTitle: "",
    isPreview: false,
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      videoUrl: "",
      duration: "",
      moduleTitle: "",
      isPreview: false,
    });
  };

  const handleCreate = async () => {
    if (!courseId) return;
    try {
      await createLesson({
        courseId: courseId as Id<"courses">,
        title: formData.title,
        description: formData.description,
        videoUrl: formData.videoUrl || undefined,
        duration: formData.duration,
        moduleTitle: formData.moduleTitle,
        isPreview: formData.isPreview,
      });
      toast.success("Lesson created successfully");
      setIsCreateOpen(false);
      resetForm();
    } catch (error) {
      toast.error("Failed to create lesson");
    }
  };

  const handleUpdate = async () => {
    if (!editingLesson) return;
    try {
      await updateLesson({
        id: editingLesson._id as Id<"lessons">,
        title: formData.title,
        description: formData.description,
        videoUrl: formData.videoUrl || undefined,
        duration: formData.duration,
        moduleTitle: formData.moduleTitle,
        isPreview: formData.isPreview,
      });
      toast.success("Lesson updated successfully");
      setEditingLesson(null);
      resetForm();
    } catch (error) {
      toast.error("Failed to update lesson");
    }
  };

  const handleDelete = async (id: Id<"lessons">) => {
    try {
      await deleteLesson({ id });
      toast.success("Lesson deleted successfully");
    } catch (error) {
      toast.error("Failed to delete lesson");
    }
  };

  const openEditDialog = (lesson: any) => {
    setFormData({
      title: lesson.title,
      description: lesson.description,
      videoUrl: lesson.videoUrl || "",
      duration: lesson.duration,
      moduleTitle: lesson.moduleTitle,
      isPreview: lesson.isPreview,
    });
    setEditingLesson(lesson);
  };

  // Group lessons by module
  const lessonsByModule = lessons?.reduce((acc, lesson) => {
    if (!acc[lesson.moduleTitle]) {
      acc[lesson.moduleTitle] = [];
    }
    acc[lesson.moduleTitle].push(lesson);
    return acc;
  }, {} as Record<string, typeof lessons>);

  

  return (
    <div className="p-6">
      {/* Header */}
      <header className="mb-8">
        <Link
          href="/admin/courses"
          className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Courses
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{course?.title || "Course Lessons"}</h1>
            <p className="text-muted-foreground">
              Manage lessons and videos for this course
            </p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={(open) => {
            setIsCreateOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button variant="hero" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Lesson
              </Button>
            </DialogTrigger>
              <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Lesson</DialogTitle>
                <DialogDescription>Add a new lesson to this course</DialogDescription>
              </DialogHeader>
              <LessonForm formData={formData} setFormData={setFormData} onSubmit={handleCreate} />
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Lessons by Module */}
      {lessons === undefined ? (
        <div className="py-12 text-center text-muted-foreground">Loading lessons...</div>
      ) : lessons.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
          No lessons yet. Add your first lesson!
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(lessonsByModule || {}).map(([moduleName, moduleLessons]) => (
            <div key={moduleName}>
              <h2 className="mb-3 text-lg font-semibold">{moduleName}</h2>
              <div className="space-y-2">
                {(moduleLessons as any[])?.map((lesson: any, index: number) => (
                  <motion.div
                    key={lesson._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="flex items-center gap-3 rounded-lg border border-border bg-card p-4"
                  >
                    <GripVertical className="h-4 w-4 cursor-grab text-muted-foreground" />
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Play className="h-3 w-3 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{lesson.title}</p>
                        {lesson.isPreview && (
                          <Badge variant="cyber" className="text-xs">Preview</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {lesson.duration} min • {lesson.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {lesson.videoUrl && (
                        <Badge variant="success" className="text-xs">Has Video</Badge>
                      )}
                      <Dialog
                        open={editingLesson?._id === lesson._id}
                        onOpenChange={(open) => {
                          if (!open) {
                            setEditingLesson(null);
                            resetForm();
                          }
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(lesson)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                          <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Lesson</DialogTitle>
                            <DialogDescription>Update lesson details</DialogDescription>
                          </DialogHeader>
                          <LessonForm formData={formData} setFormData={setFormData} onSubmit={handleUpdate} isEdit />
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
                            <AlertDialogTitle>Delete Lesson</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete "{lesson.title}".
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(lesson._id as Id<"lessons">)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
