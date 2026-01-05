import { MainLayout } from "@/components/layout/MainLayout";

export default function TermsPage() {
  return (
    <MainLayout>
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <h1 className="mb-6 text-4xl font-bold">Terms of Service</h1>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground">
            This page is under construction. Check back soon for our terms of service.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}