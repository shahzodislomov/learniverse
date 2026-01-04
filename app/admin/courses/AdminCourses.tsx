"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Eye, EyeOff, Star, Video } from "lucide-react";
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
import { useAllCourses, useCreateCourse, useUpdateCourse, useDeleteCourse } from "@/hooks/useConvex";
import { useToast } from "@/hooks/use-toast";
import CourseForm from "./CourseForm";
import Link from "next/link";
import { Id } from "../../../convex/_generated/dataModel";

const categories = ["Web Security", "Pentesting", "Network", "Forensics", "Cryptography", "Blue Team"];
const levels = ["beginner", "intermediate", "advanced"] as const;

export default function AdminCourses() {
  const courses = useAllCourses();
  const createCourse = useCreateCourse();
  const updateCourse = useUpdateCourse();
  const deleteCourse = useDeleteCourse();
  const { toast } = useToast();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    level: "beginner" as const,
    category: "Web Security",
    image: "",
    instructorName: "",
    instructorTitle: "",
    whatYouLearn: "",
    requirements: "",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      level: "beginner",
      category: "Web Security",
      image: "",
      instructorName: "",
      instructorTitle: "",
      whatYouLearn: "",
      requirements: "",
    });
  };

  const handleCreate = async () => {
    try {
      await createCourse({
        title: formData.title,
        description: formData.description,
        level: formData.level,
        category: formData.category,
        image: formData.image || undefined,
        instructor: {
          name: formData.instructorName,
          title: formData.instructorTitle,
          avatar: formData.instructorName.split(" ").map((n) => n[0]).join("").toUpperCase(),
        },
        whatYouLearn: formData.whatYouLearn.split("\n").filter(Boolean),
        requirements: formData.requirements.split("\n").filter(Boolean),
      });
      toast({
        title: "Course created successfully",
        variant: "default",
      });
      setIsCreateOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Failed to create course",
        variant: "destructive",
      });
    }
  };

  const handleUpdate = async () => {
    if (!editingCourse) return;
    try {
      await updateCourse({
        id: editingCourse._id as Id<"courses">,
        title: formData.title,
        description: formData.description,
        level: formData.level,
        category: formData.category,
        image: formData.image || undefined,
        instructor: {
          name: formData.instructorName,
          title: formData.instructorTitle,
          avatar: formData.instructorName.split(" ").map((n) => n[0]).join("").toUpperCase(),
        },
        whatYouLearn: formData.whatYouLearn.split("\n").filter(Boolean),
        requirements: formData.requirements.split("\n").filter(Boolean),
      });
      toast({
        title: "Course updated successfully",
        variant: "default",
      });
      setEditingCourse(null);
      resetForm();
    } catch (error) {
      toast({
        title: "Failed to update course",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: Id<"courses">) => {
    try {
      await deleteCourse({ id });
      toast({
        title: "Course deleted successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Failed to delete course",
        variant: "destructive",
      });
    }
  };

  const handleTogglePublish = async (course: any) => {
    try {
      await updateCourse({
        id: course._id as Id<"courses">,
        isPublished: !course.isPublished,
      });
      toast({
        title: course.isPublished ? "Course unpublished" : "Course published",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Failed to update course",
        variant: "destructive",
      });
    }
  };

  const handleToggleFeatured = async (course: any) => {
    try {
      await updateCourse({
        id: course._id as Id<"courses">,
        isFeatured: !course.isFeatured,
      });
      toast({
        title: course.isFeatured ? "Removed from featured" : "Added to featured",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Failed to update course",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (course: any) => {
    setFormData({
      title: course.title,
      description: course.description,
      level: course.level,
      category: course.category,
      image: course.image || "",
      instructorName: course.instructor.name,
      instructorTitle: course.instructor.title,
      whatYouLearn: course.whatYouLearn.join("\n"),
      requirements: course.requirements.join("\n"),
    });
    setEditingCourse(course);
  };

  
  return (
    <div className="p-6">
      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Courses</h1>
          <p className="text-muted-foreground">Manage your courses and lessons</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={(open) => {
          setIsCreateOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button variant="hero" className="gap-2">
              <Plus className="h-4 w-4" />
              New Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
              <DialogDescription>Add a new course to your platform</DialogDescription>
            </DialogHeader>
            <CourseForm formData={formData} setFormData={setFormData} onSubmit={handleCreate} />
          </DialogContent>
        </Dialog>
      </header>

      {/* Courses List */}
      <div className="space-y-4">
        {courses === undefined ? (
          <div className="py-12 text-center text-muted-foreground">Loading courses...</div>
        ) : !courses || courses.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            No courses yet. Create your first course!
          </div>
        ) : (
          courses.map((course, index) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
            >
              <div className="h-16 w-24 overflow-hidden rounded-lg bg-muted">
                {course.image && (
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <h3 className="font-medium">{course.title}</h3>
                  {course.isFeatured && (
                    <Star className="h-4 w-4 fill-warning text-warning" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {course.description}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant={course.level}>{course.level}</Badge>
                  <Badge variant="outline">{course.category}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {course.lessonsCount} lessons • {course.duration}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link href={`/admin/courses/${course._id}/lessons`}>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Video className="h-4 w-4" />
                    Lessons
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleToggleFeatured(course)}
                  title={course.isFeatured ? "Remove from featured" : "Add to featured"}
                >
                  <Star className={`h-4 w-4 ${course.isFeatured ? "fill-warning text-warning" : ""}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleTogglePublish(course)}
                  title={course.isPublished ? "Unpublish" : "Publish"}
                >
                  {course.isPublished ? (
                    <Eye className="h-4 w-4 text-success" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </Button>
                <Dialog
                  open={editingCourse?._id === course._id}
                  onOpenChange={(open) => {
                    if (!open) {
                      setEditingCourse(null);
                      resetForm();
                    }
                  }}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditDialog(course)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Edit Course</DialogTitle>
                      <DialogDescription>Update course details</DialogDescription>
                    </DialogHeader>
                    <CourseForm formData={formData} setFormData={setFormData} onSubmit={handleUpdate} isEdit />
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
                      <AlertDialogTitle>Delete Course</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete "{course.title}" and all its lessons.
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(course._id as Id<"courses">)}
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
