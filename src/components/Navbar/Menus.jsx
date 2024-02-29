import React from "react";
import Dropdown from "./Dropdown";

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
          About Us
        </a>
      </div>
      <div className="w-full">
        <a href="/" className="block py-2 hover:text-primary">
          Market
        </a>
      </div>
      <Dropdown>
        <div className="w-full">
          <a href="/create-market" className="block py-2 hover:text-primary">
            Create Market
          </a>
        </div>
        <div className="w-full">
          <a href="/" className="block py-2 hover:text-primary">
            View Markets
          </a>
        </div>
      </Dropdown>
    </>
  );
}
