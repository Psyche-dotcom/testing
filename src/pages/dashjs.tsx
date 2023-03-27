import React from "react";
import videojs from "video.js";
import VREPlayer from "videojs-react-enhanced";
import "video.js/dist/video-js.css";
import VideoPlayer from "@sections/Sliders/HeroSlider/HelperComps/SliderVideo/VideoPlayer";
export default function DashJs() {
  const playerOptions: VREPlayer.IPlayerOptions = {
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    // controls: true,
    autoplay: "play",
  };
  const videojsOptions: VREPlayer.IVideoJsOptions = {
    fluid: true,
  };

  return (
    <VideoPlayer
      // src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      src="https://vreel-page.s3.amazonaws.com/The+Gucci+Pet+Collection-1080p_Trim.mp4"
      autoplay={true}
      // controls={false}
      muted={true}
    />
  );
}
