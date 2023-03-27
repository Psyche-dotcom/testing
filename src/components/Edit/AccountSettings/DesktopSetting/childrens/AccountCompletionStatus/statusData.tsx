interface StatusBarType {
  title: string;
  position: number;
  active: boolean;
  next: boolean;
  completed: boolean;
  titleTop?: string;
  lastPoint?: boolean;
}

export const statusData: Array<StatusBarType> = [
  {
    title: 'Sign Up',
    position: 1,
    active: true,
    next: false,
    completed: true,
  },
  {
    title: 'Complete Vcard',
    position: 2,
    active: true,
    next: false,
    completed: true,
  },
  {
    title: 'Publish 1st Slide',
    position: 3,
    active: true,
    next: true,
    completed: false,
  },
  {
    title: 'Publish 2 Elements',
    position: 4,
    active: false,
    next: false,
    completed: false,
  },
  {
    title: 'Completed',
    position: 5,
    active: false,
    next: false,
    completed: false,
    titleTop: 'VREEL',
    lastPoint: true,
  },
];
