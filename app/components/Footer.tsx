"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isAnimated) {
          setIsAnimated(true);
        }
      },
      { threshold: 0.5 } // Adjust threshold as needed
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, [isAnimated]);

  return (
    <div
      ref={footerRef}
      className={`container m-auto pt-5 pb-5 pl-5 pr-5 transform transition-transform duration-2000 ease-in delay-100 ${
        isAnimated ? "translate-x-0 opacity-100" : "-translate-x-60 opacity-0"
      }`}
    >
      <div className="flex justify-center gap-3 md:gap-6 md:pl-12">
        <div className="flex flex-col gap-1 mt-3">
          <h3 className="text-sm md:text-base">Dulafra foto corner</h3>
          <a
            className="flex gap-2 text-sm md:text-base"
            href="https://www.facebook.com/profile.php?id=100095683080263"
            target="_blank"
            rel="noopener"
          >
            Posjetite nas na{" "}
            <Image
              src="/facebook.svg"
              width={20}
              height={20}
              alt="Facebook page"
            />
          </a>
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
      <h4 className="text-sm mt-6 text-center">
        *Sve fotografije na stranici zaštićene su vodenim žigom te je svako
        njihovo korištenje bez dozvole strogo zabranjeno.
      </h4>
    </div>
  );
}
