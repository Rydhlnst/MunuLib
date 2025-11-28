import Image from "next/image";
import BookOverview from "./_components/BookOverview";
import BookList from "./_components/BookList";
import { sampleBooks } from "@/constants";
import { auth } from "@/auth";
import { headers } from "next/headers";
import db from "@/database/drizzle";
import { books } from "@/database/schema";
import { Book } from "@/lib/types";
import { desc } from "drizzle-orm";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const latestBooks = (await db.select().from(books).limit(10).orderBy(desc(books.createdAt))) as Book[];

  if (latestBooks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-foreground">No books available</h1>
        <p className="text-muted-foreground">Please check back later.</p>
      </div>
    );
  }

  return (
    <div>
      <BookOverview {...latestBooks[0]} userId={session?.user?.id as string} />
      <BookList
        title="Latest Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-20"
      />
    </div>
  );
}
