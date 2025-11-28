import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  universityIdCard: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
    console.log("University ID uploaded:", file.url);
    return { url: file.url };
  }),

  videoUpload: f({
    video: {
      maxFileSize: "1024MB",  
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
    console.log("Video uploaded:", file.url);
    return { url: file.url };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
