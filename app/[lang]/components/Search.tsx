"use client";

import React, { useRef, useEffect, useState } from "react";
import SearchedAlbum from "./SearchedAlbum";

interface ImageData {
  url: string;
  folder?: string;
}

interface SearchProps {
  title: string
  description: string
  labelDate: string
  chooseDate: string
  labelTime: string
  chooseTime: string
  labelField: string
  chooseField: string
  labelTeam: string
  chooseTeam: string
  btnSearchImages: string
  warning: string
}

const Search:React.FC<SearchProps> = ({title, description, labelDate, chooseDate, labelTime, chooseTime, labelField, chooseField, labelTeam, chooseTeam, btnSearchImages, warning}) => {
  const [date, setDate] = useState(chooseDate);
  const [time, setTime] = useState(chooseTime);
  const [field, setField] = useState(chooseField);
  const [team, setTeam] = useState(chooseTeam);
  const [timeOptions, setTimeOptions] = useState<string[]>([]);
  const [fieldOptions, setFieldOptions] = useState<string[]>([]);
  const [teamOptions, setTeamOptions] = useState<string[]>([]);
  const [isSearched, setIsSearched] = useState(false);
  const [infoText, setInfoText] = useState("");
  const [images, setImages] = useState<ImageData[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isAnimated) {
          setIsAnimated(true);
        }
      },
      { threshold: 0.2 }
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

  useEffect(() => {
    if (date !== chooseDate) {
      const timeOptions = images
        .filter((image) => image.folder?.includes(date))
        .map((image) => image.folder?.split("_")[1])
        .filter((option): option is string => option !== undefined);
      setTimeOptions(Array.from(new Set(timeOptions)));

      const fieldOptions = images
        .filter((image) => image.folder?.includes(date))
        .map((image) => image.folder?.split("_")[2])
        .filter((option): option is string => option !== undefined);
      setFieldOptions(Array.from(new Set(fieldOptions)));

      const teamOptions = images
        .filter((image) => image.folder?.includes(date))
        .map((image) => image.folder?.split("_")[3])
        .filter((option): option is string => option !== undefined);
      setTeamOptions(Array.from(new Set(teamOptions)));
    } else {
      setTimeOptions([]);
      setFieldOptions([]);
      setTeamOptions([]);
    }
  }, [date, chooseDate, images]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      date === chooseDate ||
      time === chooseTime ||
      field === chooseField ||
      team === chooseTeam
    ) {
      setIsSearched(false);
      setInfoText(warning);
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
        {title}
      </h1>
      <div>
        <p className="text-center text-[#333333] text-lg mb-5 md:max-w-[50%] max-w-full m-auto">
          {description}
        </p>
      </div>
      <div className="flex justify-center">
        <form
          className="grid xl:grid-cols-5 xl:gap-6 md:grid-cols-3 md:gap-4 grid-cols-2 gap-3 text-[#333333]"
          onSubmit={handleSearch}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="date" className="text-[#333333]">
              {labelDate}
            </label>
            <select
              id="date"
              name="date"
              title={chooseDate}
              required
              className="p-3 rounded-lg outline-[#001120]"
              onChange={(e) => {
                setDate(e.target.value);
                setTime(chooseDate);
                setField(chooseField);
                setTeam(chooseTeam);
              }}
              value={date}
            >
              <option>{chooseDate}</option>
              {Array.from(
                new Set(images.map((image) => image.folder?.split("_")[0]))
              ).map((uniqueDate, index) => (
                <option key={index} value={uniqueDate}>
                  {uniqueDate}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="time" className="text-[#333333]">
              {labelTime}
            </label>
            <select
              id="time"
              name="time"
              title={chooseTime}
              required
              className="p-3 rounded-lg outline-[#001120]"
              onChange={(e) => setTime(e.target.value)}
              value={time}
            >
              <option>{chooseTime}</option>
              {timeOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="field" className="text-[#333333]">
              {labelField}
            </label>
            <select
              name="field"
              id="field"
              title={chooseField}
              required
              className="p-3 rounded-lg outline-[#001120]"
              onChange={(e) => setField(e.target.value)}
              value={field}
            >
              <option>{chooseField}</option>
              {fieldOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="team" className="text-[#333333]">
              {labelTeam}
            </label>
            <select
              name="team"
              id="team"
              title={chooseTeam}
              required
              className="p-3 rounded-lg outline-[#001120]"
              onChange={(e) => setTeam(e.target.value)}
              value={team}
            >
              <option>{chooseTeam}</option>
              {teamOptions.map((option, index) => (
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
            {btnSearchImages}
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

export default Search