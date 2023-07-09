import React, { useEffect, useState } from "react";

import { Cell } from "./Cell";

const SHOW_CELL_DURATION = 500;

export const GameArea = () => {
  const [numbers, setNumbers] = useState([]);
  const [gameStatus, setGameStatus] = useState("idle");
  const [selectedNumber, setSelectedNumber] = useState();

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
    if (gameStatus !== "idle") return;
    setNumbers((prevState) => {
      const mutatedNumbers = prevState.map((cell) => {
        if (cell.id === id) {
          !selectedNumber && setSelectedNumber(cell);
          return {
            ...cell,
            status: "shown",
          };
        }
        return cell;
      });
      return mutatedNumbers;
    });
    if (selectedNumber) {
      if (selectedNumber.value === numbers.find((num) => num.id === id).value) {
        setSelectedNumber(null);
        setGameStatus("processing");

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
          setGameStatus("idle");
          return mutatedNumbers;
        });
      } else {
        setSelectedNumber(null);
        setGameStatus("processing");
        setTimeout(() => {
          setNumbers((prevState) => {
            const mutatedNumbers = prevState.map((cell) => {
              if (selectedNumber.id === cell.id || id === cell.id) {
                return {
                  ...cell,
                  status: "hidden",
                };
              }
              return cell;
            });
            return mutatedNumbers;
          });
          setGameStatus("idle");
        }, SHOW_CELL_DURATION);
      }
    }
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
