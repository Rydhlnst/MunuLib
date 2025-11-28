import dummyBooks from "@/public/dummybook.json";

import { books } from "@/database/schema";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { uploadFromUrl } from "./uploadFromURL";

config({ path: ".env" });

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

const seed = async () => {
    console.log("Seeding data...");

    try {
        for (const book of dummyBooks) {
            // Upload image to UploadThing
            const coverUrl = await uploadFromUrl(
                book.coverUrl,
                `${book.title}-cover.jpg`,
            );

            // Upload video to UploadThing
            const videoUrl = await uploadFromUrl(
                book.videoUrl,
                `${book.title}-trailer.mp4`,
            );

            // Insert into DB
            await db.insert(books).values({
                ...book,
                coverUrl: coverUrl!,
                videoUrl: videoUrl!,
            });

            console.log(`Inserted: ${book.title}`);
        }

        console.log("Dummy books seeded successfully!");
    } catch (error) {
        console.error("Error seeding books:", error);
    }
};

seed();
