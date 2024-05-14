"use client";

import React, { useRef, useEffect, useState } from "react";
import SearchedAlbum from "./SearchedAlbum";

interface ImageData {
  url: string;
  folder?: string;
}

export default function Search() {
  const [date, setDate] = useState("Odaberite");
  const [time, setTime] = useState("Odaberite");
  const [field, setField] = useState("Odaberite");
  const [team, setTeam] = useState("Odaberite");
  const [isSearched, setIsSearched] = useState(false);
  const [infoText, setInfoText] = useState("");

  const searchRef = useRef<HTMLDivElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  const [images, setImages] = useState<ImageData[]>([]);

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

  const fetchImages = async () => {
    const response = await fetch(`/api/cloudinary?t=${Date.now()}`, {
      cache: "reload",
    });

    if (response.ok) {
      const data = await response.json();
      setImages(data);
    } else {
      console.error("Error fetching images:", response.status);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const uniqueOptions = (folderIdIndex: number) => {
    const values = images.map(
      (image) => image.folder?.split("_")[folderIdIndex]
    );
    return values.filter((value, index) => values.indexOf(value) === index);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      date === "Odaberite" ||
      time === "Odaberite" ||
      field === "Odaberite" ||
      team === "Odaberite"
    ) {
      setIsSearched(false);
      // Notify the user if not all options are selected
      setInfoText("Potrebno je odaberati sva polja za pretraživanje slika.");
    } else {
      setIsSearched(true);
      setInfoText("");
    }
  };

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
        <form
          className="grid xl:grid-cols-5 xl:gap-6 md:grid-cols-3 md:gap-4 grid-cols-2 gap-3"
          onSubmit={handleSearch}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="date" className="text-[#333333]">
              Datum
            </label>
            <select
              id="date"
              name="date"
              title="Odaberite datum"
              required
              className="p-3 rounded-lg outline-[#001120]"
              onChange={(e) => setDate(e.target.value)}
            >
              <option>Odaberite datum</option>
              {uniqueOptions(0).map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="time" className="text-[#333333]">
              Vrijeme
            </label>
            <select
              id="time"
              name="time"
              title="Odaberite vrijeme"
              required
              className="p-3 rounded-lg outline-[#001120]"
              onChange={(e) => setTime(e.target.value)}
            >
              <option>Odaberite vrijeme</option>
              {uniqueOptions(1).map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
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
              onChange={(e) => setField(e.target.value)}
            >
              <option>Odaberite teren</option>
              {uniqueOptions(2).map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
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
              onChange={(e) => setTeam(e.target.value)}
            >
              <option>Odabertie ekipu</option>
              {uniqueOptions(3).map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
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
      {isSearched && (
        <div className="mt-8">
          <SearchedAlbum date={date} time={time} field={field} team={team} />
        </div>
      )}
      <h4 id="infoSearch" className="mt-4 text-center">
        {infoText}
      </h4>
    </div>
  );
}
