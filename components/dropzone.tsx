'use client'

import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

function MyDropzone() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg'],
      'image/png': ['.png'],
      'image/jpg': ['.jpg'],
      'file/pdf': ['.pdf']
    }
  })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  )
}
export default MyDropzone
