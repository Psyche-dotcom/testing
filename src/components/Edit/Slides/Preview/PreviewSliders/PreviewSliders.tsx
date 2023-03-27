import { CSSProperties, useEffect, useRef, useState } from "react";
import PreviewSlider from "./PreviewSlider";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade, Lazy } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Styles from "./PreviewSlider.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store/store";
import clsx from "clsx";
import { useSlideRefer } from "@hooks/useSlideRefer";

const fakeData = [
  { type: "video", uri: "/assets/videos/test-video-1.mp4", alt: "slide-1" },
  { type: "video", uri: "/assets/videos/test-video-2.mp4", alt: "slide-2" },
  { type: "video", uri: "/assets/videos/test-video-3.mp4", alt: "slide-3" },
  // { src: '/assets/videos/test-video-4.mp4', alt: 'slide-4' },
  // { src: '/assets/videos/test-video-5.mp4', alt: 'slide-5' },
];

const PreviewSliders: React.FC<{
  view: "Desktop" | "Mobile";
}> = ({ view }) => {
  // const [currentSlide, setCurrentSlide] = useState(null);
  // const [swiper, setSwiper] = useState(null);

  // const { mediaMobileSlidePreviewLink, mediaSlidePreviewLink } = useSelector(
  //   (state: RootState) => state.mobileMediaSelector
  // );

  // const previewDat =
  //   view === "Desktop" ? mediaSlidePreviewLink : mediaMobileSlidePreviewLink;
  // const [mute, setMute] = useState(false);
  // const [playing, setPlaying] = useState(false);
  // const { activeIndex } = useSelector((state: RootState) => state.previewSlice);
  // const { getSlidesData } = useSlideRefer();
  // const { slidesContent } = getSlidesData();
  // const data = slidesContent ? slidesContent : fakeData;

  // useEffect(() => {
  //   if (swiper) {
  //     swiper.slideTo(activeIndex + 1);
  //   }
  // }, [activeIndex]);

  // return (
  //   <div
  //     className="preview"
  //     style={
  //       {
  //         width: "100%",
  //         height: "100%",
  //         "--bottom": `${25}px`,
  //       } as CSSProperties
  //     }
  //   >
  //     <Swiper
  //       modules={[Navigation, Pagination, Autoplay]}
  //       loop
  //       navigation
  //       pagination={{
  //         clickable: true,
  //       }}
  //       slidesPerView={1}
  //       initialSlide={0}
  //       onSlideChange={(slide) => {
  //         setCurrentSlide(slide.realIndex);
  //       }}
  //       speed={1500}
  //       autoplay={{
  //         delay: 10000,
  //       }}
  //       onSwiper={(swiper) => {
  //         setSwiper(swiper);
  //       }}
  //       // effect='fade'
  //     >
  //       {data.map((obj, index) => (
  //         <SwiperSlide key={index}>
  //           <PreviewSlider
  //             slide={obj}
  //             currentSlide={currentSlide}
  //             swiper={swiper}
  //             slideId={index}
  //             mute={mute}
  //             setMute={setMute}
  //             playing={playing}
  //             setPlaying={setPlaying}
  //             index={index}
  //           />
  //         </SwiperSlide>
  //       ))}
  //     </Swiper>
  //   </div>
  // );
  return (<></>)
};

export default PreviewSliders;
