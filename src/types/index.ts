import React, { FunctionComponent } from "react";

export interface Icons {
  src: string;
  alt: string;
  className?: string;
  method?: Function;
}

export interface RightSidebar {
  topIcons: Array<Icons>;
  bottomIcons: Array<Icons>;
}

export interface VreelSlideProps {
  swiper: any;
  slideId: any;
  slide: any;
  currentSlide: number;
  autoPlay?: boolean;
  setAutoPlay?: Function;
  parentSwiper: any;
  index?: number;
  mute?: boolean;
  setMute?: Function;
}

export interface EditItem {
  title: string;
  href: string;
  pathname?: string;
  children?: Array<{
    title: string;
    href: string;
    method?: Function;
  }>;
  method?: Function;
}

export interface EditComponent {
  title: string;
  component: any;
}
