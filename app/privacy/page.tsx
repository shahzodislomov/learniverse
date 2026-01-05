// import { MainLayout } from "@/components/layout/MainLayout";

// export default function PrivacyPage() {
//   return (
//     <MainLayout>
//       <div className="container mx-auto max-w-4xl px-4 py-16">
//         <h1 className="mb-6 text-4xl font-bold">Privacy Policy</h1>
//         <div className="prose prose-neutral dark:prose-invert max-w-none">
//           <p className="text-lg text-muted-foreground">
//             This page is under construction. Check back soon for our privacy policy.
//           </p>
//         </div>
//       </div>
//     </MainLayout>
//   );
// }
import { MainLayout } from "@/components/layout/MainLayout";

export default function PrivacyPage() {
  return (
    <MainLayout>
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <h1 className="mb-6 text-4xl font-bold">Privacy Policy</h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground">
            Last updated: January 2026
          </p>

          <p>
            We respect your privacy and are committed to protecting your personal
            data. This Privacy Policy explains how we collect, use, and protect
            information when you use our cybersecurity learning platform.
          </p>

          <h2>1. Purpose of the Platform</h2>
          <p>
            This website is an educational platform focused on cybersecurity,
            ethical hacking, and Capture The Flag (CTF) challenges. All content
            is provided strictly for <strong>educational and defensive purposes</strong>.
          </p>
          <p>
            We do <strong>not</strong> encourage illegal activity, unauthorized
            access, or misuse of tools and techniques demonstrated on this platform.
          </p>

          <h2>2. Information We Collect</h2>
          <ul>
            <li>Basic account information (such as username or email)</li>
            <li>Progress data (completed lessons, labs, or challenges)</li>
            <li>Technical data (IP address, browser type, device information)</li>
          </ul>

          <p>
            We do <strong>not</strong> collect sensitive personal data such as real
            names, physical addresses, or payment information unless explicitly required.
          </p>

          <h2>3. How We Use Your Data</h2>
          <ul>
            <li>To provide access to courses, labs, and CTF challenges</li>
            <li>To track learning progress and achievements</li>
            <li>To improve platform performance and security</li>
            <li>To prevent abuse, cheating, or malicious activity</li>
          </ul>

          <h2>4. Cookies & Analytics</h2>
          <p>
            We may use minimal cookies or analytics tools to understand how users
            interact with the platform. These are used only to improve usability
            and system reliability.
          </p>

          <p>
            We do <strong>not</strong> use cookies for advertising or tracking you
            across other websites.
          </p>

          <h2>5. Data Security</h2>
          <p>
            As a cybersecurity-focused platform, we take data protection seriously.
            Reasonable technical and organizational measures are implemented to
            protect your data from unauthorized access, loss, or disclosure.
          </p>

          <p>
            However, no system is 100% secure. By using this platform, you acknowledge
            this risk.
          </p>

          <h2>6. Ethical Use & Responsibility</h2>
          <p>
            You agree to use the platform responsibly and ethically. Any attempts
            to abuse the platform, attack infrastructure, or violate laws may
            result in account suspension or termination.
          </p>

          <h2>7. Third-Party Services</h2>
          <p>
            We may integrate third-party services (such as authentication or hosting
            providers). These services have their own privacy policies, and we are
            not responsible for their practices.
          </p>

          <h2>8. Your Rights</h2>
          <p>
            Depending on your location, you may have the right to access, correct,
            or delete your personal data. You may also request information about
            how your data is processed.
          </p>

          <h2>9. Changes to This Policy</h2>
          <p>
            This Privacy Policy may be updated as the platform evolves. Any changes
            will be reflected on this page with an updated revision date.
          </p>

          <h2>10. Contact</h2>
          <p>
            If you have questions or concerns about this Privacy Policy, you may
            contact us via the platform’s official communication channels.
          </p>

          <p className="text-sm text-muted-foreground">
            By using this website, you agree to this Privacy Policy.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
