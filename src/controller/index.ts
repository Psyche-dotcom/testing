import { ReactNode } from "react";
import { Item } from "semantic-ui-react";
import Swiper, { Pagination, Navigation, Autoplay, Mousewheel } from "swiper";
import DisplayControls from "./modules/display.controls";
import GalleryModule from "./modules/gallery.mod";
import SimpleLinkModule from "./modules/simplelinks";
import SocialsModule from "./modules/socials.mod";
import { SectionTypes, Slide, Vreel } from "./types";
import { v4 as generateUUID } from "uuid";
import { HiOutlinePlusSm } from "react-icons/hi";

import AudioController from "./modules/audio";
import UsageTelementryController from "./modules/usage";

const SLIDE_OFFSETS = 3;
const SECTION_OFFSET = 5;

export interface ControllerState {
  activeElementIndex: number;
  autoPlaySlides: boolean;
  renderedLayerList: string[];
  mobile: boolean;
  muted: boolean;
}

interface SectionInstance {
  id: string;
  header: string;
  type: SectionTypes;
  _instance: any;
  position: number;
}

export interface ShareContentType {
  section: string;
  payload: string;
}

type MenuItemType = { header: string; id: string };

export type AudioListenerCallBack = ((state: boolean) => void)[];

interface ControllerListeners {
  audioStateListeners: AudioListenerCallBack;
  rerenderListeners: any[];
  shareContentListener: (c: ShareContentType) => void;
}

export class Controller extends AudioController {
  vreel: Vreel;
  state: ControllerState;
  swiper: any;
  employeeSlide: Slide;
  sections: SectionInstance[];
  parentSwiper: Swiper;
  preNavigationId: string | null;
  listeners: ControllerListeners;
  usageController: UsageTelementryController;
  constructor() {
    super("background_audio");
    this.vreel;
    this.employeeSlide = null;
    this.state = {
      activeElementIndex: 0,
      autoPlaySlides: true,
      renderedLayerList: [],
      mobile: true,
      muted: true,
    };

    this.listeners = {
      audioStateListeners: [],
      rerenderListeners: [],
      shareContentListener: null,
    };

    this.sections = [];
    this.preNavigationId = null;
    this.usageController = null;
  }

  setBackgroundAudioSource(args) {
    this.setAudioSource(args);
  }

  playBackgroundAudio() {
    this.playAudio();
  }

  pauseBackgroundAudio() {
    this.pauseAudio();
  }

  onWindowResize(mobile: boolean) {
    this.state.mobile = mobile;
    this.updateAllSections();
  }

  setUsageController(t: UsageTelementryController) {
    this.usageController = t;
  }

  getVisibleSectionCount(): number {
    return this.sections.filter((section) => section._instance.isVisible())
      .length;
  }

  setVreel(vreel: Vreel, employeeSlide?: Slide | null): MenuItemType[] {
    this.vreel = vreel;
    this.employeeSlide = employeeSlide;
    this.loadSections();
    this.sections[0]?._instance.createDOMElement();
    this.sections[1]?._instance.createDOMElement();

    this.rerender([0, 1]);

    return this.sections
      .filter((section) => {
        const v = section._instance.isVisible();
        return v;
      })
      .map((section) => ({ id: section.id, header: section.header }));
  }

  setSwiper(swiper: Swiper) {
    this.parentSwiper = swiper;
    if (this.preNavigationId) {
      this.navigateToSection(this.preNavigationId);
      this.preNavigationId = null;
    }
    this.mountSwiperListeners();
  }

  mountSwiperListeners() {
    this.parentSwiper.on("slideChange", (content) => {
      content.activeIndex > this.state.activeElementIndex
        ? this.propegateFoward()
        : this.propegateBackwards();
      this.state.activeElementIndex = content.activeIndex;
      this.updateAllSections();
    });
  }

  private loadSections(): void {
    const vreel = this.vreel;
    const homeSlides = this.employeeSlide
      ? [this.employeeSlide, ...vreel.slides]
      : vreel.slides;
    console.log("home slides =>", homeSlides);
    const HomeInstance = {
      id: "home",
      header: "Home",
      type: "gallery",
      position: 0,
      _instance: new GalleryModule("home", homeSlides, "home", {
        removeSection: this.removeSection,
      }),
    } as SectionInstance;

    const SocialsInstances: SectionInstance[] = vreel.socials.map((link) => ({
      id: link.id,
      header: link.header,
      position: link.position,
      type: "socials",
      _instance: new SocialsModule(
        link,
        vreel.display_options,
        this.parentSwiper
      ),
    }));

    const SimpleLinkInstances: SectionInstance[] = vreel.simple_links.map(
      (link) => ({
        id: link.id,
        header: link.header,
        position: link.position,
        type: "simple_link",
        _instance: new SimpleLinkModule(
          link,
          vreel.display_options,
          this.parentSwiper
        ),
      })
    );
    const GalleryInstances: SectionInstance[] = [
      ...vreel.gallery,
      ...vreel.members,
    ].map((gallery) => {
      return {
        id: gallery.id,
        type: "gallery",
        header: gallery.header,
        position: gallery.position,
        _instance: new GalleryModule(gallery.id, gallery, "gallery", {
          removeSection: this.removeSection,
        }),
      };
    });

    this.sections = [
      HomeInstance,
      ...GalleryInstances,
      ...SimpleLinkInstances,
      ...SocialsInstances,
    ]
      .sort((a: any, b: any) => {
        return a.position - b.position;
      })
      .map((item, idx) => ({ ...item, position: idx }));

    this.state.renderedLayerList = this.sections.map((section) => section.id);
  }

  removeSection(id: string) {
    console.log("removing", id);
    // this.sections = this.sections.filter(section => section.id !== id);
    this.rerender([]);
    // this.parentSwiper?.slideTo(0);
  }

  private propegateFoward() {
    this.state.activeElementIndex++;
    const activeIndex = this.state.activeElementIndex;
    const forward = activeIndex + 1;
    const backward = activeIndex - 2;

    for (let i = 0; i < SECTION_OFFSET; i++) {
      const error = activeIndex + i;
      this.sections[error]?._instance.createDOMElement();
    }
    this.sections[activeIndex - SECTION_OFFSET]?._instance.removeDOMElement();
    this.rerender([activeIndex, forward, backward]);
  }

  private propegateBackwards() {
    const activeIndex = this.state.activeElementIndex;

    this.state.activeElementIndex--;
    for (let i = 0; i < SECTION_OFFSET; i++) {
      const error = activeIndex - i;
      this.sections[error]?._instance.createDOMElement();
    }
    this.sections[activeIndex + SECTION_OFFSET]?._instance.removeDOMElement();
    this.rerender([activeIndex]);
  }

  nextSection() {
    if (
      this.state.activeElementIndex + 1 ===
      this.sections.filter((section) => section._instance.isVisible()).length
    ) {
      this.parentSwiper.slideTo(0);
      return;
    }
    this.parentSwiper?.slideNext();
  }

  private updateAllSections() {
    const activeIndex = this.state.activeElementIndex;
    this.sections.forEach((section) => {
      const inRange =
        Math.abs(section.position - activeIndex) <= SECTION_OFFSET;
      const shouldPaintNext =
        this.state.activeElementIndex - section.position === 1;
      section._instance.onParentUpdate({
        isActive: activeIndex === section.position,
        shouldPaintNext,
        controllerState: this.state,
        autoplaySlides: this.state.autoPlaySlides,
        inRange,
        mobile: this.state.mobile,
        rerender: this.rerender,
      });
    });
  }

  get isMuted(): boolean {
    return this.state.muted;
  }

  setRerenderListener(cb: any) {
    this.listeners.rerenderListeners.push(cb);
    cb();
  }

  private rerender(args: number[]) {
    this.listeners.rerenderListeners.forEach((cb) => cb(args));
  }

  navigateToSection(id: string) {
    const idx = this.sections
      .filter((section) => section._instance.isVisible())
      .findIndex((section) => section.id === id);
    if (idx < 0) return;
    this.sections[idx]._instance.createDOMElement();
    // this.parentSwiper.slideTo(idx);
    if (!this.parentSwiper) {
      this.preNavigationId = id;
      return;
    }
    const error = this.state.activeElementIndex - idx;
    for (let i = 0; i < Math.abs(error); i++) {
      console.log(i);
      error > 0 ? this.parentSwiper.slidePrev() : this.parentSwiper.slideNext();
    }
  }

  //add listeners
  addAudioStateListener(cb: any) {
    this.listeners.audioStateListeners.push(cb);
  }

  toggleAudio() {
    this.state.muted = !this.state.muted;
    this.listeners.audioStateListeners.forEach((cb) => cb(this.state.muted));
    this.updateAllSections();
  }

  navigateFromParams(sectionId: string | null, slideId: string | null) {
    const section = this.sections.find((section) => section.id === sectionId);
    if (section) {
      this.navigateToSection(sectionId);
      if (section.type === "gallery" && slideId) {
        section._instance.navigateToSlide(slideId);
      }
    }
  }

  destruct() {
    this.state = null;
    this.sections.forEach((section) => section._instance.destroy());
    this.sections = null;
  }

  setShareContent(content: ShareContentType) {
    this.listeners.shareContentListener(content);
  }

  setShareContentListener(cb) {
    this.listeners.shareContentListener = cb;
  }

  removeShareContentListener() {
    this.listeners.shareContentListener = null;
  }

  getControllerState(): ControllerState {
    return this.state;
  }

  getSectionView(position: number) {
    return this.sections[position]?._instance.getDOMElement();
  }

  getSection<T>(id: string): T {
    return this.sections.find((section) => section.id === id)?._instance as T;
  }

  getSections(): { Section: ReactNode; id: string }[] {
    return (
      this.sections
        ?.filter((section) => section._instance.isVisible())
        .map((section) => ({
          Section: section._instance.getDOMElement(),
          id: section.id,
        })) || []
    );
  }
}

export let controller = new Controller();
export default controller;

export const UnmountController = () => {
  controller.destruct();
  controller = null;
};

export const MountController = () => {
  if (!controller) {
    controller = new Controller();
  }
};
