"use client";

import {
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  ShoppingCart,
  Users,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/generateInitials";
import { sidebarLinks as roleBasedLinks } from "./links";
import SidebarLink, { SidebarLinkItem } from "./SidebarLink";
import { isAuthorizedPath } from "./Sidebar";
import LogoutBtn from "../global/LogoutBtn";
import { UserRole } from "@prisma/client";

interface NavbarProps {
  session: Session;
}

export default function Navbar({ session }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  const userRole = session?.user?.role as UserRole;
  const sidebarLinks = roleBasedLinks[userRole];

  // Handle unauthorized access
  useEffect(() => {
    if (pathname && sidebarLinks && !isAuthorizedPath(pathname, sidebarLinks)) {
      router.push("/404");
    }
  }, [pathname, sidebarLinks, router]);

  // Hydration fix
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const isLinkActive = (item: SidebarLinkItem): boolean => {
    return (
      item.href === pathname ||
      item.children?.some((child) => child.href === pathname) ||
      false
    );
  };

  return (
    <header className="sticky top-0 z-50 flex h-14 w-full items-center justify-between border-b border-gray-800 bg-gray-950 px-4 lg:h-16 lg:px-6 text-white">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 md:hidden hover:bg-gray-800"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-64 p-0 bg-gray-950 border-r border-gray-800 overflow-y-scroll no-scrollbar h-screen"
          >
            <nav className="grid gap-1 p-4 ">
              {sidebarLinks.map((item, index) => (
                <SidebarLink
                  key={`${item.href}-${index}`}
                  item={item}
                  isActive={isLinkActive(item)}
                />
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <div className="hidden md:flex md:gap-4"></div>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-10 rounded-full"
              aria-label="Open user menu"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={session?.user?.image ?? ""}
                  alt={session?.user?.name ?? ""}
                  className="object-cover"
                />
                <AvatarFallback className="bg-gray-800 text-white">
                  {getInitials(session?.user?.name)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-gray-950 border-gray-800"
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium text-white">
                  {session?.user?.name}
                </p>
                <p className="text-xs text-gray-400">{session?.user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-800" />
            <DropdownMenuItem className="hover:bg-gray-800 text-white">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-800 text-white">
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-800" />
            <DropdownMenuItem className="text-red-500 hover:bg-gray-800 hover:text-red-400">
              <LogoutBtn />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
