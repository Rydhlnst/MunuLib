import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import BookForm from "../../_forms/BookForm";

const AdminNewBookPage = () => {
  return (
    <section className="w-full max-w-5xl mx-auto py-10 space-y-8">

      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" asChild className="gap-2">
          <Link href="/admin/books">
            <ChevronLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Add New Book
          </h1>
          <p className="text-sm text-muted-foreground">
            Create a new library book entry and configure its media, colors, and metadata.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <BookForm />
    </section>
  );
};

export default AdminNewBookPage;
