import React, { useEffect } from "react";
import { useState } from "react";
import GamePieces from "./GamePieces";
import snakeimg from "../assets/snake-game-ai-gen.png";

const StateGame = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("highScore")) || 0
  );
  const [gameOver, setGameOver] = useState(false);
  const [collision, setCollisionType] = useState("");

  const handleGameOver = (type) => {
    setGameOver(true);

    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("highscore", score.toString());
    }

    setCollisionType(type);
  };

  const handleResetGame = () => {
    setScore(0);
    setGameOver(false);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver && e.key === "Enter") {
        handleResetGame();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
  }, [gameOver]);
  return (
    <div className="game-container">
      <div className="scores">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "720px",
            alignItems:"center"
          }}
        >
          <p className="score"> {score}</p>
          <p className="high-score"> {highScore}</p>
        </div>
      </div>

      {gameOver && (
        <div className="game-over">
          <div className="game-border-1">
            <div className="game-border-2">
              <div className="game-border-3">
                <div className="gameOver">
                  <div className="message">
                  <h1>Game Over</h1>
                  <img src={snakeimg} alt="" />
                  <p className="p1">{collision === "wall"?"you hit the wall":"you ate yourself"}</p>
                  <p className="p2">Please press enter to reset the game</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!gameOver && (
        <GamePieces
          score={score}
          setScore={setScore}        
          onGameOver={(type) => handleGameOver(type)}
        />
      )}
    </div>
  );
};

export default StateGame;
