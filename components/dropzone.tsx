'use client'

import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { CloudUpload } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";

function MyDropzone() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [FileUpload, setFile] = useState<File | null>(null)
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    acceptedFiles.forEach(async file => {
      setFile(file)
      setIsUploading(true)
      console

      try {
        // Convert File to Blob
        const blob = new Blob([file], { type: file.type })

        // Use PDFLoader to load the PDF
        const loader = new WebPDFLoader(blob)
        const docs = await loader.load()

        // Use RecursiveCharacterTextSplitter to split the document
        const splitter = new RecursiveCharacterTextSplitter({
          chunkSize: 3000,
          chunkOverlap: 200
        })

        const chunks = await splitter.splitDocuments(docs)

        // Log the chunks
        console.log('Chunks:', chunks)

        // Simulate upload progress
        let progress = 0
        const interval = setInterval(() => {
          progress += 10
          setUploadProgress(progress)
          if (progress >= 100) {
            clearInterval(interval)
            setIsUploading(false)
          }
        }, 200)
      } catch (error) {
        console.error('Error processing PDF:', error)
        setIsUploading(false)
      }
    })
  }, [])
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      accept: {
        'file/pdf': ['.pdf'],
        'file/doc': ['.doc'],
        'file/docx': ['.docx'],
        'file/txt': ['.txt']
      },
      maxFiles: 1,
      maxSize: 5242880,
      multiple: false
    })

  return (
    <div
      className="border-primary p-4  bg-primary-foreground rounded-xl"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <div className="  px-24  cursor-pointer flex flex-col text-primary items-center ">
          <CloudUpload className="w-12 h-12 text-muted-foreground animate-pulse" />
          <p className="text-center  break-words text-sm animate-pulse">
            Drop the file here
          </p>
        </div>
      ) : (
        <>
          {FileUpload ? (
            <>
              <div className="  px-24  cursor-pointer flex flex-col text-primary items-center ">
                <CloudUpload className="w-12 h-12 text-muted-foreground " />
                <p className="text-center  break-words text-sm ">
                  {acceptedFiles[0].name}
                </p>
              </div>
              {isUploading && (
                <div className="w-full mt-6 ">
                  <Progress
                    value={uploadProgress}
                    color="primary"
                    className="w-full h-2  text-primary  "
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <div className="  px-24  cursor-pointer flex flex-col text-primary items-center ">
                <CloudUpload className="w-12 h-12 text-muted-foreground animate-pulse" />
                <p className="text-center  break-words text-sm animate-pulse">
                  Upload file
                </p>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
export default MyDropzone
