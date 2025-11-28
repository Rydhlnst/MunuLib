import React from "react"
import BookCard from "./BookCard"
import { Book } from "@/lib/types"
import Wrapper from "@/components/Wrapper"

interface Props {
  books: Book[]
  title: string
  containerClassName?: string
}

const BookList = ({ title, books, containerClassName }: Props) => {

  if (books.length < 2) return null;

  return (
    <section className={containerClassName}>
      <Wrapper>
        <h2 className="font-bebas text-4xl">{title}</h2>

        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">

          {books.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </ul>
      </Wrapper>
    </section>
  )
}

export default BookList
