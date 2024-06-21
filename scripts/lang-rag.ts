import { ChromaClient, OpenAIEmbeddingFunction } from 'chromadb'

const client = new ChromaClient({ path: 'http://localhost:8000' })

import dotenv from 'dotenv'
dotenv.config()

const embeddingFunction = new OpenAIEmbeddingFunction({
  openai_api_key: process.env.OPENAI_API_KEY!,
  openai_model: 'text-embedding-3-small'
})

const runChromaDb = async () => {
  const collection = await client.getOrCreateCollection({
    embeddingFunction: embeddingFunction,
    name: 'fruit-collection',
    metadata: { hnsw: 'cosine' }
  })
  

  const res = await collection.query({
    nResults:1,
    queryTexts:['apple and batman']
  })
  console.log(res)
}
runChromaDb()
