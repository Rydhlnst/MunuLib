"use server";

import db from "@/database/drizzle";
import { BookParams, BorrowBookParams } from "../types";
import { books, borrowRecords } from "@/database/schema";
import { eq } from "drizzle-orm";
import dayjs from "dayjs";

export const createBook = async (params: BookParams) => {
    try {
        const newBook = await db.insert(books).values({
            ...params,
            availableCopies: params.totalCopies,
        }).returning();

        return {
            success: true,
            message: "Book created successfully.",
            data: JSON.parse(JSON.stringify(newBook)),
        }
    } catch (error) {
        console.log(error);

        return {
            success: false,
            message: "An error occurred while creating the book."
        }
    }
}

export const borrowBook = async (params: BorrowBookParams) => {
    const { bookId, userId } = params;

    try {
        const book = await db.select({ availableCopies: books.availableCopies }).from(books).where(eq(books.id, bookId)).limit(1);

        if (!book.length || book[0].availableCopies <= 0) {
            return {
                success: false,
                message: "Book not found or not available."
            }
        }

        const dueDate = dayjs().add(7, "days").toDate();

        const record = await db.insert(borrowRecords).values({
            userId,
            bookId,
            dueDate,
            status: "BORROWED",
        }).returning();

        await db.update(books).set({ availableCopies: book[0].availableCopies - 1 }).where(eq(books.id, bookId));

        return {
            success: true,
            message: "Book borrowed successfully.",
            data: JSON.parse(JSON.stringify(record)),
        }
    } catch (error) {
        console.log(error)

        return {
            success: false,
            message: "An error occurred while borrowing the book."
        }
    }
}