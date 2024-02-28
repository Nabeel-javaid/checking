import React from "react";
import Dropdown from "./Dropdown";

export default function Menus() {
  return (
    <>
      <div className="w-full">
        <a href="/" className="hover:text-primary py-2 block">
          Home
        </a>
      </div>
      <div className="w-full">
        <a href="/" className="hover:text-primary py-2 block">
          About Us
        </a>
      </div>
      <div className="w-full">
        <a href="/" className="hover:text-primary py-2 block">
          Market
        </a>
      </div>
      <Dropdown>
        <div className="w-full">
          <a href="/" className="hover:text-primary py-2 block">
            Create Market
          </a>
        </div>
        <div className="w-full">
          <a href="/" className="hover:text-primary py-2 block">
            View Markets
          </a>
        </div>
      </Dropdown>
    </>
  );
}
