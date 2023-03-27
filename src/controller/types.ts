import { Controller, ControllerState } from ".";
import { HLSManager } from "./modules/gallery.mod";

export interface ContentType {
  uri: string;
  start_time: number;
  stop_time: number;
  content_type: string;
  background_audio: string;
}

export interface Slide {
  id: string;
  muted: boolean;
  hide?: boolean;
  modId?: string;
  mobile: ContentType;
  desktop: ContentType;
  controller?: HLSManager;
  transition_duration?: number;
}

export interface Gallery {
  id: string;
  position: number;
  header: string;
  slides: Slide[];
}

export interface Vreel {
  gallery: Gallery[];
  members: Gallery[];
  slides: Slide[];
  simple_links: SimpleLinkElement[];
  display_options: any;
  socials: any;
  embed: any;
}

export interface Link {
  uri: string;
  link_header: string;
  position: number;
  link_type: string;
}

export interface SimpleLinkElement {
  id: string;
  header: string;
  position: number;
  links: Link[];
}

export interface ModuleProps {
  isActive: boolean;
  shouldPaintNext: boolean;
  controllerState: ControllerState;
  controller: Controller;
  mobile: boolean;
  inRange: boolean;
  rerender(t: [])
}

export type SectionTypes = "gallery" | "simple_link" | "socials";
