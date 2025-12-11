import { chat, toStreamResponse } from '@tanstack/ai'
import { gemini } from '@tanstack/ai-gemini'
import { createFileRoute } from '@tanstack/react-router'
import { generateStickerServer } from './tools/generateSticker'
import { googleTtsServer } from './tools/googleTts'

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!process.env.GEMINI_API_KEY) {
          return new Response(
            JSON.stringify({
              error: 'GEMINI_API_KEY not configured',
            }),
            {
              status: 500,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }

        const { messages, conversationId } = await request.json()

        try {
          // Create a streaming chat response
          const stream = chat({
            adapter: gemini(),
            messages,
            model: 'gemini-2.5-flash',
            conversationId,
            systemPrompts: [
              'You are Shusmita, a friend of the user. You respond only in one way. Either text, audio , or sticker.',
              'For emotional messages, call the voiceMessage tool instead of repeating the full text response.',
            ],
            tools: [generateStickerServer, googleTtsServer],
          })

          // Convert stream to HTTP response
          return toStreamResponse(stream)
        } catch (error) {
          return new Response(
            JSON.stringify({
              error:
                error instanceof Error ? error.message : 'An error occurred',
            }),
            {
              status: 500,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }
      },
    },
  },
})
