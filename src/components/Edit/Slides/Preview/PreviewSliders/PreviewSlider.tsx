import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import Styles from "./PreviewSlider.module.scss";

import { RootState } from "@redux/store/store";
import useWindowDimensions from "@hooks/useWindowDimensions";
import UserProfile from "@shared/UserProfile/UserProfile";
import ReactPlayer from "react-player";
import PreviewContent from "../PreviewContent/PreviewContent";

const PreviewSlider = ({
  swiper,
  currentSlide,
  slide,
  slideId,
  index,
  mute,
  setMute,
  playing,
  setPlaying,
}): JSX.Element => {
  const [cookies] = useCookies(["userAuthToken"]);
  const userAuthenticated = useSelector(
    (state: RootState) => state.userAuth.userAuthenticated
  );

  const router = useRouter();
  const { advanced, cta1, cta2, desktop, mobile, title } = slide;
  const { height, width } = useWindowDimensions();
  const isMobile = width < 500;
  const item = isMobile ? mobile : desktop;
  const isImage = item?.content_type === "image";
  const { username, section, employee } = router?.query;
  const videoRef = useRef(null);

  return (
    <div className={Styles.heroSlide}>
      {/* USER PROFILE */}
      {/* {cookies.userAuthToken && userAuthenticated && (
        <div className={Styles.previewProfile}>
          <UserProfile />
        </div>
      )} */}

      {/* SLIDER MEDIA */}
      {
        <div className={Styles.media}>
          {isImage ? (
            <>
              <img
                className={Styles.image}
                src={item?.uri}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              {slide?.background_audio_uri && !mute && currentSlide == index && (
                <ReactPlayer
                  playing={true}
                  muted={mute}
                  url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
                  //   url="/assets/videos/test-video-3.mp4"
                  playsinline={true}
                  // stopOnUnmount={true}
                  onPlay={() => {
                    swiper.autoplay.stop();
                  }}
                  onEnded={() => {
                    swiper.slideNext();
                  }}
                  config={{
                    file: {
                      attributes: {
                        autoPlay: true,
                        playsInline: true,
                        muted: mute,
                        type: "video",
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
                />
              )}
            </>
          ) : (
            <>
              <ReactPlayer
                ref={videoRef}
                playing={currentSlide == index && playing}
                muted={mute}
                url={
                  item?.uri
                    ? `/assets/videos${item?.uri}`
                    : "/assets/videos/test-video-2.mp4"
                }
                //   url="/assets/videos/test-video-3.mp4" // currentSlide == index
                playsinline={true}
                // stopOnUnmount={true}
                pip={false}
                onPlay={() => {
                  swiper.autoplay.stop();
                }}
                onPause={() => {
                  if (currentSlide != index) videoRef.current.seekTo(0);
                }}
                onEnded={() => {
                  swiper.slideNext();
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
              />
            </>
          )}
          {/* SLIDER CONTENT */}
          <PreviewContent
            item={slide}
            playing={playing}
            setPlaying={setPlaying}
            mute={mute}
            setMute={setMute}
            isImage={isImage}
          />
        </div>
      }
    </div>
  );
};

export default PreviewSlider;
