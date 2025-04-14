"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import GlobalImageSelector from "@/components/dashboard/GlobalImageSelector";

export default function ImagePickerPage() {
  const [selectedImage, setSelectedImage] = useState("");
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Image Picker Example</h1>

      {selectedImage ? (
        <div className="mb-4 border p-4 rounded">
          <h2 className="font-medium mb-2">Selected Image:</h2>
          <div className="w-40 h-40 relative">
            <img
              src={selectedImage}
              alt="Selected"
              className="object-cover rounded"
            />
          </div>
        </div>
      ) : (
        <p className="text-gray-500 mb-4">No image selected</p>
      )}

      <Button onClick={() => setIsSelectorOpen(true)}>Select Image</Button>

      <GlobalImageSelector
        open={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        mode="single"
      />
    </div>
  );
}
