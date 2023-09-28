// import React from "react";
// import Highscore from "./Highscore";

function HighscoreList({ highscores }) {
  return (
    <div>
      <img
        id="shrekMeme"
        src="https://pm1.aminoapps.com/7533/4fde8ee022b40c6722c10f511285db387e328a3dr1-540-541v2_uhq.jpg"
      />
      <h1>Highscores</h1>
      <ul>
        {highscores.map((highscore, index) => (
          <li key={index}>
            {highscore.name}: {highscore.score} {"Points"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HighscoreList;
