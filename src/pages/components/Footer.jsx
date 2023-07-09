import React from "react";

export const Footer = ({ time, moveCount }) => {
  return (
    <div className="container flex justify-between  w-full max-w-xl mx-auto gap-5 p-10">
      <div className="bg-gray-200  text-gray-700 px-4 py-5 rounded-lg w-1/2 flex justify-between  ">
        <span className="inline-block ">Time</span>
        <span className="inline-block ">{time}</span>
      </div>
      <div className="bg-gray-200  text-gray-700 px-4 py-5 rounded-lg w-1/2 flex justify-between ">
        <span className="inline-block ">Moves</span>
        <span className="inline-block ">{moveCount}</span>
      </div>
    </div>
  );
};
