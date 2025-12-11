import { createContext, useContext, useState, ReactNode } from 'react'

export type ChatTheme = 'neutral' | 'romantic' | 'playful'

interface ChatThemeContextType {
  theme: ChatTheme
  setTheme: (theme: ChatTheme) => void
}

const ChatThemeContext = createContext<ChatThemeContextType | undefined>(
  undefined,
)

export function ChatThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ChatTheme>('neutral')

  return (
    <ChatThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ChatThemeContext.Provider>
  )
}

export function useChatTheme() {
  const context = useContext(ChatThemeContext)
  if (context === undefined) {
    throw new Error('useChatTheme must be used within a ChatThemeProvider')
  }
  return context
}
