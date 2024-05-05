import Image from "next/image";
import album1 from "@/public/album1.png";

export default function Albums() {
  return (
    <div className="container m-auto pt-20 pb-20 pl-5 pr-5" id="albums">
      <h1 className="text-center text-3xl uppercase font-bold text-[#001120] mb-5">
        Albumi
      </h1>
      <div>
        datum - vrijeme - teren - klub
      </div>
      <div className="flex justify-center">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 text-center">
          <div>
            <Image
              className="shadow-[8px_8px_0px_-2px_rgba(0,17,32,1)] rounded-lg hover:shadow-none transition-all hover:cursor-pointer"
              src={album1}
              placeholder="blur"
              alt="album1"
            />
            <h3 className="mt-4">nk Lokomotiva - u13</h3>
          </div>
          <div>
            <Image
              className="shadow-[8px_8px_0px_-2px_rgba(0,17,32,1)] rounded-lg hover:shadow-none transition-all hover:cursor-pointer"
              src={album1}
              placeholder="blur"
              alt="album1"
            />
            <h3 className="mt-4">nk Lokomotiva - u13</h3>
          </div>
          <div>
            <Image
              className="shadow-[8px_8px_0px_-2px_rgba(0,17,32,1)] rounded-lg hover:shadow-none transition-all hover:cursor-pointer"
              src={album1}
              placeholder="blur"
              alt="album1"
            />
            <h3 className="mt-4">nk Lokomotiva - u13</h3>
          </div>
          <div>
            <Image
              className="shadow-[8px_8px_0px_-2px_rgba(0,17,32,1)] rounded-lg hover:shadow-none transition-all hover:cursor-pointer"
              src={album1}
              placeholder="blur"
              alt="album1"
            />
            <h3 className="mt-4">nk Lokomotiva - u13</h3>
          </div>
          <div>
            <Image
              className="shadow-[8px_8px_0px_-2px_rgba(0,17,32,1)] rounded-lg hover:shadow-none transition-all hover:cursor-pointer"
              src={album1}
              placeholder="blur"
              alt="album1"
            />
            <h3 className="mt-4">nk Lokomotiva - u13</h3>
          </div>
          <div>
            <Image
              className="shadow-[8px_8px_0px_-2px_rgba(0,17,32,1)] rounded-lg hover:shadow-none transition-all hover:cursor-pointer"
              src={album1}
              placeholder="blur"
              alt="album1"
            />
            <h3 className="mt-4">nk Lokomotiva - u13</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
