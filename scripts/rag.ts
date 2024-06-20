import dotenv from 'dotenv'
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory'
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf'
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters'
import { createClient } from '@supabase/supabase-js'

import OpenAI from 'openai'
dotenv.config()

 const openai = new OpenAI()

 const supabase =  createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)


dotenv.config()
const title = 'Beyond good and evil by Friedrich Nietzsche'

const testRAG = async () => {
  const directoryLoader = new DirectoryLoader('public', {
    '.pdf': (path: string) => new PDFLoader(path)
  })
  let count: number = 0
  const docs = await directoryLoader.load()

  /* Additional steps : Split text into chunks with any TextSplitter. You can then use it as context or save it to memory afterwards. */
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 3000,
    chunkOverlap: 300
  })

  const splitDocs = await textSplitter.splitDocuments(docs)
  if (splitDocs.length > 10) {
    const doc = splitDocs[10];
    console.log(doc,'10th doc')
    
    const context = doc.pageContent;
    const embedding = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: context
    });
  
    const { data, error } = await supabase.from('bnn_documents').insert({
      title,
      content: doc.pageContent,
      embedding: embedding.data[0].embedding
    });
    console.log(data)
    count += 1;
  }
 
}

testRAG()
