import db from '@/database/drizzle';
import { books } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import BookOverview from '../../_components/BookOverview';
import { auth } from '@/auth';
import { headers } from 'next/headers';
import BookVideo from '../../_components/BookVideo';

const BookDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    // ⬅⬅⬅ FIX: HARUS await query
    const bookDetails = await db
        .select()
        .from(books)
        .where(eq(books.id, id))
        .limit(1);

    // bookDetails = array → ambil index 0
    const book = bookDetails[0];

    if (!book) redirect("/404");

    return (
        <>
            <BookOverview
                {...book}
                userId={session?.user?.id as string}
            />

            {/* PAGE WRAPPER */}
            <div className="w-full max-w-7xl mx-auto mt-10 space-y-16 px-4">

                {/* VIDEO SECTION */}
                <section className="flex flex-col gap-6">
                    <div>
                        <h2 className="text-2xl font-semibold tracking-tight">Book Trailer</h2>
                        <p className="text-sm text-muted-foreground">
                            Watch the official trailer for this book.
                        </p>
                    </div>

                    <div className="rounded-xl overflow-hidden border bg-background shadow-sm">
                        <BookVideo videoUrl={book.videoUrl} />
                    </div>
                </section>

                {/* SUMMARY SECTION */}
                <section className="flex flex-col gap-6">
                    <div>
                        <h2 className="text-2xl font-semibold tracking-tight">Summary</h2>
                        <p className="text-sm text-muted-foreground">
                            Key points and story overview.
                        </p>
                    </div>

                    <div className="prose prose-neutral dark:prose-invert leading-relaxed text-lg max-w-none space-y-5">
                        {book.summary.split("\n\n").map((paragraph, index) => (
                            <p key={index} className="text-muted-foreground/90">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </section>

            </div>
        </>

    );
};

export default BookDetailPage;
