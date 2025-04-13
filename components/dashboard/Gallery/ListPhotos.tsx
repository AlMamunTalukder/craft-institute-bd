"use client";

import { deleteImage, getAllImages } from "@/queries/gallery/images";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Download, RefreshCcw, Trash } from "lucide-react";
import Image from "next/image";
import FolderButton from "@/components/dashboard/Gallery/FolderButton";
import ListFolderButton from "@/components/dashboard/Gallery/ListFolderButton";
import UploadButton from "@/components/dashboard/Gallery/UploadButton";
import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";
import { DeleteConfirmationDialog } from "@/components/shared/DeleteConfirmationDialog";
import { handleError } from "@/lib/utils";
import toast from "react-hot-toast";
import { Image as ImageType } from "@prisma/client";

const ListPhotos = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<ImageType | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const {
    data: images = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryFn: getAllImages,
    queryKey: ["images", selectedFolder],
    staleTime: 60000, // 1 minute stale time
  });

  const deleteMutation = useMutation({
    mutationFn: deleteImage,
    onMutate: () => {
      // This runs immediately when the mutation is triggered
      // Make sure dialog stays open during this time
      console.log("Delete mutation started, showing loading state");
    },
    onSuccess: () => {
      console.log("Delete successful, closing dialog");
      toast.success("Image deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["images"] });
      // Only close dialog after successful deletion
      setDialogOpen(false);
      setImageToDelete(null);
    },
    onError: (error) => {
      console.log("Delete failed, keeping dialog open");
      handleError(error);
      // Don't close dialog on error - let user try again if needed
    },
  });

  const handleDeleteClick = useCallback((image: ImageType) => {
    setImageToDelete(image);
    setDialogOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (imageToDelete?.id) {
      deleteMutation.mutate(imageToDelete.id);
      // Dialog will close in onSuccess callback, NOT here
      // Do NOT close the dialog here
    }
  }, [imageToDelete, deleteMutation]);

  const handleCloseDeleteDialog = useCallback(() => {
    // Only allow closing if not in the middle of a deletion operation
    if (!deleteMutation.isPending) {
      setDialogOpen(false);
      setImageToDelete(null);
    }
  }, [deleteMutation.isPending]);

  const renderImageGrid = () => {
    if (isLoading || isFetching || deleteMutation.isPending) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mt-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="aspect-square rounded-lg bg-gray-100 animate-pulse shadow-sm"
            >
              <div className="h-full w-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
            </div>
          ))}
        </div>
      );
    }

    if (images.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center mt-16 p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            No images found
          </h2>
          <p className="text-gray-500 mb-4 text-center">
            Upload some images or select a different folder
          </p>
          <UploadButton />
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mt-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative group overflow-hidden rounded-lg bg-gray-50 shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <div className="aspect-square relative">
              <Image
                fill
                className="object-cover p-0"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                src={image.url}
                alt={image.name || "Gallery image"}
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-white text-sm font-medium truncate">
                {image.name || "Untitled"}
              </h3>
              <p className="text-gray-300 text-xs truncate mt-1">
                {new Date(image.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="absolute top-2 right-2 flex flex-col gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(image);
                }}
              >
                <Trash size={16} className="text-white " />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-500"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(image.url, "_blank");
                }}
              >
                <Download size={16} className="text-white" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-10 bg-white py-4 border-b">
        <div className="flex flex-wrap gap-3 items-center">
          <FolderButton />
          <ListFolderButton />
          <UploadButton />
          <Button
            size="icon"
            variant="outline"
            onClick={() => refetch()}
            disabled={isLoading || isFetching}
            className="ml-auto"
          >
            <RefreshCcw
              size={18}
              className={`${isFetching ? "animate-spin" : ""}`}
            />
          </Button>
        </div>

        {selectedFolder && (
          <div className="mt-3 flex items-center">
            <p className="text-sm text-gray-500">
              Viewing folder:{" "}
              <span className="font-semibold">{selectedFolder}</span>
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 h-6 text-xs"
              onClick={() => setSelectedFolder(null)}
            >
              Clear
            </Button>
          </div>
        )}
      </div>

      {renderImageGrid()}

      {imageToDelete && (
        <DeleteConfirmationDialog
          isOpen={isDialogOpen}
          isLoading={deleteMutation.isPending}
          onClose={handleCloseDeleteDialog}
          onConfirm={handleDeleteConfirm}
          itemName={imageToDelete?.name || "this image"}
          actionType="Delete Image"
        />
      )}
    </div>
  );
};

export default ListPhotos;
