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
