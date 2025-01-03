'use client'

import { useState, useEffect } from 'react'

interface CountdownScreenProps {
  onCountdownEnd: () => void
}

export default function CountdownScreen({ onCountdownEnd }: CountdownScreenProps) {
  const [count, setCount] = useState(3)

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      onCountdownEnd()
    }
  }, [count, onCountdownEnd])

  return (
    <div className="flex items-center justify-center">
      <div className="text-8xl font-bold text-purple-400 animate-pulse">
        {count}
      </div>
    </div>
  )
}
