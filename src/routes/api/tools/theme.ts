import { toolDefinition } from '@tanstack/ai'
import { z } from 'zod'

export const updateThemeDef = toolDefinition({
  name: 'updateTheme',
  description: 'Update the theme of the chat',
  inputSchema: z.object({
    theme: z.enum(['neutral', 'romantic', 'playful']).default('neutral'),
  }),
  outputSchema: z.object({
    success: z.boolean(),
  }),
})
