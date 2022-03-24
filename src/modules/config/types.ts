import { DataBase } from 'src/types';

export interface IConfig {
  title: string;
  home_subtitle: string;
  // About us
  about_us: string;
  // Menu
  menu_subtitle: string;
  // Events
  events_subtitle: string;
  // reserv
  reserv_subtitle: string;
  // Contact
  address: string;
  phone: string;
  email: string;
  open: boolean;
  // Social
  social_fb: string | null;
  social_in: string | null;
  social_yt: string | null;
  social_tw: string | null;
}

export interface IImage extends DataBase {
  path: string;
  tag: string;
  title: string;
}
