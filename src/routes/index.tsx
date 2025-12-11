import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div>
      Landing page
      <Button asChild>
        <Link to="/chat">Get Started</Link>
      </Button>
    </div>
  )
}
