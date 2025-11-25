"use client";

import { Book } from "@/lib/types";
import { StarIcon } from "lucide-react";
import React, { useEffect, useRef } from "react";
import Wrapper from "@/components/Wrapper";
import { Button } from "@/components/ui/button";
import BookCover from "./BookCover";
import gsap from "gsap";

const BookOverview = ({
  title,
  author,
  genre,
  rating,
  total_copies,
  available_copies,
  description,
  color,
  cover,
}: Book) => {
  
  const mainCoverRef = useRef<HTMLDivElement | null>(null);

  // GSAP animation
  useEffect(() => {
    if (!mainCoverRef.current) return;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to(mainCoverRef.current, {
      rotate: 2,
      y: -3,
      duration: 2,
      ease: "sine.inOut",
    });

    return () => {
      tl.kill(); // FIX: return void
    };
  }, []);


  return (
    <section className="py-10">
      <Wrapper className="flex flex-col lg:flex-row gap-10">

        {/* Left: Book details */}
        <div className="flex flex-1 flex-col gap-6">
          <h1 className="text-4xl lg:text-6xl font-semibold tracking-tight">
            {title}
          </h1>

          {/* Meta */}
          <div className="flex flex-col gap-2 text-muted-foreground">
            <p>By <span className="text-foreground font-medium">{author}</span></p>
            <p>Category <span className="text-foreground font-medium">{genre}</span></p>
            <div className="flex items-center gap-1">
              <StarIcon className="size-5 text-yellow-500 fill-yellow-500" />
              <p className="text-foreground font-medium">{rating}</p>
            </div>
          </div>

          {/* Copies */}
          <div className="border border-border rounded-lg p-4 bg-muted/30 flex flex-col gap-2">
            <p className="text-sm">
              Total Books: <span className="font-semibold text-foreground">{total_copies}</span>
            </p>

            <p className="text-sm">
              Available Books: <span className="font-semibold text-foreground">{available_copies}</span>
            </p>
          </div>

          {/* Button */}
          <Button
            size="lg"
            className="w-fit px-6 font-semibold"
            disabled={available_copies === 0}
          >
            {available_copies > 0 ? "Borrow Book" : "Not Available"}
          </Button>

          <p className="text-muted-foreground leading-relaxed text-base">
            {description}
          </p>
        </div>

        {/* Right: Book cover */}
        <div className="flex relative flex-1 h-full justify-center">
          <div className="relative">

            {/* Animated main cover */}
            <div ref={mainCoverRef}>
              <BookCover
                variant="wide"
                className="z-10"
                coverColor={color}
                coverImage={cover}
              />
            </div>

            {/* Shadowed rotated background cover */}
            <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
              <BookCover
                variant="wide"
                coverColor={color}
                coverImage={cover}
              />
            </div>

          </div>
        </div>

      </Wrapper>
    </section>
  );
};

export default BookOverview;
