import { useState, useEffect } from 'react'
import { useChatTheme } from '@/contexts/ChatThemeContext'

interface FloatingElement {
  id: number
  size: number
  left: string
  top: string
  animationClass: string
  emoji: string
}

export function AnimatedBackground() {
  const { theme } = useChatTheme()
  const [elements, setElements] = useState<FloatingElement[]>([])

  const getThemeEmojis = () => {
    switch (theme) {
      case 'romantic':
        return ['🧸', '💖', '💌', '🌸', '✨']
      case 'playful':
        return ['☁️', '🎈', '🍭', '🦄', '🌈']
      case 'neutral':
      default:
        return ['✨', '⭐', '🌙', '💫', '🌌']
    }
  }

  useEffect(() => {
    const items: FloatingElement[] = []
    const count = 50
    const emojis = getThemeEmojis()

    for (let i = 0; i < count; i++) {
      items.push({
        id: i,
        size: Math.random() * 20 + 20,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationClass: `floating-element-${(i % 6) + 1}`,
        emoji: emojis[i % emojis.length],
      })
    }
    setElements(items)
  }, [theme])

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none select-none z-0">
      {elements.map((element) => (
        <div
          key={element.id}
          className={`${element.animationClass} absolute flex items-center justify-center`}
          style={{
            width: `${element.size}px`,
            height: `${element.size}px`,
            left: element.left,
            top: element.top,
            fontSize: `${element.size}px`,
            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
            opacity: 0.7,
          }}
        >
          {element.emoji}
        </div>
      ))}
    </div>
  )
}
