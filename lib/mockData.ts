// Static mock data for the application - works without backend

export interface Course {
  _id: string;
  title: string;
  slug: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  category: string;
  image: string;
  instructor: {
    name: string;
    title: string;
    avatar: string;
  };
  duration: string;
  lessonsCount: number;
  studentsCount: number;
  rating: number;
  isPublished: boolean;
  isFeatured: boolean;
  whatYouLearn: string[];
  requirements: string[];
}

export interface Lesson {
  _id: string;
  courseId: string;
  title: string;
  description: string;
  moduleTitle: string;
  duration: string;
  videoUrl: string;
  order: number;
  isPreview: boolean;
}

export interface NewsArticle {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  image: string;
  date: string;
  readTime: string;
  isPublished: boolean;
  isFeatured: boolean;
}

export interface Lab {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
  category: string;
  estimatedTime: string;
  points: number;
  status: "available" | "coming-soon" | "maintenance";
  tools: string[];
}

// Static Courses Data
export const staticCourses: Course[] = [
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
      avatar: "AC",
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
      "Configure security headers properly",
    ],
    requirements: [
      "Basic HTML and JavaScript knowledge",
      "Understanding of HTTP protocol",
      "A computer with internet access",
    ],
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
      avatar: "SM",
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
      "Writing professional pentest reports",
    ],
    requirements: [
      "Completion of beginner pentesting course",
      "Familiarity with Kali Linux",
      "Basic networking knowledge",
    ],
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
      avatar: "MJ",
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
      "Incident response procedures",
    ],
    requirements: [
      "Basic networking concepts (TCP/IP)",
      "Familiarity with command line",
      "Access to lab environment",
    ],
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
      avatar: "ED",
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
      "Writing forensic reports",
    ],
    requirements: [
      "Understanding of operating systems",
      "Basic knowledge of file systems",
      "Analytical mindset",
    ],
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
      avatar: "RK",
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
      "Common cryptographic attacks",
    ],
    requirements: [
      "Basic mathematics",
      "Interest in security concepts",
      "No prior cryptography knowledge needed",
    ],
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
      avatar: "JL",
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
      "Threat intelligence integration",
    ],
    requirements: [
      "Understanding of network security",
      "Familiarity with log analysis",
      "Basic scripting knowledge",
    ],
  },
];

// Static Lessons Data with real YouTube video IDs
export const staticLessons: Lesson[] = [
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
    isPreview: true,
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
    isPreview: true,
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
    isPreview: false,
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
    isPreview: false,
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
    isPreview: false,
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
    isPreview: true,
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
    isPreview: false,
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
    isPreview: false,
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
    isPreview: true,
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
    isPreview: false,
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
    isPreview: true,
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
    isPreview: true,
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
    isPreview: true,
  },
];

// Static News Data
export const staticNews: NewsArticle[] = [
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
    isFeatured: true,
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
    isFeatured: true,
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
    isFeatured: true,
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
    isFeatured: false,
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
    isFeatured: false,
  },
];

// Static Labs Data
export const staticLabs: Lab[] = [
  {
    id: "lab-1",
    title: "SQL Injection Playground",
    description: "Practice identifying and exploiting SQL injection vulnerabilities in a safe environment. Learn techniques from basic to advanced injections.",
    difficulty: "Easy",
    category: "Web Security",
    estimatedTime: "45 min",
    points: 100,
    status: "available",
    tools: ["Burp Suite", "SQLMap", "Browser Dev Tools"],
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
    tools: ["Browser Dev Tools", "Burp Suite"],
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
    tools: ["Terminal", "LinPEAS", "GTFOBins"],
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
    tools: ["Wireshark", "tcpdump", "NetworkMiner"],
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
    tools: ["Volatility", "Rekall", "YARA"],
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
    tools: ["Postman", "Burp Suite", "cURL"],
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
    tools: ["Impacket", "Mimikatz", "BloodHound"],
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
    tools: ["John the Ripper", "Hashcat", "OpenSSL"],
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
    tools: ["Splunk", "ELK Stack"],
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
    tools: ["Docker", "Trivy", "Falco"],
  },
];

// Helper functions
export function getCourseBySlug(slug: string): Course | undefined {
  return staticCourses.find((course) => course.slug === slug);
}

export function getLessonsByCourse(courseId: string): Lesson[] {
  return staticLessons.filter((lesson) => lesson.courseId === courseId);
}

export function getLessonById(lessonId: string): Lesson | undefined {
  return staticLessons.find((lesson) => lesson._id === lessonId);
}

export function getPublishedCourses(): Course[] {
  return staticCourses.filter((course) => course.isPublished);
}

export function getFeaturedCourses(): Course[] {
  return staticCourses.filter((course) => course.isFeatured && course.isPublished).slice(0, 3);
}

export function getPublishedNews(): NewsArticle[] {
  return staticNews.filter((article) => article.isPublished);
}

export function getFeaturedNews(): NewsArticle[] {
  return staticNews.filter((article) => article.isFeatured && article.isPublished).slice(0, 3);
}

export function getNewsArticleBySlug(slug: string): NewsArticle | undefined {
  return staticNews.find((article) => article.slug === slug);
}

export function getAvailableLabs(): Lab[] {
  return staticLabs.filter((lab) => lab.status === "available");
}
