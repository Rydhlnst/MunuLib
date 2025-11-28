import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import AdminSidebar from "./_components/AdminSidebar";
import HeaderAdmin from "./_components/AdminHeader";
import db from "@/database/drizzle";
import { user } from "@/database/schema";
import { eq } from "drizzle-orm";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) redirect("/sign-in");

  const isAdmin = await db.select({ isAdmin: user.role }).from(user)
    .where(eq(user.id, session.user.id)).limit(1).then((res) => res[0]?.isAdmin === "ADMIN");

  if (!isAdmin) redirect("/");

  return (
    <main className="flex min-h-screen w-full bg-muted">
      <AdminSidebar user={session.user} />

      <div className="flex flex-col flex-1 rounded-tl-3xl overflow-x-hidden max-h-screen">
        <HeaderAdmin user={session.user} />
        <div className="p-6">
          {children}
        </div>
      </div>
    </main>

  );
}
