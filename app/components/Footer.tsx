import Image from "next/image";
import facebookIcon from "@/public/facebook.svg";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="container m-auto pt-5 pb-5 pl-5 pr-5">
      <div className="flex justify-center gap-3 md:gap-6">
        <div className="flex flex-col gap-1 mt-3">
          <h3 className="text-sm md:text-base">Dulafra foto corner</h3>
          <Link
            className="flex gap-2 text-sm md:text-base"
            href="https://www.facebook.com/profile.php?id=100095683080263"
            target="_blank"
          >
            Posjetite nas na{" "}
            <Image src={facebookIcon} width={20} alt="Facebook page" />
          </Link>
        </div>
        <div className="w-[2px] h-50px bg-black"></div>
        <div className="flex flex-col gap-1">
          <span className="text-sm md:text-base">
            Zagreb - Hrvatska - 10020
          </span>
          <a
            className="text-sm md:text-base"
            href="mailto:dulafra2705@gmail.com"
          >
            dulafra2705@gmail.com
          </a>
          <a className="text-sm md:text-base" href="tel:+385996919153">
            +385 99 691 9153
          </a>
        </div>
      </div>
    </div>
  );
}
