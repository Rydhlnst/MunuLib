import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import BookForm from '../../_forms/BookForm'

const AdminNewBookPage = () => {
  return (
    <>
        <Button asChild>
            <Link href={"/admin/books"}>
                <ChevronLeft/>
                Back
            </Link>    
        </Button> 
        <section className='w-full max-w-3xl'>
            <BookForm/>
        </section>
    </>
  )
}

export default AdminNewBookPage
