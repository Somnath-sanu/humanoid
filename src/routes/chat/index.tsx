import { Chat } from '@/components/Chat'
import { authMiddleware } from '@/middleware/auth'
import { ChatThemeProvider } from '@/contexts/ChatThemeContext'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/chat/')({
  component: ChatComponent,
  // server: {
  //   middleware: [authMiddleware]
  // }
})

function ChatComponent() {
  return <Chat />
}
