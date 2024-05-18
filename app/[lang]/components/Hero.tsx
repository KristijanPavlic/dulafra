"use client";

import React, { useRef, useEffect, useState } from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import Image from "next/image";
import heroImg from "@/public/hero_img.jpg";
import heroMobImg from "@/public/hero_mobile_img.jpg";
import Link from "next/link";

interface HeroProps {
  title: string
  description: string
  btnSearch: string
  btnContact: string
}

const Hero: React.FC<HeroProps> = ({title, description, btnSearch, btnContact}) => {
  const size = useWindowSize();
  const heroRef = useRef<HTMLDivElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isAnimated) {
          setIsAnimated(true);
        }
      },
      { threshold: 0 } // Adjust threshold as needed
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, [isAnimated]);

  return (
    <div
      ref={heroRef}
      className={`relative min-h-max duration-1000 ${isAnimated ? "opacity-100" : "opacity-0"}`}
    >
      <div>
        {size.width >= 768 ? (
          <Image
            src={heroImg}
            alt="Dulafra hero image"
            style={{ width: "100%" }}
            className="min-h-[100svh] object-cover bg-center transition-opacity"
          />
        ) : (
          <Image
            src={heroMobImg}
            alt="Dulafra hero mobile image"
            style={{ width: "100%", height: "100svh" }}
            className="object-cover bg-center transition-opacity"
          />
        )}
      </div>
      <div
        className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 min-w-[80%] xl:min-w-[50%]`}
      >
        <div className="bg-[#00112060] rounded-xl pt-6 pb-6 pl-8 pr-8 md:pl-16 md:pr-16">
          <div>
            <h1
              className={`text-2xl md:text-5xl font-bold text-[#FFF6EE] text-center`}
            >
              {title}
            </h1>
          </div>
          <div className="mt-7 lg:mt-14">
            <h3 className="text-[#FFF6EE] text-base text-center md:text-lg">
              {description}
            </h3>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-10">
            <div>
              <Link
                className="bg-[#FFF6EE] text-[#333333] flex justify-center align-middle min-w-36 pt-2 pb-2 pl-4 pr-4 rounded-lg transition-all hover:bg-[#333333] hover:text-[#FFF6EE]"
                href="#search"
              >
                {btnSearch}
              </Link>
            </div>
            <div>
              <Link
                className="bg-[#FFF6EE] text-[#333333] flex justify-center align-middle min-w-36 pt-2 pb-2 pl-4 pr-4 rounded-lg transition-all hover:bg-[#333333] hover:text-[#FFF6EE]"
                href="#contact"
              >
                {btnContact}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero