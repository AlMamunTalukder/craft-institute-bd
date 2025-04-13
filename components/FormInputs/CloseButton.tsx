import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function CloseButton({
  href,
  parent = "inventory",
}: {
  href: string;
  parent?: string;
  onClick?: () => void;
}) {
  return (
    <Button type="button" size="lg" variant="outline" asChild>
      <Link
        href={
          parent === "" ? `/dashboard${href}` : `/dashboard/${parent}${href}`
        }
      >
        Close
      </Link>
    </Button>
  );
}
