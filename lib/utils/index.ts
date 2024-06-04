import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { createOpenAI } from '@ai-sdk/openai'
import Groq from 'groq-sdk'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export function gpt4oModel() {
//   const openai = createOpenAI({
//     baseUrl: process.env.OPENAI_API_BASE, // optional base URL for proxies etc.
//     apiKey: process.env.OPENAI_API_KEY // optional API key, default to env property OPENAI_API_KEY
//   })
//   return openai(process.env.OPENAI_API_MODEL || 'gpt-4o')
// }
export function groq8bModel() {
  const groq = createOpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: process.env.GROQ_API_KEY
  })

  return groq('llama3-8b-8192')
}
// export function gptturboModel() {
//   const openai = createOpenAI({
//     baseUrl: process.env.OPENAI_API_BASE,
//     apiKey: process.env.OPENAI_API_KEY
//   })
//   return openai('gpt-3.5-turbo')
// }

export function openAIInstance(selectedModel: string) {
  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })
  return openai(selectedModel)
}

export function groqInstance() {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
  })
  return groq
}

export function groq7bModel(){
  const groq = createOpenAI({
    baseURL:'https://api.groq.com/openai/v1',
    apiKey:process.env.GROQ_API_KEY
  })
  return groq('llama3-70b-8192')
}
