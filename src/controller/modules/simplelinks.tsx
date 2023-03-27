import SimpleLink from "@edit/Elements/Element/childrens/SimpleLink/SimpleLink";
import Links from "@sections/Links/Links";
import { SwiperSlide } from "swiper/react";
import { SimpleLinkElement } from "../types";

interface SimpleLinkState {
  isActive: boolean;
}

export default class SimpleLinkModule {
  state: SimpleLinkState;
  section: SimpleLinkElement;
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
  }

  destroy() {

  }

  onParentUpdate({ isActive }) {

  }
  isVisible(): boolean {
    return this.section?.links.length > 0;
  }

  removeDOMElement() {
    this.DOMElement = <SwiperSlide></SwiperSlide>;
  }

  createDOMElement() {
    this.DOMElement = (
      <SwiperSlide>
        <Links
          header={this.section.header}
          displayOptions={this.displayOptions}
          links={this.section.links}
          parentSwiper={this.parentSwiper}
        />
      </SwiperSlide>
    );
  }

  getDOMElement() {
    return this.DOMElement;
  }
}
