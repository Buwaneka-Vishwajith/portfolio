import React, { useEffect, useState } from "react";

const PortfolioMemoryGame = () => {
  const [active, setActive] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [gameState, setGameState] = useState("waiting");
  const [level, setLevel] = useState(1);
  const [pattern, setPattern] = useState([]);

  const getGridSize = (level) => { 
    if(level >= 6) {
      return 25; // 5x5 grid
    } else if (level >= 3) {
      return 16; // 4x4 grid
    } else {
      return 9;  // 3x3 grid
    }
  };

  const getPatternLength = (level) => {
    return Math.min(2 + level, 6); // Start with 3, max 6
  };

  const getRandom = () => {
    const random = new Set();
    const gridSize = getGridSize(level);
    const patternLength = getPatternLength(level); 
    
    while (random.size < patternLength) {
      const randomIndex = Math.floor(Math.random() * gridSize);
      random.add(randomIndex);
    }
    
    return Array.from(random);
  };
  
  const startGame = () => {
    setGameState("starting");
    setLevel(1);
  };  

  // Generate and show pattern
  useEffect(() => {
    if (gameState === "starting" || gameState === "nextLevel") {
      const startTimer = setTimeout(() => {
        const newPattern = getRandom();
        setPattern(newPattern);
        setActive(newPattern);
        setGameState("showing");
      }, 500);
      return () => clearTimeout(startTimer);
    }
  }, [gameState, level]);

  // Hide pattern after showing
  useEffect(() => { 
    if (gameState === "showing" && active.length > 0) {
      const hideTimer = setTimeout(() => {
        setActive([]);
        setGameState("playing");
      }, 300 + (level * 100)); // Show longer for higher levels
      return () => clearTimeout(hideTimer); 
    }
  }, [gameState, active, level]); 

  // Reset game after game over
  useEffect(() => {
    if (gameState === "gameOver") {
      const resetTimer = setTimeout(() => {
        setClicked([]);
        setLevel(1);
        setPattern([]);
        setGameState("waiting");
      }, 2000);
      return () => clearTimeout(resetTimer); 
    }  
  }, [gameState]);

  const handleClick = (index) => {
    const patternLength = getPatternLength(level);
    if (
      gameState !== "playing" ||
      clicked.includes(index) ||
      clicked.length >= patternLength
    )
      return;

    const newClicked = [...clicked, index];
    setClicked(newClicked);

    if (newClicked.length === patternLength) {
      if (newClicked.sort().join(",") === pattern.sort().join(",")) {
        // Correct! Move to next level
        setLevel(level + 1);
        setClicked([]);
        setGameState("nextLevel");
      } else {
        // Wrong pattern
        setGameState("gameOver");
      }
    }
  };

  const getGridCols = () => {
    if(level >= 6) return 'grid-cols-5';
    if(level >= 3) return 'grid-cols-4';
    return 'grid-cols-3';
  };

  const getStatusText = () => {
    switch(gameState) {
      case "starting":
        return "";
      case "showing":
        return "";
      case "playing":
        return "";
      case "gameOver":
        return "";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-900  shadow-xl">
      <div className="mb-6 text-center">
        <div className="text-sm text-gray-400">{getStatusText()}</div>
      </div>

      <div className={`grid ${getGridCols()} gap-2 mb-6`}>
        {Array(getGridSize(level))
          .fill(null)
          .map((_, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              disabled={gameState !== "playing"}
              className={`
                h-16 w-16 rounded-md transition-all duration-300
                transform hover:scale-95 active:scale-90 
                ${
                  clicked.includes(index)
                    ? "bg-gray-900 opacity-100"
                    : active.includes(index)
                    ? "bg-green-100 opacity-100"
                    : "bg-green-400 opacity-100"
                }
                ${gameState === "playing" ? "cursor-pointer" : "cursor-default"}
                disabled:cursor-not-allowed
              `}
            />
          ))}
      </div>

      {gameState === "waiting" && (
        <button
          onClick={startGame}
          className="px-6 py-3 font-Inter bg-gray-700/50 text-white/80 hover:bg-gray-300 hover:text-gray-800 transition-colors text-md backdrop-blur-xl rounded-xl shadow-lg"
        >
          I'm Ready!
        </button>
      )}

      {gameState === "gameOver" && (
        <div className="text-center">
<div className="px-4 py-2  text-white/80 hover:bg-gray-300 hover:text-gray-800 transition-colors backdrop-blur-xl rounded-xl cursor-default">
  Nevermind, keep scrolling!
</div>

        </div>
      )}
    </div>
  );
};

export default PortfolioMemoryGame;
