import React, { useEffect, useState } from "react";

import { Cell } from "./Cell";

const SHOW_CELL_DURATION = 500;

export const GameArea = () => {
  const [numbers, setNumbers] = useState([]);
  const [gameStatus, setGameStatus] = useState("idle");
  const [selectedNumber, setSelectedNumber] = useState(null);

  useEffect(() => {
    createRandomNumbers();
  }, []);

  function guidGenerator() {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  }

  function createRandomNumbers(size = 16) {
    const numbers = [];

    while (numbers.length !== size) {
      const randomNumber = Math.floor(Math.random() * 20 + 1);
      const isNumberUsed = numbers.findIndex(
        (num) => num.value === randomNumber
      );
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

  function setCellStatus(id, status) {
    setNumbers((prevState) => {
      const mutatedNumbers = prevState.map((cell) => {
        if (cell.id === id) {
          return {
            ...cell,
            status: status,
          };
        }
        return cell;
      });
      return mutatedNumbers;
    });
  }

  function onCellClick(id) {
    if (gameStatus !== "idle") return;
    const clickedCell = getNumberById(id);
    if (clickedCell.status === "shown") return;

    setNumbers((prevState) => {
      const mutatedNumbers = prevState.map((cell) => {
        if (cell.id === id) {
          !selectedNumber && setSelectedNumber(cell.id);
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
      const selectedNum = getNumberById(selectedNumber);
      const clickedNum = getNumberById(id);
      if (selectedNum.value === clickedNum.value) {
        setSelectedNumber(null);
        setGameStatus("processing");
        setCellStatus(id, "shown");
        setTimeout(() => {
          setGameStatus("idle");
        }, SHOW_CELL_DURATION);
      } else {
        setSelectedNumber(null);
        setGameStatus("processing");
        setTimeout(() => {
          setCellStatus(selectedNumber, "hidden");
          setCellStatus(id, "hidden");
          setGameStatus("idle");
        }, SHOW_CELL_DURATION);
      }
    }
  }

  function getNumberById(id) {
    return numbers.find((num) => num.id === id);
  }

  return (
    <div className="game-area">
      {numbers.map((cell) => (
        <Cell
          value={cell.value}
          key={cell.id}
          status={cell.status}
          onCellClick={() => onCellClick(cell.id)}
        />
      ))}
    </div>
  );
};
