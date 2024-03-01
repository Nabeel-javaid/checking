import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

export default function Dropdown({ title, children }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="relative group" onMouseEnter={handleOpen} onMouseLeave={handleClose}>
      <span
        className="flex items-center justify-between py-2 cursor-pointer hover:text-primary"
      >
        {title} <BsChevronDown className="inline ml-2" />
      </span>
      {open && (
        <div className="absolute left-0 px-6 py-4 bg-white rounded-lg shadow-lg top-full">
          {children}
        </div>
      )}
    </div>
  );
}
