import { Chat } from '@/components/Chat'
import { authMiddleware } from '@/middleware/auth'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/chat/')({
  component: ChatComponent,
  // server: {
  //   middleware: [authMiddleware],
  // },
})

function ChatComponent() {
  return <Chat />
}
