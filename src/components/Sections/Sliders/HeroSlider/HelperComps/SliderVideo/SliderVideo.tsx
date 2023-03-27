import useDidMountEffect from "@hooks/useDidMountEffect";
import { RootState } from "@redux/store/store";
import Hls from "hls.js";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import controller from "src/controller";
import GalleryModule from "src/controller/modules/gallery.mod";
import { Slide } from "src/controller/types";
import { useSwiperSlide } from "swiper/react";

const SliderVideo: React.FC<{
  section: any;
  item: any;
  isActive: boolean;
  index: number;
  mute: boolean;
  url: string;
  swiper?: any;
  playing: boolean;
  setProgress?: Function;
  sliderPlay?: boolean;
  autoPlay: any;
  muteAudio: any;
  playAudio: any;
  setAutoPlay: any;
  slide: Slide;
}> = ({
  section,
  isActive,
  index,
  url,
  mute,
  swiper,
  playing,
  setProgress,
  setAutoPlay,
  sliderPlay,
  autoPlay,
  playAudio,
  muteAudio,
  slide,
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const mobile = controller.state.mobile;
    const { start_time, stop_time } = slide[mobile ? "mobile" : "desktop"];
    const [hls] = useState<Hls>(Hls.isSupported() ?
      new Hls({
        capLevelToPlayerSize: true,
        maxBufferSize: 30,
        maxBufferLength: 5
      })
      : null
    );

    useEffect(() => {
      if (hls) {
        hls.attachMedia(videoRef.current);
      }
    }, [hls])

    function playVideo() {
      videoRef.current.play();
    }


    const handleSignal = useCallback(({ type, data }) => {
      const hlsRegistered = Hls.isSupported() ? hls !== null : true
      if (!videoRef.current || !hlsRegistered) return;
      switch (type) {
        case "set-src":
          if (hls) {
            hls.loadSource(data);
            hls.startLoad()
          } else {
            videoRef.current.src = data
          };

          break
        case "pause":
          videoRef.current.pause()
          break
        case "play":
          playVideo()

          break;
        case "poster":
          videoRef.current.poster = data;
          break;
        case "set-muted":
          if (slide.muted) return;
          videoRef.current.muted = data;
          break;
        case "loop":
          videoRef.current.loop = data;
        case "deque":
          deque();
        default:
      }
    }, [hls, videoRef])



    const gallery = controller.getSection<GalleryModule>(slide.modId);
    function handleVideoEnd() {
      gallery.onVideoEnded(slide.id);
    }


    function deque() {
      const currentTime = videoRef.current.currentTime;
      videoRef.current.currentTime = 0;
      videoRef.current.currentTime = currentTime;

    }

    function onMetadataLoaded() {
      if (!start_time || start_time === 0) return;
      videoRef.current.currentTime = start_time;
    }

    function onTimeUpdate() {
      if (!videoRef.current) return;
      const completionPercentage = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      gallery.updateVideoCompletionPercent(completionPercentage)
      if (!stop_time || stop_time === 0) return;
      console.log(this.currentTime);
      if (this.currentTime >= stop_time) {
        handleVideoEnd()
      }

    }

    useEffect(() => {
      videoRef.current.addEventListener("loadedmetadata", onMetadataLoaded);

      videoRef.current.ontimeupdate = onTimeUpdate;
      return () => {
        videoRef?.current?.removeEventListener("loadedmetadata", onMetadataLoaded)
      }

    }, [])


    useEffect(() => {
      if (videoRef.current) {

        gallery
          .registerVideo(handleSignal, slide.id);
      }
      return () => {
        // gallery.removeVideoFromRegister(slide.id)
      };
    }, [videoRef.current]);
    return (
      <>

        <video muted ref={videoRef}
          onEnded={handleVideoEnd}
          id={`@video-${slide.id}`}
          playsInline controls={false}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -2,
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />


        {/* <ReactPlayer
          ref={videoRef}
          // playing={true}
          playing={isActive && playing}
          // volume={mute ? 0 : 1}
          loop={!autoPlay ? true : (!sliderPlay)}
          // loop={false}
          muted={mute}
          autoPlay
          url={url}
          //   url="/assets/videos/test-video-3.mp4" // isActive == index
          playsinline={true}
          // stopOnUnmount={true}
          pip={false}
          onSeek={() => { }}
          onReady={() => { }}
          onPlay={() => {
            swiper.autoplay.stop();
            if (mute) {
              // muteAudio();
            }
          }}
          onStart={() => { }}
          onProgress={({ played }) => {
            // (played);
            setProgress && setProgress(played);
          }}
          onPause={() => {
            if (!isActive) videoRef.current.seekTo(0);
          }}
          onEnded={() => {
            if (sliderPlay && !(QROpen || shareOpen)) {
              if (autoPlay) {
                swiper.slideNext();
                swiper.autoplay.start();
              }
            } else {
            }
            if (isActive) videoRef.current.seekTo(0);
          }}
          config={{
            file: {
              attributes: {
                style: {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: -2,
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                },
              },
            },
          }}
        /> */}
      </>
    );
  };

export default SliderVideo;
// export default SliderVideo;
