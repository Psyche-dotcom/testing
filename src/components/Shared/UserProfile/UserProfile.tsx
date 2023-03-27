import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { expandAccountMenu } from 'src/redux/createSlice/createMenuSlice';

const UserProfile: React.FC<{
  className?: string;
  section?: 'edit' | 'hero';
}> = ({ className, section }) => {
  const [notification, setNotification] = useState<number>(50);
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => dispatch(expandAccountMenu())}
      className={`btn-profile ${section === 'edit' && 'btn-profile__edit'} `}
    >
      <button>
        <img src='/assets/vreel-profile.png' alt='Profile-Icon' />
        {/* <span className={`notifications  `}>
          {notification > 990 ? '999+' : notification}
        </span> */}
      </button>
    </div>
  );
};

export default UserProfile;
