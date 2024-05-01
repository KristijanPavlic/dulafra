"use client";

import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactForm = () => {
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
      toast.success("Poruka uspješno poslana.");
      clearInputFields;
      setData({
        name: "",
        email: "",
        message: "",
      });
    }

    if (response.status !== 200) {
      setIsSubmitting(false);
      toast.error(
        "Došlo je do greške pri slanju poruke. Molimo pokušajte ponovno."
      );
    }
  };

  const clearInputFields = (): void => {
    // Get references to the input fields
    const nameInput = document.getElementById(
      "name"
    ) as HTMLInputElement | null;
    const emailInput = document.getElementById(
      "email"
    ) as HTMLInputElement | null;
    const messageInput = document.getElementById(
      "message"
    ) as HTMLTextAreaElement | null;

    // Check if any of the elements are not found
    if (nameInput && emailInput && messageInput) {
      // Clear the input fields
      nameInput.value = "";
      emailInput.value = "";
      messageInput.value = "";
    } else {
      console.error("One or more input fields not found");
    }
  };

  return (
    <form
      className="flex flex-col border border-black rounded-lg"
      onSubmit={sendEmail}
    >
      <input
        className="bg-transparent p-5 focus:outline-none focus:bg-white border-b border-b-black rounded-t-lg"
        type="text"
        placeholder="Ime i prezime"
        name="name"
        required
        maxLength={60}
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />
      <input
        className="bg-transparent p-5 focus:outline-none focus:bg-white border-b border-b-black"
        type="email"
        placeholder="Vaš email"
        name="email"
        required
        maxLength={320}
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />
      <textarea
        className="bg-transparent p-5 focus:outline-none focus:bg-white border-b border-b-black"
        name="message"
        cols={30}
        rows={5}
        maxLength={3000}
        placeholder="Ovdje napišite svoju poruku"
        onChange={(e) => setData({ ...data, message: e.target.value })}
      />
      <button
        className="p-4 bg-[#001120] text-[#FFF6EE] hover:bg-[#FFF6EE] hover:text-[#001120] transition-all rounded-b-lg"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Poruka se šalje..." : "Pošalji poruku"}
      </button>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </form>
  );
};

export default ContactForm;
