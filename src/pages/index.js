import { Header } from "./components/Header";
import { GameArea } from "./components/gameArea";

export default function Home() {
  return (
    <div className="container ">
      <Header />
      <GameArea />
    </div>
  );
}
