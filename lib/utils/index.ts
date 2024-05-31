import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import {  createOpenAI} from '@ai-sdk/openai'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getModel() {
  const openai = createOpenAI({
    baseUrl: process.env.OPENAI_API_BASE, // optional base URL for proxies etc.
    apiKey: process.env.OPENAI_API_KEY // optional API key, default to env property OPENAI_API_KEY
  })
  return openai(process.env.OPENAI_API_MODEL || 'gpt-4o')
}
export function groqModel() {
  const groq = createOpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: process.env.GROQ_API_KEY
  })

  return groq('llama3-8b-8192')
}
