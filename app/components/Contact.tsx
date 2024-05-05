import React from "react";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <div className="container m-auto pt-20 pb-20 pl-5 pr-5" id="contact">
      <h1 className="text-center text-3xl uppercase font-bold text-[#001120] mb-5">
        Kontakt
      </h1>
      <div>
        <p className="text-center text-[#333333] text-lg">
          Imate pitanje? Slobodno nas kontaktirajte.
        </p>
      </div>
      <div className="mt-10 max-w-5xl m-auto">
        <ContactForm />
      </div>
    </div>
  );
}
