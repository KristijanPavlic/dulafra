"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

interface ImageData {
  url: string;
  folder?: string;
}

interface SearchedAlbumProps {
  date: string;
  time: string;
  field: string;
  team: string;
}

const SearchedAlbum: React.FC<SearchedAlbumProps> = ({
  date,
  time,
  field,
  team,
}) => {
  const { user } = useUser();

  const searchId = `${date}_${time}_${field}_${team}`;

  const [images, setImages] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchImages = async () => {
    const response = await fetch(`/api/cloudinary?t=${Date.now()}`, {
      cache: "reload",
    });
    setIsLoading(true);

    if (response.ok) {
      const data = await response.json();
      setImages(data);
      setIsLoading(false);
    } else {
      console.error("Error fetching images:", response.status);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const filteredImages = images.filter((image) => image.folder === searchId);

  const deleteImage = async (url: string) => {
    try {
      const publicId = url.split("/")[8].split(".")[0];
      const folder = searchId;

      const response = await fetch(`/api/delete-image`, {
        method: "POST",
        cache: "reload",
        body: JSON.stringify({ publicId, folder }),
      });

      if (response.ok) {
        setImages(images.filter((image) => image.url !== url));
      } else {
        console.error("Error deleting image:", response.status);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="container m-auto pt-10 pl-5 pr-5 transform transition-transform duration-2000 ease-in">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 text-center">
        {isLoading ? (
          <div className="col-span-full flex h-64 items-center justify-center ">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#001120] border-t-transparent"></div>
          </div>
        ) : (
          filteredImages?.map((image) => (
            <div key={image.url} className="relative">
              <Image
                src={image.url}
                width={400}
                height={300}
                style={{ width: "100%", height: "100%" }}
                placeholder="blur"
                blurDataURL={image.url}
                alt="This image has been deleted"
                className="shadow-[8px_8px_0px_-2px_rgba(0,17,32,1)] rounded-lg hover:shadow-none transition-all hover:cursor-pointer bg-cover"
              />
              {user?.id === process.env.NEXT_PUBLIC_ADMIN_KEY && (
                <div
                  className="absolute left-0 top-0 flex h-full w-full items-center 
                  justify-center bg-black/50 opacity-0 transition-opacity 
                  duration-300 ease-in-out hover:opacity-100 rounded-lg"
                >
                  <button
                    onClick={() => deleteImage(image.url)}
                    className="rounded bg-red-500 px-4 py-2 text-white"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchedAlbum;
