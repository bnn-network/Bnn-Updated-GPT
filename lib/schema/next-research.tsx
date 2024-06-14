import { DeepPartial } from 'ai'
import { z } from 'zod'

export const nextResearchSchema = z.object({
  next: z.enum(['chat', 'search', 'retrieve']),
  url: z.string().url().optional().describe('URL to retrieve information from'),
  query: z.string().optional().describe('Article like Query to search from')
})

export type NextAction = DeepPartial<typeof nextResearchSchema>
