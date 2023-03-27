import * as AiIcons from 'react-icons/ai';

const BtnHide: React.FC = () => {
  return (
    <button className='btn-hide'>
      <div className='btn-hide__content'>
        <span className='btn-hide__eye'>
          <AiIcons.AiOutlineEyeInvisible />
        </span>
        <span className='title'>Show</span>
      </div>
    </button>
  );
};

export default BtnHide;
