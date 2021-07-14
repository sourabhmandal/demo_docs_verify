import Select from 'react-select';
import DropZone from './DropZone';
import React from 'react';
import { ToastProvider, useToasts } from 'react-toast-notifications';

const options = [
  { value: 'passport', label: 'Passport' },
  { value: 'aadhar', label: 'Aadhar Card' },
  { value: 'malaysian_id', label: 'Malaysian ID card' },
  { value: 'mongolian', label: 'Mongolian ID card' },
];

function App() {
  const { addToast } = useToasts();
  const [card_type, setcard_type] = React.useState(null);
  const [file, setfile] = React.useState(null);

  console.log(file);

  const handleClick = () => {
    if (card_type == null || card_type === '') {
      addToast('Please select a card type before procceding', {
        appearance: 'error',
        autoDismiss: true,
      });
    } else {
      addToast('Saved Successfully', {
        appearance: 'success',
        autoDismiss: true,
      });
    }
    if (card_type == null || card_type == '') {
      addToast('Please select a card type before procceding', {
        appearance: 'error',
        autoDismiss: true,
      });
    } else {
      addToast('Saved Successfully', {
        appearance: 'success',
        autoDismiss: true,
      });
    }
  };
  return (
    <div className='App flex align-center justify-center'>
      <div className='align-center text-center'>
        <h1 className=' text-6xl my-16 text-purple-500'>
          AI Document Verify Demo
        </h1>
        <DropZone file={file} setfile={setfile} />
        <Select
          options={options}
          onChange={(data) => {
            setcard_type(data.label);
          }}
          className='my-8'
          placeholder='Select ID Card Type'
        />
        <button
          onClick={handleClick}
          className='w-full block text-center py-2 hover:bg-purple-600 bg-purple-500 text-xl font-bold text-white rounded-lg'
        >
          Submit
        </button>

        <div className='w-full h-64 bg-gray-200 my-5'></div>
      </div>
    </div>
  );
}

export default App;
