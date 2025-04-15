import Link from "next/link";
import { db } from "@/prisma/db";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Youtube,
  Link2,
  Image as ImageIcon,
  Group,
  MessageCircle,
  Send,
  PencilLine,
} from "lucide-react";
import TableHeader from "@/components/dashboard/Tables/TableHeader";

export default async function SiteContentPage() {
  const data = await db.siteContent.findFirst();

  if (!data) {
    return <div className="text-center mt-10 text-gray-500">No data found</div>;
  }

  return (
    <div className=" py-10 space-y-8">
      {/* Page header */}
      <TableHeader
        title="Site Content"
        linkTitle="Update Site Content"
        href="/dashboard/content/site-content/update"
        data={[]}
        model="Site Content"
        showImport={false}
        showExport={false}
      />

      {/* Main Card */}
      <Card className="shadow-md border border-muted">
        <CardContent className="space-y-10 p-8">
          {/* Tagline */}
          <SectionHeader icon={<MessageCircle />} title="Tagline" />
          <p className="text-xl font-semibold">{data.tagline}</p>

          {/* Contact Info */}
          <SectionHeader icon={<Phone />} title="Contact Information" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ContactItem icon={<Mail />} label="Email" value={data.email} />
            <ContactItem icon={<Phone />} label="Phone 1" value={data.phone1} />
            <ContactItem
              icon={<Phone />}
              label="Phone 2"
              value={data.phone2 || ""}
            />
            <ContactItem
              icon={<MapPin />}
              label="Address"
              value={data.address}
            />
          </div>

          {/* Social Links */}
          <SectionHeader icon={<Link2 />} title="Social Media Links" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SocialItem
              icon={<Facebook className="text-blue-600" />}
              label="Facebook Page"
              link={data.facebook}
            />
            <SocialItem
              icon={<Group className="text-blue-700" />}
              label="Facebook Group"
              link={data.facebookGroup}
            />
            <SocialItem
              icon={<MessageCircle className="text-green-600" />}
              label="WhatsApp Group"
              link={data.whatsapp}
            />
            <SocialItem
              icon={<Send className="text-blue-400" />}
              label="Telegram Channel"
              link={data.telegram}
            />
            <SocialItem
              icon={<Youtube className="text-red-600" />}
              label="YouTube Channel"
              link={data.youtube}
            />
          </div>

          {/* Logos */}
          <SectionHeader icon={<ImageIcon />} title="Brand Logos" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <LogoItem label="Logo (Light)" src={data.logoLight} />
            <LogoItem label="Logo (Dark)" src={data.logoDark} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Reusable Section Header
function SectionHeader({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b pb-2 mb-4">
      <div className="text-muted-foreground">{icon}</div>
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
  );
}

// Reusable Contact Item
function ContactItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 items-start">
      <div className="text-muted-foreground mt-1">{icon}</div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-base">{value}</p>
      </div>
    </div>
  );
}

// Reusable Social Link Item
function SocialItem({
  icon,
  label,
  link,
}: {
  icon: React.ReactNode;
  label: string;
  link: string;
}) {
  return (
    <div className="flex gap-3 items-start">
      <div className="mt-1">{icon}</div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <a
          href={link}
          className="text-blue-600 hover:underline break-all"
          target="_blank"
          rel="noopener noreferrer"
        >
          {link}
        </a>
      </div>
    </div>
  );
}

// Reusable Logo Viewer
function LogoItem({ label, src }: { label: string; src: string }) {
  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground mb-2">{label}</p>
      <div className="border rounded bg-muted/20 p-3 flex items-center justify-center">
        <img src={src} alt={label} className="h-20 object-contain" />
      </div>
    </div>
  );
}
