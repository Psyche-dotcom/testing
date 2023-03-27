import React, { FunctionComponent } from "react";
import Contact from "./Element/childrens/Contact/Contact";
import ContributionLinks from "./Element/childrens/ContributionLinks/ContributionLinks";
import Embed from "./Element/childrens/Embed";
import Events from "./Element/childrens/Events";
import MusicLinks from "./Element/childrens/Music";
import SimpleLink from "./Element/childrens/SimpleLink/SimpleLink";
import Socials from "./Element/childrens/Socials/Socials";
import SuperLink from "./Element/childrens/SuperLink/SuperLink";
import TextArea from "./Element/childrens/TextArea";
import VideoGallery from "./Element/childrens/VideoGallery/VideoGallery";

type ElementInterfaceType = "simple_links" | "socials";

export interface ElementsType {
  id: string;
  title: string;
  type: ElementInterfaceType;
  hidden: boolean;
  component?: React.ReactNode;
}

export const elements: ElementsType[] = [
  // {
  //   title: 'Text Area 1',
  //   active: true,
  //   component: TextArea,
  // },
  // {
  //   title: 'Simple Link 1',
  //   active: true,
  //   component: SimpleLink,
  // },
  // {
  //   title: 'Super Link 1',
  //   active: true,
  //   component: SimpleLink,
  // },
  // {
  //   title: 'Image Gallery',
  //   active: true,
  //   component: ImageGallery,
  // },
  // {
  //   title: 'Video Gallery',
  //   active: true,
  //   component: ImageGallery,
  // },
  // {
  //   title: 'Socials',
  //   active: true,
  //   component: Socials,
  // },
  // {
  //   title: 'Text Area 2',
  //   active: false,
  //   component: TextArea,
  // },
  // {
  //   title: 'Simple Link 2',
  //   active: false,
  //   component: SimpleLink,
  // },
  // {
  //   title: 'Simple Link 3',
  //   active: false,
  //   component: SimpleLink,
  // },
  // {
  //   title: 'Music Links',
  //   active: false,
  //   component: MusicLinks,
  // },
  // {
  //   title: 'Contribution Links',
  //   active: false,
  //   component: ContributionLinks,
  // },
  // {
  //   title: 'Embed 1',
  //   active: false,
  //   component: Embed,
  // },
  // {
  //   title: 'Embed 2',
  //   active: false,
  //   component: Embed,
  // },
  // {
  //   title: 'Super Link 2',
  //   active: false,
  //   component: SimpleLink,
  // },
  // {
  //   title: 'Events',
  //   active: false,
  //   component: Events,
  // },
  // {
  //   title: 'Contact',
  //   active: false,
  //   component: Contact,
  // },
];
