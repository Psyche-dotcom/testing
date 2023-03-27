import React, { FC } from "react";
import { SwiperSlide } from "swiper/react";
import Styles from "./HeroSlider.module.scss";
const SwiperSlideContainer: FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  return <SwiperSlide className={Styles.vreelSlide}>{children}</SwiperSlide>;
};
export default React.memo(SwiperSlideContainer);
