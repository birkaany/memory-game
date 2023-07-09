import React, { useEffect, useState } from "react";

import { Cell } from "./Cell";

const SHOW_CELL_DURATION = 500;

export const GameArea = ({ addMoveCount, startTimer }) => {
  const [numbers, setNumbers] = useState([]);
  const [gameStatus, setGameStatus] = useState("start");
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

  const isCellHidden = (index) => {
    return numbers[index].status === "hidden";
  };

  function onCellClick(id) {
    gameStatus === "start" && startTimer();
    setGameStatus("processing");
    if (gameStatus === "processing") return;
    const clickedCellIndex = numbers.findIndex((num) => num.id === id);
    if (isCellHidden(clickedCellIndex)) {
      setNumbers((prevState) => {
        const mutatedNumbers = prevState.map((cell) => {
          if (cell.id === id) {
            addMoveCount();
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
    }

    if (selectedNumber && id !== selectedNumber.id) {
      if (selectedNumber.value === numbers.find((num) => num.id === id).value) {
        setSelectedNumber(null);

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
      } else {
        setSelectedNumber(null);
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
        }, SHOW_CELL_DURATION);
      }
    }
    setGameStatus("idle");
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
