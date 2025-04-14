"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getFolderBySlug } from "@/queries/gallery/folder";
import ImageGrid from "@/components/dashboard/Gallery/ImageGrid";
import CustomPagination from "@/components/shared/CustomPagination";

const IMAGES_PER_PAGE = 20;

const Page = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const [page, setPage] = useState(1);

  const {
    data: folder,
    isLoading,
    isFetching,
  } = useQuery({
    queryFn: () => getFolderBySlug(slug, page, IMAGES_PER_PAGE),
    queryKey: ["folders", slug, page],
    enabled: !!slug,
    staleTime: 60000,
  });

  const images = folder?.images || [];
  const totalPages = folder?.totalPages || 1;

  return (
    <div>
      <div className="mt-6">
        <ImageGrid
          images={images}
          isLoading={isLoading}
          isFetching={isFetching}
          invalidateQueryKey={["folders", slug]}
        />

        {totalPages > 1 && (
          <CustomPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage: number) => setPage(newPage)}
            className="mt-6"
          />
        )}
      </div>
    </div>
  );
};

export default Page;
