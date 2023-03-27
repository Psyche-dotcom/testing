import React, { useEffect, useRef, useState } from "react";
import Styles from "./SliderVideo.module.scss";
import PropTypes from "prop-types";
import videojs from "video.js";
import dynamic from "next/dynamic";
// const dashjs = dynamic(() => import("dashjs"), {
//   ssr: false,
// });

// eslint-disable-next-line import/prefer-default-export
const usePlayer = ({ src, controls, autoplay, muted }) => {
  const options = {
    fill: true,
    fluid: true,
    preload: "auto",

    html5: {
      hls: {
        enableLowInitialPlaylist: true,
        smoothQualityChange: true,
        overrideNative: true,
      },
    },
  };
  const videoRef = useRef(null);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const vjsPlayer = videojs(videoRef.current, {
      ...options,
      controls,
      autoplay,
      muted,
      sources: [src],
    });
    setPlayer(vjsPlayer);

    return () => {
      if (player !== null) {
        player.dispose();
      }
    };
  }, []);
  useEffect(() => {
    if (player !== null) {
      player.src({ src });
    }
  }, [src]);

  return videoRef;
};

const VideoPlayer = ({ src, controls, autoplay, muted }) => {
  const playerRef = usePlayer({ src, controls, autoplay, muted });

  return (
    <div data-vjs-player>
      <video
        id="my-player"
        ref={playerRef}
        data-setup='{"liveui": true}'
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  controls: PropTypes.bool,
  autoplay: PropTypes.bool,
};

VideoPlayer.defaultProps = {
  controls: true,
  autoplay: false,
};

export default VideoPlayer;
