"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { FiUploadCloud, FiX, FiRotateCw } from "react-icons/fi";
import { useUploadThing } from "@/lib/uploadthing";
import { Progress } from "@/components/ui/progress";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

interface Props {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: keyof OurFileRouter;
  variant?: "dark" | "light";
  onUploaded: (url: string) => void;
}

export default function FileUpload({
  type,
  accept,
  placeholder,
  folder,
  variant = "light",
  onUploaded,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [fileToRetry, setFileToRetry] = useState<File | null>(null);

  const { startUpload } = useUploadThing(folder, {
    onClientUploadComplete: (res) => {
      if (res?.[0]?.url) {
        setPreview(res[0].url);
        onUploaded(res[0].url);

        toast.success("Upload successful!", {
          description: "Your file has been uploaded.",
        });

        setUploading(false);
        setFailed(false);
      }
    },

    onUploadProgress: (p) => {
      setProgress(p);
    },

    onUploadError: () => {
      setUploading(false);
      setFailed(true);

      toast.error("Upload failed", {
        description: "Connection timeout. Click retry to upload again.",
      });
    },
  });

  const uploadFile = async (file: File) => {
    setUploading(true);
    setFailed(false);
    setFileToRetry(file);
    setProgress(5);

    await startUpload([file]);
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    setPreview(URL.createObjectURL(file)); // Show temp preview
    uploadFile(file);
  };

  const handleRetry = () => {
    if (!fileToRetry) return;
    uploadFile(fileToRetry);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const removePreview = () => {
    setPreview(null);
    setFailed(false);
    setProgress(0);
    toast("File removed");
  };

  const isDark = variant === "dark";

  // ===========================
  // PREVIEW AFTER UPLOAD DONE
  // ===========================
  if (preview && !uploading && !failed) {
    return (
      <div className="relative w-full">
        {type === "image" ? (
          <Image
            src={preview}
            alt="Preview"
            width={400}
            height={300}
            className="w-full h-40 object-cover rounded-xl"
          />
        ) : (
          <video
            src={preview}
            className="w-full h-40 object-cover rounded-xl"
            controls
          />
        )}

        <button
          type="button"
          onClick={removePreview}
          className="absolute top-2 right-2 bg-destructive/80 hover:bg-destructive transition text-white p-1 rounded-full"
        >
          <FiX size={18} />
        </button>

        <p className="text-xs text-muted-foreground mt-2 text-center">
          Successfully uploaded
        </p>
      </div>
    );
  }

  // ===========================
  // RETRY STATE
  // ===========================
  if (failed && preview) {
    return (
      <div className="relative w-full">
        <div className="w-full h-40 rounded-xl bg-destructive/10 border border-destructive/30 flex flex-col items-center justify-center gap-2">
          <p className="text-sm text-destructive">Upload failed</p>
          <button
            type="button"
            onClick={handleRetry}
            className="flex items-center gap-2 text-sm bg-destructive text-white px-3 py-1.5 rounded-lg hover:bg-destructive/80 transition"
          >
            <FiRotateCw className="w-4 h-4" />
            Retry Upload
          </button>
        </div>

        <button
          type="button"
          onClick={removePreview}
          className="absolute top-2 right-2 bg-destructive/80 hover:bg-destructive transition text-white p-1 rounded-full"
        >
          <FiX size={18} />
        </button>
      </div>
    );
  }

  // ===========================
  // UPLOAD BOX
  // ===========================
  return (
    <div className="flex flex-col gap-2 w-full">
      <div
        className={`border shadow-sm rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition cursor-pointer
          ${dragOver ? "border-primary bg-primary/10" : "border-muted-foreground/30"}
          ${isDark ? "bg-card" : "bg-background"}
        `}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <FiUploadCloud size={42} className="text-muted-foreground" />

        <p className="text-sm text-center">{placeholder}</p>
        <p className="text-xs text-muted-foreground">{accept}</p>

        {/* Uploading Animation */}
        {uploading && (
          <div className="w-full mt-3">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Uploading... {progress}%
            </p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
    </div>
  );
}
