import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import ReactConfetti from 'react-confetti'

const words = [
  'crow', 'sparrow', 'eagle', 'robin', 'pigeon', 'hawk', 'owl', 'seagull', 'penguin', 'ostrich',
  'cat', 'dog', 'tree', 'car', 'house', 'book', 'phone', 'computer', 'chair', 'table',
  'pencil', 'window', 'door', 'shoe', 'hat', 'parrot', 'flamingo', 'pelican', 'toucan', 'hummingbird'
];
const birdNames = ['crow', 'sparrow', 'eagle', 'robin', 'pigeon', 'hawk', 'owl', 'seagull', 'penguin', 'ostrich', 'parrot', 'flamingo', 'pelican', 'toucan', 'hummingbird'];

export function BirdGame() {
  const [currentWord, setCurrentWord] = useState('');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [showConfetti, setShowConfetti] = useState(false);
  const [newHighScore, setNewHighScore] = useState(false);

  const generateWord = useCallback(() => {
    const newWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(newWord);
  }, []);

  useEffect(() => {
    if (isGameStarted && !gameOver && countdown === 0) {
      const wordInterval = setInterval(() => {
        if (birdNames.includes(currentWord)) {
          setGameOver(true);
        } else {
          generateWord();
        }
      }, 2000);

      return () => clearInterval(wordInterval);
    }
  }, [isGameStarted, gameOver, generateWord, currentWord, countdown]);

  useEffect(() => {
    if (isGameStarted && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1200); // Slightly slower countdown

      return () => clearTimeout(timer);
    }

    if (countdown === 0 && !gameOver) {
      generateWord();
    }
  }, [isGameStarted, countdown, gameOver, generateWord]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      if (score > 0) {
        setNewHighScore(true);
      }
    }
  }, [score, highScore]);

  useEffect(() => {
    if (gameOver) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [gameOver]);

  const handleButtonClick = () => {
    if (gameOver) return;

    if (birdNames.includes(currentWord)) {
      setScore((prevScore) => prevScore + 1);
      generateWord();
    } else {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setScore(0);
    setGameOver(false);
    setIsGameStarted(false);
    setCurrentWord('');
    setCountdown(3);
    setNewHighScore(false);
  };

  const startGame = () => {
    setIsGameStarted(true);
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setNewHighScore(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-4">
      <style jsx global>{`
        @keyframes neon-border {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
        .neon-button {
          position: relative;
          overflow: hidden;
        }
        .neon-button::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(90deg, #ff00ff, #00ffff, #ff00ff);
          background-size: 200% 200%;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .neon-button:hover::before {
          opacity: 1;
          animation: neon-border 1.5s linear infinite;
        }
      `}</style>
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence>
          {!isGameStarted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Button 
                onClick={startGame} 
                className="w-56 h-20 text-xl bg-gray-800 text-gray-100 hover:bg-gray-700 rounded-lg shadow-lg neon-button"
              >
                Start Game
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isGameStarted && countdown > 0 && (
            <motion.div
              key={countdown}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1 }}
              className="text-6xl font-bold absolute"
            >
              {countdown}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isGameStarted && countdown === 0 && (
            <motion.div
              className="text-center bg-gray-800 p-8 rounded-lg shadow-lg mt-24" // Updated margin here
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2 
                className="text-5xl font-bold mb-6 text-gray-100"
                key={currentWord}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                {currentWord}
              </motion.h2>
              <p className="text-xl mb-6 text-gray-300">Score: {score}</p>
              {gameOver && (
                <div>
                  <p className="text-2xl text-red-400 mt-4 mb-4">Game Over!</p>
                  <Button onClick={resetGame} className="text-lg py-2 px-4 bg-gray-700 text-gray-100 hover:bg-gray-600 rounded-md shadow-md">
                    Play Again
                  </Button>
                </div>
              )}
              {!gameOver && (
                <div>
                  <Button 
                    onClick={handleButtonClick} 
                    className="w-56 h-20 text-xl bg-gray-700 text-gray-100 hover:bg-gray-600 rounded-lg shadow-lg"
                  >
                    Bird
                  </Button>
                  <p className="text-lg mt-4 text-gray-400">High Score: {highScore}</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {showConfetti && <ReactConfetti />}
      <AnimatePresence>
        {newHighScore && gameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            onClick={handleBackgroundClick}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 p-8 rounded-lg shadow-lg text-center"
            >
              <h3 className="text-3xl font-bold text-yellow-400 mb-4">New High Score!</h3>
              <p className="text-2xl text-gray-100">{highScore}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

