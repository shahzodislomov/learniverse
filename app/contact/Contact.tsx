"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  Mail,
  MessageSquare,
  MapPin,
  Clock,
  Send,
  Github,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "support@learnhub.dev",
    description: "We'll respond within 24 hours",
  },
  {
    icon: MessageSquare,
    title: "Discord",
    value: "discord.gg/learnhub",
    description: "Join our community for quick help",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Remote-first",
    description: "We're a distributed team worldwide",
  },
  {
    icon: Clock,
    title: "Response Time",
    value: "< 24 hours",
    description: "For most inquiries",
  },
];

const faqs = [
  {
    question: "How do I reset my password?",
    answer:
      "Go to the login page and click 'Forgot password?' to receive a reset link via email.",
  },
  {
    question: "Are the courses free?",
    answer:
      "We offer both free and premium courses. Many fundamentals courses are completely free to access.",
  },
  {
    question: "How do the hands-on labs work?",
    answer:
      "Our labs run in secure, isolated environments in your browser. You can practice real attacks without any setup.",
  },
  {
    question: "Can I get a certificate?",
    answer:
      "Yes! Upon completing a course, you'll receive a certificate you can share on LinkedIn and other platforms.",
  },
  {
    question: "Do you offer team/enterprise plans?",
    answer:
      "Absolutely! Contact us for custom pricing and features for teams of 5 or more.",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <MainLayout>
      {/* Hero */}
      <section className="border-b border-border py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Get in Touch
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Have a question, feedback, or want to partner with us? We'd love
              to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl border border-border bg-card p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-1 font-semibold">{item.title}</h3>
                <p className="mb-1 text-primary">{item.value}</p>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-xl border border-border bg-card p-8"
            >
              <h2 className="mb-6 text-2xl font-bold">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="mb-6 text-2xl font-bold">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-border bg-card p-4"
                  >
                    <h3 className="mb-2 font-semibold">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="border-t border-border py-16">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold">Connect with us</h2>
          <p className="mb-8 text-muted-foreground">
            Follow us on social media for updates, tips, and community content.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/wenaco"
              className="flex h-12 w-12 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="flex h-12 w-12 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Twitter className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="flex h-12 w-12 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="flex h-12 w-12 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Youtube className="h-6 w-6" />
            </a>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
