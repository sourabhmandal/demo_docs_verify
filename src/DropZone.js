import React from 'react';
// Import the useDropzone hooks from react-dropzone
import { useDropzone } from 'react-dropzone';

const DropZone = ({ onDrop, accept, file, setfile }) => {
  // Initializing useDropzone hooks with options
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept,
    });

  console.log(acceptedFiles);

  /* 
    useDropzone hooks exposes two functions called getRootProps and getInputProps
    and also exposes isDragActive boolean
  */

  return (
    <div
      {...getRootProps()}
      className={
        isDragActive
          ? 'border-8 border-dashed border-gray-300 bg-gray-200 py-32 px-2'
          : 'border-8 border-dashed bg-gray-100 py-32 px-2'
      }
    >
      <input
        className={
          isDragActive
            ? 'border-4 border border-dashed bg-gray-100'
            : 'border-4 border border-dashed bg-purple-100'
        }
        {...getInputProps()}
      />
      <div className='text-center text-3xl text-purple-400'>
        {isDragActive ? (
          <p className='dropzone-content'>Release to drop the files here</p>
        ) : (
          <p className='dropzone-content text-3xl text-gray-400'>
            Drag 'n' drop some files here, or click to select files
          </p>
        )}
      </div>
    </div>
  );
};

export default DropZone;
