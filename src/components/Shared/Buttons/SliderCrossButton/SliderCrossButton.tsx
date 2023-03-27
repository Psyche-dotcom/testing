import clsx from 'clsx';
import React from 'react';
import * as ImIcons from 'react-icons/im';
import Styles from './SliderCrossButton.module.scss';

const SliderCrossButton: React.FC<{
  method?: Function;
  position?: 'relative' | 'absolute' | 'static';
  top?: 1 | 2 | 3 | 4;
  bottom?: 1 | 2 | 3 | 4;
  left?: 1 | 2 | 3 | 4;
  right?: 1 | 2 | 3 | 4;
}> = ({ method, position, top, bottom, left, right }) => {
  return (
    <button
      style={{
        position: position,
        top: top + 'rem',
        bottom: bottom + 'rem',
        left: left + 'rem',
        right: right + 'rem',
      }}
      onClick={() => method()}
      className={clsx(Styles.cross__icon)}
    >
      <ImIcons.ImCross />
    </button>
  );
};

export default SliderCrossButton;
