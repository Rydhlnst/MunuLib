"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { FiSearch, FiBell } from "react-icons/fi"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Header = () => {
  const pathname = usePathname()

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Library", href: "/library" },
    { name: "Categories", href: "/categories" },
    { name: "My Favourites", href: "/my-favourites" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-background/70 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex flex-col px-4 lg:px-8 py-4 gap-4">

        {/* Top Tools */}
        <div className="flex items-center justify-between">
          <div className="flex-1" />

          <div className="flex items-center gap-4">
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <FiSearch className="h-5 w-5" />
            </button>

            <button className="text-muted-foreground hover:text-foreground transition-colors relative">
              <FiBell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full"></span>
            </button>

            <Link href="/profile">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex justify-start">
          <ul className="flex flex-row items-center gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors pb-1",
                      isActive
                        ? "text-foreground border-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

      </div>
    </header>
  )
}

export default Header
