import React, { useState, useEffect, useRef } from "react";
import { BsChevronDown } from "react-icons/bs";

// Custom hook for detecting clicks outside of passed ref
function useOutsideAlerter(ref, setOpen) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setOpen]);
}

function Dropdown({ children }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setOpen);

  return (
    <div
      ref={wrapperRef}
      className="w-full relative group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span
        className="hover:text-primary py-2 cursor-pointer flex items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        Market
        <BsChevronDown className="inline ml-2" />
      </span>
      <div
        className={`absolute top-full mt-1 shadow-lg left-0 right-0 rounded-lg bg-white transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{ zIndex: 1000 }} // Ensure dropdown is above other content
      >
        {children}
      </div>
    </div>
  );
}

// Menus component with integrated Dropdown
export default function Menus() {
  return (
    <>
      <div className="w-full">
        <a href="/" className="block py-2 hover:text-primary">
          Home
        </a>
      </div>
      <div className="w-full">
        <a href="/" className="block py-2 hover:text-primary">
          About&nbsp;Us
        </a>
      </div>
      <div>
        {/* <div className="w-full">
          <a href="/" className="block py-2 hover:text-primary">
            Market
          </a>
        </div> */}
        <Dropdown title="Market"> {/* Pass title as a prop to Dropdown */}
          <div className="w-full">
            <a href="/create-market" className="block py-2 hover:text-primary">
              Create&nbsp;Market
            </a>
          </div>
          <div className="w-full">
            <a href="/" className="block py-2 hover:text-primary">
              View&nbsp;Markets
            </a>
          </div>
        </Dropdown>
      </div>
      {/* <div className="w-full">
        <a href="/" className="block py-2 hover:text-primary">
          Contact&nbsp;Us
        </a>
      </div> */}
    </>
  );
}
