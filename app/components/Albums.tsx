"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface ImageData {
  url: string;
  folder?: string;
}

export default function Albums() {
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

  /* const filteredImages = images.filter((image) => image.folder === folderProp); */

  return (
    <div className="container m-auto pt-20 pb-20 pl-5 pr-5 transform transition-transform duration-2000 ease-in">
      <h1 className="text-center text-3xl uppercase font-bold text-[#001120] mb-5">
        Albumi
      </h1>
      <div className="flex justify-center">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 text-center">
          {isLoading ? (
            <div className="col-span-full flex h-64 items-center justify-center ">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#001120] border-t-transparent"></div>
            </div>
          ) : (
            images?.map((image) => (
              <div key={image.url}>
                <Image
                  src={image.url}
                  width={400}
                  height={500}
                  style={{ width: "100%" }}
                  placeholder="blur"
                  blurDataURL={image.url}
                  alt="This image has been deleted"
                  className="shadow-[8px_8px_0px_-2px_rgba(0,17,32,1)] rounded-lg hover:shadow-none transition-all hover:cursor-pointer"
                />
                <h3 className="mt-4">{image.folder?.split("_")[3]}</h3>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
