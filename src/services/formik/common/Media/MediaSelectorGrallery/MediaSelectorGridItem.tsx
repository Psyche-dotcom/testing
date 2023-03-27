import React, { useMemo, useState } from 'react';
import ReactPlayer from 'react-player';
import { useOuterClick } from '../../../../../hooks/useOuterClick';
import { RootState, useAppDispatch } from 'src/redux/store/store';
import Styles from './MediaSelectorGridItem.module.scss';
import clsx from 'clsx';

type Props = {
  item: any;
  setItem: Function;
  setOpen: Function;
};

const MediaSelectorGridItem = ({ item, setItem, setOpen }: Props) => {
  const dispatch = useAppDispatch();
  
  const thumbnail = useMemo(() => {
    let thumbnail;
    if(item.file_type.split('/')[0] == 'video') {
      let poster: any = item.uri.split("media.m3u8");
      poster[1] = "poster.webp";
      poster = poster.join("");
      thumbnail = poster
    }else {
      thumbnail = item.uri;
    }
    return thumbnail;
  }, [])
  const [pause, setPause] = useState(false);

  const innerRef = useOuterClick(() => {
    // setOpen(false);
  });

  return (
    <div className={clsx(Styles.viewImageContainer)}>
      <div
        onClick={() => {
          setItem(item);
          setOpen(false)
        }}
      >
        <div className={Styles.viewImage}>

            <img src={`${thumbnail}`} alt='Video' />
            {/* // <img src={item.uri} alt="" /> */}
         
        </div>
      </div>
      <div className={Styles.playIcons}>
        {item.file_type.split('/')[0] == 'video' && (
          <button ref={innerRef} onClick={() => setPause(!pause)}>
            <img src='/assets/icons/play-one.svg' alt='Play Icon' />
          </button>
        )}
        <span>{item.file_name}</span>
      </div>
    </div>
  );
};

export default MediaSelectorGridItem;
