import {
  Home,
  LayoutGrid,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  Users,
  Images,
  Settings,
  Tag,
  Speech,
  BookCheck,
  Presentation,
  BellDot,
  FolderSymlink,
  MessageCircle,
  UsersIcon,
  BookOpen,
} from "lucide-react";

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

export type RoleBasedLinks = {
  [key: string]: SidebarLinkItem[];
};

export const sidebarLinks: RoleBasedLinks = {
  ADMIN: [
    { title: "Dashboard", href: "/dashboard", icon: Home },
    {
      title: "Manage Categories",
      href: "/dashboard/categories",
      icon: LayoutGrid,
      children: [
        {
          title: "List Categories",
          href: "/dashboard/categories/list",
          extra: [
            "/dashboard/categories/update/*",
            "/dashboard/categories/list/*",
          ],
        },
        { title: "Add Categories", href: "/dashboard/categories/new" },
      ],
    },

    {
      title: "File Manager",
      href: "/dashboard/gallery",
      icon: Images,
      children: [{ title: "Gallery", href: "/dashboard/gallery" }],
    },
    {
      title: "Manage People",
      href: "/dashboard/people",
      icon: UsersIcon,
      children: [
        // {
        //   title: "List Users",
        //   href: "/dashboard/people/users",
        //   extra: ["/dashboard/people/users/*"],
        // },
        {
          title: "List Users & Students",
          href: "/dashboard/people/students/list",
          extra: ["/dashboard/people/students/list/*"],
        },
      ],
    },
    {
      title: "Contact Messages",
      href: "/dashboard/messages",
      icon: MessageCircle,
      children: [
        {
          title: "List Messages",
          href: "/dashboard/messages/list",
          extra: ["/dashboard/messages/update/*", "/dashboard/messages/list/*"],
        },
      ],
    },

    {
      title: "Backup & Settings",
      href: "/dashboard/settings",
      icon: Settings,
      children: [
        {
          title: "Frontend",
          href: "/dashboard/settings/frontend",
          extra: ["/dashboard/settings/frontend/update/*"],
        },
        {
          title: "Backup",
          href: "/dashboard/settings/backup",
        },
      ],
    },
  ],
};
