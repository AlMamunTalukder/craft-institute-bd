import Sidebar from "@/components/dashboard/Sidebar";
import NextBreadcrumb from "@/components/shared/NextBreadcrumb";
import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/dashboard/Navbar"));

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const shops = [
    { id: "shop1", name: "Fashion Store", unreadOrders: 3 },
    { id: "shop2", name: "Electronics Hub", unreadOrders: 0 },
    { id: "shop3", name: "Home Decor", unreadOrders: 1 },
  ];

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar session={session} userRole={session.user.role} shops={shops} />
      <div className="flex flex-col">
        <Navbar session={session} />
        <div className="p-4 md:p-6 lg:p-8 ">
          <NextBreadcrumb homeElement={"Home"} capitalizeLinks />
          {children}
        </div>
      </div>
    </div>
  );
}
