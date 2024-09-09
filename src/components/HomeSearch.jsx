"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillMicFill } from "react-icons/bs";


export default function HomeSearch() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [randomSearchLoading, setRandomSearchLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;
    router.push(`/search/web?searchTerm=${input}`);
  }

  async function randomSearch() {
    setRandomSearchLoading(true);
    const response = await fetch("https://random-word-api.herokuapp.com/word")
      .then((res) => res.json())
      .then((data) => data[0]);
    if (!response) return;
    router.push(`/search/web?searchTerm=${response}`);
    setRandomSearchLoading(false);
  }

  return (
    <>
      {/* Google Image */}
      <div className="flex justify-center mt-10">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
          alt="Google"
          className="w-44 sm:w-60"
        />
      </div>

      {/* Search Input */}
      <form
        onSubmit={handleSubmit}
        className="flex w-full mt-5 mx-auto max-w-[90%] border border-gray-200 px-5 py-3 rounded-full hover:shadow-md focus-within:shadow-md transition-shadow sm:max-w-xl lg:max-w-2xl"
      >
        <AiOutlineSearch className="text-xl text-gray-500 mr-3" />
        <input
          type="text"
          className="flex-grow focus:outline-none"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <BsFillMicFill className="text-lg" />
      </form>

      {/* Buttons */}
      <div className="flex flex-col space-y-2 sm:space-y-0 sm:space-x-4 justify-center sm:flex-row mt-8">
        <button onClick={handleSubmit} className="btn">
          Google Search
        </button>
        <button
          disabled={randomSearchLoading}
          onClick={randomSearch}
          className="btn flex items-center justify-center disabled:opacity-80"
        >
          {randomSearchLoading ? (
            <>
              <div className="relative w-full max-w-lg h-4 bg-gray-300 rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-blue-500 rounded-full animate-loadingBar"></div>
              </div>
            </>
          ) : (
            "I am Feeling Lucky"
          )}
        </button>
      </div>

      {/* Loading Bar Animation */}
      <style jsx>{`
        @keyframes loadingBar {
          0% {
            width: 0;
          }
          100% {
            width: 100%;
          }
        }
        .animate-loadingBar {
          animation: loadingBar 3s linear infinite;
        }
      `}</style>
    </>
  );
}
