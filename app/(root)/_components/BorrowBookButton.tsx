"use client"

import { Button } from '@/components/ui/button'
import { borrowBook } from '@/lib/actions/book.action'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

const BorrowBookButton = ({ bookId, userId, availableCopies, borrowEligibility }: { bookId: string, userId: string, availableCopies: number, borrowEligibility: { isEligible: boolean, reason: string } }) => {

    const router = useRouter();

    const [borrowing, setBorrowing] = useState(false);

    const handleBorrow = async () => {
        if (!borrowEligibility.isEligible) {
            toast.error(borrowEligibility.reason);
            return;
        }

        setBorrowing(true);
        try {
            const result = await borrowBook({ bookId, userId });
            if (result.success) {
                toast.success("Book borrowed successfully");
                router.push("/profile");
            }
        } catch (error) {
            toast.error("Failed to borrow book");
        } finally {
            setBorrowing(false);
        }
    }
    return (
        <Button size="lg" className="w-fit px-6 font-semibold" disabled={borrowing || availableCopies === 0} onClick={handleBorrow}>
            {availableCopies > 0 ? "Borrow Book" : "Not Available"}
        </Button>
    )
}

export default BorrowBookButton