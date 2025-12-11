import { toolDefinition } from '@tanstack/ai'
import { z } from 'zod'

export const googleTtsClientDef = toolDefinition({
  name: 'voiceMessage',
  description:
    'Convert text into speech using Google Cloud Text-to-Speech for voice message response.',
  inputSchema: z.object({
    text: z.string().min(1).max(1000),
    languageCode: z.string().default('en-US'),
  }),
  outputSchema: z.object({
    audioUrl: z.string(),
  }),
})
