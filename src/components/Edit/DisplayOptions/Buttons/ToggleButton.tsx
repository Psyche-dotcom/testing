import { useState } from 'react';
import clsx from 'clsx';
import Styles from './ToggleButton.module.scss';

const ToggleButton: React.FC = () => {
  const [active, setActive] = useState<boolean>(false);

  return (
    <div
      onClick={() => {
        setActive((active) => !active);
      }}
      className={Styles.toggleButton}
    >
      <button className={clsx(Styles.button, active && Styles.button_active)}>
        Ages <br />
        <span>21+</span>
      </button>
      <button className={clsx(Styles.button, !active && Styles.button_active)}>
        Restrict <br /> Content
      </button>
    </div>
  );
};

export default ToggleButton;
