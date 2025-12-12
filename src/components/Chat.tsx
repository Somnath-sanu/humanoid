import { useState, useRef, useEffect } from 'react'
import { useChat, fetchServerSentEvents } from '@tanstack/ai-react'
import { generateStickerDef } from '@/server/tools/generateSticker'
import { googleTtsClientDef } from './tools/googleTtsClient'
import { Send } from 'lucide-react'
import { useChatTheme } from '@/contexts/ChatThemeContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { updateThemeDef } from '@/server/tools/theme'
import { toast } from 'sonner'

export function Chat() {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { theme, setTheme } = useChatTheme()

  const hasVoiceNote = (parts: any[]) => {
    return parts.some(
      (part) =>
        part.type === 'tool-result' && part.toolCallId === 'voiceMessage',
    )
  }

  const updateTheme = updateThemeDef.client((input) => {
    setTheme(input.theme)
    return {
      success: true,
    }
  })

  const { messages, sendMessage, isLoading } = useChat({
    connection: fetchServerSentEvents('/api/chat'),
    tools: [generateStickerDef, googleTtsClientDef, updateTheme],
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      sendMessage(input)
      setInput('')
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  console.log(messages)

  return (
    <div className="fixed inset-0 w-screen h-screen z-50 flex flex-col items-center justify-center overflow-hidden">
      <div className="relative z-10 w-full max-w-2xl h-[85vh] flex flex-col glass-panel mx-4 transition-all duration-300 shadow-lg overflow-hidden">
        <div className="p-2 border-b border-white/20 flex items-center justify-between shrink-0 backdrop-blur-md bg-white/10">
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <span className="font-semibold text-gray-800/80">Silpy</span>
          </div>
          <div className="flex gap-2 items-center">
            <Button
              onClick={() => setTheme('neutral')}
              size="sm"
              variant={theme === 'neutral' ? 'default' : 'outline'}
              className={`rounded-full ${
                theme === 'neutral'
                  ? 'bg-purple-500 hover:bg-purple-600 text-white shadow-md'
                  : 'bg-white/40 hover:bg-white/60 text-gray-700 border-white/20'
              }`}
            >
              Neutral
            </Button>
            <Button
              onClick={() => setTheme('romantic')}
              size="sm"
              variant={theme === 'romantic' ? 'default' : 'outline'}
              className={`rounded-full ${
                theme === 'romantic'
                  ? 'bg-pink-500 hover:bg-pink-600 text-white shadow-md'
                  : 'bg-white/40 hover:bg-white/60 text-gray-700 border-white/20'
              }`}
            >
              Romantic
            </Button>
            <Button
              onClick={() => setTheme('playful')}
              size="sm"
              variant={theme === 'playful' ? 'default' : 'outline'}
              className={`rounded-full ${
                theme === 'playful'
                  ? 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-md'
                  : 'bg-white/40 hover:bg-white/60 text-gray-700 border-white/20'
              }`}
            >
              Playful
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto chat-messages p-4 relative">
          {messages.length === 0 ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center opacity-80">
              <div className="text-6xl mb-6 animate-bounce-slow">👋</div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                How can I help you today?
              </h2>
              <p className="text-gray-600 mb-8 max-w-md">I'm your cute Silpy</p>
            </div>
          ) : (
            <div className="space-y-6 pb-4">
              {messages.map((message) => {
                // const messageHasVoiceNote = hasVoiceNote(message.parts)
                return (
                  <div
                    key={message.id}
                    className={`flex w-full ${
                      message.role === 'assistant'
                        ? 'justify-start'
                        : 'justify-end'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] ${
                        message.role === 'assistant'
                          ? ' rounded-tl-none'
                          : 'rounded-tr-none'
                      }`}
                    >
                      {/* Message Content */}
                      <div className="space-y-2">
                        {message.parts.map((part, idx) => {
                          if (part.type === 'thinking') {
                            return (
                              <div
                                key={idx}
                                className="text-xs text-gray-500 italic flex items-center gap-2 mb-1"
                              >
                                <span>💭</span>
                                <span>{part.content}</span>
                              </div>
                            )
                          }

                          if (part.type === 'text') {
                            return (
                              <div
                                key={idx}
                                className="text-[15px] leading-relaxed bg-muted/90 rounded-2xl p-2"
                              >
                                {part.content}
                              </div>
                            )
                          }
                          if (
                            part.type === 'tool-result' &&
                            part.toolCallId === 'generateSticker'
                          ) {
                            if (part.content) {
                              const { url } = JSON.parse(part.content)
                              return (
                                <img
                                  key={idx}
                                  src={url}
                                  className="w-24 h-24 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300 border-none outline-none"
                                  alt="Generated sticker"
                                />
                              )
                            }
                          }

                          if (
                            part.type === 'tool-result' &&
                            part.toolCallId === 'voiceMessage'
                          ) {
                            const { audioUrl } = JSON.parse(
                              part.content as string,
                            )
                            return (
                              <div
                                key={idx}
                                className="bg-white/50 p-2 rounded-lg mt-2"
                              >
                                <audio
                                  controls
                                  src={audioUrl}
                                  className="w-full h-8"
                                >
                                  Your browser does not support the audio
                                  element.
                                </audio>
                              </div>
                            )
                          }
                          return null
                        })}
                      </div>
                    </div>
                  </div>
                )
              })}

              {isLoading && (
                <div className="flex justify-start w-full">
                  <div className="text-3xl animate-pulse">💭</div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="p-3 backdrop-blur-md">
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 items-center relative max-w-full mx-auto"
          >
            <Input
              type="text"
              autoFocus
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Silpy Silpy..."
              className="flex-1 bg-white/80 border-transparent rounded-full py-3 px-6 text-gray-800 placeholder-gray-500 transition-all duration-300 h-11"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              size="icon"
              className={`rounded-full cursor-pointer h-8 w-8 shrink-0 ${
                !input.trim()
                  ? 'bg-gray-200 text-gray-400 hover:bg-gray-200'
                  : ' text-white shadow-md hover:scale-105 active:scale-95'
              } transition-all duration-200`}
            >
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
