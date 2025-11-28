"use client";

import { Book } from "@/lib/types";
import { StarIcon } from "lucide-react";
import React, { useEffect, useRef } from "react";
import Wrapper from "@/components/Wrapper";
import { Button } from "@/components/ui/button";
import BookCover from "./BookCover";
import gsap from "gsap";
import BorrowBookButton from "./BorrowBookButton";
import db from "@/database/drizzle";
import { user } from "@/database/schema";
import { eq } from "drizzle-orm";

interface Props extends Book {
  userId: string;
}

const BookOverview = async ({
  id,
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
  userId,
}: Props) => {

  const [users] = await db.select().from(user).where(eq(user.id, userId)).limit(1);

  if (!users) return null;

  const borrowEligibility = {
    isEligible: availableCopies > 0 && users.status === "VERIFIED",
    reason: availableCopies === 0 ? "Book is not available" : "User is not active"
  }

  const mainCoverRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!mainCoverRef.current) return;

    tlRef.current = gsap.timeline({
      paused: true,
      repeat: -1,
      yoyo: true,
      yoyoEase: "power1.inOut"
    });

    tlRef.current.to(mainCoverRef.current, {
      rotate: 1.5,
      y: -4,
      duration: 1.2,
      ease: "power1.inOut",
    });

    return () => { tlRef.current?.kill(); };
  }, []);

  const handleMouseEnter = () => tlRef.current?.play();
  const handleMouseLeave = () => {
    tlRef.current?.pause();
    gsap.to(mainCoverRef.current, {
      rotate: 0,
      y: 0,
      duration: 0.5,
      ease: "power1.out",
    });
  };

  return (
    <section className="py-10">
      <Wrapper className="flex flex-col lg:flex-row gap-10">

        {/* BookCover: Top on mobile, Right on desktop */}
        <div className="flex relative flex-1 justify-center order-1 lg:order-2">
          <div className="relative">
            <div
              ref={mainCoverRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="cursor-pointer"
            >
              <BookCover
                variant="wide"
                className="z-10"
                coverColor={coverColor}
                coverImage={coverUrl}
              />
            </div>

            <div className="absolute left-16 top-10 rotate-12 opacity-60 -z-10 max-lg:hidden">
              <BookCover variant="wide" coverColor={coverColor} coverImage={coverUrl} />
            </div>
          </div>
        </div>

        {/* Book details */}
        <div className="flex flex-1 flex-col gap-6 order-2 lg:order-1">
          <h1 className="text-4xl lg:text-6xl font-semibold tracking-tight">
            {title}
          </h1>

          <div className="flex flex-col gap-2 text-muted-foreground">
            <p>By <span className="text-foreground font-medium">{author}</span></p>
            <p>Category <span className="text-foreground font-medium">{genre}</span></p>
            <div className="flex items-center gap-1">
              <StarIcon className="size-5 text-yellow-500 fill-yellow-500" />
              <p className="text-foreground font-medium">{rating}</p>
            </div>
          </div>

          <div className="border border-border rounded-lg p-4 bg-muted/30 flex flex-col gap-2">
            <p className="text-sm">
              Total Books: <span className="font-semibold text-foreground">{totalCopies}</span>
            </p>
            <p className="text-sm">
              Available Books: <span className="font-semibold text-foreground">{availableCopies}</span>
            </p>
          </div>

          <BorrowBookButton bookId={id} userId={userId} availableCopies={availableCopies} borrowEligibility={borrowEligibility} />

          <p className="text-muted-foreground leading-relaxed text-base">
            {description}
          </p>
        </div>

      </Wrapper>
    </section>
  );
};

export default BookOverview;
