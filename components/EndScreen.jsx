import { useState } from "react";
import axios from "axios";
import HighscoreList from "./HighscoreList";
import Highscore from "./Highscore";

function EndScreen({ score, onRestart }) {
  const [name, setName] = useState("");
  const [showHighscore, setShowHighscore] = useState(false);

  const handleShowHighscore = () => {
    setShowHighscore(true);
  };

  const handleSubmitHighscore = () => {
    setShowHighscore(true);
    const newHighscore = {
      name: name,
      score: score,
    };

    axios
      .post("http://localhost:3000/highscores", newHighscore)
      .then((response) => {
        <p>Submitted Highscore!</p>;
        console.log("Highscore Submitted:", response.data);
      })
      .catch((error) => {
        console.error(("Couldn't submit your Highscore!", error));
      });
  };
  return (
    <div>
      {showHighscore ? (
        // Render Highscore component when showHighscore is true
        <div>
          <Highscore />
          <button onClick={onRestart}>Restart Quiz</button>{" "}
        </div>
      ) : (
        <>
          <img src="https://img.welt.de/img/kultur/mobile101290753/2682509427-ci102l-w1024/Shrek-Aufmacher-BM-Lifestyle-Seeburg-jpg.jpg" />
          <h1>You Shreked yourself!</h1>
          <p>Got a total of: {score}</p>
          <label htmlFor="name">Enter your Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Your Name Here!"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div>
            <button onClick={handleSubmitHighscore}>Submit!</button>
          </div>
        </>
      )}
    </div>
  );
}

export default EndScreen;
