import Header from './components/Header'
import GameContainer from './components/GameContainer'

export default function BirdGame() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-start pt-8 px-6 pb-6">
        <h1 className="text-5xl font-bold mt-4 mb-4 text-purple-300 text-center">Bird Game</h1>
        <p className="text-xl mb-6 text-gray-300 text-center">Click on "Bird" button when a bird name comes up</p>
        <div className="w-full max-w-md">
          <GameContainer />
        </div>
      </main>
    </div>
  )
}
