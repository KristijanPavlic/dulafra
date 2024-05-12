"use client";

import React, { useRef, useEffect, useState } from "react";

export default function Search() {
  const searchRef = useRef<HTMLDivElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isAnimated) {
          setIsAnimated(true);
        }
      },
      { threshold: 0.2 } // Adjust threshold as needed
    );

    if (searchRef.current) {
      observer.observe(searchRef.current);
    }

    return () => {
      if (searchRef.current) {
        observer.unobserve(searchRef.current);
      }
    };
  }, [isAnimated]);

  return (
    <div
      ref={searchRef}
      className={`container m-auto pt-20 pb-20 pl-5 pr-5 transform transition-transform duration-2000 ease-in delay-100 ${
        isAnimated ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
      }`}
      id="search"
    >
      <h1 className="text-center text-3xl uppercase font-bold text-[#001120] mb-5">
        Pretraživanje slika
      </h1>
      <div>
        <p className="text-center text-[#333333] text-lg mb-5 max-w-[70%] m-auto">
          Ovdje imate opciju pregledati odabrane fotografije. Potrebno je samo
          da uneste tražene podatke te ako iste postoje prikazti će Vam se
          odabrene fotografije.
        </p>
      </div>
      <div className="flex justify-center">
        <form className="grid xl:grid-cols-5 xl:gap-6 md:grid-cols-3 md:gap-4 grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="date" className="text-[#333333]">
              Datum
            </label>
            <input
              type="date"
              id="date"
              name="date"
              title="Odaberite datum"
              required
              className="p-3 rounded-lg outline-[#001120]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="time" className="text-[#333333]">
              Vrijeme
            </label>
            <input
              type="time"
              id="time"
              name="time"
              title="Odaberite vrijeme"
              required
              className="p-3 rounded-lg outline-[#001120]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="field" className="text-[#333333]">
              Teren
            </label>
            <select
              name="field"
              id="field"
              title="Odaberite teren"
              required
              className="p-3 rounded-lg outline-[#001120]"
            >
              <option>5A</option>
              <option>7B</option>
              <option>4A</option>
              <option>6A</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="team" className="text-[#333333]">
              Ekipa
            </label>
            <select
              name="team"
              id="team"
              title="Odaberite ekipu"
              required
              className="p-3 rounded-lg outline-[#001120]"
            >
              <option>nk Lokomotiva</option>
              <option>nk Rudeš</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-[#333333] text-[#FFF6EE] p-3 mt-8 w-fit h-fit rounded-lg transition-all hover:bg-[#001120] hover:text-[#FFF6EE]"
          >
            Pretraži fotografije
          </button>
        </form>
      </div>
    </div>
  );
}
