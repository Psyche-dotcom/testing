import * as AiIcons from 'react-icons/ai';

const BtnShow: React.FC = () => {
  return (
    <button className='btn-show'>
      <div className='btn-show__content'>
        <span className='title'>Hide</span>
        <span className='btn-show__eye'>
          <AiIcons.AiOutlineEye />
        </span>
      </div>
    </button>
  );
};

export default BtnShow;
