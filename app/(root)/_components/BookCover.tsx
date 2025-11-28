"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import BookCoverSvg from "./BookCoverSvg";

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

const variantSize: Record<BookCoverVariant, string> = {
  extraSmall: "w-20 h-28",
  small: "w-28 h-40",
  medium: "w-40 h-56",
  regular: "w-48 h-64",
  wide: "w-56 h-72",
};

interface Props {
  className?: string;
  variant?: BookCoverVariant;
  coverColor: string;
  coverImage: string;
}

const BookCover = ({
  className,
  variant = "regular",
  coverColor,
  coverImage,
}: Props) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300 rounded-xl overflow-hidden",
        variantSize[variant],
        className
      )}
    >
      <BookCoverSvg coverColor={coverColor} />

      {/* Cover image positioned precisely to match SVG frame */}
      <div
        className="absolute z-10"
        style={{
          top: "-1%",
          left: "12%",
          width: "87.5%",
          height: "88%",
        }}
      >
        <Image
          src={coverImage}
          alt="Book cover"
          width={400}
          height={600}
          className="object-fill rounded-r-sm w-full h-full"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default BookCover;
