"use client";

import Image from "next/image";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import DateColumn from "@/components/DataTableColumns/DateColumn";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import { Instructor } from "@prisma/client";
import { deleteInstructor } from "@/queries/content/instructors";

export const columns: ColumnDef<Instructor>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const instructor = row.original;
      return (
        <div className="flex items-center space-x-2">
          <ImageColumn row={row} accessorKey="image" />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const instructor = row.original;
      return (
        <div className="flex items-center space-x-2">
          <span>{instructor.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "bio",
    header: "Bio",
    cell: ({ row }) => {
      const instructor = row.original;
      return <span>{instructor.bio}</span>;
    },
  },

  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const instructor = row.original;
      return (
        <ActionColumn
          row={row}
          model="instructor"
          editEndpoint={`update/${instructor.id}`}
          id={instructor.id}
          deleteFunction={(id: string) => deleteInstructor(id)}
        />
      );
    },
  },
];
