"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import album1 from "@/public/album1.png";

export default function Albums() {
  const albumsRef = useRef<HTMLDivElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  const test = [1, 2, 3, 4, 5, 6];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isAnimated) {
          setIsAnimated(true);
        }
      },
      { threshold: 0.5 } // Adjust threshold as needed
    );

    if (albumsRef.current) {
      observer.observe(albumsRef.current);
    }

    return () => {
      if (albumsRef.current) {
        observer.unobserve(albumsRef.current);
      }
    };
  }, [isAnimated]);

  return (
    <div
      ref={albumsRef}
      className={`container m-auto pt-20 pb-20 pl-5 pr-5 transform transition-transform duration-2000 ease-in ${
        isAnimated ? "translate-y-0 opacity-100" : "translate-y-36 opacity-0"
      }`}
    >
      <h1 className="text-center text-3xl uppercase font-bold text-[#001120] mb-5">
        Albumi
      </h1>
      <div className="flex justify-center">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 text-center">
          {test.map((test) => (
            <div key={test}>
              <Image
                className="shadow-[8px_8px_0px_-2px_rgba(0,17,32,1)] rounded-lg hover:shadow-none transition-all hover:cursor-pointer"
                src={album1}
                placeholder="blur"
                alt="album1"
              />
              <h3 className="mt-4">nk Lokomotiva - u13</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
