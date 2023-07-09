import React from "react";

export const Header = () => {
  return (
    <header className="flex justify-between items-center py-3">
      <div className="logo text-xl font-bold ">Memory Game</div>
      <div className="menu flex gap-3">
        <button className="menu-btn bg-orange-400 text-orange-50">
          Restart
        </button>
        <button className="menu-btn bg-gray-100 ">New Game</button>
      </div>
    </header>
  );
};
