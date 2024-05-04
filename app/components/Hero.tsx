import React from "react";

import Image from "next/image";
import heroImg from "@/public/hero_img.jpg";

export default function Hero() {
  return (
    <div className="relative min-h-max">
      <div>
        <Image
          src={heroImg}
          alt="Dulafra hero image"
          style={{ width: "100%" }}
        />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <div className="bg-[#00112060] rounded-xl pt-6 pb-6 pl-16 pr-16">
          <div>
            <h1 className="text-4xl font-bold text-[#FFF6EE] text-center">
              Profesionalno fotografiranje <br /> sportskih trenutaka
            </h1>
          </div>
          <div className="mt-14">
            <h3 className="text-[#FFF6EE] text-lg">
              Naš tim profesionalnih fotografa pobrinuti će sa da svaki Vaš
              sportski trenutak ostane zabilježen
            </h3>
          </div>
          <div className="flex justify-center gap-10 mt-10">
            <div>
              <button className="bg-[#FFF6EE] text-[#333333] pt-2 pb-2 pl-4 pr-4 rounded-lg transition-all hover:bg-[#333333] hover:text-[#FFF6EE]">
                Galerija albuma
              </button>
            </div>
            <div>
              <button className="bg-[#FFF6EE] text-[#333333] pt-2 pb-2 pl-4 pr-4 rounded-lg transition-all hover:bg-[#333333] hover:text-[#FFF6EE]">
                Kontaktirajte nas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
