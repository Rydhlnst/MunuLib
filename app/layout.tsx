import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/auth";
import db from "@/database/drizzle";
import { after } from "next/server";
import { user } from "@/database/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

// Mengkonfigurasi Plus Jakarta Sans
// Font ini biasanya bersifat variable, jadi weight seringkali opsional
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

// Mengkonfigurasi Bebas Neue
// Bebas Neue adalah display font yang biasanya hanya memiliki weight 400
const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "MunuLib",
  description: "Merupakan Open Library dari MUNU",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  after(async () => {
    if(!session?.user?.id) return;

    const use = await db.select().from(user).where(eq(user.id, session?.user?.id)).limit(1)

    await db.update(user).set({lastActivityDate: new Date().toISOString().slice(0, 10)}).where(eq(user.id, session?.user?.id));
  })

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${jakarta.variable} ${bebas.variable} antialiased`}
      >
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        {children}
        <Toaster/>
      </body>
    </html>
  );
}