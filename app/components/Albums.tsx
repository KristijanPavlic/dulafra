import Image from "next/image";
import album1 from "@/public/album1.png";

export default function Albums() {
  return (
    <div className="container m-auto pt-20 pb-20 pl-5 pr-5">
      <h1 className="text-center text-3xl uppercase font-bold text-[#001120] mb-5">
        Albumi
      </h1>
      <div>
        <div className="grid grid-cols-3 gap-10">
          <div>
            <Image
              className="shadow-[12px_12px_0px_-2px_rgba(0,17,32,1)] rounded-lg hover:shadow-none transition-all hover:cursor-pointer"
              src={album1}
              placeholder="blur"
              alt="album1"
            />
          </div>
          <div>
            <Image
              className="shadow-[12px_12px_0px_-2px_rgba(0,17,32,1)] rounded-lg hover:shadow-none transition-all hover:cursor-pointer"
              src={album1}
              placeholder="blur"
              alt="album1"
            />
          </div>
          <div>
            <Image
              className="shadow-[12px_12px_0px_-2px_rgba(0,17,32,1)] rounded-lg hover:shadow-none transition-all hover:cursor-pointer"
              src={album1}
              placeholder="blur"
              alt="album1"
            />
          </div>
          <div>
            <Image
              className="shadow-[12px_12px_0px_-2px_rgba(0,17,32,1)] rounded-lg hover:shadow-none transition-all hover:cursor-pointer"
              src={album1}
              placeholder="blur"
              alt="album1"
            />
          </div>
          <div>
            <Image
              className="shadow-[12px_12px_0px_-2px_rgba(0,17,32,1)] rounded-lg hover:shadow-none transition-all hover:cursor-pointer"
              src={album1}
              placeholder="blur"
              alt="album1"
            />
          </div>
          <div>
            <Image
              className="shadow-[12px_12px_0px_-2px_rgba(0,17,32,1)] rounded-lg hover:shadow-none transition-all hover:cursor-pointer"
              src={album1}
              placeholder="blur"
              alt="album1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
