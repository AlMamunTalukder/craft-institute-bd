import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { db } from "@/prisma/db";

export const config = {
  api: {
    bodyParser: false, // disable body parser since we'll manually handle FormData
  },
};

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const folder = formData.get("folder") as string;
    const images = formData.getAll("images") as File[];

    if (!folder)
      return NextResponse.json({
        success: false,
        message: "Folder not provided.",
      });
    if (!images.length)
      return NextResponse.json({
        success: false,
        message: "Images not provided.",
      });

    const isFolderExist = await db.folder.findUnique({ where: { id: folder } });
    if (!isFolderExist)
      return NextResponse.json({
        success: false,
        message: "Folder not found.",
      });

    let uploadResults: any[] = [];

    await Promise.all(
      images.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        const base64Data = buffer.toString("base64");
        const fileUri = `data:${file.type};base64,${base64Data}`;

        const uploadResult = await cloudinary.uploader.upload(fileUri, {
          folder: folder,
          public_id: file.name,
        });

        uploadResults.push(uploadResult);
      }),
    );
    const imageRecords = uploadResults.map((img) => ({
      folderId: folder,
      publicId: img.public_id,
      name: img.display_name,
      url: img.secure_url,
    }));

    if (imageRecords.length > 0) {
      await db.image.createMany({ data: imageRecords });
    }

    return NextResponse.json({
      success: true,
      message: "Images uploaded and saved successfully.",
      data: uploadResults,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
