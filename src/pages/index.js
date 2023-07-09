import { Header } from "./components/Header";
import { GameArea } from "./components/GameArea";
import { Footer } from "./components/Footer";
import { useEffect, useState } from "react";

export default function Home() {
  const [timer, setTimer] = useState(0);
  const [moveCount, setMoveCount] = useState(0);
  let timeInternal = null;

  function startTimer() {
    timeInternal = setInterval(() => {
      console.log(timer);
      setTimer((prev) => prev + 1);
    }, 1000);
  }

  function addMoveCount() {
    setMoveCount(moveCount + 1);
  }

  function reset() {
    clearInterval(timeInternal);
  }
  return (
    <div className="container ">
      <Header reset={reset} />
      <GameArea addMoveCount={addMoveCount} startTimer={startTimer} />
      <Footer time={timer} moveCount={moveCount} />
    </div>
  );
}
