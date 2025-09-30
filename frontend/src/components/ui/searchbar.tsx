import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchHoverRight: React.FC = () => {
  return (
    <div
      className="group relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full
                                 bg-gradient-to-r dark:from-[#070e41] dark:to-[#263381] from-[#c0c7ff] to-[#4c64ff]
                                 font-medium text-neutral-200 border-2 border-[#656fe2] transition-all duration-300 hover:w-60 focus-within:w-60"
      aria-label="Visit"
    >
      <input
        className="inline-flex whitespace-nowrap opacity-0 transition-all duration-200 group-hover:-translate-x-3 group-hover:opacity-100 group-focus-within:-translate-x-3 group-focus-within:opacity-100 text-white px-4 outline-none"
        placeholder="Search"
      />

      <div className="absolute right-3.5">
        {/* <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path
            d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg> */}
        <FiSearch className="h-5 w-5" />
      </div>
    </div>
  );
};

export default SearchHoverRight;
