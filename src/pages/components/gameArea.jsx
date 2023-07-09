import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Cell } from "./Cell";

export const GameArea = () => {
  const randomNumbers = [];
  for (let i = 1; i <= 8; i++) {
    const randomNumber = Math.floor(Math.random() * 20 + 1);
    randomNumbers.push({
      value: randomNumber,
      id: uuidv4(),
      status: "hidden",
    });
    randomNumbers.push({
      value: randomNumber,
      id: uuidv4(),
      status: "hidden",
    });
  }
  const [numbers, setNumbers] = useState(
    randomNumbers.sort(() => Math.random() - 0.5)
  );

  function onCellClick(id) {
    setNumbers((prevState) => {
      const mutatedNumbers = prevState.map((cell) => {
        if (cell.id === id) {
          return {
            ...cell,
            status: "shown",
          };
        }
        return cell;
      });
      return mutatedNumbers;
    });
  }

  return (
    <div className="game-area">
      {numbers.map((cell) => {
        return (
          <Cell
            value={cell.value}
            key={cell.id}
            status={cell.status}
            onCellClick={() => {
              onCellClick(cell.id);
            }}
          />
        );
      })}
    </div>
  );
};
