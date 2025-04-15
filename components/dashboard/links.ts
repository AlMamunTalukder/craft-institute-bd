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
      title: "Content",
      href: "/dashboard/content",
      icon: LayoutGrid,
      children: [
        {
          title: "Site Content",
          href: "/dashboard/content/site-content",
          extra: ["/dashboard/content/site-content/*"],
        },
        {
          title: "Banner",
          href: "/dashboard/content/banner",
          extra: ["/dashboard/content/banner/*"],
        },
        {
          title: "Instructor",
          href: "/dashboard/content/instructor/list",
          extra: [
            "/dashboard/content/instructor/list/*",
            "/dashboard/content/instructor/update/*",
            "/dashboard/content/instructor/new",
          ],
        },
      ],
    },

    {
      title: "File Manager",
      href: "/dashboard/file-manager",
      icon: Images,
      children: [
        { title: "List Photos", href: "/dashboard/file-manager/photos" },
        {
          title: "List Folders",
          href: "/dashboard/file-manager/folders",
          extra: ["/dashboard/file-manager/folders/*"],
        },
      ],
    },
    // {
    //   title: "Manage People",
    //   href: "/dashboard/people",
    //   icon: UsersIcon,
    //   children: [
    //     // {
    //     //   title: "List Users",
    //     //   href: "/dashboard/people/users",
    //     //   extra: ["/dashboard/people/users/*"],
    //     // },
    //     {
    //       title: "List Users & Students",
    //       href: "/dashboard/people/students/list",
    //       extra: ["/dashboard/people/students/list/*"],
    //     },
    //   ],
    // },
    // {
    //   title: "Contact Messages",
    //   href: "/dashboard/messages",
    //   icon: MessageCircle,
    //   children: [
    //     {
    //       title: "List Messages",
    //       href: "/dashboard/messages/list",
    //       extra: ["/dashboard/messages/update/*", "/dashboard/messages/list/*"],
    //     },
    //   ],
    // },
  ],
};
