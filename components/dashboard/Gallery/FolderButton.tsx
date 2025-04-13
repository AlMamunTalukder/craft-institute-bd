"use client";

import { Button } from "@/components/ui/button";
import { Folder as IFolder } from "@prisma/client";
import { FolderPlus } from "lucide-react";
import { useState } from "react";
import FolderModal from "./FolderModal";

interface IFolderButtonProps {
  folder?: IFolder | null;
}

function FolderButton({ folder: editFolder }: IFolderButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <FolderPlus size={24} />
        <span>Create Folders</span>
      </Button>

      {open && (
        <FolderModal folder={editFolder} open={open} setOpen={setOpen} />
      )}
    </>
  );
}

export default FolderButton;
