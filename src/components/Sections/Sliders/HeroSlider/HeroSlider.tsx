import React, { useRef, useEffect, useState, CSSProperties } from 'react';
import controller from 'src/controller';
import GalleryModule from 'src/controller/modules/gallery.mod';
import { Slide } from 'src/controller/types';
import { Pagination, Autoplay, Mousewheel, Navigation, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react"
import HeroSlide from './HeroSlide/HeroSlide';
import SwiperCore from "swiper"
import toast from 'react-hot-toast';
// import 'swiper/swiper-bundle.min.css';
interface Props {
  slides: Slide[],
  modId: string,
  isSection: boolean,
  header?: string
}

// SwiperCore.use([Virtual]);

const GallerySlider: React.FC<Props> = ({ slides, modId, isSection, header }) => {
  console.log("::hero::", slides)
  function s(slides) {
    console.log("setting slides =>", slides)
    setDisplaySlides(slides)
  }
  const [swiper, setSwiper] = useState();
  const [displaySlides, setDisplaySlides] = useState(slides);
  const [display, setDislpay] = useState(true);

  function displayListener(state: boolean) {
    setDislpay(state);
  }

  console.log(slides);
  const displayOptions = {} as any

  const gallery = controller.getSection<GalleryModule>(modId);

  useEffect(() => {
    gallery.addSlideChangeListener(setDisplaySlides);
    gallery.setGalleryDisplayListener(displayListener);
    return () => {
      gallery.removeSlideChangeListener(s);
      gallery.removeGalleryDisplayListener();
    }
  }, []);

  useEffect(() => {
    if (swiper) {

    }
  }, [swiper])

  function SetGallerySwiper(swiper) {
    gallery.setSwiper(swiper);
  }
  // if (!display) return <></>
  return (
    <div
      className="vslider"
      onDoubleClick={() => {
        if (gallery.state.autoplay) {
          gallery.autoPlayOff();
          toast.success("Automatic Slide Transition Off");
        } else {
          gallery.autoPlayOn();
          toast.success("Automatic Slide Transition On");
        }

      }}
      style={
        {
          width: "100%",
          height: "100%",
          // "--bottom": `${parentSwiper?.activeIndex !==
          //   parseInt(parentSwiper?.slides?.length) - 1
          //   ? 25
          //   : 10
          //   }px`,
        } as CSSProperties
      }
    >

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{
          clickable: true,
        }}
        freeMode
        // virtual
        // lazy={true}
        // loop={true}
        // effect="fade"
        // rewind={true}
        onLoad={() => { }}
        slidesPerView={1}
        initialSlide={0}
        style={{ height: window.innerHeight + "px" }}
        onSwiper={SetGallerySwiper}
      >
        {
          displaySlides?.map((slide, idx) => (
            <SwiperSlide key={slide.id} >
              <HeroSlide
                setAutoplay={() => { }}
                headerText={header}
                navigateToSlide={() => { }}
                slide={slide}
                heroIsActive={true}
                swiper={swiper}
                parentSwiper={null}
                slideId={slide.id}
                sliderPlay={() => { }}
                index={1}
                setMute={() => { }}
                mute={true}
                playing={() => { }}
                setPlaying={() => { }}
                navigateToSection={() => { }}
                autoPlay={() => { }}
                isSection={isSection}
                muteAudio={() => { }}
                playAudio={() => { }}
                displayOptions={{
                  titleFontName:
                    displayOptions?.title?.family || "Poppins",
                  buttonFontName:
                    displayOptions?.button?.family || "Poppins",
                  descriptionFontName:
                    displayOptions?.description?.family || "Poppins",
                  default_logo: "",
                }}
              />
            </SwiperSlide>

          ))
        }
      </Swiper>
    </div>
  );
};

export default GallerySlider;