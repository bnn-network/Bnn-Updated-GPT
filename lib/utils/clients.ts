import OpenAI from 'openai'
import { createClient } from '@supabase/supabase-js'

export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export const supabase =  createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)
