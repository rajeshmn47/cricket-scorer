"use client";

import Link from "next/link";

import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

import { Menu } from "lucide-react";

import { navItems } from "@/lib/constants";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TypographyH2 } from "./ui/typography";

import NavItem from "./NavItem";
import { useState } from "react";
import { usePathname } from "next/navigation";

function Nav() {
  const { theme } = useTheme();

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const pathName = usePathname();

  if (pathName.includes("match/")) return;

  return (
    <nav className="border-b py-4 max-xl:p-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-semibold tracking-tighter">
            ballbyball.
          </h1>
        </Link>
        <ul className="hidden md:flex">
          {navItems.map((item) => (
            <NavItem key={item.name} href={item.href}>
              {item.name}
            </NavItem>
          ))}
        </ul>

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger className="ml-auto mr-4 md:hidden">
            <Menu />
          </SheetTrigger>
          <SheetContent className="space-y-4">
            <SheetHeader className="text-left">
              <Link href="/">
                <TypographyH2 className="text-2xl font-semibold tracking-tighter">
                  ballbyball.
                </TypographyH2>
              </Link>
            </SheetHeader>
            <ul>
              {navItems.map((item) => (
                <NavItem
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsSheetOpen(false)}
                >
                  {item.name}
                </NavItem>
              ))}
            </ul>
            <UserButton
              showName
              afterSignOutUrl="/"
              appearance={{
                baseTheme: theme === "dark" ? dark : undefined,
                elements: {
                  avatarBox: {
                    width: "2.5rem",
                    height: "2.5rem",
                  },
                },
              }}
            />
          </SheetContent>
        </Sheet>

        <div className="max-md:hidden">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              baseTheme: theme === "dark" ? dark : undefined,
              elements: {
                avatarBox: {
                  width: "2.5rem",
                  height: "2.5rem",
                },
              },
            }}
          />
        </div>
      </div>
    </nav>
  );
}

export default Nav;
