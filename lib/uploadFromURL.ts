import { utapi } from "./server/utapi";

export const uploadFromUrl = async (url: string, fileName: string) => {
    try {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();

        // Convert to File
        const file = new File([arrayBuffer], fileName, {
            type: response.headers.get("content-type") ?? "application/octet-stream",
        });

        // MUST BE AN ARRAY
        const uploadRes = await utapi.uploadFiles([file]);

        return uploadRes[0]?.data?.url ?? null;
    } catch (err) {
        console.error("UploadThing server upload error:", err);
        return null;
    }
};
