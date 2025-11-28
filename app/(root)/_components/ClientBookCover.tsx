"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import BookCover from "./BookCover";

export default function ClientBookCover({ coverColor, coverUrl }: any) {
    const mainCoverRef = useRef<HTMLDivElement | null>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        if (!mainCoverRef.current) return;

        tlRef.current = gsap.timeline({
            paused: true,
            repeat: -1,
            yoyo: true,
        });

        tlRef.current.to(mainCoverRef.current, {
            rotate: 1.5,
            y: -4,
            duration: 1.2,
            ease: "power1.inOut",
        });

        return () => {
            tlRef.current?.kill();
        };
    }, []);

    return (
        <div className="flex relative flex-1 justify-center order-1 lg:order-2">
            <div className="relative">
                <div
                    ref={mainCoverRef}
                    className="cursor-pointer"
                    onMouseEnter={() => tlRef.current?.play()}
                    onMouseLeave={() => {
                        tlRef.current?.pause();
                        gsap.to(mainCoverRef.current, {
                            rotate: 0,
                            y: 0,
                            duration: 0.5,
                            ease: "power1.out",
                        });
                    }}
                >
                    <BookCover
                        variant="wide"
                        className="z-10"
                        coverColor={coverColor}
                        coverImage={coverUrl}
                    />
                </div>
            </div>
        </div>
    );
}
