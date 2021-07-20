import React from 'react';

function Loader() {
  return (
    <div className='flex justify-center align-center mx-auto my-auto'>
      <div className='flex'>
        <div
          class='bg-blue-300 p-2  w-4 h-4 rounded-full animate-bounce mr-2'
          style={{ animationDelay: '0.1s' }}
        ></div>
        <div
          class='bg-green-300 p-2 w-4 h-4 rounded-full animate-bounce mr-2'
          style={{ animationDelay: '0.2s' }}
        ></div>
        <div
          class='bg-red-300 p-2  w-4 h-4 rounded-full animate-bounce mr-2'
          style={{ animationDelay: '0.3s' }}
        ></div>
      </div>
    </div>
  );
}

export default Loader;
