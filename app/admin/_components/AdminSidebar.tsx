"use client";

import { Home, Users, Book, ClipboardList, UserCheck, BookIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { usePathname } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AdminSidebar({ user }: { user: any }) {
  const pathname = usePathname();

  const userName = user?.fullName ?? "Unknown User";
  const userEmail = user?.email ?? "unknown@email.com";
  const userImage = user?.image ?? "";

  const navItems = [
    { label: "Home", icon: Home, href: "/admin" },
    { label: "All Users", icon: Users, href: "/admin/users" },
    { label: "All Books", icon: Book, href: "/admin/books" },
    { label: "Borrow Requests", icon: ClipboardList, href: "/admin/borrow" },
    { label: "Account Requests", icon: UserCheck, href: "/admin/accounts" },
  ];

  return (
    <aside
      className="
        flex h-screen flex-col border-r bg-primary-foreground
        w-16 lg:w-64 transition-all duration-300 rounded-r-4xl
      "
    >
      {/* TOP LOGO */}
      <div className="flex items-center justify-center lg:justify-start lg:px-6 h-20 border-b">
        <h1 className="text-xl font-bold hidden lg:block">
          <span className="text-primary">Munu</span>Lib
        </h1>

        <span className="lg:hidden text-primary text-2xl font-bold px-0 mx-0">
            <BookIcon/>
        </span>
      </div>

      {/* NAVIGATION */}
      <nav className="flex flex-col mt-4 gap-2 px-2 lg:px-4 flex-1">
        {navItems.map((item) => {
          const active = pathname === item.href;

          return (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5 mx-auto lg:mx-0" />

              <span className="hidden lg:inline">
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>

      {/* USER SECTION */}
      <div className="p-3 mt-auto flex justify-center">
        {/* Compact mode (icon-only sidebar) */}
        <div className="block lg:hidden">
          <Avatar className="h-10 w-10">
            <AvatarImage src={userImage} alt={userName} />
            <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>

        {/* Full card for lg+ */}
        <Card className="hidden lg:block w-full shadow-sm">
          <CardContent className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={userImage} alt={userName} />
              <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="leading-tight">
              <p className="text-sm font-semibold">{userName}</p>
              <p className="text-xs text-muted-foreground truncate max-w-[130px]">
                {userEmail}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}
