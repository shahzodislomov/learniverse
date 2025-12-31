import { mutation } from "./_generated/server";

export const seedData = mutation({
  args: {},
  handler: async (ctx) => {
    const existingCourses = await ctx.db.query("courses").first();
    if (existingCourses) {
      return { message: "Data already seeded" };
    }

    const now = Date.now();

    // Seed courses
    const course1 = await ctx.db.insert("courses", {
      slug: "web-application-security",
      title: "Web Application Security Fundamentals",
      description: "Learn to identify and exploit common web vulnerabilities including XSS, CSRF, and SQL injection attacks.",
      shortDescription: "Master web security fundamentals and OWASP Top 10.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=450&fit=crop",
      level: "beginner",
      duration: "2h 15m",
      category: "Web Security",
      instructor: "Sarah Chen",
      instructorTitle: "Senior Security Engineer",
      rating: 4.8,
      reviewCount: 1250,
      studentCount: 12500,
      whatYouLearn: ["Identify XSS vulnerabilities", "Perform SQL injection", "Bypass authentication", "Test for CSRF"],
      requirements: ["Basic HTML/CSS/JS", "HTTP protocol basics"],
      isPublished: true,
      isFeatured: true,
      createdAt: now,
      updatedAt: now,
    });

    const course2 = await ctx.db.insert("courses", {
      slug: "advanced-penetration-testing",
      title: "Advanced Penetration Testing",
      description: "Master advanced exploitation techniques and post-exploitation methodologies.",
      shortDescription: "Advanced pentesting for security professionals.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=450&fit=crop",
      level: "advanced",
      duration: "4h 30m",
      category: "Pentesting",
      instructor: "Marcus Johnson",
      instructorTitle: "Lead Penetration Tester",
      rating: 4.9,
      reviewCount: 820,
      studentCount: 8200,
      whatYouLearn: ["Network exploitation", "Privilege escalation", "Post-exploitation"],
      requirements: ["Networking knowledge", "Linux experience"],
      isPublished: true,
      isFeatured: true,
      createdAt: now,
      updatedAt: now,
    });

    const course3 = await ctx.db.insert("courses", {
      slug: "network-security-essentials",
      title: "Network Security Essentials",
      description: "Understand network protocols, firewall configuration, and intrusion detection.",
      shortDescription: "Build a solid network security foundation.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop",
      level: "intermediate",
      duration: "3h 10m",
      category: "Network",
      instructor: "Dr. Elena Rodriguez",
      instructorTitle: "Network Security Architect",
      rating: 4.7,
      reviewCount: 980,
      studentCount: 9800,
      whatYouLearn: ["Firewall configuration", "IDS/IPS setup", "Network analysis"],
      requirements: ["TCP/IP basics"],
      isPublished: true,
      isFeatured: true,
      createdAt: now,
      updatedAt: now,
    });

    // Seed lessons with YouTube videos
    await ctx.db.insert("lessons", { courseId: course1, title: "Course Overview", description: "Welcome to web security", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: "15", moduleTitle: "Introduction", order: 1, isPreview: true, createdAt: now, updatedAt: now });
    await ctx.db.insert("lessons", { courseId: course1, title: "How Web Apps Work", description: "Understanding web architecture", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", duration: "20", moduleTitle: "Introduction", order: 2, isPreview: true, createdAt: now, updatedAt: now });
    await ctx.db.insert("lessons", { courseId: course1, title: "XSS Fundamentals", description: "Cross-site scripting basics", videoUrl: "https://www.youtube.com/watch?v=kJQP7kiw5Fk", duration: "25", moduleTitle: "XSS Attacks", order: 3, isPreview: false, createdAt: now, updatedAt: now });
    await ctx.db.insert("lessons", { courseId: course1, title: "SQL Injection Basics", description: "Database attack techniques", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: "30", moduleTitle: "SQL Injection", order: 4, isPreview: false, createdAt: now, updatedAt: now });

    await ctx.db.insert("lessons", { courseId: course2, title: "Pentesting Methodology", description: "Professional approach to pentesting", videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0", duration: "18", moduleTitle: "Methodology", order: 1, isPreview: true, createdAt: now, updatedAt: now });
    await ctx.db.insert("lessons", { courseId: course2, title: "Network Enumeration", description: "Discovering network services", videoUrl: "https://www.youtube.com/watch?v=kJQP7kiw5Fk", duration: "35", moduleTitle: "Reconnaissance", order: 2, isPreview: false, createdAt: now, updatedAt: now });

    await ctx.db.insert("lessons", { courseId: course3, title: "TCP/IP Deep Dive", description: "Network protocol analysis", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: "28", moduleTitle: "Networking Basics", order: 1, isPreview: true, createdAt: now, updatedAt: now });

    // Seed news
    await ctx.db.insert("news", { slug: "new-zero-day-discovered", title: "Critical Zero-Day Vulnerability Discovered", excerpt: "Security researchers uncovered a critical vulnerability affecting millions.", content: "Full article content here...", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=450&fit=crop", category: "Vulnerability", author: "Sarah Chen", readTime: "5 min read", isPublished: true, isFeatured: true, publishedAt: now, createdAt: now, updatedAt: now });
    await ctx.db.insert("news", { slug: "ransomware-trends-2024", title: "Ransomware Trends: What to Expect in 2025", excerpt: "Analysis of emerging ransomware tactics.", content: "Full article content here...", image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=450&fit=crop", category: "Analysis", author: "Marcus Johnson", readTime: "8 min read", isPublished: true, isFeatured: true, publishedAt: now - 86400000 * 2, createdAt: now, updatedAt: now });
    await ctx.db.insert("news", { slug: "ai-in-cybersecurity", title: "How AI is Transforming Cybersecurity", excerpt: "ML and AI in detecting cyber attacks.", content: "Full article content here...", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop", category: "Technology", author: "Dr. Elena Rodriguez", readTime: "6 min read", isPublished: true, isFeatured: true, publishedAt: now - 86400000 * 4, createdAt: now, updatedAt: now });

    return { message: "Sample data seeded successfully!" };
  },
});
