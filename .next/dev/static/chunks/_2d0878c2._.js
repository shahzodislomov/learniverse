(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-border bg-transparent hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline",
            hero: "bg-primary text-primary-foreground shadow-lg hover:shadow-xl font-semibold",
            heroOutline: "border border-primary/50 bg-primary/5 text-primary hover:bg-primary/10 hover:border-primary",
            cyber: "bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold shadow-lg hover:shadow-xl"
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-12 rounded-lg px-8 text-base",
            xl: "h-14 rounded-lg px-10 text-lg",
            icon: "h-10 w-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/button.tsx",
        lineNumber: 55,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Button;
Button.displayName = "Button";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Button$React.forwardRef");
__turbopack_context__.k.register(_c1, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/convex/_generated/api.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "api",
    ()=>api,
    "components",
    ()=>components,
    "internal",
    ()=>internal
]);
/* eslint-disable */ /**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/components/index.js [app-client] (ecmascript) <locals>");
;
const api = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["anyApi"];
const internal = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["anyApi"];
const components = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["componentsGeneric"])();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/mockData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Static mock data for the application - works without backend
__turbopack_context__.s([
    "getAvailableLabs",
    ()=>getAvailableLabs,
    "getCourseBySlug",
    ()=>getCourseBySlug,
    "getFeaturedCourses",
    ()=>getFeaturedCourses,
    "getFeaturedNews",
    ()=>getFeaturedNews,
    "getLessonById",
    ()=>getLessonById,
    "getLessonsByCourse",
    ()=>getLessonsByCourse,
    "getNewsArticleBySlug",
    ()=>getNewsArticleBySlug,
    "getPublishedCourses",
    ()=>getPublishedCourses,
    "getPublishedNews",
    ()=>getPublishedNews,
    "staticCourses",
    ()=>staticCourses,
    "staticLabs",
    ()=>staticLabs,
    "staticLessons",
    ()=>staticLessons,
    "staticNews",
    ()=>staticNews
]);
const staticCourses = [
    {
        _id: "course-1",
        title: "Web Application Security Fundamentals",
        slug: "web-application-security-fundamentals",
        description: "Master the essential concepts of web application security. Learn to identify vulnerabilities like XSS, SQL injection, and CSRF, and understand how to protect modern web applications from common attacks.",
        level: "beginner",
        category: "Web Security",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
        instructor: {
            name: "Alex Chen",
            title: "Senior Security Engineer at CyberDefend",
            avatar: "AC"
        },
        duration: "4h 30m",
        lessonsCount: 12,
        studentsCount: 2847,
        rating: 4.8,
        isPublished: true,
        isFeatured: true,
        whatYouLearn: [
            "Identify and exploit XSS vulnerabilities",
            "Understand SQL injection techniques",
            "Implement CSRF protections",
            "Secure authentication mechanisms",
            "Configure security headers properly"
        ],
        requirements: [
            "Basic HTML and JavaScript knowledge",
            "Understanding of HTTP protocol",
            "A computer with internet access"
        ]
    },
    {
        _id: "course-2",
        title: "Advanced Penetration Testing",
        slug: "advanced-penetration-testing",
        description: "Take your pentesting skills to the next level with advanced exploitation techniques, privilege escalation, and post-exploitation strategies used by professional red teams.",
        level: "advanced",
        category: "Pentesting",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800",
        instructor: {
            name: "Sarah Miller",
            title: "Lead Pentester at RedTeam Labs",
            avatar: "SM"
        },
        duration: "8h 15m",
        lessonsCount: 24,
        studentsCount: 1523,
        rating: 4.9,
        isPublished: true,
        isFeatured: true,
        whatYouLearn: [
            "Advanced exploitation techniques",
            "Windows and Linux privilege escalation",
            "Active Directory attacks",
            "Post-exploitation and persistence",
            "Writing professional pentest reports"
        ],
        requirements: [
            "Completion of beginner pentesting course",
            "Familiarity with Kali Linux",
            "Basic networking knowledge"
        ]
    },
    {
        _id: "course-3",
        title: "Network Security Essentials",
        slug: "network-security-essentials",
        description: "Learn the fundamentals of network security including firewalls, IDS/IPS, VPNs, and network monitoring. Perfect for aspiring security analysts and network administrators.",
        level: "intermediate",
        category: "Network",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
        instructor: {
            name: "Michael Johnson",
            title: "Network Security Architect",
            avatar: "MJ"
        },
        duration: "6h 45m",
        lessonsCount: 18,
        studentsCount: 1892,
        rating: 4.7,
        isPublished: true,
        isFeatured: true,
        whatYouLearn: [
            "Configure enterprise firewalls",
            "Deploy and tune IDS/IPS systems",
            "Implement secure VPN solutions",
            "Network traffic analysis",
            "Incident response procedures"
        ],
        requirements: [
            "Basic networking concepts (TCP/IP)",
            "Familiarity with command line",
            "Access to lab environment"
        ]
    },
    {
        _id: "course-4",
        title: "Digital Forensics Investigation",
        slug: "digital-forensics-investigation",
        description: "Master digital forensics techniques for investigating cyber incidents. Learn to collect, preserve, and analyze digital evidence following industry best practices.",
        level: "intermediate",
        category: "Forensics",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800",
        instructor: {
            name: "Emily Davis",
            title: "Digital Forensics Examiner",
            avatar: "ED"
        },
        duration: "5h 20m",
        lessonsCount: 15,
        studentsCount: 982,
        rating: 4.6,
        isPublished: true,
        isFeatured: false,
        whatYouLearn: [
            "Evidence collection and preservation",
            "Disk and memory forensics",
            "Timeline analysis",
            "Malware analysis basics",
            "Writing forensic reports"
        ],
        requirements: [
            "Understanding of operating systems",
            "Basic knowledge of file systems",
            "Analytical mindset"
        ]
    },
    {
        _id: "course-5",
        title: "Cryptography Fundamentals",
        slug: "cryptography-fundamentals",
        description: "Understand the mathematical foundations of cryptography and learn how encryption protects data in modern systems. From symmetric to asymmetric encryption and beyond.",
        level: "beginner",
        category: "Cryptography",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800",
        instructor: {
            name: "Dr. Robert Kim",
            title: "Cryptography Researcher",
            avatar: "RK"
        },
        duration: "3h 50m",
        lessonsCount: 10,
        studentsCount: 1456,
        rating: 4.5,
        isPublished: true,
        isFeatured: false,
        whatYouLearn: [
            "Symmetric encryption algorithms (AES, DES)",
            "Asymmetric cryptography (RSA, ECC)",
            "Hash functions and digital signatures",
            "TLS/SSL protocol internals",
            "Common cryptographic attacks"
        ],
        requirements: [
            "Basic mathematics",
            "Interest in security concepts",
            "No prior cryptography knowledge needed"
        ]
    },
    {
        _id: "course-6",
        title: "Blue Team Defense Strategies",
        slug: "blue-team-defense-strategies",
        description: "Learn defensive security operations, threat hunting, and incident response. Build the skills needed to protect organizations from advanced cyber threats.",
        level: "advanced",
        category: "Blue Team",
        image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800",
        instructor: {
            name: "Jennifer Lee",
            title: "SOC Team Lead",
            avatar: "JL"
        },
        duration: "7h 30m",
        lessonsCount: 20,
        studentsCount: 1234,
        rating: 4.8,
        isPublished: true,
        isFeatured: false,
        whatYouLearn: [
            "Security Operations Center workflows",
            "Threat hunting methodologies",
            "SIEM configuration and tuning",
            "Incident response playbooks",
            "Threat intelligence integration"
        ],
        requirements: [
            "Understanding of network security",
            "Familiarity with log analysis",
            "Basic scripting knowledge"
        ]
    }
];
const staticLessons = [
    // Course 1 - Web Application Security
    {
        _id: "lesson-1-1",
        courseId: "course-1",
        title: "Introduction to Web Security",
        description: "Overview of web application security and why it matters in today's digital landscape.",
        moduleTitle: "Getting Started",
        duration: "15:00",
        videoUrl: "https://www.youtube.com/watch?v=SWYqp7iY_Tc",
        order: 1,
        isPreview: true
    },
    {
        _id: "lesson-1-2",
        courseId: "course-1",
        title: "Understanding HTTP and HTTPS",
        description: "Deep dive into HTTP protocol and how HTTPS provides security.",
        moduleTitle: "Getting Started",
        duration: "22:00",
        videoUrl: "https://www.youtube.com/watch?v=hExRDVZHhig",
        order: 2,
        isPreview: true
    },
    {
        _id: "lesson-1-3",
        courseId: "course-1",
        title: "Cross-Site Scripting (XSS) Explained",
        description: "Learn about XSS vulnerabilities and how attackers exploit them.",
        moduleTitle: "Common Vulnerabilities",
        duration: "28:00",
        videoUrl: "https://www.youtube.com/watch?v=L5l9lSnNMxg",
        order: 3,
        isPreview: false
    },
    {
        _id: "lesson-1-4",
        courseId: "course-1",
        title: "SQL Injection Attacks",
        description: "Understanding and preventing SQL injection vulnerabilities.",
        moduleTitle: "Common Vulnerabilities",
        duration: "32:00",
        videoUrl: "https://www.youtube.com/watch?v=ciNHn38EyRc",
        order: 4,
        isPreview: false
    },
    {
        _id: "lesson-1-5",
        courseId: "course-1",
        title: "CSRF Protection Strategies",
        description: "How to protect your applications from Cross-Site Request Forgery.",
        moduleTitle: "Common Vulnerabilities",
        duration: "25:00",
        videoUrl: "https://www.youtube.com/watch?v=vRBihr41JTo",
        order: 5,
        isPreview: false
    },
    // Course 2 - Advanced Penetration Testing
    {
        _id: "lesson-2-1",
        courseId: "course-2",
        title: "Advanced Recon Techniques",
        description: "Master advanced reconnaissance for penetration testing engagements.",
        moduleTitle: "Reconnaissance",
        duration: "35:00",
        videoUrl: "https://www.youtube.com/watch?v=3Kq1MIfTWCE",
        order: 1,
        isPreview: true
    },
    {
        _id: "lesson-2-2",
        courseId: "course-2",
        title: "Exploitation Frameworks",
        description: "Using Metasploit and other frameworks effectively.",
        moduleTitle: "Exploitation",
        duration: "45:00",
        videoUrl: "https://www.youtube.com/watch?v=8lR27r8Y_ik",
        order: 2,
        isPreview: false
    },
    {
        _id: "lesson-2-3",
        courseId: "course-2",
        title: "Windows Privilege Escalation",
        description: "Techniques for escalating privileges on Windows systems.",
        moduleTitle: "Post-Exploitation",
        duration: "40:00",
        videoUrl: "https://www.youtube.com/watch?v=uTcrbNBcoxQ",
        order: 3,
        isPreview: false
    },
    // Course 3 - Network Security
    {
        _id: "lesson-3-1",
        courseId: "course-3",
        title: "Firewall Fundamentals",
        description: "Understanding firewall types and configurations.",
        moduleTitle: "Network Defenses",
        duration: "30:00",
        videoUrl: "https://www.youtube.com/watch?v=kDEX1HXybrU",
        order: 1,
        isPreview: true
    },
    {
        _id: "lesson-3-2",
        courseId: "course-3",
        title: "IDS/IPS Systems",
        description: "Deploying and tuning intrusion detection systems.",
        moduleTitle: "Network Defenses",
        duration: "35:00",
        videoUrl: "https://www.youtube.com/watch?v=rvKQtRklwQ4",
        order: 2,
        isPreview: false
    },
    // Course 4 - Digital Forensics
    {
        _id: "lesson-4-1",
        courseId: "course-4",
        title: "Evidence Collection",
        description: "Proper procedures for collecting digital evidence.",
        moduleTitle: "Fundamentals",
        duration: "28:00",
        videoUrl: "https://www.youtube.com/watch?v=k_3T7J0Ky1o",
        order: 1,
        isPreview: true
    },
    // Course 5 - Cryptography
    {
        _id: "lesson-5-1",
        courseId: "course-5",
        title: "Symmetric Encryption",
        description: "Understanding AES and other symmetric algorithms.",
        moduleTitle: "Encryption Basics",
        duration: "25:00",
        videoUrl: "https://www.youtube.com/watch?v=NuyzuNBFWxQ",
        order: 1,
        isPreview: true
    },
    // Course 6 - Blue Team
    {
        _id: "lesson-6-1",
        courseId: "course-6",
        title: "SOC Operations Overview",
        description: "Introduction to Security Operations Center workflows.",
        moduleTitle: "SOC Fundamentals",
        duration: "30:00",
        videoUrl: "https://www.youtube.com/watch?v=Gxj0Pj0LzGE",
        order: 1,
        isPreview: true
    }
];
const staticNews = [
    {
        _id: "news-1",
        title: "Critical Zero-Day Vulnerability Discovered in Popular Web Framework",
        slug: "critical-zero-day-vulnerability-discovered",
        excerpt: "Security researchers have identified a critical remote code execution vulnerability affecting millions of websites worldwide.",
        content: "A critical zero-day vulnerability has been discovered in one of the most widely used web frameworks. The vulnerability, tracked as CVE-2024-XXXX, allows attackers to execute arbitrary code on affected servers. Security teams are urged to apply patches immediately...",
        category: "Vulnerability",
        author: "Security Research Team",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800",
        date: "December 20, 2024",
        readTime: "5 min read",
        isPublished: true,
        isFeatured: true
    },
    {
        _id: "news-2",
        title: "New Ransomware Variant Targets Healthcare Organizations",
        slug: "new-ransomware-variant-targets-healthcare",
        excerpt: "A sophisticated ransomware operation has been observed targeting healthcare institutions with a new variant.",
        content: "Healthcare organizations across multiple countries are being targeted by a new ransomware variant. The attackers are using phishing emails disguised as medical supply invoices to gain initial access...",
        category: "Analysis",
        author: "Threat Intelligence Team",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
        date: "December 18, 2024",
        readTime: "7 min read",
        isPublished: true,
        isFeatured: true
    },
    {
        _id: "news-3",
        title: "AI-Powered Security Tools: The Future of Threat Detection",
        slug: "ai-powered-security-tools-future-threat-detection",
        excerpt: "Machine learning and AI are revolutionizing how organizations detect and respond to cyber threats.",
        content: "Artificial intelligence is transforming cybersecurity operations. From automated threat detection to predictive analytics, AI-powered tools are helping security teams stay ahead of increasingly sophisticated attacks...",
        category: "Technology",
        author: "Tech Analysis Team",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
        date: "December 15, 2024",
        readTime: "6 min read",
        isPublished: true,
        isFeatured: true
    },
    {
        _id: "news-4",
        title: "Major Cloud Provider Enhances Security Features",
        slug: "major-cloud-provider-enhances-security-features",
        excerpt: "New security features announced include zero-trust architecture and enhanced encryption options.",
        content: "A leading cloud provider has announced significant security enhancements to their platform. The new features include zero-trust network access, improved encryption at rest and in transit, and advanced threat detection capabilities...",
        category: "Industry",
        author: "Industry Reporter",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
        date: "December 12, 2024",
        readTime: "4 min read",
        isPublished: true,
        isFeatured: false
    },
    {
        _id: "news-5",
        title: "Quantum Computing Threats to Current Encryption Standards",
        slug: "quantum-computing-threats-encryption-standards",
        excerpt: "Researchers warn that quantum computers could break current encryption within the next decade.",
        content: "As quantum computing advances, security experts are raising concerns about the future of current cryptographic standards. Organizations are being urged to begin planning for post-quantum cryptography migration...",
        category: "Research",
        author: "Dr. Quantum Security",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
        date: "December 10, 2024",
        readTime: "8 min read",
        isPublished: true,
        isFeatured: false
    }
];
const staticLabs = [
    {
        id: "lab-1",
        title: "SQL Injection Playground",
        description: "Practice identifying and exploiting SQL injection vulnerabilities in a safe environment. Learn techniques from basic to advanced injections.",
        difficulty: "Easy",
        category: "Web Security",
        estimatedTime: "45 min",
        points: 100,
        status: "available",
        tools: [
            "Burp Suite",
            "SQLMap",
            "Browser Dev Tools"
        ]
    },
    {
        id: "lab-2",
        title: "XSS Attack Scenarios",
        description: "Explore different types of Cross-Site Scripting attacks including reflected, stored, and DOM-based XSS in real-world scenarios.",
        difficulty: "Medium",
        category: "Web Security",
        estimatedTime: "60 min",
        points: 150,
        status: "available",
        tools: [
            "Browser Dev Tools",
            "Burp Suite"
        ]
    },
    {
        id: "lab-3",
        title: "Linux Privilege Escalation",
        description: "Learn various techniques to escalate privileges on Linux systems from SUID binaries to kernel exploits.",
        difficulty: "Hard",
        category: "Pentesting",
        estimatedTime: "90 min",
        points: 250,
        status: "available",
        tools: [
            "Terminal",
            "LinPEAS",
            "GTFOBins"
        ]
    },
    {
        id: "lab-4",
        title: "Network Packet Analysis",
        description: "Analyze network traffic to identify malicious activities, extract credentials, and understand attack patterns.",
        difficulty: "Medium",
        category: "Network",
        estimatedTime: "60 min",
        points: 150,
        status: "available",
        tools: [
            "Wireshark",
            "tcpdump",
            "NetworkMiner"
        ]
    },
    {
        id: "lab-5",
        title: "Memory Forensics Investigation",
        description: "Extract and analyze volatile memory from compromised systems to identify malware and attacker activities.",
        difficulty: "Expert",
        category: "Forensics",
        estimatedTime: "120 min",
        points: 300,
        status: "available",
        tools: [
            "Volatility",
            "Rekall",
            "YARA"
        ]
    },
    {
        id: "lab-6",
        title: "API Security Testing",
        description: "Discover and exploit common API vulnerabilities including authentication bypass, IDOR, and rate limiting issues.",
        difficulty: "Medium",
        category: "Web Security",
        estimatedTime: "75 min",
        points: 175,
        status: "available",
        tools: [
            "Postman",
            "Burp Suite",
            "cURL"
        ]
    },
    {
        id: "lab-7",
        title: "Windows Active Directory Attacks",
        description: "Practice attacking Active Directory environments with Kerberoasting, Pass-the-Hash, and DCSync attacks.",
        difficulty: "Expert",
        category: "Pentesting",
        estimatedTime: "150 min",
        points: 350,
        status: "available",
        tools: [
            "Impacket",
            "Mimikatz",
            "BloodHound"
        ]
    },
    {
        id: "lab-8",
        title: "Cryptographic Challenges",
        description: "Solve cryptographic puzzles involving weak encryption, hash cracking, and protocol vulnerabilities.",
        difficulty: "Hard",
        category: "Cryptography",
        estimatedTime: "90 min",
        points: 200,
        status: "available",
        tools: [
            "John the Ripper",
            "Hashcat",
            "OpenSSL"
        ]
    },
    {
        id: "lab-9",
        title: "SIEM Log Analysis",
        description: "Use SIEM tools to detect threats from security logs and create alerting rules for common attack patterns.",
        difficulty: "Medium",
        category: "Blue Team",
        estimatedTime: "60 min",
        points: 150,
        status: "coming-soon",
        tools: [
            "Splunk",
            "ELK Stack"
        ]
    },
    {
        id: "lab-10",
        title: "Container Security",
        description: "Identify vulnerabilities in containerized applications and learn secure container deployment practices.",
        difficulty: "Hard",
        category: "Cloud Security",
        estimatedTime: "90 min",
        points: 225,
        status: "coming-soon",
        tools: [
            "Docker",
            "Trivy",
            "Falco"
        ]
    }
];
function getCourseBySlug(slug) {
    return staticCourses.find((course)=>course.slug === slug);
}
function getLessonsByCourse(courseId) {
    return staticLessons.filter((lesson)=>lesson.courseId === courseId);
}
function getLessonById(lessonId) {
    return staticLessons.find((lesson)=>lesson._id === lessonId);
}
function getPublishedCourses() {
    return staticCourses.filter((course)=>course.isPublished);
}
function getFeaturedCourses() {
    return staticCourses.filter((course)=>course.isFeatured && course.isPublished).slice(0, 3);
}
function getPublishedNews() {
    return staticNews.filter((article)=>article.isPublished);
}
function getFeaturedNews() {
    return staticNews.filter((article)=>article.isFeatured && article.isPublished).slice(0, 3);
}
function getNewsArticleBySlug(slug) {
    return staticNews.find((article)=>article.slug === slug);
}
function getAvailableLabs() {
    return staticLabs.filter((lab)=>lab.status === "available");
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/useConvex.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAllCourses",
    ()=>useAllCourses,
    "useAllNews",
    ()=>useAllNews,
    "useArticle",
    ()=>useArticle,
    "useCourse",
    ()=>useCourse,
    "useCourses",
    ()=>useCourses,
    "useCreateCourse",
    ()=>useCreateCourse,
    "useCreateLesson",
    ()=>useCreateLesson,
    "useCreateNews",
    ()=>useCreateNews,
    "useDeleteCourse",
    ()=>useDeleteCourse,
    "useDeleteLesson",
    ()=>useDeleteLesson,
    "useDeleteNews",
    ()=>useDeleteNews,
    "useFeaturedCourses",
    ()=>useFeaturedCourses,
    "useFeaturedNews",
    ()=>useFeaturedNews,
    "useGenerateUploadUrl",
    ()=>useGenerateUploadUrl,
    "useLesson",
    ()=>useLesson,
    "useLessons",
    ()=>useLessons,
    "useNews",
    ()=>useNews,
    "useSeedData",
    ()=>useSeedData,
    "useUpdateCourse",
    ()=>useUpdateCourse,
    "useUpdateLesson",
    ()=>useUpdateLesson,
    "useUpdateNews",
    ()=>useUpdateNews
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/react/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/react/client.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/convex/_generated/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$convex$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/convex.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mockData.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature(), _s8 = __turbopack_context__.k.signature(), _s9 = __turbopack_context__.k.signature(), _s10 = __turbopack_context__.k.signature(), _s11 = __turbopack_context__.k.signature(), _s12 = __turbopack_context__.k.signature(), _s13 = __turbopack_context__.k.signature(), _s14 = __turbopack_context__.k.signature(), _s15 = __turbopack_context__.k.signature(), _s16 = __turbopack_context__.k.signature(), _s17 = __turbopack_context__.k.signature(), _s18 = __turbopack_context__.k.signature(), _s19 = __turbopack_context__.k.signature(), _s20 = __turbopack_context__.k.signature();
;
;
;
;
function useCourses() {
    _s();
    const isConfigured = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$convex$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsConvexConfigured"])();
    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(__TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].courses.listPublished, isConfigured ? undefined : "skip");
    // Return static data if Convex is not configured or returns null
    if (!isConfigured || result === null) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPublishedCourses"])().map((course)=>({
                ...course,
                shortDescription: course.description.slice(0, 120) + "...",
                studentCount: course.studentsCount
            }));
    }
    return result;
}
_s(useCourses, "0zX7BNOOhCutsyzQkEwLbhXbCiU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$convex$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsConvexConfigured"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useFeaturedCourses() {
    _s1();
    const isConfigured = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$convex$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsConvexConfigured"])();
    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(__TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].courses.listFeatured, isConfigured ? undefined : "skip");
    if (!isConfigured || result === null) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFeaturedCourses"])().map((course)=>({
                ...course,
                shortDescription: course.description.slice(0, 120) + "...",
                studentCount: course.studentsCount
            }));
    }
    return result;
}
_s1(useFeaturedCourses, "0zX7BNOOhCutsyzQkEwLbhXbCiU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$convex$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsConvexConfigured"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useCourse(slug) {
    _s2();
    const isConfigured = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$convex$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsConvexConfigured"])();
    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(__TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].courses.getBySlug, isConfigured ? {
        slug
    } : "skip");
    if (!isConfigured || result === null) {
        const course = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCourseBySlug"])(slug);
        if (!course) return null;
        return {
            ...course,
            instructor: course.instructor.name,
            instructorTitle: course.instructor.title,
            studentCount: course.studentsCount,
            reviewCount: Math.floor(course.studentsCount * 0.3)
        };
    }
    return result;
}
_s2(useCourse, "0zX7BNOOhCutsyzQkEwLbhXbCiU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$convex$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsConvexConfigured"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useAllCourses() {
    _s3();
    const isConfigured = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$convex$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsConvexConfigured"])();
    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(__TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].courses.listAll, isConfigured ? undefined : "skip");
    if (!isConfigured || result === null) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["staticCourses"].map((course)=>({
                ...course,
                lessonsCount: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["staticLessons"].filter((l)=>l.courseId === course._id).length
            }));
    }
    return result;
}
_s3(useAllCourses, "0zX7BNOOhCutsyzQkEwLbhXbCiU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$convex$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsConvexConfigured"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useCreateCourse() {
    _s4();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(__TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].courses.create);
}
_s4(useCreateCourse, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useUpdateCourse() {
    _s5();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(__TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].courses.update);
}
_s5(useUpdateCourse, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useDeleteCourse() {
    _s6();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(__TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].courses.remove);
}
_s6(useDeleteCourse, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useLessons(courseId) {
    _s7();
    const isConfigured = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$convex$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsConvexConfigured"])();
    // For static data, courseId will be a string like "course-1"
    const isStaticId = typeof courseId === "string" && courseId.startsWith("course-");
    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(__TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].lessons.listByCourse, isConfigured && courseId && !isStaticId ? {
        courseId: courseId
    } : "skip");
    if (!isConfigured || result === null || isStaticId) {
        if (!courseId) return [];
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLessonsByCourse"])(courseId);
    }
    return result;
}
_s7(useLessons, "0zX7BNOOhCutsyzQkEwLbhXbCiU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$convex$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsConvexConfigured"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useLesson(lessonId) {
    _s8();
    const isConfigured = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$convex$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsConvexConfigured"])();
    // For static data, lessonId will be a string like "lesson-1-1"
    const isStaticId = typeof lessonId === "string" && lessonId.startsWith("lesson-");
    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(__TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].lessons.get, isConfigured && lessonId && !isStaticId ? {
        id: lessonId
    } : "skip");
    if (!isConfigured || result === null || isStaticId) {
        if (!lessonId) return null;
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["staticLessons"].find((l)=>l._id === lessonId) || null;
    }
    return result;
}
_s8(useLesson, "0zX7BNOOhCutsyzQkEwLbhXbCiU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$convex$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsConvexConfigured"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useCreateLesson() {
    _s9();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(__TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].lessons.create);
}
_s9(useCreateLesson, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useUpdateLesson() {
    _s10();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(__TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].lessons.update);
}
_s10(useUpdateLesson, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useDeleteLesson() {
    _s11();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(__TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].lessons.remove);
}
_s11(useDeleteLesson, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useNews() {
    _s12();
    const isConfigured = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$convex$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsConvexConfigured"])();
    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(__TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].news.listPublished, isConfigured ? undefined : "skip");
    if (!isConfigured || result === null) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPublishedNews"])().map((article)=>({
                ...article,
                publishedAt: article.date,
                createdAt: article.date
            }));
    }
    return result;
}
_s12(useNews, "0zX7BNOOhCutsyzQkEwLbhXbCiU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$convex$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsConvexConfigured"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useFeaturedNews() {
    _s13();
    const isConfigured = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$convex$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsConvexConfigured"])();
    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(__TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].news.listFeatured, isConfigured ? undefined : "skip");
    if (!isConfigured || result === null) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFeaturedNews"])().map((article)=>({
                ...article,
                publishedAt: article.date,
                createdAt: article.date
            }));
    }
    return result;
}
_s13(useFeaturedNews, "0zX7BNOOhCutsyzQkEwLbhXbCiU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$convex$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsConvexConfigured"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useArticle(slug) {
    _s14();
    const isConfigured = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$convex$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsConvexConfigured"])();
    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(__TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].news.getBySlug, isConfigured ? {
        slug
    } : "skip");
    if (!isConfigured || result === null) {
        const article = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNewsArticleBySlug"])(slug);
        if (!article) return null;
        return {
            ...article,
            publishedAt: article.date,
            createdAt: article.date
        };
    }
    return result;
}
_s14(useArticle, "0zX7BNOOhCutsyzQkEwLbhXbCiU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$convex$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsConvexConfigured"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useAllNews() {
    _s15();
    const isConfigured = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$convex$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsConvexConfigured"])();
    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(__TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].news.listAll, isConfigured ? undefined : "skip");
    if (!isConfigured || result === null) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["staticNews"];
    }
    return result;
}
_s15(useAllNews, "0zX7BNOOhCutsyzQkEwLbhXbCiU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$convex$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsConvexConfigured"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useCreateNews() {
    _s16();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(__TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].news.create);
}
_s16(useCreateNews, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useUpdateNews() {
    _s17();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(__TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].news.update);
}
_s17(useUpdateNews, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useDeleteNews() {
    _s18();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(__TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].news.remove);
}
_s18(useDeleteNews, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useGenerateUploadUrl() {
    _s19();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(__TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].storage.generateUploadUrl);
}
_s19(useGenerateUploadUrl, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useSeedData() {
    _s20();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(__TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].seed.seedData);
}
_s20(useSeedData, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/courses/[slug]/lesson/[lessonId]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LessonPlayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useConvex$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useConvex.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function getYouTubeEmbed(url) {
    try {
        const u = new URL(url);
        if (u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be")) {
            // support both youtu.be and youtube.com/watch?v=
            let id = "";
            if (u.hostname.includes("youtu.be")) {
                id = u.pathname.slice(1);
            } else {
                id = u.searchParams.get("v") || "";
            }
            if (id) return `https://www.youtube.com/embed/${id}`;
        }
    } catch (e) {
    // ignore
    }
    return null;
}
function LessonPlayer() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const slug = params?.slug;
    const lessonId = params?.lessonId;
    const lesson = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useConvex$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLesson"])(lessonId);
    const videoUrl = lesson?.videoUrl || "";
    const yt = videoUrl ? getYouTubeEmbed(videoUrl) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen flex-col bg-background",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "border-b border-border",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto flex h-16 items-center justify-between px-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: `/courses/${slug}`,
                            className: "flex items-center gap-2 text-sm hover:text-primary",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/app/courses/[slug]/lesson/[lessonId]/page.tsx",
                                    lineNumber: 47,
                                    columnNumber: 13
                                }, this),
                                "Back to Course"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/courses/[slug]/lesson/[lessonId]/page.tsx",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    size: "sm",
                                    children: "Previous Lesson"
                                }, void 0, false, {
                                    fileName: "[project]/app/courses/[slug]/lesson/[lessonId]/page.tsx",
                                    lineNumber: 52,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    size: "sm",
                                    children: [
                                        "Next Lesson",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                            className: "ml-2 h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/app/courses/[slug]/lesson/[lessonId]/page.tsx",
                                            lineNumber: 57,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/courses/[slug]/lesson/[lessonId]/page.tsx",
                                    lineNumber: 55,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/courses/[slug]/lesson/[lessonId]/page.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/courses/[slug]/lesson/[lessonId]/page.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/courses/[slug]/lesson/[lessonId]/page.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-4 py-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-auto max-w-4xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "mb-4 text-3xl font-bold",
                                children: lesson?.title || `Lesson ${lessonId}`
                            }, void 0, false, {
                                fileName: "[project]/app/courses/[slug]/lesson/[lessonId]/page.tsx",
                                lineNumber: 67,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "aspect-video overflow-hidden rounded-xl border border-border bg-muted",
                                children: videoUrl ? yt ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                                    src: yt,
                                    title: lesson?.title || "Video",
                                    className: "h-full w-full",
                                    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                                    allowFullScreen: true
                                }, void 0, false, {
                                    fileName: "[project]/app/courses/[slug]/lesson/[lessonId]/page.tsx",
                                    lineNumber: 71,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                    src: videoUrl,
                                    controls: true,
                                    className: "h-full w-full object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/app/courses/[slug]/lesson/[lessonId]/page.tsx",
                                    lineNumber: 79,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex h-full items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-muted-foreground",
                                        children: "No video available for this lesson."
                                    }, void 0, false, {
                                        fileName: "[project]/app/courses/[slug]/lesson/[lessonId]/page.tsx",
                                        lineNumber: 83,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/courses/[slug]/lesson/[lessonId]/page.tsx",
                                    lineNumber: 82,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/courses/[slug]/lesson/[lessonId]/page.tsx",
                                lineNumber: 68,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-8",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    className: "w-full",
                                    size: "lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                            className: "mr-2 h-5 w-5"
                                        }, void 0, false, {
                                            fileName: "[project]/app/courses/[slug]/lesson/[lessonId]/page.tsx",
                                            lineNumber: 90,
                                            columnNumber: 17
                                        }, this),
                                        "Mark as Complete"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/courses/[slug]/lesson/[lessonId]/page.tsx",
                                    lineNumber: 89,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/courses/[slug]/lesson/[lessonId]/page.tsx",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/courses/[slug]/lesson/[lessonId]/page.tsx",
                        lineNumber: 66,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/courses/[slug]/lesson/[lessonId]/page.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/courses/[slug]/lesson/[lessonId]/page.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/courses/[slug]/lesson/[lessonId]/page.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_s(LessonPlayer, "D0rYqYswb5bOvAwnRBK5xbk0yCs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useConvex$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLesson"]
    ];
});
_c = LessonPlayer;
var _c;
__turbopack_context__.k.register(_c, "LessonPlayer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_2d0878c2._.js.map