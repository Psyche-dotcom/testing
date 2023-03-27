import { type } from 'os';
import Styles from './ChildInput.module.scss';

const ChildInput: React.FC<{
  type: 'text' | 'textarea';
  placeholder: string;
  icon?: boolean;
}> = ({ placeholder, icon, type }) => {
  return (
    <div className={Styles.inputWrapper}>
      {type === 'text' ? (
        <input type='text' placeholder={placeholder} />
      ) : (
        <textarea placeholder={placeholder} rows={6} />
      )}
      {icon && <img src='/assets/ball-pen-line.svg' alt='Pen Icon' />}
    </div>
  );
};

export default ChildInput;
