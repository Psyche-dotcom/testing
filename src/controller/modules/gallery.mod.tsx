import React from "react";
import HeroSlider from "@sections/Sliders/HeroSlider/HeroSlider";
import { SwiperSlide } from "swiper/react";
import { Gallery, ModuleProps, Slide } from "../types";
import Hls from "hls.js";
import Swiper from "swiper";
import controller from "..";
import AudioController from "./audio";
import SlideManger from "./slide";

const SLIDE_RANGE = 5;

type VideoController = {
  listener: Function;
  id: string;
  hls?: Hls;
  sourceSet?: boolean;
};

interface GalleryState {
  isActive: boolean;
  inRange: boolean;
  mobile: boolean;
  activeSlideIndex: number;
  paused: boolean;
  registeredSlideVideos: VideoController[];
  muted: boolean;
  autoplay: boolean;
  videoCompletionPercent: number;
  shouldDisplay: boolean;
}

export interface HLSManager {
  videoId: string;
  mod?: Hls;
  video: HTMLVideoElement;
  supported: boolean;
  leftOff: number;
  sourceSet: boolean;
}

type GalleryType = "home" | "gallery" | "members";

export default class GalleryModule extends AudioController {
  id: string;
  gallery: Gallery | Slide[];
  galleryType: GalleryType;
  state: GalleryState;
  HLSMangaer: HLSManager[];
  DOMElement: JSX.Element;
  slides: SlideManger;
  subSwiper: Swiper;
  pasuedListeners: any[];
  videoCompletenessListeners: any[];
  slideChangeListeners: any[];
  swiperTimeout: NodeJS.Timeout;
  controller: any;
  rendered: boolean;
  preNavigationIndex: number | null;
  displayListener: (b: boolean) => void;
  isInitSlideCycle: boolean;
  slideActivityListeners: any[];
  audioElement: HTMLAudioElement;
  constructor(
    id: string,
    gallery: Gallery | Slide[],
    type: GalleryType,
    controller: any
  ) {
    super(`audio-${id}`);
    this.id = id;
    this.galleryType = type;
    this.gallery = gallery;
    this.controller = controller;
    this.DOMElement = <SwiperSlide></SwiperSlide>;
    this.state = {
      isActive: type === "home",
      activeSlideIndex: 0,
      paused: false,
      registeredSlideVideos: [],
      muted: true,
      autoplay: true,
      videoCompletionPercent: 0.0,
      inRange: false,
      shouldDisplay: false,
      mobile: window.innerWidth < 500,
    };
    this.audioElement = new Audio();
    this.rendered = false;
    this.pasuedListeners = [];
    this.videoCompletenessListeners = [];
    this.slideChangeListeners = [];
    this.slideActivityListeners = [];
    this.swiperTimeout = null;
    // this.updateMedia()
    this.slides = new SlideManger();
    this.loadSlides();
    this.isInitSlideCycle = true;
    this.displayListener = null;
    this.preNavigationIndex = null;
  }

  playBackgroundAudio() {
    this.playAudio();
  }

  pauseBackgroundAudio() {
    this.pauseAudio();
  }

  setBackgroundAudioSrc(args) {
    this.setAudioSource(args);
  }

  addSlideActivityListener(cb) {
    this.slideActivityListeners.push(cb);
  }

  updateSlideActivityListeners() {
    this.slideActivityListeners.forEach((cb) => {
      const activeSlideId = this.slides.visible[this.state.activeSlideIndex].id;
      console.log(cb);
      cb.emit(cb.id === activeSlideId);
    });
  }

  registerSwipeTimeout(duration: number, forward = true) {
    if (!this.state.isActive) return;
    const timeout = setTimeout(() => {
      forward ? this.subSwiper?.slideNext() : this.subSwiper?.slidePrev();
      // this.reachedEnd()
    }, duration * 1000);
    this.swiperTimeout = timeout;
  }

  autoPlayOn() {
    this.state.autoplay = true;
    this.state.registeredSlideVideos.forEach((video) => {
      video.listener({ type: "loop", data: false });
    });
  }

  autoPlayOff() {
    this.state.autoplay = false;
    this.state.registeredSlideVideos.forEach((video) => {
      video.listener({ type: "loop", data: true });
    });
  }

  isVisible(): boolean {
    return this.slides.visible.length > 0;
  }

  checkVisibility() {}

  clearSwiperTimeout() {
    clearTimeout(this.swiperTimeout);
    this.swiperTimeout = null;
  }

  private updateSlideListeners() {
    this.slideChangeListeners.forEach((cb) => cb(this.slides.visible));
  }

  updateMedia(mobile: boolean): void {
    if (this.state.mobile === mobile) return;
    this.state.mobile = mobile;
    const isMobile = this.state.mobile;
    this.slides.set(
      this.slides?.content.map((slide) => {
        const hide = slide[isMobile ? "mobile" : "desktop"].uri === "";
        return { ...slide, hide };
      })
    );

    this.updateSlideListeners();

    this.state.registeredSlideVideos = this.state.registeredSlideVideos.filter(
      ({ id }) => this.slides.visible.some((item) => item.id === id)
    );

    if (this.slides.visible.length < 1) {
      controller.removeSection(this.id);
    }
  }

  updateVideoCompletionPercent(percent) {
    this.state.videoCompletionPercent = percent;
    this.videoCompletenessListeners.forEach((cb) =>
      cb(this.state.videoCompletionPercent)
    );
  }

  //updates video in percent
  addVideoCompletenessListener(cb: any) {
    this.videoCompletenessListeners.push(cb);
  }

  addSlideChangeListener(cb) {
    this.slideChangeListeners.push(cb);
    cb(this.slides.visible);
  }

  //remove listener
  removeSlideChangeListener(cb) {
    this.slideChangeListeners = this.slideChangeListeners.filter(cb);
  }

  //toggle paused and resume transitioning
  togglePaused() {
    this.state.paused = !this.state.paused;
    this.pasuedListeners.forEach((cb) => {});
    this.setSlidePlayState();

    this.getActiveVideoRef()?.listener({
      type: this.state.paused ? "pause" : "play",
    });

    this.pasuedListeners.forEach((cb) => cb(this.state.paused));
  }

  //listeners
  addPauseListener(cb: any) {
    this.pasuedListeners.push(cb);
  }

  private pauseAllSlides() {
    this.state.registeredSlideVideos.forEach((video) => {
      video.listener({ type: "pause" });
    });
  }

  pauseInactiveSlides() {
    const activeSlideId = this.slides.content[this.state.activeSlideIndex]?.id;
    this.state.registeredSlideVideos.forEach((video) => {
      if (activeSlideId !== video.id) video.listener({ type: "pause" });
      // if (controls.id !== activeSlideId) controls.ref.current?.pause();
    });
  }

  setSwiper(swiper: Swiper) {
    const prevNavIdx = this.preNavigationIndex;
    this.subSwiper = swiper;
    if (prevNavIdx) {
      this.subSwiper.slideTo(prevNavIdx, 0);
      this.state.activeSlideIndex = prevNavIdx;
      this.playActiveSlide();
    } else {
      this.subSwiper.slideTo(this.state.activeSlideIndex, 0);
    }

    this.isInitSlideCycle = false;
    this.mountSwiperListeners();

    this.preNavigationIndex = null;
  }

  mountSwiperListeners() {
    this.execSlideCycle();
    this.subSwiper.on("slideChange", (content) => {
      if (content.activeIndex < content.previousIndex) {
        this.autoPlayOff();
      } else {
        this.autoPlayOn();
      }
      this.state.activeSlideIndex = content.activeIndex;
      this.updateSlideActivityListeners();
      this.execSlideCycle();
    });
  }

  //transition section at the end of slides
  private reachedEnd(): boolean {
    if (this.state.activeSlideIndex + 1 === this.slides.visible.length) {
      controller.nextSection();
      return;
    }
  }

  onVideoEnded(id: string) {
    if (this.state.paused) return;
    const activeSlideId = this.slides.visible[this.state.activeSlideIndex]?.id;
    if (id !== activeSlideId) return;
    if (!this.state.autoplay) return;
    this.reachedEnd();
    this.subSwiper.slideNext();
  }

  execSlideCycle() {
    this.clearSwiperTimeout();
    const activeIdx = this.state.activeSlideIndex;
    const mobile = this.state.mobile;
    const slide = this.slides.visible[activeIdx];
    const transitionDuration =
      slide.transition_duration > 0 ? slide.transition_duration : 6;
    const content = slide[mobile ? "mobile" : "desktop"];
    if (
      content.content_type.includes("image") &&
      this.state.autoplay &&
      this.state.isActive
    ) {
      this.registerSwipeTimeout(transitionDuration);
    }

    this.state.registeredSlideVideos.forEach((video) => {
      if (slide.id === video.id && !this.state.paused) {
        video.listener({ type: "play" });
        video.listener({ type: "set-muted", data: this.state.muted });
      } else {
        video.listener({ type: "pause" });
      }
    });

    controller.setShareContent({
      section: this.id,
      payload: slide.id,
    });

    this.queNextSlideVideo();
    this.dequeSlideVideo();

    //update share screen
  }

  removeVideoFromRegister(slideId: string) {
    this.state.registeredSlideVideos = this.state.registeredSlideVideos.filter(
      (slide) => slide.id !== slideId
    );
  }

  getInRangeSlideIds(): string[] {
    const ids = [];
    for (let i = 0; i < SLIDE_RANGE; i++) {
      const idx = this.state.activeSlideIndex + i;
      const slideId = this.slides.visible[idx]?.id;
      if (slideId) ids.push(slideId);
    }
    return ids;
  }

  queNextSlideVideo() {
    //prepare last slide in offset range for viewing
    const idx = this.state.activeSlideIndex + SLIDE_RANGE - 1;
    const nextSlide = this.slides.visible[idx];
    if (!nextSlide) return;
    const content = nextSlide[this.state.mobile ? "mobile" : "desktop"];
    if (!content.uri.includes(".m3u8")) return;
    const slideId = this.slides.visible[idx]?.id;
    if (!slideId) return;
    const videoListener = this.state.registeredSlideVideos.find(
      (ref) => ref.id === slideId
    );
    if (!videoListener || videoListener.sourceSet) return;

    videoListener.listener({ type: "set-src", data: content.uri });
    videoListener.listener({ type: "play" });
    setTimeout(() => videoListener.listener({ type: "pause" }), 100);
    videoListener.sourceSet = true;
  }

  dequeSlideVideo() {
    const idx = this.state.activeSlideIndex - SLIDE_RANGE - 1;
    const slideId = this.slides.visible[idx]?.id;
    if (!slideId) return;
    const videoListener = this.state.registeredSlideVideos.find(
      (ref) => ref.id
    );
    if (!videoListener) return;
    videoListener.listener({ type: "deque" });
  }

  registerVideo(cb, id: string) {
    if (this.state.registeredSlideVideos.some((item) => item.id === id)) return;
    const slide = this.slides.visible.find((slide) => slide.id === id);
    const src = this.state.mobile ? slide?.mobile.uri : slide.desktop.uri;
    let poster: any = src.split("media.m3u8");
    poster[1] = "poster.webp";
    poster = poster.join("");

    cb({ type: "poster", data: poster });

    let sourceSet = false;

    if (this.getInRangeSlideIds().includes(id)) {
      cb({ type: "set-src", data: src });
      const slideIsActive =
        this.slides.visible[this.state.activeSlideIndex].id === id;
      cb({ type: "play" });
      if (!this.state.isActive || !slideIsActive)
        setTimeout(() => cb({ type: "pause" }), 100);
      sourceSet = true;
    }

    this.state.registeredSlideVideos.push({ id, listener: cb, sourceSet });
  }

  loadSlides() {
    let slides: Slide[];

    if (this.galleryType === "home") slides = [...(this.gallery as Slide[])];
    if (this.galleryType === "gallery")
      slides = [...(this.gallery as Gallery).slides];

    this.slides.set(
      slides
        .map((slide) => ({ ...slide, modId: this.id }))
        .sort((a: any, b: any) => {
          return a.slide_location - b.slide_location;
        }) as Slide[]
    );

    this.slides.set(
      this.slides?.content.map((slide) => {
        const hide = slide[this.state.mobile ? "mobile" : "desktop"].uri === "";
        return { ...slide, hide };
      })
    );

    // this.updateMedia(this.state.mobile);
  }

  playActiveSlide() {
    const slide = this.slides.visible[this.state.activeSlideIndex];
    if (!slide) return;
    const { id, desktop, mobile, transition_duration } = slide;
    const { content_type } = this.state.mobile ? mobile : desktop;
    if (content_type.includes("image")) {
      const transitionDuration =
        transition_duration > 0 ? transition_duration : 6;
      this.registerSwipeTimeout(transitionDuration);
      return;
    }

    const idx = this.state.registeredSlideVideos.findIndex(
      (video) => video.id === id
    );
    if (idx === -1 || this.state.paused) return;
    this.state.registeredSlideVideos[idx].listener({ type: "play" });
  }

  getActiveVideoRef(): VideoController | null {
    const { id } = this.slides.visible[this.state.activeSlideIndex];
    const idx = this.state.registeredSlideVideos.findIndex(
      (video) => video.id === id
    );
    if (idx === -1) return;
    return this.state.registeredSlideVideos[idx] as VideoController;
  }
  //set and control slide individual active state
  onSectionSlideActivityChange(active: boolean) {
    this.slideActivityListeners.forEach((cb) => {
      if (active) {
        const activeSlideId = this.slides.visible[this.state.activeSlideIndex];
        if (activeSlideId === cb.id) cb.emit(true);
      }
      cb.emit(false);
    });
  }

  onParentUpdate({
    isActive,
    shouldPaintNext,
    controllerState,
    mobile,
    inRange,
  }: ModuleProps) {
    if (!inRange) this.cleanUp();
    this.state.isActive = isActive;
    isActive ? this.playActiveSlide() : this.pauseAllSlides();
    if (isActive) {
      this.setSlideAudioState(controllerState.muted);
      this.playActiveSlide();
      this.onSectionSlideActivityChange(isActive);
    } else {
      this.pauseAllSlides();
      this.clearSwiperTimeout();
    }
    if (inRange) {
      this.cleanUp();
    }
    if (this.state.mobile !== mobile) this.updateMedia(mobile);
  }

  createDOMElement() {
    if (this.displayListener) this.displayListener(true);
    this.loadSlides();
    if (this.rendered) return;
    this.DOMElement = (
      <SwiperSlide>
        <HeroSlider
          isSection={this.galleryType !== "home"}
          modId={this.id}
          header={(this.gallery as Gallery).header}
          slides={this.slides.visible}
        />
      </SwiperSlide>
    );
    controller.usageController.recordDownload({
      sectionId: this.id,
      sectionType: "gallery",
      time: Date.now(),
    });
    this.rendered = true;
  }

  private setSlideAudioState(state: boolean) {
    this.state.muted = state;

    const activeIdx = this.state.activeSlideIndex;
    const activeId = this.slides.visible[activeIdx]?.id;
    const idx = this.state.registeredSlideVideos.findIndex(
      (item) => item.id === activeId
    );
    if (idx === -1) return;
    const ref = this.state.registeredSlideVideos[idx].listener({
      type: "set-muted",
      data: state,
    });
    // this.state.registeredSlideVideos[idx].ref.current.muted = state;
  }

  private setSlidePlayState() {
    const activeId = this.slides.visible[this.state.activeSlideIndex]?.id;
    const idx = this.state.registeredSlideVideos.findIndex(
      (item) => item.id === activeId
    );
    // const videoRef = this.state.registeredSlideVideos[idx]?.ref;
    // this.state.paused ? videoRef?.current?.pause() : videoRef?.current?.play();
  }

  //handle module cleanup
  private cleanUp() {
    // this.pauseAllSlides();
    this.state.registeredSlideVideos.forEach(({ hls }) => {
      // if (hls) hls.stopLoad();
    });
  }

  private destroy() {
    if (this.swiperTimeout) clearTimeout(this.swiperTimeout);
    this.state = null;
  }

  navigateToSlide(id: string) {
    const idx = this.slides.visible.findIndex((item) => item.id === id);
    if (idx === -1) {
      return;
    }
    if (!this.subSwiper) {
      this.preNavigationIndex = idx;
      return;
    }
    this.subSwiper.slideTo(idx);
  }

  setGalleryDisplayListener(displayListener) {
    this.displayListener = displayListener;
  }

  removeGalleryDisplayListener() {
    this.displayListener = null;
  }

  removeDOMElement() {
    if (!this.rendered) return;
    if (this.displayListener) this.displayListener(false);

    // this.DOMElement = <SwiperSlide></SwiperSlide>;
    // this.rendered = false;
  }

  getDOMElement(): React.ReactNode {
    return this.DOMElement;
  }
}
