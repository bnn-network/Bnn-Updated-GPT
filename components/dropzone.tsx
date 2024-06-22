'use client'

import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { CloudUpload } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

function MyDropzone() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [FileUpload, setFile] = useState<File | null>(null)
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader()
      setFile(file)

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
        let progress = 0
        const interval = setInterval(() => {
          progress += 10
          setUploadProgress(progress)
          if (progress >= 100) {
            clearInterval(interval)
            setIsUploading(false)
          }
        }, 200)
      }
      reader.readAsArrayBuffer(file)
    })
  }, [])
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      accept: {
        'image/jpeg': ['.jpg'],
        'image/png': ['.png'],
        'image/jpg': ['.jpg'],
        'file/pdf': ['.pdf']
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
