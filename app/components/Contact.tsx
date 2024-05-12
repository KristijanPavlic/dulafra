"use client";

import React, { useRef, useEffect, useState } from "react";
import ContactForm from "./ContactForm";

export default function Contact() {
  const contactRef = useRef<HTMLDivElement>(null);
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

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, [isAnimated]);

  return (
    <div
      ref={contactRef}
      className={`container m-auto pt-20 pb-20 pl-5 pr-5 transform transition-transform duration-2000 ease-in delay-100 ${
        isAnimated ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
      }`}
      id="contact"
    >
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
