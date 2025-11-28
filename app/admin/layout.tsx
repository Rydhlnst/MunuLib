import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import AdminSidebar from "./_components/AdminSidebar";
import HeaderAdmin from "./_components/AdminHeader";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) redirect("/sign-in");

  return (
    <main className="flex min-h-screen w-full bg-muted">
  <AdminSidebar user={session.user} />

  <div className="flex flex-col flex-1 rounded-tl-3xl overflow-hidden">
        <HeaderAdmin user={session.user} />
        <div className="p-6">
            {children}
        </div>
    </div>
    </main>

  );
}
