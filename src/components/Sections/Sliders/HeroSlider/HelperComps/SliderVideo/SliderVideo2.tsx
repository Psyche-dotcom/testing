import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import videojs from "video.js";
import Styles from "./SliderVideo.module.scss";
const SliderVideo2: React.FC<{
  section: any;
  item: any;
  isActive?: boolean;
  index: number;
  mute: boolean;
  url: string;
  swiper: any;
}> = ({ section, isActive, index, url, mute, swiper }) => {
  const videoRef = useRef(null);
  useEffect(() => {
    try {
      if (isActive) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    } catch (e) { }
  }, [isActive]);
  return (
    <div data-vjs-player>
      <video
        id="my-player"
        ref={videoRef}
        className={Styles.video}
        autoPlay={true}
        muted={true}
        playsInline={true}
        controls
        onEnded={(e) => {
          swiper.slideNext();
        }}
      >
        <source src={url} type={"video/mp4"}></source>
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default SliderVideo2;
