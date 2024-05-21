"use client";

import React, { useRef, useEffect, useState } from "react";
import ContactForm from "./ContactForm";

interface ContactProps {
  title: string;
  description: string;
  labelName: string;
  labelEmail: string;
  labelMessage: string;
  btnSend: string;
  btnSending: string;
  success: string;
  error: string;
}

const Contact:React.FC<ContactProps>= ({title, description, labelName, labelEmail, labelMessage, btnSend, btnSending, success, error}) => {
  const contactRef = useRef<HTMLDivElement>(null);
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
      className={`container m-auto pt-20 pb-20 pl-5 pr-5 transform transition-transform duration-2500 ease-in ${
        isAnimated ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
      }`}
      id="contact"
    >
      <h1 className="text-center text-3xl uppercase font-bold text-[#001120] mb-5">
        {title}
      </h1>
      <div>
        <p className="text-center text-[#333333] text-lg">
          {description}
        </p>
      </div>
      <div className="mt-10 max-w-4xl m-auto">
        <ContactForm labelName={labelName} labelEmail={labelEmail} labelMessage={labelMessage} btnSend={btnSend} btnSending={btnSending} success={success} error={error} />
      </div>
    </div>
  );
}

export default Contact;
