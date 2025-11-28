"use client";

import { usePathname } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HeaderAdmin({ user }: { user: any }) {
  const pathname = usePathname();

  // Judul dinamis berdasarkan route
  const titleMap: Record<string, string> = {
    "/admin": "Dashboard",
    "/admin/users": "All Users",
    "/admin/books": "All Books",
    "/admin/borrow": "Borrow Requests",
    "/admin/accounts": "Account Requests",
  };

  const title = titleMap[pathname] || "Admin Panel";

  return (
    <div className="w-full border-b bg-muted px-6 py-5">
      <h1 className="text-2xl font-semibold">
        {user.fullName} <span className="text-primary">|</span>
        <span> Munu<span className="text-primary">Lib</span></span>
      </h1>
      <p className="text-sm text-muted-foreground mt-1">
        Monitor: {title}
      </p>
    </div>
  );
}
