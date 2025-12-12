import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { authClient } from '@/lib/auth.client'
import { createServerFn, useServerFn } from '@tanstack/react-start'

const loginServerFn = createServerFn().handler(async () => {
  const session = await authClient.getSession()
  if (session) {
    return redirect({ to: '/chat' })
  }
})

export const Route = createFileRoute('/login/')({
  component: LoginComponent,
})

function LoginComponent() {
  // const checkSession = useServerFn(loginServerFn)
  // checkSession()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await authClient.signIn.email({ email, password })
      navigate({ to: '/chat' })
    } catch (err) {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-2 border rounded"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded"
        >
          Sign In
        </button>
      </form>
    </div>
  )
}
