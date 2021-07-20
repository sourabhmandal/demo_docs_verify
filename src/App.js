import Select from 'react-select';
import DropZone from './DropZone';
import React from 'react';
import { useToasts } from 'react-toast-notifications';
import Loader from './Loader';

const options = [
  { value: 'passport', label: 'Passport' },
  { value: 'aadhar', label: 'Aadhar Card' },
  { value: 'malaysian_id', label: 'Malaysian ID card' },
  { value: 'mongolian', label: 'Mongolian ID card' },
];

function App() {
  const { addToast } = useToasts();
  const [card_type, setcard_type] = React.useState(null);
  const [file, setfile] = React.useState([]);
  const [response, setresponse] = React.useState('');
  const [pic, setpic] = React.useState('data:image/png;base64,');
  const [tabNos, settabNos] = React.useState(0);

  const activeTabClass =
    'bg-white inline-block bg-purple-100 border-l border-t border-r rounded-t py-2 px-14 text-blue-dark font-semibold';
  const hiddenTabClass =
    'bg-white inline-block py-2 px-14 text-blue hover:text-blue-darker font-semibold';

  // execute when Submit button is clicked
  const handleClick = () => {
    //clear response data
    setresponse('');
    setpic('data:image/png;base64, ');

    // do some validations
    // make sure adequate data is provided

    // This is for not adding an image file in dropzone
    if (file == null || file === '') {
      addToast('Please add an image file', {
        appearance: 'error',
        autoDismiss: true,
      });

      // This is for not selecting the card type
    } else if (card_type == null || card_type === '') {
      addToast('Please select a card type before procceding', {
        appearance: 'error',
        autoDismiss: true,
      });

      // this is if all checks pass
    } else {
      addToast('Data Sent to Backend', {
        appearance: 'success',
        autoDismiss: true,
      });
    }

    var formdata = new FormData();
    formdata.append('image', file[0], file[0].name);
    formdata.append('doc_name', 'adhaar');

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch('http://demo.axiomprotect.com:7875/similarity_check', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        result = JSON.parse(result);

        if (result['error code'] === 0) {
          setpic((prev) => prev + result.d_skew_image);
          setresponse({
            blurriness: result.blurriness,
            errorCode: result['error code'],
            similarity: result.similarity,
          });
        } else return;
      })
      .catch((error) => console.log('error', error));
  };

  return (
    <div className='xl:mx-80 lg:mx-64 md:mx-32 sm:mx-5 mx-0 my-20'>
      <div className='text-center text-6xl my-16 text-purple-500'>
        AI Document Verify Demo
      </div>
      <ul className='flex border-b'>
        <li className=''>
          <button
            className={tabNos === 0 ? activeTabClass : hiddenTabClass}
            onClick={() => settabNos(0)}
          >
            API call
          </button>
        </li>
        <li className=''>
          <button
            className={tabNos === 1 ? activeTabClass : hiddenTabClass}
            onClick={() => settabNos(1)}
          >
            Response
          </button>
        </li>
      </ul>

      {/*Tab 1*/}
      <div
        className={
          tabNos === 1
            ? 'flex align-center justify-center w-full hidden'
            : 'flex align-center justify-center w-full'
        }
      >
        <div className='text-center w-full'>
          <br />
          <br />
          <DropZone file={file} setfile={setfile} />

          <Select
            options={options}
            onChange={(data) => {
              setcard_type(data.value);
            }}
            className='my-8'
            placeholder='Select ID Card Type'
          />
          <button
            onClick={handleClick}
            className='w-full mr-2 block text-center py-2 hover:bg-purple-600 bg-purple-500 text-xl font-bold text-white rounded-lg'
          >
            Submit
          </button>
        </div>
      </div>

      {/*Tab 2*/}
      <div className={tabNos === 0 ? 'h-96 w-full hidden' : 'h-96 w-full'}>
        <br />
        <br />
        {response === '' ? (
          <div className='flex h-96 bg-blue-50 w-full'>
            <Loader />
          </div>
        ) : (
          <div className='flex w-full h-full'>
            <div className='w-1/2 bg-green-100 h-full'>
              <img className='h-full' src={pic} alt='' />
            </div>
            <div className='w-1/2 h-full'>
              <div className='text-left text-2xl bg-blue-50 min-h-full w-full text-center p-10'>
                <div className='w-full h-full'>
                  <pre className='text-left'>
                    {JSON.stringify(response, 3, '  ')}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
        <button
          onClick={() => {
            setresponse('');
            setpic('data:image/png;base64, ');
          }}
          className='w-full mt-5 mr-2 block text-center py-2 hover:bg-purple-600 bg-purple-500 text-xl font-bold text-white rounded-lg'
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default App;
