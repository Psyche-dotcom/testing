

export interface NavItemTypes {
  id: number | string;
  title: string;
  href: string;
}

export const NavItem: NavItemTypes[] = [
  {
    id: 1,
    title: 'Slides',
    href: '/slides',
  },
  {
    id: 2,
    title: 'Welcome',
    href: '/welcome',
  },
  {
    id: 3,
    title: 'Links',
    href: '/link',
  },
  {
    id: 4,
    title: 'Socials',
    href: '/social',
  },
  {
    id: 5,
    title: 'Events',
    href: '/events',
  },
];

export const AccMenus: NavItemTypes[] = [
  {
    id: 1,
    title: 'Pages',
    href: '/edit/home',
  },
  // {
  //   id: 3,
  //   title: 'News Feed',
  //   href: '/news',
  // },
  {
    id: 4,
    title: 'Analytics',
    href: '/analytics',
  },

  {
    id: 5,
    title: 'Enterprise',
    href: '/edit/enterprise',
  },
  {
    id: 6,
    title: 'Account',
    href: '/edit/account',
  },
  {
    id: 6,
    title: 'Help',
    href: '/tutorials',
  },

];
