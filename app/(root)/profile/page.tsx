import { auth } from '@/auth';
import { books, borrowRecords, user } from '@/database/schema';
import { eq, desc } from 'drizzle-orm';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'
import db from '@/database/drizzle';
import BorrowedBookList from '../_components/BorrowedBookList';
import { Book } from '@/lib/types';

const ProfilePage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user?.id) return redirect("/sign-in");

    const [userRecord] = await db.select().from(user).where(eq(user.id, session.user.id)).limit(1);

    if (!userRecord) return redirect("/sign-in");

    const borrowedBooks = await db.select({
        id: books.id,
        title: books.title,
        author: books.author,
        genre: books.genre,
        rating: books.rating,
        coverUrl: books.coverUrl,
        coverColor: books.coverColor,
        totalCopies: books.totalCopies,
        availableCopies: books.availableCopies,
        description: books.description,
        videoUrl: books.videoUrl,
        summary: books.summary,
        createdAt: books.createdAt,
    }).from(borrowRecords)
        .leftJoin(books, eq(borrowRecords.bookId, books.id))
        .where(eq(borrowRecords.userId, session.user.id))
        .orderBy(desc(borrowRecords.createdAt));

    return (
        <>
            <div className='flex flex-col gap-10'>
                {/* Profile Header */}
                <section className='w-full relative'>
                    <div className='w-full h-40 bg-linear-to-r from-blue-500 to-purple-600 rounded-b-3xl opacity-20' />
                    <div className='absolute -bottom-10 left-10 flex items-end gap-6'>
                        <div className='w-32 h-32 rounded-full bg-gray-200 border-4 border-white overflow-hidden'>
                            {/* Placeholder for user image if available, or initials */}
                            <div className='w-full h-full flex items-center justify-center bg-primary text-white text-4xl font-bold'>
                                {userRecord.fullName.slice(0, 2).toUpperCase()}
                            </div>
                        </div>
                        <div className='mb-2'>
                            <h1 className='text-3xl font-bold text-dark-100'>{userRecord.fullName}</h1>
                            <p className='text-muted-foreground'>{userRecord.email}</p>
                        </div>
                    </div>
                </section>

                {/* Additional Info */}
                <section className='mt-16 px-10 grid grid-cols-1 md:grid-cols-2 gap-8'>
                    <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
                        <h3 className='text-lg font-semibold text-dark-100 mb-4'>University Details</h3>
                        <div className='space-y-3'>
                            <div className='flex justify-between'>
                                <span className='text-muted-foreground'>University ID</span>
                                <span className='font-medium'>{userRecord.universityId}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-muted-foreground'>University Card</span>
                                <span className='font-medium'>{userRecord.universityCard}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-muted-foreground'>Status</span>
                                <span className={`font-medium px-2 py-0.5 rounded-full text-xs ${userRecord.status === 'VERIFIED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {userRecord.status}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Borrowed Books */}
                <section className='px-10'>
                    <BorrowedBookList books={borrowedBooks as Book[]} />
                </section>
            </div>
        </>
    )
}

export default ProfilePage