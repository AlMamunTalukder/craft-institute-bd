import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, ImageIcon } from "lucide-react";

type ImageInputProps = {
  title: string;
  imageUrls: string | string[] | null;
  setImageUrls: any;
  mode: "single" | "multiple";
  maxImages?: number;
};

export default function ImageInput({
  title,
  imageUrls,
  setImageUrls,
  mode,
  maxImages = 5,
}: ImageInputProps) {
  const [selectorOpen, setSelectorOpen] = useState(false);

  const handleImageSelection = (selectedImages: string | string[]) => {
    setImageUrls(selectedImages);
    setSelectorOpen(false);
  };

  const removeImage = (imageToRemove: string) => {
    if (mode === "single") {
      setImageUrls("");
    } else {
      setImageUrls(
        (imageUrls as string[]).filter((img) => img !== imageToRemove),
      );
    }
  };

  const renderImages = () => {
    const images = Array.isArray(imageUrls) ? imageUrls : [imageUrls];
    const imagesToRender = images.filter(Boolean);

    if (imagesToRender.length === 0 && mode === "single") {
      return renderPlaceholder();
    }

    return imagesToRender.map((url, index) => (
      <div
        key={index}
        className="relative group w-24 h-24 border rounded-md overflow-hidden"
      >
        <Image
          alt={`${title} ${index + 1}`}
          className="object-cover"
          src={url || "/placeholder.svg"}
          layout="fill"
        />
        <button
          onClick={() => removeImage(url as string)}
          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X size={12} />
        </button>
      </div>
    ));
  };

  const renderPlaceholder = () => (
    <div className="w-24 h-24 border rounded-md flex items-center justify-center bg-gray-100">
      <ImageIcon size={32} className="text-gray-400" />
    </div>
  );

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div
            className={`flex flex-wrap gap-2 ${
              mode === "single" ? "" : "justify-start"
            }`}
          >
            {renderImages()}
            {mode === "multiple" &&
              Array.isArray(imageUrls) &&
              imageUrls.length < maxImages &&
              renderPlaceholder()}
          </div>
          {((mode === "multiple" &&
            (!Array.isArray(imageUrls) || imageUrls.length < maxImages)) ||
            mode === "single") && (
            <Button
              type="button"
              onClick={() => setSelectorOpen(true)}
              className="w-full"
            >
              {mode === "multiple" &&
              Array.isArray(imageUrls) &&
              imageUrls.filter(Boolean).length > 0
                ? "Add More Images"
                : `${mode === "single" ? "Select Image" : "Select Images"}`}
            </Button>
          )}
        </div>
      </CardContent>
      {/* <GlobalImageSelector
        open={selectorOpen}
        onClose={() => setSelectorOpen(false)}
        mode={mode}
        selectedImage={imageUrls as string | string[]}
        setSelectedImage={handleImageSelection}
      /> */}
    </Card>
  );
}
