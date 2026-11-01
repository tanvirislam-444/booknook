"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Menu, X } from "lucide-react";
import { cn } from "cn";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
  { href: "/add-book", label: "Add Book" },
  { href: "/my-books", label: "My Books" },
  { href: "/my-borrows", label: "My Borrows" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#4b362a]/80 bg-[#2b1e17] text-[#f2e7d9]">
      <div className="mx-auto flex h-12 w-full items-center gap-4 px-4 sm:px-10">
        {/* Brand */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="grid size-7 place-items-center rounded-md bg-[#1d140f] ring-1 ring-[#f2e7d9]/15">
            <BookOpen className="size-4" />
          </span>
          <span className="text-[15px] font-bold tracking-wide">BookNook</span>
        </Link>

        {/* Middle links (desktop) */}
        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-1.5 text-[13px] transition-colors",
                pathname === link.href
                  ? "bg-white/10 font-medium text-[#f7efe3]"
                  : "text-[#f2e7d9]/75 hover:bg-white/5 hover:text-[#f7efe3]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rounded-md p-1.5 text-[#f2e7d9]/80 transition-colors hover:bg-white/5 hover:text-[#f7efe3] lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
          <Link
            href="/login"
            className="rounded-md border border-[#f2e7d9]/25 px-3 py-1.5 text-[13px] transition-colors hover:bg-white/5"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-md bg-[#f2e7d9] px-3.5 py-1.5 text-[13px] font-semibold text-[#2b1e17] transition-colors hover:bg-white"
          >
            Register
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="flex flex-col gap-1 border-t border-[#4b362a]/80 px-4 py-2 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-md px-3 py-2 text-[13px] transition-colors",
                pathname === link.href
                  ? "bg-white/10 font-medium text-[#f7efe3]"
                  : "text-[#f2e7d9]/75 hover:bg-white/5 hover:text-[#f7efe3]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
