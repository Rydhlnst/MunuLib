import { Book } from "@/lib/types"
import Link from "next/link"
import BookCover from "./BookCover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BookCardProps extends Book {
  isLoanedBook?: boolean
}

const BookCard = ({
  id,
  title,
  genre,
  coverColor,
  coverUrl,
  isLoanedBook = false,
}: BookCardProps) => {
  return (
    <li className={cn("group cursor-pointer", isLoanedBook && "xs:w-52 w-full")}>
      <Link href={`/books/${id}`} className="block">

        {/* Cover */}
        <BookCover
          coverColor={coverColor}
          coverImage={coverUrl}
          variant="regular"
          className="mx-auto"
        />

        {/* Text section */}
        <div
          className={cn(
            "mt-4 space-y-1 w-full text-center",
            !isLoanedBook && "max-w-44 mx-auto"
          )}
        >
          <p className="text-lg font-semibold leading-tight line-clamp-2">
            {title}
          </p>
          <p className="text-sm text-muted-foreground">{genre}</p>
        </div>

        {isLoanedBook && (
          <div className="mt-3 w-full">
            <div className="book-loaned">
              <CalendarIcon />
              <p className="">11 Days left to return</p>
            </div>

            <Button>Download Receipt</Button>
          </div>
        )}
      </Link>
    </li>
  )
}

export default BookCard
