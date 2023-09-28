import { useState, useEffect } from "react";
import axios from "axios";
import HighscoreList from "./HighscoreList";

function Highscore() {
  const [name, setName] = useState("");
  const [highscores, setHighscores] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/highscores")
      .then((response) => {
        setHighscores(response.data);
      })
      .catch((error) => {
        console.error("Couldnt find any Highscores:", error);
      });
  }, []);

  return (
    <div>
      <HighscoreList highscores={highscores} />
    </div>
  );
}

export default Highscore;
