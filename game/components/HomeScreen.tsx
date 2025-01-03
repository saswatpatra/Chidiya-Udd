'use client'

interface HomeScreenProps {
  onStartGame: () => void
}

export default function HomeScreen({ onStartGame }: HomeScreenProps) {
  return (
    <div className="text-center">
      <button
        onClick={onStartGame}
        className="px-8 py-4 bg-purple-600 text-white rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        Start Game
      </button>
    </div>
  )
}
