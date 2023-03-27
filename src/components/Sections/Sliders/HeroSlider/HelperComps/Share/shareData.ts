import { MouseEventHandler } from 'react';

interface ShareDataType {
  title: string;
  logo: string;
  method?: MouseEventHandler<HTMLButtonElement>;
}

export const data: Array<ShareDataType> = [
  {
    title: 'AirDrop',
    logo: '/assets/share/airdrop.svg',
    method: () => alert(` clicked`),
  },
  {
    title: 'Instagram',
    logo: '/assets/share/instagram.svg',
    method: () => alert(` clicked`),
  },
  {
    title: 'Google',
    logo: '/assets/share/google.svg',
    method: () => alert(` clicked`),
  },
  {
    title: 'WhatsApp',
    logo: '/assets/share/whatsapp.svg',
    method: () => alert(` clicked`),
  },
  {
    title: 'Twitter',
    logo: '/assets/share/twitter.svg',
    method: () => alert(` clicked`),
  },
  {
    title: 'Facebook',
    logo: '/assets/share/facebook.svg',
    method: () => alert(` clicked`),
  },
  {
    title: 'LinkedIn',
    logo: '/assets/share/linkedin.svg',
    method: () => alert(` clicked`),
  },
  {
    title: 'Tumblr',
    logo: '/assets/share/tumblr.svg',
    method: () => alert(` clicked`),
  },
];
