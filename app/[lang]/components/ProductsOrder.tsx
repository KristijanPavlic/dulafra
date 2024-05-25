"use client";

import React, { useState, useEffect } from "react";
import OrderForm from "./OrderForm";

interface ImageData {
  url: string;
  folder?: string;
}

interface ProductsOrderProps {
  title: string;
  labelProduct: string;
  chooseProduct: string;
  addProduct: string;
  removeProduct: string;
  chooseImage: string;
  labelImage: string;
  btnOrder: string;
  btnOrdering: string;
  labelEvent: string;
  chooseEvent: string;
  labelDate: string;
  chooseDate: string;
  labelTime: string;
  chooseTime: string;
  labelField: string;
  chooseField: string;
  labelTeam: string;
  chooseTeam: string;
  warning: string;
  photo: string;
  poster: string;
  fifaCard: string;
  mug: string;
  addedItemsLabel: string;
  labelName: string;
  labelEmail: string;
  labelMessage: string;
  success: string;
  error: string;
}

const ProductsOrder: React.FC<ProductsOrderProps> = ({
  title,
  labelProduct,
  chooseProduct,
  addProduct,
  removeProduct,
  chooseImage,
  labelImage,
  btnOrder,
  btnOrdering,
  labelEvent,
  chooseEvent,
  labelDate,
  chooseDate,
  labelTime,
  chooseTime,
  labelField,
  chooseField,
  labelTeam,
  chooseTeam,
  warning,
  photo,
  mug,
  poster,
  fifaCard,
  addedItemsLabel,labelName, labelEmail, labelMessage, success, error
}) => {
  const [event, setEvent] = useState(chooseEvent);
  const [date, setDate] = useState(chooseDate);
  const [time, setTime] = useState(chooseTime);
  const [field, setField] = useState(chooseField);
  const [team, setTeam] = useState(chooseTeam);
  const [image, setImage] = useState(chooseImage);
  const [product, setProduct] = useState(chooseProduct); // New state for selected product
  const [images, setImages] = useState<ImageData[]>([]);
  const [dateOptions, setDateOptions] = useState<string[]>([]);
  const [timeOptions, setTimeOptions] = useState<string[]>([]);
  const [fieldOptions, setFieldOptions] = useState<string[]>([]);
  const [teamOptions, setTeamOptions] = useState<string[]>([]);
  const [imageOptions, setImageOptions] = useState<string[]>([]);
  const [isSearched, setIsSearched] = useState(false);
  const [infoText, setInfoText] = useState("");
  const [addedItems, setAddedItems] = useState<{ item: string; quantity: number }[]>([]);

  const [isOrdering, setIsOrdering] = useState(false); // State to track if ordering form is displayed
  const [email, setEmail] = useState(""); // State to track email input value

  const fetchImages = async () => {
    const response = await fetch(`/api/cloudinary?t=${Date.now()}`, {
      cache: "reload",
    });

    if (response.ok) {
      const data = await response.json();
      // Filter out images from the "upcoming_events" folder
      const filteredData = data.filter(
        (image: ImageData) => image.folder !== "upcoming_events"
      );
      console.log("Filtered images:", filteredData);

      setImages(filteredData);
    } else {
      console.error("Error fetching images:", response.status);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (event !== chooseEvent) {
      const filteredImages = images.filter((image) =>
        image.folder?.includes(event)
      );

      const dateOptions = filteredImages
        .map((image) => image.folder?.split("~")[1])
        .filter((option): option is string => option !== undefined);
      setDateOptions(Array.from(new Set(dateOptions)));

      const timeOptions = filteredImages
        .filter(
          (image) => image.folder?.includes(event) && image.folder?.includes(date)
        )
        .map((image) => image.folder?.split("~")[2])
        .filter((option): option is string => option !== undefined);
      setTimeOptions(Array.from(new Set(timeOptions)));

      const fieldOptions = filteredImages
        .filter(
          (image) =>
            image.folder?.includes(event) &&
            image.folder?.includes(date) &&
            image.folder?.includes(time)
        )
        .map((image) => image.folder?.split("~")[3])
        .filter((option): option is string => option !== undefined);
      setFieldOptions(Array.from(new Set(fieldOptions)));

      const teamOptions = filteredImages
        .filter(
          (image) =>
            image.folder?.includes(event) &&
            image.folder?.includes(date) &&
            image.folder?.includes(time) &&
            image.folder?.includes(field)
        )
        .map((image) => image.folder?.split("~")[4])
        .filter((option): option is string => option !== undefined);
      setTeamOptions(Array.from(new Set(teamOptions)));

      const imageOptions = filteredImages
        .filter(
          (image) =>
            image.folder?.includes(event) &&
            image.folder?.includes(date) &&
            image.folder?.includes(time) &&
            image.folder?.includes(field)
        )
        .map((image) => {
          const fileName = image.url.split("/").pop();
          return fileName ? fileName.split(".")[0] : undefined;
        })
        .filter((option): option is string => option !== undefined);

      setImageOptions(Array.from(new Set(imageOptions)));
    } else {
      setDateOptions([]);
      setTimeOptions([]);
      setFieldOptions([]);
      setTeamOptions([]);
      setImageOptions([]);
    }
  }, [event, date, time, field, images, chooseEvent]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      event === chooseEvent ||
      date === chooseDate ||
      time === chooseTime ||
      field === chooseField ||
      team === chooseTeam ||
      image === chooseImage ||
      product === chooseProduct // Check if the product is selected
    ) {
      setIsSearched(false);
      setInfoText(warning);
    } else {
      setIsSearched(true);
      setInfoText("");

      const selectedItem = `${labelProduct}: ${product}, ${labelEvent}: ${event}, ${labelDate}: ${date}, ${labelTime}: ${time}, ${labelField}: ${field}, ${labelTeam}: ${team}, ${labelImage}: ${image}`;
      setAddedItems([...addedItems, { item: selectedItem, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (index: number, delta: number) => {
    const updatedItems = addedItems.map((item, idx) => {
      if (idx === index) {
        return { ...item, quantity: item.quantity + delta };
      }
      return item;
    }).filter(item => item.quantity > 0); // Remove items with quantity <= 0
    setAddedItems(updatedItems);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = addedItems.filter((_, idx) => idx !== index);
    setAddedItems(updatedItems);
  };

  return (
    <div className="pb-20">
      <h2 className="text-2xl text-center uppercase font-bold text-[#001120]">
        {title}
      </h2>
      <div className="flex justify-center mt-5">
        <form
          className="grid xl:grid-cols-6 xl:gap-6 md:grid-cols-3 md:gap-4 grid-cols-2 gap-3 text-[#333333]"
          onSubmit={handleSearch}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="product" className="text-[#333333]">
              {labelProduct}
            </label>
            <select
              id="product"
              name="product"
              title={labelProduct}
              required
              className="p-3 rounded-lg outline-[#001120]"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value={chooseProduct}>{chooseProduct}</option>
              <option value={photo.split(" ")[0]}>{photo.split(" ")[0]}</option>
              <option value={mug.split(" ")[0]}>{mug.split(" ")[0]}</option>
              <option value={poster.split(" ")[0]}>
                {poster.split(" ")[0]}
              </option>
              <option value={fifaCard.split(" ")[0]}>
                {fifaCard.split(" ")[0]} {fifaCard.split(" ")[1]}
              </option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="event" className="text-[#333333]">
              {labelEvent}
            </label>
            <select
              id="event"
              name="event"
              title={chooseEvent}
              required
              className="p-3 rounded-lg outline-[#001120]"
              onChange={(e) => {
                setEvent(e.target.value);
                setDate(chooseDate);
                setTime(chooseTime);
                setField(chooseField);
                setTeam(chooseTeam);
              }}
              value={event}
            >
              <option>{chooseEvent}</option>
              {Array.from(
                new Set(images.map((image) => image.folder?.split("~")[0]))
              ).map((uniqueEvent, index) => (
                <option key={index} value={uniqueEvent}>
                  {uniqueEvent}
                </option>
              ))}
            </select>
          </div>
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
              {dateOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
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
          <div className="flex flex-col gap-2">
            <label htmlFor="image" className="text-[#333333]">
              {labelImage}
            </label>
            <select
              name="image"
              id="image"
              title={chooseImage}
              required
              className="p-3 rounded-lg outline-[#001120]"
              onChange={(e) => setImage(e.target.value)}
              value={image}
            >
              <option>{chooseImage}</option>
              {imageOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-[#333333] text-[#FFF6EE] p-3 mt-7 rounded-lg transition-all hover:bg-[#001120] hover:text-[#FFF6EE]"
          >
            {addProduct}
          </button>
        </form>
      </div>
      <h4 id="infoSearch" className="mt-4 text-center">
        {infoText}
      </h4>
      {addedItems.length > 0 && (
      <div className="mt-6 text-center">
        <h3 className="text-xl font-bold mb-3">{addedItemsLabel}</h3>
        <ul>
          {addedItems.map((item, index) => (
            <li key={index} className="flex justify-center items-center gap-2 mb-3">
              <span>{item.item}</span>
              <button
                onClick={() => handleQuantityChange(index, -1)}
                className="bg-[#333333] text-[#FFF6EE] p-2 rounded-lg transition-all hover:bg-[#001120] hover:text-[#FFF6EE]"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(index, 1)}
                className="bg-[#333333] text-[#FFF6EE] p-2 rounded-lg transition-all hover:bg-[#001120] hover:text-[#FFF6EE]"
              >
                +
              </button>
              <button
                onClick={() => handleRemoveItem(index)}
                className="bg-red-500 text-[#FFF6EE] p-2 rounded-lg transition-all hover:bg-red-700 hover:text-[#FFF6EE]"
              >
                {removeProduct}
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-10 max-w-2xl m-auto">
            <OrderForm labelName={labelName} labelEmail={labelEmail} labelMessage={labelMessage} btnOrder={btnOrder} btnOrdering={btnOrdering} success={success} error={error} addedItems={addedItems} />
        </div>
      </div>
    )}
    </div>
  );
};

export default ProductsOrder;
