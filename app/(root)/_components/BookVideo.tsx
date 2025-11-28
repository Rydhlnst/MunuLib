"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BookVideoProps {
    videoUrl?: string | null;
    className?: string;
}

const BookVideo = ({ videoUrl, className }: BookVideoProps) => {
    // Fallback: tidak ada video
    if (!videoUrl) {
        return (
            <div className="w-full h-48 rounded-lg border border-muted-foreground/30 flex items-center justify-center text-muted-foreground">
                No trailer uploaded
            </div>
        );
    }

    // UploadThing URL example:
    // https://uploadthing-prod.s3.amazonaws.com/....
    // Kita langsung pakai <video> saja (UploadThing video = mp4/webm biasa)
    return (
        <div className={cn("w-full rounded-xl overflow-hidden", className)}>
            <video
                src={videoUrl}
                controls
                className="w-full h-full object-cover rounded-xl"
            />
        </div>
    );
};

export default BookVideo;
