import { z } from 'zod'
import { toolDefinition } from '@tanstack/ai'
import textToSpeech from '@google-cloud/text-to-speech'
import { readFileSync } from 'node:fs'

const keyFile = JSON.parse(
  readFileSync(
    'C:/Users/somna/Downloads/humanoid_voice.json',
    'utf8',
  ),
)

const tts = new textToSpeech.TextToSpeechClient({
  credentials: {
    client_email: keyFile.client_email,
    private_key: keyFile.private_key,
  },
  projectId: keyFile.project_id,
})

export const googleTtsDef = toolDefinition({
  name: 'voiceMessage',
  description:
    'Convert text into speech using Google Cloud Text-to-Speech for voice message response.',
  inputSchema: z.object({
    text: z.string().min(1),
    languageCode: z.string().default('en-US'),
  }),
  outputSchema: z.object({
    audioUrl: z.string(),
  }),
})

export const googleTtsServer = googleTtsDef.server(
  async ({ text, languageCode }) => {
    const [response] = await tts.synthesizeSpeech({
      input: {
        text,
      },
      voice: {
        languageCode,
        ssmlGender: 'FEMALE',
        name: "achernar",
        modelName: "gemini-2.5-flash-preview-tts"
      },
      audioConfig: {
        audioEncoding: 'MP3' as const,
      },
    })

    const audioBuffer = response.audioContent as Buffer
    const audioUrl = `data:audio/mp3;base64,${audioBuffer.toString('base64')}`

    return { audioUrl }
  },
)
