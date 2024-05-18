"use client";

import { useState } from "react";

interface ContactFormProps {
  labelName: string; 
  labelEmail: string;
  labelMessage: string;
  btnSend: string;
  btnSending: string;
  success: string;
  error: string;
}

const ContactForm:React.FC<ContactFormProps> = ({labelName, labelEmail, labelMessage, btnSend, btnSending, success, error}) => {
  const [infoText, setInfoText] = useState("");

  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendEmail = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    const response = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      setIsSubmitting(false);
      setInfoText(success);
      clearInputFields();
      setData({
        name: "",
        email: "",
        message: "",
      });
    }

    if (response.status !== 200) {
      setIsSubmitting(false);
      setInfoText(error);
    }
  };

  const clearInputFields = (): void => {
    // Clear the name, email, and message fields
    const nameInput = document.getElementById("name") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const messageInput = document.getElementById(
      "message"
    ) as HTMLTextAreaElement;

    nameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";
  };

  return (
    <>
      <form
        className="flex flex-col border border-black rounded-lg"
        onSubmit={sendEmail}
      >
        <input
          className="bg-transparent p-5 focus:outline-none focus:bg-white border-b border-b-black rounded-t-lg"
          type="text"
          placeholder={labelName}
          name="name"
          id="name"
          required
          maxLength={60}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <input
          className="bg-transparent p-5 focus:outline-none focus:bg-white border-b border-b-black"
          type="email"
          placeholder={labelEmail}
          name="email"
          id="email"
          required
          maxLength={320}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <textarea
          className="bg-transparent p-5 focus:outline-none focus:bg-white border-b border-b-black"
          name="message"
          id="message"
          cols={30}
          rows={5}
          maxLength={3000}
          placeholder={labelMessage}
          onChange={(e) => setData({ ...data, message: e.target.value })}
        />
        <button
          className="p-4 bg-[#001120] text-[#FFF6EE] hover:bg-[#FFF6EE] hover:text-[#001120] transition-all rounded-b-lg"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? btnSending : btnSend}
        </button>
      </form>
      <h4 id="infoContact" className="mt-4 text-center">{infoText}</h4>
    </>
  );
};

export default ContactForm;
