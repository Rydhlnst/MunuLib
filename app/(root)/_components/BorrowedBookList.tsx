import React from 'react'
import { Book } from '@/lib/types'
import BookCard from './BookCard';

interface Props {
    books: Book[];
}

const BorrowedBookList = ({ books }: Props) => {
    return (
        <div className='mt-10'>
            <h2 className='font-bebas text-2xl text-dark-100'>Borrowed Books</h2>

            <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6'>
                {books.map((book) => (
                    <BookCard key={book.id} {...book} isLoanedBook={true} />
                ))}
            </ul>
        </div>
    )
}

export default BorrowedBookList
