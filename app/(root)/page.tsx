import Image from "next/image";
import BookOverview from "./_components/BookOverview";
import BookList from "./_components/BookList";
import { sampleBooks } from "@/constants";

export default function Home() {
  return (
    <div>
      <BookOverview
        {...sampleBooks[0]}
      />
      <BookList
          title="Latest Books"
          books={sampleBooks}
          containerClassName="mt-20"
      />
    </div>
  );
}
