'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

const BIRD_NAMES = ['Sparrow', 'Eagle', 'Pigeon', 'Parrot', 'Crow', 'Owl', 'Hawk', 'Robin']
const NON_BIRD_NAMES = ['Dog', 'Cat', 'Elephant', 'Lion', 'Tiger', 'Bear', 'Wolf', 'Fox', 'Deer', 'Rabbit']

interface GameScreenProps {
  score: number
  setScore: (score: number) => void
  highScore: number
  setHighScore: (score: number) => void
  onGameOver: (finalScore: number) => void
  isGameOver: boolean
  onPlayAgain: () => void
  goToHome: () => void
}

export default function GameScreen({ 
  score, 
  setScore, 
  highScore, 
  setHighScore, 
  onGameOver, 
  isGameOver,
  onPlayAgain,
  goToHome
}: GameScreenProps) {
  const [word, setWord] = useState('')
  const [isBirdWord, setIsBirdWord] = useState(false)
  const [showHighScorePopup, setShowHighScorePopup] = useState(false)
  const [finalScore, setFinalScore] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const generateWord = useCallback(() => {
    if (isGameOver) return

    const isBird = Math.random() < 0.5
    const wordList = isBird ? BIRD_NAMES : NON_BIRD_NAMES
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)]
    setWord(randomWord)
    setIsBirdWord(isBird)

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      if (isBird) {
        endGame(score)
      } else {
        generateWord()
      }
    }, 2000)
  }, [isGameOver, score])

  useEffect(() => {
    if (!isGameOver) {
      generateWord()
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [generateWord, isGameOver])

  const handleBirdClick = () => {
    if (isGameOver) return

    if (isBirdWord) {
      const newScore = score + 1
      setScore(newScore)
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
      generateWord()
    } else {
      endGame(score)
    }
  }

  const endGame = (finalScore: number) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    
    setFinalScore(finalScore)
    
    if (finalScore > highScore) {
      setHighScore(finalScore)
      setShowHighScorePopup(true)
      localStorage.setItem('highScore', finalScore.toString())
    }
    
    onGameOver(finalScore)
  }

  const resetScore = () => {
    setHighScore(0)
    localStorage.setItem('highScore', '0')
    setShowHighScorePopup(false)
  }

  if (isGameOver) {
    return (
      <div className="bg-[#16213e] bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-lg p-4 sm:p-8 shadow-lg text-center relative">
        {showHighScorePopup && (
          <div className="absolute top-0 left-0 right-0 bg-[#d90429] text-[#fffffc] py-2 px-4 rounded-t-lg animate-bounce">
            <p className="text-2xl font-bold">New High Score: {finalScore}</p>
          </div>
        )}
        <h2 className="text-4xl font-semibold mb-6 text-[#FBFF00]">Game Over!</h2>
        <p className="text-2xl mb-4 text-[#f1f1f1]">Final Score: <span className="text-[#FBFF00] font-semibold">{finalScore}</span></p>
        <p className="text-2xl mb-8 text-[#f1f1f1]">High Score: <span className="text-[#FBFF00] font-semibold">{highScore}</span></p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={onPlayAgain}
            className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-[#fee440] text-[#16213e] rounded-full text-base sm:text-lg font-semibold hover:bg-[#ffd23f] transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap"
          >
            Play Again
          </button>
          <button
            onClick={goToHome}
            className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-[#0f3460] text-[#f1f1f1] rounded-full text-base sm:text-lg font-semibold hover:bg-[#16213e] transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Home
          </button>
          <button
            onClick={resetScore}
            className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-[#d90429] text-[#f1f1f1] rounded-full text-base sm:text-lg font-semibold hover:bg-[#ef233c] transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Reset Score
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#16213e] bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-lg p-4 sm:p-8 shadow-lg text-center">
      <h2 className="text-4xl font-semibold mb-6 text-[#ffd700]">{word}</h2>
      <p className="text-2xl mb-8 text-[#f1f1f1]">Score: <span className="text-[#f9a825] font-semibold">{score}</span></p>
      <button
        onClick={handleBirdClick}
        className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#fee440] text-[#16213e] rounded-full text-lg font-semibold hover:bg-[#ffd700] transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 mb-4"
      >
        Bird
      </button>
      <p className="text-xl text-[#f1f1f1]">High Score: <span className="text-[#f9a825] font-semibold">{highScore}</span></p>
    </div>
  )
}

