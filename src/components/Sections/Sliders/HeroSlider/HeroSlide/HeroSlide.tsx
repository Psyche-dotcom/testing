import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import ReactPlayer from "react-player";
import Styles from "./HeroSlide.module.scss";

import { RootState } from "@redux/store/store";
import useWindowDimensions from "@hooks/useWindowDimensions";
import UserProfile from "@shared/UserProfile/UserProfile";
import SliderContent from "../HelperComps/SliderContent/SliderContent";
import SliderVideo from "../HelperComps/SliderVideo/SliderVideo";
import SliderImage from "../HelperComps/SliderImage/SliderImage";
import { useSwiperSlide } from "swiper/react";
import SliderVideo2 from "../HelperComps/SliderVideo/SliderVideo2";
import VideoJS from "src/components/Test/VideoJs/VideoJs";
import DashJs from "src/pages/dashjs";
import VideoPlayer from "../HelperComps/SliderVideo/VideoPlayer";
import IcecastMetadataPlayer from "icecast-metadata-player";
import useAudio from "@hooks/useAudio";
import { duration } from "src/conf/slide";
import controller from "src/controller";
import GalleryModule from "src/controller/modules/gallery.mod";

const HeroSlide = ({
  swiper,
  slide,
  slideId,
  parentSwiper,
  index,
  mute,
  heroIsActive,
  autoPlay,
  setAutoplay,
  setMute,
  playing,
  setPlaying,
  sliderPlay,
  navigateToSlide,
  navigateToSection,
  isSection,
  headerText,
  playAudio,
  muteAudio,
  displayOptions,
}): JSX.Element => {
  const [cookies] = useCookies(["userAuthToken"]);
  const userAuthenticated = useSelector(
    (state: RootState) => state.userAuth.userAuthenticated
  );



  // useEffect(() => {
  //   console.log("@slide content: ", slide);
  // }, [slide])
  const router = useRouter();
  const {
    title,
    id,
    cta1,
    cta2,
    advanced: { background_audio_uri, background_audio_source },
    desktop,
    mobile,
    slide_location,
    muted: slideMuted,
    modId
  } = slide;
  const { height, width } = useWindowDimensions();
  const isMobile = width < 500;
  const [progress, setProgress] = useState(0);
  const item = isMobile ? mobile : desktop;
  const isImage = item.content_type.split("/")[0] == "image";
  const { username, section, employee } = router?.query;
  const [isActive, setIsActive] = useState<boolean>();
  useState;
  const [videoMute, setVideoMute] = useState(mute);
  const vreel = useSelector((state: any) => state?.vreel?.vreel);

  const hasSlideBackgroundAudio = slide?.advanced?.background_audio_url !== "";
  const hasGeneralBackgroundAudio =
    vreel?.display_options.background_audio !== "";

  const gallery = controller.getSection<GalleryModule>(modId)

  const setGalleryBackgroundAudio = () => {
    const audioType = background_audio_uri;
    const src = background_audio_source
    gallery.setBackgroundAudioSrc({ audioType: audioType, src });
  }

  useEffect(() => {
    gallery.addVideoCompletenessListener((v) => {
      setProgress(v);
    });
    controller.addAudioStateListener((state) => {
      handleAudio()
    })
    gallery.addSlideActivityListener({ id: slide.id, emit: updateSlideActivity });
  }, []);

  function handleAudio() {
    const { muted } = controller.getControllerState();
    if (muted) {
      controller.pauseBackgroundAudio();
      gallery.pauseBackgroundAudio();
      return
    }
    if (isImage && !hasBackgrounAudio || (!isImage && slide.muted && !hasBackgrounAudio)) {
      console.log({
        isImage,
        muted: slide.muted,
        hasBackgrounAudio,
        header: slide.title.header
      })
      gallery.pauseBackgroundAudio();
      controller.playBackgroundAudio();
      return
    }

    if (!isImage && slide.muted && !hasBackgrounAudio) {
      setGalleryBackgroundAudio();
      controller.pauseBackgroundAudio();
      gallery.playBackgroundAudio();
    }

    if (!isImage && !slide.muted) {
      controller.pauseBackgroundAudio();
      gallery.pauseBackgroundAudio();
    }
  }

  const updateSlideActivity = useCallback((active: boolean) => {
    setIsActive(active)
    if (!active) return
    console.log(slide);
    handleAudio()
    //start background controller audio

  }, []);

  const hasBackgrounAudio = background_audio_uri !== "" && background_audio_uri !== undefined

  useEffect(() => {

  }, [isActive])


  // useEffect(() => {
  //   (async () => {
  //     if (backgroundAudio) {
  //       const IcecastMetadataPlayer = await import("icecast-metadata-player");
  //       const player = new IcecastMetadataPlayer.default(backgroundAudio?.trim(), {
  //         onMetadata: (meta) => {
  //         },
  //         audioElement
  //       });
  //       setIcecast(player);
  //       player.play()
  //       // setTimeout(() => { player.stop() }, 10000)
  //     }
  //     // player.play()
  //   })();

  //   // player.play();
  //   return () => {
  //     icecast?.stop()
  //   }
  // }, []);
  // if (!(isActive && heroIsActive)) return <></>
  return (
    <div style={{ width: "100vw", height: window.innerHeight + "px" }} className="swiper-slide">
      <div id={id ? id : slideId} className={Styles.heroSlide}>
        <div
          style={{
            borderBottom: "1px solid white",
            opacity: ".5",
            width: `${progress}vw`,
            position: "absolute",
            bottom: "0px",
            zIndex: "2",
            transition: progress > 0.1 ? `width 1s linear` : "",
          }}
        ></div>
        {/* USER PROFILE */}

        {/* SLIDER MEDIA */}
        {
          <div className={Styles.media}>
            {isImage ? (
              <SliderImage
                url={item.uri}
                background_audio_uri={item.background_audio_uri}
                mute={mute}
                swiper={swiper}
                isActive={isActive}
                index={index}
                autoPlay={autoPlay}
              />
            ) : (
              <SliderVideo
                slide={slide}
                setAutoPlay={setAutoplay}
                autoPlay={autoPlay}
                playing={playing}
                section={section}
                item={item}
                isActive={isActive}
                index={index}
                url={item?.uri}
                mute={videoMute}
                swiper={swiper}
                sliderPlay={sliderPlay}
                setProgress={setProgress}
                playAudio={playAudio}
                muteAudio={muteAudio}
              />
              // <VideoPlayer
              //   // src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              //   src={item.uri}
              //   autoplay={true}
              //   muted={true}
              // />
            )}
            {/* SLIDER CONTENT */}
            <SliderContent
              hasBackgroundAudio={
                hasSlideBackgroundAudio || hasGeneralBackgroundAudio
              }
              navigateToSlide={navigateToSlide}
              item={item}
              slide={slide}
              playing={playing}
              setPlaying={setPlaying}
              mute={mute}
              setMute={setMute}
              isImage={isImage}
              parentSwiper={parentSwiper}
              navigateToSection={navigateToSection}
              isSection={isSection}
              headerText={headerText}
              displayOptions={displayOptions}
              defaultLogo={displayOptions.default_logo}
              isMobile={isMobile}
            />
          </div>
        }
      </div>
    </div>
  );
};

export default React.memo(HeroSlide);
{
  /* <SliderVideo2
              // playing={playing}
              section={section}
              item={item}
              isActive={isActive}
              index={index}
              url={item.content_type !== "image" && item?.uri}
              mute={mute}
              swiper={swiper}
              // sliderPlay={sliderPlay}
              // setProgress={setProgress}
            /> */
}
