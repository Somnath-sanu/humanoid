import { z } from 'zod'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { toolDefinition } from '@tanstack/ai'

const gf = new GiphyFetch(process.env.GIPHY_API_KEY!)

export const generateStickerDef = toolDefinition({
  name: 'generateSticker',
  description: 'Generate a sticker for better chat experience',
  inputSchema: z.object({
    searchQuery: z.string(),
  }),
  outputSchema: z.object({
    url: z.string(),
  }),
})

export const generateStickerServer = generateStickerDef.server(
  async ({ searchQuery }) => {
    const res = await gf.search(searchQuery, {
      limit: 1,
      type: 'stickers',
    })
    return {
      url: res.data[0].images.original.url,
    }
  },
)
