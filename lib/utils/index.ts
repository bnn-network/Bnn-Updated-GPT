import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { createOpenAI } from '@ai-sdk/openai'
import { ChatFireworks } from '@langchain/community/chat_models/fireworks'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function groq8bModel() {
  const groq = createOpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: process.env.GROQ_API_KEY
  })

  return groq('llama3-8b-8192')
}

export function openAIInstance(selectedModel: string) {
  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })
  return openai(selectedModel)
}

export function fireworks70bModel() {
  const fireworks = createOpenAI({
    apiKey: process.env.FIREWORKS_API_KEY,
    baseURL: 'https://api.fireworks.ai/inference/v1'
  })
  return fireworks('accounts/fireworks/models/llama-v3-70b-instruct')
}

export function fireworks70bLangchainModel() {
  const fireworks = new ChatFireworks({
    apiKey: process.env.FIREWORKS_API_KEY,
    model: 'accounts/fireworks/models/llama-v3-70b-instruct',
    temperature: 0.1
  })
  return fireworks
}
export function fireworks72bModel() {
  const fireworks = createOpenAI({
    apiKey: process.env.FIREWORKS_API_KEY,
    baseURL: 'https://api.fireworks.ai/inference/v1'
  })
  return fireworks('accounts/fireworks/models/qwen2-72b-instruct')
}

export function Capy() {
  const fireworks = createOpenAI({
    apiKey: process.env.FIREWORKS_API_KEY,
    baseURL: 'https://api.fireworks.ai/inference/v1'
  })
  return fireworks('accounts/fireworks/models/yi-34b-200k-capybara')
}

export function fireworksMistral8x22Model() {
  const fireworks = createOpenAI({
    apiKey: process.env.FIREWORKS_API_KEY,
    baseURL: 'https://api.fireworks.ai/inference/v1'
  })
  return fireworks('accounts/fireworks/models/mixtral-8x22b-instruct')
}

export function fireworksMistral8x7bModel() {
  const fireworks = createOpenAI({
    apiKey: process.env.FIREWORKS_API_KEY,
    baseURL: 'https://api.fireworks.ai/inference/v1'
  })
  return fireworks('accounts/fireworks/models/mixtral-8x7b-instruct')
}

export function deepinfra8bModel() {
  const deepinfra = createOpenAI({
    apiKey: process.env.DEEPINFRA_API_KEY,
    baseURL: 'https://api.deepinfra.com/v1/openai'
  })
  return deepinfra('meta-llama/Meta-Llama-3-8B-Instruct')
}

export function groq7bModel() {
  const groq = createOpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: process.env.GROQ_API_KEY
  })
  return groq('llama3-70b-8192')
}
