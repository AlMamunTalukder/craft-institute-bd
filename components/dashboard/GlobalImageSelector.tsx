import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { deleteImage, getAllImages } from "@/queries/gallery/images";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ImageIcon, Trash2, X, Loader2 } from "lucide-react";
import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useCallback,
  useState,
} from "react";
import CustomPagination from "../shared/CustomPagination";
import { DeleteConfirmationDialog } from "../shared/DeleteConfirmationDialog";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
  setSelectedImage: Dispatch<SetStateAction<any>>;
  mode: "single" | "multiple";
  selectedImage: string | string[];
}

interface ImageType {
  id: string;
  url: string;
  name: string;
  folderId?: string;
}

const IMAGES_PER_PAGE = 30;

const GlobalImageSelector = ({
  open,
  onClose,
  selectedImage,
  setSelectedImage,
  mode,
}: Props) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<ImageType | null>(null);

  const queryClient = useQueryClient();

  // Get images with pagination
  const { data, isLoading } = useQuery({
    queryFn: () => getAllImages(page, IMAGES_PER_PAGE),
    queryKey: ["images", page],
    staleTime: 60000,
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteImage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });

  const images = data?.images || [];
  const totalPages = data?.totalPages || 1;

  // Initialize selection based on props
  useEffect(() => {
    if (mode === "single" && typeof selectedImage === "string") {
      setSelectedImages(selectedImage ? [selectedImage] : []);
    } else if (mode === "multiple" && Array.isArray(selectedImage)) {
      setSelectedImages(selectedImage);
    }
  }, [selectedImage, mode, open]);

  const handleSelectImage = useCallback(
    (url: string) => {
      if (mode === "single") {
        setSelectedImages([url]);
      } else {
        setSelectedImages((prev) =>
          prev.includes(url)
            ? prev.filter((img) => img !== url)
            : [...prev, url],
        );
      }
    },
    [mode],
  );

  const handleRemoveImage = useCallback((url: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setSelectedImages((prev) => prev.filter((img) => img !== url));
  }, []);

  const handleOk = useCallback(() => {
    setSelectedImage(mode === "single" ? selectedImages[0] : selectedImages);
    onClose();
  }, [mode, selectedImages, setSelectedImage, onClose]);

  const handleOpenDeleteDialog = useCallback(
    (image: ImageType, e: React.MouseEvent) => {
      e.stopPropagation();
      setImageToDelete(image);
      setIsDialogOpen(true);
    },
    [],
  );

  const handleCloseDeleteDialog = useCallback(() => {
    setIsDialogOpen(false);
    setImageToDelete(null);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (imageToDelete) {
      deleteMutation.mutate(imageToDelete.id);
      // Remove from selected images if it was selected
      if (selectedImages.includes(imageToDelete.url)) {
        handleRemoveImage(imageToDelete.url);
      }
    }
    handleCloseDeleteDialog();
  }, [
    imageToDelete,
    deleteMutation,
    selectedImages,
    handleRemoveImage,
    handleCloseDeleteDialog,
  ]);

  // ImageThumbnail component for better code organization
  const ImageThumbnail = useCallback(
    ({ img, isSelected }: { img: ImageType; isSelected: boolean }) => (
      <div
        className={cn(
          "aspect-square overflow-hidden rounded-lg border bg-white relative group transition-all duration-200",
          isSelected
            ? "ring-2 ring-primary border-primary"
            : "hover:border-gray-400",
          deleteMutation.isPending && imageToDelete?.id === img.id
            ? "opacity-50"
            : "",
        )}
        onClick={() => handleSelectImage(img.url)}
      >
        <div className="w-full h-full relative">
          <Image
            src={img.url}
            alt={img.name || "gallery image"}
            fill
            sizes="150px"
            className="cursor-pointer object-cover transition-transform duration-200 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {deleteMutation.isPending && imageToDelete?.id === img.id ? (
          <div className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full">
            <Loader2 size={16} className="animate-spin" />
          </div>
        ) : (
          <button
            onClick={(e) => handleOpenDeleteDialog(img, e)}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            title="Delete image"
          >
            <Trash2 size={16} />
          </button>
        )}

        {isSelected && (
          <div className="absolute bottom-0 left-0 right-0 bg-primary/80 text-primary-foreground text-xs py-1 text-center">
            Selected
          </div>
        )}
      </div>
    ),
    [
      handleSelectImage,
      handleOpenDeleteDialog,
      deleteMutation.isPending,
      imageToDelete?.id,
    ],
  );

  // Enhanced skeleton for better loading states
  const ImageSkeleton = () => (
    <div className="relative flex flex-col gap-2">
      <div className="aspect-square w-full bg-gray-100 rounded-lg animate-pulse overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <ImageIcon className="text-gray-300" size={24} />
        </div>
      </div>
      <div className="h-4 bg-gray-100 rounded animate-pulse w-2/3" />
    </div>
  );

  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent
          className="max-w-6xl w-full overflow-y-auto"
          style={{ maxWidth: "75vw" }}
        >
          <SheetHeader className="border-b pb-4 mb-4">
            <div className="flex justify-between items-center">
              <SheetTitle className="text-2xl">Media Gallery</SheetTitle>
              {selectedImages.length > 0 && (
                <Badge variant="secondary" className="px-3 py-1 text-sm">
                  {selectedImages.length} selected
                </Badge>
              )}
            </div>
          </SheetHeader>

          {/* Selected Preview */}
          {selectedImages.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-3 text-sm text-gray-600">
                Selected Media
              </h3>
              <div className="flex flex-wrap gap-3 bg-gray-50 p-3 rounded-lg border">
                {selectedImages.map((url) => (
                  <div
                    key={url}
                    className="relative group bg-white border rounded-lg shadow-sm overflow-hidden"
                  >
                    <div className="w-20 h-20 relative">
                      <Image
                        src={url}
                        alt="selected"
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <button
                      onClick={(e) => handleRemoveImage(url, e)}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove from selection"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Images - Gallery View */}
          <SheetDescription className="min-h-[400px]">
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <ImageSkeleton key={i} />
                ))}
              </div>
            ) : images.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {images.map((img) => {
                  const isSelected = selectedImages.includes(img.url);
                  return (
                    <div key={img.id}>
                      <ImageThumbnail img={img} isSelected={isSelected} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-gray-50 p-6 rounded-full mb-4">
                  <ImageIcon size={48} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No media found</h3>
                <p className="text-sm text-gray-500 max-w-sm">
                  Upload some images to get started.
                </p>
              </div>
            )}
          </SheetDescription>

          {/* Pagination */}
          {!isLoading && totalPages > 1 && (
            <div className="flex justify-center my-4 border-t pt-4">
              <CustomPagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          )}

          {/* Footer */}
          <SheetFooter className="pt-4 flex flex-wrap items-center justify-between gap-2 border-t mt-4">
            <div className="text-sm text-gray-500">
              {isLoading ? (
                <Skeleton className="w-24 h-4" />
              ) : (
                <>
                  {images.length} {images.length === 1 ? "item" : "items"}
                </>
              )}
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={deleteMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                onClick={handleOk}
                disabled={
                  mode === "single"
                    ? selectedImages.length !== 1
                    : selectedImages.length === 0 || deleteMutation.isPending
                }
              >
                {mode === "single"
                  ? "Select Image"
                  : `Select ${selectedImages.length || 0} Images`}
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>

        {/* Delete Confirmation Dialog */}
        {isDialogOpen && (
          <DeleteConfirmationDialog
            isOpen={isDialogOpen}
            isLoading={deleteMutation.isPending}
            onClose={handleCloseDeleteDialog}
            onConfirm={handleDeleteConfirm}
            itemName={imageToDelete?.name || "this media item"}
            actionType="Delete Media"
          />
        )}
      </Sheet>
    </>
  );
};

export default GlobalImageSelector;
