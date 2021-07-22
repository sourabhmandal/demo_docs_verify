import Select from 'react-select';
import DropZone from './DropZone';
import React from 'react';
import { useToasts } from 'react-toast-notifications';
import Loader from './Loader';

const options = [{ value: 'aadhar', label: 'Aadhar Card' }];

function App() {
  const { addToast } = useToasts();
  const [card_type, setcard_type] = React.useState('aadhar');
  const [file, setfile] = React.useState([]);
  const [response, setresponse] = React.useState('');
  const [pic, setpic] = React.useState('data:image/png;base64,');
  const [tabNos, settabNos] = React.useState(0);
  const [reqSent, setreqSent] = React.useState(false);

  const activeTabClass =
    'bg-white inline-block bg-purple-100 border-l border-t border-r rounded-t py-2 px-14 text-blue-dark font-semibold';
  const hiddenTabClass =
    'bg-white inline-block py-2 px-14 text-blue hover:text-blue-darker font-semibold';

  // execute when Submit button is clicked
  const handleClick = () => {
    //clear response data
    setreqSent(true);
    setresponse('');
    setpic('data:image/png;base64, ');
    settabNos(1);
    setcard_type(null);

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
      addToast('Requesting Server for Response', {
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

    fetch('https://app.axiomprotect.com:7877/similarity_check', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        addToast(`(${result.header}) Response Recieved`, {
          appearance: 'success',
          autoDismiss: true,
        });
        try {
          result = JSON.parse(result);
          if (result['error code'] === 0) {
            setpic((prev) => prev + result.d_skew_image);
            setresponse({
              blurriness: result.blurriness,
              errorCode: result['error code'],
              similarity: result.similarity,
            });
          }
        } catch (error) {
          // Error 😨
          setTimeout(() => {
            if (error.response) {
              /*
               * The request was made and the server responded with a
               * status code that falls out of the range of 2xx
               */
              addToast(`${error.response.status} A Server Error has Occured`, {
                appearance: 'error',
                autoDismiss: true,
              });
            } else if (error.request) {
              addToast(`${error.response.status} No response from Server`, {
                appearance: 'error',
                autoDismiss: true,
              });
            } else {
              // Something happened in setting up the request and triggered an Error
              console.log('Error', error.message);
              addToast(`Server Error Occured`, {
                appearance: 'error',
                autoDismiss: true,
              });
            }
            setresponse('');
            setpic('data:image/png;base64, ');
            setfile([]);
            setreqSent(false);
            setcard_type('');
          }, 5000);

          console.log(error);
        }
      })
      .catch((error) => {
        // Error 😨
        setTimeout(() => {
          if (error.response) {
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */
            addToast(`${error.response.status} A Server Error has Occured`, {
              appearance: 'error',
              autoDismiss: true,
            });
          } else if (error.request) {
            addToast(`${error.response.status} No response from Server`, {
              appearance: 'error',
              autoDismiss: true,
            });
          } else {
            // Something happened in setting up the request and triggered an Error
            console.log('Error', error.message);
            addToast(`Server Error Occured`, {
              appearance: 'error',
              autoDismiss: true,
            });
          }
          setresponse('');
          setpic('data:image/png;base64, ');
          setfile([]);
          setreqSent(false);
          setcard_type('');
        });
      });
  };

  return (
    <div className='lg:mx-40 md:mx-32 sm:mx-5 mx-0 my-20'>
      <div className='text-center text-6xl my-16 text-purple-500'>
        AI Document Check Demo
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
          <div className='flex'>
            <button
              onClick={handleClick}
              className='w-full mr-2 block text-center py-2 hover:bg-purple-600 bg-purple-500 text-xl font-bold text-white rounded-lg'
            >
              Submit
            </button>
            <button
              onClick={() => {
                setresponse('');
                setpic('data:image/png;base64, ');
                setfile([]);
                setreqSent(false);
                setcard_type('');
              }}
              className='w-full mr-2 block text-center py-2 hover:bg-gray-600 bg-gray-400 text-xl font-bold text-white rounded-lg'
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/*Tab 2*/}
      <div className={tabNos === 0 ? ' w-full hidden' : ' w-full'}>
        <br />
        <br />
        {response === '' ? (
          reqSent ? (
            <div className='flex h-full bg-blue-50 w-full'>
              <Loader />
            </div>
          ) : (
            <div className='flex h-full bg-blue-50 w-full justify-center text-center align-center'>
              <h2 className='text-gray-500 text-xl py-48'>
                Please make an API call
              </h2>
            </div>
          )
        ) : (
          <div className='block lg:flex w-full h-full'>
            <div className='lg:w-1/2 bg-green-100 h-full'>
              <img className='h-96 mx-auto' src={pic} alt='' />
            </div>
            <div className='lg:w-1/2'>
              <div className='text-left text-xl h-full bg-blue-50 w-full text-center p-10'>
                <div className='w-full h-full'>
                  <pre className='text-left h-full overflow-clip bg-blue-50'>
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
            setfile([]);
            setreqSent(false);
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
