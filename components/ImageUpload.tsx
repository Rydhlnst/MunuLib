"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { FiUploadCloud, FiX } from "react-icons/fi";
import { useUploadThing } from "@/lib/uploadthing";

const UIpload = ({ onUploaded }: { onUploaded: (resp: { url: string }) => void }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { startUpload, isUploading } =
    useUploadThing("imageUpload", {
      onClientUploadComplete: (res) => {
        if (res?.[0]?.url) {
          onUploaded({ url: res[0].url });
          setPreview(res[0].url);
          toast.success("Upload successful!", {
            description: "Your University ID has been uploaded.",
          });
        } else {
          toast.error("Upload failed", { description: "No URL returned." });
        }
      },
      onUploadError: (err) => {
        toast.error("Upload failed", {
          description: err.message ?? "Something went wrong.",
        });
      },
    });

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    setPreview(URL.createObjectURL(file));

    await startUpload([file]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);

    handleFiles(e.dataTransfer.files);
  };

  const handleRemove = () => {
    setPreview(null);
    toast("Image Removed", {
      description: "The uploaded image has been removed.",
    });
  };

  if (preview) {
    return (
      <div className="relative w-full">
        <Image
          src={preview}
          alt="Preview"
          width={400}
          height={300}
          className="w-full h-40 object-cover rounded-xl"
        />

        <button
          type="button"
          onClick={handleRemove}
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

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`border border-muted/50 shadow-md rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition 
        ${
          dragOver
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/30"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        role="button"
      >
        <FiUploadCloud size={42} className="text-muted-foreground" />
        <p className="text-sm text-center">Drag & drop your University ID</p>
        <p className="text-xs text-muted-foreground">
          Image only • Max 4 MB
        </p>

        {isUploading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
            <div className="h-4 w-4 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
            Uploading...
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
    </div>
  );
};

export default UIpload;
