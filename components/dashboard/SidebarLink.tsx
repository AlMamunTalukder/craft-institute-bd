/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Circle, CircleCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type SidebarLinkItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  count?: number;
  children?: {
    title: string;
    href: string;
    extra?: string[];
  }[];
};

type SidebarLinkProps = {
  item: SidebarLinkItem;
  isActive: boolean;
};

const SidebarLink: React.FC<SidebarLinkProps> = ({ item, isActive }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChild, setActiveChild] = useState<string | null>(null);
  const Icon = item.icon;
  const pathname = usePathname();

  const isLinkActive = (link: string, extraPaths?: string[]): boolean => {
    if (pathname === link) return true;
    if (pathname.includes(link)) return true;
    if (extraPaths) {
      return extraPaths.some((extraPath) => {
        if (extraPath.endsWith("*")) {
          return pathname.startsWith(extraPath.slice(0, -1));
        }
        return pathname === extraPath;
      });
    }
    return false;
  };

  useEffect(() => {
    if (item.children) {
      const activeChildItem = item.children.find((child) =>
        isLinkActive(child.href, child.extra),
      );
      setActiveChild(activeChildItem ? activeChildItem.href : null);
      setIsOpen(!!activeChildItem);
    }
  }, [pathname, item.children]);

  const isItemActive = isActive || activeChild !== null;

  const linkClasses = cn(
    "flex items-center gap-4 px-4 py-3 text-sm font-medium text-gray-400 transition-all duration-300",
    "border-b border-gray-800 hover:bg-gray-900",
    "group relative overflow-hidden cursor-pointer",
    isItemActive && !item.children && "bg-gray-900 text-gray-100 font-semibold",
    isItemActive && item.children && "cursor-pointer text-gray-100",
  );

  const iconClasses = cn(
    "h-5 w-5 transition-transform duration-300 group-hover:scale-110 text-gray-400",
    isItemActive && "text-gray-100",
  );

  const content = (
    <>
      <Icon className={iconClasses} />
      <span className="flex-grow">{item.title}</span>
      {item.count && (
        <Badge className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
          {item.count}
        </Badge>
      )}
      {item.children && (
        <span className="ml-auto transition-transform duration-300">
          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-gray-400" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-400" />
          )}
        </span>
      )}
      <div className="absolute bottom-0 left-0 h-0.5 w-full bg-primary transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
    </>
  );

  return (
    <div className="relative">
      {item.children ? (
        <div className={linkClasses} onClick={() => setIsOpen(!isOpen)}>
          {content}
        </div>
      ) : (
        <Link href={item.href} className={linkClasses}>
          {content}
        </Link>
      )}
      {item.children && isOpen && (
        <div className="mt-1 space-y-1 border-l border-gray-800 pl-4 ml-4">
          {item.children.map((child, index) => {
            const isChildActive = isLinkActive(child.href, child.extra);
            return (
              <Link
                key={index}
                href={child.href}
                className={cn(
                  "block px-4 py-2 text-sm mt-3 text-gray-400 transition-all rounded duration-200",
                  "hover:bg-gray-900 ",
                  isChildActive && "bg-gray-900 text-gray-300 font-medium",
                )}
              >
                <div className="flex items-center gap-2">
                  {isChildActive ? (
                    <CircleCheck className="h-3 w-3 text-gray-100" />
                  ) : (
                    <Circle className="h-3 w-3 text-gray-400" />
                  )}
                  {child.title}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SidebarLink;
