import React, { useRef, useState } from "react";

const Video = () => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const videoPress = () => {
    if (playing) {
      // videoRef.current.pause();
      setPlaying(false);
      videoRef.current.pause();

    } else {
      videoRef.current.play();
      // setPlaying(true);
    }
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <button
        onClick={videoPress}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          background: "rgba(255,255,255,.75)",
          padding: "1rem",
          fontSize: "1rem",
          cursor: "pointer",
          zIndex: "1",
        }}
      >
        {!playing ? "Start" : "Stop"}
      </button>

      <video
        // poster='/assets/images/man.svg'
        ref={videoRef}
        autoPlay={playing}
        loop
        muted
        playsInline
        src="https://res.cloudinary.com/klwebco/video/upload/v1655863954/samples/aiexplainer_optimized_o24q3q.mp4"
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
        }}
      ></video>
    </div>
  );
};

export default Video;
