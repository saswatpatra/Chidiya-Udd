import { BirdGame } from '@/components/BirdGame'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-16 pb-8 px-8 bg-gray-900 text-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-gray-100">Bird Click Game</h1>
      <p className="text-lg mb-16 text-gray-300">Click on 'Bird' button when a bird name comes up</p>
      <BirdGame />
    </main>
  )
}

