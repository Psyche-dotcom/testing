import SimpleLink from "@edit/Elements/Element/childrens/SimpleLink/SimpleLink";
import Links from "@sections/Links/Links";
import Socials from "@sections/Socials/Socials";
import { SwiperSlide } from "swiper/react";
import { SimpleLinkElement } from "../types";

interface SocialState {
  isActive: boolean;
}

export default class SocialsModule {
  state: SocialState;
  section: any;
  DOMElement: JSX.Element;
  displayOptions: any;
  parentSwiper: any;
  constructor(
    section: SimpleLinkElement,
    displayOptions?: any,
    parentSwiper?: any
  ) {
    this.displayOptions = displayOptions;
    this.parentSwiper = parentSwiper;
    this.state = {
      isActive: false,
    };
    this.section = section;
    this.DOMElement = <SwiperSlide></SwiperSlide>;
    console.log("sim link =>", section.links);
  }

  onParentUpdate({ isActive }) { }

  removeDOMElement() {
    this.DOMElement = <SwiperSlide>Hello</SwiperSlide>;
  }
  isVisible(): boolean {
    return this.section?.socials?.length > 0;
  }

  destroy() {

  }

  createDOMElement() {
    this.DOMElement = (
      <SwiperSlide>
        <SwiperSlide>
          <Socials
            header={this.section.header}
            displayOptions={this.displayOptions}
            socials={this.section.socials}
            parentSwiper={this.parentSwiper}
          />
        </SwiperSlide>
      </SwiperSlide>
    );
  }

  getDOMElement() {
    return this.DOMElement;
  }
}
