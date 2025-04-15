"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

type ActionColumnProps = {
  row: any;
  model: any;
  editEndpoint: string;
  id: string | undefined;
  deleteFunction?: (id: string) => Promise<any>;
};

export default function ActionColumn({
  row,
  model,
  editEndpoint,
  id = "",
  deleteFunction,
}: ActionColumnProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  async function handleDelete() {
    if (!id) {
      toast.error(`${model} not found`);
      return;
    }

    if (!deleteFunction) {
      toast.error(`Delete function is not defined`);
      return;
    }

    try {
      const toastId = toast.loading(`Deleting ${model}...`);

      await deleteFunction(id);

      toast.success(`${model} deleted successfully`, {
        id: toastId,
      });

      setIsOpen(false);
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(`${model} couldn't be deleted`);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              className="text-red-600 hover:text-red-700 transition-all duration-500 cursor-pointer"
              onSelect={(e) => {
                e.preventDefault();
                setIsOpen(true);
              }}
            >
              <Trash className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>Delete</span>
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this{" "}
                {model}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700"
                onClick={handleDelete}
              >
                Permanently Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <DropdownMenuItem asChild>
          <Link
            href={editEndpoint}
            className="flex cursor-pointer items-center gap-2"
          >
            <Pencil className="w-4 h-4" />
            <span>Edit</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
