"use client";

import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const notify = () => toast("Poruka uspješno poslana");

  return (
    <div className="container m-auto pt-20 pb-20 pl-5 pr-5">
      <h1 className="text-center text-3xl uppercase font-bold text-[#001120] mb-5">
        Kontakt
      </h1>
      <div>
        <p className="text-center text-[#333333] text-lg">
          Imate pitanje? Slobodno nas kontaktirajte.
        </p>
      </div>
      <div className="mt-10 max-w-5xl m-auto">
        <form className="flex flex-col border border-black rounded-lg">
          <input
            className="bg-transparent p-5 focus:outline-none focus:bg-white border-b border-b-black rounded-t-lg"
            type="text"
            placeholder="Ime i prezime"
            name="Ime i prezime"
            required
            maxLength={60}
          />
          <input
            className="bg-transparent p-5 focus:outline-none focus:bg-white border-b border-b-black"
            type="email"
            placeholder="Vaš email"
            name="Vaš email"
            required
            maxLength={320}
          />
          <textarea
            className="bg-transparent p-5 focus:outline-none focus:bg-white border-b border-b-black"
            name="Poruka"
            cols={30}
            rows={5}
            maxLength={3000}
            placeholder="Ovdje napišite svoju poruku"
          />
          <button
            className="p-4 bg-[#001120] text-[#FFF6EE] hover:bg-[#FFF6EE] hover:text-[#001120] transition-all rounded-b-lg"
            type="button"
            onClick={notify}
          >
            Pošalji poruku
          </button>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </form>
      </div>
    </div>
  );
}
