import React, { useEffect, useState } from "react";

import { Cell } from "./Cell";

export const GameArea = () => {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    createRandomNumbers();
  }, []);

  function guidGenerator() {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
  }

  function createRandomNumbers(size = 16) {
    const numbers = [];

    while (numbers.length !== size) {
      const randomNumber = Math.floor(Math.random() * 20 + 1);
      const isNumberUsed = numbers.findIndex((num) => num.value === randomNumber);
      if (isNumberUsed !== -1) continue;
      numbers.push({
        value: randomNumber,
        id: guidGenerator(),
        status: "hidden",
      });
      numbers.push({
        value: randomNumber,
        id: guidGenerator(),
        status: "hidden",
      });
    }
    numbers.sort(() => Math.random() - 0.5);
    setNumbers(numbers);
  }

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
