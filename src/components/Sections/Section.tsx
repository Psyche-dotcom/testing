import React, { lazy, useEffect, useState } from "react";

import Links from "./Links/Links";
// import VLinks from "../VLinks/VLinks/VLinks";
// import Events from "../Events/Events";
import Socials from "./Socials/Socials";
import Contribute from "./Contribute/Contribute";
import MusicLinks from "./MusicLinks/MusicLinks";
import GallerySlider from "./Sliders/GallerySlider/GallerySlider";
import { useRouter } from "next/router";
import HeroSlider from "@sections/Sliders/HeroSlider/HeroSlider";
import { Loader } from "@shared/Loader/Loader";
import MainContainer from "./MainContainer/MainContainer";
import Styles from "./Section.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store/store";
// import Test2 from '../Test/Test2';
export let gmenu = [];
export let sp = null;
const Section: React.FC<{ vreel: any }> = ({ vreel }) => {
  const router = useRouter();
  const { username, section } = router?.query;
  const [swiper, setSwiper] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  // console.log(data);

  const { elements, slides } = vreel;
  const sections = Object.entries({ slides, ...elements }).filter(
    (e) => e[1] != null && e[0] != "__typename"
  );
  const [initialSlide, setinitialSlide] = useState(
    section ? sections.map((e: any) => e[0]).indexOf(section) : 0
  );

  // console.log({ elements, slides });
  // console.log(
  //   Object.entries({ slides, ...elements }).filter(
  //     (e) => e[1] != null && e[0] != "__typename"
  //   )
  // );

  useEffect(() => {
    setinitialSlide(sections.map((e: any) => e[0]).indexOf(section));
    // if (swiper) swiper.slideTo(0);
    // console.log({ section, info: "section changes..." });
  }, [section]);

  gmenu = sections.map((e) => e[0]);

  return (
    <MainContainer>
      <div className={Styles.inner}>
        {sections.map((sec: any, index: number) => {
          // console.log({ sec, 0: sec[0], 1: sec[1] });

          switch (sec[0]) {
            case "slides":
              return (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    scrollSnapAlign: "start",
                  }}
                >
                  <HeroSlider
                    slides={sec[1]}
                    view="Mobile"
                    parentSwiper={swiper}
                  />
                </div>
              );
            case "simple_links":
              return (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    scrollSnapAlign: "start",
                  }}
                >
                  <Links links={sec[1]?.links} parentSwiper={swiper} />
                </div>
              );
            case "socials":
              return (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    scrollSnapAlign: "start",
                  }}
                >
                  <Socials socials={sec[1]?.socials} parentSwiper={swiper} />
                </div>
              );
            case "gallery":
              return (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    scrollSnapAlign: "start",
                  }}
                >
                  <GallerySlider
                    isVisiable={true}
                    title="Image Gallery"
                    items={sec[1].images}
                    parentSwiper={swiper}
                  />
                </div>
              );
            case "videos":
              return (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    scrollSnapAlign: "start",
                  }}
                >
                  <GallerySlider
                    isVisiable={true}
                    title="Video Gallery"
                    items={sec[1].videos}
                    parentSwiper={swiper}
                  />
                </div>
              );

            default:
              return (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    scrollSnapAlign: "start",
                  }}
                >
                  <Contribute parentSwiper={swiper} />
                </div>
              );
          }
        })}
      </div>
    </MainContainer>
  );
};

export default Section;
