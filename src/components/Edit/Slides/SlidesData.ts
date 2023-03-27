export interface SlidesDataType {
  id: number;
  title: string;
  src?: string;
}

export const SlidesData: SlidesDataType[] = [
  {
    id: 1,
    title: "Slide-1",
  },
];

export const innerSlideData: SlidesDataType[] = [
  {
    id: 1,
    title: "Title",
  },
  {
    id: 2,
    title: "Media",
  },
  {
    id: 3,
    title: "Call to action 1",
  },
  {
    id: 4,
    title: "Call to action 2",
  },
  {
    id: 5,
    title: "Advanced",
  },
];

export const callToActionsData: SlidesDataType[] = [
  {
    id: 1,
    title: "URL",
    src: "/assets/calltoaction/global-line.svg",
  },
  {
    id: 2,
    title: "Call",
    src: "/assets/calltoaction/call.svg",
  },
  {
    id: 3,
    title: "Text",
    src: "/assets/calltoaction/text.svg",
  },
  {
    id: 4,
    title: "Email",
    src: "/assets/calltoaction/mail.svg",
  },
  {
    id: 5,
    title: "Sections",
    src: "/assets/calltoaction/stack-line.svg",
  },
  {
    id: 6,
    title: "Slide",
    src: "/assets/calltoaction/slide.svg",
  },
  // {
  //   id: 7,
  //   title: "Contact",
  //   src: "/assets/calltoaction/contact.svg",
  // },
  {
    id: 8,
    title: "Document",
    src: "/assets/calltoaction/document.svg",
  },
  {
    id: 9,
    title: "Employee",
    src: "/assets/calltoaction/employee.svg",
  },
  {
    id: 10,
    title: "Page",
    src: "/assets/calltoaction/page.svg",
  },
  // {
  //   id: 8,
  //   title: "Event",
  //   src: "/assets/calltoaction/event.svg",
  // },
  // {
  //   id: 9,
  //   title: "Group",
  //   src: "/assets/calltoaction/Group.svg",
  // },
  // {
  //   id: 10,
  //   title: "Products",
  //   src: "/assets/calltoaction/cart.svg",
  // },
];
