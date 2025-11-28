import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const AdminDashboardPage = () => {
  return (
    <section className='w-full rounded-2xl bg-primary-foreground p-7'>
        <div className='flex flex-wrap items-center justify-between gap-2'>
            <h2 className='text-xl font-semibold'>All Books</h2>
            <Button asChild>
                <Link href={"/admin/books/new"}>
                    + Create a New Book
                </Link>
            </Button>
        </div>
        <div className='mt-7 w-full overflow-hidden'>
            <p>Table</p>
        </div>
    </section>
  )
}

export default AdminDashboardPage
