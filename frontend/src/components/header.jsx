import React from "react";
import {Link} from "react-router-dom"

const Header = () => {
  return (
    <header className="bg-red-800 w-full shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-white text-3xl font-bold tracking-wide">
          CodeDrop
        </h1>
        <Link
          to="/dashboard"
          className="text-white border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-red-700 transition duration-200"
        >
          Dashboard
        </Link>
      </div>
    </header>
  );
};

export default Header;
