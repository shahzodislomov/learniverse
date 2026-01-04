import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { useIsConvexConfigured } from "@/lib/convex";
import { 
  staticCourses, 
  staticLessons, 
  staticNews,
  getPublishedCourses,
  getFeaturedCourses as getStaticFeaturedCourses,
  getCourseBySlug,
  getLessonsByCourse,
  getPublishedNews,
  getFeaturedNews as getStaticFeaturedNews,
  getNewsArticleBySlug,
  Course,
  Lesson,
  NewsArticle
} from "@/lib/mockData";

// Courses hooks with static fallback
export function useCourses() {
  const isConfigured = useIsConvexConfigured();
  const result = useQuery(api.courses.listPublished, isConfigured ? undefined : "skip");
  
  // Return static data if Convex is not configured or returns null
  if (!isConfigured || result === null) {
    return getPublishedCourses().map(course => ({
      ...course,
      shortDescription: course.description.slice(0, 120) + "...",
      studentCount: course.studentsCount,
      lessons: course.lessonsCount,
      students: course.studentsCount,
    }));
  }
  
  return result;
}

export function useFeaturedCourses() {
  const isConfigured = useIsConvexConfigured();
  const result = useQuery(api.courses.listFeatured, isConfigured ? undefined : "skip");
  
  if (!isConfigured || result === null) {
    return getStaticFeaturedCourses().map(course => ({
      ...course,
      shortDescription: course.description.slice(0, 120) + "...",
      studentCount: course.studentsCount,
    }));
  }
  
  return result;
}

export function useCourse(slug: string) {
  const isConfigured = useIsConvexConfigured();
  const result = useQuery(api.courses.getBySlug, isConfigured ? { slug } : "skip");
  
  if (!isConfigured || result === null) {
    const course = getCourseBySlug(slug);
    if (!course) return null;
    return {
      ...course,
      instructor: course.instructor.name,
      instructorTitle: course.instructor.title,
      studentCount: course.studentsCount,
      reviewCount: Math.floor(course.studentsCount * 0.3),
    };
  }
  
  return result;
}

export function useAllCourses() {
  const isConfigured = useIsConvexConfigured();
  const result = useQuery(api.courses.listAll, isConfigured ? undefined : "skip");
  
  if (!isConfigured || result === null) {
    return staticCourses.map(course => ({
      ...course,
      lessonsCount: staticLessons.filter(l => l.courseId === course._id).length,
    }));
  }
  
  return result;
}

export function useCreateCourse() {
  return useMutation(api.courses.create);
}

export function useUpdateCourse() {
  return useMutation(api.courses.update);
}

export function useDeleteCourse() {
  return useMutation(api.courses.remove);
}

// Lessons hooks with static fallback
export function useLessons(courseId: Id<"courses"> | string | undefined) {
  const isConfigured = useIsConvexConfigured();
  
  // For static data, courseId will be a string like "course-1"
  const isStaticId = typeof courseId === "string" && courseId.startsWith("course-");
  
  const result = useQuery(
    api.lessons.listByCourse,
    isConfigured && courseId && !isStaticId ? { courseId: courseId as Id<"courses"> } : "skip"
  );
  
  if (!isConfigured || result === null || isStaticId) {
    if (!courseId) return [];
    return getLessonsByCourse(courseId as string);
  }
  
  return result;
}

export function useLesson(lessonId: string) {
  const isConfigured = useIsConvexConfigured();
  
  // For static data, lessonId will be a string like "lesson-1-1"
  const isStaticId = typeof lessonId === "string" && lessonId.startsWith("lesson-");
  
  const result = useQuery(
    api.lessons.get,
    isConfigured && lessonId && !isStaticId ? { id: lessonId as Id<"lessons"> } : "skip"
  );
  
  if (!isConfigured || result === null || isStaticId) {
    if (!lessonId) return null;
    return staticLessons.find(l => l._id === lessonId) || null;
  }
  
  return result;
}

export function useCreateLesson() {
  return useMutation(api.lessons.create);
}

export function useUpdateLesson() {
  return useMutation(api.lessons.update);
}

export function useDeleteLesson() {
  return useMutation(api.lessons.remove);
}

// News hooks with static fallback
export function useNews() {
  const isConfigured = useIsConvexConfigured();
  const result = useQuery(api.news.listPublished, isConfigured ? undefined : "skip");
  
  if (!isConfigured || result === null) {
    return getPublishedNews().map(article => ({
      ...article,
      publishedAt: article.date,
      createdAt: article.date,
    }));
  }
  
  return result;
}

export function useFeaturedNews() {
  const isConfigured = useIsConvexConfigured();
  const result = useQuery(api.news.listFeatured, isConfigured ? undefined : "skip");
  
  if (!isConfigured || result === null) {
    return getStaticFeaturedNews().map(article => ({
      ...article,
      publishedAt: article.date,
      createdAt: article.date,
    }));
  }
  
  return result;
}

export function useArticle(slug: string) {
  const isConfigured = useIsConvexConfigured();
  const result = useQuery(api.news.getBySlug, isConfigured ? { slug } : "skip");
  
  if (!isConfigured || result === null) {
    const article = getNewsArticleBySlug(slug);
    if (!article) return null;
    return {
      ...article,
      publishedAt: article.date,
      createdAt: article.date,
    };
  }
  
  return result;
}

export function useAllNews() {
  const isConfigured = useIsConvexConfigured();
  const result = useQuery(api.news.listAll, isConfigured ? undefined : "skip");
  
  if (!isConfigured || result === null) {
    return staticNews;
  }
  
  return result;
}

export function useCreateNews() {
  return useMutation(api.news.create);
}

export function useUpdateNews() {
  return useMutation(api.news.update);
}

export function useDeleteNews() {
  return useMutation(api.news.remove);
}

// Storage hooks
export function useGenerateUploadUrl() {
  return useMutation(api.storage.generateUploadUrl);
}

// Seed data
export function useSeedData() {
  return useMutation(api.seed.seedData);
}

// Import useAuth at the top
import { useAuth } from "@/hooks/useAuth";

// User profiles - commented out until convex regenerates
// export function useCurrentUser() {
//   const isConfigured = useIsConvexConfigured();
//   const { user } = useAuth();
//   const result = useQuery(
//     api.users.getProfile,
//     isConfigured && user ? { email: user.email } : "skip"
//   );
//   return result;
// }

// export function useCreateProfile() {
//   return useMutation(api.users.createProfile);
// }

// export function useUpdateProfile() {
//   return useMutation(api.users.updateProfile);
// }

// Site settings - commented out until convex regenerates
// export function useSiteLogo() {
//   const isConfigured = useIsConvexConfigured();
//   const result = useQuery(api.siteSettings.getLogo, isConfigured ? {} : "skip");
//   return result;
// }

// export function useUpdateLogo() {
//   return useMutation(api.siteSettings.updateLogo);
// }
