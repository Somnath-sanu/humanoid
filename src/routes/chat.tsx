import { AnimatedBackground } from '@/components/AnimatedBackground'
import { ChatThemeProvider, useChatTheme } from '@/contexts/ChatThemeContext'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/chat')({
  component: RouteComponent,
})

function ChatLayout() {
  const { theme } = useChatTheme()

  const getBackgroundClass = () => {
    switch (theme) {
      case 'romantic':
        return 'chat-bg-romantic'
      case 'playful':
        return 'chat-bg-playful'
      case 'neutral':
      default:
        return 'chat-bg-neutral'
    }
  }

  return (
    <div
      className={`fixed inset-0 w-screen h-screen overflow-hidden ${getBackgroundClass()}`}
    >
      <AnimatedBackground />
      <Outlet />
    </div>
  )
}

function RouteComponent() {
  return (
    <ChatThemeProvider>
      <ChatLayout />
    </ChatThemeProvider>
  )
}
