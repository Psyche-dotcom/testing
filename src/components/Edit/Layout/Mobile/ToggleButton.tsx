import { useRouter } from 'next/router';
import { useState } from 'react';

const ToggleButton: React.FC = () => {
  const [buttonState, setButtonState] = useState<boolean>(false);
  const router = useRouter();
  return (
    <div className='btn-toggle'>
      <div
        onClick={() => {
          setButtonState(!buttonState);
          router.push('/');
        }}
        className='btn-toggle__wrapper'
      >
        <button
          className={
            buttonState
              ? 'btn-toggle__wrapper__active'
              : 'btn-toggle__wrapper__inactive'
          }
        >
          View
        </button>
        <button
          className={
            !buttonState
              ? 'btn-toggle__wrapper__active'
              : 'btn-toggle__wrapper__inactive'
          }
        >
          Edit
        </button>
      </div>
      <p className='text'>Toggle To View VReel</p>
    </div>
  );
};

export default ToggleButton;
