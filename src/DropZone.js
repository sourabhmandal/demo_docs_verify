import React, { useEffect } from 'react';
// Import the useDropzone hooks from react-dropzone
import { useDropzone } from 'react-dropzone';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  textAlign: 'center',
  alignItems: 'center',
  marginRight: 'auto',
  marginLeft: 'auto',
  marginTop: 16,
};

const thumb = {
  display: 'flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 'auto',
  height: '0',
  textAlign: 'center',
  marginLeft: 'auto',
  padding: 4,
  boxSizing: 'border-box',
  alignItems: 'center',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  marginTop: 50,
  height: 300,
};

const DropZone = ({ onDrop, accept, file, setfile }) => {
  // Initializing useDropzone hooks with options
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      accept: 'image/*',
      multiple: false,
      onDrop: (acceptedFiles) => {
        setfile(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });

  const thumbs = file.map((f) => (
    <div style={thumb} key={f.name}>
      <div style={thumbInner}>
        <img src={f.preview} style={img} alt='' />
      </div>
    </div>
  ));

  /* 
    useDropzone hooks exposes two functions called getRootProps and getInputProps
    and also exposes isDragActive boolean
  */
  // console.log(acceptedFiles);
  useEffect(() => {
    // setfile(acceptedFiles.map((el) => el.path));
    file.forEach((file) => URL.revokeObjectURL(file.preview));

    return () => {};
  }, [acceptedFiles]);

  return (
    <div className='w-full'>
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

        <div className='text-center text-3xl text-purple-400 h-28'>
          {isDragActive ? (
            <p className='dropzone-content'>Release to drop the files here</p>
          ) : file.length === 0 ? (
            <p className='dropzone-content text-3xl text-gray-400'>
              Drag 'n' drop some files here, or click to select files
            </p>
          ) : (
            <aside style={thumbsContainer}>{thumbs}</aside>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropZone;
