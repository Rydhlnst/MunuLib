import { Book } from "@/lib/types";
import Wrapper from "@/components/Wrapper";
import BorrowBookButton from "./BorrowBookButton";
import db from "@/database/drizzle";
import { user } from "@/database/schema";
import { eq } from "drizzle-orm";
import ClientBookCover from "./ClientBookCover";
import { StarIcon } from "lucide-react";

interface Props extends Book {
  userId: string;
}

const BookOverview = async (props: Props) => {
  const {
    id,
    title,
    author,
    genre,
    rating,
    totalCopies,
    availableCopies,
    description,
    coverColor,
    coverUrl,
    userId,
  } = props;

  // Fetch user from DB — ONLY allowed in Server Component
  const [users] = await db
    .select()
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);

  if (!users) return null;

  const borrowEligibility = {
    isEligible: availableCopies > 0 && users.status === "VERIFIED",
    reason: availableCopies === 0 ? "Book is not available" : "User is not active",
  };

  return (
    <section className="py-10">
      <Wrapper className="flex flex-col lg:flex-row gap-10">

        {/* BookCover: Top on mobile, Right on desktop */}
        <ClientBookCover
          coverColor={coverColor}
          coverUrl={coverUrl}
        />

        {/* Book details */}
        <div className="flex flex-1 flex-col gap-6 order-2 lg:order-1">
          <h1 className="text-4xl lg:text-6xl font-semibold tracking-tight">
            {title}
          </h1>

          {/* Author, category & rating */}
          <div className="flex flex-col gap-2 text-muted-foreground">
            <p>
              By{" "}
              <span className="text-foreground font-medium">{author}</span>
            </p>

            <p>
              Category{" "}
              <span className="text-foreground font-medium">{genre}</span>
            </p>

            <div className="flex items-center gap-1">
              <StarIcon className="size-5 text-yellow-500 fill-yellow-500" />
              <p className="text-foreground font-medium">{rating}</p>
            </div>
          </div>

          {/* Total & Available */}
          <div className="border border-border rounded-lg p-4 bg-muted/30 flex flex-col gap-2">
            <p className="text-sm">
              Total Books:{" "}
              <span className="font-semibold text-foreground">
                {totalCopies}
              </span>
            </p>

            <p className="text-sm">
              Available Books:{" "}
              <span className="font-semibold text-foreground">
                {availableCopies}
              </span>
            </p>
          </div>

          {/* Borrow button */}
          <BorrowBookButton
            bookId={id}
            userId={userId}
            availableCopies={availableCopies}
            borrowEligibility={borrowEligibility}
          />

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed text-base">
            {description}
          </p>
        </div>

      </Wrapper>
    </section>
  );
};

export default BookOverview;
