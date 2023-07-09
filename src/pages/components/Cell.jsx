import React from "react";

export const Cell = ({ value, status, onCellClick }) => {
  return (
    <div
      onClick={onCellClick}
      className={`cell ${status === "shown" ? "active" : ""}`}
    >
      {status == "shown" ? value : ""}
    </div>
  );
};
