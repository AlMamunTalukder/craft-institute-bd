"use client";

import { cn } from "@/lib/utils";
import { ExternalLink, Package2 } from "lucide-react";
import Link from "next/link";
import { notFound, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { sidebarLinks as roleBasedLinks } from "./links";
import SidebarLink, { SidebarLinkItem } from "./SidebarLink";

type SidebarProps = {
  userRole?: "admin" | "super_admin" | "teacher";
};

export function isAuthorizedPath(
  pathname: string,
  links: SidebarLinkItem[],
): boolean {
  for (const item of links) {
    if (item.href === pathname) {
      return true;
    }
    if (item.children) {
      for (const child of item.children) {
        if (child.href === pathname) {
          return true;
        }
        if (child.extra) {
          for (const extraPath of child.extra) {
            if (extraPath.endsWith("*")) {
              const basePath = extraPath.slice(0, -1);
              if (pathname.startsWith(basePath)) {
                return true;
              }
            } else if (extraPath === pathname) {
              return true;
            }
          }
        }
      }
    }
  }
  return false;
}

const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  const pathname = usePathname();
  const sidebarLinks =
    roleBasedLinks[userRole as string] || roleBasedLinks.teacher;

  const isLinkActive = (item: SidebarLinkItem) => {
    return (
      item.href === pathname ||
      (item.children?.some((child) => child.href === pathname) ?? false)
    );
  };

  useEffect(() => {
    if (!isAuthorizedPath(pathname, sidebarLinks)) {
      return notFound();
    }
  }, [pathname, sidebarLinks]);

  return (
    <div className="hidden border-r border-gray-700 bg-gray-950 md:block text-gray-200">
      <div className="flex h-full sticky top-0  max-h-screen flex-col">
        <div className="flex h-16 items-center border-b border-gray-700 px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-gray-100"
          >
            <Package2 className="h-6 w-6 text-gray-100" />
            <span className="text-xl">
              Go<span className="font-bold">Shop</span>
            </span>
          </Link>
        </div>
        <div
          className="flex-1 overflow-y-scroll no-scrollbar py-2 
          [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-900
  [&::-webkit-scrollbar-thumb]:bg-gray-900
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
        "
        >
          <nav className="grid items-start text-sm font-medium">
            {sidebarLinks.map((item, i) => (
              <SidebarLink key={i} item={item} isActive={isLinkActive(item)} />
            ))}
          </nav>
        </div>
        <div className="border-t border-gray-700 p-4">
          <Link
            href="https://kalamstutorial.com"
            target="_blank"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm  transition-all duration-200",
              "hover:bg-gray-800 hover:text-primary",
            )}
          >
            <ExternalLink className="h-4 w-4" />
            Live Website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
