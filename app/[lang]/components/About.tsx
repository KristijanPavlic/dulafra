"use client";

import React, { useRef, useEffect, useState } from "react";

interface AboutProps {
  title: string;
  description: string;
  years: string;
  professional: string;
  events: string;
}

const About:React.FC<AboutProps> = ({title, description, years, professional, events}) => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isAnimated) {
          setIsAnimated(true);
        }
      },
      { threshold: 0.1 } // Adjust threshold as needed
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, [isAnimated]);

  return (
    <div
      ref={aboutRef}
      className={`container m-auto pt-20 pb-20 pl-5 pr-5 transform transition-transform duration-2500 ease-in ${
        isAnimated ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      }`}
    >
      <h1 className="text-center text-3xl uppercase font-bold text-[#001120] mb-5">
        {title}
      </h1>
      <div>
        <p className="text-center text-[#333333] text-lg">
          {description}
        </p>
      </div>
      <div className="mt-10">
        <div className="flex flex-col md:flex-row justify-center border border-black w-fit m-auto p-4 rounded-lg gap-8">
          <div className="text-center min-w-[192px]">
            <h2 className="font-semibold text-[#001120] text-lg">12+</h2>
            <span className="text-[#333333]">{years}</span>
          </div>
          <div className="w-full h-[1px] md:w-[1px] md:h-[50px] bg-black"></div>
          <div className="text-center min-w-[192px]">
            <h2 className="font-semibold text-[#001120] text-lg">5+</h2>
            <span className="text-[#333333]">{professional}</span>
          </div>
          <div className="w-full h-[1px] md:w-[1px] md:h-[50px] bg-black"></div>
          <div className="text-center min-w-[192px]">
            <h2 className="font-semibold text-[#001120] text-lg">40+</h2>
            <span className="text-[#333333]">{events}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
