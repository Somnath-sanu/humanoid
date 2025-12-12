import {
  HeadContent,
  Scripts,
  createRootRoute,
  Link,
} from '@tanstack/react-router'

import appCss from '../styles.css?url'
import { Toaster } from '@/components/ui/sonner'

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50 p-4">
      <div className="text-center space-y-6">
        <div className="text-8xl animate-bounce">🤔</div>
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600">Oops! Page not found</p>
        <p className="text-gray-500">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/chat"
          className="inline-block mt-6 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-full font-medium transition-all hover:scale-105 shadow-lg"
        >
          Go to Chat
        </Link>
      </div>
    </div>
  )
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  notFoundComponent: NotFound,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {/* <Header /> */}
        <Toaster />
        {children}
        {/* <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        /> */}
        <Scripts />
      </body>
    </html>
  )
}
