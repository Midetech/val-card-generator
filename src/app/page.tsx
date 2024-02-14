"use client";

import Card from "./Card";
import React, { useEffect } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import { IoHeartOutline } from "react-icons/io5";

interface Quote {
  quote?: string;
  author?: string;
  category?: string;
}

export default function Home() {
  const [name, setName] = React.useState({
    from: "",
    to: "",
  });
  const [imageURL, setImageURL] = React.useState("");
  const [message, setMessage] = React.useState<Quote>();
  const [loading, setLoading] = React.useState(false);

  const divRef = React.useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (divRef.current) {
      divRef.current.style.backgroundImage = `url(${imageURL})`;

      const canvas = await html2canvas(divRef.current);
      const imgData = canvas.toDataURL("image/jpg");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "downloadedImage.png"; // Change the filename as needed
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  const fetchImage = () => {
    fetch(`${process.env.NEXT_PUBLIC_IMAGE_URL}?love`).then((response) => {
      setImageURL(response.url);
    });
  };

  useEffect(() => {
    fetchImage();
  }, []);
  const generateMessage = () => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_RANDOM_MESSAGE_API_URL}?category=love`, {
      headers: { "X-Api-Key": "P9xZl7vA1iuMQevWXA1suw==liKyURQz2EMfQWTq" },
    }).then((response) => {
      response.json().then((data: Quote[]) => {
        setMessage(data[0]);
        setLoading(false);
      });
    });
  };

  return (
    <div className="flex lg:min-h-screen flex-col items-center lg:gap-y-8 gap-y-5 lg:p-6 py-8 px-6 dark:text-white dark:bg-black bg-white">
      <div className="flex flex-col gap-y-4 items-center">
        <p className="lg:text-[44px] lg:leading-[54px] leading-normal text-center text-[28px] font-bold">
          Generate a personalized
          <br />
          Valentine&apos;s Day poster{" "}
        </p>
        <p className="text-[12px] lg:text-lg">
          Make your loved one feel special with a custom love note.
        </p>
      </div>

      <div className="lg:w-1/2 w-full space-y-6">
        <div className="flex gap-4">
          <div className="h-[50px] w-full border rounded-[10px] flex items-center justify-between px-4">
            <input
              type="text"
              placeholder="From"
              className="bg-transparent w-2/3 outline-none h-[40px]"
              value={name.from}
              onChange={(e) =>
                setName({
                  ...name,
                  from: e.target.value,
                })
              }
            />

            <IoHeartOutline color="#e6194c" />
          </div>{" "}
          <div className="h-[50px] w-full border rounded-[10px] flex items-center justify-between px-4">
            <input
              type="text"
              placeholder="To"
              className="bg-transparent w-2/3 outline-none h-[40px]"
              value={name.to}
              onChange={(e) =>
                setName({
                  ...name,
                  to: e.target.value,
                })
              }
            />

            <IoHeartOutline color="#e6194c" />
          </div>
        </div>
        <button
          disabled={loading || !name.from || !name.to}
          onClick={() => {
            fetchImage();
            generateMessage();
          }}
          className="bg-[#e6194c] text-white rounded-[10px] h-[48px] w-full px-4 py-2 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {loading ? "Please wait..." : "Generate"}
        </button>
      </div>

      <Card {...{ imageURL, name, divRef }} message={message?.quote} />

      <button
        onClick={handleDownload}
        className="bg-[#e6194c] text-white rounded-[10px] h-[48px] lg:w-1/2 w-full px-4 py-2"
      >
        Download
      </button>
    </div>
  );
}
