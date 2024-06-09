import { DeepPartial } from 'ai'
import { z } from 'zod'

export const nextResearchSchema = z.object({
  next: z.enum(['chat', 'search', 'retrieve']),
  url: z.string().url().optional().describe('URL to retrieve information from'),
  query: z.string().optional().describe('Query to search for information from the web')
})

export type NextAction = DeepPartial<typeof nextResearchSchema>
