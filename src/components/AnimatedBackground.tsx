import { useMemo } from 'react'
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

  // Generate random floating elements based on theme
  const elements = useMemo(() => {
    const items: FloatingElement[] = []
    const count = 50 // Increased count for better coverage
    const emojis = getThemeEmojis()

    for (let i = 0; i < count; i++) {
      items.push({
        id: i,
        size: Math.random() * 20 + 20, // 20-50px font size
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationClass: `floating-element-${(i % 6) + 1}`,
        emoji: emojis[i % emojis.length],
      })
    }
    return items
  }, [theme]) // Only regenerate when theme changes

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
